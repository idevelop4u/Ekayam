// import React, { useState } from 'react';
// import { 
//   View, Text, StyleSheet, TextInput, TouchableOpacity, 
//   ScrollView, KeyboardAvoidingView, Platform 
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { AlertCircle, MapPin } from 'lucide-react-native';

// const THEME = {
//   cyan: '#00BAF2',
//   dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', card: '#1C1C1E' },
//   urgent: '#FF453A'
// };

// export default function CreateTaskForm() {
//   const [urgency, setUrgency] = useState('Normal');
//   const [category, setCategory] = useState('Errands');

//   const categories = ['Errands', 'Elderly Support', 'Tech Help', 'Groceries'];

//   return (
//     <View style={styles.container}>
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
//         style={{ flex: 1 }}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
          
//           {/* Urgency Toggle */}
//           <Text style={styles.label}>URGENCY LEVEL</Text>
//           <View style={styles.toggleContainer}>
//             <TouchableOpacity 
//               style={[styles.toggleBtn, urgency === 'Normal' && styles.activeNormal]}
//               onPress={() => setUrgency('Normal')}
//             >
//               <Text style={styles.toggleText}>Normal</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={[styles.toggleBtn, urgency === 'Urgent' && styles.activeUrgent]}
//               onPress={() => setUrgency('Urgent')}
//             >
//               <Text style={styles.toggleText}>Urgent</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Task Inputs */}
//           <Text style={styles.label}>TASK TITLE</Text>
//           <TextInput 
//             style={styles.input} 
//             placeholder="What do you need help with?" 
//             placeholderTextColor="#636366"
//           />

//           <Text style={styles.label}>DESCRIPTION</Text>
//           <TextInput 
//             style={[styles.input, styles.textArea]} 
//             placeholder="Provide more details for the volunteer..." 
//             placeholderTextColor="#636366"
//             multiline
//             numberOfLines={4}
//           />

//           {/* Category Selection */}
//           <Text style={styles.label}>CATEGORY</Text>
//           <View style={styles.categoryGrid}>
//             {categories.map((item) => (
//               <TouchableOpacity 
//                 key={item}
//                 style={[styles.categoryCard, category === item && styles.selectedCategory]}
//                 onPress={() => setCategory(item)}
//               >
//                 <Text style={[styles.categoryText, category === item && { color: '#000' }]}>
//                   {item}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.nextButton} activeOpacity={0.9}>
//             <View style={styles.buttonContent}>
//               <Text style={styles.buttonText}>NEXT: SET LOCATION</Text>
//               <MapPin color="#FFF" size={24} />
//             </View>
//           </TouchableOpacity>

//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: THEME.dark.bg },
//   scrollContent: { padding: 25, paddingBottom: 50 },
//   label: { 
//     color: THEME.dark.sub, 
//     fontSize: 14, 
//     fontWeight: '900', 
//     letterSpacing: 1.5, 
//     marginBottom: 12, 
//     marginTop: 25 
//   },
//   input: {
//     backgroundColor: THEME.dark.card,
//     borderRadius: 15,
//     padding: 20,
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: '500',
//     borderWidth: 1,
//     borderColor: '#2C2C2E'
//   },
//   textArea: { height: 120, textAlignVertical: 'top' },
//   toggleContainer: { 
//     flexDirection: 'row', 
//     backgroundColor: THEME.dark.card, 
//     borderRadius: 15, 
//     padding: 6 
//   },
//   toggleBtn: { flex: 1, paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
//   toggleText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
//   activeNormal: { backgroundColor: THEME.cyan },
//   activeUrgent: { backgroundColor: THEME.urgent },
//   categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
//   categoryCard: { 
//     paddingHorizontal: 20, 
//     paddingVertical: 12, 
//     borderRadius: 30, 
//     borderWidth: 1.5, 
//     borderColor: THEME.dark.sub 
//   },
//   selectedCategory: { backgroundColor: THEME.cyan, borderColor: THEME.cyan },
//   categoryText: { color: '#FFF', fontWeight: '700' },
//   nextButton: { 
//     backgroundColor: THEME.cyan, 
//     marginTop: 40, 
//     padding: 25, 
//     borderRadius: 20,
//     elevation: 5,
//     shadowColor: THEME.cyan,
//     shadowOpacity: 0.3,
//     shadowRadius: 10
//   },
//   buttonContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
//   buttonText: { color: '#FFF', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
// });

import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin } from 'lucide-react-native'; //
import { useRouter } from 'expo-router'; //

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', card: '#1C1C1E' },
  urgent: '#FF453A'
};

export default function CreateTaskForm() {
  const router = useRouter(); //
  const [urgency, setUrgency] = useState('Normal');
  const [category, setCategory] = useState('Errands');

  const categories = ['Errands', 'Elderly Support', 'Tech Help', 'Groceries', 'Medical Help', 'Shopping'];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#FFFFFF" size={32} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NEW REQUEST</Text>
          <View style={{ width: 32 }} /> {/* Placeholder to balance title centering */}
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.label}>URGENCY LEVEL</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleBtn, urgency === 'Normal' && styles.activeNormal]}
              onPress={() => setUrgency('Normal')}
            >
              <Text style={styles.toggleText}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtn, urgency === 'Urgent' && styles.activeUrgent]}
              onPress={() => setUrgency('Urgent')}
            >
              <Text style={styles.toggleText}>Urgent</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>TASK TITLE</Text>
          <TextInput 
            style={styles.input} 
            placeholder="What do you need help with?" 
            placeholderTextColor="#636366"
          />

          <Text style={styles.label}>DESCRIPTION</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Provide more details for the volunteer..." 
            placeholderTextColor="#636366"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>CATEGORY</Text>
          <View style={styles.categoryGrid}>
            {categories.map((item) => (
              <TouchableOpacity 
                key={item}
                style={[styles.categoryCard, category === item && styles.selectedCategory]}
                onPress={() => setCategory(item)}
              >
                <Text style={[styles.categoryText, category === item && { color: '#000' }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} activeOpacity={0.9}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>NEXT: SET LOCATION</Text>
              <MapPin color="#FFF" size={24} />
            </View>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.dark.bg },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
    marginLeft: -5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  scrollContent: { padding: 25, paddingBottom: 50 },
  label: { 
    color: THEME.dark.sub, 
    fontSize: 14, 
    fontWeight: '900', 
    letterSpacing: 1.5, 
    marginBottom: 12, 
    marginTop: 25 
  },
  input: {
    backgroundColor: THEME.dark.card,
    borderRadius: 15,
    padding: 20,
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#2C2C2E'
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  toggleContainer: { 
    flexDirection: 'row', 
    backgroundColor: THEME.dark.card, 
    borderRadius: 15, 
    padding: 6 
  },
  toggleBtn: { flex: 1, paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
  toggleText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  activeNormal: { backgroundColor: THEME.cyan },
  activeUrgent: { backgroundColor: THEME.urgent },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: { 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 30, 
    borderWidth: 1.5, 
    borderColor: THEME.dark.sub 
  },
  selectedCategory: { backgroundColor: THEME.cyan, borderColor: THEME.cyan },
  categoryText: { color: '#FFF', fontWeight: '700' },
  nextButton: { 
    backgroundColor: THEME.cyan, 
    marginTop: 40, 
    padding: 25, 
    borderRadius: 20,
    elevation: 5,
    shadowColor: THEME.cyan,
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  buttonContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  buttonText: { color: '#FFF', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
});