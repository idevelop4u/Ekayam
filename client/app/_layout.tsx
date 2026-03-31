import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext'; // Verify this path

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(user)" />
        <Stack.Screen name="(helper)" />
      </Stack>
    </AuthProvider>
  );
}