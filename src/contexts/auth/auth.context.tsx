import { createContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import type { AuthState } from '@/hooks/use-auth';

import { signInWithEmail } from '@/services/auth.service';
import { HttpStatus } from '@/config/constants.config';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const login = async (email: string): Promise<boolean> => {
    try {
      const response = await signInWithEmail();

      if (response.status === HttpStatus.OK) {
        const users = response.data;
        const user = users.find((user) => user.email === email);

        if (!user) return false;

        const token = user.guid;
        auth.setAuth(user, token);

        navigate('/studio', { replace: true });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = (): void => {
    auth.clearAuth();
    navigate('/auth/sign-in', { replace: true });
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
