import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import api from '../../../services/api'; 

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', card: '#1C1C1E' },
  urgent: '#FF453A'
};

// Map labels to your backend enum values
const CATEGORY_MAP: Record<string, string> = {
  'Errands': 'errands',
  'Elderly Support': 'elderly_assistance',
  'Tech Help': 'tech_help',
  'Home Help': 'home_help',
  'Medical Help': 'emergency',
  'Groceries': 'errands',
};

export default function CreateTaskForm() {
  const router = useRouter();
  const [urgency, setUrgency] = useState('normal');
  const [category, setCategory] = useState('Errands');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

  const categories = ['Errands', 'Elderly Support', 'Tech Help', 'Groceries', 'Medical Help'];

  // FETCH LOCATION: Required for GeoJSON backend storage
  const handleGetLocation = () => {
    if (Platform.OS === 'web') {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          Alert.alert("Success", "Location pinned successfully.");
        },
        () => Alert.alert("Error", "Please enable location permissions in your browser."),
        { enableHighAccuracy: true }
      );
    } else {
      Alert.alert("Location", "Mobile tracking requires the expo-location module.");
    }
  };

  // SUBMIT HANDLER: Hits POST /api/tasks
  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert("Required", "Please provide a title and description.");
      return;
    }

    if (!coords) {
      Alert.alert("Location Required", "Please pin your location before submitting.");
      return;
    }

    setLoading(true);
    try {
      // payload must match what taskController.js expects
      const payload = {
        title,
        description,
        category: CATEGORY_MAP[category] || 'other',
        urgency: urgency.toLowerCase(),
        latitude: coords.lat, 
        longitude: coords.lng,
        address: "Current User Location", // Required by backend schema
        city: "Local",
      };

      // api.ts automatically attaches the JWT token now
      const response = await api.post('/tasks', payload);

      if (response.status === 201) {
        Alert.alert("Success", "Your request is now live.", [
          { text: "OK", onPress: () => router.replace('/(user)/(tabs)') }
        ]);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Submission failed. Your session may have expired.";
      Alert.alert("Error", errorMsg);
      if (error.response?.status === 401) {
        router.replace('/(auth)/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#FFFFFF" size={32} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NEW REQUEST</Text>
          <View style={{ width: 32 }} />
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.label}>URGENCY LEVEL</Text>
          <View style={styles.toggleContainer}>
            {['normal', 'urgent'].map(level => (
              <TouchableOpacity 
                key={level}
                style={[styles.toggleBtn, urgency === level && (level === 'normal' ? styles.activeNormal : styles.activeUrgent)]}
                onPress={() => setUrgency(level)}
              >
                <Text style={styles.toggleText}>{level.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>TASK TITLE</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Help carrying groceries" 
            placeholderTextColor="#636366"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>DESCRIPTION</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Provide more details for the volunteer..." 
            placeholderTextColor="#636366"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>CATEGORY</Text>
          <View style={styles.categoryGrid}>
            {categories.map((item) => (
              <TouchableOpacity 
                key={item}
                style={[styles.categoryCard, category === item && styles.selectedCategory]}
                onPress={() => setCategory(item)}
              >
                <Text style={[styles.categoryText, category === item && { color: '#000' }]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.locationBtn, coords && { borderColor: THEME.cyan }]} 
            onPress={handleGetLocation}
          >
            <MapPin color={coords ? THEME.cyan : "#FFF"} size={24} />
            <Text style={[styles.locationBtnText, coords && { color: THEME.cyan }]}>
              {coords ? "LOCATION PINNED" : "PIN CURRENT LOCATION"}
            </Text>
            {coords && <CheckCircle color={THEME.cyan} size={20} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit} 
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#FFF" /> : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>SUBMIT REQUEST</Text>
                <CheckCircle color="#FFF" size={24} />
              </View>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 15 },
  backButton: { padding: 5, marginLeft: -5 },
  headerTitle: { color: '#FFF', fontSize: 14, fontWeight: '900', letterSpacing: 2 },
  scrollContent: { padding: 25, paddingBottom: 50 },
  label: { color: THEME.dark.sub, fontSize: 12, fontWeight: '900', letterSpacing: 1.5, marginBottom: 12, marginTop: 25 },
  input: { backgroundColor: THEME.dark.card, borderRadius: 15, padding: 20, color: '#FFF', fontSize: 18, fontWeight: '500', borderWidth: 1, borderColor: '#2C2C2E' },
  textArea: { height: 120, textAlignVertical: 'top' },
  toggleContainer: { flexDirection: 'row', backgroundColor: THEME.dark.card, borderRadius: 15, padding: 6 },
  toggleBtn: { flex: 1, paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
  toggleText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  activeNormal: { backgroundColor: THEME.cyan },
  activeUrgent: { backgroundColor: THEME.urgent },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, borderWidth: 1.5, borderColor: '#2C2C2E' },
  selectedCategory: { backgroundColor: THEME.cyan, borderColor: THEME.cyan },
  categoryText: { color: '#FFF', fontWeight: '700' },
  locationBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 30, padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#2C2C2E', backgroundColor: '#111' },
  locationBtnText: { color: '#FFF', fontWeight: '900', fontSize: 14 },
  submitButton: { backgroundColor: THEME.cyan, marginTop: 20, padding: 25, borderRadius: 20 },
  buttonContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  buttonText: { color: '#FFF', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
});