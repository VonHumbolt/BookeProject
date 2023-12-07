import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProgressBar from "react-native-progress/Bar";
import { ChevronRightIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const ReadingChallenge = ({ challenges }) => {
  return (
    <View className="my-6">
      <Text className="mx-6 mb-2 text-lg font-semibold text-[#3D405B]">
        Reading Challenges
      </Text>
      {challenges.length > 0 ? (
        <View className="px-6 pt-3 pb-1 bg-white flex-row">
          <Image
            source={require("../assets/discover-image.png")}
            className="w-24 h-36"
          />
          <View className="mx-6">
            <Text className="mt-3 text-[#3D405B] text-base font-bold">
              2023 Reading Challenge
            </Text>
            <View className="mt-4 flex-row items-center space-x-2">
              <ProgressBar
                progress={0.6}
                color="#81B29A"
                unfilledColor="#D9D9D9"
                borderWidth={0}
                width={150}
                height={10}
              />
              <Text className="font-extrabold text-[#81B29A]">20/32</Text>
            </View>
            <TouchableOpacity className="mt-6 flex-row justify-end">
              <Text className="text-[#3D405B] underline">See All Books</Text>
              <ChevronRightIcon size={16} color={"#3D405B"} />
            </TouchableOpacity>
            {/* <View className="w-full border border-[#DADADA]" />
                <View className="flex-row px-6 items-center justify-between">
                    <Text>Read: 20</Text>
                    <Text>Left: 12</Text>
                    <Text>Target: 32</Text>
                </View> */}
          </View>
        </View>
      ) : (
        <View className="px-6 py-3 bg-white items-center">
          <Text className="mt-3 text-[#3D405B] text-base font-bold">
            Start
          </Text>
          <Text className="text-[#3D405B] text-base font-bold">
            New Reading Challenge
          </Text>
          <PlusCircleIcon size={40} color="#81B29A" />
        </View>
      )}
    </View>
  );
};

export default ReadingChallenge;
