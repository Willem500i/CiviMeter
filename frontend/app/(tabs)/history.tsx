import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchHistory } from "../services/api";
import { getUserId } from "../services/utils";
import styles from "../styles";

interface HistoryEntry {
  licensePlate: string;
  description: string;
  coinsAwarded: number;
  imageUrl: string;
  confidence: number;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserId() {
      const id = await getUserId();
      setUserId(id);
    }
    fetchUserId();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        if (userId) {
          const response = await fetchHistory(userId);
          setHistory(response.data);
        }
      }
      fetchData();
    }, [userId]),
  );

  return (
    <ScrollView contentContainerStyle={styles.historyContainer}>
      {history.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Image source={{ uri: entry.imageUrl }} style={styles.historyImage} />
          <Text style={styles.historyText}>
            License Plate: {entry.licensePlate}
          </Text>
          <Text style={styles.historyText}>
            Description: {entry.description}
          </Text>
          <Text style={styles.historyText}>
            Coins Awarded: {entry.coinsAwarded}
          </Text>
          <Text style={styles.historyText}>Confidence: {entry.confidence}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
