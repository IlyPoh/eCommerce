import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@config': '/src/config',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@customTypes': '/src/types',
      '@utils': '/src/utils',
    },
  },
  plugins: [react()],
  server: {
    port: 8888,
  },
});
