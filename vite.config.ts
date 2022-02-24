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
          template: 'src/templates/app.html',
          filename: 'app.html',
        },
        {
          entry: 'src/popup.tsx',
          template: 'src/templates/popup.html',
          filename: 'popup.html',
        },
      ],
    }),
  ],
});
