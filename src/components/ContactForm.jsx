import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { contactService, validationService, trackingService } from '../services/contactAPI';

/**
 * Composant ContactForm - Formulaire de contact fonctionnel
 * - Validation des champs en temps réel
 * - Envoi des données avec feedback
 * - Accessibilité complète (ARIA)
 * - Google Analytics tracking
 * - Design moderne et responsive
 */
const ContactForm = () => {
  // États du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });

  // États de validation et soumission
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // Services disponibles
  const services = [
    { value: '', label: 'Sélectionnez un service' },
    { value: 'support-it', label: 'Support & Déploiement IT' },
    { value: 'conseil-ia', label: 'Conseil & Intégration IA' },
    { value: 'automatisation', label: 'Automatisation Workflows' },
    { value: 'nocode', label: 'Solutions No-Code / Low-Code' },
    { value: 'formation', label: 'Formation & Accompagnement' },
    { value: 'transformation', label: 'Transformation Digitale' },
    { value: 'audit', label: 'Audit gratuit' }
  ];

  // Validation des champs
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Le nom est requis';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Le nom doit contenir au moins 2 caractères';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'L\'email est requis';
        } else if (!validationService.validateEmail(value)) {
          newErrors.email = 'Format d\'email invalide';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (value.trim() && !validationService.validatePhone(value)) {
          newErrors.phone = 'Format de téléphone invalide';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Le message est requis';
        } else if (value.trim().length < 10) {
          newErrors.message = 'Le message doit contenir au moins 10 caractères';
        } else {
          delete newErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation en temps réel
    validateField(name, value);

    // Reset du statut de soumission
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  // Validation complète du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation avant soumission
    if (!validateForm()) {
      setSubmitStatus('error');
      trackingService.trackEvent('form_validation_error', { errors: Object.keys(errors) });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Track début de soumission
      trackingService.trackEvent('form_submit_start', {
        service: formData.service || 'general',
        has_phone: !!formData.phone,
        has_company: !!formData.company
      });

      // Nettoyage des données
      const sanitizedData = validationService.sanitizeFormData(formData);

      // Envoi via le service API
      const result = await contactService.sendContactMessage(sanitizedData);

      if (result.success) {
        setSubmitStatus('success');
        
        // Track succès
        trackingService.trackEvent('form_submit_success', {
          service: formData.service || 'general',
          message_length: formData.message.length
        });
        
        // Reset du formulaire après succès
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          service: ''
        });
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      
      // Track erreur
      trackingService.trackEvent('form_submit_error', {
        error_message: error.message,
        service: formData.service || 'general'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Informations de contact */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Informations de contact</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <a 
              href="mailto:contact@archiatech.com" 
              className="text-red-100 hover:text-white transition-colors"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_email', {
                    event_category: 'Contact',
                    contact_method: 'email',
                  });
                }
              }}
            >
              contact@archiatech.com
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <a 
              href="tel:+33783829310" 
              className="text-red-100 hover:text-white transition-colors"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_phone', {
                    event_category: 'Contact',
                    contact_method: 'phone',
                  });
                }
              }}
            >
              +33 7 83 82 93 10
            </a>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Demandez un devis</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Nom complet *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-200" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border text-white placeholder-red-200 transition-all duration-300 ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                    : 'border-white/20 focus:border-white/40 focus:ring-white/20'
                } focus:outline-none focus:ring-2`}
                placeholder="Votre nom complet"
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={errors.name ? "true" : "false"}
              />
            </div>
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-300 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email professionnel *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-200" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border text-white placeholder-red-200 transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                    : 'border-white/20 focus:border-white/40 focus:ring-white/20'
                } focus:outline-none focus:ring-2`}
                placeholder="votre@email.com"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-300 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
              Téléphone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-200" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border text-white placeholder-red-200 transition-all duration-300 ${
                  errors.phone 
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                    : 'border-white/20 focus:border-white/40 focus:ring-white/20'
                } focus:outline-none focus:ring-2`}
                placeholder="06 12 34 56 78"
                aria-describedby={errors.phone ? "phone-error" : undefined}
                aria-invalid={errors.phone ? "true" : "false"}
              />
            </div>
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-300 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Entreprise */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-red-200 focus:border-white/40 focus:ring-white/20 focus:outline-none focus:ring-2 transition-all duration-300"
              placeholder="Nom de votre entreprise"
            />
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
              Service d'intérêt
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-white/40 focus:ring-white/20 focus:outline-none focus:ring-2 transition-all duration-300"
            >
              {services.map(service => (
                <option key={service.value} value={service.value} className="bg-gray-800 text-white">
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
              Décrivez vos besoins *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-red-200" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border text-white placeholder-red-200 transition-all duration-300 resize-none ${
                  errors.message 
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                    : 'border-white/20 focus:border-white/40 focus:ring-white/20'
                } focus:outline-none focus:ring-2`}
                placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
                aria-describedby={errors.message ? "message-error" : undefined}
                aria-invalid={errors.message ? "true" : "false"}
              />
            </div>
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-300 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Messages de statut */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-100">
                Votre message a été envoyé avec succès ! Nous vous répondrons dans les 24h.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-100">
                Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
              </p>
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isSubmitting || Object.keys(errors).length > 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-white text-red-700 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]'
            } shadow-lg`}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Envoyer la demande</span>
              </>
            )}
          </button>

          {/* Note légale */}
          <p className="text-xs text-red-200 text-center">
            En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous recontacter. 
            Aucune donnée ne sera partagée avec des tiers.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
