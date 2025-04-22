import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const QuizScreen = () => {

    const route = useRoute();

    const category = route.params;
  return (
    <View>
      <Text>QuizScreen</Text>
    </View>
  )
}

export default QuizScreen