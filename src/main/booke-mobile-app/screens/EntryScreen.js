import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';


const EntryScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      SecureStore.getItemAsync("token").then(token => {
        if(token != null)
          navigation.navigate("TabNavigation")
        else 
          navigation.navigate("Login")
      })
    }, 2000)
    // SecureStore.deleteItemAsync("token");
    // SecureStore.deleteItemAsync("refreshToken");
    // SecureStore.deleteItemAsync("email");
    // SecureStore.deleteItemAsync("userId");
    // SecureStore.deleteItemAsync("readerId");
  }, [])
  
  return (
    <SafeAreaView className="flex-1 bg-[#E07A5F]">
      <View className="items-center justify-center mt-20">
        <Image source={require("../assets/logo.png")} className="object-contain" />
        <Image source={require("../assets/entry-image.png")} className="mt-20 w-96 object-cover" />
      </View>
    </SafeAreaView>
  )
}

export default EntryScreen