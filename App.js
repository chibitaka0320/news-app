import React, { useState } from "react";

//navigator
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
// screen
import { TopScreen } from "./src/screen/TopScreen";
// contect
import { UserContext } from "./src/context/UserContext";


export default function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ActionSheetProvider>
        <TopScreen />
      </ActionSheetProvider>
    </UserContext.Provider>
  )
}

