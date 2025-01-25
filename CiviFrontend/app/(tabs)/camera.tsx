import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { uploadPhoto } from "../services/api";
import { getUserId } from "../services/utils";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

export default function CameraScreen({ onClose }: { onClose: () => void }) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    async function fetchUserId() {
      const id = await getUserId();
      setUserId(id);
    }
    fetchUserId();

    async function fetchLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationData = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });
      }
    }
    fetchLocation();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
      });
      if (photo) {
        setPhotoUri(photo.uri);
      }
    }
  }

  async function savePhoto() {
    if (photoUri && userId && location) {
      try {
        const response = await uploadPhoto(photoUri, userId, location);
        console.log("Image uploaded successfully:", response);

        // Show success banner
        Alert.alert("Success", response.data.message);

        // Clear the photoUri to allow taking a new photo
        setPhotoUri(null);
        onClose(); // Close the camera screen after saving the photo
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }

  function retakePhoto() {
    setPhotoUri(null);
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={takePhoto}
            >
              <View style={styles.circleButton} />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Ionicons name="refresh-circle" size={70} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
              <Ionicons name="checkmark-circle" size={70} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
