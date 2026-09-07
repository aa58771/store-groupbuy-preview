import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/store-groupbuy-preview/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
