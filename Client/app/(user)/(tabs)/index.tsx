import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from './context/AuthContext';

export default function AppEntryPoint() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // 1. Show a loading spinner while we check AsyncStorage for a saved token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0D9488" />
      </View>
    );
  }

  // 2. If no user is logged in, send them to the Login screen
  if (!isAuthenticated || !user) {
    return <Redirect href="/(auth)/login" />;
  }

  // 3. If they are logged in as a helper, send them to the Helper group
  if (user.role === 'helper') {
    return <Redirect href="/(helper)/dashboard" />; 
  }

  // 4. If they are logged in as a standard user (elderly), send them to the User tabs
  return <Redirect href="/(user)/(tabs)" />;
}
