import React from 'react';
import { Stack } from 'expo-router';

export default function HelperLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerShadowVisible: false,
        headerTintColor: '#0F172A',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="dashboard" 
        options={{ title: 'Helper Dashboard' }} 
      />
      <Stack.Screen 
        name="helper" 
        options={{ title: 'Volunteer Profile' }} 
      />
    </Stack>
  );
}