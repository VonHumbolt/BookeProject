import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import BookFeature from "../components/BookFeature";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  return (
    <View className="h-screen">
      {/* Image */}
      <View className="h-1/2 bg-red-400">
        <ImageBackground
          source={{ uri: book.bookImage.imageUrl }}
          blurRadius={30}
          className="w-full h-full flex items-center"
        >
          <Image
            source={{ uri: book.bookImage.imageUrl }}
            className="w-32 object-contain mt-20"
            width={100}
            height={200}
          />
          <Text className="text-white text-3xl font-bold px-10 text-center pt-4">
            {book.title}
          </Text>
          <Text className="text-white text-xl font-semibold px-10 text-center pt-2">
            {book.author.fullName}
          </Text>
          <TouchableOpacity>
            <View className="mt-4 py-3 px-10 mx-auto bg-[#81B29A] rounded-lg flex-row items-center space-x-1">
              <Text className="text-white font-semibold">Want To Read</Text>
              <ChevronDownIcon
                size={20}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <ScrollView>

      {/* Book Features Component  */}
      <BookFeature
        pageNumber={book.pageNumber}
        publishedDate={book.publishedDate}
        publisher={book.publisher}
        genres={book.genres}
        description={book.description}
      />

      {/* Reating & Reviews */}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

export default BookDetailScreen;
