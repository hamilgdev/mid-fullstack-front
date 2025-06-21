import { createContext } from 'react';
import type { ReactNode } from 'react';
import { useAuth, type AuthState } from '@/hooks/useAuth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  const login = async (email: string, password: string): Promise<void> => {
    console.log('Login attempt:', { email, password });
    throw new Error('Login not implemented yet');
  };

  const logout = (): void => {
    console.log('Logout');
  };

  const value: AuthContextType = {
    ...auth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export type { AuthContextType };
