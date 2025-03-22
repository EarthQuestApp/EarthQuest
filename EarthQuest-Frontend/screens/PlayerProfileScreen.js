import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";

const PlayerProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  // Reusable Button Component for consistent button design with image
  const Button = ({ title, onPress, loading, icon }) => (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonLoading]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={styles.buttonText}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  const handleButtonPress = (action) => {
    setLoading(true);
    // Simulating an API call or some async operation
    setTimeout(() => {
      setLoading(false);
      // Navigate based on the button action
      switch (action) {
        case "createPlayer":
          navigation.navigate("CreatePlayerScreen");
          break;
        case "createSUScore":
          navigation.navigate("CreateSUScoreScreen");
          break;
        case "createVanguardian":
          navigation.navigate("CreateVanguardianScreen");
          break;
        case "uploadMedia":
          navigation.navigate("UploadMediaScreen");
          break;
        case "socialMedia":
          navigation.navigate("SocialMediaScreen");
          break;
        case "feedback":
          navigation.navigate("FeedbackScreen");
          break;
        case "calendar":
          navigation.navigate("CalendarScreen");
          break;
        case "serviceProjects":
          navigation.navigate("ServiceProjectsScreen");
          break;
        default:
          console.log("Unknown action");
      }
    }, 2000); // Simulate a delay
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Title and Description */}
        <Text style={styles.title}>Player Profile</Text>
        <Text style={styles.description}>
          Manage your EarthQuest profile, Vanguardian, SUScore, and more!
        </Text>

        {/* 3x3 Matrix Layout for Features */}
        <View style={styles.grid}>
          {/* Row 1 */}
          <View style={styles.row}>
            <Button
              title="Create Player Profile"
              onPress={() => handleButtonPress("createPlayer")}
              icon={require('../assets/icons/create_player.png')}
              loading={loading}
            />
            <Button
              title="Create SUScore & SUbadge"
              onPress={() => handleButtonPress("createSUScore")}
              icon={require('../assets/icons/suscore.png')}
              loading={loading}
            />
            <Button
              title="Create Vanguardian"
              onPress={() => handleButtonPress("createVanguardian")}
              icon={require('../assets/icons/vanguardian.png')}
              loading={loading}
            />
          </View>

          {/* Row 2 */}
          <View style={styles.row}>
            <Button
              title="3D Vanguardian Avatar"
              onPress={() => handleButtonPress("createVanguardian")}
              icon={require('../assets/icons/3d_avatar.png')}
              loading={loading}
            />
            <Button
              title="Upload Media"
              onPress={() => handleButtonPress("uploadMedia")}
              icon={require('../assets/icons/upload_media.png')}
              loading={loading}
            />
            <Button
              title="Social Media #EarthQuestTheGame"
              onPress={() => handleButtonPress("socialMedia")}
              icon={require('../assets/icons/social_media.png')}
              loading={loading}
            />
          </View>

          {/* Row 3 */}
          <View style={styles.row}>
            <Button
              title="Feedback"
              onPress={() => handleButtonPress("feedback")}
              icon={require('../assets/icons/feedback.png')}
              loading={loading}
            />
            <Button
              title="Calendar"
              onPress={() => handleButtonPress("calendar")}
              icon={require('../assets/icons/calendar.png')}
              loading={loading}
            />
            <Button
              title="Service Projects"
              onPress={() => handleButtonPress("serviceProjects")}
              icon={require('../assets/icons/service_projects.png')}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#E0F7FA", // Light Blue background for an environmental theme
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#388E3C", // Earthy green
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  description: {
    fontSize: 18,
    color: "#2C6B2F",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Roboto",
    lineHeight: 26,
    fontStyle: "italic",
  },
  grid: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10, // To make sure buttons don't touch the edges on small screens
  },
  button: {
    backgroundColor: "#388E3C", // Green color for consistency
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "30%", // Standard width for each button in the grid
    alignItems: "center",
    elevation: 3,
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 100, // Ensure button has a minimum width for consistency
  },
  buttonLoading: {
    backgroundColor: "#4CAF50", // Slightly different shade when loading
  },
  buttonText: {
    color: "#fff",
    fontSize: 16, // Larger font size for better readability
    fontWeight: "600", // Semi-bold for emphasis
    letterSpacing: 1, // Added spacing for clarity
    textTransform: "capitalize", // Makes the first letter of each word uppercase
    marginTop: 10,
    fontFamily: "Poppins", // More stylish font
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#388E3C",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlayerProfileScreen;
