// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-gesture-handler';

// import EcoLoginSignup from './screens/EcoLoginSignup';
// import HomeScreen from './screens/HomeScreen';
// import PlayerProfileScreen from './screens/PlayerProfileScreen';
// import Gamesheets from './screens/Gamesheets';
// import PDFViewer from './screens/PDFViewer';
// import OtherFeaturesScreen from './screens/OtherFeaturesScreen';
// import MembershipScreen from './screens/MembershipScreen';
// import DiceRollScreen from './screens/DiceRollScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [isReady, setIsReady] = useState(false); // for waiting to load AsyncStorage
//   const [initialRoute, setInitialRoute] = useState('Login'); // default route to 'Login'

//   useEffect(() => {
//     const restoreNavigationState = async () => {
//       try {
//         // Get the stored navigation state from AsyncStorage
//         const savedState = await AsyncStorage.getItem('NAVIGATION_STATE');
//         if (savedState) {
//           // If we have a saved state, restore it
//           const parsedState = JSON.parse(savedState);
//           setInitialRoute(parsedState?.routes[0]?.name || 'Login'); // Set the initial route to the restored state
//         }
//       } catch (e) {
//         console.error('Failed to load navigation state', e);
//       } finally {
//         setIsReady(true); // We are ready to load the navigator
//       }
//     };

//     restoreNavigationState();
//   }, []);

//   const onStateChange = (state) => {
//     // Save the navigation state to AsyncStorage
//     AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state));
//   };

//   if (!isReady) {
//     return null; // Show nothing while we are loading the navigation state
//   }

//   return (
//     <NavigationContainer
//       initialState={{ routes: [{ name: initialRoute }] }}
//       onStateChange={onStateChange}
//     >
//       <Stack.Navigator initialRouteName={initialRoute}>
//         <Stack.Screen
//           name="Login"
//           component={EcoLoginSignup}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="PlayerProfile"
//           component={PlayerProfileScreen}
//           options={{ title: 'Player Profile', animation: 'slide_from_right' }}
//         />
//         <Stack.Screen
//           name="Gamesheets"
//           component={Gamesheets}
//           options={{ title: 'EQ Gamesheets', animation: 'slide_from_right' }}
//         />
//         <Stack.Screen
//           name="PDFViewer"
//           component={PDFViewer}
//           options={{ title: 'View PDF', animation: 'slide_from_right' }}
//         />
//         <Stack.Screen
//           name="OtherFeatures"
//           component={OtherFeaturesScreen}
//           options={{ title: 'More Features', animation: 'fade_from_bottom' }}
//         />
//         <Stack.Screen
//           name="Membership"
//           component={MembershipScreen}
//           options={{ title: 'Green Membership', animation: 'slide_from_right' }}
//         />
//         <Stack.Screen
//           name="DiceRoll"
//           component={DiceRollScreen}
//           options={{ title: 'Randomizer (1d12)', animation: 'slide_from_right' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// } 



import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

import EcoLoginSignup from './screens/EcoLoginSignup';
import HomeScreen from './screens/HomeScreen';
import PlayerProfileScreen from './screens/PlayerProfileScreen';
import Gamesheets from './screens/Gamesheets';
import PDFViewer from './screens/PDFViewer';
import OtherFeaturesScreen from './screens/OtherFeaturesScreen';
import MembershipScreen from './screens/MembershipScreen';
import DiceRollScreen from './screens/DiceRollScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false); // for waiting to load AsyncStorage
  const [initialRoute, setInitialRoute] = useState('Login'); // always start with 'Login'

  useEffect(() => {
    // Set the initial route to 'Login' on app load, without restoring state from AsyncStorage
    setInitialRoute('Login');
    setIsReady(true); // We are ready to load the navigator
  }, []);

  const onStateChange = (state) => {
    // You can remove this if you don't want to save the navigation state back to AsyncStorage
    // AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state));
  };

  if (!isReady) {
    return null; // Show nothing while we are setting up
  }

  return (
    <NavigationContainer
      initialState={{ routes: [{ name: initialRoute }] }} // Force initial route to 'Login'
      onStateChange={onStateChange} // Optionally save navigation state here
    >
      <Stack.Navigator initialRouteName={initialRoute}>
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
          options={{ title: 'Player Profile', animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Gamesheets"
          component={Gamesheets}
          options={{ title: 'EQ Gamesheets', animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="PDFViewer"
          component={PDFViewer}
          options={{ title: 'View PDF', animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="OtherFeatures"
          component={OtherFeaturesScreen}
          options={{ title: 'More Features', animation: 'fade_from_bottom' }}
        />
        <Stack.Screen
          name="Membership"
          component={MembershipScreen}
          options={{ title: 'Green Membership', animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="DiceRoll"
          component={DiceRollScreen}
          options={{ title: 'Randomizer (1d12)', animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
