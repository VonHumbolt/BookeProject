import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BookService from "../services/BookService";
import SearchedBook from "../components/SearchedBook";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import ReaderService from "../services/ReaderService";
import * as SecureStore from 'expo-secure-store';
import PostService from "../services/PostService";
import Posts from "../components/Posts";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const readerService = new ReaderService();
  const bookService = new BookService();
  const postService = new PostService();
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reader, setReader] = useState()
  useEffect(() => {
    SecureStore.getItemAsync("email").then(email => {
      readerService.getReaderByEmail(email).then(res => {
        postService.getUserFollowsPost(res.data.data.userId).then(response => {
          if(response.data.success) {
            setPosts(response.data.data)
            setReader(res.data.data)
          }
        })
        SecureStore.setItemAsync("readerId", res.data.data.userId)
      })
    })
  }, [isFocused])

  const searchBook = (text) => {
    setTitle(text)
    if (text.trim().length > 0) {
      bookService
        .search(text)
        .then((res) => setBooks(res.data.data))
        .catch((error) => console.log(error));
    }
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
          autoCapitalize="none"
          onChangeText={(text) => searchBook(text)}
          value={title}
        />
      </View>
      {books?.length > 0 && (
        <View className="bg-white">
          {books.map((book) => (
           <SearchedBook key={book.bookId} book={book} />
          ))}
        </View>
      )}

      {/* Posts */}
      <ScrollView className="bg-gray-100  mb-28">
        <Posts posts={posts} reader={reader} />
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default HomeScreen;
