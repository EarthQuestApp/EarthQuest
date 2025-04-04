import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const EcoLoginSignup = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validateInputs = () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created successfully!");
      }
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Authentication Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#a8e063", "#56ab2f"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <Ionicons
          name="leaf-outline"
          size={80}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.headerText}>
          {isLogin ? "Welcome Back, Earth Warrior!" : "Join the Green Movement"}
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

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#dcdcdc"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#dcdcdc"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleForm}>
          <Text style={styles.toggleText}>
            {isLogin
              ? "New to EarthQuest? Sign Up"
              : "Already a member? Login"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Increased opacity for better visibility
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#333', // Ensures typed text is visible
    fontSize: 16,
    width: '100%',
    placeholderTextColor: '#666', // Darker placeholder color
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Matches input background
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: '#333', // Ensures text visibility
    fontSize: 16,
    placeholderTextColor: '#666', // Darker placeholder color
  },
  
  eyeIcon: {
    padding: 10,
  },
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dismissArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  formContainer: {
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});

export default EcoLoginSignup;
