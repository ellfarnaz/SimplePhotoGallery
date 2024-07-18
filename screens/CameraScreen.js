// screens/CameraScreen.js
import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { usePhotoContext } from "../contexts/PhotoContext";

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);
  const { addPhoto } = usePhotoContext();

  const handlePermission = useCallback(async () => {
    const result = await requestPermission();
    if (!result.granted) {
      Alert.alert(
        "Permission required",
        "Camera permission is required to take photos.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  }, [requestPermission, navigation]);

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const fileName = `${
          FileSystem.documentDirectory
        }photos/${Date.now()}.jpg`;
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileName,
        });

        const newPhoto = {
          id: Date.now().toString(),
          uri: fileName,
          createdAt: new Date().toISOString(),
        };

        await addPhoto(newPhoto);
        navigation.goBack();
      } catch (error) {
        console.error("Error taking or saving photo:", error);
        Alert.alert("Error", "Failed to take or save photo. Please try again.");
      }
    }
  }, [addPhoto, navigation]);

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }, []);

  const cameraUI = useMemo(
    () => (
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}>
            <Ionicons
              name="camera-reverse"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}>
            <Ionicons
              name="radio-button-on"
              size={70}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    ),
    [facing, toggleCameraFacing, takePicture]
  );

  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <View style={styles.container}>{cameraUI}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  flipButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  captureButton: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    margin: 10,
  },
});
