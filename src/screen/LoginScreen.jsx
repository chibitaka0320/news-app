import React from "react";
import { View, Text } from "react-native";

// component
import { Button } from "../component/Button";
// fireabse
import { loginGoogle } from "../lib/firebase";
// icon

export const LoginScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 20,
      }}
    >
      <Button text="Googleでログイン" onPress={loginGoogle} />
      <Button text="Facebookでログイン" />
      <Button text="Twitterでログイン" />
      <Button text="Linkedlnでログイン" />
      <Button text="ビジネスdアカウントでログイン" />
      <Button
        text="メールアドレスでログイン"
        onPress={() => navigation.navigate("loginMail")}
      />
    </View>
  );
};
