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

      {/* Button 1 */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>

      {/* Button 2: Login */}
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Button 3: Signup */}
      {/* <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity> */}

      {/* Button 4: Image Picker */}
      <TouchableOpacity
        style={[styles.button, styles.imagePickerButton]}
        onPress={() => navigation.navigate("ImagePicker")}
      >
        <Text style={styles.buttonText}>Image Picker</Text>
      </TouchableOpacity>

      {/* Button 5: Business Form */}
      <TouchableOpacity
        style={[styles.button, styles.businessFormButton]}
        onPress={() => navigation.navigate("BusinessForm")}
      >
        <Text style={styles.buttonText}>Business Form</Text>
      </TouchableOpacity>

      {/* Button 6: Leads Page */}
      <TouchableOpacity
        style={[styles.button, styles.leadsPageButton]}
        onPress={() => navigation.navigate("LeadsPage")}
      >
        <Text style={styles.buttonText}>Go to Leads</Text>
      </TouchableOpacity>

      {/* Button 7: Business Details Page */}
      <TouchableOpacity
        style={[styles.button, styles.businessDetailsButton]}
        onPress={() => navigation.navigate("BusinessDetails")}
      >
        <Text style={styles.buttonText}>Business Details</Text>
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
    backgroundColor: "#03a9f4",
  },
  // signupButton: {
  //   backgroundColor: "#e91e63", // Color for the Signup button
  // },
  imagePickerButton: {
    backgroundColor: "#4caf50",
  },
  businessFormButton: {
    backgroundColor: "#ff5722",
  },
  leadsPageButton: {
    backgroundColor: "#8e44ad",
  },
  businessDetailsButton: {
    backgroundColor: "#f39c12", // Color for the Business Details button
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomePage;
