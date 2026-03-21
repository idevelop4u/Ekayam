import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Lock, Eye, EyeOff, Mail, Check, ArrowRight, Briefcase, Home } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '@/components/ThemeToggle';

type UserRole = 'user' | 'helper';

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: UserRole;
  showPassword: boolean;
  showConfirmPassword: boolean;
  agreeToTerms: boolean;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
    showPassword: false,
    showConfirmPassword: false,
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!form.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!form.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (!form.password) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!form.agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions');
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success message and navigate to login
      Alert.alert(
        'Account Created',
        `Your ${form.role === 'user' ? 'User' : 'Helper'} account has been created successfully! Please sign in.`,
        [
          { 
            text: 'OK', 
            onPress: () => router.replace('/login') 
          }
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="px-6 pt-8 pb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-4xl font-bold text-foreground mb-2">Create Account</Text>
              <Text className="text-muted-foreground text-lg">
                Join HelpMate today
              </Text>
            </View>
            <ThemeToggle />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}>
          {/* Role Selection */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-foreground mb-3">
              I want to:
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setForm({ ...form, role: 'user' })}
                className={`flex-1 flex-row items-center justify-center gap-2 p-4 rounded-xl border-2 ${
                  form.role === 'user' 
                    ? 'bg-primary border-primary' 
                    : 'bg-card border-border'
                }`}
              >
                <Home 
                  size={20} 
                  color={form.role === 'user' ? '#fff' : '#64748b'} 
                />
                <Text 
                  className={`font-semibold ${
                    form.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Get Help
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setForm({ ...form, role: 'helper' })}
                className={`flex-1 flex-row items-center justify-center gap-2 p-4 rounded-xl border-2 ${
                  form.role === 'helper' 
                    ? 'bg-primary border-primary' 
                    : 'bg-card border-border'
                }`}
              >
                <Briefcase 
                  size={20} 
                  color={form.role === 'helper' ? '#fff' : '#64748b'} 
                />
                <Text 
                  className={`font-semibold ${
                    form.role === 'helper' ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Become a Helper
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Section */}
          <View className="gap-5 mt-2">
            {/* Name Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Full Name
              </Text>
              <View className="flex-row items-center bg-input border border-border rounded-xl px-4 h-14">
                <User className="text-muted-foreground" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-foreground text-base"
                  placeholder="Enter your full name"
                  placeholderTextColor="#94a3b8"
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Email Address
              </Text>
              <View className="flex-row items-center bg-input border border-border rounded-xl px-4 h-14">
                <Mail className="text-muted-foreground" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-foreground text-base"
                  placeholder="Enter your email"
                  placeholderTextColor="#94a3b8"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Phone Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Phone Number
              </Text>
              <View className="flex-row items-center bg-input border border-border rounded-xl px-4 h-14">
                <User className="text-muted-foreground" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-foreground text-base"
                  placeholder="Enter your phone number"
                  placeholderTextColor="#94a3b8"
                  value={form.phone}
                  onChangeText={(text) => setForm({ ...form, phone: text })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Password
              </Text>
              <View className="flex-row items-center bg-input border border-border rounded-xl px-4 h-14">
                <Lock className="text-muted-foreground" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-foreground text-base"
                  placeholder="Create a password"
                  placeholderTextColor="#94a3b8"
                  value={form.password}
                  onChangeText={(text) => setForm({ ...form, password: text })}
                  secureTextEntry={!form.showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setForm({ ...form, showPassword: !form.showPassword })}
                  className="ml-2"
                >
                  {form.showPassword ? (
                    <EyeOff className="text-muted-foreground" size={20} />
                  ) : (
                    <Eye className="text-muted-foreground" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-muted-foreground ml-1">
                Minimum 6 characters
              </Text>
            </View>

            {/* Confirm Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Confirm Password
              </Text>
              <View className="flex-row items-center bg-input border border-border rounded-xl px-4 h-14">
                <Lock className="text-muted-foreground" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-foreground text-base"
                  placeholder="Confirm your password"
                  placeholderTextColor="#94a3b8"
                  value={form.confirmPassword}
                  onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                  secureTextEntry={!form.showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setForm({ ...form, showConfirmPassword: !form.showConfirmPassword })}
                  className="ml-2"
                >
                  {form.showConfirmPassword ? (
                    <EyeOff className="text-muted-foreground" size={20} />
                  ) : (
                    <Eye className="text-muted-foreground" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <Text className="text-xs text-destructive ml-1">
                  Passwords do not match
                </Text>
              )}
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
              onPress={() => setForm({ ...form, agreeToTerms: !form.agreeToTerms })}
              className="flex-row items-center gap-3 mt-2"
            >
              <View className={`w-6 h-6 rounded-md border-2 items-center justify-center ${form.agreeToTerms ? 'bg-primary border-primary' : 'border-border'}`}>
                {form.agreeToTerms && <Check className="text-primary-foreground" size={16} />}
              </View>
              <Text className="text-muted-foreground text-sm flex-1">
                I agree to the <Text className="text-primary font-semibold">Terms & Conditions</Text> and <Text className="text-primary font-semibold">Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              className={`bg-primary rounded-xl py-4 flex-row items-center justify-center mt-4 ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                <Text className="text-primary-foreground font-semibold text-lg">
                  Creating Account...
                </Text>
              ) : (
                <>
                  <Text className="text-primary-foreground font-semibold text-lg mr-2">
                    Create {form.role === 'user' ? 'User' : 'Helper'} Account
                  </Text>
                  <ArrowRight className="text-primary-foreground" size={20} />
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-4 my-2">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-muted-foreground text-sm">or</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Sign In Link */}
            <View className="items-center mt-2">
              <Text className="text-muted-foreground text-base">
                Already have an account?{' '}
                <Text 
                  onPress={() => router.push('/login')}
                  className="text-primary font-semibold text-base"
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}