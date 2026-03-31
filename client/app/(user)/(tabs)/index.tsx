import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, StyleSheet, 
  Animated, StatusBar, ActivityIndicator, RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ShieldCheck, Sun, Moon, Bell, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
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

  useEffect(() => {
    fetchMyRequests();
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

          <TouchableOpacity style={styles.mainAction} onPress={() => router.push('/task')}>
            <View style={styles.actionLeft}>
              <Text style={styles.actionTitle}>REQUEST HELP</Text>
              <Text style={styles.actionSub}>Find a volunteer nearby</Text>
            </View>
            <View style={styles.plusCircle}><Plus size={32} color="#FFF" /></View>
          </TouchableOpacity>

          <Animated.Text style={[styles.sectionLabel, { color: subColor }]}>YOUR ACTIVE REQUESTS</Animated.Text>
          
          {loading ? (
            <ActivityIndicator color={THEME.cyan} style={{marginTop: 30}} />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <Animated.View 
                key={task._id} 
                style={[styles.taskCard, { backgroundColor: isDark ? '#111' : '#FFF', borderColor: borderColor }]}
              >
                <View style={styles.taskHeader}>
                  <Animated.Text style={[styles.taskTitle, { color: textColor }]}>{task.title}</Animated.Text>
                  <View style={[styles.statusBadge, { backgroundColor: task.status === 'open' ? '#34C759' : THEME.cyan }]}>
                    <Text style={styles.statusText}>{task.status.replace('_', ' ').toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.taskFooter}>
                  <Clock size={14} color={subColor} />
                  <Animated.Text style={{color: subColor, fontSize: 12}}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </Animated.Text>
                </View>
              </Animated.View>
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