import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as ExpoLocation from "expo-location";
import { fetchLocations } from "../services/api";
import CameraScreen from "./camera";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";

type CustomLocation = {
  index: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  coinPrize: number;
};

export default function NearbyScreen() {
  const [location, setLocation] =
    useState<ExpoLocation.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locations, setLocations] = useState<CustomLocation[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<CustomLocation | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [incidentId, setIncidentId] = useState(0);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({});
      setLocation(location.coords);

      const response = await fetchLocations();
      setLocations(response.data);
      setLoading(false);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const response = await fetchLocations();
        setLocations(response.data);
      }
      fetchData();
    }, []),
  );

  const handleNewIncident = async () => {
    setIncidentId(0); // New incidents have ID 0
    setShowCamera(true);
  };

  const handleReportIncident = (index: number): void => {
    setIncidentId(index); // Set the incident ID for existing incidents
    setSelectedLocation(null); // Close the popup
    setShowCamera(true);
  };

  const centerMapOnUser = async () => {
    let location = await ExpoLocation.getCurrentPositionAsync({});
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : location ? (
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
              key={`${location.index}-${location.title}-${location.latitude}-${location.longitude}`}
              coordinate={{
                latitude: Number(location.latitude),
                longitude: Number(location.longitude),
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
              Bounty: {selectedLocation.coinPrize}
            </Text>
            <View style={styles.modalButtonContainer}>
              <Button
                title="Report Incident"
                onPress={() => handleReportIncident(selectedLocation.index)}
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
