import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, User, Briefcase, MessageSquare } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: {
    bg: '#000000',
    inactive: '#444446',
    border: '#2C2C2E'
  }
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.cyan,
        tabBarInactiveTintColor: THEME.dark.inactive,
        tabBarStyle: {
          backgroundColor: THEME.dark.bg,
          borderTopColor: THEME.dark.border,
          borderTopWidth: 2, 
          // --- ADJUSTED DIMENSIONS ---
          height: 90,             // Reduced from 120 to be more screen-safe
          paddingBottom: 10,      // Reduced from 40 
          paddingTop: 10,         
          elevation: 0,
          position: 'absolute',    // Ensures it sits on top of the screen content
        },
        tabBarLabelStyle: {
          fontSize: 10,           
          fontWeight: '900',      
          letterSpacing: 1.5,     
          marginBottom: 5,        // Added to keep label visible
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'DASHBOARD',
          tabBarIcon: ({ color }) => <LayoutDashboard size={28} color={color} />, // Reduced from 40
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: 'TASKS',
          tabBarIcon: ({ color }) => <Briefcase size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'CHAT',
          tabBarIcon: ({ color }) => <MessageSquare size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}