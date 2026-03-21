import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'lucide-react-native';

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'helper';
  avatar?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  USER: 'helpmate_user',
  SESSION: 'helpmate_session',
};

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demo (in real app, this would be API call)
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'user@helpmate.com': {
    password: 'password123',
    user: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'user@helpmate.com',
      phone: '+1 (555) 123-4567',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
    },
  },
  'helper@helpmate.com': {
    password: 'password123',
    user: {
      id: '2',
      name: 'Mike Chen',
      email: 'helper@helpmate.com',
      phone: '+1 (555) 987-6543',
      role: 'helper',
      avatar: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEJ1c2luZXNzd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBleGVjdXRpdmV8ZW58MHx8MHx8fDA%3D',
    },
  },
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from AsyncStorage on app start
  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check mock credentials
      const mockUser = MOCK_USERS[email.toLowerCase()];
      
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Set user state
      setUser(mockUser.user);

      // Persist to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser.user));
      await AsyncStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
        userId: mockUser.user.id,
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.SESSION);
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
    isLoading,
    isAuthenticated: !!user,
    login,
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
export function ProtectedRoute({ children, allowedRoles }: { children: ReactNode; allowedRoles?: ('user' | 'helper')[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or show a loading spinner
  }

  if (!user) {
    // Redirect to login - in real app, use router.replace('/login')
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User doesn't have required role
    return null;
  }

  return <>{children}</>;
}