import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import ProgressBar from "react-native-progress/Bar";
import {
  PlusCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import ReaderService from "../services/ReaderService";

const ReadingChallenge = ({ challenges, userId, navigation }) => {
  const readerService = new ReaderService();
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState(0);

  const startChallenge = () => {
    if (target > 0) {
      readerService.startReadingChallenge(userId, target).then((res) => {
        if (res.data.success) setIsOpen(false);
      });
    }
  };
  return (
    <View className="my-6">
      <Text className="mx-6 mb-2 text-lg font-semibold text-[#3D405B]">
        Reading Challenges
      </Text>
      {challenges?.length > 0 ? 
        challenges?.map(challenge => (
          <TouchableOpacity className="px-6 pt-3 pb-1 bg-white flex-row"
          onPress={() =>
            navigation.navigate("Book", {
              name: "2023 Reading Challenge",
              books: challenge?.books,
            })
          }>
            <Image
              source={{
                uri:
                  challenge?.books?.length > 0
                    ? challenge?.books[challenge.books.length - 1].bookImage.imageUrl
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
                    challenge?.read > 0 ? challenge?.read / challenge?.target : 0
                  }
                  color="#81B29A"
                  unfilledColor="#D9D9D9"
                  borderWidth={0}
                  width={150}
                  height={10}
                />
                <Text className="font-extrabold text-[#81B29A]">{`${challenge?.read}/${challenge?.target}`}</Text>
              </View>
              {/* <TouchableOpacity className="mt-6 flex-row justify-end">
              <Text className="text-[#3D405B] underline">See All Books</Text>
              <ChevronRightIcon size={16} color={"#3D405B"} />
              </TouchableOpacity> */}
              <View className="mt-4 w-full border border-[#DADADA]" />
              <View className="flex-row px-6 mt-4 items-center space-x-4">
                <Text className="text-base text-[#3D405B] font-semibold">
                  Read: <Text className="text-[#81B29A]">{challenge?.read}</Text>
                </Text>
                <Text className="text-base text-[#3D405B] font-semibold">
                  Left: <Text className="text-[#81B29A]">{challenge?.left}</Text>
                </Text>
                <Text className="text-base text-[#3D405B] font-semibold">
                  Target:{" "}
                  <Text className="text-[#81B29A]">{challenge?.target}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      ) : (
        <View className="px-6 py-3 bg-white items-center">
          <Text className="mt-3 text-[#3D405B] text-base font-bold">Start</Text>
          <Text className="text-[#3D405B] text-base font-bold">
            New Reading Challenge
          </Text>
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <PlusCircleIcon size={40} color="#81B29A" />
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={isOpen} transparent={true}>
        <View className="flex-1 items-center justify-end bg-transparent">
          <View className="bg-white p-8 w-screen h-1/2 rounded-3xl items-center">
            <TouchableOpacity
              className="absolute top-2 right-5"
              onPress={() => setIsOpen(false)}
            >
              <XCircleIcon size={40} color={"#E07A5F"} />
            </TouchableOpacity>
            <Text className="font-bold text-2xl text-[#3D405B]">Start</Text>
            <Text className="font-bold text-2xl text-[#3D405B]">
              {" "}
              New Reading Challenge
            </Text>
            <View className="w-16 my-6 border border-[#E07A5F]" />
            <Text className="font-bold text-xl text-[#3D405B]">
              {new Date().getFullYear()} Reading Challenge
            </Text>
            <Text className="font-semibold text-lg text-[#3D405B] mt-2 px-6 text-center">
              How many books is your target to read?
            </Text>
            <TextInput
              className="mt-2 border border-[#3D405B]/50 w-24 rounded-lg
             text-[#3D405B] pb-2 text-xl text-center"
              keyboardType="number-pad"
              value={target}
              onChangeText={(text) => setTarget(text)}
            />
            <TouchableOpacity
              className="bg-[#81B29A] mx-auto px-6 py-2 rounded-lg mt-6"
              onPress={() => startChallenge()}
            >
              <Text className="font-bold text-white text-base">
                Start Challenge
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReadingChallenge;
