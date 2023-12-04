import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AuthService from "../services/AuthService";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authService = new AuthService();
  const register = () => {
    // TODO: register metodunu tamamla
    if (email.trim().length > 5 && password.trim().length > 0) {
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#E07A5F]">
      <View className="p-20 mt-10">
        <View className="flex-row space-x-4">
          <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
            <Text className="text-gray-300 text-xl font-extrabold">Sign in</Text>
          </TouchableOpacity>
          <View className="p-1 border-b-4 border-[#3D405B]">
            <Text className="text-white text-xl font-extrabold">Sign up</Text>
          </View>
        </View>

        <View className="mt-14">
          <Text className="text-white font-bold text-2xl">Welcome</Text>
          <Text className="text-[#3D405B] font-bold text-2xl">
            Create you account
          </Text>
          <View className="mt-10">
            <Text className="text-white font-medium pb-2">Full Name</Text>
            <TextInput
              className="rounded-lg p-2 w-full bg-white shadow-lg"
              onChangeText={(text) => setFullname(text)}
              value={fullname}
            ></TextInput>
            <Text className="text-white font-medium pt-3 pb-2">Email</Text>
            <TextInput
              className="rounded-lg p-2 w-full bg-white shadow-lg"
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              value={email}
            ></TextInput>
            <Text className="text-white font-medium pt-3 pb-2">Password</Text>
            <TextInput
              className="rounded-lg p-2 w-full bg-white shadow-lg"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            ></TextInput>
            <TouchableOpacity className="flex items-center" onPress={register}>
              <View className="bg-[#3D405B] w-1/2 rounded-lg p-2 mt-10">
                <Text className="text-white text-lg font-semibold text-center">
                  Sign up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default RegisterScreen;
