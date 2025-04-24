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

// ...imports remain unchanged
const Gamesheets = () => {
  const [pdfUrls, setPdfUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);
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
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>EQ Gamesheets</Text>
        <Text style={styles.subHeaderText}>Manage your game sheets effortlessly</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Gamesheets..."
          placeholderTextColor="#333"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00c853" />
      ) : (
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>Gamesheets List</Text>
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
              <Text style={styles.noFilesText}>No available gamesheets</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#f2f7ff', // Soft background with a bluish tint
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#0d1117',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#4c9aff', // Vivid blue
    textShadowColor: '#00000050',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  darkText: {
    color: '#e1e8f0',
  },
  searchBar: {
    padding: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#1c1f26',
    color: '#fff',
    borderColor: '#333',
  },
  toggleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff6f61',
    borderRadius: 8,
  },
  featureSection: {
    marginBottom: 30,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3a86ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  featureItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 10,
    textAlign: 'center',
  },
  featureButton: {
    backgroundColor: '#3a86ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 10,
    borderRadius: 6,
  },
  featureButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%',
  },
  noFilesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});


export default Gamesheets;
