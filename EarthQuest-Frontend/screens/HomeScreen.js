import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

// Firebase SDK imports (assuming firebase is set up properly)
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebaseConfig"; // Adjust according to your Firebase setup

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Animations for header, feature items, and buttons
  const [headerOpacity] = useState(new Animated.Value(0));
  const [featureItemsOpacity] = useState(new Animated.Value(0));
  const [buttonScale] = useState(new Animated.Value(1));

  useEffect(() => {
    // Fade-in effect for header
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Fade-in effect for feature items
    Animated.timing(featureItemsOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Navigate to different sections of the app
  const navigateToSection = (section) => {
    navigation.navigate(section);
  };

  // Open a PDF from Firebase Storage in the web browser
  const openPDF = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  // Fetch PDF URL from Firebase Storage
  const fetchPDFUrl = async (filePath) => {
    const pdfRef = ref(storage, filePath);
    try {
      const url = await getDownloadURL(pdfRef);
      openPDF(url);
    } catch (error) {
      console.error("Error fetching PDF URL:", error);
    }
  };

  // Button press animation
  const handleButtonPress = () => {
    Animated.sequence([ 
      Animated.timing(buttonScale, { 
        toValue: 0.95, 
        duration: 100, 
        useNativeDriver: true, 
      }),
      Animated.timing(buttonScale, { 
        toValue: 1, 
        duration: 100, 
        useNativeDriver: true, 
      })
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
        <Text style={styles.headerText}>Welcome to EarthQuest!</Text>
        <Text style={styles.subHeaderText}>Your adventure begins here</Text>
      </Animated.View>

      {/* Feature Sections */}
      <View style={styles.featureSection}>
        <Text style={styles.featureTitle}>Explore the Game Features</Text>

        <Animated.View style={[styles.featuresList, { opacity: featureItemsOpacity }]}>
          {/* Player's Handbook */}
          <FeatureItem
            icon="book"
            title="Player's Handbook"
            description="Comprehensive guide to the world of EarthQuest."
            onPress={() => fetchPDFUrl("playersHandbook.pdf")}
          />

          {/* GM Rulebook */}
          <FeatureItem
            icon="menu-book"
            title="EQ GM Rulebook"
            description="Guidelines and rules for Game Masters."
            onPress={() => fetchPDFUrl("eqGMRulebook.pdf")}
          />

          {/* EQ1 Adventure */}
          <FeatureItem
            icon="explore"
            title="EQ1 Adventure"
            description="Embark on an exciting journey through EarthQuest."
            onPress={() => navigateToSection("EQ1Adventure")}
          />

          {/* Gamesheets */}
          <FeatureItem
            icon="assignment"
            title="EQ Gamesheets"
            description="Download and manage game-related sheets."
            onPress={() => navigateToSection("Gamesheets")}
          />

          {/* Membership */}
          <FeatureItem
            icon="stars"
            title="Green Membership"
            description="Access exclusive EarthQuest content and benefits."
            onPress={() => navigation.navigate("Membership")}
          />

          {/* About EarthQuest */}
          <FeatureItem
            icon="info"
            title="About EarthQuest"
            description="Learn more about the game and its mission."
            onPress={() => navigateToSection("AboutEQ")}
          />
        </Animated.View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.otherFeaturesButton}
              onPress={() => navigation.navigate("OtherFeatures")}
              onPressIn={handleButtonPress}
            >
              <Text style={styles.otherFeaturesButtonText}>Explore Other Features</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Version 1.0 | EarthQuest Game</Text>
        <TouchableOpacity
          style={styles.footerLink}
          onPress={() => navigateToSection("Contact")}
        >
          <Text style={styles.footerLinkText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// FeatureItem Component
const FeatureItem = ({ icon, title, description, onPress }) => (
  <Animated.View style={styles.featureItem}>
    <Icon name={icon} size={40} color="#006400" />
    <Text style={styles.featureText}>{title}</Text>
    {description && (
      <Text style={styles.featureDescription}>{description}</Text>
    )}
    <TouchableOpacity style={styles.featureButton} onPress={onPress}>
      <Text style={styles.featureButtonText}>Explore</Text>
    </TouchableOpacity>
  </Animated.View>
);

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#b0e0e6", padding: 20 },
  headerContainer: { alignItems: "center", marginBottom: 30 },
  headerText: { fontSize: 32, fontWeight: "bold", color: "#006400" },
  subHeaderText: { fontSize: 16, color: "#2f4f4f" },
  featureSection: { marginBottom: 30 },
  featureTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 10,
    textAlign: "center",
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
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
  featureText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006400",
    marginTop: 10,
  },
  featureDescription: {
    color: "#333",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 5,
  },
  featureButton: {
    backgroundColor: "#006400",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  featureButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  footerContainer: {
    alignItems: "center",
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  footerText: { fontSize: 14, color: "#666" },
  footerLink: { marginTop: 10 },
  footerLinkText: { color: "#006400", fontSize: 16, fontWeight: "bold" },

  otherFeaturesButton: {
    backgroundColor: "#006400",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  otherFeaturesButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
