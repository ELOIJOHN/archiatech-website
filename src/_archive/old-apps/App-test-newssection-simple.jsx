import React from 'react';

// Version simplifiée de NewsSection sans appels API
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';
import VideoSection from './components/VideoSection';

// Composant NewsSection simplifié
function SimpleNewsSection() {
  const demoArticles = [
    {
      title: "L'IA révolutionne l'automatisation des processus",
      description: "Découvrez comment l'intelligence artificielle transforme les entreprises...",
      url: "#",
      publishedAt: "2024-01-15",
      source: { name: "TechCrunch" }
    },
    {
      title: "No-Code : L'avenir du développement logiciel",
      description: "Les plateformes No-Code permettent aux entreprises de créer des applications...",
      url: "#",
      publishedAt: "2024-01-14",
      source: { name: "Forbes" }
    },
    {
      title: "Automatisation des workflows : +40% d'efficacité",
      description: "Les entreprises qui automatisent leurs processus gagnent en productivité...",
      url: "#",
      publishedAt: "2024-01-13",
      source: { name: "Harvard Business Review" }
    }
  ];

  return (
    <section id="actualites" className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#E60023] font-semibold text-sm uppercase tracking-wider">
            Veille Technologique
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Actualités IA & Digital
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Restez informé des dernières tendances en intelligence artificielle et transformation digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoArticles.map((article, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#E60023] text-sm font-medium">{article.source.name}</span>
                <span className="text-white/60 text-sm">{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <h3 className="text-white font-bold text-lg mb-3 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-white/70 text-sm mb-4 line-clamp-3">
                {article.description}
              </p>
              
              <button 
                className="text-[#E60023] hover:text-white transition-colors text-sm font-medium"
                onClick={() => window.open(article.url, '_blank')}
              >
                Lire l'article →
              </button>
            </div>
          ))}
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
      <VideoSection />
      <SimpleNewsSection />
      
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
            ✅ NewsSection Simplifié Fonctionne !
          </h2>
          <p>Le problème venait probablement du hook useNewsAPI avec les appels API externes.</p>
          <p>Nous allons maintenant corriger NewsSection et tester ContactSection.</p>
        </div>
      </div>
    </div>
  );
}
