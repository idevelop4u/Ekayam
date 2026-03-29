import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, History, Star, ShieldCheck } from 'lucide-react-native';

export default function HelperProfile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Volunteer Profile</Text>
        <View style={styles.badgeRow}>
          <ShieldCheck size={16} color="#0D9488" />
          <Text style={styles.badgeText}>Verified Volunteer</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>42</Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>5.0</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={styles.list}>
        <TouchableOpacity style={styles.listItem}>
          <History size={20} color="#64748B" />
          <Text style={styles.listText}>Help History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Star size={20} color="#64748B" />
          <Text style={styles.listText}>Reviews from Elders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logout} 
          onPress={() => router.replace('/(auth)/login')}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Switch to Requester Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F1F5F9', marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#0F172A' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  badgeText: { fontSize: 13, color: '#0D9488', fontWeight: '600' },
  statsCard: { 
    flexDirection: 'row', padding: 20, backgroundColor: '#F8FAFC', 
    borderRadius: 16, marginBottom: 32, alignItems: 'center' 
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: 'bold', color: '#0F172A' },
  statLabel: { fontSize: 12, color: '#64748B' },
  divider: { width: 1, height: '60%', backgroundColor: '#E2E8F0' },
  list: { gap: 8 },
  listItem: { 
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, 
    backgroundColor: '#F8FAFC', borderRadius: 12 
  },
  listText: { fontSize: 16, color: '#334155', fontWeight: '500' },
  logout: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, marginTop: 24 },
  logoutText: { fontSize: 16, color: '#EF4444', fontWeight: 'bold' }
});