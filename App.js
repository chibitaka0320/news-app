import React from "react";
import { SafeAreaView, StyleSheet, } from "react-native";
import { TabNavigator } from "./src/Navigation/TabNavigator";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./src/Navigation/DrawerNavigator"


export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
