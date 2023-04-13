import { useEffect, useState, useContext, createContext } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";

// firebase
import { signupUser } from "../lib/firebase";

// component
import { Button } from "../component/Button";

// context
import { UserContext } from "../context/UserContext";
import { Loading } from "../component/Loading";

export const MailSignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("taka.araat34@gmail.com");
  const [pass, setPass] = useState("Ta110320");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const onPress = async () => {
    setLoading(true);
    const userID = await signupUser(email, pass);
    setUser(userID);

    if (userID != null) {
      navigation.navigate("news");
    } else {
      Alert.alert(
        "新規登録エラー",
        "入力いただいたメールアドレスはすでに存在しています。",
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
        <Button text="新規登録" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
