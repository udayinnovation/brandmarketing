import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Provider as PaperProvider } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const [countryCode, setCountryCode] = useState("+91"); // Default to India
  const [phone, setPhone] = useState(""); // User's phone number
  const [otp, setOtp] = useState(""); // OTP entered by the user
  const [isOtpSent, setIsOtpSent] = useState(false); // Toggle for OTP flow
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  //put your iphere for testing or server api
  const API_BASE_URL = "http://127.0.0.1:8000/api/mobileApp"; // Replace with your backend URL

  // Step 1: Request OTP
  const requestOtp = async () => {
    const fullPhoneNumber = `${countryCode}${phone}`;
    try {
      console.log(fullPhoneNumber)
      const response = await axios.post(`${API_BASE_URL}/request-otp`, { phone: fullPhoneNumber });
      if (response.data.success) {
        setIsOtpSent(true);
        Alert.alert("Success", "OTP sent to your phone!");
      } else {
        Alert.alert("Error", response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      Alert.alert("Error", "Unable to send OTP. Please try again.");
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    const fullPhoneNumber = `${countryCode}${phone}`;
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { phone: fullPhoneNumber, otp });
      if (response.data.success) {
        const token = response.data.token; // Session token from backend
        const userData = response.data.user?response.data.user:`${countryCode}${phone}`; // Assuming user data is returned

        // Store user data & token in SecureStore via AuthContext
        login(userData, token);

        Alert.alert("Success", "Login successful!");
      } else {
        Alert.alert("Error", response.data.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Unable to verify OTP. Please try again.");
    }
  };

  // Securely store session token
  const storeSessionToken = async (token) => {
    try {
      await SecureStore.setItemAsync("sessionToken", token);
      console.log("Session token securely stored.");
    } catch (error) {
      console.error("Error storing session token:", error);
      Alert.alert("Error", "Failed to securely store session token.");
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Login with OTP</Text>
        {!isOtpSent ? (
          <>
            <Picker
              selectedValue={countryCode}
              onValueChange={(itemValue) => setCountryCode(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="India (+91)" value="+91" />
              <Picker.Item label="United States (+1)" value="+1" />
            </Picker>
            <View style={styles.spacing} />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <Button title="Request OTP" onPress={requestOtp} />
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
            />
            <Button title="Verify OTP" onPress={verifyOtp} />
          </>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  spacing: {
    height: 10,
  },
});

export default LoginPage;
