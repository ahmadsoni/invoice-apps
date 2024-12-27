import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react-pdf', 'pdfjs-dist']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  esbuild: {
    logOverride: { 'nullish-coalescing': 'silent' },
  },
});
