import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

const MOCK_CHATS = [
  { id: '1', name: 'Anshu (You)', lastMsg: 'Project update sent.', time: '10:56 PM' },
  { id: '2', name: 'Gauri', lastMsg: 'Teeko kya kaam diya ha', time: '11:27 PM' },
  { id: '3', name: 'FRONTEND-EPICS', lastMsg: 'Layout looks good!', time: '11:27 PM' },
];

export default function ChatList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem}
            activeOpacity={0.7}
            onPress={() => router.push({ 
              pathname: "/(chat)/[id]", 
              params: { id: item.id, name: item.name } 
            })}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.details}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMsg}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  contactItem: { 
    flexDirection: 'row', 
    padding: 18, 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: THEME.dark.border 
  },
  avatar: { 
    width: 54, 
    height: 54, 
    borderRadius: 27, 
    backgroundColor: '#1C1C1E', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarText: { color: '#FFF', fontWeight: '200', fontSize: 20 },
  details: { flex: 1, marginLeft: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  time: { color: THEME.dark.sub, fontSize: 11, fontWeight: '600' },
  lastMsg: { color: THEME.dark.sub, fontSize: 14, fontWeight: '400' },
});