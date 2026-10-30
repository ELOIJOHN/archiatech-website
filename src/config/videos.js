// Liste publique des vidéos, servie par n8n (workflow « Vidéos : liste publique »).
export const VIDEOS_API_URL =
  import.meta.env.VITE_VIDEOS_API_URL || 'https://n8n.archiatech.com/webhook/archiatech-videos';

// Liste publique de la « Veille vidéo », servie par n8n (workflow « Veille vidéo : liste publique »).
export const VEILLE_VIDEOS_API_URL =
  import.meta.env.VITE_VEILLE_VIDEOS_API_URL || 'https://n8n.archiatech.com/webhook/archiatech-veille-videos';
