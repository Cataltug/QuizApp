import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import Category from '../../components/Category';

const ResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // TODO: assign types
  // @ts-ignore
  const {score, total, category} = route.params;
  const handleHome = () => {
    // TODO: assign types
    // @ts-ignore
    navigation.navigate("Home")
  }

  const handleRetry = () => {
    // TODO: assign types
    // @ts-ignore
    navigation.navigate("Quiz", {category})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.scoreText}>Score: {score}/{total}</Text>
      <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
        <Text style={styles.homeText}>🏠​ Return Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryText}>🔁 Play Again?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
  },
  scoreText: {
    fontSize: 18,
  },
  homeButton: {
    backgroundColor: "dodgerblue",
    width: "100%",
    paddingVertical: 16,
  },
  homeText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "dodgerblue",
    width: "100%",
    paddingVertical: 16,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  }
})

export default ResultScreen