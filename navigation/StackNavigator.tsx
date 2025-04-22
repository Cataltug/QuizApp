import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import ResultScreen from '../screens/ResultScreen';

const RootStack = createNativeStackNavigator({
    screens: {
      Home: {
        screen: HomeScreen,
        options: {
            title: "Quiz Categories",
            headerTitleAlign: "center"
        }
      },
      Quiz: QuizScreen,
      Result: ResultScreen,
    },
  });
  
  const StackNavigator = createStaticNavigation(RootStack);



export default StackNavigator;