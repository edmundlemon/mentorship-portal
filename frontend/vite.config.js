import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from outside container
    port: 3005,
    strictPort: true,
    watch: {
      usePolling: true, // Necessary for file watching in Docker
    },
    proxy: {
      // Proxy API requests to the Laravel backend during development
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
