import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

// Import Screens
import EcoLoginSignup from './screens/EcoLoginSignup';
import HomeScreen from './screens/HomeScreen';
import PlayerProfileScreen from './screens/PlayerProfileScreen'; // Import Player Profile Screen

// Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={EcoLoginSignup} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PlayerProfile" 
          component={PlayerProfileScreen} 
          options={{ title: "Player Profile" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
