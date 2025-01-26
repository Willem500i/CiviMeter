import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchUserCoins, fetchGiftCards } from "../services/api";
import { getUserId } from "../services/utils";
import styles from "../styles";

interface GiftCard {
  name: string;
  value: number;
  imageUrl: string;
  coinCost: number;
  website: string;
}

export default function RedeemScreen() {
  const [coins, setCoins] = useState<number>(0);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          setLoading(true);
          try {
            const coinsResponse = await fetchUserCoins(userId);
            setCoins(coinsResponse.data.coins);

            const giftCardsResponse = await fetchGiftCards();
            setGiftCards(giftCardsResponse.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        }
      }
      fetchData();
    }, [userId]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={[styles.loadingText, styles.centerText]}>
          Loading rewards...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.redeemContainer}>
      <Text style={styles.coinsText}>Coins: {coins}</Text>
      {giftCards.map((giftCard, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image
            source={{ uri: giftCard.imageUrl }}
            style={styles.redeemImage}
          />
          <Text style={styles.redeemText}>{giftCard.name}</Text>
          <Text style={styles.redeemText}>Value: ${giftCard.value}</Text>
          <Text style={styles.redeemText}>Cost: {giftCard.coinCost} coins</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(giftCard.website)}
          >
            Visit Website
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
