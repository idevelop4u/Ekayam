import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ShieldCheck, Star, CheckCircle2, TrendingUp } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  gold: '#FBBF24',
  dark: { bg: '#000', text: '#FFF', sub: '#AEAEB2', border: '#3A3A3C' }
};

const COMPLETED_TASKS = [
  { id: '1', title: 'Medicine Delivery', date: 'Oct 24', rating: 5.0, credit: '+1' },
  { id: '2', title: 'Grocery Assistance', date: 'Oct 22', rating: 4.8, credit: '+1' },
  { id: '3', title: 'Tech Support for Senior', date: 'Oct 20', rating: 5.0, credit: '+1' },
];

export default function TrustMeterScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SOCIAL LEDGER & TRUST</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Animated.View style={[styles.metersRow, { opacity: fadeAnim }]}>
            <View style={styles.meterWrapper}>
              <View style={[styles.meterCircle, { borderColor: THEME.cyan }]}>
                <ShieldCheck size={24} color={THEME.cyan} style={styles.meterIcon} />
                <Text style={styles.scoreNumber}>98</Text>
                <Text style={styles.scoreLabel}>TRUST SCORE</Text>
              </View>
            </View>

            <View style={styles.meterWrapper}>
              <View style={[styles.meterCircle, { borderColor: THEME.gold }]}>
                <TrendingUp size={24} color={THEME.gold} style={styles.meterIcon} />
                <Text style={styles.scoreNumber}>124</Text>
                <Text style={styles.scoreLabel}>SOCIAL CREDITS</Text>
              </View>
            </View>
          </Animated.View>

          <View style={styles.quickStats}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>4.92</Text>
              <Text style={styles.statLab}>AVG RATING</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>100%</Text>
              <Text style={styles.statLab}>SUCCESS RATE</Text>
            </View>
          </View>

          <Text style={styles.historyTitle}>COMPLETED MISSIONS</Text>
          {COMPLETED_TASKS.map((item) => (
            <View key={item.id} style={styles.taskCard}>
              <View style={styles.taskLeft}>
                <CheckCircle2 size={20} color={THEME.cyan} />
                <View>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <Text style={styles.taskDate}>{item.date}</Text>
                </View>
              </View>
              <View style={styles.taskRight}>
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                <Text style={styles.creditInflow}>{item.credit} SC</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
    paddingVertical: 25 // Slightly more padding for the larger text
  },
  headerTitle: { 
    color: '#FFF', 
    fontSize: 20, // Bigger font
    fontWeight: '900', 
    letterSpacing: 3, // Wider tracking
    marginLeft: 15 
  },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  metersRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 50 },
  meterWrapper: { alignItems: 'center', flex: 1 },
  meterCircle: { width: 155, height: 155, borderRadius: 77.5, borderWidth: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#080808' },
  meterIcon: { marginBottom: 8 },
  scoreNumber: { color: '#FFF', fontSize: 40, fontWeight: '300' },
  scoreLabel: { color: THEME.dark.sub, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  quickStats: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 25, borderTopWidth: 1.5, borderBottomWidth: 1.5, borderColor: THEME.dark.border, marginBottom: 40 },
  statBox: { alignItems: 'center' },
  statVal: { color: '#FFF', fontSize: 24, fontWeight: '400' },
  statLab: { color: THEME.dark.sub, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginTop: 5 },
  historyTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 25 },
  taskCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 22, borderBottomWidth: 1, borderBottomColor: '#222' },
  taskLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  taskTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  taskDate: { color: THEME.dark.sub, fontSize: 14 },
  taskRight: { alignItems: 'flex-end' },
  ratingText: { color: THEME.gold, fontSize: 18, fontWeight: '800' },
  creditInflow: { color: THEME.cyan, fontSize: 12, fontWeight: '900' }
});