
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Linking, Platform, Alert } from 'react-native';

const LeadDetailsPage = ({ route, navigation }) => {
    const { lead } = route.params;  // Access data under "lead" key
    const [modalVisible, setModalVisible] = useState(false);
    const handlePhonePress = () => {
        setModalVisible(true);
      };
      const openGoogleCalendarApp = () => {
        const calendarDeepLink = Platform.OS === "android"
          ? "content://com.android.calendar/time/" // Android deep link
          : "calshow:"; // iOS Calendar deep link
    
        Linking.openURL(calendarDeepLink).catch(() => {
          Alert.alert(
            "Error",
            "Unable to open the Calendar app. Please ensure Google Calendar is installed."
          );
        });
      };
    
      const makeCall = () => {
        const phoneUrl = `tel:${lead.phoneNumber}`;
        Linking.openURL(phoneUrl).catch(() => {
          Alert.alert("Error", "Unable to make the call");
        });
        setModalVisible(false);
      };
  
    // Check if lead data is valid before rendering
    if (!lead) {
      return (
        <View style={styles.container}>
          <Text>No lead data available</Text>
        </View>
      );
    }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      
        <Text style={styles.title}>{lead.name}</Text>
      </View>

      {/* Image, Name, and Date on Top-Right */}
      {/* <View style={styles.topRightContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.leadImage}
        />
        <View style={styles.leadInfoRight}>
          <Text style={styles.leadName}>{lead.name}</Text>
          <Text style={styles.addedText}>Added: {lead.addedDate}</Text>
        </View>
      </View> */}

      {/* Lead Info */}
      <View style={styles.leadInfo}>
        <Text style={styles.phone}>{lead.phoneNumber}</Text>
      </View>

      {/* Branding Section on Top-Right */}
      <View style={styles.brandingContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.brandingImage}
        />
        <Text style={styles.brandingText}>Branding</Text>
        <Text style={styles.brandingDate}>08-10-2021</Text>
      </View>

      {/* Contact Actions */}
      <View style={styles.contactIcons}>
        <TouchableOpacity style={styles.icon} onPress={handlePhonePress}>
          <Text>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Text>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Text>🟢</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for phone actions */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contact Options</Text>
            <TouchableOpacity style={styles.modalButton} onPress={makeCall}>
              <Text style={styles.modalButtonText}>Call {lead.phoneNumber}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Status Section */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusContainer}>
          {["Interested", "Not Connected", "In Progress", "Not Answered", "Converted", "Visited", "Dead"].map((status, index) => (
            <TouchableOpacity key={index} style={styles.statusButton}>
              <Text style={styles.statusText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Follow-up and Notes */}
      <View style={styles.followUpSection}>
        <TouchableOpacity onPress={openGoogleCalendarApp}>
          <Text style={styles.linkText}>Set Followup</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {/* Timeline */}
      <View style={styles.timelineSection}>
        <Text style={styles.sectionTitle}>Timeline</Text>
        <Text style={styles.linkText}>Recent Activities</Text>
        {[
          { date: "23-09-2022", activity: "Status Changed: Interested" },
          { date: "23-09-2022", activity: "Followup via Call" },
          { date: "22-09-2022", activity: "Followup via WhatsApp" },
        ].map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.timelineDate}>{item.date}</Text>
            <Text style={styles.timelineActivity}>{item.activity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  backButton: {
    fontSize: 24,
    color: "#007bff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  // Styling for the top-right section
  topRightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  leadImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 10,
  },
  leadInfoRight: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  leadName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  addedText: {
    fontSize: 14,
    color: "#6c757d",
  },

  // Branding Section on Top-Right
  brandingContainer: {
    position: 'absolute', // Position it at the top-right corner
    top: 16,
    right: 16,
    alignItems: 'flex-end',
  },
  brandingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  brandingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  brandingDate: {
    fontSize: 14,
    color: "#6c757d",
  },

  // Regular Lead Info Section
  leadInfo: {
    marginBottom: 20,
  },
  phone: {
    fontSize: 18,
    color: "#007bff",
  },

  contactIcons: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    marginRight: 16,
  },

  statusSection: {
    marginBottom: 20,
    marginTop: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  statusButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#000",
  },
  followUpSection: {
    marginBottom: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 10,
  },
  timelineSection: {
    marginBottom: 20,
  },
  timelineItem: {
    marginBottom: 10,
  },
  timelineDate: {
    fontSize: 14,
    color: "#6c757d",
  },
  timelineActivity: {
    fontSize: 16,
  },
});

export default LeadDetailsPage;
