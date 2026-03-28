import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout() {
  return (
    // Wrapping the whole app in the AuthProvider we created
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* We define our main routing screens/groups here */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(helper)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
