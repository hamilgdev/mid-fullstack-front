import { useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return authState;
};
