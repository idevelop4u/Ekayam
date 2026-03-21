import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Clock, 
  CreditCard, 
  Heart, 
  LogOut, 
  ChevronRight,
  ShieldCheck 
} from 'lucide-react-native';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  location: string;
};

const mockUser: UserProfile = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  role: 'Verified Helper',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
  location: 'San Francisco, CA',
};

type MenuItemProps = {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  onPress: () => void;
};

const MenuItem = ({ icon: Icon, title, subtitle, onPress }: MenuItemProps) => (
  <TouchableOpacity 
    onPress={onPress}
    className="active:opacity-70"
  >
    <View className="bg-card rounded-xl p-4 flex-row items-center border border-border">
      <View className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4">
        <Icon size={20} className="text-secondary-foreground" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-muted-foreground mt-0.5">{subtitle}</Text>
        )}
      </View>
      <ChevronRight size={20} className="text-muted-foreground" />
    </View>
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => {
          // Handle logout logic here
          console.log('User logged out');
        }},
      ]
    );
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    console.log('Navigate to Edit Profile');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-2xl font-bold text-foreground">Profile</Text>
        <ThemeToggle />
      </View>

      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: 24, 
          paddingBottom: 128, 
          gap: 24 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View className="bg-card rounded-2xl p-6 items-center border border-border shadow-sm">
          <View className="relative">
            <Image 
              source={{ uri: mockUser.avatar }} 
              className="w-24 h-24 rounded-full border-4 border-background"
            />
            <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-background">
              <ShieldCheck size={16} className="text-primary-foreground" />
            </View>
          </View>
          
          <Text className="text-2xl font-bold text-foreground mt-4">{mockUser.name}</Text>
          
          <View className="flex-row items-center gap-2 mt-2">
            <View className="bg-primary/10 px-3 py-1 rounded-full">
              <Text className="text-primary text-xs font-semibold uppercase tracking-wide">
                {mockUser.role}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2 mt-3">
            <MapPin size={14} className="text-muted-foreground" />
            <Text className="text-sm text-muted-foreground">{mockUser.location}</Text>
          </View>

          <View className="w-full mt-6 pt-6 border-t border-border space-y-3">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Mail size={16} className="text-secondary-foreground" />
              </View>
              <Text className="text-sm text-foreground flex-1">{mockUser.email}</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Phone size={16} className="text-secondary-foreground" />
              </View>
              <Text className="text-sm text-foreground flex-1">{mockUser.phone}</Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleEditProfile}
            className="mt-6 w-full bg-primary py-3 rounded-xl flex-row items-center justify-center gap-2 active:opacity-90"
          >
            <Edit size={18} className="text-primary-foreground" />
            <Text className="text-primary-foreground font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Sections */}
        <View className="space-y-3">
          <Text className="text-lg font-semibold text-foreground px-1">Account</Text>
          
          <MenuItem
            icon={Clock}
            title="Task History"
            subtitle="View your past and upcoming tasks"
            onPress={() => console.log('Navigate to Task History')}
          />
          
          <MenuItem
            icon={CreditCard}
            title="Payment History"
            subtitle="Transactions and receipts"
            onPress={() => console.log('Navigate to Payment History')}
          />
          
          <MenuItem
            icon={Heart}
            title="Saved Helpers"
            subtitle="Your favorite service providers"
            onPress={() => console.log('Navigate to Saved Helpers')}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          onPress={handleLogout}
          className="mt-4 bg-destructive/10 py-4 rounded-xl flex-row items-center justify-center gap-2 active:opacity-80"
        >
          <LogOut size={20} className="text-destructive" />
          <Text className="text-destructive font-semibold text-base">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}