import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user & token from SecureStore on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("authToken");
        const storedUser = await SecureStore.getItemAsync("userData");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser)); // Parse user data back to object
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  // Function to log in and store token & user securely
  const login = async (userData, authToken) => {
    try {
      await SecureStore.setItemAsync("authToken", authToken);
      await SecureStore.setItemAsync("userData", JSON.stringify(userData)); // Store user as string
      setUser(userData);
      setToken(authToken);
    } catch (error) {
      console.error("Error storing auth data:", error);
    }
  };

  // Function to log out and remove token & user
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("userData");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Error deleting auth data:", error);
    }
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
