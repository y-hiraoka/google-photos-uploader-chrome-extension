const CONTEXT_MENU_ID = "upload-to-google-photos";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Googleフォトにアップロード",
    contexts: ["image", "video"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    console.log("Upload to Google Photos", info);
  }
});
