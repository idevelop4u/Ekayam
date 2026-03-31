import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectSocket, disconnectSocket } from '../services/socket';

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
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          await connectSocket(); // Connect to real-time events on reload
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStorage();
  }, []);

  const login = async (email: string, password: string, selectedRole: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: userData } = res.data;
      
      setToken(token);
      setUser(userData);
      await AsyncStorage.setItem('userToken', token);
      
      await connectSocket(); // Connect immediately on new login

      // Explicit Redirect based on your UI tabs
      if (selectedRole === 'User') {
        router.replace('/(user)/(tabs)');
      } else {
        router.replace('/(helper)/(tabs)'); // ensure proper tabs folder redirection based on helper structure
      }
    } catch (err: any) {
      console.error(err);
      throw err; // throw to handle it in the UI component
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('userToken');
    disconnectSocket(); // Disconnect safely
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;