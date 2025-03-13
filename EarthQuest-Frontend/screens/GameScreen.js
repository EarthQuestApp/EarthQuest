import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);

  const handleScore = () => {
    setScore(score + 10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EarthQuest Game</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Button title="Increase Score" onPress={handleScore} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GameScreen;
