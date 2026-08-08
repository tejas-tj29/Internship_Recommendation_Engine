import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient, refreshClient } from '../lib/client';
import { setToken } from '../lib/tokenStore';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        // Attempt to refresh the token on initial load using http-only cookie
        const res = await refreshClient.post('/auth/refresh');
        setToken(res.data.accessToken);

        // Then fetch user profile
        const userRes = await apiClient.get('/users/me');
        setUser(userRes.data);
      } catch (error) {
        // If refresh or profile fetch fails, user is not authenticated
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
