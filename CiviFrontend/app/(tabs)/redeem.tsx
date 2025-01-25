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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.coinsText}>Coins: {coins}</Text>
      {giftCards.map((giftCard, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image source={{ uri: giftCard.imageUrl }} style={styles.image} />
          <Text style={styles.text}>{giftCard.name}</Text>
          <Text style={styles.text}>Value: ${giftCard.value}</Text>
          <Text style={styles.text}>Cost: {giftCard.coinCost} coins</Text>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#000", // Set background color to black for better contrast
  },
  coinsText: {
    fontSize: 20,
    color: "#fff", // Set text color to white
    marginBottom: 20,
  },
  cardContainer: {
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
  link: {
    fontSize: 16,
    color: "#1E90FF", // Set link color to blue
    textDecorationLine: "underline",
  },
});
