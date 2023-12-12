import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { XCircleIcon } from "react-native-heroicons/solid";
import ReaderService from "../services/ReaderService";

const StartChallengeModal = ({ route, navigation }) => {
  const readerService = new ReaderService();
  const { userId } = route.params;
  const [target, setTarget] = useState();

  const startChallenge = () => {
    if (target > 0) {
      readerService.startReadingChallenge(userId, target).then((res) => {
        if (res.data.success) {
          setTimeout(() => navigation.goBack(), 1000);
        }
      });
    }
  };
  return (
    <View className="flex-1 items-center justify-end">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          flex: 1,
          justifyContent: "flex-end",
        }}
        automaticallyAdjustKeyboardInsets
      >
        <View className="bg-white p-8 w-screen h-1/2 rounded-3xl items-center">
          <TouchableOpacity
            className="absolute top-2 right-5"
            onPress={() => navigation.goBack()}
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
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={100}
          >
            <TextInput
              className="mt-2 border border-[#3D405B]/50 w-24 rounded-lg
             text-[#3D405B] pb-2 text-xl text-center"
              keyboardType="number-pad"
              value={target}
              onChangeText={(text) => setTarget(text)}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            className="bg-[#81B29A] mx-auto px-6 py-2 rounded-lg mt-6"
            onPress={() => startChallenge()}
          >
            <Text className="font-bold text-white text-base">
              Start Challenge
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default StartChallengeModal;
