import React from 'react';
import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#000000' }, // Matches deep black theme
        headerTintColor: '#00BAF2', // Signature Cyan
        headerTitleStyle: { 
          fontWeight: '900', 
          letterSpacing: 2, 
          fontSize: 14 
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#000000' },
        animation: 'slide_from_right', // Native mobile feel
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: 'MESSAGES' }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: '' }} // Title will be set dynamically in the screen
      />
    </Stack>
  );
}