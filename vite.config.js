import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Config unifiée: domaine custom via CNAME => base '/'
export default defineConfig({
  plugins: [react()],
  base: '/archiatech-website/',
  build: {
    outDir: 'dist',
  },
})
