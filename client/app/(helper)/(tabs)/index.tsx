import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet,
  Animated, StatusBar, ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Award, Wallet, Sun, Moon, CheckCircle } from 'lucide-react-native';
import api from '../../../services/api';

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F2F2F2', text: '#171717', sub: '#444446', border: '#C7C7CC' },
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#A1A1A6', border: '#3A3A3C' }
};

export default function HelperDashboard() {
  const [isDark, setIsDark] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [nearbyTasks, setNearbyTasks] = useState<any[]>([]);
  const [activeMissions, setActiveMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const themeValue = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (isActive) {
      fetchDashboardData();
    }
  }, [isActive]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Use fallback coordinates if geolocation is unavailable in simulator
      const lat = 12.9716; 
      const lng = 77.5946;
      
      const [discoverRes, myTasksRes] = await Promise.all([
        api.get(`/tasks/discover?lat=${lat}&lng=${lng}&radius=10`),
        api.get('/tasks/my-tasks')
      ]);

      setNearbyTasks(discoverRes.data.tasks || []);
      // Active missions are those accepted but not fully completed
      const myActive = (myTasksRes.data.tasks || []).filter((t: any) => t.status === 'accepted');
      setActiveMissions(myActive);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTask = async (taskId: string) => {
    try {
      await api.post(`/help-requests/apply/${taskId}`);
      Alert.alert("Success", "You have applied for this mission. Waiting for requester approval.");
      fetchDashboardData();
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Could not accept task");
    }
  };

  const handleCompleteTask = (taskId: string) => {
    Alert.prompt(
      "Complete Task",
      "Enter the 4-digit OTP from the requester to complete this task:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: async (otp) => {
            if (!otp) return;
            try {
              await api.post(`/tasks/${taskId}/verify-completion`, { otp });
              Alert.alert("Mission Accomplished!", "You earned trust points and credits.");
              fetchDashboardData();
            } catch (err: any) {
              Alert.alert("Verification Failed", err.response?.data?.message || "Invalid OTP");
            }
          }
        }
      ],
      "plain-text",
      "",
      "number-pad"
    );
  };

  const toggleTheme = () => {
    const next = !isDark;
    Animated.timing(themeValue, { toValue: next ? 1 : 0, duration: 400, useNativeDriver: false }).start();
    setIsDark(next);
  };

  const bgColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.bg, THEME.dark.bg] });
  const textColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.text, THEME.dark.text] });
  const subColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.sub, THEME.dark.sub] });
  const borderColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.border, THEME.dark.border] });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle} activeOpacity={0.7}>
              {isDark ? <Sun size={32} color="#FBBF24" /> : <Moon size={32} color="#171717" />}
            </TouchableOpacity>
            <View style={styles.brandContainer}>
              <View style={styles.titleRow}>
                <Animated.Text style={[styles.hindiTitle, { color: textColor }]}>एका</Animated.Text>
                <Animated.Text style={[styles.latinTitle, { color: textColor }]}>yam</Animated.Text>
              </View>
              <View style={styles.taglineRow}>
                <Animated.View style={[styles.glowDot, { opacity: glowAnim }]} />
                <Animated.Text style={[styles.tagline, { color: subColor }]}>VOLUNTEER HUB</Animated.Text>
              </View>
            </View>
          </View>

          <Animated.View style={[styles.statusLine, { borderBottomColor: borderColor }]}>
            <View style={{ flex: 1, paddingRight: 20 }}>
              <Animated.Text style={[styles.statusTitle, { color: textColor }]}>
                {isActive ? "ONLINE" : "OFFLINE"}
              </Animated.Text>
              <Animated.Text style={[styles.statusSub, { color: subColor }]}>
                {isActive ? "Looking for people to help" : "Turn on to help others"}
              </Animated.Text>
            </View>
            <Switch 
              value={isActive} 
              onValueChange={setIsActive} 
              trackColor={{ false: '#3A3A3C', true: THEME.cyan }}
              thumbColor="#FFF"
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            />
          </Animated.View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Wallet size={24} color={THEME.cyan} />
                <Animated.Text style={[styles.statLab, { color: subColor }]}>CREDITS</Animated.Text>
              </View>
              <Animated.Text style={[styles.statVal, { color: textColor }]}>120</Animated.Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Award size={24} color={THEME.cyan} />
                <Animated.Text style={[styles.statLab, { color: subColor }]}>SCORE</Animated.Text>
              </View>
              <Animated.Text style={[styles.statVal, { color: textColor }]}>4.9</Animated.Text>
            </View>
          </View>

          {!isActive ? (
            <View style={styles.emptyState}>
              <Animated.Text style={[styles.emptyText, { color: subColor }]}>
                Switch to "ONLINE" at the top to see people needing help nearby.
              </Animated.Text>
            </View>
          ) : loading ? (
            <ActivityIndicator color={THEME.cyan} size="large" style={{ marginTop: 30 }} />
          ) : (
            <>
              {activeMissions.length > 0 && (
                <>
                  <Animated.Text style={[styles.sectionLabel, { color: THEME.cyan }]}>ACTIVE MISSIONS</Animated.Text>
                  {activeMissions.map((task) => (
                    <View key={`active-${task._id}`} style={[styles.taskCard, { borderColor: THEME.cyan, flexDirection: 'column', alignItems: 'stretch' }]}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                        <View style={styles.taskInfo}>
                          <Animated.Text style={[styles.taskTitle, { color: textColor }]}>{task.title}</Animated.Text>
                          <View style={styles.locRow}>
                            <MapPin size={16} color={THEME.cyan} />
                            <Animated.Text style={[styles.locText, { color: subColor }]}>{task.location?.address || 'Location Hidden'}</Animated.Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={{ backgroundColor: THEME.cyan, padding: 15, borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10 }}
                        onPress={() => handleCompleteTask(task._id)}
                      >
                        <CheckCircle color="#FFF" size={20} />
                        <Text style={{ color: '#FFF', fontWeight: '800' }}>COMPLETE TASK</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}

              <Animated.Text style={[styles.sectionLabel, { color: subColor, marginTop: 10 }]}>NEARBY REQUESTS</Animated.Text>
              {nearbyTasks.length > 0 ? nearbyTasks.map((task) => (
                <View key={`nearby-${task._id}`} style={[styles.taskCard, { borderColor: borderColor, flexDirection: 'column', alignItems: 'stretch' }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                     <View style={styles.taskInfo}>
                      <Animated.Text style={[styles.taskTitle, { color: textColor }]}>{task.title}</Animated.Text>
                      <View style={styles.locRow}>
                        <MapPin size={16} color={THEME.cyan} />
                        <Animated.Text style={[styles.locText, { color: subColor }]}>{task.category.toUpperCase()}</Animated.Text>
                      </View>
                      <Animated.Text style={{ color: subColor, fontSize: 14, marginTop: 5 }}>{task.description}</Animated.Text>
                    </View>
                    <Text style={styles.rewardText}>+{task.rewardPoints || 10}</Text>
                  </View>
                  <TouchableOpacity 
                    style={{ backgroundColor: isDark ? '#222' : '#E5E5EA', padding: 15, borderRadius: 10, alignItems: 'center' }}
                    onPress={() => handleAcceptTask(task._id)}
                  >
                    <Text style={{ color: THEME.cyan, fontWeight: '800' }}>ACCEPT REQUEST</Text>
                  </TouchableOpacity>
                </View>
              )) : (
                <View style={[styles.emptyState, { paddingTop: 20 }]}>
                   <Animated.Text style={[styles.emptyText, { color: subColor }]}>No requests nearby right now.</Animated.Text>
                </View>
              )}
            </>
          )}

        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 25, paddingBottom: 60 },
  header: { marginTop: 20, marginBottom: 40 },
  themeToggle: { alignSelf: 'flex-end', padding: 15, marginBottom: 10, backgroundColor: 'rgba(128,128,128,0.1)', borderRadius: 12 },
  brandContainer: { alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'baseline' },
  hindiTitle: { fontSize: 56, fontWeight: '800', letterSpacing: -1.5 },
  latinTitle: { fontSize: 56, fontWeight: '200', marginLeft: 4 },
  taglineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  glowDot: { width: 10, height: 10, backgroundColor: THEME.cyan, borderRadius: 5, marginRight: 10 },
  tagline: { fontSize: 14, letterSpacing: 2, fontWeight: '900' },
  statusLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 35, borderBottomWidth: 2, marginBottom: 40 },
  statusTitle: { fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  statusSub: { fontSize: 18, marginTop: 8, lineHeight: 24 },
  statsContainer: { flexDirection: 'row', gap: 15, marginBottom: 50 },
  statItem: { flex: 1, padding: 20, backgroundColor: 'rgba(128,128,128,0.05)', borderRadius: 15 },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  statVal: { fontSize: 36, fontWeight: '700' },
  statLab: { fontSize: 14, letterSpacing: 1, fontWeight: '800' },
  sectionLabel: { fontSize: 16, letterSpacing: 1, fontWeight: '900', marginBottom: 20 },
  emptyState: { paddingVertical: 50, alignItems: 'center', paddingHorizontal: 20 },
  emptyText: { textAlign: 'center', fontSize: 20, fontWeight: '400', lineHeight: 30 },
  taskCard: { paddingVertical: 25, paddingHorizontal: 20, borderWidth: 2, borderRadius: 20, marginBottom: 20 },
  taskInfo: { gap: 4, flex: 1, paddingRight: 10 },
  taskTitle: { fontSize: 22, fontWeight: '700' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  locText: { fontSize: 14, fontWeight: '600' },
  rewardText: { fontSize: 24, fontWeight: '900', color: THEME.cyan },
});