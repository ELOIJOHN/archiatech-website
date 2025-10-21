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
        ArchiAtech - Diagnostic
      </h1>
      
      <div style={{ 
        background: 'rgba(230, 0, 35, 0.1)', 
        border: '1px solid rgba(230, 0, 35, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#E60023', marginBottom: '10px' }}>
          ✅ React Fonctionne
        </h2>
        <p>Si vous voyez ce message, React fonctionne correctement.</p>
        <p>Le problème vient probablement de :</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li>Un composant avec une erreur JavaScript</li>
          <li>Un import qui échoue</li>
          <li>Une dépendance manquante (Framer Motion, Lucide React, etc.)</li>
          <li>Un problème de compilation Tailwind CSS</li>
        </ul>
      </div>

      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ marginBottom: '10px' }}>Prochaines étapes :</h3>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Vérifiez la console du navigateur (F12) pour les erreurs</li>
          <li>Nous allons tester chaque composant individuellement</li>
          <li>Nous corrigerons le composant problématique</li>
        </ol>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(33, 150, 243, 0.1)',
        border: '1px solid rgba(33, 150, 243, 0.3)',
        borderRadius: '8px'
      }}>
        <p style={{ margin: 0, color: '#2196F3' }}>
          <strong>💡 Conseil :</strong> Ouvrez la console développeur (F12) et regardez s'il y a des erreurs en rouge.
        </p>
      </div>
    </div>
  );
}
