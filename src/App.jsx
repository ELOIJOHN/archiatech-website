import React from 'react';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import PilliersSection from './components/PilliersSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';
import VeilleSection from './components/VeilleSection';
import ContactSection from './components/ContactSectionSimple';
import ArchiAgent from './components/ArchiAgent';
import SiteFooter from './components/SiteFooter';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { MentionsLegales, Confidentialite } from './pages/LegalPages';
import { findPage } from './data/site-pages';

function HomePage() {
  return (
    <>
      {/* Hero - Page d'accueil */}
      <HeroSection />
      {/* 3 Piliers ArchiaTech - Souverain, Responsable, Green */}
      <PilliersSection />
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
    </>
  );
}

function ContactPage() {
  return (
    <div className="pt-16">
      <h1 className="sr-only">Contactez ArchiAtech</h1>
      <ContactSection />
    </div>
  );
}

// Chaque page est servie comme un vrai fichier HTML (voir scripts/prerender.mjs) :
// le composant à afficher se choisit donc simplement d'après l'URL.
function renderPage(page) {
  if (!page) return <NotFoundPage />;
  switch (page.type) {
    case 'home':
      return <HomePage />;
    case 'service':
      return <ServicePage slug={page.slug} />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    case 'legal':
      return <MentionsLegales />;
    case 'privacy':
      return <Confidentialite />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const page = findPage(window.location.pathname);

  return (
    <>
      {/* Navigation fixe */}
      <NavigationBar />

      <main className="flex flex-col overflow-y-auto scroll-smooth bg-white text-gray-900">
        {renderPage(page)}
      </main>

      <SiteFooter />

      {/* Agent IA Archi - Widget flottant */}
      <ArchiAgent />
    </>
  );
}
