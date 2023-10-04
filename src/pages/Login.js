import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Redirecting to admin...");
      navigate("/admin");
    } catch (error) {
      alert("Giriş başarısız: ", error.message);
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Giriş Yap</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">E-posta</label>
                <input 
                    type="email" 
                    id="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="E-posta"
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Şifre</label>
                <input 
                    type="password" 
                    id="password"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Şifre"
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Giriş Yap
                </button>
            </div>
        </form>
    </div>
</div>

  );
}

export default Login;