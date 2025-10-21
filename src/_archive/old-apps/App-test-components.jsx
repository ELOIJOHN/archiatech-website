import React from 'react';

// Test des imports un par un
let NavigationBar, HeroSection, ServicesSection, ApprocheSection, Avantages, VideoSection, NewsSection, ContactSection, ArchiAgent;

try {
  NavigationBar = require('./components/NavigationBar').default;
  console.log('✅ NavigationBar importé avec succès');
} catch (error) {
  console.error('❌ Erreur NavigationBar:', error);
}

try {
  HeroSection = require('./components/HeroSection').default;
  console.log('✅ HeroSection importé avec succès');
} catch (error) {
  console.error('❌ Erreur HeroSection:', error);
}

try {
  ServicesSection = require('./components/ServicesSection').default;
  console.log('✅ ServicesSection importé avec succès');
} catch (error) {
  console.error('❌ Erreur ServicesSection:', error);
}

try {
  ApprocheSection = require('./components/ApprocheSection').default;
  console.log('✅ ApprocheSection importé avec succès');
} catch (error) {
  console.error('❌ Erreur ApprocheSection:', error);
}

try {
  Avantages = require('./components/Avantages').default;
  console.log('✅ Avantages importé avec succès');
} catch (error) {
  console.error('❌ Erreur Avantages:', error);
}

try {
  VideoSection = require('./components/VideoSection').default;
  console.log('✅ VideoSection importé avec succès');
} catch (error) {
  console.error('❌ Erreur VideoSection:', error);
}

try {
  NewsSection = require('./components/NewsSection').default;
  console.log('✅ NewsSection importé avec succès');
} catch (error) {
  console.error('❌ Erreur NewsSection:', error);
}

try {
  ContactSection = require('./components/ContactSection').default;
  console.log('✅ ContactSection importé avec succès');
} catch (error) {
  console.error('❌ Erreur ContactSection:', error);
}

try {
  ArchiAgent = require('./components/ArchiAgent').default;
  console.log('✅ ArchiAgent importé avec succès');
} catch (error) {
  console.error('❌ Erreur ArchiAgent:', error);
}

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
        Test des Composants ArchiAtech
      </h1>
      
      <div style={{ 
        background: 'rgba(230, 0, 35, 0.1)', 
        border: '1px solid rgba(230, 0, 35, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#E60023', marginBottom: '10px' }}>
          🔍 Diagnostic des Imports
        </h2>
        <p>Ouvrez la console du navigateur (F12) pour voir les résultats des tests d'import.</p>
        <p>Si un composant échoue, son nom apparaîtra en rouge dans la console.</p>
      </div>

      {/* Test NavigationBar */}
      {NavigationBar && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#4CAF50' }}>✅ NavigationBar - Fonctionne</h3>
          <NavigationBar />
        </div>
      )}

      {/* Test HeroSection */}
      {HeroSection && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#4CAF50' }}>✅ HeroSection - Fonctionne</h3>
          <HeroSection />
        </div>
      )}

      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ marginBottom: '10px' }}>Instructions :</h3>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Ouvrez la console du navigateur (F12)</li>
          <li>Regardez les messages d'import des composants</li>
          <li>Si un composant échoue, nous le corrigerons</li>
        </ol>
      </div>
    </div>
  );
}
