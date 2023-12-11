import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

const BookScreen = ({ route, navigation }) => {
  const { books } = route.params;
  return (
    <ScrollView>
      <View>
        {books?.map((book) => (
          <TouchableOpacity
            key={book.bookId}
            className="flex-row justify-between items-center bg-white px-8 py-3 
                border-b border-[#3D405B]/20"
            onPress={() =>
              navigation.navigate("BookDetail", {
                bookId: book.bookId,
              })
            }
          >
            <View className="flex-row">
              <Image
                source={{ uri: book.bookImage.imageUrl }}
                className="w-24 h-40 rounded-md"
              />
              <View className="flex mt-5 mx-8 w-60">
                <Text className="text-xl font-semibold">{book.title}</Text>
                <Text className="text-base font-medium mb-4">
                  {book.author?.fullName}
                </Text>
                <View className="flex-row items-center space-x-1">
                  <StarIcon size={20} color="#E07A5F" />
                  <Text className="text-base font-medium">
                    {book.rating?.meanOfRating}
                  </Text>
                  <Text className="text-base font-medium">
                    ·{" "}
                    {book.reviews?.length > 1
                      ? `${book.reviews?.length} Reviews`
                      : `${book.reviews?.length} Review`}{" "}
                    · {book.publishedDate}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default BookScreen;
