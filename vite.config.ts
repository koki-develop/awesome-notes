import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/app.tsx',
          filename: 'app.html',
          template: 'app.html',
        },
        {
          entry: 'src/popup.tsx',
          filename: 'popup.html',
          template: 'popup.html',
        },
      ],
    }),
  ],
});
