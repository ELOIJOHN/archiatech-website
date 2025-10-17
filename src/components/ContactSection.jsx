import React, { useState, useEffect } from 'react';
import Button from './Button';

// Composant pour gérer les messages avec fermeture manuelle et automatique
function MessageManager({ message, onClose, onFormReset }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setIsClosing(false);
      
      // Disparition automatique après 5 secondes
      const timer = setTimeout(() => {
        handleClose(false); // false = fermeture automatique (pas de reset)
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = (isManualClose = true) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
      
      // Si fermeture manuelle d'un message d'erreur, réinitialiser le formulaire
      if (isManualClose && message && message.type === 'error' && onFormReset) {
        onFormReset();
      }
    }, 300); // Durée de l'animation de fermeture
  };

  if (!message || !isVisible) return null;

  const icon = message.type === 'success' ? '✅' : '❌';

  return (
    <div className={`form-message ${message.type} ${isClosing ? 'fade-out' : ''}`}>
      <div className="form-message-content">
        <span className="form-message-icon">{icon}</span>
        <span className="form-message-text">{message.text}</span>
      </div>
      <button 
        className="form-message-close"
        onClick={handleClose}
        aria-label="Fermer le message"
      >
        ✖
      </button>
    </div>
  );
}

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={onClose}>
          ✖
        </button>
        
        <div className="contact-modal-header">
          <h3 className="contact-modal-title">ArchiAtech – Digital Solutions</h3>
          <p className="contact-modal-subtitle">Contactez-nous directement</p>
        </div>
        
        <div className="contact-modal-content">
          <div className="contact-info-item">
            <div className="contact-info-icon">📍</div>
            <div className="contact-info-text">
              <div className="contact-info-label">Adresse</div>
              <div className="contact-info-value">
                213 Avenue Aristide Briand<br />
                06190 Roquebrune-Cap-Martin, FRANCE
              </div>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">✉️</div>
            <div className="contact-info-text">
              <div className="contact-info-label">Email</div>
              <div className="contact-info-value">
                <a href="mailto:contact@archiatech.fr">contact@archiatech.fr</a>
              </div>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">☎️</div>
            <div className="contact-info-text">
              <div className="contact-info-label">Téléphone</div>
              <div className="contact-info-value">
                <a href="tel:+33782839310">+33 (0)7 82 83 93 10</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Le nom complet est obligatoire";
    }
    
    if (!email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    
    if (!message.trim()) {
      newErrors.message = "Le message est obligatoire";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Supprimer tout message existant avant validation
    setStatusMessage(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName.trim());
      formData.append('email', email.trim());
      formData.append('company', company.trim());
      formData.append('message', message.trim());
      formData.append('website', ''); // Honeypot

      const response = await fetch('/send-mail.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage({ type: 'success', text: result.message });
        // Réinitialiser le formulaire
        setFullName("");
        setEmail("");
        setCompany("");
        setMessage("");
        setErrors({});
      } else {
        setStatusMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setStatusMessage({ 
        type: 'error', 
        text: 'Une erreur est survenue, veuillez réessayer.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageClose = () => {
    setStatusMessage(null);
  };

  const handleFormReset = () => {
    // Réinitialiser tous les champs du formulaire
    setFullName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form-modern">
      {/* Honeypot pour la protection anti-spam */}
      <input type="text" name="website" className="honeypot" tabIndex="-1" autoComplete="off" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="form-field">
          <label>Nom complet *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && (
            <div className="text-red-400 text-sm mt-1">{errors.fullName}</div>
          )}
        </div>
        <div className="form-field">
          <label>Email professionnel *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@entreprise.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <div className="text-red-400 text-sm mt-1">{errors.email}</div>
          )}
        </div>
        <div className="form-field">
          <label>Société</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="ArchiAtech"
          />
        </div>
        <div className="form-field sm:col-span-2">
          <label>Message *</label>
          <textarea
            rows="4"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez brièvement vos besoins..."
            className={errors.message ? 'border-red-500' : ''}
          />
          {errors.message && (
            <div className="text-red-400 text-sm mt-1">{errors.message}</div>
          )}
        </div>
      </div>
      
      {/* Message de statut avec gestion automatique */}
      <MessageManager 
        message={statusMessage} 
        onClose={handleMessageClose}
        onFormReset={handleFormReset}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button 
          type="submit"
          disabled={isLoading}
          className={`btn-contact-primary flex-1 ${isLoading ? 'btn-loading' : ''}`}
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
        <button 
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-contact-secondary flex-1 text-center"
        >
          Ou nous écrire directement
        </button>
      </div>
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </form>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-10 xs:py-12 sm:py-16 md:py-20 lg:py-24
                bg-gradient-to-b from-black via-gray-900 to-red-900/20
                relative overflow-hidden
                landscape:py-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/15 via-transparent to-[#E53935]/10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl
                       font-bold text-white
                       mb-3 xs:mb-4 sm:mb-6 font-sans
                       leading-tight px-2">
            Prêt à automatiser vos processus ?
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl
                      text-white/80
                      mb-4 xs:mb-6 sm:mb-8 md:mb-10
                      leading-relaxed max-w-3xl mx-auto
                      px-3 xs:px-4">
            Contactez-nous pour un audit gratuit et découvrez comment gagner en efficacité
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}