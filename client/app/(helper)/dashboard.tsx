// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet,
//   Animated, StatusBar, KeyboardAvoidingView, Easing
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MapPin, Award, Wallet, User, Sun, Moon } from 'lucide-react-native';

// const THEME = {
//   cyan: '#00BAF2',
//   light: { bg: '#F2F2F2', text: '#171717', sub: '#8E8E93', border: '#D1D1D6' },
//   dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
// };

// export default function HelperDashboard() {
//   const router = useRouter();
//   const [isDark, setIsDark] = useState(true);
//   const [isActive, setIsActive] = useState(false);

//   // Animations
//   const themeValue = useRef(new Animated.Value(1)).current;
//   const glowAnim = useRef(new Animated.Value(0.4)).current;
//   const titleScale = useRef(new Animated.Value(0.95)).current;

//   useEffect(() => {
//     // Entrance Animation
//     Animated.timing(titleScale, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
//     // Glow Loop
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
//         Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
//       ])
//     ).start();
//   }, []);

//   const toggleTheme = () => {
//     const next = !isDark;
//     Animated.timing(themeValue, { toValue: next ? 1 : 0, duration: 400, useNativeDriver: false }).start();
//     setIsDark(next);
//   };

//   const bgColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.bg, THEME.dark.bg] });
//   const textColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.text, THEME.dark.text] });
//   const subColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.sub, THEME.dark.sub] });
//   const borderColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.border, THEME.dark.border] });

//   return (
//     <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
//       <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
//           {/* Brand Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
//               {isDark ? <Sun size={20} color="#FBBF24" /> : <Moon size={20} color="#171717" />}
//             </TouchableOpacity>
//             <Animated.View style={[styles.brandContainer, { transform: [{ scale: titleScale }] }]}>
//               <View style={styles.titleRow}>
//                 <Animated.Text style={[styles.hindiTitle, { color: textColor }]}>एका</Animated.Text>
//                 <Animated.Text style={[styles.latinTitle, { color: textColor }]}>yam</Animated.Text>
//               </View>
//               <View style={styles.taglineRow}>
//                 <Animated.View style={[styles.glowDot, { opacity: glowAnim }]} />
//                 <Animated.Text style={[styles.tagline, { color: subColor }]}>COMMUNITY CONNECT</Animated.Text>
//               </View>
//             </Animated.View>
//           </View>

//           {/* Status Toggle */}
//           <Animated.View style={[styles.statusLine, { borderBottomColor: borderColor }]}>
//             <View>
//               <Animated.Text style={[styles.statusTitle, { color: textColor }]}>
//                 {isActive ? "ONLINE" : "OFFLINE"}
//               </Animated.Text>
//               <Animated.Text style={[styles.statusSub, { color: subColor }]}>
//                 {isActive ? "Scanning for nearby requests" : "Go active to help others"}
//               </Animated.Text>
//             </View>
//             <Switch 
//               value={isActive} 
//               onValueChange={setIsActive} 
//               trackColor={{ false: '#2C2C2E', true: THEME.cyan }}
//               thumbColor="#FFF"
//             />
//           </Animated.View>

//           {/* Stats Section */}
//           <View style={styles.statsContainer}>
//             <View style={styles.statItem}>
//               <Wallet size={16} color={THEME.cyan} />
//               <Animated.Text style={[styles.statVal, { color: textColor }]}>120</Animated.Text>
//               <Animated.Text style={[styles.statLab, { color: subColor }]}>CREDITS</Animated.Text>
//             </View>
//             <View style={styles.statItem}>
//               <Award size={16} color={THEME.cyan} />
//               <Animated.Text style={[styles.statVal, { color: textColor }]}>4.9</Animated.Text>
//               <Animated.Text style={[styles.statLab, { color: subColor }]}>SCORE</Animated.Text>
//             </View>
//           </View>

//           {/* Requests List */}
//           <Animated.Text style={[styles.sectionLabel, { color: subColor }]}>NEARBY REQUESTS</Animated.Text>
//           {!isActive ? (
//             <View style={styles.emptyState}>
//               <Animated.Text style={[styles.emptyText, { color: subColor }]}>
//                 Switch to active to see people needing help within 2km.
//               </Animated.Text>
//             </View>
//           ) : (
//             <TouchableOpacity style={styles.taskCard} activeOpacity={0.7}>
//               <View style={styles.taskInfo}>
//                 <Animated.Text style={[styles.taskTitle, { color: textColor }]}>Groceries Delivery</Animated.Text>
//                 <View style={styles.locRow}>
//                   <MapPin size={12} color={THEME.cyan} />
//                   <Animated.Text style={[styles.locText, { color: subColor }]}>0.4 km away • High Street</Animated.Text>
//                 </View>
//               </View>
//               <Text style={styles.rewardText}>+10</Text>
//             </TouchableOpacity>
//           )}

