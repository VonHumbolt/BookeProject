import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ReaderService from "../services/ReaderService";
import { ChevronRightIcon, UsersIcon } from "react-native-heroicons/solid";

const FriendsScreen = ({ route, navigation }) => {
  const { readerId, name } = route.params;
  const readerService = new ReaderService();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (name == "Follows")
      readerService.getReaderFollows(readerId).then((res) => {
        if (res.data.success) setFriends(res.data.data);
      });
    else
      readerService.getReaderFollowers(readerId).then((res) => {
        if (res.data.success) setFriends(res.data.data);
      });
  }, []);

  return (
    <ScrollView>
      <View>
        {friends?.map((friend) => (
          <TouchableOpacity
            key={friend.userId}
            className="flex-row justify-between items-center bg-white px-6 py-3 
            border-b border-[#F2F2F2]"
            onPress={() =>
              navigation.navigate("ReaderProfile", {
                readerId: friend.userId,
              })
            }
          >
            <View className="flex-row items-center space-x-1">
              <Image
                source={{ uri: friend?.profileImage.imageUrl }}
                className="w-10 h-10 rounded-full"
              />
              <Text className="text-lg font-medium">{friend.fullName}</Text>
            </View>
            <ChevronRightIcon size={30} color="#1E1E1E" />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        className="mt-20 bg-[#81B29A] mx-auto px-7 py-4 rounded-lg shadow-lg"
        onPress={() => navigation.navigate("SearchUser")}
      >
        <View className="flex-row items-center space-x-2">
          <Text className="text-white font-bold text-base">Find New Users</Text>
          <UsersIcon size={20} color="white" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FriendsScreen;
