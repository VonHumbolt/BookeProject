import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StarIcon } from "react-native-heroicons/solid";

const ReviewModal = ({ route }) => {
  const { book } = route.params;
  const [starRate, setStarRate] = useState(0);
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView className="flex-1 p-5 bg-white">
        <Text className="mt-10 text-3xl font-bold text-[#E07A5F] text-center">
          Congratulations!
        </Text>
        <Text className="text-3xl font-bold text-[#E07A5F] text-center">
          You have read this book
        </Text>
        <Text className="mt-10 text-3xl font-bold text-[#3D405B] text-center">
          {book.title}
        </Text>
        <Text className=" text-xl font-bold text-[#3D405B] text-center">
          by {book.author.fullName}
        </Text>

        <View className="w-20 border border-[#E07A5F] mt-8 mx-auto" />
        {/* Rate Section */}
        <View className="mt-6">
          <Text className="text-lg text-center font-semibold">
            Did you like this book?
          </Text>
          <Text className="text-lg text-center font-semibold">Rate now!</Text>
          <View className="flex items-center mt-5">
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(1)}
            >
              {starRate === 1 ? (
                <StarIcon size={35} color={"#E07A5F"} />
              ) : (
                <StarIcon size={35} color={"#81B29A"} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(2)}
            >
              {Array.from(Array(2).keys()).map((index) => (
                <>
                  {starRate === 2 ? (
                    <StarIcon key={index} size={35} color={"#E07A5F"} />
                  ) : (
                    <StarIcon key={index} size={35} color={"#81B29A"} />
                  )}
                </>
              ))}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(3)}
            >
              {Array.from(Array(3).keys()).map((index) => (
                <>
                  {starRate === 3 ? (
                    <StarIcon key={index} size={35} color={"#E07A5F"} />
                  ) : (
                    <StarIcon key={index} size={35} color={"#81B29A"} />
                  )}
                </>
              ))}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(4)}
            >
              {Array.from(Array(4).keys()).map((index) => (
                <>
                  {starRate === 4 ? (
                    <StarIcon key={index} size={35} color={"#E07A5F"} />
                  ) : (
                    <StarIcon key={index} size={35} color={"#81B29A"} />
                  )}
                </>
              ))}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(5)}
            >
              {Array.from(Array(5).keys()).map((index) => (
                <>
                  {starRate === 5 ? (
                    <StarIcon key={index} size={35} color={"#E07A5F"} />
                  ) : (
                    <StarIcon key={index} size={35} color={"#81B29A"} />
                  )}
                </>
              ))}
            </TouchableOpacity>
          </View>
        </View>

        {/* Review */}
        <View className="mt-4">
          <Text className="text-lg text-center font-semibold">
            Write Review
          </Text>
          <TextInput
            className="w-full px-2 rounded-lg h-36 bg-gray-200"
            multiline={true}
            numberOfLines={22}
            placeholder="Your thinks about book"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReviewModal;
