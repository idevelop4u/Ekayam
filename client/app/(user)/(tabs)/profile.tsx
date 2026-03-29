import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Heart, Settings, Shield, ChevronRight } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>P</Text>
            </View>
            <Text style={styles.userName}>PUSPAL GHOSAL</Text>
            <Text style={styles.userRole}>MEMBER SINCE 2025</Text>
          </View>

          {/* Options List */}
          <View style={styles.menuGroup}>
            <ProfileOption icon={<Heart size={18} color="#FFF" />} title="PREFERRED HELPERS" />
            <ProfileOption icon={<Shield size={18} color="#FFF" />} title="TRUST & SAFETY" />
            <ProfileOption icon={<Settings size={18} color="#FFF" />} title="SETTINGS" />
          </View>

          {/* Logout Action */}
          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>LOG OUT</Text>
            <LogOut size={18} color="#FF453A" />
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// Sub-component for Menu Items
function ProfileOption({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <TouchableOpacity style={styles.optionItem} activeOpacity={0.7}>
      <View style={styles.optionLeft}>
        {icon}
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
      <ChevronRight size={16} color={THEME.dark.sub} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 32, paddingBottom: 40 },
  
  profileHeader: { alignItems: 'center', marginTop: 40, marginBottom: 60 },
  avatarCircle: { 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    borderWidth: 1, 
    borderColor: THEME.dark.border, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  avatarInitial: { color: '#FFF', fontSize: 36, fontWeight: '200' },
  userName: { color: '#FFF', fontSize: 24, fontWeight: '800', letterSpacing: 1 },
  userRole: { color: THEME.dark.sub, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginTop: 6 },

  menuGroup: { marginBottom: 30 },
  optionItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 22, 
    borderBottomWidth: 1, 
    borderBottomColor: THEME.dark.border 
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  optionTitle: { color: '#FFF', fontSize: 13, fontWeight: '700', letterSpacing: 1.5 },

  logoutBtn: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 25, 
    marginTop: 10 
  },
  logoutText: { color: '#FF453A', fontSize: 13, fontWeight: '900', letterSpacing: 2 },
});