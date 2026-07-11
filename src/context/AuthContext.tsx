import { createContext, useContext, useEffect, useState } from 'react';
import { type Login, type TableQueryParams } from '../types/types';

interface AuthContextType {
  user: Login | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: ({ email, name, id }: Login) => Promise<void>;
  logout: () => void;
  tableQueryParams: TableQueryParams;
  setQueryParamsData: (data: TableQueryParams) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<Login | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [tableQueryParams, setTableQueryParams] = useState<TableQueryParams>({
    page: 1,
    limit: 5,
    search: '',
    sortBy: 'id',
    order: 'asc',
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async ({ email, id, name }: Login) => {
    localStorage.setItem('user', JSON.stringify({ email, id, name }));
    setUser({ email, id, name });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const setQueryParamsData = (data: TableQueryParams) => {
    setTableQueryParams(data);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    tableQueryParams,
    setQueryParamsData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth must be executed within an AuthProvider structural tree'
    );
  }
  return context;
};
