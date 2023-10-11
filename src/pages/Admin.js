import React, { useState, useEffect } from 'react';

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

import db from "../firebaseConfig";
import { getAuth, signOut } from 'firebase/auth';
import useAuthListener from '../useAuthListener';
import { useNavigate } from 'react-router-dom';

function Admin() {

  const [duzenlemeModu, setDuzenlemeModu] = useState(null);
  const [geciciUrun, setGeciciUrun] = useState({});

  const urunuGuncelle = async () => {
    try {
      const urunDoc = doc(db, "urunler", duzenlemeModu.id);
      await updateDoc(urunDoc, geciciUrun);
      fetchData();
      setDuzenlemeModu(null);
      setGeciciUrun({});
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  


  const user = useAuthListener();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [urunler, setUrunler] = useState([]);
  const [urun, setUrun] = useState({ isim: "", icerik: "", fiyat: "", kategori: "" });
  const [yeniKategori, setYeniKategori] = useState("");
  const [kategoriler, setKategoriler] = useState([]);

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Oturum başarılı bir şekilde kapatıldı. Şimdi kullanıcıyı login sayfasına yönlendirebilirsiniz.
        navigate("/login");
    }).catch((error) => {
        console.error("Oturum kapatılırken bir hata oluştu: ", error);
    });
};


  const fetchData = async () => {
    const urunSnapshot = await getDocs(collection(db, "urunler"));
    setUrunler(urunSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

    const kategoriSnapshot = await getDocs(collection(db, "kategoriler"));
    setKategoriler(kategoriSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);


  useEffect(() => {
    fetchData();
  }, []);

  const urunEkle = async () => {
    try {
      await addDoc(collection(db, "urunler"), urun);
      fetchData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const kategoriEkle = async () => {
    try {
      await addDoc(collection(db, "kategoriler"), { isim: yeniKategori });
      setYeniKategori(""); 
      fetchData();
    } catch (e) {
      console.error("Error adding category: ", e);
    }
  };

  const kategoriyiSil = async (id) => {
    try {
      await deleteDoc(doc(db, "kategoriler", id));
      fetchData();
    } catch (e) {
      console.error("Error deleting category: ", e);
    }
  };

  const urunuSil = async (id) => {
    try {
      await deleteDoc(doc(db, "urunler", id));
      fetchData();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }


  return (
    <div className="p-8">
      <button className='font-bold text-white rounded p-2 bg-red-600' onClick={logout}>Çıkış Yap</button>
      {/* Ürün Ekleme Alanı */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Ürün Ekle</h2>
        <input 
          className="border p-2 mr-2 rounded" 
          value={urun.isim} 
          onChange={e => setUrun(prev => ({ ...prev, isim: e.target.value }))} 
          placeholder="Ürün İsmi"
        />
        <input 
          className="border p-2 mr-2 rounded" 
          value={urun.icerik} 
          onChange={e => setUrun(prev => ({ ...prev, icerik: e.target.value }))} 
          placeholder="İçerik"
        />
        <input 
          className="border p-2 mr-2 rounded" 
          value={urun.fiyat} 
          onChange={e => setUrun(prev => ({ ...prev, fiyat: e.target.value }))} 
          placeholder="Fiyat"
        />
        <select 
          className="border p-2 mr-2 rounded "
          value={urun.kategori} 
          onChange={e => setUrun(prev => ({ ...prev, kategori: e.target.value }))}>
          {kategoriler.map(k => (
            <option key={k.id} value={k.isim}>{k.isim}</option>
          ))}
        </select>
        <button 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" 
          onClick={urunEkle}>Ekle</button>
      </div>
      
      {/* Kategori Ekleme Alanı */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Kategori Ekle</h2>
        <input 
          className="border p-2 mr-2 rounded" 
          value={yeniKategori} 
          onChange={e => setYeniKategori(e.target.value)} 
          placeholder="Yeni Kategori"
        />
        <button 
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700" 
          onClick={kategoriEkle}>Kategori Ekle</button>
      </div>
      
      <div className='flex'>
        <div className='w-1/5 border border-black'>
                {/* Mevcut Kategoriler Alanı */}
          <h2 className="text-3xl font-bold mb-4">Mevcut Kategoriler</h2>
          {kategoriler.map((kategori) => (
          <div key={kategori.id} className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow">
            <span className="flex-1 text-xl">{kategori.isim}</span>
            <button 
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700" 
              onClick={() => kategoriyiSil(kategori.id)}>Sil</button>
          </div>
          ))}
        </div>
            
        <div className='w-4/5 border border-black'>
          <h2 className="text-3xl font-bold mb-4 ">Mevcut Ürünler</h2>
          {urunler.map((item) => (
            <div key={item.id}>
            {duzenlemeModu && duzenlemeModu.id === item.id ? (
              <div className="bg-gray-100 p-4 rounded shadow">
                <select 
                  className="border p-2 mr-2 rounded w-full mb-2"
                  value={geciciUrun.kategori || ''} 
                  placeholder="kategori"
                  onChange={e => setGeciciUrun(prev => ({ ...prev, kategori: e.target.value }))}>
                  {kategoriler.map(k => (
                    <option key={k.id} value={k.isim}>{k.isim}</option>
                  ))}
                  
                </select>
                <input 
                  className="border p-2 mr-2 rounded w-full mb-2"
                  value={geciciUrun.isim || ''}
                  onChange={e => setGeciciUrun(prev => ({ ...prev, isim: e.target.value }))}
                  placeholder="Ürün İsmi"
                />
                <input 
                  className="border p-2 mr-2 rounded w-full mb-2"
                  value={geciciUrun.icerik || ''}
                  onChange={e => setGeciciUrun(prev => ({ ...prev, icerik: e.target.value }))}
                  placeholder="İçerik"
                />
                <input 
                    className="border p-2 mr-2 rounded w-full mb-2"
                    value={geciciUrun.fiyat || ''}
                    onChange={e => setGeciciUrun(prev => ({ ...prev, fiyat: e.target.value }))}
                    placeholder="Fiyat"
                />
                <button 
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" 
                  onClick={urunuGuncelle}>Güncelle
                </button>
              </div>
                    ) : (
              <div className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow">
                  <span className="flex-1 text-xl font-extrabold">{item.kategori}</span> 
                  <span className="flex-1 text-xl">{item.isim}</span> 
                  <span className="flex-1 text-gray-600">{item.icerik}</span> 
                  <span className="flex-1 text-red-600 font-bold">{item.fiyat}</span>
                  <div>
                      <button 
                          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 mr-2" 
                          onClick={() => {
                              setGeciciUrun(item);
                              setDuzenlemeModu(item);
                          }}>
                          Düzenle
                      </button>
                      <button 
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-700" 
                          onClick={() => urunuSil(item.id)}>Sil
                      </button>
                    </div>
                  </div>
                  )}
                </div>
                ))}
            </div>     
        </div>
    </div>
  );
}

export default Admin;
