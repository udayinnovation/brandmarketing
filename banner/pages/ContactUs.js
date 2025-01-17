import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from "react-native";

const ContactUs = () => {
  const handleCall = () => {
    Linking.openURL("tel:9274685063");
  };

  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me/919274685063");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:contact@adkrity.com");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://via.placeholder.com/150", // Replace with your envelope image URL
          }}
          style={styles.image}
        />
      </View>

      {/* Content Section */}
      <Text style={styles.sectionTitle}>Drop us a line</Text>

      {/* Call Section */}
      <View style={styles.contactItem}>
        <Text style={styles.contactLabel}>
          Call ( 10:00 AM to 07:00 PM )
        </Text>
        <TouchableOpacity style={styles.contactRow} onPress={handleCall}>
          <Text style={styles.contactIcon}>📞</Text>
          <Text style={styles.contactValue}>8449684005</Text>
        </TouchableOpacity>
      </View>

      {/* WhatsApp Section */}
      <View style={styles.contactItem}>
        <Text style={styles.contactLabel}>WhatsApp</Text>
        <TouchableOpacity style={styles.contactRow} onPress={handleWhatsApp}>
          <Text style={styles.contactIcon}>💬</Text>
          <Text style={styles.contactValue}>8449684005</Text>
        </TouchableOpacity>
      </View>

      {/* Email Section */}
      <View style={styles.contactItem}>
        <Text style={styles.contactLabel}>Email</Text>
        <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
          <Text style={styles.contactIcon}>📧</Text>
          <Text style={styles.contactValue}>UdayInnovation@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: "#000",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  contactItem: {
    marginBottom: 20,
  },
  contactLabel: {
    fontSize: 14,
    color: "#666",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  contactValue: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default ContactUs;
