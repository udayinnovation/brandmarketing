import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const HomePage = ({ navigation }) => {
  const handleButtonPress = () => {
    alert("Welcome to your home page!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your App</Text>
      <Text style={styles.subtitle}>This is your starting point!</Text>

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.imagePickerButton]}
        onPress={() => navigation.navigate("ImagePicker")}
      >
        <Text style={styles.buttonText}>Image Picker</Text>
      </TouchableOpacity>

      {/* New Button for BusinessForm Page */}
      <TouchableOpacity
        style={[styles.button, styles.businessFormButton]}
        onPress={() => navigation.navigate("BusinessForm")}
      >
        <Text style={styles.buttonText}>Business Form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#03a9f4", // Different color for the Login button
  },
  imagePickerButton: {
    backgroundColor: "#4caf50", // Different color for the Image Picker button
  },
  businessFormButton: {
    backgroundColor: "#ff5722", // Different color for the Business Form button
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomePage;
