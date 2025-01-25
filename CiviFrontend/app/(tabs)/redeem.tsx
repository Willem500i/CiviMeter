import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
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
          const coinsResponse = await fetchUserCoins(userId);
          setCoins(coinsResponse.data.coins);

          const giftCardsResponse = await fetchGiftCards();
          setGiftCards(giftCardsResponse.data);
        }
      }
      fetchData();
    }, [userId]),
  );

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
