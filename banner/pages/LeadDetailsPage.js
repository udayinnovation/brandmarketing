
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Linking, Platform, Alert,  TextInput } from 'react-native';

const LeadDetailsPage = ({ route, navigation }) => {
    const { lead } = route.params;  // Access data under "lead" key
    const [modalVisible, setModalVisible] = useState(false);
    const [noteModalVisible, setNoteModalVisible] = useState(false);
    const [note, setNote] = useState('');
    const [updatedLead, setUpdatedLead] = useState(lead);
    const [showAllNotes, setShowAllNotes] = useState(false); // To toggle all notes
    const [expandedNotes, setExpandedNotes] = useState({}); // To toggle individual notes

    const handlePhonePress = () => {
        setModalVisible(true);
      };
      const toggleNoteExpansion = (index) => {
        setExpandedNotes((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      };
      const latestNote = updatedLead.notes
  ?.slice()
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];


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
      const truncateText = (text, charLimit) => {
        if (text.length > charLimit) {
          return text.slice(0, charLimit);
        }
        return text; // Return the full text if it's within the limit
      };
      
      
    
      // Navigate to NotesPage
      const goToNotesPage = () => {
        navigation.navigate("NotesPage", { notes: updatedLead.notes });
      };
    
      const makeCall = () => {
        const phoneUrl = `tel:${lead.phoneNumber}`;
        Linking.openURL(phoneUrl).catch(() => {
          Alert.alert("Error", "Unable to make the call");
        });
        setModalVisible(false);
      };
      const handleSaveNote = async () => {
        if (!note.trim()) {
          Alert.alert("Error", "Please enter a note before saving.");
          return;
        }
      
        try {
          const response = await fetch("http://192.168.1.189:8000/api/leads/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              leadId: lead._id, // Ensure the lead ID is passed correctly
              notes: note,
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
           
            setUpdatedLead(data.lead); // Update the state with the updated lead data
      Alert.alert("Success", "Note added successfully");
      setNoteModalVisible(false);
      setNote(""); // Clear the input field
          } else {
            Alert.alert("Error", data.message || "Unable to save note");
          }
        } catch (error) {
          console.error("Error saving note:", error);
          Alert.alert("Error", "An error occurred while saving the note");
        }
      };
      const handleChangeStatus = async (newStatus) => {
        try {
          const response = await fetch("http://192.168.1.189:8000/api/leads/leadstatus", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              leadId: lead._id, // Ensure the lead ID is passed correctly
              status: newStatus,
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            // Update the local lead state with the new status
            setUpdatedLead((prevLead) => ({
              ...prevLead,
              status: newStatus,
            }));
            Alert.alert("Success", "Lead status updated successfully.");
          } else {
            Alert.alert("Error", data.message || "Unable to update status.");
          }
        } catch (error) {
          console.error("Error updating status:", error);
          Alert.alert("Error", "An error occurred while updating the status.");
        }
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
      <View style={styles.statusContainer}>
  {["Interested", "Not Connected", "In Progress", "Not Answered", "Converted", "Visited", "Dead"].map((status, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.statusButton,
        updatedLead.status === status && { backgroundColor: "#007bff" }, // Highlight active status
      ]}
      onPress={() => handleChangeStatus(status)}
    >
      <Text
        style={[
          styles.statusText,
          updatedLead.status === status && { color: "#fff" }, // Highlight text for active status
        ]}
      >
        {status}
      </Text>
    </TouchableOpacity>
  ))}
</View>


      {/* Follow-up and Notes */}
      <View style={styles.followUpSection}>
        <TouchableOpacity onPress={openGoogleCalendarApp}>
          <Text style={styles.linkText}>Set Followup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNoteModalVisible(true)}>
          <Text style={styles.linkText}>Add Note</Text>
        </TouchableOpacity>
      </View>
      
{/* Notes Section */}
<View style={styles.notesSection}>
  <Text style={styles.sectionTitle}>Notes</Text>

  {latestNote ? (
    <View>
      {latestNote.text.length > 30 ? (
        // Tappable note if it exceeds 30 characters
        <TouchableOpacity onPress={goToNotesPage}>
          <Text style={styles.noteText}>
            {truncateText(latestNote.text, 30)}...
          </Text>
         
        </TouchableOpacity>
      ) : (
        // Static note if it's within 30 characters
        <Text style={styles.noteText}>{latestNote.text}</Text>
      )}
<Text style={styles.noteDateText}>
        {new Date(latestNote.timestamp).toLocaleDateString()}
      </Text>
      {/* Button to view all notes */}
      {updatedLead.notes?.length-1 > 0 && (
  <TouchableOpacity
    style={styles.viewAllNotesButton}
    onPress={goToNotesPage}
  >
    <Text style={styles.viewAllNotesText}>
      Tap to view all {updatedLead.notes?.length - 1} notes
    </Text>
  </TouchableOpacity>
)}

    </View>
  ) : (
    <Text style={styles.noNotesText}>No notes added yet.</Text>
  )}
</View>





      {/* Modal for adding notes */}
      <Modal
        transparent={true}
        visible={noteModalVisible}
        animationType="slide"
        onRequestClose={() => setNoteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="Type your note here..."
              value={note}
              onChangeText={(text) => setNote(text)}
              multiline
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveNote}>
              <Text style={styles.modalButtonText}>Save Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setNoteModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Timeline */}
      <View style={styles.timelineSection}>
  <Text style={styles.sectionTitle}>Timeline</Text>
  {lead.timelines && lead.timelines.length > 0 ? (
    lead.timelines
      .slice() // Create a shallow copy to avoid mutating the original array
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort in descending order
      .map((entry, index) => (
        <View key={index} style={styles.timelineItem}>
          <Text style={styles.timelineDate}>
            {new Date(entry.timestamp).toLocaleString()}
          </Text>
          <Text style={styles.timelineActivity}>
            {entry.description.toLowerCase().includes("note")
              ? "Note added"
              : entry.description}
          </Text>
        </View>
      ))
  ) : (
    <Text style={styles.noTimelineText}>No timeline data available</Text>
  )}
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
  notesSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  noteItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noteDateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noteText: {
    fontSize: 16,
    color: "#000",
    marginBottom:15
  },
  expandText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  seeMoreButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  noteTimestamp: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 5,
  },
  noNotesText: {
    fontSize: 14,
    color: "#6c757d",
    fontStyle: "italic",
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
  noteInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
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
    marginTop: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40,
  },
  statusButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    color: "#000",
  },
  
  followUpSection: {
    marginBottom: 20,
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 10,
  },
  timelineSection: {
    marginBottom: 20,
    marginTop:10
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
  viewAllNotesButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  viewAllNotesText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LeadDetailsPage;
