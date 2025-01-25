import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { fetchLocations, uploadPhoto } from "../services/api";
import { getUserId } from "../services/utils";
import CameraScreen from "./camera";

export default function NearbyScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      const response = await fetchLocations();
      setLocations(response.data);

      const id = await getUserId();
      setUserId(id);
    })();
  }, []);

  const handleNewIncident = async () => {
    setShowCamera(true);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="This is your current location"
            pinColor="blue"
          />
          {locations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.title}
              description={location.description}
              onPress={() => setSelectedLocation(location)}
            />
          ))}
        </MapView>
      ) : (
        <Text>{text}</Text>
      )}
      {selectedLocation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedLocation}
          onRequestClose={() => setSelectedLocation(null)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedLocation.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedLocation.description}
            </Text>
            <Text style={styles.modalDescription}>
              Coin Prize: {selectedLocation.coinPrize}
            </Text>
            <Button
              title="Report Incident"
              onPress={() => handleReportIncident(selectedLocation.id)}
            />
            <Button title="Close" onPress={() => setSelectedLocation(null)} />
          </View>
        </Modal>
      )}
      <TouchableOpacity
        style={styles.newIncidentButton}
        onPress={handleNewIncident}
      >
        <Text style={styles.newIncidentButtonText}>+</Text>
      </TouchableOpacity>
      {showCamera && <CameraScreen onClose={() => setShowCamera(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
  newIncidentButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  newIncidentButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
