import React, { useState } from "react";

//navigator
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./src/Navigation/DrawerNavigator";
// screen
import { TopScreen } from "./src/screen/TopScreen";
// contect
import { UserContext } from "./src/context/UserContext";


export default function App() {
  const [user, setUser] = useState();

  return (

    <UserContext.Provider value={{ user, setUser }}>
      <TopScreen />
    </UserContext.Provider>

    // <NavigationContainer>
    //   <DrawerNavigator />
    // </NavigationContainer>
  )
}

