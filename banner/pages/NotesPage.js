import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotesPage = ({ route }) => {
  const { notes } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Notes</Text>
      {notes && notes.length > 0 ? (
        notes
          .slice()
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort notes by timestamp
          .map((note, index) => (
            <View key={index} style={styles.noteItem}>
              <Text style={styles.noteText}>{note.text}</Text>
              <Text style={styles.noteTimestamp}>
                {new Date(note.timestamp).toLocaleString()}
              </Text>
            </View>
          ))
      ) : (
        <Text style={styles.noNotesText}>No notes available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  noteItem: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 10 },
  noteText: { fontSize: 16 },
  noteTimestamp: { fontSize: 12, color: "gray" },
  noNotesText: { fontSize: 16, color: "gray" },
});

export default NotesPage;
