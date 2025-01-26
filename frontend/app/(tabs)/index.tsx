import { ImageBackground, StyleSheet, Linking, Text } from "react-native";
import { BlurView } from "expo-blur";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import styles from "../styles";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ImageBackground
          source={{
            uri: "https://www.coloradoan.com/gcdn/presto/2023/05/01/PFTC/b0cf945f-ae99-4708-9d5d-c958fddddd2a-Parking_meter.jpg?crop=1511,850,x0,y0&width=660&height=371&format=pjpg&auto=webp",
          }}
          style={StyleSheet.absoluteFillObject}
        >
          <BlurView intensity={50} style={StyleSheet.absoluteFillObject} />
        </ImageBackground>
      }
    >
      {/* Title Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">CiviMeter</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* What We Do */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">What We Do</ThemedText>
        <ThemedText>
          CiviMeter is an app that empowers community members to report
          improperly parked cars. By submitting evidence and details of a
          parking violation, you help promote safer, more organized streets—and
          earn rewards along the way!
        </ThemedText>
      </ThemedView>

      {/* How It Works */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">How It Works</ThemedText>
        <ThemedText>
          1. Snap a photo of a poorly parked car.
          {"\n"}
          2. Our AI extracts key details like license plate and location.
          {"\n"}
          3. Submit the report and earn points instantly.
          {"\n"}
          4. Redeem your points for exciting rewards like gift cards and prizes!
        </ThemedText>
      </ThemedView>

      {/* Why It Matters */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Why It Matters</ThemedText>
        <ThemedText>
          CiviMeter encourages responsible parking habits and cleaner streets.
          By reporting problems, you contribute to safer neighborhoods and
          ensure that community resources are used effectively. As a reward for
          your hard work, you can use the parking ticket fees to earn coins,
          which can be redeemed for gift cards and other exciting prizes.
          Together, we make a positive impact—one report at a time.
        </ThemedText>
        <ThemedText>
          Several cities, including New York City, have proposed or implemented
          legislation to empower citizens to report parking violations, aiming
          to improve urban mobility and safety.
          {"\n\n"}
          <Text
            style={{ color: "blue", fontWeight: "bold" }}
            onPress={() =>
              Linking.openURL(
                "https://www.westsidespirit.com/news/bill-would-allow-new-yorkers-to-report-parking-violations-YC2235320",
              )
            }
          >
            New York City Initiatives: Proposed Citizen Reporting Program
          </Text>
          {"\n"}In 2022, Council Member Lincoln Restler introduced a bill that
          would allow New Yorkers to report illegal parking by submitting photos
          or videos to the Department of Transportation. If the report led to a
          ticket, the citizen would receive 25% of the $175 fine.
          {"\n\n"}
          <Text
            style={{ color: "blue", fontWeight: "bold" }}
            onPress={() =>
              Linking.openURL(
                "https://nyc.streetsblog.org/2023/03/03/breaking-citizen-reporting-bill-moves-forward-but-in-a-watered-down-form",
              )
            }
          >
            Program Modifications
          </Text>
          {"\n"}By 2023, the bill advanced with modifications. While the
          financial incentive was removed, the legislation focused on creating
          an app to facilitate the seamless filing of complaints for illegal
          parking behavior.
          {"\n\n"}
          <Text
            style={{ color: "blue", fontWeight: "bold" }}
            onPress={() =>
              Linking.openURL("https://ladotparking.org/parking-enforcement/")
            }
          >
            Similar Programs in Other Cities: Los Angeles
          </Text>
          {"\n"}The Los Angeles Department of Transportation (LADOT) has a
          comprehensive parking enforcement program where traffic officers
          patrol 24/7 to enforce parking laws. While not citizen-driven, it
          reflects a commitment to strict parking regulation enforcement.
          {"\n\n"}
          These initiatives demonstrate a growing trend toward involving
          citizens in urban management, particularly in reporting parking
          violations. Such programs aim to enhance compliance with parking
          regulations, improve traffic flow, and promote safer streets.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
