import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Layout = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
            name="(clip)"
            options={{
              title: "クリップ",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="bookmark" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
