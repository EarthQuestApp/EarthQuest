import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MembershipScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); // Track subscription process

  const handleSubscription = () => {
    // Simulate the subscription process (e.g., payment gateway)
    setIsLoading(true);

    // Mock delay to simulate a network request (payment processing)
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Subscription Successful", "You have successfully subscribed to the Green Membership!");
      navigation.navigate("Home"); // Redirect to Home after success
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Green Membership</Text>
        <Text style={styles.subHeaderText}>Exclusive benefits just for you!</Text>
      </View>

      {/* Membership Details Section */}
      <View style={styles.membershipDetails}>
        <Text style={styles.title}>Why Go Green?</Text>
        <Text style={styles.description}>
          Our Green Membership gives you access to exclusive features, discounts, and personalized content. Here's what you get:
        </Text>

        <View style={styles.benefitList}>
          <Text style={styles.benefit}>✔ Early access to new content</Text>
          <Text style={styles.benefit}>✔ Exclusive in-game items</Text>
          <Text style={styles.benefit}>✔ Priority support</Text>
          <Text style={styles.benefit}>✔ Special discounts on merchandise</Text>
          <Text style={styles.benefit}>✔ Access to premium features</Text>
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSection}>
          <Text style={styles.priceText}>Price: 19.99 USD / Month</Text>
        </View>

        {/* How to Get Started Section */}
        <Text style={styles.title}>How to Get Started</Text>
        <Text style={styles.description}>
          Simply select the Green Membership option and start enjoying the benefits right away.
        </Text>

        {/* Subscribe Button */}
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscription}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" /> // Show loader during subscription
          ) : (
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        <Text style={styles.faqText}>Q: How do I cancel my membership?</Text>
        <Text style={styles.faqText}>A: You can cancel your membership anytime through your account settings.</Text>
        <Text style={styles.faqText}>Q: Are there any hidden fees?</Text>
        <Text style={styles.faqText}>A: No, there are no hidden fees. The price is fixed at 19.99 USD per month.</Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footerLinkText}>Back to Home</Text>
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
  membershipDetails: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  benefitList: {
    marginVertical: 15,
  },
  benefit: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  pricingSection: {
    marginVertical: 20,
    alignItems: "center",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  subscribeButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  faqSection: {
    marginVertical: 20,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
  },
  faqText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  footerLinkText: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MembershipScreen;
