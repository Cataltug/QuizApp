import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Category from '../../components/Category'

const categories = [
    {id: "history", name: "History"},
    {id: "general", name: "General"},
    {id: "movies", name: "Movies"},
    {id: "music", name: "Music"}
]


const HomeScreen = () => {
  return (
    <View style={{
        flex: 1, 
        justifyContent: "center"
    }}>
      
      <View>
      <FlatList 
      data={categories}
      renderItem={({item}) => <Category category={item}/>}
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