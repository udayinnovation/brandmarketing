import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const GrowPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Content */}
      <ScrollView>
        {/* Top Section */}
        <View style={styles.topSection}>
          <Text style={styles.topTitle}>Running Ad For The First Time?</Text>
          <Text style={styles.topDescription}>
            Run a small budget ad first before making your final decision
          </Text>
          <TouchableOpacity style={styles.tryAdButton}>
            <Text style={styles.tryAdButtonText}>Try Ad</Text>
          </TouchableOpacity>
        </View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          <ServiceItem
            icon="phone"
            title="Get New Leads"
            description="Get 250 leads and reach 80,000 people."
            platforms={['facebook', 'instagram']}
            navigation={navigation}
          />
          <ServiceItem
            icon="whatsapp"
            title="Get WhatsApp Messages"
            description="Get messages on WhatsApp."
            platforms={['facebook', 'instagram']}
          />
          <ServiceItem
            icon="globe"
            title="Get Website Traffic"
            description="Drive customers to your website."
            platforms={['facebook', 'instagram', 'google']}
          />
          <ServiceItem
            icon="download"
            title="App Installs"
            description="Get new targeted users for your app."
            platforms={['facebook', 'instagram', 'google']}
          />
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.bottomTitle}>Need help choosing a package?</Text>
          <Text style={styles.bottomDescription}>Get Free Consultation</Text>
          <TouchableOpacity style={styles.callNowButton}>
            <Text style={styles.callNowButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* Navigate to Customize Package */}
        <View style={styles.customizeSection}>
          <Text style={styles.customizeTitle}>Ready to Customize Your Package?</Text>
          <TouchableOpacity
            style={styles.customizeButton}
            onPress={() => navigation.navigate('GrowPackage')} // Navigate to PackageLeadPage
          >
            <Text style={styles.customizeButtonText}>Customize Package</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Reusable Component for Service Items
const ServiceItem = ({ icon, title, description, platforms }) => {
  return (
    <View style={styles.serviceItem}>
      <FontAwesome5 name={icon} size={24} color="blue" style={styles.serviceIcon} />
      <View style={styles.serviceText}>
        <Text style={styles.serviceTitle}>{title}</Text>
        <Text style={styles.serviceDescription}>{description}</Text>
      </View>
      <View style={styles.platformIcons}>
        {platforms.map((platform, index) => (
          <FontAwesome5 key={index} name={platform} size={18} color="gray" style={styles.platformIcon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    backgroundColor: '#e8f4ff',
    padding: 20,
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  tryAdButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  tryAdButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  middleSection: {
    padding: 15,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
  },
  serviceIcon: {
    marginRight: 10,
  },
  serviceText: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
  },
  platformIcons: {
    flexDirection: 'row',
  },
  platformIcon: {
    marginHorizontal: 5,
  },
  bottomSection: {
    alignItems: 'center',
    backgroundColor: '#e8f4ff',
    padding: 20,
    marginTop: 20,
  },
  bottomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  callNowButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  callNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customizeSection: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    marginTop: 20,
  },
  customizeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customizeButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  customizeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GrowPage;