//           {/* Footer Nav */}
//           <TouchableOpacity 
//             onPress={() => router.push('/(helper)/helper')}
//             style={styles.profileLink}
//           >
//             <User size={18} color={THEME.cyan} />
//             <Animated.Text style={[styles.profileText, { color: subColor }]}>VOLUNTEER PROFILE</Animated.Text>
//           </TouchableOpacity>

//         </ScrollView>
//       </SafeAreaView>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   content: { paddingHorizontal: 30, paddingBottom: 40 },
//   header: { marginTop: 20, marginBottom: 50 },
//   themeToggle: { alignSelf: 'flex-end', padding: 8, marginBottom: 10 },
//   brandContainer: { alignItems: 'flex-start' },
//   titleRow: { flexDirection: 'row', alignItems: 'baseline' },
//   hindiTitle: { fontSize: 42, fontWeight: '800', letterSpacing: -1.5 },
//   latinTitle: { fontSize: 42, fontWeight: '100', marginLeft: 2 },
//   taglineRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 3 },
//   glowDot: { width: 6, height: 6, backgroundColor: THEME.cyan, borderRadius: 3, marginRight: 8, shadowColor: THEME.cyan, shadowRadius: 4, shadowOpacity: 0.8 },
//   tagline: { fontSize: 8, letterSpacing: 4, fontWeight: '900' },

//   statusLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 25, borderBottomWidth: 1, marginBottom: 40 },
//   statusTitle: { fontSize: 18, fontWeight: '800', letterSpacing: 2 },
//   statusSub: { fontSize: 13, marginTop: 4 },

//   statsContainer: { flexDirection: 'row', gap: 20, marginBottom: 50 },
//   statItem: { flex: 1, gap: 4 },
//   statVal: { fontSize: 24, fontWeight: '200' },
//   statLab: { fontSize: 9, letterSpacing: 2, fontWeight: '800' },

//   sectionLabel: { fontSize: 10, letterSpacing: 2, fontWeight: '900', marginBottom: 20 },
//   emptyState: { paddingVertical: 40, alignItems: 'center' },
//   emptyText: { textAlign: 'center', fontSize: 14, fontWeight: '300', lineHeight: 20 },
  
//   taskCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 },
//   taskInfo: { gap: 6 },
//   taskTitle: { fontSize: 18, fontWeight: '400' },
//   locRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
//   locText: { fontSize: 12 },
//   rewardText: { fontSize: 18, fontWeight: '800', color: THEME.cyan },

//   profileLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 60 },
//   profileText: { fontSize: 11, fontWeight: '800', letterSpacing: 2 }
// });

import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet,
  Animated, StatusBar, Easing
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MapPin, Award, Wallet, User, Sun, Moon, 
  Briefcase, MessageSquare 
} from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  light: { bg: '#F2F2F2', text: '#171717', sub: '#8E8E93', border: '#D1D1D6' },
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#636366', border: '#2C2C2E' }
};

