import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";

export default function LeadsPage({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "123456"; // Hardcoded user ID

  // Fetch leads from the backend
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://192.168.1.189:8000/api/leads/fetchlead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Using the hardcoded user ID
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setLeads(data.leads);
    } catch (err) {
      setError(err.message || "Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);
  const makePhoneCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Your device does not support this feature.");
        }
      })
      .catch((err) => Alert.alert("Error", "Failed to make a call."));
  };

  // Filter leads based on the search query
  // Filter leads based on the selected tab and the search query
const filteredLeads = leads.filter((lead) => {
  const matchesSearch =
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phoneNumber.includes(searchQuery);

  if (activeTab === "All") {
    return matchesSearch; // Show all leads if "All" is selected
  }

  return matchesSearch && lead.status === activeTab; // Filter by status
});

return (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.headerText}>Leads</Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setIsSearchActive(!isSearchActive)}
      >
        <Text style={styles.searchIcon}>🔍</Text>
      </TouchableOpacity>
    </View>

    {/* Search Field */}
    {isSearchActive && (
      <TextInput
        style={styles.searchInput}
        placeholder="Search leads by name or phone..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    )}

    {/* Tabs */}
    <ScrollView
      horizontal
      contentContainerStyle={styles.tabsContainer}
      showsHorizontalScrollIndicator={false}
    >
      {[
        "All",
        "Interested",
        "Not Connected",
        "In Progress",
        "Not Answered",
        "Converted",
        "Visited",
        "Dead",
        "New Lead",
      ].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Leads List (Filtered Search Results) */}
    <ScrollView style={styles.leadsList}>
      {!loading &&
        !error &&
        filteredLeads.map((lead) => (
          <TouchableOpacity
            key={lead._id}
            style={styles.leadCard}
            onPress={() => navigation.navigate("LeadDetails", { lead })}
          >
            <Image
              source={{
                uri: "https://via.placeholder.com/50",
              }}
              style={styles.leadImage}
            />
            <View style={styles.leadDetails}>
              <Text style={styles.leadName}>{lead.name}</Text>
              <Text style={styles.leadPhone}>{lead.phoneNumber}</Text>
              <Text style={styles.leadDate}>
                Added • {lead.createdAt}
              </Text>
            </View>
            <View
              style={[
                styles.leadStatusBadge,
                { backgroundColor: lead.statusColor },
              ]}
            >
              <Text
                style={[
                  styles.leadStatusText,
                  { color: lead.statusTextColor },
                ]}
              >
                {lead.status}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => makePhoneCall(lead.phoneNumber)}
            >
              <Text style={styles.callIcon}>📞</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
    </ScrollView>

    {/* Loading Indicator */}
    {loading && <ActivityIndicator size="large" color="#007bff" />}
    {/* Error Message */}
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   padding: 0,
  // },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  searchButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8, // Ensure the leads appear just below the tabs
  },
  tab: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 2,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  tabText: {
    fontSize: 14,
    color: "#6c757d",
  },
  activeTabText: {
    color: "#fff",
  },
  leadsList: {
    flexGrow: 1,
    marginTop: 8, // Adjust spacing below the tabs
    paddingHorizontal: 16,
  },
  leadCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  leadImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  leadDetails: {
    flex: 1,
  },
  leadName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  leadPhone: {
    fontSize: 14,
    color: "#6c757d",
  },
  leadDate: {
    fontSize: 12,
    color: "#adb5bd",
  },
  leadStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  leadStatusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  callButton: {
    marginLeft: 16,
  },
  callIcon: {
    fontSize: 20,
    color: "#007bff",
  },
});
