import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: (token: string) => {},
  logout: () => {},
});
