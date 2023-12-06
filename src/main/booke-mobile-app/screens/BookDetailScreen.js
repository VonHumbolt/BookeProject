import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BookFeature from "../components/BookFeature";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import BookRating from "../components/BookRating";
import BookReview from "../components/BookReview";
import SelectDropdown from "react-native-select-dropdown";
import * as SecureStore from 'expo-secure-store';
import ReaderService from "../services/ReaderService";
import { CheckIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const BookDetailScreen = ({ route }) => {
  const readerService = new ReaderService();
  const navigation = useNavigation();
  const { book } = route.params;

  const options = ["Want To Read", "Currently Reading", "Read"];

  const [selectedItem, setSelectedItem] = useState();
  const [userId, setUserId] = useState()

  useEffect(() => {
    SecureStore.getItemAsync("userId").then(userId => {
      setUserId(userId);
      readerService.getBookStatusForUser(userId, book.bookId).then(res => {
        if(res.data.data != null)
          setSelectedItem(res.data.data.status)
        
      })
    });
  }, [])

  const changeBookStatusForReader = (item) => {
    navigation.navigate("Review", {book: book})
    // if(selectedItem != "Want To Read" && item == "Want To Read") {
    //   readerService.addBookIntoWantToReads(userId, book.bookId).then(res => {
    //     if(res.data.success)
    //       setSelectedItem(item)
    //   })
    // }

    // if (selectedItem != "Currently Reading" && item == "Currently Reading") {
    //   readerService.addBookIntoCurrentlyReadings(userId, book.bookId).then(res => {
    //     if(res.data.success)
    //       setSelectedItem(item)
    //   })
    // }
   
    // if (selectedItem != "Read" && item == "Read") {
    //   readerService.addBookIntoReads(userId, book.bookId).then(res => {
    //     if(res.data.success)
    //       setSelectedItem(item)
    //   })
    // }
  }
  

  return (
    <View className="h-screen">
      <ScrollView>
        {/* Image */}
        <View className="flex-1">
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
                  {selectedItem == null ? 
                    <ChevronDownIcon size={20} color="white" />
                    : 
                    <CheckIcon size={20} color="white" />
                  }
                  </>
                )}
                onSelect={(selectedItem, index) => {
                  changeBookStatusForReader(selectedItem)
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
          pageNumber={book.pageNumber}
          publishedDate={book.publishedDate}
          publisher={book.publisher}
          genres={book.genres}
          description={book.description}
        />

        {/* Reating */}
        <BookRating rating={book.rating} />

        {/* Reviews */}
        <BookReview reviews={book.reviews} />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

export default BookDetailScreen;
