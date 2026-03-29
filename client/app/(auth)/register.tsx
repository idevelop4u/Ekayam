import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Phone, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { authService } from '../../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  
  // State Management
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    otp: '',
    role: 'user' as 'user' | 'helper'
  });

  // Step 1: Register Info & Request OTP
  const handleSendOtp = async () => {
    if (!form.name || form.phone.length < 10) {
      Alert.alert("Required Fields", "Please provide your full name and a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.requestOtp(form.phone);
      setIsOtpSent(true);
      Alert.alert("OTP Sent", "Check your server terminal for the 4-digit code.");
    } catch (err: any) {
      Alert.alert("Registration Error", err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify & Finalize Account Creation
  const handleCompleteRegistration = async () => {
    if (form.otp.length < 4) {
      Alert.alert("Invalid OTP", "Please enter the 4-digit verification code.");
      return;
    }

    setIsLoading(true);
    try {
      // Passes Name and Role so the Backend creates the MongoDB document
      await authService.verifyOtp(form.phone, form.otp, form.role, form.name);
      
      Alert.alert("Account Created", "Your profile is ready. Please log in to continue.", [
        { text: "Go to Login", onPress: () => router.replace('/(auth)/login') }
      ]);
    } catch (err: any) {
      Alert.alert("Verification Failed", "The OTP entered is incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        enabled={Platform.OS !== 'web'}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>

          <Text style={styles.title}>Join Community</Text>
          <Text style={styles.subtitle}>Help your neighbors or find support nearby</Text>

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            {(['user', 'helper'] as const).map((r) => (
              <TouchableOpacity 
                key={r}
                onPress={() => setForm({ ...form, role: r })}
                style={[styles.roleButton, form.role === r && styles.roleActive]}
              >
                <Text style={[styles.roleText, form.role === r && styles.roleTextActive]}>
                  {r === 'user' ? 'I need help' : 'I want to help'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {!isOtpSent ? (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <User size={20} color="#64748B" />
                  <TextInput 
                    placeholder="e.g. Puspal Ghosal" 
                    style={styles.input} 
                    value={form.name}
                    onChangeText={(t) => setForm({...form, name: t})}
                    editable={!isLoading}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <View style={styles.inputWrapper}>
                  <Phone size={20} color="#64748B" />
                  <TextInput 
                    placeholder="98765 43210" 
                    keyboardType="phone-pad" 
                    style={styles.input}
                    maxLength={10}
                    value={form.phone}
                    onChangeText={(t) => setForm({...form, phone: t})}
                    editable={!isLoading}
                  />
                </View>
              </View>

              <TouchableOpacity 
                onPress={handleSendOtp} 
                style={styles.primaryButton}
                disabled={isLoading}
              >
                {isLoading ? <ActivityIndicator color="#fff" /> : (
                  <>
                    <Text style={styles.buttonText}>Register & Send OTP</Text>
                    <ArrowRight size={20} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.label}>Verify OTP</Text>
              <Text style={styles.helperText}>Enter the code sent to {form.phone}</Text>
              <View style={styles.inputWrapper}>
                <ShieldCheck size={20} color="#64748B" />
                <TextInput 
                  placeholder="0 0 0 0" 
                  keyboardType="number-pad" 
                  style={[styles.input, { letterSpacing: 10, fontWeight: 'bold' }]}
                  maxLength={4}
                  onChangeText={(t) => setForm({...form, otp: t})}
                  editable={!isLoading}
                />
              </View>
              <TouchableOpacity 
                onPress={handleCompleteRegistration} 
                style={styles.primaryButton}
                disabled={isLoading}
              >
                {isLoading ? <ActivityIndicator color="#fff" /> : (
                  <Text style={styles.buttonText}>Complete Registration</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsOtpSent(false)} style={styles.textButton}>
                <Text style={styles.secondaryText}>Back to Info</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>Login</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 24, flexGrow: 1 },
  backButton: { marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0F172A' },
  subtitle: { fontSize: 16, color: '#64748B', marginBottom: 32, marginTop: 4 },
  roleContainer: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  roleButton: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: '#E2E8F0', alignItems: 'center' },
  roleActive: { borderColor: '#0D9488', backgroundColor: '#F0FDFA' },
  roleText: { fontWeight: '600', color: '#64748B' },
  roleTextActive: { color: '#0D9488' },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155' },
  helperText: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC', 
    borderWidth: 1.5, 
    borderColor: '#E2E8F0', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    height: 60 
  },
  input: { 
    flex: 1, 
    marginLeft: 10, 
    fontSize: 16, 
    color: '#0F172A',
    ...Platform.select({ web: { outlineStyle: 'none' } } as any)
  },
  primaryButton: { 
    backgroundColor: '#0D9488', 
    height: 60, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10, 
    marginTop: 10 
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  textButton: { padding: 10, marginTop: 10 },
  secondaryText: { textAlign: 'center', color: '#64748B', fontWeight: '500' },
  footer: { marginTop: 40, paddingBottom: 20 },
  footerText: { textAlign: 'center', color: '#64748B' },
  link: { color: '#0D9488', fontWeight: 'bold' }
});