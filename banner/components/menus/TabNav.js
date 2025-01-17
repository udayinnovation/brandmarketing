import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import StackNav from './StackNav';
import Account from '../../pages/Account';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import GrowPage from '../../pages/GrowPage';
import GrowStackNavigator from './GrowStackNav'; 
import LeadPage from '../../pages/LeadPage';
import LeadDetailsPage from '../../pages/LeadDetailsPage';
import ImagePickerPage from '../../ImagePickerPage';
import BusinessDetails from '../../pages/BusinessDetails';
import LeadStackNavigator from './LeadStackNav';
import ContactUs from '../../pages/ContactUs';
import BusinessStackNavigator from './BusinessStackNav';
const TabNav = () => {
    const Tab = createBottomTabNavigator();
  return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'ImagePicker') iconName = 'images';
                else if (route.name === 'Lead') iconName = 'users';
                else if (route.name === 'Grow') iconName = 'seedling';
                else if (route.name === 'Business') iconName = 'user';
                return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={StackNav} />
            <Tab.Screen name='ImagePicker' component={ImagePickerPage}/>
            <Tab.Screen name='Lead' component={LeadStackNavigator}/>
            <Tab.Screen name='Grow' component={GrowStackNavigator}/> 
            <Tab.Screen name="Business" component={BusinessStackNavigator} />
            
            {/* <Tab.Screen name="LeadDetails" component={LeadDetailsPage} /> */}
       
        </Tab.Navigator>
  )
}

export default TabNav