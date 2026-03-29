import React from 'react';
import { Tabs } from 'expo-router';
import { Home, UserCircle } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00BAF2', // Signature Cyan
        tabBarInactiveTintColor: '#636366',
        headerShown: false, // Branding is handled within screens
        tabBarStyle: {
          backgroundColor: '#000000', // Matches deep black theme
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '800',
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({ color }) => <UserCircle size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}