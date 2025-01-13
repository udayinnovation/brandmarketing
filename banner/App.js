import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import your screen components
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

import ImagePickerPage from "./ImagePickerPage";
import BusinessForm from "./BusinessForm";
import LeadsPage from "./LeadsPage";
import LeadDetailsPage from "./LeadDetailsPage";
import BusinessDetails from "./BusinessDetails";
// import SignupPage from "./SignupPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Page */}
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home Page" }}
        />

        {/* Login Page */}
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Login Page" }}
        />

        {/* Signup Page */}
        {/* <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{ title: "Signup Page" }}
        /> */}

        {/* Image Picker */}
        <Stack.Screen
          name="ImagePicker"
          component={ImagePickerPage}
          options={{ title: "Image Picker" }}
        />

        {/* Business Form */}
        <Stack.Screen
          name="BusinessForm"
          component={BusinessForm}
          options={{ title: "Business Form" }}
        />

        {/* Leads Page */}
        <Stack.Screen
          name="LeadsPage"
          component={LeadsPage}
          options={{ title: "Leads Page" }}
        />

        {/* Lead Details Page */}
        <Stack.Screen
          name="LeadDetailsPage"
          component={LeadDetailsPage}
          options={{ title: "Lead Details" }}
        />

        {/* Business Details Page */}
        <Stack.Screen
          name="BusinessDetails"
          component={BusinessDetails}
          options={{ title: "Business Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
