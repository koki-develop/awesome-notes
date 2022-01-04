import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'app.html'),
        popup: path.resolve(__dirname, 'popup.html'),
      },
    },
  },
  plugins: [react()],
});
