import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { fetchHistory } from "../services/api";
import { getUserId } from "../services/utils";

interface HistoryEntry {
  licensePlate: string;
  description: string;
  isSafetyHazard: boolean;
  coinsAwarded: number;
  imageUrl: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserIdAndHistory() {
      const id = await getUserId();
      setUserId(id);
      if (id) {
        const response = await fetchHistory(id);
        setHistory(response.data);
      }
    }
    fetchUserIdAndHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {history.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Image source={{ uri: entry.imageUrl }} style={styles.image} />
          <Text style={styles.text}>License Plate: {entry.licensePlate}</Text>
          <Text style={styles.text}>Description: {entry.description}</Text>
          <Text style={styles.text}>
            Safety Hazard: {entry.isSafetyHazard ? "Yes" : "No"}
          </Text>
          <Text style={styles.text}>Coins Awarded: {entry.coinsAwarded}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#000", // Set background color to black for better contrast
  },
  entryContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#333", // Set background color to dark gray for better contrast
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff", // Set text color to white
  },
});
