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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authService = new AuthService();
  const login = () => {
    if (email.trim().length > 5 && password.trim().length > 0) {
      authService
        .login({ email: email, password: password })
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#E07A5F]">
      <View className="p-20 mt-10">
        <View className="flex-row space-x-4">
          <View className="p-1 border-b-4 border-[#3D405B]">
            <Text className="text-white text-xl font-extrabold">Sign in</Text>
          </View>
          <TouchableOpacity className="p-1" onPress={() => navigation.navigate("Register")}>
            <Text className="text-gray-300 text-xl font-extrabold">Sign up</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-20">
          <Text className="text-white font-bold text-2xl">Welcome</Text>
          <Text className="text-[#3D405B] font-bold text-2xl">
            Sign in to continue
          </Text>
          <View className="mt-10">
            <Text className="text-white font-medium pb-2">Email</Text>
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
            <View className="w-full justify-end flex-row">
              <Text className="font-medium text-sm pt-3 text-[#3D405B]">
                Forgot Password
              </Text>
            </View>
            <TouchableOpacity className="flex items-center" onPress={login}>
              <View className="bg-[#3D405B] w-1/2 rounded-lg p-2 mt-10">
                <Text className="text-white text-lg font-semibold text-center">
                  Sign in
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

export default LoginScreen;
