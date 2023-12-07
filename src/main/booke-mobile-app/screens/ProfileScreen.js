import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  BookOpenIcon,
  UserGroupIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import CurrentlyReading from "../components/CurrentlyReading";
import CurrentStats from "../components/CurrentStats";
import WantToRead from "../components/WantToRead";
import Read from "../components/Read";
import ReadingChallenge from "../components/ReadingChallenge";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="bg-[#E07A5F] flex-1">
      <View className="py-6 px-8 flex-row items-center">
        <Image
          source={require("../assets/icon.png")}
          className="w-24 h-24 rounded-full"
          width={20}
          height={20}
        />
        <View className="absolute left-6 border-2 border-[#C44536] rounded-full h-[110px] w-[110px]" />
        <View className="flex-1 ">
          <Text className="px-6 text-white text-center font-bold text-2xl">
            Kerem Aydoğan
          </Text>
          <View className="w-full border border-[#C44536] mx-1 my-2" />
          <View className="flex-row items-center pl-3 space-x-3">
            <View className="flex-row items-center">
              <BookOpenIcon size={20} color="white" />
              <Text className="text-white font-medium text-base">Books</Text>
            </View>
            <View className="flex-row items-center">
              <UsersIcon size={20} color="white" />
              <Text className="text-white font-medium text-base">Follows</Text>
            </View>
            <View className="flex-row items-center">
              <UserGroupIcon size={20} color="white" />
              <Text className="text-white font-medium text-base">
                Followers
              </Text>
            </View>
          </View>
        </View>
      </View>
    <ScrollView className="bg-gray-100">
      {/* Currently Reading */}
      <CurrentlyReading />

      {/* Current Stats */}
      <CurrentStats />

      {/* Want To Reads */}
      <WantToRead />

      {/* Reads */}
      <Read />

      {/* Reading Challenges */}
      <ReadingChallenge challenges={[]} />
    </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default ProfileScreen;
