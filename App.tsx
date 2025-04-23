// In App.js in a new project

import * as React from 'react';
import StackNavigator from './navigation/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  
  return (
    <GestureHandlerRootView>
      <StackNavigator />
    </GestureHandlerRootView> 
  );
}