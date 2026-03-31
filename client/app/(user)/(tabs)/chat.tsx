import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Search, Send, MapPin } from 'lucide-react-native';
import api from '../../../services/api';
import { socket } from '../../../services/socket';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#2C2C2E', input: '#1A1A1A' }
};

export default function ChatScreen() {
  const [activeTask, setActiveTask] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchActiveChat();
  }, []);

  useEffect(() => {
    if (activeTask && socket) {
      // Listen for incoming messages
      socket.on('newMessage', (message) => {
        if (message.taskId === activeTask._id) {
          setMessages(prev => [...prev, message]);
          setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
        }
      });
      return () => {
        socket.off('newMessage');
      };
    }
  }, [activeTask]);

  const fetchActiveChat = async () => {
    try {
      const res = await api.get('/tasks/my-tasks');
      const active = res.data.tasks?.find((t: any) => ['in_progress', 'helper_arrived', 'task_started'].includes(t.status));
      if (active) {
        setActiveTask(active);
        const chatRes = await api.get(`/chat/${active._id}`);
        setMessages(chatRes.data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load chat", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!inputText.trim() || !activeTask) return;
    socket.emit('sendMessage', {
      taskId: activeTask._id,
      content: inputText
    });
    setInputText('');
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={THEME.cyan} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MESSAGES</Text>
          <TouchableOpacity style={{ padding: 10 }}>
            <Search size={28} color={THEME.dark.sub} />
          </TouchableOpacity>
        </View>

        {!activeTask ? (
          <ScrollView contentContainerStyle={styles.emptyContent}>
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
        ) : (
          <View style={styles.chatArea}>
            <View style={styles.taskBanner}>
              <MapPin size={20} color={THEME.cyan} />
              <Text style={styles.taskBannerText}>LIVE: {activeTask.title}</Text>
            </View>
            <ScrollView 
              ref={scrollViewRef}
              style={styles.messageList} 
              contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
            >
              {messages.map((msg, i) => {
                const isMe = msg.sender === activeTask.requester?._id; // Simplified assumption for UI demo
                return (
                  <View key={i} style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}>
                    <Text style={styles.messageText}>{msg.content}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.inputArea}>
              <TextInput 
                style={styles.input} 
                placeholder="Type a message..." 
                placeholderTextColor={THEME.dark.sub}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                <Send size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  emptyContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 35 },
  emptyContainer: { alignItems: 'center' },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', marginBottom: 30, borderWidth: 2, borderColor: THEME.dark.border },
  emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', marginBottom: 15 },
  emptySub: { color: THEME.dark.sub, textAlign: 'center', fontSize: 18, lineHeight: 28, fontWeight: '400' },
  chatArea: { flex: 1 },
  taskBanner: { backgroundColor: '#111', padding: 15, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: THEME.dark.border },
  taskBannerText: { color: THEME.cyan, fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  messageList: { flex: 1 },
  messageBubble: { maxWidth: '80%', padding: 15, borderRadius: 20, marginBottom: 15 },
  myBubble: { backgroundColor: THEME.cyan, alignSelf: 'flex-end', borderBottomRightRadius: 5 },
  theirBubble: { backgroundColor: THEME.dark.border, alignSelf: 'flex-start', borderBottomLeftRadius: 5 },
  messageText: { color: '#FFF', fontSize: 16, lineHeight: 24 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingBottom: Platform.OS === 'ios' ? 25 : 15, borderTopWidth: 1, borderTopColor: THEME.dark.border, backgroundColor: '#000' },
  input: { flex: 1, backgroundColor: THEME.dark.input, color: '#FFF', padding: 15, borderRadius: 25, fontSize: 16, marginRight: 10 },
  sendBtn: { backgroundColor: THEME.cyan, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }
});