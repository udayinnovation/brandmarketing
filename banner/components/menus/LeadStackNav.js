import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LeadsPage from '../../pages/LeadPage';
import LeadDetailsPage from '../../pages/LeadDetailsPage';
import NotesPage from '../../pages/NotesPage';
const LeadStack = createStackNavigator();

const LeadStackNavigator = () => {
  return (
    <LeadStack.Navigator>
      <LeadStack.Screen name="Leads" component={LeadsPage} />
      <LeadStack.Screen name="LeadDetails" component={LeadDetailsPage} />
      <LeadStack.Screen name="NotesPage" component={NotesPage} />
      {/* <GrowStack.Screen name="PackageCost" component={PackageCostScreen} />
      <GrowStack.Screen name="AdCampaign" component={AdCampaignScreen} /> */}
    </LeadStack.Navigator>
  );
};

export default LeadStackNavigator;