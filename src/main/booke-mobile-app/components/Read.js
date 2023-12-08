import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";

const Read = ({ books, navigation }) => {
  return (
    <View className="bg-gray-100 shadow-lg">
      <Text className="my-6 mb-2 mx-6 text-lg font-semibold text-[#3D405B]">
        Read
      </Text>
      <View className="px-6 py-3 bg-white">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Book", { name: "Read Books", books: books })
          }
        >
          <Text>
            {books.length} {books.length > 1 ? "books" : "book"} · See More{" "}
          </Text>
        </TouchableOpacity>
        <ScrollView horizontal className="space-x-6 my-2">
          {/* Book Images */}
          {books?.slice(0, 5).map((book) => (
            <TouchableOpacity
              key={book.bookId}
              onPress={() =>
                navigation.navigate("BookDetail", { bookId: book.bookId })
              }
            >
              <Image
                source={{ uri: book?.bookImage?.imageUrl }}
                className="w-24 h-40 rounded-md"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Read;
