import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { getUserId } from "../services/utils";
import { fetchUserProfile, uploadUserProfile } from "../services/api";
import * as FileSystem from "expo-file-system";
import styles from "../styles";

const majorCities = [
  { label: "Washington DC", value: "Washington DC" },
  { label: "New York", value: "New York" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Chicago", value: "Chicago" },
  { label: "Houston", value: "Houston" },
  { label: "Phoenix", value: "Phoenix" },
  { label: "Philadelphia", value: "Philadelphia" },
  { label: "San Antonio", value: "San Antonio" },
  { label: "San Diego", value: "San Diego" },
  { label: "Dallas", value: "Dallas" },
  // Add more cities as needed
];

export default function ProfileScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [homeCity, setHomeCity] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const id = await getUserId();
      setUserId(id);

      if (id) {
        try {
          const response = await fetchUserProfile(id);
          const profile = response.data;
          setFirstName(profile.firstName);
          setLastName(profile.lastName);
          setEmail(profile.email);
          setPhoneNumber(profile.phoneNumber);
          setHomeCity(profile.homeCity);
          setProfilePicture(profile.profilePicture);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    }
    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setProfilePicture(`data:image/jpeg;base64,${base64}`);
    }
  };

  const saveProfile = async () => {
    if (userId) {
      const userProfile = {
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        homeCity,
        profilePicture,
      };
      try {
        const response = await uploadUserProfile(userProfile);
        Alert.alert("Success", "Profile uploaded successfully");
      } catch (error) {
        console.error("Error uploading user profile:", error);
        Alert.alert("Error", "Failed to save profile");
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Pick an image</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Home City</Text>
      <RNPickerSelect
        onValueChange={(value) => setHomeCity(value)}
        items={majorCities}
        style={{
          inputIOS: styles.pickerSelectStylesIOS,
          inputAndroid: styles.pickerSelectStylesIOS,
        }}
        value={homeCity}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: "Select a city", value: null }}
      />
      <Button title="Save Profile" onPress={saveProfile} />
    </ScrollView>
  );
}
