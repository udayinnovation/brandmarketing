import React,{ useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "./pages/LoginPage";
import RootNavigation from "./navigation";
import SplashScreen from "./components/Splashscreen";


const AppContent = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />; // Show splash while checking auth
  }

  return (
    <NavigationContainer>
      {token ? <RootNavigation /> : <LoginPage />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}