import React from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PhotoItem = ({
  photo,
  index,
  isSelected,
  isSelectionMode,
  onPress,
  onLongPress,
}) => (
  <TouchableOpacity
    onPress={() => onPress(photo, index)}
    onLongPress={() => onLongPress(photo, index)}
    delayLongPress={300}
    style={styles.photoItem}>
    <Image
      source={{ uri: photo.uri }}
      style={styles.thumbnail}
    />
    {isSelectionMode && (
      <View style={styles.checkmarkContainer}>
        <View
          style={[
            styles.checkmarkCircle,
            isSelected && styles.checkmarkCircleSelected,
          ]}>
          {isSelected && (
            <Ionicons
              name="checkmark"
              size={20}
              color="white"
            />
          )}
        </View>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  photoItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
    position: "relative",
  },
  thumbnail: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  checkmarkContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  checkmarkCircleSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
});

export default PhotoItem;
