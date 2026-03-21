import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Lock, Eye, EyeOff, ArrowRight, Briefcase, Home } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type FormState = {
  email: string;
  password: string;
  showPassword: boolean;
  role: 'user' | 'helper';
};

type RoleOption = 'user' | 'helper';

export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    showPassword: false,
    role: 'user',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);

      // Default credentials check
      if (form.email === 'admin' && form.password === 'admin123') {
        // Successful login - redirect based on role
        if (form.role === 'helper') {
          // Redirect to helper dashboard (to be created)
          router.replace('/helper-dashboard');
        } else {
          // Redirect to user dashboard (tabs)
          router.replace('/(tabs)');
        }
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid credentials. Use admin / admin123',
          [{ text: 'OK' }]
        );
      }
    }, 1000);
  };

  const selectRole = (role: RoleOption) => {
    setForm({ ...form, role });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="px-6 pt-8 pb-4">
          <Text className="text-4xl font-bold text-foreground mb-2">Welcome Back</Text>
          <Text className="text-muted-foreground text-lg">
            Sign in to continue to HelpMate
          </Text>
        </View>

        {/* Scrollable Form Section */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-6">
            {/* Role Selection */}
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground mb-1">
                I want to
              </Text>
              <View className="flex-row gap-3">
                {/* User Role Option */}
                <TouchableOpacity
                  onPress={() => selectRole('user')}
                  className={`flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl border-2 transition-colors ${
                    form.role === 'user'
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card'
                  }`}
                >
                  <Home 
                    size={20} 
                    color={form.role === 'user' ? 'rgb(13, 148, 136)' : 'rgb(100, 116, 139)'} 
                  />
                  <Text 
                    className={`font-semibold text-base ${
                      form.role === 'user' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Get Help
                  </Text>
                </TouchableOpacity>

                {/* Helper Role Option */}
                <TouchableOpacity
                  onPress={() => selectRole('helper')}
                  className={`flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl border-2 transition-colors ${
                    form.role === 'helper'
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card'
                  }`}
                >
                  <Briefcase 
                    size={20} 
                    color={form.role === 'helper' ? 'rgb(13, 148, 136)' : 'rgb(100, 116, 139)'} 
                  />
                  <Text 
                    className={`font-semibold text-base ${
                      form.role === 'helper' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Help Others
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Email Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Email or Username
              </Text>
              <View className="flex-row items-center bg-input border border-border rounded-xl px-4 h-14">
                <User className="text-muted-foreground" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-foreground text-base"
                  placeholder="Enter your email"
                  placeholderTextColor="#94a3b8"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  autoCapitalize="none"
                  autoCorrect={false}
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
                  placeholder="Enter your password"
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
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity className="self-end">
              <Text className="text-primary font-semibold text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`bg-primary rounded-xl py-4 flex-row items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                <Text className="text-primary-foreground font-semibold text-lg">
                  Signing in...
                </Text>
              ) : (
                <>
                  <Text className="text-primary-foreground font-semibold text-lg mr-2">
                    Sign In as {form.role === 'helper' ? 'Helper' : 'User'}
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

            {/* Sign Up Link */}
            <TouchableOpacity
              onPress={() => router.push('/register')}
              className="bg-secondary rounded-xl py-4 items-center"
            >
              <Text className="text-secondary-foreground font-semibold text-lg">
                Create New Account
              </Text>
            </TouchableOpacity>

            {/* Demo Credentials Hint */}
            <View className="mt-4 bg-muted/50 rounded-xl p-4 border border-border">
              <Text className="text-xs text-muted-foreground mb-2 font-semibold">
                Demo Credentials:
              </Text>
              <Text className="text-sm text-foreground">
                Username: <Text className="font-mono">admin</Text>
              </Text>
              <Text className="text-sm text-foreground">
                Password: <Text className="font-mono">admin123</Text>
              </Text>
              <Text className="text-xs text-muted-foreground mt-2">
                Select your role above to test different dashboards
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}