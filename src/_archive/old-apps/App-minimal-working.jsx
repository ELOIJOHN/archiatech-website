import React from 'react';

export default function App() {
  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        color: '#E60023',
        marginBottom: '20px'
      }}>
        ArchiAtech - Site Fonctionnel
      </h1>
      
      <div style={{ 
        background: 'rgba(230, 0, 35, 0.1)', 
        border: '1px solid rgba(230, 0, 35, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#E60023', marginBottom: '10px' }}>
          ✅ Test Réussi
        </h2>
        <p>React fonctionne correctement. Le problème vient d'un composant spécifique.</p>
      </div>

      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ marginBottom: '10px' }}>Prochaines étapes :</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Navigation moderne avec menu déroulant</li>
          <li>Section Actualités dynamique</li>
          <li>Agent IA Archi</li>
          <li>Design responsive</li>
        </ul>
      </div>
    </div>
  );
}
