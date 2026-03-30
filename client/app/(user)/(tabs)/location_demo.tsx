import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Navigation, Info } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function TaskMapScreen() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Simple pulse animation for the "User Location" dot
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.5, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>LIVE TRACKING</Text>
        </View>

        {/* Fake Map Area */}
        <View style={styles.mapContainer}>
          <View style={styles.fakeMap}>
            {/* Grid Lines for "Map" feel */}
            <View style={styles.gridLineV} />
            <View style={[styles.gridLineV, { left: '66%' }]} />
            <View style={styles.gridLineH} />
            <View style={[styles.gridLineH, { top: '66%' }]} />

            {/* Target Location Marker */}
            <View style={styles.markerContainer}>
              <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulseAnim }] }]} />
              <MapPin size={32} color={THEME.cyan} />
            </View>
          </View>
          
          {/* Coordinates Overlay */}
          <View style={styles.coordsOverlay}>
            <Text style={styles.coordsLabel}>TARGET COORDINATES</Text>
            <Text style={styles.coordsText}>28.6139° N, 77.2090° E</Text>
          </View>
        </View>

        {/* Task Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskLabel}>ACTIVE TASK</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>IN PROGRESS</Text>
              </View>
            </View>
            
            <Text style={styles.taskTitle}>Emergency Medicine Delivery</Text>
            
            <View style={styles.infoRow}>
              <Info size={16} color={THEME.dark.sub} />
              <Text style={styles.infoText}>Deliver to Gate 4, Apollo Apartments</Text>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.navButton}>
              <Navigation size={20} color="#000" />
              <Text style={styles.navButtonText}>START NAVIGATION</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    height: 60 
  },
  backBtn: { padding: 8 },
  headerTitle: { 
    color: '#FFF', 
    fontSize: 12, 
    fontWeight: '900', 
    letterSpacing: 2, 
    marginLeft: 10 
  },

  /* Map Styles */
  mapContainer: { 
    height: '45%', 
    width: '100%', 
    backgroundColor: '#111', 
    position: 'relative',
    overflow: 'hidden'
  },
  fakeMap: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: THEME.dark.border
  },
  gridLineV: { position: 'absolute', width: 1, height: '100%', backgroundColor: '#1A1A1A', left: '33%' },
  gridLineH: { position: 'absolute', height: 1, width: '100%', backgroundColor: '#1A1A1A', top: '33%' },
  markerContainer: { alignItems: 'center', justifyContent: 'center' },
  pulseDot: { 
    position: 'absolute', 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(0, 186, 242, 0.2)' 
  },
  coordsOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 12,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: THEME.cyan
  },
  coordsLabel: { color: THEME.dark.sub, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  coordsText: { color: '#FFF', fontSize: 13, marginTop: 4, fontWeight: '200' },

  /* Task Detail Styles */
  detailsContainer: { flex: 1, padding: 30 },
  taskCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.dark.border,
  },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  taskLabel: { color: THEME.cyan, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  statusBadge: { backgroundColor: '#1A1A1A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { color: '#FFF', fontSize: 8, fontWeight: '800' },
  taskTitle: { color: '#FFF', fontSize: 22, fontWeight: '300', marginBottom: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  infoText: { color: THEME.dark.sub, fontSize: 13 },
  divider: { height: 1, backgroundColor: THEME.dark.border, marginBottom: 20 },
  navButton: {
    flexDirection: 'row',
    backgroundColor: THEME.cyan,
    paddingVertical: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  navButtonText: { color: '#000', fontWeight: '900', fontSize: 13, letterSpacing: 1 }
});