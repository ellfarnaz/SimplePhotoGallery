import React, { createContext, useState, useContext, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PhotoContext = createContext();

export const usePhotoContext = () => useContext(PhotoContext);

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  const loadPhotos = useCallback(async () => {
    try {
      const savedPhotos = await AsyncStorage.getItem("photos");
      if (savedPhotos !== null) {
        setPhotos(JSON.parse(savedPhotos));
      }
    } catch (error) {
      console.error("Error loading photos:", error);
    }
  }, []);

  const addPhoto = useCallback(
    async (newPhoto) => {
      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      try {
        await AsyncStorage.setItem("photos", JSON.stringify(updatedPhotos));
      } catch (error) {
        console.error("Error saving new photo:", error);
      }
    },
    [photos]
  );

  const deletePhotos = useCallback(
    async (photoIdsToDelete) => {
      const updatedPhotos = photos.filter(
        (photo) => !photoIdsToDelete.includes(photo.id)
      );
      setPhotos(updatedPhotos);
      try {
        await AsyncStorage.setItem("photos", JSON.stringify(updatedPhotos));
      } catch (error) {
        console.error("Error deleting photos:", error);
      }
    },
    [photos]
  );

  return (
    <PhotoContext.Provider
      value={{ photos, loadPhotos, addPhoto, deletePhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};
