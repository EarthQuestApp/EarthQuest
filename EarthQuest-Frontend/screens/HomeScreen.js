import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as WebBrowser from "expo-web-browser";

const HomeScreen = ({ navigation }) => {
  const navigateToSection = (section) => {
    navigation.navigate(section);
  };

  const openPDF = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to EarthQuest!</Text>
        <Text style={styles.subHeaderText}>Your adventure begins here</Text>
      </View>

      {/* Feature Sections */}
      <View style={styles.featureSection}>
        <Text style={styles.featureTitle}>Explore the Game Features</Text>

        <View style={styles.featuresList}>
          {/* Player Profile */}
          <FeatureItem
            icon="person"
            title="Player Profile"
            description="Manage your profile, track progress, and earn badges."
            onPress={() => navigateToSection("PlayerProfile")}
          />

          {/* Vanguardian Folder */}
          <FeatureItem
            icon="folder"
            title="Vanguardian Folder"
            description="Track completed forms, points, and notes for multiple Vanguardians."
            onPress={() => navigateToSection("VanguardianFolder")}
          />

          {/* Player Forum & Chat */}
          <FeatureItem
            icon="chat"
            title="EQ Player Forum/Chat"
            description="Connect with other players and discuss strategies."
            onPress={() => navigateToSection("EQForumChat")}
          />

          {/* Player's Handbook */}
          <FeatureItem
            icon="book"
            title="Player's Handbook"
            description="Comprehensive guide to the world of EarthQuest."
            onPress={() =>
              openPDF("https://drive.google.com/file/d/1bL7fNYb0BO2nrjSwsVPUELwlounCV0TH/view")
            }
          />

          {/* GM Rulebook */}
          <FeatureItem
            icon="menu-book"
            title="EQ GM Rulebook"
            description="Guidelines and rules for Game Masters."
            onPress={() =>
              openPDF("https://example.com/gm-rulebook.pdf")
            }
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
            onPress={() => navigateToSection("EQGamesheets")}
          />

          {/* Randomizer (Dice Roll) */}
          <FeatureItem
            icon="casino"
            title="Randomizer (1d12)"
            description="Roll a 12-sided die for random game elements."
            onPress={() => navigateToSection("DiceRoll")}
          />

          {/* QR Code Scanner */}
          <FeatureItem
            icon="qr-code-scanner"
            title="QR Code Scanner"
            description="Scan EarthQuest QR codes for bonuses and rewards."
            onPress={() => navigateToSection("QRScanner")}
          />

          {/* EarthQuest Storefront */}
          <FeatureItem
            icon="shopping-cart"
            title="EQ Storefront"
            description="Buy the EarthQuest game and accessories."
            onPress={() => navigateToSection("EQStorefront")}
          />

          {/* About EarthQuest */}
          <FeatureItem
            icon="info"
            title="About EarthQuest"
            description="Learn more about the game and its mission."
            onPress={() => navigateToSection("AboutEQ")}
          />
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

/* FeatureItem Component for Reusability */
const FeatureItem = ({ icon, title, description, onPress }) => (
  <View style={styles.featureItem}>
    <Icon name={icon} size={40} color="#2e7d32" />
    <Text style={styles.featureText}>{title}</Text>
    {description && <Text style={styles.featureDescription}>{description}</Text>}
    <TouchableOpacity style={styles.featureButton} onPress={onPress}>
      <Text style={styles.featureButtonText}>Explore</Text>
    </TouchableOpacity>
  </View>
);

/* Styles */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff", padding: 20 },
  headerContainer: { alignItems: "center", marginBottom: 30 },
  headerText: { fontSize: 32, fontWeight: "bold", color: "#2e7d32" },
  subHeaderText: { fontSize: 16, color: "#333" },
  featureSection: { marginBottom: 30 },
  featureTitle: { fontSize: 22, fontWeight: "bold", color: "#2e7d32", marginBottom: 10, textAlign: "center" },
  featuresList: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: 20 },
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
  featureText: { fontSize: 18, fontWeight: "bold", color: "#2e7d32", marginTop: 10 },
  featureDescription: { color: "#333", fontSize: 14, textAlign: "center", marginVertical: 5 },
  featureButton: { backgroundColor: "#2e7d32", paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, borderRadius: 5 },
  featureButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  footerContainer: { alignItems: "center", marginTop: 30, borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 10 },
  footerText: { fontSize: 14, color: "#666" },
  footerLink: { marginTop: 10 },
  footerLinkText: { color: "#2e7d32", fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
