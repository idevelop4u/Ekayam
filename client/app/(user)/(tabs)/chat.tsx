import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Search } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#2C2C2E' }
};

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MESSAGES</Text>
          <TouchableOpacity style={{ padding: 10 }}>
            <Search size={28} color={THEME.dark.sub} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
              <MessageSquare size={40} color={THEME.cyan} />
            </View>
            <Text style={styles.emptyTitle}>NO CONVERSATIONS</Text>
            <Text style={styles.emptySub}>
              When you request help or volunteer, your chats will appear here.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 20 },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 35 },
  emptyContainer: { alignItems: 'center' },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', marginBottom: 30, borderWidth: 2, borderColor: THEME.dark.border },
  emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', marginBottom: 15 },
  emptySub: { color: THEME.dark.sub, textAlign: 'center', fontSize: 18, lineHeight: 28, fontWeight: '400' }
});