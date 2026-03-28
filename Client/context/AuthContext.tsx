import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANT: Replace this IP with your actual computer's local Wi-Fi IPv4 address
const API_URL = 'http://192.168.1.X:5000/api/auth'; 

// 1. Updated User interface to match your MongoDB Schema
export interface User {
  _id: string; // MongoDB uses _id
  name: string;
  phoneNumber: string;
  role: 'user' | 'helper';
  digitalCredits?: number;
  socialScore?: number;
  trustMeter?: number;
  avatar?: string;
}

// 2. Updated Auth context interface for OTP flow
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  requestOtp: (phoneNumber: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, otp: string, name?: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  USER: 'helpmate_user',
  TOKEN: 'helpmate_token', // Store the JWT sent by backend
};

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from AsyncStorage on app start
  useEffect(() => {
    loadSession();
  },[]);

  const loadSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // NEW: Function to trigger OTP request to your backend
  const requestOtp = async (phoneNumber: string) => {
    try {
      const response = await fetch(`${API_URL}/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to request OTP');
      }
    } catch (error) {
      console.error('Request OTP Error:', error);
      throw error;
    }
  };

  // NEW: Function to verify OTP and log in / register the user
  const verifyOtp = async (phoneNumber: string, otp: string, name?: string, role?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp, name, role }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP or missing fields');
      }

      // Backend returns { token, role, user }
      setUser(data.user);
      setToken(data.token);

      // Persist user and token to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      
    } catch (error) {
      console.error('Verify OTP Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...data };
      setUser(updatedUser);

      // Update AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    requestOtp,
    verifyOtp,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected Route Component
export function ProtectedRoute({ children, allowedRoles }: { children: ReactNode; allowedRoles?: ('user' | 'helper')
