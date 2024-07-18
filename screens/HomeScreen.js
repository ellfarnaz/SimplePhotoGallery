import React, { useRef, useCallback, useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import usePhotoManagement from "../hooks/usePhotoManagement";
import PhotoGrid from "../components/PhotoGrid";
import CameraButton from "../components/CameraButton";
import BottomSheetContent from "../components/BottomSheetContent";
import { usePhotoContext } from "../contexts/PhotoContext";

export default function HomeScreen({ navigation }) {
  const bottomSheetRef = useRef(null);
  const { loadPhotos } = usePhotoContext();

  const {
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
  } = usePhotoManagement(bottomSheetRef);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handlePhotoNavigation = useCallback(
    (photo) => {
      navigation.navigate("FullScreenPhoto", { photoUri: photo.uri });
    },
    [navigation]
  );

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        setIsSelectionMode(false);
        setSelectedPhotos({});
      }
    },
    [setIsSelectionMode, setSelectedPhotos]
  );

  const snapPoints = useMemo(() => ["15%", "45%"], []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PhotoGrid
          photos={photos}
          selectedPhotos={selectedPhotos}
          isSelectionMode={isSelectionMode}
          onPhotoPress={(photo, index) =>
            handlePhotoPress(photo, index, handlePhotoNavigation)
          }
          onLongPress={handleLongPress}
          onGesture={handleGesture}
          onScroll={handleScroll}
        />
        {!isSelectionMode && (
          <CameraButton onPress={() => navigation.navigate("Camera")} />
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
          animateOnMount={false}
          animationDuration={250}
          animationEasing="easeInOutCubic">
          <BottomSheetContent
            selectedCount={Object.keys(selectedPhotos).length}
            onSelectAll={selectAllPhotos}
            onDelete={deleteSelectedPhotos}
            onSave={saveSelectedPhotos}
            onCancel={() => bottomSheetRef.current?.close()}
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomSheetBackground: {
    backgroundColor: "gray",
  },
  bottomSheetIndicator: {
    backgroundColor: "#FFFFFF",
    width: 50,
  },
});
