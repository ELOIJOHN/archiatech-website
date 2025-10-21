import React from 'react';

// Importons les composants un par un pour identifier le problème
import NavigationBar from './components/NavigationBar';

export default function App() {
  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <NavigationBar />
      
      <div style={{ 
        paddingTop: '100px',
        padding: '20px'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          color: '#E60023',
          marginBottom: '20px'
        }}>
          ✅ NavigationBar Fonctionne
        </h1>
        
        <div style={{ 
          background: 'rgba(230, 0, 35, 0.1)', 
          border: '1px solid rgba(230, 0, 35, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#E60023', marginBottom: '10px' }}>
            🎯 Test Progressif
          </h2>
          <p>NavigationBar s'affiche correctement. Ajoutons maintenant HeroSection...</p>
        </div>
      </div>
    </div>
  );
}
