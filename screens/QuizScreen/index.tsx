import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import questions from '../../data/questions';

const QuizScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)

    // TODO: Add types
    // @ts-ignore
    const { category } = route.params;
    const quizQuestions = questions[category];
    const {question, options, answerIndex, hint} = quizQuestions[currentQuestionIndex];

    const handleAnswer = (option, optionIndex) => {
        //is option = answer?
        if(optionIndex === answerIndex) {
            setScore(prevScore => prevScore + 1)
        }
        //if all questions are not answered yet
        if(currentQuestionIndex + 1 < quizQuestions.length) {
            setcurrentQuestionIndex(prevQuestionIndex => prevQuestionIndex + 1)
        } else {
            // score: 3/10
            // @ts-ignore
            navigation.navigate("Result", {score, total: quizQuestions.length})
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style = {styles.optionsContainer}>
      {options.map((x,i) => (
        <TouchableOpacity
        key={x}
        style={styles.option} onPress={() => handleAnswer(x, i)}>
        <Text style={styles.optionText}
        adjustsFontSizeToFit
        numberOfLines={1}>{x}</Text>
        </TouchableOpacity>
        ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        gap: 32,
    },
    question: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
    },
    option: {
        padding: 8,
        paddingHorizontal: 32,
        backgroundColor: "dodgerblue",

    },
    optionText: {
        color: "white",
        textAlign: "center",
        fontSize: 24,
    },
    optionsContainer: {
        gap: 8,
    }

})

export default QuizScreen