import React from 'react';
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
    <>
      {/* Navigation transparente fixe */}
      <NavigationBar />
      
      {/* Layout global avec scroll fluide */}
      <main className="flex flex-col bg-black text-white">
        {/* Hero - Page d'accueil */}
        <HeroSection />
        
        {/* Services - Nos expertises avec boutons vidéo */}
        <ServicesSection />
        
        {/* Notre Approche - Méthodologie */}
        <ApprocheSection />
        
        {/* Nos Avantages */}
        <Avantages />
        
        {/* Vidéos Dynamiques - Système complet */}
        <VideoSection />
        
        {/* Actualités - Veille Technologique */}
        <NewsSection />
        
        {/* Contact - CTA Final */}
        <ContactSection />
      </main>
      
      {/* Agent IA Archi - Widget flottant */}
      <ArchiAgent />
    </>
  );
}
