# Photo Gallery Application

The Photo Gallery Application is a mobile app that allows users to easily and intuitively view, capture, manage, and save their photos.

<div align="center">
   <img src="https://i.ibb.co.com/D91kBdK/Whats-App-Image-2024-07-18-at-15-02-41.jpg" alt="App Screenshot" width="250" >
   <img src="https://i.ibb.co.com/VqDps3h/Whats-App-Image-2024-07-18-at-15-02-42.jpg" alt="App Screenshot" width="250" >
   <img src="https://i.ibb.co.com/Bgy23N0/Whats-App-Image-2024-07-18-at-15-02-41-1.jpg" alt="App Screenshot" width="250">
</div>

## Key Features

- 📸 Capture photos using the device camera
- 🖼️ Display photo gallery in a grid layout
- ✅ Multi-photo selection with gestures
- 🗑️ Delete selected photos
- 💾 Save photos to the device gallery
- 🔍 Full-screen photo view
- 📊 Bottom sheet for additional options

## Technologies Used

- React Native
- Expo
- React Navigation
- @gorhom/bottom-sheet
- react-native-gesture-handler
- expo-camera
- expo-file-system
- @react-native-async-storage/async-storage
- expo-media-library
- expo-haptics

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ellfarnaz/SimplePhotoGallery.git
   ```
2. Change into the project directory:
   ```bash
   cd SimplePhotoGallery
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the Expo project:
   ```bash
   npx expo start
   ```


## Usage
- Open the app to view your photo gallery.
- Tap the camera button to take a new photo.
- Long press on a photo to enter selection mode.
- Use gestures to select multiple photos at once.
- Use options in the bottom sheet to delete or save selected photos.
- Tap on a photo to view it in full-screen mode.

## Project Structure

```plaintext
SimplePhotoGallery/
├── App.js
├── screens/
│ ├── HomeScreen.js
│ ├── CameraScreen.js
│ └── FullScreenPhotoScreen.js
├── components/
│ ├── PhotoItem.js
│ ├── PhotoGrid.js
│ ├── CameraButton.js
│ └── BottomSheetContent.js
├── hooks/
│ └── usePhotoManagement.js
├── contexts/
│ └── PhotoContext.js
└── README.md
```

## Key Components

1. App.js: Main component that manages navigation.
2. HomeScreen.js: Main screen that displays the photo gallery.
3. CameraScreen.js: Screen for taking new photos.
4. FullScreenPhotoScreen.js: Screen for displaying photos in full size.
5. PhotoGrid.js: Component for displaying the photo grid.
6. usePhotoManagement.js: Custom hook for photo management logic.

## Contribution

Contributions are always welcome. For major changes, please open an issue first to discuss what you would like to change.


