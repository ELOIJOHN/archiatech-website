import React from 'react';

export default function TestContact() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      padding: '4rem 0',
      color: 'white',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        TEST FORMULAIRE SOMBRE
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
        Si vous voyez ceci, le composant fonctionne !
      </p>
      <div style={{
        background: '#1e1e1e',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h2 style={{ color: '#e34040', marginBottom: '1rem' }}>
          Prêt à automatiser vos processus ?
        </h2>
        <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
          Contactez-nous pour un audit gratuit
        </p>
        <button style={{
          background: '#e34040',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Envoyer la demande
        </button>
      </div>
    </div>
  );
}
