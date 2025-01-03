import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const businessCategories = [
  { id: 1, name: "Art & Entertainment", icon: "🎭" },
  { id: 2, name: "Astrology", icon: "🔮" },
  { id: 3, name: "Automobile", icon: "🚗" },
  { id: 4, name: "Bakery and Cake", icon: "🍰" },
  { id: 5, name: "Banking & Finance", icon: "🏦" },
  { id: 6, name: "Cleaning & Pest Control", icon: "🧹" },
  { id: 7, name: "Computer & Networking", icon: "💻" },
  { id: 8, name: "Dairy & Sweets", icon: "🥛" },
  { id: 9, name: "Dry Cleaners", icon: "👔" },
  // Add more categories as needed...
];

export default function BusinessForm() {
  const [businessName, setBusinessName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter categories based on the search text
  const filteredCategories = businessCategories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>What’s your business</Text>
        <Text style={styles.subText}>
          Let us know, which of the following describe the business
        </Text>
      </View>

      {/* Business Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Business name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your business name"
          value={businessName}
          onChangeText={setBusinessName}
        />
      </View>

      {/* Search and Select Category */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select business category</Text>
        <TextInput
          style={styles.input}
          placeholder="Search business category"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Display Categories */}
      <ScrollView contentContainerStyle={styles.categoryGrid}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                selectedCategory === category.id && styles.selectedCategoryCard,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultText}>No categories found</Text>
        )}
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  categoryCard: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  selectedCategoryCard: {
    backgroundColor: "#e0f7fa",
    borderColor: "#00bcd4",
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    color: "#000",
  },
  noResultText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
