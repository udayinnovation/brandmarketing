import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImagePickerPage from '../../ImagePickerPage';
import HomePage from '../../HomePage';
import LeadPage from '../../pages/LeadPage';
import BusinessForm from '../../BusinessForm';
import Account from '../../pages/Account';
import HeaderMenu from './headermenu';
import LoginPage from '../../LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import { StyleSheet } from 'react-native';
import GrowPage from '../../pages/GrowPage';

const ScreenMenus = () => {
  const Stack = createNativeStackNavigator();
  const isAuthenticated = true;

  return (
    // <Stack.Navigator initialRouteName="Home"></Stack.Navigator>
    <Stack.Navigator>
      {isAuthenticated?(
          <>
              <Stack.Screen name="Home" component={HomePage} options={{
                  title:"BannerApp",
                  headerRight:()=><HeaderMenu/>
              }}/>
              <Stack.Screen name="ImagePicker" component={ImagePickerPage} options={{
                  title:"BannerApp",
                  headerRight:()=><HeaderMenu/>
              }}/>
              <Stack.Screen name="Lead" component={LeadPage} options={{
                  title:"BannerApp",
                  headerRight:()=><HeaderMenu/>
              }}/>
              <Stack.Screen name="Grow" component={GrowPage} options={{
                  title:"BannerApp",
                  headerRight:()=><HeaderMenu/>
              }}/>
              <Stack.Screen name="BusinessForm" component={BusinessForm} options={{
                  title:"BannerApp",
                  headerRight:()=><HeaderMenu/>
              }}/>
              <Stack.Screen name="Account" component={Account} options={{
                  title:"BannerApp",
                  headerRight:()=><HeaderMenu/>
              }}/>
          </>                
        ):(
            <>
                <Stack.Screen name="Register" component={RegisterPage}  options={{headerShown:false}} />
                <Stack.Screen name="Login" component={LoginPage} options={{headerShown:false}} /> 
            </>
            
        )}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container:{
      flexDirection:"row",
      margin:10,
      justifyContent:"space-between"
  },
  iconStyle:{
      marginBottom:3,
      alignSelf:"center",
      fontSize:25
  }
})

export default ScreenMenus