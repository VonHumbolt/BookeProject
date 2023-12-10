import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import ReaderService from "../services/ReaderService";

const SearchUserScreen = ({ navigation }) => {
  const readerService = new ReaderService();
  const [name, setName] = useState("");
  const [readers, setReaders] = useState([]);

  const searchReader = (text) => {
    setName(text);
    if (text.trim().length > 1)
      readerService
        .searchReader(text)
        .then((res) => setReaders(res.data.data))
        .catch((error) => console.log(error));
    else setReaders([]);
  };
  return (
    <View className="bg-gray-100">
      <View className="p-8 relative">
        <View className="absolute top-11 pl-10 z-10">
          <MagnifyingGlassIcon size={20} color="#B7B7B7" />
        </View>
        <View className="shadow-xl">
          <TextInput
            className="rounded-xl p-3 px-8 w-full bg-white border border-gray-300"
            placeholder="Search New Users"
            value={name}
            onChangeText={(text) => searchReader(text)}
          />
        </View>
      </View>
      {readers?.length > 0 && (
        <View className="mt-2">
          <Text className="font-semibold text-2xl text-[#3D405B] mx-6 mb-4">
            Search Results
          </Text>
          {readers?.map((reader) => (
            <TouchableOpacity
              key={reader.userId}
              className="flex-row justify-between items-center bg-white px-6 py-3 
            border-b border-[#F2F2F2]"
              onPress={() =>
                navigation.navigate("ReaderProfile", {
                  readerId: reader.userId,
                })
              }
            >
              <View className="flex-row items-center space-x-1">
                <Image
                  source={{ uri: reader?.profileImage.imageUrl }}
                  className="w-10 h-10 rounded-full"
                />
                <Text className="text-lg font-medium">{reader.fullName}</Text>
              </View>
              <ChevronRightIcon size={30} color="#1E1E1E" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <StatusBar style="light" />
    </View>
  );
};

export default SearchUserScreen;
