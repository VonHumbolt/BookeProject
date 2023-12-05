import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SearchedBook = ({ book }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="py-5 px-6 border-b-2 border-[#DADADA] flex-row space-x-4"
      onPress={() => navigation.navigate("BookDetail", { book: book })}
    >
      <Image
        source={{ uri: book?.bookImage?.imageUrl }}
        className="w-14 h-20 object-contain"
      />
      <View>
        <Text className="text-[#3D405B] text-lg font-semibold">
          {book.title}
        </Text>
        <Text className="text-[#3D405B] text-md font-normal">
          {book.author.fullName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchedBook;
