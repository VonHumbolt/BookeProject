import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import { HomeIcon } from "react-native-heroicons/solid";

const Tab = createBottomTabNavigator();

const TabNavigationMainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
            title: "Home Page",
            tabBarActiveTintColor: "#E07A5F",
            tabBarIcon: () => (
                <HomeIcon color="#E07A5F" size={30} />
            )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationMainScreen;
