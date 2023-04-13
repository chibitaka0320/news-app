import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { TopNavigator } from "../Navigation/TopNavigator";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "../Navigation/DrawerNavigator";

import { MailSignUpScreen } from "./MailSingUpScreen";
import { MailLoginScreen } from "./MailLoginScreen";
import { WebScreen } from "./WebScreen";

const Stack = createNativeStackNavigator();

export const TopScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="MainTop"
          component={TopNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signupMail"
          component={MailSignUpScreen}
          options={{ title: "新規登録" }}
        />
        <Stack.Screen
          name="loginMail"
          component={MailLoginScreen}
          options={{
            title: "ログイン",
          }}
        />
        <Stack.Screen
          name="news"
          component={DrawerNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="Web" component={WebScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
