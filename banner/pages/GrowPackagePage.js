import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Checkbox, Button, TouchableRipple, List } from "react-native-paper";

const GrowPackagePage = () => {
  const [budget, setBudget] = useState({ facebook: 0, instagram: 0 });
  const [facebookChecked, setFacebookChecked] = useState(false);
  const [instagramChecked, setInstagramChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  const calculateEstimatedResults = () => {
    const totalBudget = (facebookChecked ? budget.facebook : 0) + (instagramChecked ? budget.instagram : 0);
    const estimatedViews = totalBudget * 10; // Example calculation
    const estimatedLeads = Math.floor(totalBudget * 1.5); // Example calculation
    return { estimatedViews, estimatedLeads, totalBudget };
  };

  const { estimatedViews, estimatedLeads, totalBudget } = calculateEstimatedResults();

  const proceedToPayment = () => {
    if (totalBudget > 0) {
      navigation.navigate("AdCampaign", { budget, totalBudget });
    } else {
      alert("Please select a budget to proceed.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Get New Leads</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Get new customers using Leads: Generate daily new leads by showing
            your ads to potential customers in your target area.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Total Budget</Text>

        {/* Budget Input for Facebook */}
        <View style={styles.row}>
          <Checkbox
            status={facebookChecked ? 'checked' : 'unchecked'}
            onPress={() => setFacebookChecked(!facebookChecked)}
          />
          <Text style={styles.platformLabel}>Facebook</Text>
          <View style={styles.budgetInput}>
            <TouchableRipple
              onPress={() =>
                setBudget((prev) => (prev.facebook > 0 ? { ...prev, facebook: prev.facebook - 1 } : prev))
              }
            >
              <Text style={styles.adjustButton}>-</Text>
            </TouchableRipple>
            <TextInput
              style={styles.input}
              value={String(budget.facebook)}
              keyboardType="numeric"
              onChangeText={(value) =>
                setBudget((prev) => ({ ...prev, facebook: Number(value) }))
              }
            />
            <TouchableRipple
              onPress={() =>
                setBudget((prev) => ({ ...prev, facebook: prev.facebook + 1 }))
              }
            >
              <Text style={styles.adjustButton}>+</Text>
            </TouchableRipple>
          </View>
        </View>

        {/* Budget Input for Instagram */}
        <View style={styles.row}>
          <Checkbox
            status={instagramChecked ? 'checked' : 'unchecked'}
            onPress={() => setInstagramChecked(!instagramChecked)}
          />
          <Text style={styles.platformLabel}>Instagram</Text>
          <View style={styles.budgetInput}>
            <TouchableRipple
              onPress={() =>
                setBudget((prev) => (prev.instagram > 0 ? { ...prev, instagram: prev.instagram - 1 } : prev))
              }
            >
              <Text style={styles.adjustButton}>-</Text>
            </TouchableRipple>
            <TextInput
              style={styles.input}
              value={String(budget.instagram)}
              keyboardType="numeric"
              onChangeText={(value) =>
                setBudget((prev) => ({ ...prev, instagram: Number(value) }))
              }
            />
            <TouchableRipple
              onPress={() =>
                setBudget((prev) => ({ ...prev, instagram: prev.instagram + 1 }))
              }
            >
              <Text style={styles.adjustButton}>+</Text>
            </TouchableRipple>
          </View>
        </View>

        {/* Estimated Results */}
        <View style={styles.estimateBox}>
          <Text style={styles.estimateText}>Estimated Result</Text>
          <Text style={styles.resultText}>
            👁️ {estimatedViews} VIEWS
          </Text>
          <Text style={styles.resultText}>
            📈 {estimatedLeads} LEADS
          </Text>
          <Text style={styles.resultSummary}>
            You will spend ₹{totalBudget} in total and ad will run for {totalBudget > 0 ? "1 day" : "0 days"}
          </Text>
        </View>

        {/* FAQ Section as Accordion */}
        <List.Section>
          <List.Accordion
            title="Where will my ad be shown?"
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.faqAnswer}>Your ad will be shown to potential customers in your target area.</Text>
          </List.Accordion>
          <List.Accordion
            title="Which ad image will be used while running my ad?"
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.faqAnswer}>The ad image you select during the ad creation process will be used.</Text>
          </List.Accordion>
          <List.Accordion
            title="Who will do audience targeting & optimization?"
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.faqAnswer}>Our team will handle audience targeting and optimization to ensure maximum reach.</Text>
          </List.Accordion>
        </List.Section>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => alert("Lead submitted successfully!")}>
            Submit
          </Button>
          <Button mode="contained" onPress={proceedToPayment} style={styles.nextButton}>
            Next
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#eaf6ff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#0163d2",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  platformLabel: {
    flex: 1,
  },
  budgetInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 80,
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
  },
  adjustButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0163d2",
  },
  estimateBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    elevation: 2,
  },
  estimateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
  resultSummary: {
    fontSize: 14,
    color: "#555",
  },
  faqAnswer: {
    padding: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: "#0163d2",
  },
});

export default GrowPackagePage;
