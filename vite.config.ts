import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { minifyHtml } from 'vite-plugin-html';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'app.html'),
        popup: path.resolve(__dirname, 'popup.html'),
      },
    },
  },
  plugins: [react(), minifyHtml()],
});
