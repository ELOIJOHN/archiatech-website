import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configuration du build pour GitHub Pages + Cloudflare
export default defineConfig({
  plugins: [react()],
  base: '/', // Utilise '/' car ton domaine est personnalisé (Cloudflare)
  build: {
    outDir: 'dist', // le dossier de sortie du build
  },
})