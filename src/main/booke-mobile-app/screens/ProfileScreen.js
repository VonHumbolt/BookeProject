import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import CurrentlyReading from "../components/CurrentlyReading";
import CurrentStats from "../components/CurrentStats";
import WantToRead from "../components/WantToRead";
import Read from "../components/Read";
import ReadingChallenge from "../components/ReadingChallenge";
import ReaderService from "../services/ReaderService";
import * as SecureStore from "expo-secure-store";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const readerService = new ReaderService();
  const [reader, setReader] = useState();

  useEffect(() => {
    SecureStore.getItemAsync("email").then((email) => {
      readerService.getReaderByEmail(email).then((res) => {
        if (res.data.success) setReader(res.data.data);
      });
    });
  }, [isFocused]);

  return (
    <SafeAreaView className="bg-[#E07A5F] flex-1">
      <View className="py-6 px-8 flex-row items-center">
          <View className="absolute left-6 border-2 border-[#C44536] rounded-full h-[110px] w-[110px]" />
        <TouchableOpacity>
          <Image
            source={{ uri: reader?.profileImage.imageUrl }}
            className="w-24 h-24 rounded-full"
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <View className="flex-1 ">
          <Text className="px-6 text-white text-center font-bold text-2xl">
            {reader?.fullName}
          </Text>
          <View className="w-full border border-[#C44536] mx-1 my-2" />
          <View className="flex-row items-center justify-center pl-3 space-x-5">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() =>
                navigation.navigate("Friends", {
                  name: "Follows",
                  readerId: reader.userId,
                })
              }
            >
              {/* <UsersIcon size={20} color="white" /> */}
              <Text className="text-white text-lg font-extrabold mr-1">
                {reader?.followsIdList?.length}
              </Text>
              <Text className="text-white font-medium text-lg">Follows</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() =>
                navigation.navigate("Friends", {
                  name: "Followers",
                  readerId: reader.userId,
                })
              }
            >
              {/* <UserGroupIcon size={20} color="white" /> */}
              <Text className="text-white text-lg font-extrabold mr-1">
                {reader?.followersIdList?.length}
              </Text>
              <Text className="text-white font-medium text-lg">Followers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView className="bg-gray-100">
        {/* Currently Reading */}
        {reader?.currentlyBooks?.length > 0 && (
          <CurrentlyReading
            books={reader?.currentlyBooks}
            reader={reader}
            isUserProfile={true}
            refresh={refresh}
            navigation={navigation}
          />
        )}

        {/* Current Stats */}
        <CurrentStats
          read={reader?.readBooks}
          wantToReads={reader?.wantToReadBooks}
          currentlyBooks={reader?.currentlyBooks}
          navigation={navigation}
        />

        {/* Want To Reads */}
        {reader?.wantToReadBooks?.length > 0 && (
          <WantToRead books={reader?.wantToReadBooks} navigation={navigation} />
        )}

        {/* Reads */}
        {reader?.readBooks?.length > 0 && (
          <Read books={reader?.readBooks} navigation={navigation} />
        )}

        {/* Reading Challenges */}
        <ReadingChallenge
          challenges={
            reader?.readingChallenges?.length > 0
              ? reader?.readingChallenges
              : []
          }
          userId={reader?.userId}
          navigation={navigation}
        />
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default ProfileScreen;
