import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebaseConfig';

function Menu() {
  const [urunler, setUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urunSnapshot = await getDocs(collection(db, "urunler"));
      setUrunler(urunSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
      const kategoriSnapshot = await getDocs(collection(db, "kategoriler"));
      setKategoriler(kategoriSnapshot.docs.map(doc => doc.data().isim));
    };
    fetchData(); 
  }, []);

  return (
    <div className="space-y-6 p-8">
      {kategoriler.map((kategori) => {
        const kategoriUrunleri = urunler.filter(urun => urun.kategori === kategori);

        return kategoriUrunleri.length > 0 ? (
          <div key={kategori} className="bg-white p-6 shadow-lg rounded-md">
            <h2 className="text-2xl font-semibold mb-6 underline">{kategori}</h2>
            <ul>
              {kategoriUrunleri.map(urun => (
                <li key={urun.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                  <div className="mb-2 flex items-center">
                    <span className="flex-1 font-bold text-xl">{urun.isim}</span>
                    <div className="flex-1 text-gray-600">{urun.icerik}</div>
                    <span className="flex-1 text-red-500 font-semibold">{urun.fiyat}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default Menu;
