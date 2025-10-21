import React from 'react';

// Importons NavigationBar + HeroSection
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';

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
            ✅ HeroSection Fonctionne
          </h2>
          <p>NavigationBar + HeroSection s'affichent correctement. Ajoutons maintenant ServicesSection...</p>
        </div>
      </div>
    </div>
  );
}
