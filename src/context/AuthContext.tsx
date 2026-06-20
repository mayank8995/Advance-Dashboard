import { createContext, useContext, useEffect, useState } from "react";
import type { Login } from "../types/types";

interface AuthContextType {
  user: Login | null
  isAuthenticated: boolean;
  isLoading: boolean;
  login: ({email, name, id }: Login) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<Login | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    setIsLoading(false);
  },[])
  
  const login = async ({email,id,name}:Login) => {
    localStorage.setItem('user',JSON.stringify({email,id,name}));
    setUser({email,id,name});
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

    const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };



  return (<AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>)
  
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be executed within an AuthProvider structural tree');
  }
  return context;
};