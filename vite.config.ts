import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import path from 'path';


export default defineConfig({
<<<<<<< HEAD
    base: '/',
=======
    base: '/e-commerce/',
>>>>>>> 3fa3e7672b2c8292f9e4a076ce8d3485e9b871d5
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
});