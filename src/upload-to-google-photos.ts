export async function uploadToGooglePhotos(src: string) {
  const oauthToken = await chrome.identity.getAuthToken({ interactive: true });

  if (!oauthToken.token) {
    throw new Error("Failed to get auth token");
  }

  const fetchedImage = await fetch(src);

  const uploadResponse = await fetch(
    "https://photoslibrary.googleapis.com/v1/uploads",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${oauthToken.token}`,
        "Content-Type": "application/octet-stream",
        "X-Goog-Upload-Content-Type":
          fetchedImage.headers.get("Content-Type") ?? "",
        "X-Goog-Upload-Protocol": "raw",
      },
      body: await fetchedImage.blob(),
    }
  );

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload to Google Photos");
  }

  const uploadToken = await uploadResponse.text();

  const createResponse = await fetch(
    "https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${oauthToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newMediaItems: [
          {
            simpleMediaItem: {
              uploadToken,
            },
          },
        ],
      }),
    }
  );

  if (!createResponse.ok) {
    throw new Error("Failed to create media item in Google Photos");
  }

  return console.log("Upload to Google Photos", await createResponse.json());
}
