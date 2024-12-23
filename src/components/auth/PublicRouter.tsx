import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, userName} = useAuthStore();

  if (user || userName) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
