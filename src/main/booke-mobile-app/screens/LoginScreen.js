import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AuthService from "../services/AuthService";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { Controller, useForm } from "react-hook-form";
import ReaderService from "../services/ReaderService";

const LoginScreen = () => {
  const authService = new AuthService();
  const readerService = new ReaderService();
  const navigation = useNavigation();

  const {control, handleSubmit} = useForm();
  const onSubmit = (data) => {
    login(data)
  }

  const login = (data) => {
      authService
        .login(data)
        .then((res) => {
          if (res.data.success) {
            setUserCredentials(res.data.data);
            navigation.navigate("TabNavigation")
            // readerService.getReaderByEmail(res.data.data.email).then(response => {
            //   if(response.data.success) {
            //     console.log(response.data.data)
            //     SecureStore.setItemAsync("readerId", response.data.data.userId).then(res => 
                  
            //     )
            //   }
            // })
          }
        })
        .catch((error) => console.log(error));
  };
  
  const setUserCredentials = (data) => {
    SecureStore.setItemAsync("token", data.token)
    SecureStore.setItemAsync("refreshToken", data.refreshToken)
    SecureStore.setItemAsync("userId", data.userId)
    SecureStore.setItemAsync("email", data.email)
  }

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
            <Controller 
              control={control}
              name="email"
              rules={{required: "Email is required!"}}
              render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                  <TextInput
                    className="rounded-lg p-2 w-full bg-white shadow-lg"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    placeholder="email@example.com"
                  ></TextInput>
                  {error && <Text className="text-[#3D405B] pt-1 px-1 font-semibold">{error.message}</Text>}
                </>
              )}
            />

            <Text className="text-white font-medium pt-3 pb-2">Password</Text>
            <Controller 
              control={control}
              name="password"
              rules={{required: "Password is required!"}}
              render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                  <TextInput
                    className="rounded-lg p-2 w-full bg-white shadow-lg"
                    secureTextEntry={true}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="*******"
                  ></TextInput>
                  {error && <Text className="text-[#3D405B] pt-1 px-1 font-semibold">{error.message}</Text>}
                </>
              )}
            />
            <View className="w-full justify-end flex-row">
              <Text className="font-medium text-sm pt-3 text-[#3D405B]">
                Forgot Password
              </Text>
            </View>
            <TouchableOpacity className="flex items-center" onPress={handleSubmit(onSubmit)}>
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
