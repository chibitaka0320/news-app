import React from "react";

// navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// screen
import { BusinessScreen } from "../screen/BusinessScreen";
import { SportsScreen } from "../screen/SportsScreen";
import { WeatherScreen } from "../screen/WeatherScreen";
import { WebScreen } from "../screen/WebScreen";

// icon
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function TopTabNavigator() {
  return (
    <TopTab.Navigator screenOptions={TopTabOptions}>
      <TopTab.Screen name="Business" component={BusinessScreen} />
      <TopTab.Screen name="Sports" component={SportsScreen} />
    </TopTab.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator screenOptions={BottomTabOptions}>
      <BottomTab.Screen
        name="News"
        component={TopTabNavigator}
        options={BottomNews}
      />
      <BottomTab.Screen
        name="Weather"
        component={WeatherScreen}
        options={BottomWeather}
      />
    </BottomTab.Navigator>
  );
}

export const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Web" component={WebScreen} />
    </Stack.Navigator>
  );
};

const TopTabOptions = {
  tabBarStyle: {
    height: 40,
    justifyContent: "center",
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginTop: -5,
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#011C26",
  },
};

const BottomTabOptions = {
  tabBarStyle: {
    backgroundColor: "#9FBFB9",
  },
  tabBarActiveTintColor: "#011C26",
  tabBarIconStyle: {
    marginTop: 5,
  },
};

const BottomNews = {
  title: "ニュース",
  headerShown: false,
  tabBarIcon: ({ color, size }) => (
    <Entypo name="news" color={color} size={size} />
  ),
};

const BottomWeather = {
  title: "天気予報",
  headerShown: false,
  tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons
      name="weather-partly-rainy"
      color={color}
      size={size}
    />
  ),
};
