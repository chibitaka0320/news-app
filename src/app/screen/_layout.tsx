import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Layout = (): JSX.Element => {
  return (
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
  );
};

export default Layout;
