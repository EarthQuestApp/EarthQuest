import React, { useState } from "react";
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

  const handleLearnMorePress = () => {
    const pdfUrl =
      "https://drive.google.com/file/d/1bL7fNYb0BO2nrjSwsVPUELwlounCV0TH/view?usp=sharing";
    WebBrowser.openBrowserAsync(pdfUrl); // This opens the PDF in an external browser
  };

  const handleEQ1AdventurePress = () => {
    navigateToSection("EQ1Adventure");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to EarthQuest!</Text>
        <Text style={styles.subHeaderText}>Your adventure begins here</Text>
      </View>

      {/* Game Features Section with Icons, Titles, and Descriptions */}
      <View style={styles.featureSection}>
        <Text style={styles.featureTitle}>Explore the Game Features</Text>
        <View style={styles.featuresList}>
          {/* Feature 1: Player's Handbook */}
          <View style={styles.featureItem}>
            <Icon name="book" size={40} color="#2e7d32" />
            <Text style={styles.featureText}>Player's Handbook</Text>
            <Text style={styles.featureDescription}>
              A comprehensive guide to navigating the world of EarthQuest.
            </Text>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={handleLearnMorePress} // Use the function here
            >
              <Text style={styles.featureButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>

          {/* Feature 2: Game Mentor's Handbook */}
          <View style={styles.featureItem}>
            <Icon name="school" size={40} color="#2e7d32" />
            <Text style={styles.featureText}>Game Mentor's Handbook</Text>
            <Text style={styles.featureDescription}>
              A guide for mentors to help players succeed in the game.
            </Text>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigateToSection("GameMentorHandbook")}
            >
              <Text style={styles.featureButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>

          {/* Feature 3: EQ1 Adventure */}
          <View style={styles.featureItem}>
            <Icon name="adventure" size={40} color="#2e7d32" />
            <Text style={styles.featureText}>EQ1 Adventure</Text>
            <Text style={styles.featureDescription}>
              Embark on an adventure like no other, filled with challenges and
              rewards.
            </Text>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={handleEQ1AdventurePress}
            >
              <Text style={styles.featureButtonText}>Start Adventure</Text>
            </TouchableOpacity>
          </View>

          {/* Feature 4: GameSheets */}
          <View style={styles.featureItem}>
            <Icon name="folder" size={40} color="#2e7d32" />
            <Text style={styles.featureText}>GameSheets</Text>
            <Text style={styles.featureDescription}>
              Access a variety of game sheets to track your progress and manage
              your resources.
            </Text>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigateToSection("GameSheets")}
            >
              <Text style={styles.featureButtonText}>View GameSheets</Text>
            </TouchableOpacity>
          </View>

          {/* Feature 5: Membership */}
          <View style={styles.featureItem}>
            <Icon name="group" size={40} color="#2e7d32" />
            <Text style={styles.featureText}>Membership</Text>
            <Text style={styles.featureDescription}>
              Join the EarthQuest community to unlock exclusive content and
              rewards.
            </Text>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigateToSection("Membership")}
            >
              <Text style={styles.featureButtonText}>Become a Member</Text>
            </TouchableOpacity>
          </View>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#333",
  },
  featureSection: {
    marginBottom: 30,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
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
    width: "45%", // Makes the cards have a flexible width
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  featureText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginTop: 10,
  },
  featureDescription: {
    color: "#333",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 5,
  },
  featureButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  featureButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  footerLink: {
    marginTop: 10,
  },
  footerLinkText: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
