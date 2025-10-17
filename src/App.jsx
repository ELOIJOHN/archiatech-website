import React from 'react';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';
import VeilleSection from './components/VeilleSection';
import ContactSection from './components/ContactSection';
import ArchiAgent from './components/ArchiAgent';

export default function App() {
  return (
    <>
      {/* Navigation transparente fixe */}
      <NavigationBar />

      {/* Layout global avec scroll fluide */}
      <main className="flex flex-col overflow-y-auto scroll-smooth bg-black text-white">
        {/* Hero - Page d'accueil */}
        <HeroSection />

        {/* Services - Nos expertises */}
        <ServicesSection />

        {/* Notre Approche - Méthodologie */}
        <ApprocheSection />

        {/* Nos Avantages */}
        <Avantages />

        {/* Veille IA - Démonstrations vidéos */}
        <VeilleSection />

        {/* Contact - CTA Final */}
        <ContactSection />
      </main>

      {/* Agent IA Archi - Widget flottant */}
      <ArchiAgent />
    </>
  );
}
