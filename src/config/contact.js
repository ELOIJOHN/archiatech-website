// Webhook n8n qui reçoit le formulaire de contact, l'archive et envoie l'email à contact@archiatech.com.
// Surchargeable via VITE_CONTACT_WEBHOOK_URL (voir .env.example).
export const CONTACT_WEBHOOK_URL =
  import.meta.env.VITE_CONTACT_WEBHOOK_URL || 'https://n8n.archiatech.com/webhook/archiatech-contact';
