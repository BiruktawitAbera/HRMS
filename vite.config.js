import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
  resolve: {
    alias: {
      '@radix-ui/react-dropdown-menu': '/node_modules/@radix-ui/react-dropdown-menu/dist/index.module.js',
      '@': path.resolve(__dirname, './src'),
    },
  },
});