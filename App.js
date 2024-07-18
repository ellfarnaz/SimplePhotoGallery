import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PhotoProvider } from "./contexts/PhotoContext";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import FullScreenPhoto from "./screens/FullScreenPhotoScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PhotoProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Gallery"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{ headerTransparent: true }}
          />
          <Stack.Screen
            name="FullScreenPhoto"
            component={FullScreenPhoto}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PhotoProvider>
  );
}
