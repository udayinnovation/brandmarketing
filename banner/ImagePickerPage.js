import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

const ImagePickerPage = () => {
  const [selectedImages, setSelectedImages] = useState([]); // Store multiple images

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]); // Add the new images
    } else if (result.uri) {
      setSelectedImages((prevImages) => [...prevImages, result.uri]); // Add the single image
    } else {
      Alert.alert("No Image", "No image was selected.");
    }
  };

  const shareImage = async (imageUri) => {
    if (imageUri && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(imageUri); // Share the selected image
    } else {
      Alert.alert(
        "Sharing Not Available",
        "Sharing is not supported on this platform."
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedImages}
        keyExtractor={(item) => item} // Use URI as the unique key
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
            <Button title="Share" onPress={() => shareImage(item)} />
          </View>
        )}
        horizontal={false}
        numColumns={2} // Display images in a grid
      />
      <Button title="Pick Images" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default ImagePickerPage;
