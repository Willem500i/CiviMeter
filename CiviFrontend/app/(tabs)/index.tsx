import { Image } from "react-native";

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
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
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
      </ThemedView>
    </ParallaxScrollView>
  );
}
