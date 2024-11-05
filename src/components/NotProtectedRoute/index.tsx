import { ReactNode, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

interface NotProtectedRouteProps {
  children: ReactNode,
}

export default function NotProtectedRoute({ children }: NotProtectedRouteProps) {
  const { checkNotAuth } = useAuth();

  useEffect(() => {
    checkNotAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
