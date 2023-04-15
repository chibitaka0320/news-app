import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

// firebase
import { getUser, updateUser, uploadImage } from "../lib/firebase";
// context
import { UserContext } from "../context/UserContext";
// imagePicker
import * as ImagePicker from "expo-image-picker";
// component
import { Button } from "../component/Button";
import { Loading } from "../component/Loading";

export const UserScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [imageUri, setImageUri] = useState(user?.Image ?? "");
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? "");
  const [loading, setLoading] = useState(false);

  const setImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const imageUrl = result.assets[0].uri;
      setImageUri(imageUrl);
      const ext = imageUrl.split(".").pop();
      const storagePath = `UserImage/${user.id}.${ext}`;
      const downloadUrl = await uploadImage(imageUrl, storagePath);
      console.log(downloadUrl);
      const updateInfo = {
        Image: downloadUrl,
      };
      await updateUser(user.id, updateInfo);
      console.log("finish");
    }
  };

  const { showActionSheetWithOptions } = useActionSheet();

  const selectImage = () => {
    const options = ["フォトライブラリから選択", "カメラ撮影", "キャンセル"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            setImage();
            break;

          case 1:
            // Delete
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const onPress = async () => {
    setLoading(true);
    try {
      const updateInfo = {
        name: name,
        email: email,
        phone: phone,
        birthDate: birthDate,
      };
      await updateUser(user.id, updateInfo);
      const updatedUser = await getUser(user.id);
      setUser(updatedUser);
      Alert.alert("完了", "ユーザー情報を更新しました", [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("エラー", "ユーザー情報の更新に失敗しました", [
        {
          text: "OK",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>名前</Text>
          <TextInput style={styles.info} onChangeText={(text) => setName(text)}>
            {user.name}
          </TextInput>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>メール</Text>
          <TextInput
            style={styles.info}
            onChangeText={(text) => setEmail(text)}
          >
            {user.email}
          </TextInput>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>電話番号</Text>
          <TextInput
            style={styles.info}
            onChangeText={(text) => setPhone(text)}
          >
            {user.phone}
          </TextInput>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>生年月日</Text>
          <TextInput
            style={styles.info}
            onChangeText={(text) => setBirthDate(text)}
          >
            {user.birthDate}
          </TextInput>
        </View>
        <View style={styles.button}>
          <Button text="保存" onPress={onPress} />
        </View>
      </View>
      <Loading visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  imageContainer: {
    marginTop: 20,
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.4,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  title: {
    // fontWeight: "bold",
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    borderBottomWidth: 0.4,
    width: 300,
    textAlign: "right",
    padding: 8,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  button: {
    marginTop: 50,
  },
});
