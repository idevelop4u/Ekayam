import { AuthProvider } from '../context/AuthContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // The Provider MUST be the outermost wrapper
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* These match your folder groups */}
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(user)" />
        <Stack.Screen name="(helper)" />
      </Stack>
    </AuthProvider>
  );
}
