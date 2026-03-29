import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, ShieldCheck, ArrowRight, RefreshCcw } from 'lucide-react-native';

// 1. Fixed the import path and removed the external authService
import { useAuth } from '../context/AuthContext'; 

export default function LoginScreen() {
  const router = useRouter();
  
  // 2. We pull our new OTP functions directly from the context
  const { requestOtp, verifyOtp } = useAuth();
  
  // State Management
  const [role, setRole] = useState<'user' | 'helper'>('user');
  const [phone, setPhone] = useState('');
  const[otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Request OTP from Backend via Context
  const handleSendOtp = async () => {
    if (phone.length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    try {
      // Calls the function we built in AuthContext
      await requestOtp(phone); 
      setIsOtpSent(true);
      Alert.alert("OTP Sent", "Please check your server console for the mock OTP.");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and Login via Context
  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      Alert.alert("Invalid OTP", "Please enter the 4-digit code.");
      return;
    }

    setIsLoading(true);
    try {
      // Calls the function in AuthContext. It saves the token and user data automatically!
      await verifyOtp(phone, otp);
      
      // 3. Send the user to the "Traffic Controller" (app/index.tsx)
      // It will instantly read their new state and redirect them to their dashboard!
      router.replace('/'); 
      
    } catch (err: any) {
      // If backend throws "Name required for new users", we guide them to Sign Up
      if (err.message && err.message.includes("Name required")) {
        Alert.alert("Account Not Found", "Looks like you are new! Please sign up first.");
      } else {
        Alert.alert("Verification Failed", err.message || "The OTP entered is incorrect.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to your {role === 'user' ? 'Requester' : 'Helper'} account
            </Text>
          </View>

          {/* Role Toggle */}
          <View style={styles.roleContainer}>
            {(['user', 'helper'] as const).map((r) => (
              <TouchableOpacity 
                key={r}
                onPress={() => {
                  setRole(r);
                  setIsOtpSent(false); // Reset if they change roles
                }}
                style={[styles.roleButton, role === r && styles.roleActive]}
              >
                <Text style={[styles.roleText, role === r && styles.roleTextActive]}>
                  {r === 'user' ? 'I need help' : 'I want to help'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conditional Input UI */}
          {!isOtpSent ? (
            <View style={styles.inputSection}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Phone size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  placeholder="98765 43210"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={styles.input}
                  maxLength={10}
                />
              </View>
              
              <TouchableOpacity 
                onPress={handleSendOtp} 
                style={styles.primaryButton}
                disabled={isLoading}
              >
                {isLoading ? <ActivityIndicator color="#fff" /> : (
                  <>
                    <Text style={styles.buttonText}>Send OTP</Text>
                    <ArrowRight size={20} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputSection}>
              <Text style={styles.label}>Verify Phone</Text>
              <Text style={styles.helperText}>Enter the 4-digit code sent to {phone}</Text>
              
              <View style={styles.inputWrapper}>
                <ShieldCheck size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  placeholder="0 0 0 0"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  style={[styles.input, { letterSpacing: 10, fontWeight: 'bold' }]}
                  maxLength={4}
                />
              </View>

              <TouchableOpacity 
                onPress={handleVerifyOtp} 
                style={styles.primaryButton}
                disabled={isLoading}
              >
                {isLoading ? <ActivityIndicator color="#fff" /> : (
                  <Text style={styles.buttonText}>Verify & Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setIsOtpSent(false)} 
                style={styles.secondaryAction}
              >
                <RefreshCcw size={16} color="#64748B" />
                <Text style={styles.secondaryText}>Change Number</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Register Link */}
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/register')} 
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.link}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, flexGrow: 1 },
  header: { marginBottom: 32, marginTop: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0F172A', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 8 },
  
  roleContainer: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  roleButton: { 
    flex: 1, 
    paddingVertical: 14, 
    borderRadius: 12, 
    borderWidth: 1.5, 
    borderColor: '#E2E8F0', 
    alignItems: 'center' 
  },
  roleActive: { borderColor: '#0D9488', backgroundColor: '#F0FDFA' },
  roleText: { fontWeight: '600', color: '#64748B' },
  roleTextActive: { color: '#0D9488' },

  inputSection: { gap: 12 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginLeft: 4 },
  helperText: { fontSize: 13, color: '#64748B', marginBottom: 8, marginLeft: 4 },
  
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC', 
    borderWidth: 1.5, 
    borderColor: '#E2E8F0', 
    borderRadius: 12, 
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 12
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 18, color: '#0F172A' },

  primaryButton: { 
    backgroundColor: '#0D9488', 
    height: 60, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10,
    marginTop: 8
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  secondaryAction: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    marginTop: 20 
  },
  secondaryText: { color: '#64748B', fontWeight: '500' },

  footer: { marginTop: 'auto', paddingVertical: 20 },
  footerText: { textAlign: 'center', color: '#64748B', fontSize: 15 },
  link: { color: '#0D9488', fontWeight: 'bold' }
});
