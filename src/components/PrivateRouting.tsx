import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const userEmail = useAppSelector((state) => state.auth.userEmail);
  const location = useLocation();

  if (!userEmail) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
