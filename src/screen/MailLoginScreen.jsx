import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { UserContext } from "../context/UserContext";

// component
import { Button } from "../component/Button";
import { Loading } from "../component/Loading";

// firebase
import { loginUser } from "../lib/firebase";

export const MailLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("taka.araat32@gmail.com");
  const [pass, setPass] = useState("Ta110320");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  // ログインボタン押下
  const onPress = async () => {
    setLoading(true);
    const userID = await loginUser(email, pass);
    setUser(userID);

    if (userID != null) {
      navigation.navigate("news");
    } else {
      Alert.alert(
        "ログインエラー",
        "メールアドレスまたはパスワードが間違っています。正しい情報を入力いただきもう一度お試しください。",
        [
          {
            text: "OK",
          },
        ]
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 15 }}>
        <Text style={styles.text}>メールアドレス</Text>
        <TextInput
          placeholder="メールアドレス"
          style={styles.input}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <Text style={styles.text}>パスワード</Text>
        <TextInput
          placeholder="パスワード"
          style={styles.input}
          onChangeText={(value) => {
            setPass(value);
          }}
        />
        <View style={styles.button}>
          <Button text="ログイン" onPress={onPress} />
        </View>
      </View>
      <Loading visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  text: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginTop: 20,
  },
});
