import React from "react";
import { View, Text } from "react-native";
import { Button } from "../component/Button";

export const SignUpScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 20,
      }}
    >
      {/* <Button
        text="Googleで登録"
        image="/Users/takahiro/news-app/my-news/src/image/icons8-google.png"
      />
      <Button text="Facebookで登録" />
      <Button text="Twitterで登録" />
      <Button text="Linkedlnで登録" />
      <Button text="ビジネスdアカウントで登録" /> */}
      <Button
        image="/Users/takahiro/news-app/my-news/src/image/icons8-email.png"
        text="メールアドレスで登録"
        onPress={() => navigation.navigate("signupMail")}
      />
    </View>
  );
};
