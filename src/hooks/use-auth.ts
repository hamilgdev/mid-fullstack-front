import { useState, useEffect } from 'react';
import { getLocal, setLocal, removeLocal } from '@/handlers/browser-storage.handler';
import type { User } from '@/interfaces/user.interface';
import { BROWSER_KEYS, HttpStatus } from '@/config/constants.config';
import { refreshToken } from '@/services/auth.service';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
  }>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getLocal<string>(BROWSER_KEYS.token);

      if (token) {
        try {
          const response = await refreshToken();

          if (response.status === HttpStatus.OK) {
            const users = response.data;
            const user = users.find((user) => user.guid === token);

            if (user) {
              setAuthState({
                isAuthenticated: true,
                isLoading: false,
                user,
              });
            } else {
              clearAuth();
            }

          } else {
            clearAuth();
          }
        } catch (error) {
          console.error('Error recovering user data:', error);
          clearAuth();
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    };

    initializeAuth();
  }, []);

  const setAuth = (user: User, token: string) => {
    setLocal(BROWSER_KEYS.token, token);
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
      user,
    });
  };

  const clearAuth = () => {
    removeLocal(BROWSER_KEYS.token);
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  };



  return {
    ...authState,
    setAuth,
    clearAuth,
  };
};
