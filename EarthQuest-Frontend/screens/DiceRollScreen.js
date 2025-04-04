import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const DiceRollScreen = () => {
  const [rollResult, setRollResult] = useState(null);
  const [rotateValue] = useState(new Animated.Value(0)); // Animated value for rotation

  // Array of dice faces (1 to 12)
  const diceFaces = [
    "filter-1", // 1 dot
    "filter-2", // 2 dots
    "filter-3", // 3 dots
    "filter-4", // 4 dots
    "filter-5", // 5 dots
    "filter-6", // 6 dots
    "filter-7", // 7 dots
    "filter-8", // 8 dots
    "filter-9", // 9 dots
    "filter-10", // 10 dots
    "filter-11", // 11 dots
    "filter-12", // 12 dots
  ];

  // Function to generate a random number between 1 and 12
  const rollDice = () => {
    // Trigger the rotation animation
    Animated.timing(rotateValue, {
      toValue: 1, // End rotation value
      duration: 500, // Duration of animation
      useNativeDriver: true, // Enable native driver for smoother performance
    }).start(() => {
      // Reset rotation after animation
      rotateValue.setValue(0);

      // After the rotation is completed, generate the dice roll result
      const result = Math.floor(Math.random() * 12) + 1;
      setRollResult(result); // Update the result state
    });
  };

  // Interpolate the rotation value to rotate from 0 to 360 degrees
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Rotate from 0 to 360 degrees
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Randomizer (1d12)</Text>
      </View>
      <View style={styles.diceContainer}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          {/* Dynamically render dice face based on the rollResult */}
          {rollResult !== null && (
            <Icon name={`filter-${rollResult}`} size={100} color="#2e7d32" />
          )}
        </Animated.View>
        {rollResult && (
          <Text style={styles.resultText}>You rolled a {rollResult}!</Text>
        )}
        <TouchableOpacity style={styles.rollButton} onPress={rollDice}>
          <Text style={styles.rollButtonText}>Roll the Die</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff", padding: 20 },
  headerContainer: { alignItems: "center", marginBottom: 30 },
  headerText: { fontSize: 28, fontWeight: "bold", color: "#2e7d32" },
  diceContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  resultText: { fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 20 },
  rollButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 30,
  },
  rollButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DiceRollScreen;



// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const DiceRollScreen = () => {
//   const [rollResult, setRollResult] = useState(null);
//   const [rotateValue] = useState(new Animated.Value(0)); // Animated value for rotation

//   // Array of dice faces (1 to 6) for MaterialIcons
//   const diceFaces = [
//     "filter-1", // 1 dot
//     "filter-2", // 2 dots
//     "filter-3", // 3 dots
//     "filter-4", // 4 dots
//     "filter-5", // 5 dots
//     "filter-6", // 6 dots
//   ];

//   // Function to generate a random number between 1 and 12
//   const rollDice = () => {
//     // Trigger the rotation animation
//     Animated.timing(rotateValue, {
//       toValue: 1, // End rotation value
//       duration: 500, // Duration of animation
//       useNativeDriver: true, // Enable native driver for smoother performance
//     }).start(() => {
//       // Reset rotation after animation
//       rotateValue.setValue(0);

//       // After the rotation is completed, generate the dice roll result
//       const result = Math.floor(Math.random() * 12) + 1;
//       setRollResult(result); // Update the result state
//     });
//   };

//   // Interpolate the rotation value to rotate from 0 to 360 degrees
//   const rotate = rotateValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"], // Rotate from 0 to 360 degrees
//   });

//   // Function to get the icon name based on the rolled result
//   const getDiceIcon = (number) => {
//     // For numbers 1-6, use the Material Icons
//     if (number >= 1 && number <= 6) {
//       return `filter-${number}`;
//     }

//     // For numbers 7-12, return a text or custom fallback icon
//     switch (number) {
//       case 7:
//         return "7 dots"; // Custom text or icon for 7
//       case 8:
//         return "8 dots"; // Custom text or icon for 8
//       case 9:
//         return "9 dots"; // Custom text or icon for 9
//       case 10:
//         return "10 dots"; // Custom text or icon for 10
//       case 11:
//         return "11 dots"; // Custom text or icon for 11
//       case 12:
//         return "12 dots"; // Custom text or icon for 12
//       default:
//         return "filter-1"; // Default fallback icon
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>Randomizer (1d12)</Text>
//       </View>
//       <View style={styles.diceContainer}>
//         <Animated.View style={{ transform: [{ rotate }] }}>
//           {/* Dynamically render dice face based on the rollResult */}
//           {rollResult !== null && (
//             <Text style={styles.diceText}>
//               {/* Display the icon for 1-6 or fallback for numbers 7-12 */}
//               {rollResult <= 6 ? (
//                 <Icon name={getDiceIcon(rollResult)} size={100} color="#2e7d32" />
//               ) : (
//                 <Text style={{ fontSize: 100, color: "#2e7d32" }}>
//                   {getDiceIcon(rollResult)}
//                 </Text>
//               )}
//             </Text>
//           )}
//         </Animated.View>
//         {rollResult && (
//           <Text style={styles.resultText}>You rolled a {rollResult}!</Text>
//         )}
//         <TouchableOpacity style={styles.rollButton} onPress={rollDice}>
//           <Text style={styles.rollButtonText}>Roll the Die</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f0f8ff", padding: 20 },
//   headerContainer: { alignItems: "center", marginBottom: 30 },
//   headerText: { fontSize: 28, fontWeight: "bold", color: "#2e7d32" },
//   diceContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
//   resultText: { fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 20 },
//   rollButton: {
//     backgroundColor: "#2e7d32",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 5,
//     marginTop: 30,
//   },
//   rollButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   diceText: {
//     fontSize: 100,
//     fontWeight: "bold",
//     color: "#2e7d32",
//   },
// });

// export default DiceRollScreen;
