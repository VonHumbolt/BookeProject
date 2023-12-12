import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ProgressBar from "react-native-progress/Bar";
import { PlusCircleIcon } from "react-native-heroicons/solid";

const ReadingChallenge = ({ challenges, userId, navigation }) => {
  return (
    <View className="my-6">
      <Text className="mx-6 mb-2 text-lg font-semibold text-[#3D405B]">
        Reading Challenges
      </Text>
      {challenges?.length > 0 ? (
        challenges?.map((challenge) => (
          <TouchableOpacity
            key={challenge?.challengeId}
            className="px-6 pt-3 pb-1 bg-white flex-row"
            onPress={() =>
              navigation.navigate("Book", {
                name: "2023 Reading Challenge",
                books: challenge?.books,
              })
            }
          >
            <Image
              source={{
                uri:
                  challenge?.books?.length > 0
                    ? challenge?.books[challenge.books.length - 1].bookImage
                        .imageUrl
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnFSeIfLviNlTiizgznLZEG-4vmKvvZd7OS0RNseTf3FIzsg-jNR1zKZo7qN8UUwevSnc&usqp=CAU",
              }}
              className="w-24 h-36 rounded-md"
            />
            <View className="w-full">
              <Text className="mx-6 mt-3 text-[#3D405B] text-base font-bold">
                2023 Reading Challenge
              </Text>
              <View className="mx-6 mt-4 flex-row items-center space-x-2">
                <ProgressBar
                  progress={
                    challenge?.read > 0
                      ? challenge?.read / challenge?.target
                      : 0
                  }
                  color="#81B29A"
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  width={150}
                  height={10}
                />
                <Text className="font-extrabold text-[#81B29A]">{`${challenge?.read}/${challenge?.target}`}</Text>
              </View>
              <View className="mt-4 w-full border border-[#DADADA]" />
              <View className="flex-row px-6 mt-4 items-center space-x-4">
                <Text className="text-base text-[#3D405B] font-semibold">
                  Read:{" "}
                  <Text className="text-[#81B29A]">{challenge?.read}</Text>
                </Text>
                <Text className="text-base text-[#3D405B] font-semibold">
                  Left:{" "}
                  <Text className="text-[#81B29A]">{challenge?.left}</Text>
                </Text>
                <Text className="text-base text-[#3D405B] font-semibold">
                  Target:{" "}
                  <Text className="text-[#81B29A]">{challenge?.target}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="px-6 py-3 bg-white items-center">
          <Text className="mt-3 text-[#3D405B] text-base font-bold">Start</Text>
          <Text className="text-[#3D405B] text-base font-bold">
            New Reading Challenge
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("StartChallenge", {userId: userId})}> 
            <PlusCircleIcon size={40} color="#81B29A" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReadingChallenge;
