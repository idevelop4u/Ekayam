import React from 'react';
import { Stack } from 'expo-router';

export default function HelperLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Standard headers removed for premium minimalist feel
        animation: 'fade',
      }}
    />
  );
}