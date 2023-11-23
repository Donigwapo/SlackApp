/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
//I have currently this in my config.js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@sass': path.resolve(__dirname, 'src/sass'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@channel': path.resolve(__dirname, 'src/components/channel'),
      '@users': path.resolve(__dirname, 'src/components/users'),
      // Add more aliases as needed
    },
  },
})