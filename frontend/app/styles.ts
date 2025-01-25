import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Camera styles
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  takePhotoButton: {
    alignSelf: "center",
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  photoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    width: "80%",
  },
  retakeButton: {
    alignSelf: "flex-start",
  },
  saveButton: {
    alignSelf: "flex-end",
  },

  // Nearby styles
  nearbyContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtonContainer: {
    marginTop: 20,
  },
  newIncidentButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  newIncidentButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  centerButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Profile styles
  profileContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: "100%",
    color: "white",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  imagePlaceholderText: {
    color: "#fff",
  },
  pickerSelectStyles: {
    inputIOS: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      width: "100%",
      color: "white",
    },
    inputAndroid: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      width: "100%",
      color: "white",
    },
  },

  // Redeem styles
  redeemContainer: {
    padding: 20,
    paddingTop: 40, // Add padding at the top to display coin balance
    alignItems: "center",
    backgroundColor: "#000",
  },
  coinsText: {
    fontSize: 20,
    color: "#fff",
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
    backgroundColor: "#333",
  },
  redeemImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  redeemText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
  },
  link: {
    fontSize: 16,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },

  // History styles
  historyContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#000",
  },
  entryContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#333",
  },
  historyImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
  },

  // Index styles
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionContainer: {
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default styles;
