import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Google Photos Uploader",
  version: "0.0.1",
  permissions: ["contextMenus", "identity"],
  background: {
    service_worker: "src/service-worker.ts",
    type: "module",
  },
  oauth2: {
    client_id:
      "717846666524-gtt21rppl969kauvo6d0q645baikbqat.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/photoslibrary.appendonly"],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
