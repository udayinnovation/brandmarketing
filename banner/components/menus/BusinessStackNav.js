import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactUs from '../../pages/ContactUs';
import BusinessDetails from '../../pages/BusinessDetails';
import AdCampaignScreen from '../../pages/AdCampaignPage';
const BusinessStack = createStackNavigator();

const BusinessStackNavigator = () => {
  return (
    <BusinessStack.Navigator>
        <BusinessStack.Screen name="BusinessDetails" component={BusinessDetails} />
      <BusinessStack.Screen name="ContactUs" component={ContactUs} />
      <BusinessStack.Screen name="AdCampaignScreen" component={AdCampaignScreen} />
    </BusinessStack.Navigator>
  );
};

export default BusinessStackNavigator;