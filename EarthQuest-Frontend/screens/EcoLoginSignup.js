import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EcoLoginSignup = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = () => {
    // Perform login or signup logic here
    // On success, navigate to Home screen
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Ionicons name="leaf-outline" size={80} color="#2e7d32" style={styles.icon} />
        <Text style={styles.headerText}>
          {isLogin ? 'Welcome Back, Earth Warrior!' : 'Join the Green Movement'}
        </Text>

        <TextInput placeholder="Email" placeholderTextColor="#dcdcdc" style={styles.input} />
        <TextInput placeholder="Password" placeholderTextColor="#dcdcdc" secureTextEntry style={styles.input} />

        {!isLogin && (
          <TextInput placeholder="Confirm Password" placeholderTextColor="#dcdcdc" secureTextEntry style={styles.input} />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleForm}>
          <Text style={styles.toggleText}>
            {isLogin ? 'New to EarthQuest? Sign Up' : 'Already a member? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f7e6', // Soft light green background
    position: 'relative', // Ensure absolute positioning works correctly
    paddingTop: StatusBar.currentHeight, // Adjust for status bar height
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 1, // Make sure form is above floating leaf
    width: '90%', // Set width to 90% of the screen
    maxWidth: 400, // Ensure the form does not stretch beyond 400px width
  },
  icon: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32', // Green color for header
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Roboto', // Use a clean, modern font
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light semi-transparent background for inputs
    marginBottom: 15, // Reduced margin for closer spacing
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#333', // Dark text for better contrast
    fontSize: 16,
    width: '100%', // Make inputs full width of the container
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '100%', // Make button full width of the container
    marginBottom: 20, // Add spacing below button
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleText: {
    color: '#2e7d32', // Green text for toggling
    marginTop: 10, // Reduced margin for better spacing
    fontSize: 16,
    fontFamily: 'Roboto', // Consistent font family
  },
});

export default EcoLoginSignup;
