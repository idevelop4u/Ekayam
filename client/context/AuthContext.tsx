import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import api from '../services/api';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, pass: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const loadStorage = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) setToken(storedToken);
      setIsLoading(false);
    };
    loadStorage();
  }, []);

  const login = async (email: string, password: string, selectedRole: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: userData } = res.data;
      
      setToken(token);
      setUser(userData);
      localStorage.setItem('token', token);

      // Explicit Redirect based on your UI tabs
      if (selectedRole === 'User') {
        router.replace('/(user)/(tabs)');
      } else {
        router.replace('/(helper)/dashboard');
      }
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;