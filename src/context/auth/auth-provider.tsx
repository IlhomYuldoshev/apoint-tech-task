import React, { useState } from "react";
import { AuthContext } from "./auth-context";
import { AUTH_TOKEN_KEY } from "../../configs/constants";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem(AUTH_TOKEN_KEY)
  );

  const login = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
