import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Animated, StatusBar, Easing
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ShieldCheck, Sun, Moon } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F2F2F2', text: '#171717', sub: '#8E8E93', border: '#D1D1D6' },
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function UserDashboard() {
  const [isDark, setIsDark] = useState(true);
  
  // Animations
  const themeValue = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const titleScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.timing(titleScale, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
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
          
          {/* Brand Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              {isDark ? <Sun size={20} color="#FBBF24" /> : <Moon size={20} color="#171717" />}
            </TouchableOpacity>
            <Animated.View style={[styles.brandContainer, { transform: [{ scale: titleScale }] }]}>
              <View style={styles.titleRow}>
                <Animated.Text style={[styles.hindiTitle, { color: textColor }]}>एका</Animated.Text>
                <Animated.Text style={[styles.latinTitle, { color: textColor }]}>yam</Animated.Text>
              </View>
              <View style={styles.taglineRow}>
                <Animated.View style={[styles.glowDot, { opacity: glowAnim }]} />
                <Animated.Text style={[styles.tagline, { color: subColor }]}>COMMUNITY CONNECT</Animated.Text>
              </View>
            </Animated.View>
          </View>

          {/* Welcome & Trust */}
          <View style={styles.hero}>
            <Animated.Text style={[styles.greeting, { color: textColor }]}>Hello, Neighbor.</Animated.Text>
            <View style={styles.trustRow}>
              <ShieldCheck size={14} color={THEME.cyan} />
              <Animated.Text style={[styles.trustText, { color: subColor }]}>TRUST SCORE: 98%</Animated.Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity style={styles.mainAction} activeOpacity={0.9}>
            <View style={styles.actionLeft}>
              <Text style={styles.actionTitle}>REQUEST HELP</Text>
              <Text style={styles.actionSub}>Find a volunteer nearby</Text>
            </View>
            <View style={styles.plusCircle}>
              <Plus size={24} color="#FFF" />
            </View>
          </TouchableOpacity>

          {/* Activity Section */}
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
  content: { paddingHorizontal: 30, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 50 },
  themeToggle: { alignSelf: 'flex-end', padding: 8, marginBottom: 10 },
  brandContainer: { alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'baseline' },
  hindiTitle: { fontSize: 42, fontWeight: '800', letterSpacing: -1.5 },
  latinTitle: { fontSize: 42, fontWeight: '100', marginLeft: 2 },
  taglineRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 3 },
  glowDot: { width: 6, height: 6, backgroundColor: THEME.cyan, borderRadius: 3, marginRight: 8, shadowColor: THEME.cyan, shadowRadius: 4, shadowOpacity: 0.8 },
  tagline: { fontSize: 8, letterSpacing: 4, fontWeight: '900' },

  hero: { marginBottom: 40 },
  greeting: { fontSize: 32, fontWeight: '200', letterSpacing: -0.5 },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  trustText: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },

  mainAction: { 
    backgroundColor: THEME.cyan, 
    borderRadius: 12, 
    padding: 24, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 60 
  },
  actionLeft: { flex: 1, justifyContent: 'center' }, // Fixed missing style
  actionTitle: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  actionSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4, fontWeight: '500' },
  plusCircle: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  sectionLabel: { fontSize: 10, letterSpacing: 2, fontWeight: '900', marginBottom: 20 },
  emptyState: { paddingVertical: 50, alignItems: 'center', borderTopWidth: 1 },
  emptyText: { textAlign: 'center', fontSize: 14, fontWeight: '300', lineHeight: 22 },
});