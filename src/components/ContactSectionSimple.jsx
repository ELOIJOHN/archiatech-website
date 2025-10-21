import React, { useState } from 'react';

export default function ContactSectionSimple() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Créer le message formaté
    const emailContent = `
📧 NOUVELLE DEMANDE DE CONTACT - ArchiAtech
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nom complet : ${fullName}
📧 Email : ${email}
🏢 Société : ${company || 'Non renseignée'}

💬 MESSAGE :
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Date : ${new Date().toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
🌐 Source : Site web ArchiAtech
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pour répondre : ${email}
    `.trim();

    try {
      // Copier dans le presse-papier
      await navigator.clipboard.writeText(emailContent);

      // Ouvrir Gmail dans un nouvel onglet avec le message pré-rempli
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact@archiatech.com&su=${encodeURIComponent(`[ArchiAtech] Nouveau contact - ${fullName}`)}&body=${encodeURIComponent(emailContent)}`;
      window.open(gmailUrl, '_blank');

      setSubmitStatus({
        type: 'success',
        message: '✅ Le message a été copié et Gmail s\'est ouvert ! Cliquez sur "Envoyer" dans Gmail pour finaliser.'
      });

      // Réinitialiser le formulaire après 5 secondes
      setTimeout(() => {
        setFullName('');
        setEmail('');
        setCompany('');
        setMessage('');
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Erreur:', error);

      // Fallback : copie simple
      try {
        await navigator.clipboard.writeText(emailContent);
        setSubmitStatus({
          type: 'success',
          message: '✅ Le message a été copié dans votre presse-papier ! Collez-le dans un email à contact@archiatech.com'
        });
      } catch (clipboardError) {
        setSubmitStatus({
          type: 'error',
          message: '❌ Erreur. Veuillez utiliser le bouton "Ou nous écrire directement" ci-dessous.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Restaurer le scroll
  };

  // Styles communs pour les inputs
  const inputStyle = {
    background: '#f8f9fa',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    padding: '0.875rem 1rem',
    color: '#374151',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    width: '100%'
  };

  // Gestionnaires d'événements pour les inputs
  const handleFocus = (e) => {
    e.target.style.borderColor = '#e34040';
    e.target.style.background = '#ffffff';
    e.target.style.boxShadow = '0 0 0 3px rgba(227, 64, 64, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#e5e7eb';
    e.target.style.background = '#f8f9fa';
    e.target.style.boxShadow = 'none';
  };

  const handleMouseEnter = (e) => {
    e.target.style.borderColor = '#e34040';
    e.target.style.background = '#ffffff';
  };

  const handleMouseLeave = (e) => {
    if (document.activeElement !== e.target) {
      e.target.style.borderColor = '#e5e7eb';
      e.target.style.background = '#f8f9fa';
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
        minHeight: 'auto',
        padding: '3rem 0 2rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#e34040',
            marginBottom: '0.75rem',
            lineHeight: 1.3,
            textShadow: '0 2px 4px rgba(227, 64, 64, 0.2)',
            letterSpacing: '-0.02em'
          }}>
            Prêt à automatiser vos processus ?
          </h2>
          <p style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '1rem',
            color: '#374151',
            lineHeight: 1.5,
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Contactez-nous pour un <span style={{ color: '#e34040', fontWeight: 600 }}>audit gratuit</span> et découvrez comment gagner en efficacité
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.75rem',
          boxShadow: '0 10px 30px rgba(227, 64, 64, 0.12), 0 0 0 1px rgba(227, 64, 64, 0.08)',
          border: '2px solid #e34040',
          position: 'relative',
          maxWidth: '550px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            {/* Nom complet */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.375rem',
                display: 'block'
              }}>
                Nom complet <span style={{ color: '#e34040', fontWeight: 600 }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.375rem',
                display: 'block'
              }}>
                Email professionnel <span style={{ color: '#e34040', fontWeight: 600 }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@entreprise.com"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            {/* Société */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.375rem',
                display: 'block'
              }}>
                Société
              </label>
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="ArchiAtech"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            {/* Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
              <label style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.375rem',
                display: 'block'
              }}>
                Message <span style={{ color: '#e34040', fontWeight: 600 }}>*</span>
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Décrivez brièvement vos besoins..."
                style={{
                  ...inputStyle,
                  minHeight: '120px',
                  resize: 'vertical'
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>

          {/* Message de statut */}
          {submitStatus && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              borderRadius: '8px',
              background: submitStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
              border: `2px solid ${submitStatus.type === 'success' ? '#10b981' : '#ef4444'}`,
              color: submitStatus.type === 'success' ? '#065f46' : '#991b1b',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}>
              {submitStatus.message}
            </div>
          )}

          {/* Boutons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            marginTop: '1.5rem'
          }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '180px',
                background: isSubmitting ? '#9ca3af' : '#e34040',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(227, 64, 64, 0.3)',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(227, 64, 64, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(227, 64, 64, 0.3)';
                }
              }}
            >
              {isSubmitting ? '📧 Préparation...' : '📧 Envoyer via Gmail'}
            </button>
            <button
              type="button"
              onClick={openModal}
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '2px solid #e34040',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '180px',
                background: 'transparent',
                color: '#e34040'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e34040';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#e34040';
              }}
            >
              Ou nous écrire directement
            </button>
          </div>
        </form>

      </div>

      {/* Modal de contact direct */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={closeModal}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 9998,
              animation: 'fadeIn 0.3s ease-out'
            }}
          />

          {/* Modal */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '500px',
            width: 'calc(100% - 2rem)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            animation: 'slideUp 0.3s ease-out'
          }}>
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#9ca3af',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#9ca3af';
              }}
            >
              ✕
            </button>

            {/* En-tête */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#e34040',
                marginBottom: '0.5rem'
              }}>
                Contactez-nous directement
              </h3>
              <p style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.95rem',
                color: '#6b7280',
                lineHeight: 1.5
              }}>
                Nous sommes à votre écoute ! Choisissez votre moyen de communication préféré.
              </p>
            </div>

            {/* Informations de contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Email */}
              <a
                href="mailto:contact@archiatech.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#e34040';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #e34040, #c73636)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📧
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    Email
                  </div>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#e34040'
                  }}>
                    contact@archiatech.com
                  </div>
                </div>
              </a>

              {/* Téléphone */}
              <a
                href="tel:+33783829310"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#e34040';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📞
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    Téléphone
                  </div>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#10b981'
                  }}>
                    07 83 82 93 10
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/archiatech"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#0077b5';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #0077b5, #005582)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  💼
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    LinkedIn
                  </div>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#0077b5'
                  }}>
                    ArchiAtech
                  </div>
                </div>
              </a>
            </div>

            {/* Note */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#fef3c7',
              borderRadius: '8px',
              borderLeft: '4px solid #f59e0b'
            }}>
              <p style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                color: '#92400e',
                lineHeight: 1.5,
                margin: 0
              }}>
                💡 <strong>Réponse rapide :</strong> Nous répondons généralement sous 24h pendant les jours ouvrables.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
