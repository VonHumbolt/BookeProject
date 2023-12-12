import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import CurrentlyReading from "../components/CurrentlyReading";
import CurrentStats from "../components/CurrentStats";
import WantToRead from "../components/WantToRead";
import Read from "../components/Read";
import ReadingChallenge from "../components/ReadingChallenge";
import ReaderService from "../services/ReaderService";
import * as SecureStore from "expo-secure-store";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const readerService = new ReaderService();
  const [reader, setReader] = useState();
  const [image, setImage] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync("email").then((email) => {
      readerService.getReaderByEmail(email).then((res) => {
        if (res.data.success) setReader(res.data.data);
      });
    });
  }, [isFocused]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1      
    });

    console.log(result);
  
    if (!result.canceled) {
      uploadImage(result)
    }

  };

  const uploadImage = async (imageResult) => {
    const image = await resizeImage(imageResult.assets[0]);
    const filename = image.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append("image",  { uri: image.uri, name: filename, type });
    readerService.updateProfileImage(reader?.userId, formData).then(res => {
      if(res.data.success)
        setImage(image.uri)
    })
  }

  const resizeImage = async (image) => {
    const width = image.width
    const height = image.height
    const ratio = width / height;
    const resizedImage = await ImageManipulator.manipulateAsync(image.uri, [{ resize: { width: 640, height: 640 / ratio } }], { compress: 0.5 });
    return resizedImage;
  }

  return (
    <SafeAreaView className="bg-[#E07A5F] flex-1">
      <View className="py-6 px-8 flex-row items-center">
          <View className="absolute left-[25px] border-2 border-[#C44536] rounded-full h-[110px] w-[110px]" />
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: image ? image : reader?.profileImage.imageUrl }}
            className="w-24 h-24 rounded-full"
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <View className="flex-1 ">
          <Text className="px-6 text-white text-center font-bold text-2xl">
            {reader?.fullName}
          </Text>
          <View className="w-full border border-[#C44536] mx-[5px] my-2" />
          <View className="flex-row items-center justify-center pl-3 space-x-5">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() =>
                navigation.navigate("Friends", {
                  name: "Follows",
                  readerId: reader.userId,
                })
              }
            >
              {/* <UsersIcon size={20} color="white" /> */}
              <Text className="text-white text-lg font-extrabold mr-1">
                {reader?.followsIdList?.length}
              </Text>
              <Text className="text-white font-medium text-lg">Follows</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() =>
                navigation.navigate("Friends", {
                  name: "Followers",
                  readerId: reader.userId,
                })
              }
            >
              {/* <UserGroupIcon size={20} color="white" /> */}
              <Text className="text-white text-lg font-extrabold mr-1">
                {reader?.followersIdList?.length}
              </Text>
              <Text className="text-white font-medium text-lg">Followers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView className="bg-gray-100">
        {/* Currently Reading */}
        {reader?.currentlyBooks?.length > 0 && (
          <CurrentlyReading
            books={reader?.currentlyBooks}
            reader={reader}
            isUserProfile={true}
            navigation={navigation}
          />
        )}

        {/* Current Stats */}
        <CurrentStats
          read={reader?.readBooks}
          wantToReads={reader?.wantToReadBooks}
          currentlyBooks={reader?.currentlyBooks}
          navigation={navigation}
        />

        {/* Want To Reads */}
        {reader?.wantToReadBooks?.length > 0 && (
          <WantToRead books={reader?.wantToReadBooks} navigation={navigation} />
        )}

        {/* Reads */}
        {reader?.readBooks?.length > 0 && (
          <Read books={reader?.readBooks} navigation={navigation} />
        )}

        {/* Reading Challenges */}
        <ReadingChallenge
          challenges={
            reader?.readingChallenges?.length > 0
              ? reader?.readingChallenges
              : []
          }
          userId={reader?.userId}
          navigation={navigation}
        />
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default ProfileScreen;
