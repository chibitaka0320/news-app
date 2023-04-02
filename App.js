import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { TabNavigator } from "./src/Navigation/TabNavigator";



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TabNavigator />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9FBFB9",
  },
})
