import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // Set to 5000
    host: '0.0.0.0',
  },
});
