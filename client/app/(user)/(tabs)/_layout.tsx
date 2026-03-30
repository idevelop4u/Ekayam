import React from 'react';
import { Tabs } from 'expo-router';
import { Home, UserCircle, MessageSquare } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00BAF2',
        tabBarInactiveTintColor: '#8E8E93', 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 1,
          borderTopColor: '#2C2C2E',
          height: 100, // Taller for easier reach
          paddingBottom: 35,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12, 
          fontWeight: '800',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: 'CHAT',
          tabBarIcon: ({ color }) => <MessageSquare size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({ color }) => <UserCircle size={28} color={color} />,
        }}
      />

      {/* HIDDEN SCREENS (Accessible via router.push but not seen in nav bar) */}
      <Tabs.Screen
        name="task"
        options={{
          href: null, 
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}