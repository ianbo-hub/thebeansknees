import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 8+ uses rolldown, which requires manualChunks as a function (not an object).
// import.meta.dirname replaces __dirname for ESM compatibility in Vite 8+.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // rolldown (Vite 8) requires manualChunks as a function, not a plain object
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/react-helmet-async/')
          ) return 'vendor'
          if (id.includes('node_modules/gsap/'))  return 'gsap'
          if (id.includes('node_modules/lenis/')) return 'lenis'
        },
      },
    },
    target:    'es2015',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
})
