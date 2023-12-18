import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import convertDate from "../utils/dateConverter/convertDate";
import { useNavigation } from "@react-navigation/native";

const BookReview = ({ reviews }) => {
  const navigation = useNavigation();
  return (
    <View className="bg-white">
      {/* Reviews */}
      {reviews?.length > 0 &&
        reviews?.map((review) => (
          <View key={review?.reviewId} className="mt-2 px-5 py-3 bg-white">
            {/* User and star */}
            <TouchableOpacity
              className="flex-row items-center space-x-2"
              onPress={() =>
                navigation.navigate("ReaderProfile", {
                  readerId: review?.userId,
                })
              }
            >
              <Text className="text-[#3D405B] font-medium">
                {review?.fullName}
              </Text>
              <View className="flex-row">
                {Array.from(Array(review?.star).keys()).map((index) => (
                  <StarIcon key={index} size={20} color={"#81B29A"} />
                ))}
              </View>
            </TouchableOpacity>

            {/* Date */}
            <Text className="mt-1 text-gray-500">
              {convertDate(review?.publishedDate)}
            </Text>

            {/* Review */}
            {review?.description && (
              <Text className="my-3 px-4 text-[#3D405B]">
                {review?.description}
              </Text>
            )}

            <View className="w-20 mt-3 mx-auto border border-[#DBDBDB]" />
          </View>
        ))}
    </View>
  );
};

export default BookReview;
