import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BookFeature from "../components/BookFeature";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import BookRating from "../components/BookRating";
import BookReview from "../components/BookReview";
import SelectDropdown from "react-native-select-dropdown";
import * as SecureStore from "expo-secure-store";
import ReaderService from "../services/ReaderService";
import { CheckIcon, ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import BookService from "../services/BookService";
import PostService from "../services/PostService";

const BookDetailScreen = ({ route }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { bookId } = route.params;
  const readerService = new ReaderService();
  const bookService = new BookService();
  const postService = new PostService();

  const options = ["Want To Read", "Currently Reading", "Read"];

  const [selectedItem, setSelectedItem] = useState();
  const [userId, setUserId] = useState(0);
  const [reader, setReader] = useState({});
  const [book, setBook] = useState({});

  useEffect(() => {
    bookService.getBookById(bookId).then((res) => setBook(res.data.data));
    SecureStore.getItemAsync("readerId").then((readerId) => {
      setUserId(readerId);
      readerService.getBookStatusForUser(readerId, bookId).then((res) => {
        if (res.data.data != null) {
          setSelectedItem(res.data.data.status);
          setReader(res.data.data.reader);
        }
      });
    });
  }, [isFocused]);

  const changeBookStatusForReader = (item) => {
    if (selectedItem != "Want To Read" && item == "Want To Read") {
      readerService.addBookIntoWantToReads(userId, book.bookId).then((res) => {
        if (res.data.success) setSelectedItem(item);
      });
    }

    if (selectedItem != "Currently Reading" && item == "Currently Reading") {
      readerService
        .addBookIntoCurrentlyReadings(userId, book.bookId)
        .then((res) => {
          if (res.data.success) setSelectedItem(item);
        });
    }

    if (selectedItem != "Read" && item == "Read") {
      readerService.addBookIntoReads(userId, book.bookId).then((res) => {
        if (res.data.success) setSelectedItem(item);
        navigation.navigate("Review", { book: book, reader: reader });
      });
    }
    const postDto = {
      userId: userId,
      fullName: reader?.fullName,
      profilePictureUrl: reader?.profileImage?.imageUrl,
      activity: item,
      bookId: book?.bookId,
      bookName: book?.title,
      authorName: book?.author?.fullName,
      bookImageUrl: book?.bookImage?.imageUrl,
      rating: book?.rating?.meanOfRating,
    };
    postService.createPost(postDto).then((res) => {});
  };

  return (
    <View className="h-screen">
      <ScrollView>
        {/* Image */}
        <View className="flex-1">
          <TouchableOpacity className="absolute top-12 left-5 p-2 bg-[#E07A5F] z-10 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={20} color="white" />
          </TouchableOpacity>
          <ImageBackground
            source={{ uri: book?.bookImage?.imageUrl }}
            blurRadius={30}
            className="w-full h-full flex items-center"
          >
            <Image
              source={{ uri: book?.bookImage?.imageUrl }}
              className="w-32 object-contain mt-20 rounded-md"
              width={100}
              height={200}
            />
            <Text className="text-white text-3xl font-bold px-10 text-center pt-4">
              {book?.title}
            </Text>
            <Text className="text-white text-xl font-semibold px-10 text-center pt-2">
              {book?.author?.fullName}
            </Text>
            <View className="mt-4 mb-6">
              <SelectDropdown
                data={options}
                defaultValue={selectedItem ? selectedItem : "Want To Read"}
                buttonStyle={
                  selectedItem == null
                    ? {
                        backgroundColor: "#81B29A",
                        borderRadius: 10,
                        height: 45,
                        width: 200,
                      }
                    : {
                        backgroundColor: "#E07A5F",
                        borderRadius: 10,
                        height: 45,
                        width: 200,
                      }
                }
                buttonTextStyle={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                renderDropdownIcon={() => (
                  <>
                    {selectedItem == null ? (
                      <ChevronDownIcon size={20} color="white" />
                    ) : (
                      <CheckIcon size={20} color="white" />
                    )}
                  </>
                )}
                onSelect={(selectedItem, index) => {
                  changeBookStatusForReader(selectedItem);
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
          </ImageBackground>
        </View>

        {/* Book Features Component  */}
        <BookFeature
          pageNumber={book?.pageNumber}
          publishedDate={book?.publishedDate}
          publisher={book?.publisher}
          genres={book?.genres}
          description={book?.description}
        />

        {/* Reating */}
        <BookRating rating={book?.rating} />

        {/* Reviews */}
        <BookReview reviews={book?.reviews} />
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
};

export default BookDetailScreen;
