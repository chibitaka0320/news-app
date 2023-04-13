import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { UserScreen } from "../screen/UserScreen";
import { KeepingScreen } from "../screen/KeepingScreen";
import { TabNavigator } from "./TabNavigator";
import { UserContext } from "../context/UserContext";

const Drawer = createDrawerNavigator();

const DrawerContentScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.drawerContent}>
      <View style={styles.menuHeader}>
        <Image source={{ uri: user.Image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.menuHeaderTitle}>{user.name}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {/* ニュース */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.navigate("News");
          }}
        >
          <Ionicons name="newspaper-outline" size={25} />
          <Text style={styles.text}>にゅーす</Text>
        </TouchableOpacity>

        {/* ユーザ設定 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.navigate("User");
          }}
        >
          <Ionicons name="person-outline" size={25} />
          <Text style={styles.text}>アカウント設定</Text>
        </TouchableOpacity>

        {/* 保存 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.navigate("Keep");
          }}
        >
          <Ionicons name="attach-outline" size={25} />
          <Text style={styles.text}>保存</Text>
        </TouchableOpacity>

        {/* ログアウト */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            setUser();
            navigation.navigate("MainTop");
          }}
        >
          <Ionicons name="log-out-outline" size={25} />
          <Text style={styles.text}>ログアウト</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentScreen {...props} />}
      screenOptions={{ headerStyle: styles.header, headerTintColor: "white" }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerTitle: () => (
            <Image
              source={require("../image/logo_transparent.png")}
              style={{ width: 200, height: 90 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="Keep" component={KeepingScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  menuHeader: {
    height: 80,
    alignItems: "center",
    borderBottomWidth: 0.4,
    flexDirection: "row",
  },
  menuHeaderTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  drawerContent: {
    height: "100%",
  },
  menuContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 10,
  },
  menuButton: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 15,
    fontSize: 16,
  },
});
