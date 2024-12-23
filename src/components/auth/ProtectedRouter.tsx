import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userName, user } = useAuthStore();
  if (!userName || !user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

