import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { BookOpenIcon, StarIcon } from "react-native-heroicons/solid";
import SelectDropdown from "react-native-select-dropdown";
import { CheckIcon } from "react-native-heroicons/outline";
import ReaderService from "../services/ReaderService";
import PostService from "../services/PostService";

const CurrentlyReading = ({
  books,
  reader,
  isUserProfile,
  navigation,
}) => {
  const readerService = new ReaderService();
  const postService = new PostService();
  const options = ["Want To Read", "Read"];

  const changeBookStatusForReader = (item, book) => {
    if (item == "Want To Read") {
      readerService
        .addBookIntoWantToReads(reader.userId, book.bookId)
        .then((res) => {
        });
    }
    
    const postDto = {
      userId: reader?.userId,
      fullName: reader?.fullName,
      profilePictureUrl: reader?.profileImage?.imageUrl,
      activity: item,
      bookId: book?.bookId,
      bookName: book?.title,
      authorName: book?.author?.fullName,
      bookImageUrl: book?.bookImage?.imageUrl,
      rating: book?.rating?.meanOfRating
    }
    postService.createPost(postDto).then(res => {})

    if (item == "Read") {
      readerService.addBookIntoReads(reader.userId, book.bookId).then((res) => {
        if (res.data.success)
          navigation.navigate("Review", { book: book, reader: reader });
      });
    }
  };

  return (
    <View className="pt-3 bg-gray-100 w-screen relative">
      <Text className="px-6 font-semibold text-xl text-[#3D405B]">
        Currently Reading
      </Text>
      <View className="absolute top-9 right-5 items-center justify-center z-20 w-9 h-9 rounded-full bg-[#F2F2F2] shadow-lg border border-gray-300">
        <BookOpenIcon size={30} color={"#3D405B"} />
      </View>
      <ScrollView horizontal>
        {books.map((book) => (
          <ImageBackground
            key={book.bookId}
            source={{ uri: book.bookImage.imageUrl }}
            blurRadius={40}
            className="w-screen h-52 mt-3 flex-row py-5"
          >
            <Image
              source={{ uri: book.bookImage.imageUrl }}
              className="w-24 h-40 my-auto mx-10 rounded-md"
            />
            <View className={`flex ${isUserProfile ? "mt-0" : "mt-5"}`}>
              <Text className="text-white font-bold text-lg w-60">{book.title}</Text>
              <Text className="text-white font-semibold text-base">
                {book.author.fullName}
              </Text>
              <View className="flex-row items-center space-x-1 mt-2">
                <StarIcon size={20} color="#E07A5F" />
                <Text className="text-[#E07A5F] text-base font-semibold">
                  {book.rating.meanOfRating}
                </Text>
              </View>
              {isUserProfile && (
                <View className="mt-4">
                  <SelectDropdown
                    data={options}
                    defaultButtonText={"Currently Reading"}
                    buttonTextStyle={{
                      color: "white",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    buttonStyle={{
                      backgroundColor: "#81B29A",
                      borderRadius: 10,
                      height: 45,
                      width: 200,
                    }}
                    renderDropdownIcon={() => (
                      <CheckIcon size={20} color="white" />
                    )}
                    onSelect={(selectedItem, index) => {
                      changeBookStatusForReader(selectedItem, book);
                    }}
                    dropdownStyle={{ borderRadius: 10 }}
                    rowTextStyle={{ fontSize: 16, fontWeight: "400" }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>
              )}
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </View>
  );
};

export default CurrentlyReading;
