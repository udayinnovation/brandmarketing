import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Appbar, Text, Card, Divider, List } from 'react-native-paper';

const PackageCostScreen = () => {
  const recentAds = [
    require('../assets/ad1.jpg'), // Replace with your actual image paths
    require('../assets/ad2.jpg'),
    require('../assets/ad3.jpg'),
    // ... more ads
  ];

  const faqData = [
    {
      question: 'What kind of design will be created for my ad?',
      answer: 'Our professional designers will create visually appealing and effective designs tailored to your specific needs and target audience.', // Replace with actual answers
    },
    {
      question: 'What will you ask in design Requirement?',
      answer: 'We will ask for details such as your brand guidelines, target audience, messaging, and any specific preferences you have for the design.',
    },
    {
      question: 'How much time will AdKrity take for designing?',
      answer: 'Your design will typically be ready within 2 working days.',
    },
  ];

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} /> {/* Add navigation back function */}
        <Appbar.Content title="From Adkrity" />
        <Appbar.Action icon="help-circle-outline" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Card style={styles.priceCard}>
          <Card.Content>
            <Text variant="headlineSmall">Image designing cost ₹300</Text>
            <Text>Your design will be ready in 2 working days</Text>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Recent ads designed by adkrity</Text>
        <Text style={styles.sectionSubtitle}>These images are designed by by adkrity professional designers</Text>
        <ScrollView horizontal style={styles.recentAdsContainer}>
          {recentAds.map((ad, index) => (
            <Image key={index} source={ad} style={styles.recentAdImage} resizeMode="contain"/>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Frequently asked Questions</Text>
        {faqData.map((faq, index) => (
          <List.Accordion
            key={index}
            title={faq.question}
          >
            <List.Item title={faq.answer} />
          </List.Accordion>
        ))}

        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  priceCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
    sectionSubtitle: {
    marginBottom: 16,
  },
  recentAdsContainer: {
    marginBottom: 16,
  },
  recentAdImage: {
    width: 200, // Adjust as needed
    height: 150, // Adjust as needed
    marginRight: 8,
  },
    nextButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default PackageCostScreen;