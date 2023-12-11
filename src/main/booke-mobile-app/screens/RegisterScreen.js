import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AuthService from "../services/AuthService";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

const RegisterScreen = () => {
  const authService = new AuthService();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    register(data);
  };
  const register = (data) => {
      authService
        .register(data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) navigation.navigate("Login");
        });
  };
  return (
    <SafeAreaView className="flex-1 bg-[#E07A5F]">
      <ScrollView automaticallyAdjustKeyboardInsets>
      <View className="p-20 mt-10">
        <View className="flex-row space-x-4">
          <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
            <Text className="text-gray-300 text-xl font-extrabold">
              Sign in
            </Text>
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
            <Controller
              control={control}
              name="fullName"
              rules={{ required: "Full Name is required!" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100} >
                  <TextInput
                    className="rounded-lg p-2 w-full bg-white shadow-lg"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Kaan Kaplan"
                  ></TextInput>
                  {error && (
                    <Text className="text-[#3D405B] pt-1 px-1 font-semibold">
                      {error.message}
                    </Text>
                  )}
                </KeyboardAvoidingView>
              )}
            />
            <Text className="text-white font-medium pt-3 pb-2">Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required!" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100} >
                  <TextInput
                    className="rounded-lg p-2 w-full bg-white shadow-lg"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="example@example.com"
                  ></TextInput>
                  {error && (
                    <Text className="text-[#3D405B] pt-1 px-1 font-semibold">
                      {error.message}
                    </Text>
                  )}
                </KeyboardAvoidingView>
              )}
            />
          <Text className="text-white font-medium pt-3 pb-2">Password</Text>
          <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required!" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100} >
                  <TextInput
                    className="rounded-lg p-2 w-full bg-white shadow-lg"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    placeholder="******"
                  ></TextInput>
                  {error && (
                    <Text className="text-[#3D405B] pt-1 px-1 font-semibold">
                      {error.message}
                    </Text>
                  )}
                </KeyboardAvoidingView>
              )}
            />
            <TouchableOpacity className="flex items-center" onPress={handleSubmit(onSubmit)}>
              <View className="bg-[#3D405B] w-1/2 rounded-lg p-2 mt-10">
                <Text className="text-white text-lg font-semibold text-center">
                  Sign up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default RegisterScreen;