export default function HelperDashboard() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const themeValue = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const titleScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.timing(titleScale, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    Animated.timing(themeValue, { toValue: next ? 1 : 0, duration: 400, useNativeDriver: false }).start();
    setIsDark(next);
  };

  const bgColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.bg, THEME.dark.bg] });
  const textColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.text, THEME.dark.text] });
  const subColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.sub, THEME.dark.sub] });
  const borderColor = themeValue.interpolate({ inputRange: [0, 1], outputRange: [THEME.light.border, THEME.dark.border] });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              {isDark ? <Sun size={20} color="#FBBF24" /> : <Moon size={20} color="#171717" />}
            </TouchableOpacity>
            <Animated.View style={[styles.brandContainer, { transform: [{ scale: titleScale }] }]}>
              <View style={styles.titleRow}>
                <Animated.Text style={[styles.hindiTitle, { color: textColor }]}>एका</Animated.Text>
                <Animated.Text style={[styles.latinTitle, { color: textColor }]}>yam</Animated.Text>
              </View>
              <div style={styles.taglineRow}>
                <Animated.View style={[styles.glowDot, { opacity: glowAnim }]} />
                <Animated.Text style={[styles.tagline, { color: subColor }]}>COMMUNITY CONNECT</Animated.Text>
              </div>
            </Animated.View>
          </View>

          <Animated.View style={[styles.statusLine, { borderBottomColor: borderColor }]}>
            <View>
              <Animated.Text style={[styles.statusTitle, { color: textColor }]}>
                {isActive ? "ONLINE" : "OFFLINE"}
              </Animated.Text>
              <Animated.Text style={[styles.statusSub, { color: subColor }]}>
                {isActive ? "Scanning for nearby requests" : "Go active to help others"}
              </Animated.Text>
            </View>
            <Switch 
              value={isActive} 
              onValueChange={setIsActive} 
              trackColor={{ false: '#2C2C2E', true: THEME.cyan }}
              thumbColor="#FFF"
            />
          </Animated.View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Wallet size={16} color={THEME.cyan} />
              <Animated.Text style={[styles.statVal, { color: textColor }]}>120</Animated.Text>
              <Animated.Text style={[styles.statLab, { color: subColor }]}>CREDITS</Animated.Text>
            </View>
            <View style={styles.statItem}>
              <Award size={16} color={THEME.cyan} />
              <Animated.Text style={[styles.statVal, { color: textColor }]}>4.9</Animated.Text>
              <Animated.Text style={[styles.statLab, { color: subColor }]}>SCORE</Animated.Text>
            </View>
          </View>

          <Animated.Text style={[styles.sectionLabel, { color: subColor }]}>NEARBY REQUESTS</Animated.Text>
          {!isActive ? (
            <View style={styles.emptyState}>
              <Animated.Text style={[styles.emptyText, { color: subColor }]}>
                Switch to active to see people needing help within 2km.
              </Animated.Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.taskCard} activeOpacity={0.7}>
              <View style={styles.taskInfo}>
                <Animated.Text style={[styles.taskTitle, { color: textColor }]}>Groceries Delivery</Animated.Text>
                <View style={styles.locRow}>
                  <MapPin size={12} color={THEME.cyan} />
                  <Animated.Text style={[styles.locText, { color: subColor }]}>0.4 km away • High Street</Animated.Text>
                </View>
              </View>
              <Text style={styles.rewardText}>+10</Text>
            </TouchableOpacity>
          )}

          {/* NEW FOOTER NAVIGATION */}
          <View style={styles.footerNav}>
            <TouchableOpacity onPress={() => router.push('/(helper)/tasks')} style={styles.navItem}>
              <Briefcase size={18} color={THEME.cyan} />
              <Animated.Text style={[styles.navText, { color: subColor }]}>TASKS</Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(helper)/helper')} style={styles.navItem}>
              <User size={18} color={THEME.cyan} />
              <Animated.Text style={[styles.navText, { color: subColor }]}>PROFILE</Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(helper)/chat')} style={styles.navItem}>
              <MessageSquare size={18} color={THEME.cyan} />
              <Animated.Text style={[styles.navText, { color: subColor }]}>CHAT</Animated.Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 30, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 50 },
  themeToggle: { alignSelf: 'flex-end', padding: 8, marginBottom: 10 },
  brandContainer: { alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'baseline' },
  hindiTitle: { fontSize: 42, fontWeight: '800', letterSpacing: -1.5 },
  latinTitle: { fontSize: 42, fontWeight: '100', marginLeft: 2 },
  taglineRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 3 },
  glowDot: { width: 6, height: 6, backgroundColor: THEME.cyan, borderRadius: 3, marginRight: 8 },
  tagline: { fontSize: 8, letterSpacing: 4, fontWeight: '900' },
  statusLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 25, borderBottomWidth: 1, marginBottom: 40 },
  statusTitle: { fontSize: 18, fontWeight: '800', letterSpacing: 2 },
  statusSub: { fontSize: 13, marginTop: 4 },
  statsContainer: { flexDirection: 'row', gap: 20, marginBottom: 50 },
  statItem: { flex: 1, gap: 4 },
  statVal: { fontSize: 24, fontWeight: '200' },
  statLab: { fontSize: 9, letterSpacing: 2, fontWeight: '800' },
  sectionLabel: { fontSize: 10, letterSpacing: 2, fontWeight: '900', marginBottom: 20 },
  emptyState: { paddingVertical: 40, alignItems: 'center' },
  emptyText: { textAlign: 'center', fontSize: 14, fontWeight: '300', lineHeight: 20 },
  taskCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 },
  taskInfo: { gap: 6 },
  taskTitle: { fontSize: 18, fontWeight: '400' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locText: { fontSize: 12 },
  rewardText: { fontSize: 18, fontWeight: '800', color: THEME.cyan },
  
  // Footer Styles
  footerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, paddingHorizontal: 5 },
  navItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navText: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5 }
});