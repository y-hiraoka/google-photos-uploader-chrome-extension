import { uploadToGooglePhotos } from "./upload-to-google-photos";

const CONTEXT_MENU_ID = "upload-to-google-photos";

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Googleフォトにアップロード",
    contexts: ["image", "video"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === CONTEXT_MENU_ID && info.srcUrl) {
    uploadToGooglePhotos(info.srcUrl);
  }
});

chrome.identity
  .getAuthToken({ interactive: true })
  .then((token) => {
    console.log("OAuth Token: ", token);
  })
  .catch((error) => {
    console.error("Failed to get auth token: ", error);
  });
