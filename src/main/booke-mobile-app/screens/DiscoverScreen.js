import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import GenreService from "../services/GenreService";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const DiscoverScreen = () => {
  const genreService = new GenreService();
  useEffect(() => {
    //   genreService.getGenres().then(res => console.log(res.data.data))
    console.log("DiscoverScreen");
  }, []);

  return (
    <SafeAreaView className="bg-[#E07A5F]">
        <ScrollView>
      <View className="px-12 pt-5 pb-10 relative">
        <Image
          source={require("../assets/logo.png")}
          className="w-full object-contain"
          width={200}
          height={400}
        />
        <View
          className="absolute -bottom-10 left-10 rounded-lg bg-gray-50 z-20
            shadow-lg w-full py-5"
        >
          <Text className="text-center font-bold text-2xl text-[#3D405B]">
            Discover 10+ Genres
          </Text>
        </View>
      </View>
      {/* Genres */}
      <View className="mt-1 bg-gray-100 -z-10">
        {/* Map Genres */}
        <View>
          <Text className="px-5 pt-16 pb-6 font-semibold text-lg text-[#3D405B]">
            Science
          </Text>
          {/* <Image source={{uri: }} width={100} height={100}
            className="w-16 h-24" /> */}
        </View>
      </View>

      {/* Follow Users */}
      <View className="bg-gray-100 -z-10">
        <Text className="px-5 pt-10 pb-4 font-semibold text-lg text-[#3D405B]">
          Follow Users
        </Text>
        <View className="px-3 py-3 flex-row items-center bg-white shadow-lg">
          <Image
            source={require("../assets/discover-image2.png")}
            width={100}
            height={100}
            className="w-56 h-44 object-contains"
          />

          <View className="flex items-center flex-1">
            <Text className="font-extrabold text-xl text-[#E07A5F]">1000+</Text>
            <Text className="font-bold text-xl text-center text-[#3D405B]">
              People use BookE
            </Text>
            <TouchableOpacity className="flex-row items-center mt-3 mr-2">
              <MagnifyingGlassIcon size={18} color={"#3D405B"} />
              <Text className="font-semibold text-base text-center text-[#3D405B] underline decoration-[#E07A5F]">
                Search Friends
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default DiscoverScreen;
