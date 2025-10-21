import React from 'react';

// Testons ContactSection spécifiquement
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';
import VideoSection from './components/VideoSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';

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
      <Avantages />
      <VideoSection />
      <NewsSection />
      <ContactSection />
      
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
            ✅ ContactSection Ajouté !
          </h2>
          <p>NavigationBar + HeroSection + ServicesSection + ApprocheSection + Avantages + VideoSection + NewsSection + ContactSection fonctionnent.</p>
          <p>Si vous voyez ce message, ContactSection fonctionne. Nous continuons avec ArchiAgent.</p>
        </div>
      </div>
    </div>
  );
}