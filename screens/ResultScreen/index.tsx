import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StackActions, StaticScreenProps, useNavigation, useRoute } from '@react-navigation/native'
import Category from '../../components/Category';
import questions from '../../data/questions';
import Button from '../../components/Button';

type CategoryType = keyof typeof questions;

type Props = StaticScreenProps<{
    score: number;
    total: number;
    category: CategoryType;
  }>;


const ResultScreen = ({route}: Props) => {

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
      <Button title="🏠​ Return Home" onPress={handleHome}/>
      <Button title="🔁 Play Again?" onPress={handleRetry}/>
      
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
  }
})

export default ResultScreen