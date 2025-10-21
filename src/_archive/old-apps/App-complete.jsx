import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Cog, Users, Code, Rocket, CheckCircle, Star, TrendingUp, Shield } from 'lucide-react';
import HeroTextEffectComponent from './components/HeroTextEffectComponent';
import ServicesSection from './components/ServicesSection';
import SimpleNavbar from './components/SimpleNavbar';
import ContactForm from './components/ContactForm';
import SimpleLazyVideo from './components/SimpleLazyVideo';
import LazySection from './components/LazySection';
import { initPerformanceOptimizations } from './utils/performance';

// Composant ChatBot simple
function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis ArchiBot, votre assistant IA. Comment puis-je vous aider ?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Ajouter le message utilisateur
    const userMessage = { id: Date.now(), text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Réponse automatique du bot
    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, text: "Merci pour votre message ! Notre équipe vous répondra rapidement.", isBot: true };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <>
      {/* Bouton ChatBot flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Modal ChatBot */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-lg shadow-2xl border border-gray-200">
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">ArchiBot</h3>
                <p className="text-xs text-red-100">Assistant IA</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-red-600 text-white'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <button type="submit" className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// Composant Actualités IA
function AINewsSection() {
  const [activeNews, setActiveNews] = useState(0);
  
  const newsItems = [
    {
      id: 1,
      title: "OpenAI lance GPT-4 Turbo avec capacités multimodales améliorées",
      summary: "La nouvelle version offre des performances 3x plus rapides et une meilleure compréhension contextuelle.",
      source: "OpenAI Blog",
      category: "Releases",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Microsoft Copilot intègre l'IA générative dans Office 365",
      summary: "Les utilisateurs peuvent désormais créer des documents, présentations et analyses automatiquement.",
      source: "Microsoft News",
      category: "Product",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "L'IA générative transforme l'industrie du développement logiciel",
      summary: "Les développeurs rapportent 40% d'augmentation de productivité avec les outils d'IA.",
      source: "TechCrunch",
      category: "Industry",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-red-600" />
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
              Veille technologique
            </span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Actualités <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">IA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Restez informé des dernières innovations et tendances en intelligence artificielle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((article, index) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">{article.source}</span>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors">
                    Lire
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant principal
function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Initialiser les optimisations de performance
  useEffect(() => {
    initPerformanceOptimizations();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Simple avec Menu Hamburger */}
      <SimpleNavbar />

      {/* Hero Section moderne avec gradient */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background avec gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        {/* Effet de particules flottantes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce opacity-40"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse opacity-50"></div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Solutions IA & Automatisation</span>
          </div>

          {/* Titre principal avec effet de texte */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block text-white mb-2">Transformez votre</span>
            <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
              entreprise
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Solutions d'automatisation, d'IA et de No-Code pour 
            <span className="text-red-400 font-semibold"> optimiser vos processus</span> 
            et gagner en efficacité
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="#services" 
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Découvrir nos services
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a 
              href="#contact" 
              className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Contactez-nous
              </span>
            </a>
          </div>

          {/* Stats ou témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "40%", text: "Gain d'efficacité moyen" },
              { number: "24h", text: "Réponse garantie" },
              { number: "100%", text: "Satisfaction client" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateur de scroll animé */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm">Découvrez nos solutions</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section moderne */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background décoratif */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20 transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-20 transform -translate-x-40 translate-y-40"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6">
              <Cpu className="w-4 h-4" />
              <span className="font-semibold text-sm">Nos Expertises</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Services <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Premium</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des solutions complètes pour digitaliser et automatiser vos processus métiers avec l'intelligence artificielle
            </p>
          </div>
          <ServicesSection />
        </div>
      </section>

      {/* Actualités IA Section */}
      <div id="veille">
        <LazySection className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <AINewsSection />
        </LazySection>
      </div>

      {/* Approach Section moderne */}
      <div id="approche">
        <LazySection className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background décoratif */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-50 to-transparent rounded-full opacity-40 transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-50 to-transparent rounded-full opacity-40 transform translate-x-40 translate-y-40"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold text-sm">Méthodologie</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Notre <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Approche</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Un accompagnement sur mesure en 4 étapes pour transformer votre entreprise
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Audit", desc: "Analyse de vos besoins et processus actuels", icon: <Shield className="w-6 h-6" />, color: "from-blue-500 to-blue-600" },
                { step: "02", title: "Stratégie", desc: "Plan d'action personnalisé et ROI prévu", icon: <TrendingUp className="w-6 h-6" />, color: "from-green-500 to-green-600" },
                { step: "03", title: "Déploiement", desc: "Mise en œuvre des solutions adaptées", icon: <Rocket className="w-6 h-6" />, color: "from-red-500 to-red-600" },
                { step: "04", title: "Support", desc: "Accompagnement et optimisation continus", icon: <Star className="w-6 h-6" />, color: "from-purple-500 to-purple-600" }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Numéro avec gradient */}
                    <div className={`text-6xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-6`}>
                      {item.step}
                    </div>
                    
                    {/* Icône avec gradient */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                      {item.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                    
                    {/* Ligne de connexion (sauf pour le dernier élément) */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LazySection>
      </div>

      {/* Contact Section moderne */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        {/* Background avec pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zM40%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>
        
        {/* Effets visuels */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Contactez-nous</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Prêt à <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">automatiser</span> vos processus ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Contactez-nous pour un audit gratuit et découvrez comment gagner en efficacité avec nos solutions IA
            </p>
          </div>
          
          {/* Contact Form Container */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ChatBot Widget */}
      <ChatBot />
    </div>
  );
}

export default App;
