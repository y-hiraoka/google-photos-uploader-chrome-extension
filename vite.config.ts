import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Google Photos Uploader",
  version: "0.0.1",
  permissions: ["contextMenus"],
  background: {
    service_worker: "src/service-worker.ts",
    type: "module",
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
