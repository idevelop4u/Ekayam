import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#2C2C2E' }
};

export default function NotificationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
          <View style={{ width: 48 }} /> 
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
              <Bell size={40} color={THEME.cyan} />
            </View>
            <Text style={styles.emptyTitle}>ALL CAUGHT UP</Text>
            <Text style={styles.emptySub}>
              You'll get notified here when someone accepts your request or sends a message.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 20 
  },
  backBtn: { padding: 10 },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 35 },
  emptyContainer: { alignItems: 'center' },
  iconCircle: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#111', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 30, 
    borderWidth: 2, 
    borderColor: THEME.dark.border 
  },
  emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', marginBottom: 15 },
  emptySub: { color: THEME.dark.sub, textAlign: 'center', fontSize: 18, lineHeight: 28, fontWeight: '400' }
});