import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { UserScreen } from "../screen/UserScreen";
import { TabNavigator } from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerContentScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.drawerContent}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuHeaderTitle}>ヘッダー</Text>
      </View>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Button
            title="にゅーすあぷり"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Button
            title="アカウント設定"
            onPress={() => {
              navigation.navigate("User");
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Button title="天気予報" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Button title="ログアウト" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentScreen {...props} />}
      screenOptions={{ headerStyle: styles.header }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{ title: "にゅーすあぷり" }}
      />
      <Drawer.Screen name="User" component={UserScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#9FBFB9",
  },
  menuHeader: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.4,
  },
  menuHeaderTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  drawerContent: {
    height: "100%",
  },
  menuContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
  },
  menuButton: {
    marginVertical: 10,
  },
});
