import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Award, Wallet, User } from 'lucide-react-native';

export default function HelperDashboard() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Availability Toggle */}
      <View style={[styles.statusCard, isActive && styles.statusCardActive]}>
        <View>
          <Text style={styles.statusTitle}>
            {isActive ? "You are Online" : "Currently Offline"}
          </Text>
          <Text style={styles.statusSub}>
            {isActive ? "Scanning for nearby requests..." : "Turn on to help neighbors"}
          </Text>
        </View>
        <Switch 
          value={isActive} 
          onValueChange={setIsActive} 
          trackColor={{ false: '#CBD5E1', true: '#0D9488' }}
        />
      </View>

      {/* Stats Overview */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Wallet size={20} color="#0D9488" />
          <Text style={styles.statValue}>120</Text>
          <Text style={styles.statLabel}>Credits</Text>
        </View>
        <View style={styles.statBox}>
          <Award size={20} color="#0D9488" />
          <Text style={styles.statValue}>4.9</Text>
          <Text style={styles.statLabel}>Social Score</Text>
        </View>
      </View>

      {/* Task Feed */}
      <Text style={styles.sectionTitle}>Nearby Requests</Text>
      {!isActive ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Go active to see requests within 2km.</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskType}>Groceries</Text>
            <Text style={styles.taskReward}>+10 Credits</Text>
          </View>
          <View style={styles.taskLocation}>
            <MapPin size={14} color="#64748B" />
            <Text style={styles.locationText}>0.4 km away (High Street)</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Navigation to Profile */}
      <TouchableOpacity 
        onPress={() => router.push('/(helper)/helper')}
        style={styles.profileLink}
      >
        <User size={20} color="#64748B" />
        <Text style={styles.profileLinkText}>View My Volunteer Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  statusCard: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    padding: 20, backgroundColor: '#F8FAFC', borderRadius: 16, marginBottom: 20,
    borderWidth: 1, borderColor: '#E2E8F0'
  },
  statusCardActive: { borderColor: '#0D9488', backgroundColor: '#F0FDFA' },
  statusTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  statusSub: { fontSize: 13, color: '#64748B' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  statBox: { flex: 1, padding: 16, backgroundColor: '#F8FAFC', borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#0F172A', marginTop: 4 },
  statLabel: { fontSize: 12, color: '#64748B' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#334155', marginBottom: 16 },
  emptyState: { padding: 40, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 },
  emptyText: { color: '#94a3b8', fontSize: 14 },
  taskCard: { padding: 20, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  taskType: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  taskReward: { color: '#0D9488', fontWeight: 'bold' },
  taskLocation: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { color: '#64748B', fontSize: 13 },
  profileLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 40, padding: 16 },
  profileLinkText: { color: '#64748B', fontWeight: '500' }
});