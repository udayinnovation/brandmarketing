import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import StackNav from './StackNav';
import Account from '../../pages/Account';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import GrowPage from '../../pages/GrowPage';
import LeadPage from '../../pages/LeadPage';
import ImagePickerPage from '../../ImagePickerPage';

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
                else if (route.name === 'Account') iconName = 'user';
                return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={StackNav} />
            <Tab.Screen name='ImagePicker' component={ImagePickerPage}/>
            <Tab.Screen name='Lead' component={LeadPage}/>
            <Tab.Screen name='Grow' component={GrowPage}/> 
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
  )
}

export default TabNav