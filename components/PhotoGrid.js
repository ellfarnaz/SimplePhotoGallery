import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import PhotoItem from "./PhotoItem";

const PhotoGrid = ({
  photos,
  selectedPhotos,
  isSelectionMode,
  onPhotoPress,
  onLongPress,
  onGesture,
  onScroll,
}) => {
  const renderPhoto = ({ item, index }) => (
    <PhotoItem
      photo={item}
      index={index}
      isSelected={item.id in selectedPhotos}
      isSelectionMode={isSelectionMode}
      onPress={onPhotoPress}
      onLongPress={onLongPress}
    />
  );

  return (
    <PanGestureHandler
      onGestureEvent={onGesture}
      onHandlerStateChange={onGesture}>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.photoList}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  photoList: {
    padding: 5,
  },
});

export default PhotoGrid;
