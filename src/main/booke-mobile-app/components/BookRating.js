import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StarIcon } from "react-native-heroicons/solid";
import ProgressBar from "react-native-progress/Bar";

const BookRating = ({ rating }) => {
    const [mean, setMean] = useState(0)
  useEffect(() => {
    const totalRate =
      rating.oneStarCount * 1 +
      rating.twoStarCount * 2 +
      rating.threeStarCount * 3 +
      rating.fourStarCount * 4 +
      rating.fiveStarCount * 5;

    const totalVote = rating.totalStarCount;
    setMean(totalRate / totalVote);
  }, []);

  return (
    <View className="pt-3 mb-2 bg-[#EEEEEE]">
      <View className="flex-row items-center space-x-2 px-5 py-3 shadow-lg">
        <Text className="text-xl font-semibold text-[#3D405B]">
          Rating & Reviews
        </Text>
        <View className="w-12 h-1 bg-[#E07A5F]" />
      </View>

      <View className="flex shadow-lg bg-white px-5 py-3">
        <View className="flex-row items-center space-x-2">
          <Text className="text-lg">{rating.totalStarCount} Ratings</Text>
          <Text className="text-lg">·</Text>
          <View className="flex-row items-center">
            <StarIcon size={25} color={"#81B29A"} />
            <Text className="text-lg">{mean}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-3">
          {/* Stars */}
          <View className="flex">
            <StarIcon size={25} color={"#81B29A"} />
            <View className="flex-row">
              {Array.from(Array(2).keys()).map((index) => (
                <StarIcon key={index} size={25} color={"#81B29A"} />
              ))}
            </View>
            <View className="flex-row">
              {Array.from(Array(3).keys()).map((index) => (
                <StarIcon key={index} size={25} color={"#81B29A"} />
              ))}
            </View>
            <View className="flex-row">
              {Array.from(Array(4).keys()).map((index) => (
                <StarIcon key={index} size={25} color={"#81B29A"} />
              ))}
            </View>
            <View className="flex-row">
              {Array.from(Array(5).keys()).map((index) => (
                <StarIcon key={index} size={25} color={"#81B29A"} />
              ))}
            </View>
          </View>

          {/* Progress Bars */}
          <View className="flex space-y-4">
            <ProgressBar
              progress={rating.oneStarCount / rating.totalStarCount}
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={150}
              height={10}
            />
            <ProgressBar
              progress={rating.twoStarCount / rating.totalStarCount}
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={150}
              height={10}
            />
            <ProgressBar
              progress={rating.threeStarCount / rating.totalStarCount}
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={150}
              height={10}
            />
            <ProgressBar
              progress={rating.fourStarCount / rating.totalStarCount}
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={150}
              height={10}
            />
            <ProgressBar
              progress={rating.fiveStarCount / rating.totalStarCount}
              color="#E07A5F"
              unfilledColor="#D9D9D9"
              borderWidth={0}
              width={150}
              height={10}
            />
          </View>

          {/* Rating Count */}
          <View className="flex space-y-1">
            <Text className="text-base text-[#3D405B]">{rating.oneStarCount}</Text>
            <Text className="text-base text-[#3D405B]">{rating.twoStarCount}</Text>
            <Text className="text-base text-[#3D405B]">{rating.threeStarCount}</Text>
            <Text className="text-base text-[#3D405B]">{rating.fourStarCount}</Text>
            <Text className="text-base text-[#3D405B]">{rating.fiveStarCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookRating;
