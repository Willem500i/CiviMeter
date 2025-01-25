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
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";

export default function NearbyScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [incidentId, setIncidentId] = useState(0);
  const mapRef = useRef(null);

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
    setIncidentId(0); // New incidents have ID 0
    setShowCamera(true);
  };

  const handleReportIncident = (id) => {
    setIncidentId(id); // Set the incident ID for existing incidents
    setSelectedLocation(null); // Close the popup
    setShowCamera(true);
  };

  const centerMapOnUser = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
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
          ref={mapRef}
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
            <View style={styles.modalButtonContainer}>
              <Button
                title="Report Incident"
                onPress={() => handleReportIncident(selectedLocation.id)}
              />
              <Button title="Close" onPress={() => setSelectedLocation(null)} />
            </View>
          </View>
        </Modal>
      )}
      <TouchableOpacity
        style={styles.newIncidentButton}
        onPress={handleNewIncident}
      >
        <Text style={styles.newIncidentButtonText}>+</Text>
      </TouchableOpacity>
      {showCamera && (
        <CameraScreen
          onClose={() => setShowCamera(false)}
          incidentId={incidentId}
        />
      )}
      {!showCamera && (
        <TouchableOpacity style={styles.centerButton} onPress={centerMapOnUser}>
          <Ionicons name="locate" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
