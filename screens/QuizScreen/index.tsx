import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import questions from '../../data/questions';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const QuizScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false)

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

    const handleSheetChanges = useCallback((index: number) => {
        if(index === -1){
            setShowHint(false);
        }
      }, []);

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
        <TouchableOpacity style={styles.hint} onPress={()=> setShowHint(prev => !prev)}>
            <Text style={styles.hintText}>i</Text>
        </TouchableOpacity>
        {showHint && (<BottomSheet enablePanDownToClose ref={bottomSheetRef}
        snapPoints={[150, "50%"]}
        onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.buttomSheetTitle}>Hint!</Text>
                <Text style={styles.buttomSheetDesc}>{hint}</Text>
            </BottomSheetView>
        </BottomSheet>)
        }
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
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
        gap: 16,
      },
    hint: {
        backgroundColor: "tomato",
        width: 80,
        height: 80,
        borderRadius: 80,
        position: "absolute",
        bottom: 32,
        right: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    hintText: {
        color: "white",
        fontSize: 36,
        fontWeight: "bold"
    },
    buttomSheetTitle: {
        fontSize: 24,
    },
    buttomSheetDesc: {
        fontSize: 16,
    }
})

export default QuizScreen