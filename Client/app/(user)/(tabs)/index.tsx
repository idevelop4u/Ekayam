import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ShieldCheck } from 'lucide-react-native';

export default function UserDashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Welcome & Trust Meter */}
      <View style={styles.headerCard}>
        <Text style={styles.greeting}>Hello, Neighbor</Text>
        <View style={styles.trustRow}>
          <ShieldCheck size={18} color="#0D9488" />
          <Text style={styles.trustText}>Trust Meter: 98% Reliable</Text>
        </View>
      </View>

      {/* Primary Action */}
      <TouchableOpacity style={styles.mainButton} activeOpacity={0.8}>
        <View style={styles.iconCircle}>
          <Plus color="#fff" size={32} />
        </View>
        <Text style={styles.mainButtonText}>Request Help</Text>
        <Text style={styles.mainButtonSubtext}>Find a volunteer near you</Text>
      </TouchableOpacity>

      {/* Recent Activity Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
      </View>

      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No active requests at the moment.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerCard: { marginBottom: 32 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#0F172A' },
  trustRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 },
  trustText: { color: '#64748B', fontSize: 14, fontWeight: '500' },
  mainButton: {
    backgroundColor: '#0D9488',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconCircle: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 50, marginBottom: 12 },
  mainButtonText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  mainButtonSubtext: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 },
  sectionHeader: { marginTop: 40, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#334155' },
  emptyState: { padding: 40, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1' },
  emptyStateText: { color: '#94a3b8', fontSize: 14 },
});