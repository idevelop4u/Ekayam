import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  TouchableOpacity, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Send, Paperclip, CheckCheck } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function ChatRoom() {
  const { name } = useLocalSearchParams();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi, can you help me with the new layout?', sender: 'other', time: '11:30 PM' },
  ]);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name as string }} />
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.sender === 'me' ? styles.sent : styles.received]}>
            <Text style={styles.msgText}>{item.text}</Text>
            <View style={styles.footer}>
              <Text style={styles.msgTime}>{item.time}</Text>
              {item.sender === 'me' && <CheckCheck size={14} color="#FFF" />}
            </View>
          </View>
        )}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputArea}>
          <TouchableOpacity style={styles.iconBtn}><Paperclip size={22} color={THEME.dark.sub} /></TouchableOpacity>
          <TextInput 
            style={styles.input} 
            placeholder="Message" 
            placeholderTextColor={THEME.dark.sub} 
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendBtn, { backgroundColor: inputText ? THEME.cyan : '#1C1C1E' }]} 
            onPress={sendMessage}
          >
            <Send size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  listContent: { padding: 20 },
  bubble: { padding: 12, borderRadius: 16, marginBottom: 12, maxWidth: '85%' },
  sent: { alignSelf: 'flex-end', backgroundColor: THEME.cyan, borderBottomRightRadius: 2 },
  received: { alignSelf: 'flex-start', backgroundColor: THEME.dark.border, borderBottomLeftRadius: 2 },
  msgText: { color: '#FFF', fontSize: 15, lineHeight: 20 },
  footer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', gap: 4, marginTop: 4 },
  msgTime: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },

  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#000', borderTopWidth: 1, borderTopColor: THEME.dark.border },
  input: { flex: 1, color: '#FFF', backgroundColor: '#1C1C1E', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, maxHeight: 100 },
  iconBtn: { padding: 10 },
  sendBtn: { marginLeft: 8, width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' }
});