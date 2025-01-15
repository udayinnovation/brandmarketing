import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Appbar,
  Text,
  RadioButton,
  TextInput,
  Button,
  Chip,
  TouchableRipple,
} from 'react-native-paper';

const AdCampaignScreen = () => {
  const [selectedGender, setSelectedGender] = useState('All');
  const [targetAreas, setTargetAreas] = useState([]);
  const [newTargetArea, setNewTargetArea] = useState('');
  const [targetingSuggestions, setTargetingSuggestions] = useState([]);
  const [newTargetingSuggestion, setNewTargetingSuggestion] = useState('');

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const addTargetArea = () => {
    if (newTargetArea.trim() !== '') {
      setTargetAreas([...targetAreas, newTargetArea.trim()]);
      setNewTargetArea('');
    }
  };

  const removeTargetArea = (index) => {
    const updatedAreas = [...targetAreas];
    updatedAreas.splice(index, 1);
    setTargetAreas(updatedAreas);
  };

  const addTargetingSuggestion = () => {
    if (newTargetingSuggestion.trim() !== '') {
      setTargetingSuggestions([...targetingSuggestions, newTargetingSuggestion.trim()]);
      setNewTargetingSuggestion('');
    }
  };

  const removeTargetingSuggestion = (index) => {
    const updatedSuggestions = [...targetingSuggestions];
    updatedSuggestions.splice(index, 1);
    setTargetingSuggestions(updatedSuggestions);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Ad Campaign Settings" />
        <Appbar.Action icon="help-circle-outline" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionText}>
          Set target area and audience for your business. Interest-based
          advanced targeting will be done by our experts.
        </Text>

        <Text style={styles.sectionTitle}>Select Gender</Text>
        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButtonItem}>
            <RadioButton.Item
              label="All"
              value="All"
              status={selectedGender === 'All' ? 'checked' : 'unchecked'}
              onPress={() => handleGenderSelect('All')}
            />
          </View>
          <View style={styles.radioButtonItem}>
            <RadioButton.Item
              label="Male"
              value="Male"
              status={selectedGender === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => handleGenderSelect('Male')}
            />
          </View>
          <View style={styles.radioButtonItem}>
            <RadioButton.Item
              label="Female"
              value="Female"
              status={selectedGender === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => handleGenderSelect('Female')}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Target areas</Text>
        <Text style={styles.sectionText}>
          Your ad will be shown in this area. It could be of Local Area / City /
          State or PAN India
        </Text>
        <TextInput
          label="Add Target Area"
          value={newTargetArea}
          onChangeText={setNewTargetArea}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={addTargetArea} style={styles.addButton}>
          Add
        </Button>
        <View style={styles.chipContainer}>
        {targetAreas.map((area, index) => (
          <Chip key={index} onClose={() => removeTargetArea(index)} style={styles.chip}>
            {area}
          </Chip>
        ))}
        </View>

        <Text style={styles.sectionTitle}>Targeting Suggestions (Optional)</Text>
        <Text style={styles.sectionText}>
          You can suggest to which type of audience you want to show this ad
        </Text>
        <TextInput
          label="Add Suggestion (e.g., Businessmen)"
          value={newTargetingSuggestion}
          onChangeText={setNewTargetingSuggestion}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={addTargetingSuggestion} style={styles.addButton}>
          Add
        </Button>
        <View style={styles.chipContainer}>
          {targetingSuggestions.map((suggestion, index) => (
            <Chip key={index} onClose={() => removeTargetingSuggestion(index)} style={styles.chip}>
              {suggestion}
            </Chip>
          ))}
        </View>

        <Button
          mode="contained"
          style={styles.proceedButton}
          onPress={() => {}} // Add your navigation logic here
        >
          Proceed to Payment
        </Button>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    marginBottom: 16,
  },
  radioButtonGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButtonItem: {
    flex: 1, // Distribute radio buttons evenly
  },
  input: {
    marginBottom: 8,
  },
  addButton: {
    marginBottom: 16,
  },
  proceedButton: {
    marginTop: 24,
  },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginBottom: 16
    },
    chip: {
        marginRight: 4,
        marginBottom: 4
    }
});

export default AdCampaignScreen;