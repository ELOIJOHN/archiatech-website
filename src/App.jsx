import React, { useState } from 'react';
import { Cpu, Zap, Cog, Users, Code, Rocket, CheckCircle, ArrowRight, Menu, Mail, Phone, MapPin, Star, TrendingUp, Shield } from 'lucide-react';

export default function ArchiAtechWebsite() {
  const [showHeroImage, setShowHeroImage] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Premium */}
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
              <a href="#services" className="text-gray-600 hover:text-red-600 transition font-medium">Services</a>
              <a href="#approche" className="text-gray-600 hover:text-red-600 transition font-medium">Notre approche</a>
              <a href="#contact" className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">
                Contact
              </a>
            </div>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section Premium */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-50"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-full text-sm font-semibold mb-6">
                <Rocket className="w-4 h-4" />
                <span> ArchiAtech – Bâtissez l’avenir de votre entreprise avec l’IA.</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Transformez votre entreprise avec{' '}
                <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
                  l'IA
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gagnez en efficacité et réduisez vos coûts grâce à nos solutions d'intelligence artificielle et d'automatisation no-code.
              </p>
              
              {/* Stats Pills */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">+40% d'efficacité</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">100% sécurisé</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center">
                  Demander une démo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="mailto:jeloi@archiatech.com?subject=Audit%20d%27automatisation%20gratuit&body=Bonjour%20ArchiAtech,%20je%20souhaite%20un%20audit%20gratuit.%20(Indiquez%20votre%20entreprise%2C%20besoin%20et%20disponibilit%C3%A9s)" className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-red-600 hover:text-red-600 transition">
                  Audit gratuit
                </a>
              </div>
            </div>

            {/* Hero Illustration avec vidéo */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-red-600 to-red-900 rounded-3xl p-8 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                  {/* Média principal (vidéo avec fallback image) */}
                  <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                    {showHeroImage ? (
                      <img
                        src="https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1600&auto=format&fit=crop"
                        alt="Démonstration automatisation ArchiAtech"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    ) : (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        onError={() => setShowHeroImage(true)}
                      >
                        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
                      </video>
                    )}
                  </div>
                  
                  {/* Liste avec icônes */}
                  <div className="space-y-3">
                    {[
                      { icon: <Zap className="w-6 h-6 text-red-600" />, title: "Automatisation", desc: "Workflows intelligents" },
                      { icon: <Cpu className="w-6 h-6 text-red-700" />, title: "Intelligence IA", desc: "Solutions sur-mesure" },
                      { icon: <Code className="w-6 h-6 text-red-600" />, title: "No-Code", desc: "Développement rapide" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 group hover:bg-red-50 p-2 rounded-lg transition">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Premium */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Nos expertises</span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4 mt-3">Services Premium</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour digitaliser et automatiser vos processus métiers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
                title: "Solutions No-Code/Low-Code",
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
            ].map((service, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`relative w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="relative text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="relative text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <a href="#services" className="relative text-red-600 font-semibold flex items-center group-hover:gap-2 transition-all">
                  En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Approche Premium */}
      <section id="approche" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
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
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-red-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir Premium */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                <div className="relative">
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
        </div>
      </section>

      {/* CTA Final Premium */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6 text-center">Prêt à automatiser vos processus ?</h2>
          <p className="text-xl text-red-100 mb-10 leading-relaxed text-center">
            Contactez-nous pour un audit gratuit et découvrez comment gagner en efficacité
          </p>
          {(() => {
            const [fullName, setFullName] = useState('');
            const [email, setEmail] = useState('');
            const [company, setCompany] = useState('');
            const [message, setMessage] = useState('');

            const handleSubmit = (e) => {
              e.preventDefault();
              const subject = 'Demande d\'audit – ArchiAtech';
              const body = `Bonjour ArchiAtech,%0D%0A%0D%0ANom: ${encodeURIComponent(fullName)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0ASociété: ${encodeURIComponent(company)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AMerci.`;
              window.location.href = `mailto:jeloi@archiatech.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            };

            return (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-red-100 mb-2">Nom complet</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-red-100 mb-2">Email professionnel</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@entreprise.com"
                      className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-red-100 mb-2">Société</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="ArchiAtech"
                      className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-red-100 mb-2">Message</label>
                    <textarea
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Décrivez brièvement vos besoins..."
                      className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="px-6 py-3 bg-white text-red-700 rounded-xl font-semibold hover:shadow-2xl transition">
                    Envoyer la demande
                  </button>
                  <a href="mailto:jeloi@archiatech.com" className="px-6 py-3 bg-transparent border border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 transition">
                    Ou nous écrire directement
                  </a>
                </div>
              </form>
            );
          })()}
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">ArchiAtech</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">Solutions digitales innovantes pour PME et startups</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-red-400 transition">Support IT</a></li>
              <li><a href="#services" className="hover:text-red-400 transition">Conseil IA</a></li>
              <li><a href="#services" className="hover:text-red-400 transition">Automatisation</a></li>
              <li><a href="#services" className="hover:text-red-400 transition">No-Code</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Entreprise</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#approche" className="hover:text-red-400 transition">À propos</a></li>
              <li><a href="#services" className="hover:text-red-400 transition">Blog</a></li>
              <li><a href="#approche" className="hover:text-red-400 transition">Carrières</a></li>
              <li><a href="#contact" className="hover:text-red-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400" />
                contact@archiatech.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400" />
                +33 07 83 82 93 10
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                Roquebrune Cap Martin, France
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© 2025 ArchiAtech Digital Solutions. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
/*
Analyse du programme :

Ce composant React représente la page principale d'un site vitrine premium pour ArchiAtech, une entreprise spécialisée dans l'IA, l'automatisation et le no-code pour PME/startups.

Structure :
- Navigation fixe en haut avec branding et liens vers les sections principales.
- Hero section très visuelle, mettant en avant l'offre et les bénéfices (efficacité, sécurité).
- Sections "Services", "Notre Approche", "Pourquoi nous choisir" : chaque partie utilise des grilles, icônes et textes pour présenter l'expertise, la méthodologie et les avantages.
- CTA final avec formulaire d'email pour audit gratuit.
- Footer complet avec informations, liens et contacts.

Points forts :
- Utilisation de Tailwind CSS pour le style moderne et responsive.
- Icônes Lucide pour l'aspect graphique.
- Structure claire, chaque section est bien délimitée et facilement modifiable.
- Composant unique, facile à intégrer dans une application React.

Axes d'amélioration :
- Découper en plusieurs composants pour faciliter la maintenance et la réutilisation.
- Ajouter de la logique (gestion du formulaire, navigation mobile, etc.).
- Internationalisation si besoin.
- Optimiser l'accessibilité (labels, aria, etc.).

En résumé : le code est bien organisé pour une landing page premium, prêt à être modularisé et enrichi selon les besoins.

Réponse à ta question :
Si le site s'affiche "en brut" (sans styles), c'est probablement que Tailwind CSS n'est pas chargé correctement.
Vérifie que :
- Tailwind est bien installé et configuré dans ton projet (fichier tailwind.config.js, import dans index.css).
- Le fichier CSS généré par Tailwind est bien importé dans ton entrypoint (ex: src/index.js ou src/main.jsx).
- Aucun problème de build ou d'import dans la console du navigateur (erreurs 404 sur le CSS, etc.).
- Le déploiement sur https://www.archiatech.com inclut bien le CSS généré.

Sans Tailwind, tous les styles utilitaires (className="...") ne s'appliquent pas, d'où l'affichage brut.
*/
