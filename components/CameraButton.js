import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CameraButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.cameraButton}
    onPress={onPress}>
    <Ionicons
      name="camera"
      size={32}
      color="white"
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cameraButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraButton;
