import { View, Text } from "react-native";
import React from "react";

const BookFeature = ({
  pageNumber,
  publishedDate,
  publisher,
  genres,
  description,
}) => {
  return (
    <View className="bg-[#EEEEEE]">
      <View className="flex-row items-center space-x-2 px-5 py-3">
        <Text className="text-xl font-semibold text-[#3D405B]">Features</Text>
        <View className="w-12 h-1 bg-[#E07A5F]" />
      </View>

      <View className="flex space-y-2 shadow-lg bg-white px-5 py-3">
        <Text className="font-semibold text-[#3D405B]">
          Page Size: <Text className="font-normal">{pageNumber}</Text>
        </Text>
        <Text className="font-semibold text-[#3D405B]">
          First Published Date:{" "}
          <Text className="font-normal">{publishedDate}</Text>
        </Text>
        <Text className="font-semibold text-[#3D405B]">
          Publisher: <Text className="font-normal">{publisher}</Text>
        </Text>
        <View className="flex-row items-center mb-2">
            <Text className="font-semibold mr-1 text-[#3D405B]">Genre:</Text>
            {genres?.map(genre => (
                <View key={genre} className="px-2 py-[px] border rounded-md border-[#81B29A] mx-[1px]">
                    <Text className="text-[#81B29A] text-xs">{genre}</Text>
                </View>
            ))}
        </View>
        <View className="w-12 mx-auto border border-[#DBDBDB] mb-2" />
        <Text className="text-[#3D405B]">{description}</Text>
      </View>
    </View>
  );
};

export default BookFeature;
