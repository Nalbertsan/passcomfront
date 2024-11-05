import { ReactNode, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getToken  } from '../../Utils/functions';
import { setHeaderToken } from "../../api/BaseAPI"



interface ProtectedRouteProps {
  children: ReactNode,
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    setHeaderToken(getToken())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
