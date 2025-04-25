import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


type Props = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  flex?: boolean;
}

const Button = ({title, onPress, backgroundColor = "dodgerblue", flex = false}: Props) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor, flex: flex ? 1 : undefined}]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "dodgerblue",
    width: "100%",
    paddingVertical: 16,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
})