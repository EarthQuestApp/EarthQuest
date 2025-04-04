import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { storage, ref, getDownloadURL } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gamesheets = () => {
  const [pdfUrls, setPdfUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPdfUrls = async () => {
      const sheetNames = [
        'VanguardianFolder',
        'PortfolioGamesheet',
        'HerbalsGamesheet',
        'WisdomPathGamesheet',
        'PlayerTipsGamesheet',
        'StoryOfPlaceGamesheet',
        'EnvironmentalMysteryGamesheet',
        'EcologicalRestorationPlanGamesheet',
        'CARATSPlanGamesheet',
        'InnovationGamesheet',
        'PressReleaseGamesheet',
        'VanguardianTeamFinalMissionReportGamesheet',
        'GMTalleyGamesheet',
        'GMVanguardianRequestsGamesheet',
      ];
      
      const urls = {};
      try {
        for (const sheet of sheetNames) {
          const fileRef = ref(storage, `${sheet}.pdf`);
          const url = await getDownloadURL(fileRef);
          urls[sheet] = url;
        }
        setPdfUrls(urls);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
      setLoading(false);
    };
    fetchPdfUrls();
    loadFavorites();
    loadCompleted();
  }, []);

  const toggleFavorite = async (sheet) => {
    const updatedFavorites = favorites.includes(sheet)
      ? favorites.filter(item => item !== sheet)
      : [...favorites, sheet];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const loadFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    if (favs) setFavorites(JSON.parse(favs));
  };

  const markCompleted = async (sheet) => {
    const updatedCompleted = completed.includes(sheet)
      ? completed.filter(item => item !== sheet)
      : [...completed, sheet];
    setCompleted(updatedCompleted);
    await AsyncStorage.setItem('completed', JSON.stringify(updatedCompleted));
  };

  const loadCompleted = async () => {
    const completedSheets = await AsyncStorage.getItem('completed');
    if (completedSheets) setCompleted(JSON.parse(completedSheets));
  };

  const downloadFile = async (url, filename) => {
    const fileUri = FileSystem.documentDirectory + filename;
    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    await Sharing.shareAsync(uri);
  };

  const filteredSheets = Object.keys(pdfUrls).filter(sheet =>
    sheet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, darkMode && styles.darkText]}>EQ Gamesheets</Text>
        <Text style={[styles.subHeaderText, darkMode && styles.darkText]}>Manage your game sheets effortlessly</Text>
        <TextInput
          style={[styles.searchBar, darkMode && styles.darkInput]}
          placeholder="Search Gamesheets..."
          placeholderTextColor={darkMode ? '#bbb' : '#333'}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <TouchableOpacity onPress={() => setDarkMode(!darkMode)} style={styles.toggleButton}>
          <Text style={styles.featureButtonText}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00c853" />
      ) : (
        <View style={styles.featureSection}>
          <Text style={[styles.featureTitle, darkMode && styles.darkText]}>Gamesheets List</Text>
          <View style={styles.featuresList}>
            {filteredSheets.length > 0 ? (
              filteredSheets.map((sheet) => (
                <FeatureItem
                  key={sheet}
                  icon="assignment"
                  title={sheet.replace(/([A-Z])/g, ' $1').trim()}
                  onPress={() => navigation.navigate('PDFViewer', { url: pdfUrls[sheet] })}
                  download={() => downloadFile(pdfUrls[sheet], `${sheet}.pdf`)}
                  toggleFavorite={() => toggleFavorite(sheet)}
                  isFavorite={favorites.includes(sheet)}
                  markCompleted={() => markCompleted(sheet)}
                  isCompleted={completed.includes(sheet)}
                />
              ))
            ) : (
              <Text style={[styles.noFilesText, darkMode && styles.darkText]}>No available gamesheets</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const FeatureItem = ({ icon, title, onPress, download, toggleFavorite, isFavorite, markCompleted, isCompleted }) => (
  <View style={styles.featureItem}>
    <Icon name={icon} size={40} color="#2e7d32" />
    <Text style={styles.featureText}>{title}</Text>
    <TouchableOpacity style={styles.featureButton} onPress={onPress}>
      <Text style={styles.featureButtonText}>View PDF</Text>
    </TouchableOpacity>
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={download}>
        <Icon name="file-download" size={30} color="#2979ff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleFavorite}>
        <Icon name={isFavorite ? "favorite" : "favorite-border"} size={30} color="#ffab00" />
      </TouchableOpacity>
      <TouchableOpacity onPress={markCompleted}>
        <Icon name={isCompleted ? "check-circle" : "radio-button-unchecked"} size={30} color="#00c853" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  darkContainer: { backgroundColor: '#121212' },
  headerContainer: { alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 28, fontWeight: 'bold', color: '#00c853' },
  subHeaderText: { fontSize: 16, color: '#666' },
  darkText: { color: '#fff' },
  searchBar: { padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 8, width: '100%', backgroundColor: '#fff' },
  darkInput: { backgroundColor: '#333' },
  toggleButton: { marginTop: 10, padding: 10, backgroundColor: '#00c853', borderRadius: 8 },
  featureSection: { marginBottom: 30 },
  featureTitle: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32', marginBottom: 10, textAlign: 'center' },
  featuresList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginBottom: 20 },
  featureItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  featureText: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginTop: 10, textAlign: 'center' },
  featureButton: { backgroundColor: '#2e7d32', paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, borderRadius: 5 },
  featureButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  iconContainer: { flexDirection: 'row', gap: 10, marginTop: 10 },
  noFilesText: { textAlign: 'center', fontSize: 16, color: '#888', marginTop: 20 },
});

export default Gamesheets;
