import React from 'react';

// Application complète qui fonctionne avec tous les composants corrigés
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';

// VideoSection avec VideoManager corrigé
import VideoSection from './components/VideoSection';

// NewsSection simplifiée (sans appels API)
function SimpleNewsSection() {
  const demoArticles = [
    {
      title: "L'IA révolutionne l'automatisation des processus",
      description: "Découvrez comment l'intelligence artificielle transforme les entreprises et automatise leurs processus métiers pour gagner en efficacité et productivité.",
      url: "https://techcrunch.com/category/artificial-intelligence/",
      publishedAt: "2024-01-15",
      source: { name: "TechCrunch" },
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center&auto=format&q=80",
      imageAlt: "Illustration de l'intelligence artificielle et de l'automatisation des processus"
    },
    {
      title: "No-Code : L'avenir du développement logiciel",
      description: "Les plateformes No-Code permettent aux entreprises de créer des applications sans coder, démocratisant ainsi le développement logiciel.",
      url: "https://www.forbes.com/innovation/",
      publishedAt: "2024-01-14",
      source: { name: "Forbes" },
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center&auto=format&q=80",
      imageAlt: "Interface de développement No-Code avec blocs de construction"
    },
    {
      title: "Automatisation des workflows : +40% d'efficacité",
      description: "Les entreprises qui automatisent leurs processus gagnent en productivité, réduisent les erreurs et améliorent leur compétitivité.",
      url: "https://hbr.org/topic/subject/digital-transformation",
      publishedAt: "2024-01-13",
      source: { name: "Harvard Business Review" },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center&auto=format&q=80",
      imageAlt: "Graphique de croissance et statistiques d'efficacité"
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
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              {/* Image miniature */}
              <div className="relative w-full h-48 overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Contenu de la carte */}
              <div className="p-6">
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
                
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E60023] hover:text-white transition-colors text-sm font-medium inline-flex items-center gap-1 group/link"
                >
                  <span>Lire l'article</span>
                  <span className="transform transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ContactSection simplifiée (sans composant Button complexe)
function SimpleContactSection() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#E60023] font-semibold text-sm uppercase tracking-wider">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Prêt à automatiser vos processus ?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Contactez-nous pour un audit gratuit et découvrez comment gagner en efficacité.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <form className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Nom complet</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E60023]"
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Email professionnel</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E60023]"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Société</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E60023]"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E60023]"
                  placeholder="Décrivez brièvement vos besoins..."
                />
              </div>
              
              <div className="space-y-4">
                <button 
                  type="submit"
                  className="w-full bg-[#E60023] hover:bg-[#E60023]/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(230,0,35,0.5)]"
                >
                  Envoyer la demande
                </button>
                
                <button 
                  type="button"
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg border border-white/30 transition-all duration-300"
                >
                  Ou nous écrire directement
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ArchiAgent simplifié
function SimpleArchiAgent() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        className="bg-[#E60023] hover:bg-[#E60023]/90 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        onClick={() => alert('Bonjour ! Je suis Archi, votre assistant IA. Comment puis-je vous aider aujourd\'hui ?')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      
      <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
        Parlez avec Archi, votre assistant IA
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationBar />
      <HeroSection />
      <ServicesSection />
      <ApprocheSection />
      <Avantages />
      <VideoSection />
      <SimpleNewsSection />
      <SimpleContactSection />
      {/* <SimpleArchiAgent /> */}
    </div>
  );
}
