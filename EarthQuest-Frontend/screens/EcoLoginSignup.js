import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EcoLoginSignup = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const validateInputs = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    Keyboard.dismiss(); // Hide keyboard on submit
    if (!validateInputs()) return;

    // Simulate authentication (Replace with real API logic)
    setTimeout(() => {
      Alert.alert('Success', isLogin ? 'Logged in successfully!' : 'Account created successfully!');
      navigation.navigate('Home');
    }, 1000);
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={styles.formContainer}>
        <Ionicons name="leaf-outline" size={80} color="#2e7d32" style={styles.icon} />
        <Text style={styles.headerText}>
          {isLogin ? 'Welcome Back, Earth Warrior!' : 'Join the Green Movement'}
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#dcdcdc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#dcdcdc"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {!isLogin && (
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#dcdcdc"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
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
    backgroundColor: '#e6f7e6',
    position: 'relative',
    paddingTop: StatusBar.currentHeight,
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 1,
    width: '90%',
    maxWidth: 400,
  },
  icon: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#333',
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleText: {
    color: '#2e7d32',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default EcoLoginSignup;
