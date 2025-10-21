import React, { useState } from 'react';
import { Cpu, Zap, Cog, Users, Code, Rocket, CheckCircle, Star, TrendingUp, Shield } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const services = [
    {
      icon: <Cog className="w-7 h-7" />,
      title: "Support & Déploiement IT",
      description: "Installation, configuration et déploiement de postes de travail en toute sérénité",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: "Conseil & Intégration IA",
      description: "Solutions d'intelligence artificielle appliquées à vos processus métiers",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Automatisation Workflows",
      description: "RPA, connecteurs, API pour optimiser vos processus",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: <Code className="w-7 h-7" />,
      title: "Solutions No-Code / Low-Code",
      description: "Développement avec Zapier, Make, Airtable, Notion, Bubble...",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Formation & Accompagnement",
      description: "Support continu et formation de vos équipes",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      title: "Transformation Digitale",
      description: "Stratégie complète d'innovation et de digitalisation",
      gradient: "from-red-600 to-red-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Archi<span className="text-red-600">Atech</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setActiveTab('services')} className="text-gray-600 hover:text-red-600 transition font-medium">Services</button>
              <button onClick={() => setActiveTab('approach')} className="text-gray-600 hover:text-red-600 transition font-medium">Notre approche</button>
              <button onClick={() => setActiveTab('contact')} className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Accompagnez votre transformation avec l'<span className="text-red-600">intelligence artificielle</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Solutions d'automatisation, d'IA et de No-Code pour optimiser vos processus métiers et gagner en efficacité.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => setActiveTab('services')} className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
              Découvrir nos services
            </button>
            <button onClick={() => setActiveTab('contact')} className="px-8 py-4 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition">
              Contactez-nous
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {activeTab === 'services' && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Nos expertises</span>
              <h2 className="text-5xl font-bold text-gray-900 mb-4 mt-3">Services Premium</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des solutions complètes pour digitaliser et automatiser vos processus métiers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Approach Section */}
      {activeTab === 'approach' && (
        <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Méthodologie</span>
              <h2 className="text-5xl font-bold text-gray-900 mb-4 mt-3">Notre Approche</h2>
              <p className="text-xl text-gray-600">Un accompagnement sur mesure en 4 étapes</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Audit", desc: "Analyse de vos besoins et processus actuels", icon: <Shield className="w-6 h-6" /> },
                { step: "02", title: "Stratégie", desc: "Plan d'action personnalisé et ROI prévu", icon: <TrendingUp className="w-6 h-6" /> },
                { step: "03", title: "Déploiement", desc: "Mise en œuvre des solutions adaptées", icon: <Rocket className="w-6 h-6" /> },
                { step: "04", title: "Support", desc: "Accompagnement et optimisation continus", icon: <Star className="w-6 h-6" /> }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-7xl font-bold bg-gradient-to-br from-red-100 to-red-200 bg-clip-text text-transparent mb-4">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeTab === 'contact' && (
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl font-bold text-white mb-6 text-center">Prêt à automatiser vos processus ?</h2>
            <p className="text-xl text-red-100 mb-10 leading-relaxed text-center">
              Contactez-nous pour un audit gratuit et découvrez comment gagner en efficacité
            </p>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Informations de contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-white">📧</span>
                      </div>
                      <span className="text-red-100">contact@archiatech.fr</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-white">📱</span>
                      </div>
                      <span className="text-red-100">+33 1 23 45 67 89</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Demandez un devis</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Nom complet" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-red-200" />
                    <input type="email" placeholder="Email professionnel" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-red-200" />
                    <textarea placeholder="Décrivez vos besoins..." className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-red-200 h-24"></textarea>
                    <button className="w-full px-6 py-3 bg-white text-red-700 rounded-xl font-semibold hover:bg-gray-50 transition">
                      Envoyer la demande
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Default Home Content */}
      {activeTab === 'home' && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Nos avantages</span>
                <h2 className="text-5xl font-bold text-gray-900 mb-8 mt-3">Pourquoi ArchiAtech ?</h2>
                <div className="space-y-5">
                  {[
                    "Expertise pointue en IA et No-Code",
                    "Accompagnement personnalisé de A à Z",
                    "ROI mesurable et rapide",
                    "Support technique continu 7j/7",
                    "Solutions adaptées aux PME/Startups",
                    "Innovation technologique permanente"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg text-gray-700 group-hover:text-gray-900 transition">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-3xl p-10 text-white shadow-2xl">
                  <h3 className="text-3xl font-bold mb-6">Gagnez jusqu'à 40% de temps</h3>
                  <p className="text-red-100 mb-8 text-lg leading-relaxed">
                    Nos clients constatent en moyenne une réduction de 40% du temps consacré aux tâches répétitives.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <div className="text-5xl font-bold mb-2">95%</div>
                      <div className="text-red-100">Satisfaction client</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <div className="text-5xl font-bold mb-2">150+</div>
                      <div className="text-red-100">Projets livrés</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
