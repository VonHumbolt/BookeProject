import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StarIcon } from "react-native-heroicons/solid";

const SearchedBook = ({ book }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="py-5 px-8 border-b-2 border-[#DADADA] flex-row space-x-4"
      onPress={() => navigation.navigate("BookDetail", { bookId: book.bookId })}
    >
      <Image
        source={{ uri: book?.bookImage?.imageUrl }}
        className="w-16 h-24 object-contain rounded-md"
      />
      <View className="mx-5">
        <Text className="text-[#3D405B] text-lg font-semibold">
          {book.title}
        </Text>
        <Text className="text-[#3D405B] text-base font-normal">
          {book.author.fullName}
        </Text>
        {/* Rating Mean */}
        <View className="flex-row items-center space-x-1 mt-2">
          <StarIcon size={20} color="#E07A5F" />
          <Text className="text-[#3D405B] text-md font-normal">
            {book.rating.meanOfRating} · {book.publisher} · {book.publishedDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchedBook;
