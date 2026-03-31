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
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import api from '../../services/api'; 

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F8F8F8', text: '#171717', sub: '#8E8E93', border: '#D1D1D6', inputBg: '#FFFFFF', inputBorder: '#D1D1D6', divider: '#D1D1D6', socialBg: '#F2F2F2', socialBorder: '#C7C7CC' },
  dark:  { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E', inputBg: '#0D1117', inputBorder: '#30363D', divider: '#30363D', socialBg: '#1C1C1E', socialBorder: '#3A3A3C' }
};

// COMPONENT MOVED OUTSIDE TO FIX THE FOCUS GLITCH
const InputField = ({ label, placeholder, name, value, onChangeText, isDark, subColor, t, focusedField, setFocusedField, ...props }: any) => (
  <View style={styles.inputWrapper}>
    <Animated.Text style={[styles.inputLabel, { color: subColor }]}>{label}</Animated.Text>
    <View style={[styles.githubInput, { 
      backgroundColor: t.inputBg, 
      borderColor: focusedField === name ? THEME.cyan : t.inputBorder 
    }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#484F58" : "#C7C7CC"}
        style={[styles.textInput, { color: t.text }]}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        {...props}
      />
    </View>
  </View>
);

const GoogleSVGIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 48 48">
    <Path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <Path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <Path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <Path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </Svg>
);

const AppleSVGIcon = ({ isDark }: { isDark: boolean }) => (
  <Svg width="18" height="22" viewBox="0 0 24 24">
    <Path
      fill={isDark ? '#FFFFFF' : '#000000'}
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.73M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
    />
  </Svg>
);

export default function RegisterScreen() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [role, setRole] = useState<'User' | 'Helper'>('User');
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  const themeValue = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const titleScale = useRef(new Animated.Value(0.92)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleScale, { toValue: 1, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(titleOpacity, { toValue: 1, duration: 800, useNativeDriver: true })
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

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

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    Animated.timing(themeValue, { toValue: nextIsDark ? 1 : 0, duration: 500, useNativeDriver: false }).start();
    setIsDark(nextIsDark);
  };

  const handleRegister = async () => {
    if (!isOtpSent) {
      if (!fullName || !email || !password || !mobileNumber) {
        Alert.alert("Error", "Please fill in all required fields");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }
      setIsOtpSent(true);
      return;
    }

    try {
      const payload = {
        name: fullName,
        email: email,
        password: password,
        phone: mobileNumber,
        username: email.split('@')[0], 
        rolePreference: role === 'User' ? 'requester' : 'helper',
        verificationDetails: { aadhar }
      };

      const response = await api.post('/auth/signup', payload);

      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully! Please login.", [
          { text: "OK", onPress: () => router.push('/(auth)/login') }
        ]);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Registration failed. Try again.";
      Alert.alert("Error", errorMsg);
      setIsOtpSent(false); 
    }
  };

  const t = isDark ? THEME.dark : THEME.light;
  const bgColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.bg, THEME.dark.bg] });
  const textColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.text, THEME.dark.text] });
  const subColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.sub, THEME.dark.sub] });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.content} bounces={false} showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
              <View style={styles.topRow}>
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
              {['User', 'Helper'].map((tab) => (
                <TouchableOpacity key={tab} onPress={() => { setRole(tab as any); setIsOtpSent(false); }} style={styles.tabItem}>
                  <Animated.Text style={[styles.tabLabel, { color: role === tab ? THEME.cyan : subColor }]}>{tab}</Animated.Text>
                  {role === tab && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formContainer}>
              {!isOtpSent ? (
                <>
                  <InputField label="FULL NAME" placeholder="e.g. John Doe" name="name" value={fullName} onChangeText={setFullName} isDark={isDark} subColor={subColor} t={t} focusedField={focusedField} setFocusedField={setFocusedField} />
                  <InputField label="EMAIL ID" placeholder="e.g. john@email.com" name="email" value={email} onChangeText={setEmail} isDark={isDark} subColor={subColor} t={t} focusedField={focusedField} setFocusedField={setFocusedField} keyboardType="email-address" autoCapitalize="none" />
                  <InputField label="PASSWORD" placeholder="••••••••" name="password" value={password} onChangeText={setPassword} isDark={isDark} subColor={subColor} t={t} focusedField={focusedField} setFocusedField={setFocusedField} secureTextEntry />
                  <InputField label="CONFIRM PASSWORD" placeholder="••••••••" name="confirm" value={confirmPassword} onChangeText={setConfirmPassword} isDark={isDark} subColor={subColor} t={t} focusedField={focusedField} setFocusedField={setFocusedField} secureTextEntry />
                  <InputField label="AADHAR NUMBER" placeholder="XXXX XXXX XXXX" name="aadhar" value={aadhar} onChangeText={setAadhar} isDark={isDark} subColor={subColor} t={t} focusedField={focusedField} setFocusedField={setFocusedField} keyboardType="number-pad" maxLength={14} />
                  <InputField label="MOBILE NUMBER" placeholder="91 00000 00000" name="mobile" value={mobileNumber} onChangeText={setMobileNumber} isDark={isDark} subColor={subColor} t={t} focusedField={focusedField} setFocusedField={setFocusedField} keyboardType="phone-pad" />
                </>
              ) : (
                <View style={styles.inputWrapper}>
                  <Animated.Text style={[styles.inputLabel, { color: subColor }]}>ENTER OTP</Animated.Text>
                  <View style={[styles.githubInput, { 
                    backgroundColor: t.inputBg, 
                    borderColor: focusedField === 'otp' ? THEME.cyan : t.inputBorder 
                  }]}>
                    <TextInput
                      value={otp}
                      onChangeText={setOtp}
                      placeholder="0  0  0  0  0  0"
                      placeholderTextColor={isDark ? "#484F58" : "#C7C7CC"}
                      style={[styles.textInput, { color: t.text, letterSpacing: 12, textAlign: 'center' }]}
                      keyboardType="number-pad"
                      maxLength={6}
                      onFocus={() => setFocusedField('otp')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.mainButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>{isOtpSent ? "FINISH" : "REGISTER"}</Text>
                <ArrowRight size={20} color="#FFF" />
              </TouchableOpacity>

              {!isOtpSent && (
                <>
                  <View style={styles.dividerRow}>
                    <View style={[styles.dividerLine, { backgroundColor: t.divider }]} />
                    <Animated.Text style={[styles.dividerText, { color: subColor }]}>or</Animated.Text>
                    <View style={[styles.dividerLine, { backgroundColor: t.divider }]} />
                  </View>

                  <View style={styles.socialContainer}>
                    <TouchableOpacity style={[styles.socialButton, { backgroundColor: t.socialBg, borderColor: t.socialBorder }]}>
                      <View style={styles.socialButtonInner}>
                        <GoogleSVGIcon />
                        <Text style={[styles.socialButtonText, { color: t.text }]}>Continue with Google</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.socialButton, { backgroundColor: t.socialBg, borderColor: t.socialBorder }]}>
                      <View style={styles.socialButtonInner}>
                        <AppleSVGIcon isDark={isDark} />
                        <Text style={[styles.socialButtonText, { color: t.text }]}>Continue with Apple ID</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

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
  header: { marginTop: 10, marginBottom: 40 },
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
  heroSection: { marginBottom: 32, minHeight: 65 },
  greetingText: { fontSize: 22, fontWeight: '300', lineHeight: 30 },
  tabs: { flexDirection: 'row', gap: 32, marginBottom: 32 },
  tabItem: { paddingVertical: 4 },
  tabLabel: { fontSize: 16, fontWeight: '700' },
  tabIndicator: { height: 2, backgroundColor: THEME.cyan, width: '100%', marginTop: 4 },
  formContainer: { gap: 20 },
  inputWrapper: { gap: 8 },
  inputLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  githubInput: { borderWidth: 1, borderRadius: 6, height: 52, justifyContent: 'center', paddingHorizontal: 14 },
  textInput: { fontSize: 16, padding: 0, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  mainButton: { backgroundColor: THEME.cyan, height: 52, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  buttonText: { color: '#FFF', fontSize: 15, fontWeight: '800', letterSpacing: 2 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13, fontWeight: '500' },
  socialContainer: { gap: 10 },
  socialButton: { height: 46, borderRadius: 6, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 16 },
  socialButtonInner: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  socialButtonText: { fontSize: 14, fontWeight: '500', letterSpacing: 0.1 },
  footer: { marginTop: 'auto', paddingVertical: 32, alignItems: 'center' },
  footerText: { fontSize: 11, letterSpacing: 2 },
});