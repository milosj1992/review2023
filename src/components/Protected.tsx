import { useAppSelector } from '../services/app/store';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
const Protected = ({ children }: { children: ReactNode }) => {
  const { userToken } = useAppSelector((state) => state.auth);

  if (!userToken) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export default Protected;
