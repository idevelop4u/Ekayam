import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, StyleSheet, 
  Animated, StatusBar, ActivityIndicator, RefreshControl, Alert, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ShieldCheck, Sun, Moon, Bell, Clock } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import api from '../../../services/api'; 

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F2F2F2', text: '#171717', sub: '#636366', border: '#D1D1D6' },
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#2C2C2E' }
};

export default function UserDashboard() {
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const themeValue = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  // Re-fetch data every time screen focuses
  useFocusEffect(
    useCallback(() => {
      fetchMyRequests();
    }, [])
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Hits router.get('/my-tasks', ...)
  const fetchMyRequests = async () => {
    try {
      const response = await api.get('/tasks/my-tasks');
      setTasks(response.data.tasks); // Backend returns { tasks: [] }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const toggleTheme = () => {
    const next = !isDark;
    Animated.timing(themeValue, { toValue: next ? 1 : 0, duration: 500, useNativeDriver: false }).start();
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
        <ScrollView 
          contentContainerStyle={styles.content} 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); fetchMyRequests();}} tintColor={THEME.cyan} />}
        >
          <View style={styles.header}>
            <View style={styles.topRowContainer}>
              <View style={styles.brandContainer}>
                <View style={styles.titleRow}>
                  <Animated.Text style={[styles.hindiTitle, { color: textColor }]}>एका</Animated.Text>
                  <Animated.Text style={[styles.latinTitle, { color: textColor }]}>yam</Animated.Text>
                </View>
                <View style={styles.taglineRow}>
                  <Animated.View style={[styles.glowDot, { opacity: glowAnim }]} />
                  <Animated.Text style={[styles.tagline, { color: subColor }]}>COMMUNITY CONNECT</Animated.Text>
                </View>
              </View>
              <View style={styles.topButtonsRow}>
                <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
                  {isDark ? <Sun size={24} color="#FBBF24" /> : <Moon size={24} color="#171717" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/notification')} style={styles.iconButton}>
                  <Bell size={24} color={isDark ? "#FFFFFF" : "#171717"} />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.hero}>
            <Animated.Text style={[styles.greeting, { color: textColor }]}>Hello, Neighbor.</Animated.Text>
            <View style={styles.trustRow}>
              <ShieldCheck size={18} color={THEME.cyan} />
              <Animated.Text style={[styles.trustText, { color: subColor }]}>TRUST SCORE: 98%</Animated.Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 15, marginBottom: 50 }}>
            <TouchableOpacity style={[styles.mainAction, { flex: 2 }]} onPress={() => router.push('/task')}>
              <View style={styles.actionLeft}>
                <Text style={styles.actionTitle}>REQUEST HELP</Text>
                <Text style={styles.actionSub}>Find a volunteer nearby</Text>
              </View>
              <View style={styles.plusCircle}><Plus size={28} color="#FFF" /></View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.mainAction, { flex: 1, backgroundColor: '#FF453A', padding: 20, justifyContent: 'center', alignItems: 'center' }]} 
              onPress={async () => {
                try {
                  await api.post('/tasks/sos', {
                    latitude: 12.9716, // fallback
                    longitude: 77.5946, 
                    address: "Current Location",
                    city: "Local"
                  });
                  Alert.alert("SOS Triggered", "Emergency broadcast sent to all nearby helpers and trusted contacts!");
                  fetchMyRequests(); // refresh active tasks with new SOS task
                } catch (err: any) {
                  Alert.alert("SOS Failed", err.response?.data?.message || "Could not trigger SOS.");
                }
              }}
            >
              <Text style={{ color: '#FFF', fontSize: 24, fontWeight: '900', textAlign: 'center' }}>SOS</Text>
            </TouchableOpacity>
          </View>

          <Animated.Text style={[styles.sectionLabel, { color: subColor }]}>YOUR ACTIVE REQUESTS</Animated.Text>
          
          {loading ? (
            <ActivityIndicator color={THEME.cyan} style={{marginTop: 30}} />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <TouchableOpacity
                key={task._id}
                activeOpacity={0.8}
                onPress={() => router.push('/chat')}
              >
                <Animated.View 
                  style={[styles.taskCard, { backgroundColor: isDark ? '#111' : '#FFF', borderColor: borderColor }]}
                >
                <View style={styles.taskHeader}>
                  <Animated.Text style={[styles.taskTitle, { color: textColor }]}>{task.title}</Animated.Text>
                  <View style={[styles.statusBadge, { backgroundColor: task.status === 'open' ? '#34C759' : task.status === 'cancelled' ? THEME.light.sub : THEME.cyan }]}>
                    <Text style={styles.statusText}>{task.status.replace('_', ' ').toUpperCase()}</Text>
                  </View>
                </View>
                
                {task.status === 'accepted' && (
                  <View style={{ backgroundColor: THEME.cyan + '20', padding: 10, borderRadius: 8, marginVertical: 10, borderWidth: 1, borderColor: THEME.cyan }}>
                    <Text style={{ color: THEME.cyan, fontWeight: '800', fontSize: 12 }}>SHARE THIS OTP WITH VOLUNTEER:</Text>
                    <Text style={{ color: textColor, fontWeight: '900', fontSize: 24, letterSpacing: 4, marginTop: 4 }}>
                      {task.otp || '****'}
                    </Text>
                  </View>
                )}

                <View style={[styles.taskFooter, { justifyContent: 'space-between' }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Clock size={14} color={subColor} />
                    <Animated.Text style={{color: subColor, fontSize: 12}}>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </Animated.Text>
                  </View>

                  {task.status === 'pending_approval' && (
                    <TouchableOpacity 
                      style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: THEME.cyan, borderRadius: 8 }}
                      onPress={async () => {
                        try {
                          const appsRes = await api.get(`/help-requests/task/${task._id}`);
                          const apps = appsRes.data.applications || [];
                          if (apps.length === 0) {
                            Alert.alert("No Applications", "No helpers have applied yet.");
                            return;
                          }
                          const appToApprove = apps[0];
                          Alert.alert(
                            "Helper Applied!",
                            `Would you like to approve ${appToApprove.helper?.username || 'this helper'}?`,
                            [
                              { text: "Cancel", style: 'cancel' },
                              { text: "Approve", onPress: async () => {
                                await api.post(`/help-requests/${appToApprove._id}/approve`);
                                
                                // Generate OTP for the upcoming completion
                                try {
                                  await api.post(`/tasks/${task._id}/generate-otp`);
                                } catch (e) { console.log('OTP generator error handled'); }
                                
                                Alert.alert("Approved", "Task has started!");
                                fetchMyRequests();
                              }}
                            ]
                          );
                        } catch (err) {
                          Alert.alert("Error", "Could not load applications");
                        }
                      }}
                    >
                      <Text style={{ color: '#000', fontSize: 12, fontWeight: '700' }}>VIEW APPLICANTS</Text>
                    </TouchableOpacity>
                  )}

                  {task.status === 'open' && (
                    <TouchableOpacity 
                      style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#FF453A20', borderRadius: 8 }}
                      onPress={async () => {
                        const doCancel = async () => {
                          try {
                            await api.post(`/tasks/${task._id}/cancel`, { reason: 'Cancelled by requester' });
                            Platform.OS === 'web' ? alert("Your request has been cancelled.") : Alert.alert("Cancelled", "Your request has been cancelled.");
                            fetchMyRequests(); // refresh list
                          } catch (err: any) {
                            const msg = err.response?.data?.message || "Failed to cancel task";
                            Platform.OS === 'web' ? alert(msg) : Alert.alert("Error", msg);
                          }
                        };

                        if (Platform.OS === 'web') {
                          if (window.confirm("Are you sure you want to cancel this request?")) {
                            doCancel();
                          }
                        } else {
                          Alert.alert("Cancel Request", "Are you sure you want to cancel this request?", [
                            { text: "No", style: "cancel" },
                            { text: "Yes, Cancel", onPress: doCancel, style: "destructive" }
                          ]);
                        }
                      }}
                    >
                      <Text style={{ color: '#FF453A', fontSize: 12, fontWeight: '700' }}>CANCEL</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            </TouchableOpacity>
            ))
          ) : (
            <Animated.View style={[styles.emptyState, { borderTopColor: borderColor }]}>
              <Animated.Text style={[styles.emptyText, { color: subColor }]}>
                No active requests.{"\n"}The community is here when you need it.
              </Animated.Text>
            </Animated.View>
          )}

        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 25, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 40 },
  topRowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  brandContainer: { flex: 1, alignItems: 'flex-start' },
  topButtonsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconButton: { padding: 10, backgroundColor: 'rgba(120,120,120,0.1)', borderRadius: 25 },
  notificationDot: { position: 'absolute', top: 10, right: 10, width: 9, height: 9, backgroundColor: '#FF453A', borderRadius: 4.5, borderWidth: 1.5, borderColor: '#000' },
  titleRow: { flexDirection: 'row', alignItems: 'baseline' },
  hindiTitle: { fontSize: 44, fontWeight: '800' },
  latinTitle: { fontSize: 44, fontWeight: '300', marginLeft: 4 },
  taglineRow: { flexDirection: 'row', alignItems: 'center', marginTop: -2 },
  glowDot: { width: 8, height: 8, backgroundColor: THEME.cyan, borderRadius: 4, marginRight: 10 },
  tagline: { fontSize: 12, letterSpacing: 2, fontWeight: '900' },
  hero: { marginBottom: 40 },
  greeting: { fontSize: 40, fontWeight: '700', letterSpacing: -0.5 },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  trustText: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  mainAction: { backgroundColor: THEME.cyan, borderRadius: 20, padding: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50 },
  actionLeft: { flex: 1 },
  actionTitle: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  actionSub: { color: '#FFF', fontSize: 16, marginTop: 6, fontWeight: '600', opacity: 0.9 },
  plusCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center' },
  sectionLabel: { fontSize: 14, letterSpacing: 1.5, fontWeight: '900', marginBottom: 20 },
  taskCard: { padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1 },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  taskTitle: { fontSize: 18, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 },
  statusText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  taskFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  emptyState: { paddingVertical: 60, alignItems: 'center', borderTopWidth: 1.5 },
  emptyText: { textAlign: 'center', fontSize: 18, fontWeight: '400', lineHeight: 28 },
});