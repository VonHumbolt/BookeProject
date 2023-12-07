import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import SelectDropdown from "react-native-select-dropdown";
import { CheckIcon } from "react-native-heroicons/outline";

const CurrentlyReading = ({ readingList }) => {
  const options = ["Want To Read", "Currently Reading", "Read"];

  return (
    <View className="pt-3 bg-gray-100 w-screen">
      <Text className="px-6 font-semibold text-xl text-[#3D405B]">
        Currently Reading
      </Text>
      <ScrollView horizontal>
        <ImageBackground
          source={require("../assets/discover-image.png")}
          blurRadius={40}
          className="w-screen h-52 mt-3 flex-row py-5"
        >
          <Image
            source={require("../assets/discover-image.png")}
            className="w-24 h-52 mx-10"
          />
          <View className="flex">
            <Text className="text-white font-bold text-lg">
              Gece Yarısı Kütüphanesi
            </Text>
            <Text className="text-white font-semibold text-base">
              Matt Haig
            </Text>
            <View className="flex-row items-center space-x-1 mt-2">
              <StarIcon size={20} color="#E07A5F" />
              <Text className="text-[#E07A5F] text-base font-semibold">
                4.5
              </Text>
            </View>
            <View className="mt-4 mx-auto">
              <SelectDropdown
                data={options}
                defaultValue={"Currently Reading"}
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
                renderDropdownIcon={() => <CheckIcon size={20} color="white" />}
                onSelect={(selectedItem, index) => {}}
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
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default CurrentlyReading;
