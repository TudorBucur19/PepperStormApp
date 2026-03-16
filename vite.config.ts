import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["assets/pepperstorm_logo_black.svg"],
      manifest: {
        name: "PepperStorm",
        short_name: "PepperStorm",
        description: "PepperStorm recipes and ideas",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/assets/pepperstorm_logo_black_png.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/pepperstorm_logo_black_png.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/pepperstorm_logo_black_png.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    include: ["src/test/**/*.{test,spec}.{ts,tsx}"],
  },
});
