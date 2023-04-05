import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Button } from "react-native";

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to notifications"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

export const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
};
