// screens/FullScreenPhotoScreen.js
import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FullScreenPhotoScreen({ route, navigation }) {
  const { photoUri } = route.params;

  const deletePhoto = async () => {
    try {
      await FileSystem.deleteAsync(photoUri);
      const savedPhotos = await AsyncStorage.getItem("photos");
      if (savedPhotos !== null) {
        const photoArray = JSON.parse(savedPhotos);
        const updatedPhotos = photoArray.filter(
          (photo) => photo.uri !== photoUri
        );
        await AsyncStorage.setItem("photos", JSON.stringify(updatedPhotos));
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name="close"
          size={32}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deletePhoto}>
        <Ionicons
          name="trash"
          size={32}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  deleteButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
});
