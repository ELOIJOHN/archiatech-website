// Webhook n8n qui reçoit le formulaire de contact, l'archive et envoie l'email à contact@archiatech.com.
// Surchargeable via VITE_CONTACT_WEBHOOK_URL (voir .env.example).
export const CONTACT_WEBHOOK_URL =
  import.meta.env.VITE_CONTACT_WEBHOOK_URL || 'https://n8n.archiatech.com/webhook/archiatech-contact';

// Webhook n8n du guide gratuit : enregistre l'inscrit (avec son consentement) et lui envoie la checklist par e-mail.
export const GUIDE_WEBHOOK_URL =
  import.meta.env.VITE_GUIDE_WEBHOOK_URL || 'https://n8n.archiatech.com/webhook/archiatech-guide';
