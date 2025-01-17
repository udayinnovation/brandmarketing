import { DrawerActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../../HomePage";
import ImagePickerPage from "../../ImagePickerPage";
import LeadPage from "../../pages/LeadPage";
import GrowPage from "../../pages/GrowPage";
import BusinessForm from "../../pages/BusinessForm";
import Account from "../../pages/Account";
import Icon from 'react-native-vector-icons/Entypo';
import UserScreen from "../../pages/UserScreen";
import LeadDetailsPage from "../../pages/LeadDetailsPage";
import BusinessDetails from "../../pages/BusinessDetails";
import LoginPage from "../../pages/LoginPage";
import GrowPackagePage from "../../pages/GrowPackagePage";
import NotesPage from "../../pages/NotesPage";
import ContactUs from "../../pages/ContactUs";


const StackNav = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    return (
      <Stack.Navigator
        screenOptions={{
          statusBarColor: '#0163d2',
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          
        }}>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
            headerLeft: () => {
              return (
                <Icon
                  name="menu"
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                  size={30}
                  color="#fff"
                />
              );
            },
          }}
        />
        <Stack.Screen name="ImagePicker" component={ImagePickerPage} options={{
            headerLeft: () => {
              return (
                <Icon
                  name="menu"
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                  size={30}
                  color="#fff"
                />
              );
            },
          }} />
        <Stack.Screen name="Lead" component={LeadPage}  />
        <Stack.Screen name="LeadDetails" component={LeadDetailsPage}  />
        <Stack.Screen name="BusinessDetails" component={BusinessDetails}  />
        <Stack.Screen name="Grow" component={GrowPage} />
        <Stack.Screen name="GrowPackage" component={GrowPackagePage} />
        <Stack.Screen name="BusinessForm" component={BusinessForm} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="NotesPage" component={NotesPage} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        {/* <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            headerShown: true,
          }}
        /> */}
      </Stack.Navigator>
    );
  };


export default StackNav;