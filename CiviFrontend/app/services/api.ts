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
              "https://media.istockphoto.com/id/480652712/photo/dealer-new-cars-stock.jpg?s=612x612&w=0&k=20&c=Mzfb5oEeovQblEo160df-xFxfd6dGoLBkqjjDWQbd5E=",
          },
          {
            licensePlate: "XYZ789",
            description: "Blocking a fire hydrant",
            isSafetyHazard: true,
            coinsAwarded: 20,
            imageUrl:
              "https://media.istockphoto.com/id/480652712/photo/dealer-new-cars-stock.jpg?s=612x612&w=0&k=20&c=Mzfb5oEeovQblEo160df-xFxfd6dGoLBkqjjDWQbd5E=",
          },
          {
            licensePlate: "LMN456",
            description: "Double parked",
            isSafetyHazard: false,
            coinsAwarded: 15,
            imageUrl:
              "https://media.istockphoto.com/id/480652712/photo/dealer-new-cars-stock.jpg?s=612x612&w=0&k=20&c=Mzfb5oEeovQblEo160df-xFxfd6dGoLBkqjjDWQbd5E=",
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
