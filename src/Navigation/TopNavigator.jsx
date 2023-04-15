import React from "react";
import { View, StyleSheet, Image } from "react-native";

// navigator
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// screen
import { LoginScreen } from "../screen/LoginScreen";
import { SignUpScreen } from "../screen/SignUpScreen";

const TopTab = createMaterialTopTabNavigator();

export const TopNavigator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Image
          source={require("/Users/takahiro/news-app/my-news/src/image/logo_transparent.png")}
          style={{ width: 300, height: 300, tintColor: "black" }}
        />
      </View>
      <TopTab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#011C26",
          },
        }}
      >
        <TopTab.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "新規登録" }}
        />
        <TopTab.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "ログイン" }}
        />
      </TopTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 300,
    alignItems: "center",
    top: 50,
    backgroundColor: "white",
  },
});
