// Liste publique des actualités validées, servie par n8n (workflow « Actualités : liste publique »).
// Surchargeable via VITE_NEWS_API_URL (voir .env.example).
export const NEWS_API_URL =
  import.meta.env.VITE_NEWS_API_URL || 'https://n8n.archiatech.com/webhook/archiatech-actualites';
