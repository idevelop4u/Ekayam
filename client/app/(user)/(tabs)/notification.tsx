// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Bell, ChevronLeft } from 'lucide-react-native';
// import { useRouter } from 'expo-router';

// const THEME = {
//   cyan: '#00BAF2',
//   dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#2C2C2E' }
// };

// export default function NotificationScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//             <ChevronLeft size={28} color="#FFF" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
//           <View style={{ width: 48 }} /> 
//         </View>

//         <ScrollView contentContainerStyle={styles.content}>
//           <View style={styles.emptyContainer}>
//             <View style={styles.iconCircle}>
//               <Bell size={40} color={THEME.cyan} />
//             </View>
//             <Text style={styles.emptyTitle}>ALL CAUGHT UP</Text>
//             <Text style={styles.emptySub}>
//               You'll get notified here when someone accepts your request or sends a message.
//             </Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   header: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     paddingHorizontal: 15, 
//     paddingVertical: 20 
//   },
//   backBtn: { padding: 10 },
//   headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
//   content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 35 },
//   emptyContainer: { alignItems: 'center' },
//   iconCircle: { 
//     width: 100, 
//     height: 100, 
//     borderRadius: 50, 
//     backgroundColor: '#111', 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     marginBottom: 30, 
//     borderWidth: 2, 
//     borderColor: THEME.dark.border 
//   },
//   emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', marginBottom: 15 },
//   emptySub: { color: THEME.dark.sub, textAlign: 'center', fontSize: 18, lineHeight: 28, fontWeight: '400' }
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronLeft, UserCheck, MessageSquare, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import api from '../../../services/api';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#2C2C2E' }
};

export default function NotificationScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Endpoint: GET /api/notifications
      const response = await api.get('/notifications');
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Fetch notifications failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'helper_approved': return <UserCheck size={24} color={THEME.cyan} />;
      case 'new_message': return <MessageSquare size={24} color="#FFF" />;
      default: return <Info size={24} color={THEME.dark.sub} />;
    }
  };

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

        {loading ? <ActivityIndicator style={{marginTop: 50}} color={THEME.cyan} /> : (
          <ScrollView contentContainerStyle={styles.content}>
            {notifications.length > 0 ? (
              notifications.map((notif: any) => (
                <TouchableOpacity key={notif._id} style={styles.notifItem}>
                  <View style={styles.iconBox}>{getIcon(notif.type)}</View>
                  <View style={styles.textBox}>
                    <Text style={styles.notifTitle}>{notif.title}</Text>
                    <Text style={styles.notifBody}>{notif.body}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <View style={styles.iconCircle}><Bell size={40} color={THEME.cyan} /></View>
                <Text style={styles.emptyTitle}>ALL CAUGHT UP</Text>
                <Text style={styles.emptySub}>You'll get notified here when someone accepts your request or sends a message.</Text>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 20 },
  backBtn: { padding: 10 },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  content: { padding: 25 },
  notifItem: { flexDirection: 'row', backgroundColor: '#111', padding: 20, borderRadius: 15, marginBottom: 15, gap: 15 },
  iconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  textBox: { flex: 1 },
  notifTitle: { color: '#FFF', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  notifBody: { color: THEME.dark.sub, fontSize: 14, lineHeight: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', marginBottom: 30, borderWidth: 2, borderColor: THEME.dark.border },
  emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', marginBottom: 15 },
  emptySub: { color: THEME.dark.sub, textAlign: 'center', fontSize: 18, lineHeight: 28 }
});