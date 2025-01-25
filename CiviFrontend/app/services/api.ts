import axios from "axios";

const USE_DUMMY_API = true; // Set this to false to use real API calls

const API_URL = "https://your-api-url.com";

interface UploadPhotoResponse {
  data: {
    message: string;
  };
}

export async function uploadPhoto(
  photoUri: string,
  userId: string,
): Promise<UploadPhotoResponse> {
  if (USE_DUMMY_API) {
    return new Promise<UploadPhotoResponse>((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Image uploaded successfully" } });
      }, 1000);
    });
  } else {
    const formData = new FormData();
    formData.append("image", {
      uri: photoUri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);
    formData.append("userId", userId);

    try {
      const response = await axios.post(`${API_URL}/api/submit`, formData);
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
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
  if (USE_DUMMY_API) {
    return new Promise<FetchHistoryResponse>((resolve) => {
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
        resolve({ data: dummyData });
      }, 1000);
    });
  } else {
    try {
      const response = await axios.post(`${API_URL}/api/history`, { userId });
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error;
    }
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
  if (USE_DUMMY_API) {
    return new Promise<FetchUserCoinsResponse>((resolve) => {
      setTimeout(() => {
        resolve({ data: { coins: 100 } });
      }, 1000);
    });
  } else {
    try {
      const response = await axios.post(`${API_URL}/api/usercoins`, { userId });
      return response.data;
    } catch (error) {
      console.error("Error fetching user coins:", error);
      throw error;
    }
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
  if (USE_DUMMY_API) {
    return new Promise<FetchGiftCardsResponse>((resolve) => {
      setTimeout(() => {
        const dummyData: GiftCard[] = [
          {
            name: "CVS",
            value: 10,
            imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=CVS",
            coinCost: 1000,
            website: "https://www.cvs.com",
          },
          {
            name: "Coke",
            value: 5,
            imageUrl: "https://via.placeholder.com/150/00FF00/000000?text=Coke",
            coinCost: 500,
            website: "https://www.coca-cola.com",
          },
          {
            name: "Amazon",
            value: 25,
            imageUrl:
              "https://via.placeholder.com/150/0000FF/808080?text=Amazon",
            coinCost: 2500,
            website: "https://www.amazon.com",
          },
          {
            name: "Steam",
            value: 20,
            imageUrl:
              "https://via.placeholder.com/150/FFFF00/000000?text=Steam",
            coinCost: 2000,
            website: "https://store.steampowered.com",
          },
          {
            name: "Lyft",
            value: 15,
            imageUrl: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Lyft",
            coinCost: 1500,
            website: "https://www.lyft.com",
          },
          {
            name: "Uber",
            value: 15,
            imageUrl: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Uber",
            coinCost: 1500,
            website: "https://www.uber.com",
          },
        ];
        resolve({ data: dummyData });
      }, 1000);
    });
  } else {
    try {
      const response = await axios.get(`${API_URL}/api/giftcards`);
      return response.data;
    } catch (error) {
      console.error("Error fetching gift cards:", error);
      throw error;
    }
  }
}
