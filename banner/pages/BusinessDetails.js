import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BusinessDetails = () => {
  // Function to handle sharing the app
  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing app! Download it from: https://example.com',
        title: 'Share App',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with an activity
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          // Shared successfully
          console.log('App shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Share dismissed
        console.log('App sharing dismissed');
      }
    } catch (error) {
      console.error('Error while sharing the app:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* First Section */}
        <View style={styles.section}>
          <Text style={styles.largeText}>ADD</Text>
          <Text style={styles.subText}>add</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Click here to add address</Text>
          </TouchableOpacity>
        </View>

        {/* Options Section */}
        <View style={styles.optionsContainer}>
          {[
            { icon: 'rocket', label: 'Campaign Settings' },
            { icon: 'card', label: 'Billing Details' },
            { icon: 'globe', label: 'Manage Website' },
            { icon: 'notifications', label: 'Notifications' },
            { icon: 'construct', label: 'Designs' },
            { icon: 'wallet', label: 'Payments History' },
            { icon: 'help-circle', label: 'Support' },
            { icon: 'share-social', label: 'Share App', action: handleShareApp },
            { icon: 'document-text', label: 'Terms & Conditions' },
            { icon: 'lock-closed', label: 'Privacy & Policy' },
            { icon: 'mail', label: 'Contact Us' },
            { icon: 'log-out', label: 'Logout' },
          ].map((item, index) => (
            <TouchableOpacity
              style={styles.option}
              key={index}
              onPress={item.action ? item.action : undefined}
            >
              <Icon name={item.icon} size={24} color="#4285F4" />
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version: 1.0.3</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  section: { alignItems: 'center', padding: 16 },
  largeText: { fontSize: 36, fontWeight: 'bold' },
  subText: { fontSize: 18, fontWeight: '500', marginTop: 8 },
  linkText: { fontSize: 14, color: '#4285F4', marginTop: 8 },
  optionsContainer: { paddingHorizontal: 16, marginTop: 16 },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  optionText: { fontSize: 16, fontWeight: '500', marginLeft: 12 },
  versionContainer: { alignItems: 'center', marginTop: 16 },
  versionText: { fontSize: 14, color: '#666' },
});

export default BusinessDetails;
