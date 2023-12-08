import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BookService from "../services/BookService";
import SearchedBook from "../components/SearchedBook";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import ReaderService from "../services/ReaderService";
import * as SecureStore from 'expo-secure-store';

const HomeScreen = () => {
  const readerService = new ReaderService();
  const bookService = new BookService();
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    SecureStore.getItemAsync("email").then(email => {
      readerService.getReaderByEmail(email).then(res => {
        SecureStore.setItemAsync("readerId", res.data.data.userId)
      })
    })
  }, [])

  const searchBook = () => {
    if (title.trim().length > 0)
      bookService
        .search(title)
        .then((res) => setBooks(res.data.data))
        .catch((error) => console.log(error));
    else setBooks([]);
  };
  return (
    <SafeAreaView className="bg-[#E07A5F]">
      <View className="p-10 relative">
        <View className="absolute top-12 pl-12 z-10">
          <MagnifyingGlassIcon size={20} className="text-gray-50"/>
        </View>
        <TextInput
          className="rounded-xl p-2 px-8 w-full bg-white shadow-xl"
          placeholder="Search Book"
          onChangeText={(text) => setTitle(text)}
          value={title}
          onKeyPress={searchBook}
        />
      </View>
      {books?.length > 0 && (
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
