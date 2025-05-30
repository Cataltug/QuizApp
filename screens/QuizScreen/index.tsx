import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { StaticScreenProps, useNavigation, useRoute } from '@react-navigation/native'
import questions from '../../data/questions';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { saveCompletedTest } from '../../utils/storage';

type CategoryType = keyof typeof questions;

type Props = StaticScreenProps<{
    category: CategoryType;
  }>;

const QuizScreen = ({route}: Props) => {


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

    const handleAnswer = async (option: string, optionIndex: number) => {
        //is option = answer?
        if(optionIndex === answerIndex) {
            setScore(prevScore => prevScore + 1)
        }
        //if all questions are not answered yet
        if(currentQuestionIndex + 1 < quizQuestions.length) {
            setcurrentQuestionIndex(prevQuestionIndex => prevQuestionIndex + 1)
        } else {
            //if all questions answered
            await saveCompletedTest(category);
            // score: 3/10
            // @ts-ignore
            navigation.navigate("Result", {score, category, total: quizQuestions.length})
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
      {options.map((option,i) => (
        <TouchableOpacity
        key={option}
        style={styles.option} onPress={() => handleAnswer(option, i)}>
        <Text style={styles.optionText}
        adjustsFontSizeToFit
        numberOfLines={1}>{option}</Text>
        </TouchableOpacity>
        ))}
        </View>

        <TouchableOpacity style={styles.hint} onPress={()=> setShowHint(prev => !prev)}>
            <Text style={styles.hintText}>i</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.prevQuestion, {backgroundColor: currentQuestionIndex === 0 ? "grey" : "dodgerblue"}]} onPress={()=> setcurrentQuestionIndex(prev => prev - 1)} disabled= {currentQuestionIndex === 0}>
            <Text style={styles.prevQuestionText}>⬅️​​ Previous Question</Text>
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
    },
    prevQuestion: {
        backgroundColor: "dodgerblue",
        paddingVertical: 8,
        paddingHorizontal: 16,
        position: "absolute",
        bottom: 32,
        left: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    prevQuestionText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }
})

export default QuizScreen