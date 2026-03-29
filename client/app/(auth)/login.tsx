import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Sun, Moon } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F8F8F8', text: '#171717', sub: '#8E8E93', border: '#D1D1D6' },
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function LoginScreen() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [role, setRole] = useState<'User' | 'Helper'>('User');
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Animation Refs
  const themeValue = useRef(new Animated.Value(1)).current; 
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const titleScale = useRef(new Animated.Value(0.92)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleScale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const fullText = role === 'User' ? "Looking for a helping hand?" : "Ready to change a life today?";
    let currentIdx = 0;
    setDisplayedGreeting("");
    const typingInterval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setDisplayedGreeting(fullText.substring(0, currentIdx + 1));
        currentIdx++;
      } else { clearInterval(typingInterval); }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [role]);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    Animated.timing(themeValue, { toValue: nextIsDark ? 1 : 0, duration: 500, useNativeDriver: false }).start();
    setIsDark(nextIsDark);
  };

  const bgColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.bg, THEME.dark.bg] });
  const textColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.text, THEME.dark.text] });
  const subColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.sub, THEME.dark.sub] });
  const borderColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.border, THEME.dark.border] });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.content} bounces={false} showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
              <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                {isDark ? <Sun size={24} color="#FBBF24" /> : <Moon size={24} color="#171717" />}
              </TouchableOpacity>
              
              <Animated.View style={[styles.brandContainer, { transform: [{ scale: titleScale }], opacity: titleOpacity }]}>
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

            <View style={styles.heroSection}>
              <Animated.Text style={[styles.greetingText, { color: textColor }]}>
                {displayedGreeting}<Text style={{ color: THEME.cyan }}>_</Text>
              </Animated.Text>
            </View>

            <View style={styles.tabs}>
              {['User', 'Helper'].map((t) => (
                <TouchableOpacity key={t} onPress={() => { setRole(t as any); setIsOtpSent(false); }} style={styles.tabItem}>
                  <Animated.Text style={[styles.tabLabel, { color: role === t ? THEME.cyan : subColor }]}>{t}</Animated.Text>
                  {role === t && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Animated.Text style={[styles.inputLabel, { color: subColor }]}>{isOtpSent ? "VERIFICATION" : "MOBILE NUMBER"}</Animated.Text>
                <Animated.View style={[styles.inputLine, { borderBottomColor: borderColor }]}>
                  <TextInput
                    placeholder={isOtpSent ? "0 0 0 0" : "91 00000 00000"}
                    placeholderTextColor={isDark ? "#3A3A3C" : "#C7C7CC"}
                    // selectionColor ensures the blinking cursor is cyan
                    selectionColor={THEME.cyan}
                    style={[styles.textInput, { color: isDark ? "#FFF" : "#000", letterSpacing: isOtpSent ? 12 : 0 }]}
                    keyboardType="number-pad"
                  />
                </Animated.View>
              </View>

              <TouchableOpacity style={styles.mainButton} onPress={() => !isOtpSent && setIsOtpSent(true)}>
                <Text style={styles.buttonText}>{isOtpSent ? "VERIFY" : "SIGN IN"}</Text>
                <ArrowRight size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={styles.footer}>
              <Animated.Text style={[styles.footerText, { color: subColor }]}>
                NO ACCOUNT? <Text style={{ color: THEME.cyan, fontWeight: '900' }}>REGISTER</Text>
              </Animated.Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 32, flexGrow: 1 },
  header: { marginTop: 20, marginBottom: 60 },
  themeToggle: { alignSelf: 'flex-end', padding: 8, marginBottom: 20 },
  brandContainer: { alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'baseline' },
  hindiTitle: { fontSize: 62, fontWeight: '800', letterSpacing: -2 },
  latinTitle: { fontSize: 62, fontWeight: '100', marginLeft: 2 },
  taglineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 0, paddingLeft: 4 },
  glowDot: { width: 8, height: 8, backgroundColor: THEME.cyan, borderRadius: 4, marginRight: 10, shadowColor: THEME.cyan, shadowRadius: 6, shadowOpacity: 0.9 },
  tagline: { fontSize: 10, letterSpacing: 6, fontWeight: '900' },
  heroSection: { marginBottom: 40, minHeight: 70 },
  greetingText: { fontSize: 24, fontWeight: '300', lineHeight: 32 },
  tabs: { flexDirection: 'row', gap: 32, marginBottom: 44 },
  tabItem: { paddingVertical: 4 },
  tabLabel: { fontSize: 16, fontWeight: '700' },
  tabIndicator: { height: 2, backgroundColor: THEME.cyan, width: '100%', marginTop: 4 },
  formContainer: { gap: 40 },
  inputWrapper: { gap: 10 },
  inputLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  inputLine: { borderBottomWidth: 1, height: 50, justifyContent: 'center' },
  textInput: { 
    fontSize: 22, 
    padding: 0,
    // The Magic Fix for the blue box on Web:
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      }
    })
  },
  mainButton: { backgroundColor: THEME.cyan, height: 60, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  footer: { marginTop: 'auto', paddingVertical: 40, alignItems: 'center' },
  footerText: { fontSize: 12, letterSpacing: 2 },
});