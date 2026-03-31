// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LogOut, Heart, Settings, Shield, ChevronRight } from 'lucide-react-native';

// const THEME = {
//   cyan: '#00BAF2',
//   dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#3A3A3C' }
// };

// export default function ProfileScreen() {
//   const router = useRouter();
//   const handleLogout = () => router.replace('/(auth)/login');

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.content}>
//           <View style={styles.profileHeader}>
//             <View style={styles.avatarCircle}>
//               <Text style={styles.avatarInitial}>P</Text>
//             </View>
//             <Text style={styles.userName}>PUSPAL GHOSAL</Text>
//             <Text style={styles.userRole}>MEMBER SINCE 2025</Text>
//           </View>

//           <View style={styles.menuGroup}>
//             <ProfileOption icon={<Heart size={24} color="#FFF" />} title="PREFERRED HELPERS" />
//             <ProfileOption icon={<Shield size={24} color="#FFF" />} title="TRUST & SAFETY" />
//             <ProfileOption icon={<Settings size={24} color="#FFF" />} title="SETTINGS" />
//           </View>

//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//             <Text style={styles.logoutText}>LOG OUT</Text>
//             <LogOut size={24} color="#FF453A" />
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// }

// function ProfileOption({ icon, title }: { icon: React.ReactNode; title: string }) {
//   return (
//     <TouchableOpacity style={styles.optionItem} activeOpacity={0.7}>
//       <View style={styles.optionLeft}>
//         {icon}
//         <Text style={styles.optionTitle}>{title}</Text>
//       </View>
//       <ChevronRight size={22} color={THEME.dark.sub} />
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   content: { paddingHorizontal: 25, paddingBottom: 40 },
//   profileHeader: { alignItems: 'center', marginTop: 30, marginBottom: 50 },
//   avatarCircle: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: THEME.dark.border, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
//   avatarInitial: { color: '#FFF', fontSize: 48, fontWeight: '600' },
//   userName: { color: '#FFF', fontSize: 30, fontWeight: '800' },
//   userRole: { color: THEME.dark.sub, fontSize: 14, fontWeight: '700', marginTop: 8 },
//   menuGroup: { marginBottom: 20 },
//   optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 28, borderBottomWidth: 1.5, borderBottomColor: THEME.dark.border },
//   optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 20 },
//   optionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
//   logoutBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30, marginTop: 10 },
//   logoutText: { color: '#FF453A', fontSize: 18, fontWeight: '900' },
// });

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Share, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Heart, Settings, Shield, ChevronRight, Gift, Copy, AlertTriangle } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import api from '../../../services/api';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', border: '#3A3A3C' },
  urgent: '#FF453A'
};

export default function ProfileScreen() {
  const router = useRouter();
  const referralCode = "EPICS-72X";

  const handleLogout = () => router.replace('/(auth)/login');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert("Copied", "Referral code copied to clipboard!");
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Join me on ekayam! Use my referral code: ${referralCode}`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handlePanic = async () => {
    try {
      await api.post('/alerts/panic', {
        latitude: 12.9716, // mock location
        longitude: 77.5946
      });
      Alert.prompt(
        "Panic Triggered!", 
        "Loud alarm and trusted contacts notified. Enter your PIN to disable.",
        [
          { text: "Dismiss", style: "cancel" },
          { text: "Disable", onPress: () => Alert.alert("Panic Disabled") }
        ],
        "secure-text"
      );
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Could not trigger Panic Mode");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>P</Text>
            </View>
            <Text style={styles.userName}>PUSPAL GHOSAL</Text>
            <Text style={styles.userRole}>MEMBER SINCE 2025</Text>
          </View>

          <View style={styles.menuGroup}>
            <ProfileOption icon={<Heart size={24} color="#FFF" />} title="PREFERRED HELPERS" />
            <ProfileOption icon={<Settings size={24} color="#FFF" />} title="SETTINGS" />
            <ProfileOption 
              icon={<Gift size={24} color={THEME.cyan} />} 
              title="REFER & EARN" 
              onPress={onShare}
            />
            <ProfileOption 
              icon={<AlertTriangle size={24} color={THEME.urgent} />} 
              title="TRIGGER PANIC MODE" 
              onPress={handlePanic}
            />
          </View>

          <View style={styles.referralContainer}>
            <Text style={styles.referralLabel}>YOUR UNIQUE CODE</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{referralCode}</Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
                <Copy size={20} color={THEME.cyan} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>LOG OUT</Text>
            <LogOut size={24} color={THEME.urgent} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ProfileOption({ icon, title, onPress }: { icon: React.ReactNode; title: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.optionItem} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.optionLeft}>
        {icon}
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
      <ChevronRight size={22} color={THEME.dark.sub} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 25, paddingBottom: 40 },
  profileHeader: { alignItems: 'center', marginTop: 30, marginBottom: 50 },
  avatarCircle: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: THEME.dark.border, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  avatarInitial: { color: '#FFF', fontSize: 48, fontWeight: '600' },
  userName: { color: '#FFF', fontSize: 30, fontWeight: '800' },
  userRole: { color: THEME.dark.sub, fontSize: 14, fontWeight: '700', marginTop: 8 },
  menuGroup: { marginBottom: 20 },
  optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 28, borderBottomWidth: 1.5, borderBottomColor: THEME.dark.border },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  optionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  
  // Refer & Earn Styling
  referralContainer: { marginTop: 10, padding: 20, backgroundColor: '#0A0A0A', borderRadius: 12, borderWidth: 1, borderColor: THEME.dark.border },
  referralLabel: { color: THEME.dark.sub, fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginBottom: 12 },
  codeBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  codeText: { color: THEME.cyan, fontSize: 24, fontWeight: '200', letterSpacing: 4 },
  copyBtn: { padding: 10 },

  logoutBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30, marginTop: 10 },
  logoutText: { color: '#FF453A', fontSize: 18, fontWeight: '900' },
});