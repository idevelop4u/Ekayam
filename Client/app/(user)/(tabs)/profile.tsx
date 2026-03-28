import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, Heart, Settings, Shield } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.userName}>Puspal Ghosal</Text>
        <Text style={styles.userRole}>Member since 2025</Text>
      </View>

      {/* Options List */}
      <View style={styles.menuContainer}>
        <MenuOption icon={<Heart size={20} color="#64748B" />} title="Preferred Helpers" />
        <MenuOption icon={<Shield size={20} color="#64748B" />} title="Trust & Safety" />
        <MenuOption icon={<Settings size={20} color="#64748B" />} title="Settings" />
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MenuOption({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <TouchableOpacity style={styles.option}>
      <View style={styles.optionLeft}>
        {icon}
        <Text style={styles.optionText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  profileHeader: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F1F5F9', marginBottom: 16 },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#0F172A' },
  userRole: { fontSize: 14, color: '#64748B', marginTop: 4 },
  menuContainer: { gap: 12 },
  option: {
    padding: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionText: { fontSize: 16, fontWeight: '500', color: '#334155' },
  logoutButton: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },
});