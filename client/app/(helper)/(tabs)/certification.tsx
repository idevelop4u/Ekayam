import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Award, Heart, PlusSquare, Hammer, MessageCircle, ChevronRight, ShieldCheck, UploadCloud, FileText, X } from 'lucide-react-native';

const THEME = {
  cyan: '#00BAF2',
  dark: { bg: '#000000', text: '#FFFFFF', sub: '#AEAEB2', card: '#1C1C1E', border: '#2C2C2E' },
  gold: '#FBBF24',
  red: '#FF453A',
  error: '#FF453A'
};

const MODULES = [
  { id: '1', title: 'Elderly Assistance Etiquette', desc: 'Core communication and respect protocols for senior care.', icon: <Heart color={THEME.cyan} size={28} />, points: '+15 Trust' },
  { id: '2', title: 'First Aid Awareness', desc: 'Basic emergency response and medical safety training.', icon: <PlusSquare color={THEME.red} size={28} />, points: '+25 Trust' },
  { id: '3', title: 'Safe Home Task Handling', desc: 'Fall-risk awareness and minor home repair safety.', icon: <Hammer color={THEME.cyan} size={28} />, points: '+20 Trust' },
  { id: '4', title: 'Active Listening', desc: 'Techniques for meaningful companionship and connection.', icon: <MessageCircle color={THEME.cyan} size={28} />, points: '+10 Trust' }
];

export default function CertificationProgram() {
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string}[]>([]);

  const handleFileUpload = () => {
    const mockFile = { name: `Cert_${Math.floor(Math.random() * 1000)}.pdf`, size: '1.2 MB' };
    setUploadedFiles([...uploadedFiles, mockFile]);
    Alert.alert("Success", "Certificate uploaded for verification.");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <ShieldCheck color={THEME.gold} size={40} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>HELPER TRUST METER</Text>
            <Text style={styles.headerSub}>Complete modules or upload external docs</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>AVAILABLE CERTIFICATIONS</Text>
        {MODULES.map((module) => (
          <TouchableOpacity key={module.id} style={styles.moduleCard} activeOpacity={0.8}>
            <View style={styles.iconCircle}>{module.icon}</View>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDesc}>{module.desc}</Text>
              <View style={styles.badgeRow}>
                <Award size={14} color={THEME.gold} />
                <Text style={styles.pointsText}>{module.points}</Text>
              </View>
            </View>
            <ChevronRight color={THEME.dark.sub} size={24} />
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionLabel, { marginTop: 30 }]}>EXTERNAL VERIFICATION</Text>
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.dropZone} onPress={handleFileUpload} activeOpacity={0.7}>
            <UploadCloud color={THEME.cyan} size={48} />
            <Text style={styles.uploadTitle}>Upload Certificate</Text>
            <Text style={styles.uploadSub}>Tap to select or drag PDF/JPG files</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.dark.bg },
  content: { padding: 25, paddingBottom: 60 },
  headerCard: { backgroundColor: 'rgba(251, 191, 36, 0.1)', borderRadius: 20, padding: 25, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(251, 191, 36, 0.3)', marginBottom: 35 },
  headerTextContainer: { marginLeft: 15, flex: 1 },
  headerTitle: { color: THEME.gold, fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  headerSub: { color: THEME.dark.sub, fontSize: 12, marginTop: 4, fontWeight: '600' },
  sectionLabel: { color: THEME.dark.sub, fontSize: 12, fontWeight: '900', letterSpacing: 2, marginBottom: 20 },
  moduleCard: { backgroundColor: THEME.dark.card, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: THEME.dark.border },
  iconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  moduleInfo: { flex: 1, marginLeft: 15, marginRight: 10 },
  moduleTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  moduleDesc: { color: THEME.dark.sub, fontSize: 14, marginTop: 4, lineHeight: 20 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 5 },
  pointsText: { color: THEME.gold, fontSize: 12, fontWeight: '900' },
  uploadContainer: { backgroundColor: THEME.dark.card, borderRadius: 25, padding: 20, borderWidth: 1, borderColor: THEME.dark.border },
  dropZone: { borderWidth: 2, borderColor: THEME.cyan, borderStyle: 'dashed', borderRadius: 20, padding: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 186, 242, 0.03)' },
  uploadTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 15 },
  uploadSub: { color: THEME.dark.sub, fontSize: 14, marginTop: 5, textAlign: 'center' },
});