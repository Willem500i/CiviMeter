interface UploadPhotoResponse {
  data: {
    message: string;
  };
}

export async function uploadPhoto(
  photoUri: string,
  userId: string,
): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append("image", {
    uri: photoUri,
    type: "image/jpeg",
    name: "photo.jpg",
  } as any); // Cast to any to bypass type checking
  formData.append("userId", userId);

  try {
    // Log the image information and user ID
    console.log("Uploading photo with URI:", photoUri);
    console.log("User ID:", userId);

    // Simulate an API call with dummy data
    const response = await new Promise<UploadPhotoResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: "Image uploaded successfully",
          },
        });
      }, 1000);
    });

    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

interface HistoryEntry {
  licensePlate: string;
  description: string;
  isSafetyHazard: boolean;
  coinsAwarded: number;
  imageUrl: string;
}

interface FetchHistoryResponse {
  data: HistoryEntry[];
}

export async function fetchHistory(
  userId: string,
): Promise<FetchHistoryResponse> {
  try {
    // Log the user ID
    console.log("Fetching history for User ID:", userId);

    // Simulate an API call with dummy data
    const response = await new Promise<FetchHistoryResponse>((resolve) => {
      setTimeout(() => {
        const dummyData: HistoryEntry[] = [
          {
            licensePlate: "ABC123",
            description: "Parked in a no-parking zone",
            isSafetyHazard: false,
            coinsAwarded: 10,
            imageUrl:
              "https://via.placeholder.com/150/0000FF/808080?text=No+Parking",
          },
          {
            licensePlate: "XYZ789",
            description: "Blocking a fire hydrant",
            isSafetyHazard: true,
            coinsAwarded: 20,
            imageUrl:
              "https://via.placeholder.com/150/FF0000/FFFFFF?text=Fire+Hydrant",
          },
          {
            licensePlate: "LMN456",
            description: "Double parked",
            isSafetyHazard: false,
            coinsAwarded: 15,
            imageUrl:
              "https://via.placeholder.com/150/00FF00/000000?text=Double+Parked",
          },
        ];

        // Randomize the order of the entries
        const randomizedData = dummyData.sort(() => Math.random() - 0.5);

        resolve({ data: randomizedData });
      }, 1000);
    });

    return response;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
}

interface FetchUserCoinsResponse {
  data: {
    coins: number;
  };
}

export async function fetchUserCoins(
  userId: string,
): Promise<FetchUserCoinsResponse> {
  try {
    // Log the user ID
    console.log("Fetching coins for User ID:", userId);

    // Simulate an API call with dummy data
    const response = await new Promise<FetchUserCoinsResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            coins: 100, // Dummy value for coins
          },
        });
      }, 1000);
    });

    return response;
  } catch (error) {
    console.error("Error fetching user coins:", error);
    throw error;
  }
}

interface GiftCard {
  name: string;
  value: number;
  imageUrl: string;
  coinCost: number;
  website: string;
}

interface FetchGiftCardsResponse {
  data: GiftCard[];
}

export async function fetchGiftCards(): Promise<FetchGiftCardsResponse> {
  try {
    // Simulate an API call with dummy data
    const response = await new Promise<FetchGiftCardsResponse>((resolve) => {
      setTimeout(() => {
        const dummyData: GiftCard[] = [
          {
            name: "CVS",
            value: 10,
            imageUrl: "https://media.gamestop.com/i/gamestop/10116382?$pdp$",
            coinCost: 1000,
            website: "https://www.cvs.com",
          },
          {
            name: "Coke",
            value: 5,
            imageUrl: "https://media.gamestop.com/i/gamestop/10116382?$pdp$",
            coinCost: 500,
            website: "https://www.coca-cola.com",
          },
          {
            name: "Amazon",
            value: 25,
            imageUrl: "https://media.gamestop.com/i/gamestop/10116382?$pdp$",
            coinCost: 2500,
            website: "https://www.amazon.com",
          },
          {
            name: "Steam",
            value: 20,
            imageUrl: "https://media.gamestop.com/i/gamestop/10116382?$pdp$",
            coinCost: 2000,
            website: "https://store.steampowered.com",
          },
          {
            name: "Lyft",
            value: 15,
            imageUrl: "https://media.gamestop.com/i/gamestop/10116382?$pdp$",
            coinCost: 1500,
            website: "https://www.lyft.com",
          },
          {
            name: "Uber",
            value: 15,
            imageUrl: "https://media.gamestop.com/i/gamestop/10116382?$pdp$",
            coinCost: 1500,
            website: "https://www.uber.com",
          },
        ];

        resolve({ data: dummyData });
      }, 1000);
    });

    return response;
  } catch (error) {
    console.error("Error fetching gift cards:", error);
    throw error;
  }
}
