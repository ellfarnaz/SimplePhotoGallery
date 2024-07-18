import { useState, useCallback, useRef } from "react";
import { Alert, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { State } from "react-native-gesture-handler";
import { usePhotoContext } from "../contexts/PhotoContext";

const { width } = Dimensions.get("window");

export default function usePhotoManagement(bottomSheetRef) {
  const { photos, deletePhotos } = usePhotoContext();
  const [selectedPhotos, setSelectedPhotos] = useState({});
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const selectionStartRef = useRef(null);
  const lastSelectedIndexRef = useRef(-1);
  const scrollOffsetRef = useRef(0);

  const handlePhotoPress = useCallback(
    (photo, index, navigateToFullScreen) => {
      if (isSelectionMode) {
        togglePhotoSelection(photo.id, index);
      } else {
        navigateToFullScreen(photo);
      }
    },
    [isSelectionMode]
  );

  const handleLongPress = useCallback((photo, index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSelectionMode(true);
    setSelectedPhotos({ [photo.id]: true });
    selectionStartRef.current = index;
    lastSelectedIndexRef.current = index;
    bottomSheetRef.current?.expand();
  }, []);

  const togglePhotoSelection = useCallback((photoId, index) => {
    setSelectedPhotos((prev) => {
      const newSelection = { ...prev };
      if (photoId in newSelection) {
        delete newSelection[photoId];
        if (Object.keys(newSelection).length === 0) {
          setIsSelectionMode(false);
          bottomSheetRef.current?.close();
        }
      } else {
        newSelection[photoId] = true;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      return newSelection;
    });
    lastSelectedIndexRef.current = index;
  }, []);

  const updateSelection = useCallback(
    (startIndex, endIndex) => {
      const start = Math.min(startIndex, endIndex);
      const end = Math.max(startIndex, endIndex);

      setSelectedPhotos((prevSelected) => {
        const newSelection = { ...prevSelected };
        let selectionChanged = false;

        for (let i = start; i <= end; i++) {
          if (i >= 0 && i < photos.length) {
            const photoId = photos[i].id;
            if (!(photoId in newSelection)) {
              newSelection[photoId] = true;
              selectionChanged = true;
            }
          }
        }

        Object.keys(prevSelected).forEach((photoId) => {
          const index = photos.findIndex((photo) => photo.id === photoId);
          if (index < start || index > end) {
            delete newSelection[photoId];
            selectionChanged = true;
          }
        });

        if (selectionChanged) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        return newSelection;
      });
    },
    [photos]
  );

  const handleGesture = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.state === State.ACTIVE && isSelectionMode) {
        const photoWidth = width / 3;
        const currentIndex =
          Math.floor(nativeEvent.x / photoWidth) +
          Math.floor((nativeEvent.y + scrollOffsetRef.current) / photoWidth) *
            3;

        if (currentIndex >= 0 && currentIndex < photos.length) {
          updateSelection(selectionStartRef.current, currentIndex);
        }
      }
    },
    [photos, updateSelection, isSelectionMode]
  );

  const handleScroll = useCallback((event) => {
    scrollOffsetRef.current = event.nativeEvent.contentOffset.y;
  }, []);

  const deleteSelectedPhotos = useCallback(async () => {
    try {
      await deletePhotos(Object.keys(selectedPhotos));
      setSelectedPhotos({});
      setIsSelectionMode(false);
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error("Error deleting photos:", error);
      Alert.alert("Error", "Failed to delete photos");
    }
  }, [selectedPhotos, deletePhotos]);

  const saveSelectedPhotos = useCallback(async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "This app needs permission to save photos to your device."
        );
        return;
      }

      await Promise.all(
        Object.keys(selectedPhotos).map((photoId) => {
          const photo = photos.find((p) => p.id === photoId);
          return photo ? MediaLibrary.createAssetAsync(photo.uri) : null;
        })
      );

      Alert.alert("Success", "Selected photos have been saved to your device");
      setSelectedPhotos({});
      setIsSelectionMode(false);
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error("Error saving photos:", error);
      Alert.alert("Error", "Failed to save photos to device");
    }
  }, [photos, selectedPhotos]);

  const cancelSelection = useCallback(() => {
    setSelectedPhotos({});
    setIsSelectionMode(false);
    selectionStartRef.current = null;
    lastSelectedIndexRef.current = -1;
  }, []);

  const selectAllPhotos = useCallback(() => {
    const allSelected = photos.reduce((acc, photo) => {
      acc[photo.id] = true;
      return acc;
    }, {});
    setSelectedPhotos(allSelected);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [photos]);

  return {
    photos,
    selectedPhotos,
    isSelectionMode,
    handlePhotoPress,
    handleLongPress,
    handleGesture,
    handleScroll,
    selectAllPhotos,
    deleteSelectedPhotos,
    saveSelectedPhotos,
    cancelSelection,
    setIsSelectionMode,
    setSelectedPhotos,
  };
}
