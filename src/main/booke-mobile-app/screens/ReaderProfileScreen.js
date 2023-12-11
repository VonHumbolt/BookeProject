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
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const ReaderProfileScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const readerService = new ReaderService();

  const { readerId } = route.params;
  const [reader, setReader] = useState();
  const [userId, setUserId] = useState();
  const [isRefresh, setIsRefresh] = useState(false);
  const [isReaderFollowing, setIsReaderFollowing] = useState(false);

  useEffect(() => {
    readerService.getReaderById(readerId).then((res) => {
      if (res.data.success) {
        const readerData = res.data.data;
        setReader(readerData);
        SecureStore.getItemAsync("email").then((email) => {
          readerService.getReaderByEmail(email).then((res) => {
            setUserId(res.data.data.userId);
            const isFollowing = res.data.data.followsIdList.includes(
              readerData.userId
            );
            setIsReaderFollowing(isFollowing);
          });
        });
      }
    });
  }, [isFocused, isRefresh]);

  const refresh = () => {
    setIsRefresh(!isRefresh);
  };

  const changeFollowStatus = () => {
    if (isReaderFollowing) {
      readerService.unfollow(userId, readerId).then((res) => {
        if (res.data.success) setIsReaderFollowing(!isReaderFollowing);
      });
    } else {
      readerService.follow(userId, readerId).then((res) => {
        if (res.data.success) setIsReaderFollowing(!isReaderFollowing);
      });
    }
  };

  return (
    <SafeAreaView className="bg-[#E07A5F] mb-40">
      <View className="py-6 px-8 flex-row items-center">
        <Image
          source={{ uri: reader?.profileImage.imageUrl }}
          className="w-24 h-24 rounded-full"
          width={20}
          height={20}
        />
        <View className="absolute top-4 left-6 border-2 border-[#C44536] rounded-full h-[110px] w-[110px]" />
        <View className="flex-1">
          <Text className="px-6 text-white text-center font-bold text-2xl">
            {reader?.fullName}
          </Text>
          <View className="w-full border border-[#C44536] mx-1 my-2" />
          <View className="flex-row items-center justify-center pl-3 space-x-5">
            <TouchableOpacity
              className="flex items-center"
              onPress={() =>
                navigation.navigate("Friends", {
                  name: "Follows",
                  readerId: readerId,
                })
              }
            >
              {/* <UsersIcon size={20} color="white" /> */}
              <Text className="text-white font-medium text-lg">{reader?.followsIdList?.length} Follows</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center"
              onPress={() =>
                navigation.navigate("Friends", {
                  name: "Followers",
                  readerId: readerId,
                })
              }
            >
              {/* <UserGroupIcon size={20} color="white" /> */}
              <Text className="text-white font-medium text-lg">{reader?.followersIdList?.length} Followers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-evenly pb-4">
        <View></View>
        {isReaderFollowing ? (
          <TouchableOpacity
            className="bg-[#3D405B] py-1 px-8 rounded-lg shadow-lg"
            onPress={changeFollowStatus}
          >
            <View className="flex-row items-center space-x-1">
              <Text className="text-white font-medium text-lg">Following</Text>
              {/* <CheckIcon size={20} color="white" className="text-end" /> */}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-[#81B29A] px-8 rounded-lg shadow-lg"
            onPress={changeFollowStatus}
          >
            <Text className="text-white font-medium text-lg">Follow</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView className="bg-gray-100">
        {/* Currently Reading */}
        {reader?.currentlyBooks?.length > 0 && (
          <CurrentlyReading
            books={reader?.currentlyBooks}
            reader={reader}
            isUserProfile={false}
            refresh={refresh}
            navigation={navigation}
          />
        )}

        {/* Current Stats */}
        <CurrentStats
          read={reader?.readBooks}
          wantToReads={reader?.wantToReadBooks}
          currentlyBooks={reader?.currentlyBooks}
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
        {reader?.readingChallenges?.length > 0 && (
          <ReadingChallenge
            challenges={reader?.readingChallenges}
            userId={reader?.userId}
            navigation={navigation}
          />
        )}
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default ReaderProfileScreen;
