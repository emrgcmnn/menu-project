import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function useAuthListener() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Yükleme durumunu ekleyin
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     
       if (currentUser) {
          setUser(currentUser);
       } else {
          setUser(null);
       }
       setLoading(false); // Kullanıcı bilgisi alındığında yükleme durumunu güncelleyin
    });
 
    return () => unsubscribe();
 }, [auth]);

  return { user, loading }; // Hem user hem de loading bilgisini döndürün
}

export default useAuthListener;
