import path from "path";

import { defineConfig } from "vite";
import legacyPlugin from "@vitejs/plugin-legacy";

export default defineConfig({
  build: { sourcemap: true },
  plugins: [legacyPlugin()],
  resolve: { alias: { "~": path.resolve(__dirname, "./src") } },
  test: {
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
    environment: "jsdom",
  },
});
