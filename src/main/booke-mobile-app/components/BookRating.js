import { View, Text } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import ProgressBar from "react-native-progress/Bar";

const BookRating = ({ rating }) => {
  return (
    <View className="pt-3 mb-2 bg-[#EEEEEE]">
      <View className="flex-row items-center space-x-2 px-5 py-3">
        <Text className="text-xl font-semibold text-[#3D405B]">
          Rating & Reviews
        </Text>
        <View className="w-12 h-1 bg-[#E07A5F]" />
      </View>

      <View className="flex shadow-lg bg-white px-5 py-3">
        <View className="flex-row items-center space-x-2">
          <Text className="text-lg">{rating?.totalStarCount} Ratings</Text>
          <Text className="text-lg">·</Text>
          <View className="flex-row items-center">
            <StarIcon size={25} color={"#81B29A"} />
            <Text className="text-lg">{rating?.meanOfRating}</Text>
          </View>
        </View>

        <View className="flex-row items-center mx-auto space-x-6 mt-3">
          {/* Stars */}
          <View className="flex space-y-[6px]">
            <View className="flex-row items-center space-x-1">
              <Text className="text-center text-gray-600">5</Text>
              <StarIcon size={20} color={"#E07A5F"} />
            </View>
            <View className="flex-row items-center space-x-1">
              <Text className="text-center text-gray-600">4</Text>
              <StarIcon size={20} color={"#E07A5F"} />
            </View>
            <View className="flex-row items-center space-x-1">
              <Text className="text-center text-gray-600">3</Text>
              <StarIcon size={20} color={"#E07A5F"} />
            </View>
            <View className="flex-row items-center space-x-1">
              <Text className="text-center text-gray-600">2</Text>
              <StarIcon size={20} color={"#E07A5F"} />
            </View>
            <View className="flex-row items-center space-x-1">
              <Text className="text-center text-gray-600">1</Text>
              <StarIcon size={20} color={"#E07A5F"} />
            </View>
          </View>

          {/* Progress Bar */}
          <View className="flex space-y-4">
            <ProgressBar
              progress={
                rating?.fiveStarCount > 0
                  ? rating?.fiveStarCount / rating?.totalStarCount
                  : 0
              }
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={250}
              height={10}
            />
            <ProgressBar
              progress={
                rating?.fourStarCount > 0
                  ? rating?.fourStarCount / rating?.totalStarCount
                  : 0
              }
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={250}
              height={10}
            />
            <ProgressBar
              progress={
                rating?.threeStarCount > 0
                  ? rating?.threeStarCount / rating?.totalStarCount
                  : 0
              }
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={250}
              height={10}
            />
            <ProgressBar
              progress={
                rating?.oneStarCount > 0
                  ? rating?.oneStarCount / rating?.totalStarCount
                  : 0
              }
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={250}
              height={10}
            />
            <ProgressBar
              progress={
                rating?.twoStarCount > 0
                  ? rating?.twoStarCount / rating?.totalStarCount
                  : 0
              }
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={250}
              height={10}
            />
          </View>

          {/* Rating Count */}
          <View className="flex space-y-[6px]">
            <Text className="text-sm text-[#3D405B]">
              {rating?.fiveStarCount}
            </Text>
            <Text className="text-sm text-[#3D405B]">
              {rating?.fourStarCount}
            </Text>
            <Text className="text-sm text-[#3D405B]">
              {rating?.threeStarCount}
            </Text>
            <Text className="text-sm text-[#3D405B]">
              {rating?.twoStarCount}
            </Text>
            <Text className="text-sm text-[#3D405B]">
              {rating?.oneStarCount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookRating;
