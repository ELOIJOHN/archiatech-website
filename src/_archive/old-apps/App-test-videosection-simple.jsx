import React from 'react';

// Version simplifiée de VideoSection sans VideoManager complexe
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';

// Composant VideoSection simplifié
function SimpleVideoSection() {
  return (
    <section id="videos" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#E60023] font-semibold text-sm uppercase tracking-wider">
            Nos Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Démonstrations Vidéos
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Découvrez nos solutions d'automatisation et d'IA à travers des démonstrations détaillées.
          </p>
        </div>
        
        {/* Vidéo simple sans gestion complexe */}
        <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-auto"
            controls
            muted
            playsInline
            poster="/images/archiatech-hero.jpg"
          >
            <source src="/videos/20251011_2138_SupportIT.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            💡 <strong>Astuce :</strong> Utilisez les contrôles vidéo pour gérer la lecture.
          </p>
        </div>
      </div>
    </section>
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
      <SimpleVideoSection />
      
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
            ✅ VideoSection Simplifié Fonctionne !
          </h2>
          <p>Le problème venait de VideoManager avec ses 6 vidéos autoPlay simultanées.</p>
          <p>Nous allons maintenant corriger VideoManager et tester les autres composants.</p>
        </div>
      </div>
    </div>
  );
}
