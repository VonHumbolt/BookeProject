import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CurrentStats = ({ read, wantToReads, currentlyBooks }) => {
  const navigation = useNavigation()
  return (
    <View className="p-6 bg-white shadow-lg">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          className="items-center px-5"
          onPress={() =>
            navigation.navigate("Book", {
              name: "Read Books",
              books: read,
            })
          }
        >
          <Text className="text-[#3D405B] text-lg font-semibold">Read</Text>
          <Text className="text-[#3D405B] text-xl font-bold">
            {read?.length}
          </Text>
        </TouchableOpacity>
        <View className="h-6 border border-[#E07A5F]" />
        <TouchableOpacity
          className="items-center px-5"
          onPress={() =>
            navigation.navigate("Book", {
              name: "Want To Read Books",
              books: wantToReads,
            })
          }
        >
          <Text className="text-[#3D405B] text-lg font-semibold">
            Want To Read
          </Text>
          <Text className="text-[#3D405B] text-xl font-bold">
            {wantToReads?.length}
          </Text>
        </TouchableOpacity>
        <View className="h-6 border border-[#E07A5F]" />
        <TouchableOpacity
          className="items-center px-5"
          onPress={() =>
            navigation.navigate("Book", {
              name: "Currently Readings",
              books: currentlyBooks,
            })
          }
        >
          <Text className="text-[#3D405B] text-lg font-semibold">Current</Text>
          <Text className="text-[#3D405B] text-xl font-bold">
            {currentlyBooks?.length}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CurrentStats;
