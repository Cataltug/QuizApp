import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from '../../components/Category'
import { useNavigation } from '@react-navigation/native'
import { getCompletedTests } from '../../utils/storage'

const categories = [
    {id: "history", name: "History"},
    {id: "general", name: "General"},
    {id: "movies", name: "Movies"},
    {id: "music", name: "Music"}
]


const HomeScreen = () => {
  const navigation = useNavigation();
  const [completedTests, setCompletedTests] = useState([])

  useEffect(() => {
    function fetchCompletedTests(){
      getCompletedTests().then((tests) => setCompletedTests(tests))
    }
    const unsubscribe = navigation.addListener("focus", fetchCompletedTests)

    return unsubscribe;
  }, [navigation])

  console.log({completedTests})
  return (
    <View style={{
        flex: 1, 
        justifyContent: "center"
    }}>
      
      <View>
      <FlatList 
      data={categories}
      renderItem={({item}) => <Category category={item} isCompleted ={completedTests.includes(item.id)} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{
        gap:16,
        marginHorizontal:16,
      }}
      columnWrapperStyle={{
        gap:16
      }}
      />
      </View>
    </View>
  )
}

export default HomeScreen