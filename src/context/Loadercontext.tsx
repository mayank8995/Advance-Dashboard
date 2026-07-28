import { createContext, useContext, useState, type ReactNode } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderFlagProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <LoaderContext value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
