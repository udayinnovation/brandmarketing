import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { createStackNavigator } from "@react-navigation/stack";
// import HomePage from "./HomePage"; // Make sure it's a default export
// import LoginPage from "./LoginPage"; // Make sure it's a default export
// import ImagePickerPage from "./ImagePickerPage"; // Make sure it's a default export
// import BusinessForm from "./BusinessForm";
import RootNavigation from "./navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./HomePage";
import GrowPage from "./pages/GrowPage";
import './gesture-handler';

export default function App() {

  const Drawer = createDrawerNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      {/* <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomePage}></Drawer.Screen>
        <Drawer.Screen name="Grow" component={GrowPage}></Drawer.Screen>
      </Drawer.Navigator> */}
      <RootNavigation/>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
