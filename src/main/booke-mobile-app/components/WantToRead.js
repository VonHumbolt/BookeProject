import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

const WantToRead = () => {
  return (
    <View className="bg-gray-100 shadow-lg">
      <Text className="mt-6 mb-2 mx-6 text-lg font-semibold text-[#3D405B]">Want To Read</Text>
      <View className="px-6 py-3 bg-white">
        <Text>20 books · See More</Text>
        <ScrollView horizontal
        className="space-x-6 my-2">
            {/* Book Images */}
            <Image 
                source={require("../assets/discover-image.png")}
                className="w-24 h-36"
            />
            <Image 
                source={require("../assets/discover-image.png")}
                className="w-24 h-36"
            />
            <Image 
                source={require("../assets/discover-image.png")}
                className="w-24 h-36"
            />
        </ScrollView>
      </View>
    </View>
  )
}

export default WantToRead