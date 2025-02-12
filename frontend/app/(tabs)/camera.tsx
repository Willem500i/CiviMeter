import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { uploadPhoto } from "../services/api";
import { getUserId } from "../services/utils";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

export default function CameraScreen({
  onClose = () => {},
  incidentId = 0,
}: {
  onClose?: () => void;
  incidentId?: number;
}) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
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
        console.log("photoUri:", photoUri);
        console.log("userId:", userId);
        console.log("location:", location);
        console.log("incidentId:", incidentId);

        const response = await uploadPhoto(
          photoUri,
          userId,
          { latitude: location.latitude, longitude: location.longitude },
          incidentId,
        );
        console.log("Image uploaded successfully:", response);

        // Show success banner
        Alert.alert("Success", "Image uploaded successfully");

        // Clear the photoUri to allow taking a new photo
        setPhotoUri(null);
        onClose(); // Close the camera screen after saving the photo
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  }

  async function saveToCameraRoll() {
    if (photoUri) {
      try {
        const asset = await MediaLibrary.createAssetAsync(photoUri);
        await MediaLibrary.createAlbumAsync("Camera", asset, false);
        Alert.alert("Success", "Image saved to camera roll");
      } catch (error) {
        console.error("Error saving image to camera roll:", error);
        Alert.alert("Error", "Failed to save image to camera roll");
      }
    }
  }

  function retakePhoto() {
    setPhotoUri(null);
  }

  function handleClose() {
    setPhotoUri(null);
    onClose();
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
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
          <TouchableOpacity
            style={styles.saveImageButton}
            onPress={saveToCameraRoll}
            disabled={uploading}
          >
            <Ionicons name="arrow-down-circle" size={70} color="white" />
          </TouchableOpacity>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={retakePhoto}
              disabled={uploading}
            >
              <Ionicons name="refresh-circle" size={70} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                setUploading(true);
                savePhoto();
              }}
              disabled={uploading}
            >
              <Ionicons name="checkmark-circle" size={70} color="white" />
            </TouchableOpacity>
          </View>
          {uploading && (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={styles.uploadingIndicator}
            />
          )}
        </View>
      )}
    </View>
  );
}
