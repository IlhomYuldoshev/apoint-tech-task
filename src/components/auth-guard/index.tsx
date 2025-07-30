import React from "react";
import { useAuthContext } from "../../context/auth/use-auth-context";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
};
