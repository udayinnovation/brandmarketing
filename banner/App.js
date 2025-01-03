import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./HomePage"; // Make sure it's a default export
import LoginPage from "./LoginPage"; // Make sure it's a default export
import ImagePickerPage from "./ImagePickerPage"; // Make sure it's a default export
import BusinessForm from "./BusinessForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Ensure you're using the `component` prop correctly */}
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="ImagePicker" component={ImagePickerPage} />
        <Stack.Screen name="BusinessForm" component={BusinessForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
