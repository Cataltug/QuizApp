import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Button from '../Button';


type Category = {
    id: string;
    name: string;
}

type Props = {
    category: Category;
    isCompleted: boolean;
}

const Category = ({category: {id, name}, isCompleted}: Props) => {
    const navigation = useNavigation();


    const handlePressed = () => {
        // TODO: Fix types
        // @ts-ignore
        navigation.navigate("Quiz", {category: id})
    };

  return (
    <Button title={`${name} ${isCompleted && "✔️​"}`} onPress={handlePressed} flex/>
  )
}

export default Category