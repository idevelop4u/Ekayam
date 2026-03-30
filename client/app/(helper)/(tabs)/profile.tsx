import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, History, Star, ShieldCheck } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function HelperProfile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
            <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>P</Text>
            </View>
            <Text style={styles.name}>PUSPAL GHOSAL</Text>
            <View style={styles.badge}>
                <ShieldCheck size={14} color={THEME.cyan} />
                <Text style={styles.badgeText}>VERIFIED VOLUNTEER</Text>
            </View>
            </View>

            <View style={styles.statsStrip}>
            <View style={styles.statItem}>
                <Text style={styles.statNum}>42</Text>
                <Text style={styles.statLabel}>TASKS</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statNum}>5.0</Text>
                <Text style={styles.statLabel}>RATING</Text>
            </View>
            </View>

            <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>HELP HISTORY</Text>
                <History size={18} color={THEME.dark.sub} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>REVIEWS</Text>
                <Star size={18} color={THEME.dark.sub} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.switchMode} onPress={() => router.replace('/(user)')}>
                <View>
                    <Text style={styles.switchText}>SWITCH TO REQUESTER MODE</Text>
                    <Text style={styles.switchSub}>I need help with something</Text>
                </View>
                <LogOut size={18} color="#FF453A" />
            </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 30, paddingBottom: 40 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 50 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: THEME.dark.border, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  avatarInitial: { color: '#FFF', fontSize: 40, fontWeight: '200' },
  name: { color: '#FFF', fontSize: 24, fontWeight: '800', letterSpacing: 1 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  badgeText: { color: THEME.cyan, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  statsStrip: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: THEME.dark.border, paddingVertical: 30, marginBottom: 40 },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statNum: { color: '#FFF', fontSize: 32, fontWeight: '200' },
  statLabel: { color: THEME.dark.sub, fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  menu: { gap: 10 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 25, borderBottomWidth: 1, borderBottomColor: THEME.dark.border },
  menuText: { color: '#FFF', fontSize: 14, fontWeight: '700', letterSpacing: 1.5 },
  switchMode: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30, marginTop: 20 },
  switchText: { color: '#FF453A', fontSize: 14, fontWeight: '900', letterSpacing: 1.5 },
  switchSub: { color: THEME.dark.sub, fontSize: 12, marginTop: 4 }
});