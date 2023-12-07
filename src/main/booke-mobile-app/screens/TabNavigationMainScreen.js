import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import {
  GlobeEuropeAfricaIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import DiscoverScreen from "./DiscoverScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigationMainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarActiveTintColor: "#E07A5F",
          tabBarIcon: () => <HomeIcon color="#E07A5F" size={30} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          title: "Discover",
          tabBarActiveTintColor: "#E07A5F",
          tabBarIcon: () => <GlobeEuropeAfricaIcon color="#E07A5F" size={30} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarActiveTintColor: "#E07A5F",
          tabBarIcon: () => <UserIcon color="#E07A5F" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationMainScreen;
