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
import { StatusBar } from "expo-status-bar";
import BookService from "../services/BookService";

const ReviewModal = ({ route, navigation }) => {
  const { book, reader } = route.params;
  const bookService = new BookService();

  const [starRate, setStarRate] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const submitReview = () => {
    if (starRate != 0) {
      const review = {
        userId: reader.userId,
        fullName: reader.fullName,
        description: reviewText != null ? reviewText : null,
        star: starRate,
      };
      bookService.addReviewToBook(book.bookId, review).then((res) => {
        if (res.data.success) navigation.goBack();
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView className="flex-1 p-5 bg-white">
        <Text className="mt-6 text-3xl font-bold text-[#E07A5F] text-center">
          Congratulations!
        </Text>
        <Text className="text-3xl font-bold text-[#E07A5F] text-center">
          You have read this book
        </Text>
        <Text className="mt-4 text-3xl font-bold text-[#3D405B] text-center">
          {book.title}
        </Text>
        <Text className="text-xl font-bold text-[#3D405B] text-center">
          by {book.author.fullName}
        </Text>

        <View className="w-20 border border-[#E07A5F] mt-5 mx-auto" />
        {/* Rate Section */}
        <View className="mt-4">
          <Text className="text-lg text-center font-semibold">
            Did you like this book?
          </Text>
          <Text className="text-lg text-center font-semibold">Rate now!</Text>
          <View className="flex items-center mt-5">
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(1)}
            >
              <StarIcon
                size={35}
                color={starRate === 1 ? "#E07A5F" : "#81B29A"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(2)}
            >
              {Array.from(Array(2).keys()).map((index) => (
                <StarIcon
                  key={index}
                  size={35}
                  color={starRate === 2 ? "#E07A5F" : "#81B29A"}
                />
              ))}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(3)}
            >
              {Array.from(Array(3).keys()).map((index) => (
                <StarIcon
                  key={index}
                  size={35}
                  color={starRate === 3 ? "#E07A5F" : "#81B29A"}
                />
              ))}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(4)}
            >
              {Array.from(Array(4).keys()).map((index) => (
                <StarIcon
                  key={index}
                  size={35}
                  color={starRate === 4 ? "#E07A5F" : "#81B29A"}
                />
              ))}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setStarRate(5)}
            >
              {Array.from(Array(5).keys()).map((index) => (
                <StarIcon
                  key={index}
                  size={35}
                  color={starRate === 5 ? "#E07A5F" : "#81B29A"}
                />
              ))}
            </TouchableOpacity>
          </View>
        </View>

        {/* Review */}
        <View className="mt-5">
          <Text className="text-lg text-center font-semibold">
            Write Review
          </Text>
          <TextInput
            className="w-full mt-3 px-2 rounded-lg h-36 bg-gray-200"
            multiline={true}
            numberOfLines={22}
            value={reviewText}
            onChangeText={(text) => setReviewText(text)}
            placeholder="Your thinks about book"
          />
          <TouchableOpacity
            className="bg-[#81B29A] mx-auto px-8 py-2 rounded-lg mt-4 active:bg-[#E07A5F]"
            onPress={() => submitReview()}
          >
            <Text className="font-bold text-white text-lg">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default ReviewModal;
