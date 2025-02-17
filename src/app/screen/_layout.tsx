import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import store from "../store/store";
import { Provider } from "react-redux";

const Layout = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="(home)"
          options={{
            title: "ホーム",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="clip"
          options={{
            title: "クリップ",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bookmark" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
};

export default Layout;
