import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://krysskross.test',
        changeOrigin: true,
        secure: false, // Accept self-signed Valet certificate
      },
      '/admin': {
        target: 'https://krysskross.test',
        changeOrigin: true,
        secure: false, // Accept self-signed Valet certificate
      },
    },
  },
  build: {
    outDir: '../backend/public/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: '/src/main.tsx',
    },
  },
})
