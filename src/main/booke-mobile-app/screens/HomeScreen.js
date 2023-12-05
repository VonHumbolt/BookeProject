import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import BookService from "../services/BookService";
import SearchedBook from "../components/SearchedBook";

const HomeScreen = () => {
  const bookService = new BookService();
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);

  const searchBook = () => {
    if (title.trim().length > 1)
      bookService
        .search(title)
        .then((res) => setBooks(res.data.data))
        .catch((error) => console.log(error));
    else 
      setBooks([])
  };

  return (
    <SafeAreaView className="bg-[#E07A5F]">
      <View className="p-10">
        <TextInput
          className="rounded-xl p-2 w-full bg-white shadow-xl"
          placeholder="Search Book"
          onChangeText={(text) => setTitle(text)}
          value={title}
          onKeyPress={searchBook}
        />
      </View>
      {books.length > 0 && (
        <View className="bg-white">
          {books.map((book) => (
           <SearchedBook key={book.bookId} book={book} />
          ))}
        </View>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default HomeScreen;
