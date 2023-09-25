import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { userToken } = useAppSelector((state) => state.auth);

  if (!userToken) {
    // Redirect to the signin page if userInfo is not defined
    return <Navigate to="/auth/signin" replace />;
  }

  // Render the children if userInfo is defined
  return children;
};

export default Protected;
