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
