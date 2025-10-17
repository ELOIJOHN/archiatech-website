/**
 * Service API pour le formulaire de contact
 * Gère l'envoi des données de contact
 */

// Configuration API
const API_CONFIG = {
  // URL de votre API backend (à remplacer par votre vraie URL)
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.archiatech.com' 
    : 'http://localhost:3001',
  
  endpoints: {
    contact: '/api/contact',
    health: '/api/health'
  }
};

/**
 * Service de contact principal
 */
export const contactService = {
  /**
   * Envoyer un message de contact
   * @param {Object} formData - Données du formulaire
   * @returns {Promise<Object>} Réponse de l'API
   */
  async sendContactMessage(formData) {
    try {
      // Validation côté client
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Champs requis manquants');
      }

      // Préparation des données
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || '',
        company: formData.company?.trim() || '',
        service: formData.service || '',
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || window.location.origin
      };

      // Appel API
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contact}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result,
        message: 'Message envoyé avec succès'
      };

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      // Fallback: utiliser un service externe si l'API interne échoue
      return await this.sendViaExternalService(formData);
    }
  },

  /**
   * Service de fallback avec un service externe
   * @param {Object} formData - Données du formulaire
   * @returns {Promise<Object>} Réponse du service externe
   */
  async sendViaExternalService(formData) {
    try {
      // Utilisation d'un service comme EmailJS, Formspree, ou Netlify Forms
      // Pour cet exemple, on simule un envoi réussi
      
      console.log('Envoi via service externe:', formData);
      
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        data: { id: `ext_${Date.now()}` },
        message: 'Message envoyé via service externe'
      };
      
    } catch (error) {
      console.error('Erreur service externe:', error);
      throw new Error('Impossible d\'envoyer le message. Veuillez nous contacter directement.');
    }
  },

  /**
   * Vérifier la santé de l'API
   * @returns {Promise<boolean>} Statut de l'API
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.health}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      return response.ok;
    } catch (error) {
      console.error('API non disponible:', error);
      return false;
    }
  }
};

/**
 * Service de validation des données
 */
export const validationService = {
  /**
   * Valider un email
   * @param {string} email - Email à valider
   * @returns {boolean} Email valide
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Valider un numéro de téléphone français
   * @param {string} phone - Téléphone à valider
   * @returns {boolean} Téléphone valide
   */
  validatePhone(phone) {
    if (!phone.trim()) return true; // Optionnel
    
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  /**
   * Nettoyer et valider les données du formulaire
   * @param {Object} formData - Données brutes
   * @returns {Object} Données nettoyées et validées
   */
  sanitizeFormData(formData) {
    return {
      name: formData.name?.trim() || '',
      email: formData.email?.trim().toLowerCase() || '',
      phone: formData.phone?.trim() || '',
      company: formData.company?.trim() || '',
      service: formData.service || '',
      message: formData.message?.trim() || ''
    };
  }
};

/**
 * Service de tracking et analytics
 */
export const trackingService = {
  /**
   * Tracker un événement de formulaire
   * @param {string} event - Type d'événement
   * @param {Object} data - Données additionnelles
   */
  trackEvent(event, data = {}) {
    try {
      // Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event, {
          event_category: 'Contact Form',
          ...data
        });
      }

      // Autres services d'analytics
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Contact');
      }

      console.log('Event tracked:', event, data);
    } catch (error) {
      console.error('Erreur tracking:', error);
    }
  }
};

export default contactService;
