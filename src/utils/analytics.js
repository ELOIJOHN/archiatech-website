/**
 * Google Analytics 4 - Event Tracking Utilities
 * ArchiAtech Website Analytics
 */

/**
 * Envoie un événement à Google Analytics 4
 * @param {string} eventName - Nom de l'événement
 * @param {Object} eventParams - Paramètres supplémentaires
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      // Ajouter des paramètres par défaut
      send_to: 'G-XXXXXXXXXX', // Remplacer par votre ID GA4
      timestamp: new Date().toISOString(),
    });
    
    // Log en développement
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 GA4 Event:', eventName, eventParams);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Google Analytics non disponible');
  }
};

/**
 * Track une page view
 * @param {string} path - Chemin de la page
 * @param {string} title - Titre de la page
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Événements prédéfinis pour ArchiAtech
 */
export const GA_EVENTS = {
  // ===== NAVIGATION =====
  
  /**
   * Clic sur un lien du menu de navigation
   */
  clickNavigation: (linkName) => trackEvent('click_navigation', {
    link_name: linkName,
    event_category: 'Navigation',
  }),

  /**
   * Scroll vers une section
   */
  scrollToSection: (sectionName) => trackEvent('scroll_to_section', {
    section_name: sectionName,
    event_category: 'Navigation',
  }),

  // ===== SERVICES =====
  
  /**
   * Clic sur une carte de service
   */
  clickService: (serviceName) => trackEvent('click_service', {
    service_name: serviceName,
    event_category: 'Services',
  }),

  /**
   * Lecture d'une vidéo de service
   */
  playServiceVideo: (serviceName, videoUrl) => trackEvent('play_video', {
    service_name: serviceName,
    video_url: videoUrl,
    event_category: 'Services',
    event_label: 'Video Play',
  }),

  /**
   * Ouverture du modal vidéo
   */
  openVideoModal: (serviceName) => trackEvent('open_video_modal', {
    service_name: serviceName,
    event_category: 'Services',
  }),

  // ===== CTA (Call-to-Action) =====
  
  /**
   * Clic sur un bouton CTA principal
   */
  clickCTA: (ctaName, ctaLocation = '') => trackEvent('click_cta', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    event_category: 'CTA',
  }),

  /**
   * Clic sur "Découvrir nos services"
   */
  clickDiscoverServices: () => trackEvent('click_discover_services', {
    event_category: 'CTA',
    event_label: 'Hero Section',
  }),

  /**
   * Clic sur "Notre approche"
   */
  clickOurApproach: () => trackEvent('click_our_approach', {
    event_category: 'CTA',
    event_label: 'Hero Section',
  }),

  /**
   * Clic sur "Veille IA"
   */
  clickAIWatch: () => trackEvent('click_ai_watch', {
    event_category: 'CTA',
    event_label: 'Hero Section',
  }),

  // ===== FORMULAIRE CONTACT =====
  
  /**
   * Focus sur un champ du formulaire
   */
  focusContactField: (fieldName) => trackEvent('focus_contact_field', {
    field_name: fieldName,
    event_category: 'Contact Form',
  }),

  /**
   * Soumission du formulaire de contact
   */
  submitContactForm: (formData = {}) => trackEvent('submit_contact_form', {
    event_category: 'Contact Form',
    event_label: 'Form Submitted',
    form_fields: Object.keys(formData).length,
  }),

  /**
   * Erreur de validation du formulaire
   */
  contactFormError: (errorType) => trackEvent('contact_form_error', {
    error_type: errorType,
    event_category: 'Contact Form',
  }),

  /**
   * Clic sur email
   */
  clickEmail: () => trackEvent('click_email', {
    contact_method: 'email',
    event_category: 'Contact',
  }),

  /**
   * Clic sur téléphone
   */
  clickPhone: () => trackEvent('click_phone', {
    contact_method: 'phone',
    event_category: 'Contact',
  }),

  // ===== CHATBOT =====
  
  /**
   * Ouverture du chatbot
   */
  openChatBot: () => trackEvent('open_chatbot', {
    event_category: 'ChatBot',
  }),

  /**
   * Fermeture du chatbot
   */
  closeChatBot: () => trackEvent('close_chatbot', {
    event_category: 'ChatBot',
  }),

  /**
   * Envoi d'un message dans le chatbot
   */
  sendChatMessage: (messageLength) => trackEvent('send_chat_message', {
    message_length: messageLength,
    event_category: 'ChatBot',
  }),

  // ===== ACTUALITÉS IA =====
  
  /**
   * Clic sur un article de veille IA
   */
  clickAINewsArticle: (articleTitle, articleSource) => trackEvent('click_ai_news', {
    article_title: articleTitle,
    article_source: articleSource,
    event_category: 'AI News',
  }),

  /**
   * Clic sur "Lire" un article
   */
  readAINewsArticle: (articleTitle) => trackEvent('read_ai_news', {
    article_title: articleTitle,
    event_category: 'AI News',
    event_label: 'Read More',
  }),

  // ===== ENGAGEMENT =====
  
  /**
   * Temps passé sur une section
   */
  timeOnSection: (sectionName, seconds) => trackEvent('time_on_section', {
    section_name: sectionName,
    time_seconds: seconds,
    event_category: 'Engagement',
  }),

  /**
   * Scroll depth (profondeur de défilement)
   */
  scrollDepth: (percentage) => trackEvent('scroll_depth', {
    scroll_percentage: percentage,
    event_category: 'Engagement',
  }),

  /**
   * Partage sur les réseaux sociaux
   */
  socialShare: (platform) => trackEvent('social_share', {
    platform: platform,
    event_category: 'Social',
  }),

  // ===== ERREURS =====
  
  /**
   * Erreur 404 ou page non trouvée
   */
  error404: (path) => trackEvent('error_404', {
    error_path: path,
    event_category: 'Error',
  }),

  /**
   * Erreur de chargement de ressource
   */
  resourceError: (resourceType, resourceUrl) => trackEvent('resource_error', {
    resource_type: resourceType,
    resource_url: resourceUrl,
    event_category: 'Error',
  }),
};

/**
 * Configuration du tracking automatique des liens externes
 */
export const trackOutboundLinks = () => {
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.hostname !== window.location.hostname) {
        trackEvent('click_outbound_link', {
          url: link.href,
          text: link.textContent || link.innerText,
          event_category: 'Outbound Links',
        });
      }
    });
  }
};

/**
 * Configuration du tracking automatique du scroll depth
 */
export const trackScrollDepth = () => {
  if (typeof window !== 'undefined') {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();

    const checkScroll = () => {
      const scrollPercentage = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
      );

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;

        // Tracker les milestones
        milestones.forEach(milestone => {
          if (scrollPercentage >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            GA_EVENTS.scrollDepth(milestone);
          }
        });
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
  }
};

/**
 * Initialisation du tracking
 */
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Tracking automatique des liens externes
    trackOutboundLinks();
    
    // Tracking automatique du scroll depth
    trackScrollDepth();
    
    // Log en développement
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Google Analytics initialized');
    }
  }
};

// Export par défaut
export default {
  trackEvent,
  trackPageView,
  GA_EVENTS,
  initAnalytics,
};

