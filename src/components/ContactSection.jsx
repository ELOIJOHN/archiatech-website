import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, X } from 'lucide-react';
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
    <form onSubmit={handleSubmit} className="contact-form-dark" style={{
      background: '#1e1e1e',
      borderRadius: '16px',
      padding: '2.5rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Honeypot pour la protection anti-spam */}
      <input type="text" name="website" className="honeypot" tabIndex="-1" autoComplete="off" />
      
      <div className="form-grid-dark" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="form-field-dark" style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="fullName" className="form-label-dark" style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#ffffff',
            marginBottom: '0.5rem',
            display: 'block'
          }}>
            Nom complet <span className="required-asterisk-dark" style={{ color: '#e34040', fontWeight: 600 }}>*</span>
          </label>
          <input
            type="text"
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            className={`form-input-dark ${errors.fullName ? 'error' : ''}`}
            style={{
              background: '#2a2a2a',
              border: '1px solid #404040',
              borderRadius: '8px',
              padding: '0.875rem 1rem',
              color: '#ffffff',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              outline: 'none',
              width: '100%'
            }}
          />
          {errors.fullName && (
            <div className="form-error-dark" style={{
              color: '#e34040',
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              fontWeight: 500
            }}>{errors.fullName}</div>
          )}
        </div>
        
        <div className="form-field-dark">
          <label htmlFor="email" className="form-label-dark">
            Email professionnel <span className="required-asterisk-dark">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@entreprise.com"
            className={`form-input-dark ${errors.email ? 'error' : ''}`}
          />
          {errors.email && (
            <div className="form-error-dark">{errors.email}</div>
          )}
        </div>
        
        <div className="form-field-dark">
          <label htmlFor="company" className="form-label-dark">
            Société
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="ArchiAtech"
            className="form-input-dark"
          />
        </div>
        
        <div className="form-field-dark form-field-full-dark">
          <label htmlFor="message" className="form-label-dark">
            Message <span className="required-asterisk-dark">*</span>
          </label>
          <textarea
            id="message"
            rows="4"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez brièvement vos besoins..."
            className={`form-textarea-dark ${errors.message ? 'error' : ''}`}
          />
          {errors.message && (
            <div className="form-error-dark">{errors.message}</div>
          )}
        </div>
      </div>
      
      {/* Message de statut avec gestion automatique */}
      <MessageManager 
        message={statusMessage} 
        onClose={handleMessageClose}
        onFormReset={handleFormReset}
      />
      
      <div className="form-buttons-dark">
        <button 
          type="submit"
          disabled={isLoading}
          className={`btn-primary-dark ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
        <button 
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-secondary-dark"
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
      className="contact-section-dark"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        minHeight: '100vh',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="contact-container-dark" style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* En-tête */}
        <div className="contact-header-dark" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="contact-title-dark" style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem',
            lineHeight: 1.2,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em'
          }}>
            Prêt à automatiser vos processus ?
          </h2>
          <p className="contact-subtitle-dark" style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '1.125rem',
            color: '#b0b0b0',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Contactez-nous pour un <span className="highlight-text-dark" style={{ color: '#e34040', fontWeight: 600 }}>audit gratuit</span> et découvrez comment gagner en efficacité
          </p>
        </div>

        <ContactForm />
        
        {/* Icône de chat flottante */}
        <div 
          className="chat-icon-dark" 
          onClick={() => alert('Ouverture du chat avec Archi')}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #e34040 0%, #c73636 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(227, 64, 64, 0.4)',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          💬
        </div>
      </div>
    </section>
  );
}