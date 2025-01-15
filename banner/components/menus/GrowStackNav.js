import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GrowPage from "../../pages/GrowPage";
import GrowPackagePage from '../../pages/GrowPackagePage';
import AdCampaignScreen from '../../pages/AdCampaignPage';
import PackageCostScreen from '../../pages/PackageCost';

const GrowStack = createStackNavigator();

const GrowStackNavigator = () => {
  return (
    <GrowStack.Navigator>
      <GrowStack.Screen name="GrowPage" component={GrowPage} />
      <GrowStack.Screen name="GrowPackage" component={GrowPackagePage} />
      <GrowStack.Screen name="PackageCost" component={PackageCostScreen} />
      <GrowStack.Screen name="AdCampaign" component={AdCampaignScreen} />
    </GrowStack.Navigator>
  );
};

export default GrowStackNavigator;
