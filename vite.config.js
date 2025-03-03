import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import linaria from "vite-plugin-linaria";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: { clientsClaim: true, skipWaiting: true }
    }),
    linaria({
      babelOptions: {
        presets: ["@linaria"]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 2000
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/app")
    }
  }
});
