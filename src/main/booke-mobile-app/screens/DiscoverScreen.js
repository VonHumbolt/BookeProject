import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import GenreService from "../services/GenreService";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ChevronRightIcon, StarIcon } from "react-native-heroicons/solid";

const DiscoverScreen = ({ navigation }) => {
  const genreService = new GenreService();
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    genreService.getGenres().then((res) => setGenres(res.data.data));
  }, []);

  return (
    <SafeAreaView className="bg-[#E07A5F] flex-1">
      <ScrollView className="bg-gray-100">
        <View className="pt-5 pb-10 relative bg-[#E07A5F]">
          <Image
            source={require("../assets/logo.png")}
            className="w-80 h-24 mx-auto"
            width={200}
            height={400}
          />
          <View className="px-12">
            <View
              className="absolute -bottom-20 left-10 rounded-lg bg-gray-50 z-20
            shadow-lg w-full py-5"
            >
              <Text className="text-center font-bold text-2xl text-[#3D405B]">
                Discover 10+ Genres
              </Text>
            </View>
          </View>
        </View>

        {/* Follow Users */}
        <View className="bg-gray-50 mt-1 pt-12 -z-20">
          <Text className="px-5 pt-2 pb-4 font-semibold text-lg text-[#3D405B]">
            Follow Users
          </Text>
          <View className="px-3 py-3 flex-row items-center bg-white shadow-lg">
            <Image
              source={require("../assets/discover-image.png")}
              width={100}
              height={100}
              className="w-56 h-44 object-contain"
            />

            <View className="flex items-center flex-1">
              <Text className="font-extrabold text-xl text-[#E07A5F]">
                1000+
              </Text>
              <Text className="font-bold text-xl text-center text-[#3D405B]">
                People use BookE
              </Text>
              <TouchableOpacity
                className="flex-row items-center mt-3 mr-2"
                onPress={() => navigation.navigate("SearchUser")}
              >
                <MagnifyingGlassIcon size={18} color={"#3D405B"} />
                <Text className="font-semibold text-base text-center text-[#3D405B] underline decoration-[#E07A5F]">
                  Search Friends
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Genres */}
        <View className="pt-2 bg-gray-50 -z-10">
          {/* Map Genres */}
          {genres?.length > 0 &&
            genres?.map(
              (genre) =>
                genre?.books?.length > 0 && (
                  <View className="shadow-lg" key={genre?.genreId}>
                    <Text className="px-5 pb-2 mt-1 font-semibold text-lg text-[#3D405B]">
                      {genre.genreName}
                    </Text>
                    <ScrollView
                      horizontal
                      className="bg-white py-3 px-6 space-x-6"
                      contentContainerStyle={{
                        paddingRight: 32,
                      }}
                    >
                      {genre.books.map((book) => (
                        <TouchableOpacity
                          key={book.bookId}
                          onPress={() =>
                            navigation.navigate("BookDetail", {
                              bookId: book.bookId,
                            })
                          }
                        >
                          <Image
                            source={{ uri: book.bookImage.imageUrl }}
                            width={100}
                            height={150}
                            className="w-24 object-contain rounded-md"
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )
            )}
        </View>

        {/* Most Review Book */}
        <View className="bg-gray-50 ">
          <Text className="px-5 pt-2 pb-4 font-semibold text-lg text-[#3D405B]">
            Most Reviewed Book
          </Text>
          <View className="absolute top-9 right-5 items-center justify-center z-20 w-9 h-9 rounded-full bg-[#F2F2F2] shadow-lg border border-gray-300">
            <StarIcon size={30} color={"#81B29A"} />
          </View>
          <View className="px-8 py-3 flex-row items-center bg-white shadow-lg">
            <Image
              source={{
                uri: "http://res.cloudinary.com/dspea8wm4/image/upload/v1702848909/bgyl68lpadokdtnb5mi0.jpg",
              }}
              width={100}
              height={100}
              className="w-24 h-40 rounded-md"
            />
            <View className="flex items-center flex-1">
              <Text className="font-extrabold text-xl text-[#3D405B]">
                100+ persons have reviewed this book
              </Text>
              <TouchableOpacity
                className="flex-row items-center mt-3 mr-2"
                onPress={() =>
                  navigation.navigate("BookDetail", {
                    bookId: "dkC0eYwBSMJn_PLhHg-m",
                  })
                }
              >
                <Text className="font-semibold text-base text-center text-[#3D405B] underline decoration-[#E07A5F]">
                  See Reviews
                </Text>
                <ChevronRightIcon size={18} color={"#3D405B"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default DiscoverScreen;
