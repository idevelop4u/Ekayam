import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Animated, StatusBar, Easing
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ShieldCheck, Sun, Moon } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F2F2F2', text: '#171717', sub: '#636366', border: '#D1D1D6' },
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#2C2C2E' }
};

export default function UserDashboard() {
  const [isDark, setIsDark] = useState(true);
  
  const themeValue = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const titleScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

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
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle} accessibilityLabel="Toggle Theme">
              {isDark ? <Sun size={28} color="#FBBF24" /> : <Moon size={28} color="#171717" />}
            </TouchableOpacity>
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
          </View>

          <View style={styles.hero}>
            <Animated.Text style={[styles.greeting, { color: textColor }]}>Hello, Neighbor.</Animated.Text>
            <View style={styles.trustRow}>
              <ShieldCheck size={18} color={THEME.cyan} />
              <Animated.Text style={[styles.trustText, { color: subColor }]}>TRUST SCORE: 98%</Animated.Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mainAction} activeOpacity={0.8}>
            <View style={styles.actionLeft}>
              <Text style={styles.actionTitle}>REQUEST HELP</Text>
              <Text style={styles.actionSub}>Find a volunteer nearby</Text>
            </View>
            <View style={styles.plusCircle}>
              <Plus size={32} color="#FFF" />
            </View>
          </TouchableOpacity>

          <Animated.Text style={[styles.sectionLabel, { color: subColor }]}>RECENT TASKS</Animated.Text>
          <Animated.View style={[styles.emptyState, { borderTopColor: borderColor }]}>
            <Animated.Text style={[styles.emptyText, { color: subColor }]}>
              No active requests.{"\n"}The community is here when you need it.
            </Animated.Text>
          </Animated.View>

        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 25, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 40 },
  themeToggle: { alignSelf: 'flex-end', padding: 12, backgroundColor: 'rgba(120,120,120,0.1)', borderRadius: 30 },
  brandContainer: { alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'baseline' },
  hindiTitle: { fontSize: 48, fontWeight: '800' },
  latinTitle: { fontSize: 48, fontWeight: '300', marginLeft: 4 },
  taglineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  glowDot: { width: 8, height: 8, backgroundColor: THEME.cyan, borderRadius: 4, marginRight: 10 },
  tagline: { fontSize: 12, letterSpacing: 2, fontWeight: '900' },
  hero: { marginBottom: 40 },
  greeting: { fontSize: 40, fontWeight: '700', letterSpacing: -0.5 },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  trustText: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  mainAction: { 
    backgroundColor: THEME.cyan, 
    borderRadius: 20, 
    padding: 32, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  actionLeft: { flex: 1 },
  actionTitle: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  actionSub: { color: '#FFF', fontSize: 16, marginTop: 6, fontWeight: '600', opacity: 0.9 },
  plusCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center' },
  sectionLabel: { fontSize: 14, letterSpacing: 1.5, fontWeight: '900', marginBottom: 20 },
  emptyState: { paddingVertical: 60, alignItems: 'center', borderTopWidth: 1.5 },
  emptyText: { textAlign: 'center', fontSize: 18, fontWeight: '400', lineHeight: 28 },
});