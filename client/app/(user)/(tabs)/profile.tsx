import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Heart, Settings, Shield, ChevronRight } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#3A3A3C' }
};

export default function ProfileScreen() {
  const router = useRouter();
  const handleLogout = () => router.replace('/(auth)/login');

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>P</Text>
            </View>
            <Text style={styles.userName}>PUSPAL GHOSAL</Text>
            <Text style={styles.userRole}>MEMBER SINCE 2025</Text>
          </View>

          <View style={styles.menuGroup}>
            <ProfileOption icon={<Heart size={24} color="#FFF" />} title="PREFERRED HELPERS" />
            <ProfileOption icon={<Shield size={24} color="#FFF" />} title="TRUST & SAFETY" />
            <ProfileOption icon={<Settings size={24} color="#FFF" />} title="SETTINGS" />
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>LOG OUT</Text>
            <LogOut size={24} color="#FF453A" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ProfileOption({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <TouchableOpacity style={styles.optionItem} activeOpacity={0.7}>
      <View style={styles.optionLeft}>
        {icon}
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
      <ChevronRight size={22} color={THEME.dark.sub} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 25, paddingBottom: 40 },
  profileHeader: { alignItems: 'center', marginTop: 30, marginBottom: 50 },
  avatarCircle: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: THEME.dark.border, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  avatarInitial: { color: '#FFF', fontSize: 48, fontWeight: '600' },
  userName: { color: '#FFF', fontSize: 30, fontWeight: '800' },
  userRole: { color: THEME.dark.sub, fontSize: 14, fontWeight: '700', marginTop: 8 },
  menuGroup: { marginBottom: 20 },
  optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 28, borderBottomWidth: 1.5, borderBottomColor: THEME.dark.border },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  optionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  logoutBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30, marginTop: 10 },
  logoutText: { color: '#FF453A', fontSize: 18, fontWeight: '900' },
});