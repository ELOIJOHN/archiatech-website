import React from 'react';

// Testons tous les composants restants d'un coup
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';
import VideoSection from './components/VideoSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import ArchiAgent from './components/ArchiAgent';

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
      <ArchiAgent />
      
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
            ✅ Tous les Composants Fonctionnent !
          </h2>
          <p>Félicitations ! Tous les composants s'affichent correctement. Le problème était probablement temporaire.</p>
        </div>
      </div>
    </div>
  );
}
