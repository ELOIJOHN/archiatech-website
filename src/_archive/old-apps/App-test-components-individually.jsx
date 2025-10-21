import React from 'react';

// Testons les composants un par un pour identifier le problème
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';

// Testons ApprocheSection
import ApprocheSection from './components/ApprocheSection';

export default function App() {
  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <NavigationBar />
      <HeroSection />
      <ServicesSection />
      <ApprocheSection />
      
      <div style={{ 
        padding: '20px',
        marginTop: '50px'
      }}>
        <div style={{ 
          background: 'rgba(76, 175, 80, 0.1)', 
          border: '1px solid rgba(76, 175, 80, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#4CAF50', marginBottom: '10px' }}>
            ✅ ApprocheSection Ajoutée !
          </h2>
          <p>NavigationBar + HeroSection + ServicesSection + ApprocheSection fonctionnent.</p>
          <p>Si vous voyez ce message, ApprocheSection fonctionne. Nous continuons avec les autres.</p>
        </div>
      </div>
    </div>
  );
}
