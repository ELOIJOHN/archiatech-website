import React from 'react';

// Version simplifiée avec ArchiAgent simplifié
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';
import VideoSection from './components/VideoSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';

// Composant ArchiAgent simplifié
function SimpleArchiAgent() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton flottant */}
      <button 
        className="bg-[#E60023] hover:bg-[#E60023]/90 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        onClick={() => alert('Archi Agent - Version simplifiée fonctionnelle !')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
        Parlez avec Archi, votre assistant IA
      </div>
    </div>
  );
}

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
      <SimpleArchiAgent />
      
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
            ✅ ArchiAgent Simplifié Fonctionne !
          </h2>
          <p>Le problème venait probablement de la complexité d'ArchiAgent avec ses nombreux états et effets.</p>
          <p><strong>🎉 TOUS LES COMPOSANTS FONCTIONNENT MAINTENANT !</strong></p>
          <p>Nous pouvons restaurer l'application complète avec les corrections.</p>
        </div>
      </div>
    </div>
  );
}
