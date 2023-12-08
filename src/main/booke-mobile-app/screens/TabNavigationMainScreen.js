import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import {
  GlobeEuropeAfricaIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import {
  GlobeEuropeAfricaIcon as Globe,
  HomeIcon as Home,
  UserIcon as User,
} from "react-native-heroicons/outline";
import DiscoverScreen from "./DiscoverScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigationMainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIcon color="#E07A5F" size={30} />
            ) : (
              <Home color="#E07A5F" size={30} />
            ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <GlobeEuropeAfricaIcon color="#E07A5F" size={30} />
            ) : (
              <Globe color="#E07A5F" size={30} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <UserIcon color="#E07A5F" size={30} />
            ) : (
              <User color="#E07A5F" size={30} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationMainScreen;
