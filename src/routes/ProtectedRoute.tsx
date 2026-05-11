import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/auth/Login';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;
