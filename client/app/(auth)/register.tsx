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
import { ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F8F8F8', text: '#171717', sub: '#8E8E93', border: '#D1D1D6' },
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function RegisterScreen() {
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

  // 1. Entrance & Glowing Animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleScale, { 
        toValue: 1, 
        duration: 1000, 
        easing: Easing.out(Easing.cubic), 
        useNativeDriver: true 
      }),
      Animated.timing(titleOpacity, { 
        toValue: 1, 
        duration: 800, 
        useNativeDriver: true 
      })
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // 2. Typing Greeting Logic
  useEffect(() => {
    const fullText = role === 'User' ? "Join the family." : "Start your journey.";
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

  // 3. Theme Toggle Logic
  const toggleTheme = () => {
    const nextIsDark = !isDark;
    Animated.timing(themeValue, { 
      toValue: nextIsDark ? 1 : 0, 
      duration: 500, 
      useNativeDriver: false 
    }).start();
    setIsDark(nextIsDark);
  };

  // Interpolations
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
              <View style={styles.topRow}>
                {/* BACK OPTION: Top Arrow Navigation */}
                <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.backBtn}>
                  <ArrowLeft size={26} color={isDark ? "#FFF" : "#171717"} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                  {isDark ? <Sun size={24} color="#FBBF24" /> : <Moon size={24} color="#171717" />}
                </TouchableOpacity>
              </View>
              
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
              {!isOtpSent ? (
                <>
                  <View style={styles.inputWrapper}>
                    <Animated.Text style={[styles.inputLabel, { color: subColor }]}>FULL NAME</Animated.Text>
                    <Animated.View style={[styles.inputLine, { borderBottomColor: borderColor }]}>
                      <TextInput 
                        placeholder="e.g. John Doe" 
                        placeholderTextColor={isDark ? "#3A3A3C" : "#C7C7CC"} 
                        style={[styles.textInput, { color: isDark ? "#FFF" : "#000" }]} 
                      />
                    </Animated.View>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Animated.Text style={[styles.inputLabel, { color: subColor }]}>MOBILE NUMBER</Animated.Text>
                    <Animated.View style={[styles.inputLine, { borderBottomColor: borderColor }]}>
                      <TextInput 
                        placeholder="91 00000 00000" 
                        placeholderTextColor={isDark ? "#3A3A3C" : "#C7C7CC"} 
                        style={[styles.textInput, { color: isDark ? "#FFF" : "#000" }]} 
                        keyboardType="number-pad" 
                      />
                    </Animated.View>
                  </View>
                </>
              ) : (
                <View style={styles.inputWrapper}>
                  <Animated.Text style={[styles.inputLabel, { color: subColor }]}>ENTER OTP</Animated.Text>
                  <Animated.View style={[styles.inputLine, { borderBottomColor: borderColor }]}>
                    <TextInput 
                      placeholder="• • • •" 
                      placeholderTextColor={isDark ? "#3A3A3C" : "#C7C7CC"} 
                      style={[styles.textInput, { color: isDark ? "#FFF" : "#000", letterSpacing: 12 }]} 
                      keyboardType="number-pad" 
                    />
                  </Animated.View>
                </View>
              )}

              <TouchableOpacity style={styles.mainButton} activeOpacity={0.8} onPress={() => !isOtpSent && setIsOtpSent(true)}>
                <Text style={styles.buttonText}>{isOtpSent ? "FINISH" : "REGISTER"}</Text>
                <ArrowRight size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* BACK OPTION: Bottom Text Link */}
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.footer}>
              <Animated.Text style={[styles.footerText, { color: subColor }]}>
                ALREADY JOINED? <Text style={{ color: THEME.cyan, fontWeight: '900' }}>LOGIN</Text>
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
  header: { marginTop: 10, marginBottom: 50 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { padding: 8, marginLeft: -12 },
  themeToggle: { padding: 8 },
  brandContainer: { alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'baseline' },
  hindiTitle: { fontSize: 52, fontWeight: '800', letterSpacing: -2 },
  latinTitle: { fontSize: 52, fontWeight: '100', marginLeft: 2 },
  taglineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 0, paddingLeft: 4 },
  glowDot: { width: 7, height: 7, backgroundColor: THEME.cyan, borderRadius: 3.5, marginRight: 8, shadowColor: THEME.cyan, shadowRadius: 5, shadowOpacity: 0.9 },
  tagline: { fontSize: 9, letterSpacing: 5, fontWeight: '900' },
  heroSection: { marginBottom: 35, minHeight: 65 },
  greetingText: { fontSize: 22, fontWeight: '300', lineHeight: 30 },
  tabs: { flexDirection: 'row', gap: 32, marginBottom: 40 },
  tabItem: { paddingVertical: 4 },
  tabLabel: { fontSize: 16, fontWeight: '700' },
  tabIndicator: { height: 2, backgroundColor: THEME.cyan, width: '100%', marginTop: 4 },
  formContainer: { gap: 35 },
  inputWrapper: { gap: 10 },
  inputLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  inputLine: { borderBottomWidth: 1, height: 45, justifyContent: 'center' },
  textInput: { fontSize: 20, padding: 0 },
  mainButton: { backgroundColor: THEME.cyan, height: 56, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  footer: { marginTop: 'auto', paddingVertical: 35, alignItems: 'center' },
  footerText: { fontSize: 11, letterSpacing: 2 },
});