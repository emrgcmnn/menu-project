import useAuthListener from './useAuthListener';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute() {
  const { user, loading } = useAuthListener();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
