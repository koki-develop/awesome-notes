import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, "src/app.html"),
        popup: path.resolve(__dirname, "src/popup.html"),
      },
    },
  },
  plugins: [react()],
});
