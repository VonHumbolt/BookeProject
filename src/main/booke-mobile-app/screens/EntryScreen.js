import { View, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';


const EntryScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      SecureStore.getItemAsync("token").then(token => {
        if(token != null)
          navigation.dispatch(
            StackActions.replace("TabNavigation")
          )
        else 
          navigation.dispatch(
            StackActions.replace("Login")
          )
      })
    }, 2000)
  }, [])
  
  return (
    <SafeAreaView className="flex-1 bg-[#E07A5F]">
      <View className="items-center justify-center mt-20">
        <Image source={require("../assets/logo.png")} className="w-80 h-24 object-contain" />
        <Image source={require("../assets/entry-image.png")} className="mt-20 w-[400px] h-[400px] object-contain" />
      </View>
    </SafeAreaView>
  )
}

export default EntryScreen