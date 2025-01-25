import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [type, setType] = useState(CameraType.back);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<typeof Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const saveImage = async () => {
    if (capturedImage) {
      try {
        await MediaLibrary.createAssetAsync(capturedImage);
        alert("Picture saved to your gallery!");
        setCapturedImage(null);
      } catch (error) {
        console.error("Error saving picture:", error);
      }
    }
  };

  const toggleCameraType = () => {
    setType((currentType) =>
      currentType === CameraType.back ? CameraType.front : CameraType.back,
    );
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <Modal
        animationType="slide"
        transparent={false}
        visible={!!capturedImage}
      >
        <View style={styles.modalContainer}>
          {capturedImage && (
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={saveImage}>
            <Text style={styles.text}>Save Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCapturedImage(null)}
          >
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  capturedImage: {
    width: "90%",
    height: "50%",
  },
});
