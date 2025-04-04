import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebaseConfig"; 

const OtherFeaturesScreen = () => {
  const navigation = useNavigation();

  const fetchPDFUrl = async (filePath) => {
    const pdfRef = ref(storage, filePath);
    try {
      const url = await getDownloadURL(pdfRef);
      WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error("Error fetching PDF URL:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Other Features</Text>
      </View>

      <View style={styles.featuresList}>
        <FeatureItem
          icon="person"
          title="Player Profile"
          description="Manage your profile, track progress, and earn badges."
          onPress={() => navigation.navigate("PlayerProfile")}
        />

        <FeatureItem
          icon="folder"
          title="Vanguardian Folder"
          description="Track completed forms, points, and notes for multiple Vanguardians."
          onPress={() => fetchPDFUrl("VanguardianFolder.pdf")}
        />

        <FeatureItem
          icon="chat"
          title="EQ Player Forum/Chat"
          description="Connect with other players and discuss strategies."
          onPress={() => navigation.navigate("EQForumChat")}
        />

        <FeatureItem
          icon="casino"
          title="Randomizer (1d12)"
          description="Roll a 12-sided die for random game elements."
          onPress={() => navigation.navigate("DiceRoll")}
        />

        <FeatureItem
          icon="qr-code-scanner"
          title="QR Code Scanner"
          description="Scan EarthQuest QR codes for bonuses and rewards."
          onPress={() => navigation.navigate("QRScanner")}
        />

        <FeatureItem
          icon="shopping-cart"
          title="EQ Storefront"
          description="Buy the EarthQuest game and accessories."
          onPress={() => navigation.navigate("EQStorefront")}
        />
      </View>
    </ScrollView>
  );
};

const FeatureItem = ({ icon, title, description, onPress }) => (
  <View style={styles.featureItem}>
    <Icon name={icon} size={40} color="#1565C0" />
    <Text style={styles.featureText}>{title}</Text>
    {description && <Text style={styles.featureDescription}>{description}</Text>}
    <TouchableOpacity style={styles.featureButton} onPress={onPress}>
      <Text style={styles.featureButtonText}>Explore</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E3F2FD", padding: 20 },
  headerContainer: { alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 28, fontWeight: "bold", color: "#1565C0" },
  featuresList: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" },
  featureItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  featureText: { fontSize: 18, fontWeight: "bold", color: "#1565C0", marginTop: 10 },
  featureDescription: { color: "#333", fontSize: 14, textAlign: "center", marginVertical: 5 },
  featureButton: { backgroundColor: "#1565C0", paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, borderRadius: 5 },
  featureButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});

export default OtherFeaturesScreen;