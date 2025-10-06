import React from 'react';
import { 
  Cpu, Zap, Code, Settings, GraduationCap, Lightbulb, 
  CheckCircle, ArrowRight, Menu, Mail, Phone, Globe, MapPin,
  Award, TrendingUp, Users, ShieldCheck, Search, Rocket, 
  Headphones, Target, Send, Star, Sparkles
} from 'lucide-react';

export default function ArchiAtechModern() {
  return (
    <div className="min-h-screen bg-white">
      {/* Styles pour l'hexagone */}
      <style>{`
        .hexagon {
          width: 60px;
          height: 69px;
          background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
          position: relative;
          display: inline-block;
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }
        .hexagon-large {
          width: 80px;
          height: 92px;
        }
        .hexagon-xl {
          width: 100px;
          height: 115px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.6); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation ultra moderne */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-2xl shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="hexagon flex items-center justify-center shadow-xl animate-pulse-glow">
                <span className="text-white font-bold text-xl relative" style={{ marginTop: '3px' }}>JE</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block">
                  Archi<span className="text-red-600">Atech</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">Digital Solutions</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-red-600 transition font-medium">Services</a>
              <a href="#expertise" className="text-gray-600 hover:text-red-600 transition font-medium">Expertise</a>
              <a href="#processus" className="text-gray-600 hover:text-red-600 transition font-medium">Processus</a>
              <a href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-red-500/50 transition-all flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Audit Gratuit</span>
              </a>
            </div>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section Ultra Moderne */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-50"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '700ms' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <Award className="w-4 h-4" />
                <span>Expert IT & IA certifié</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
                Je suis <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Johnny ELOI</span>
              </h1>
              
              <div className="mb-6">
                <h2 className="text-3xl font-black text-red-600 mb-2">EXPERT IT & IA</h2>
                <p className="text-xl text-gray-700 font-semibold">ArchiAtech Digital Solutions</p>
                <p className="text-gray-600 mt-2">Automatisation • Support IT • IA & No-Code</p>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <strong className="text-red-600">Accélérez votre transformation numérique</strong> et gagnez jusqu'à <strong>40% de temps</strong> sur vos tâches répétitives.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">+40% d'efficacité</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">150+ clients satisfaits</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">100% sécurisé</span>
                </div>
              </div>

              <div className="mb-8">
                <a href="#contact" className="group inline-flex items-center w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  AUDIT AUTOMATISATION GRATUIT
                </a>
              </div>

              <div className="space-y-3 text-gray-700">
                <a href="mailto:jeloi@archiatech.com" className="flex items-center hover:text-red-600 transition group">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium">jeloi@archiatech.com</span>
                </a>
                <a href="tel:0783829310" className="flex items-center hover:text-red-600 transition group">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium">07 83 82 93 10</span>
                </a>
                <a href="https://www.archiatech.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-red-600 transition group">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition">
                    <Globe className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium">www.archiatech.com</span>
                </a>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-red-600">
                <div className="flex items-center space-x-5 mb-8 pb-6 border-b-2 border-gray-100">
                  <div className="hexagon-xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                    <span className="text-white font-bold text-4xl relative" style={{ marginTop: '5px' }}>JE</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Johnny ELOI</h3>
                    <p className="text-red-600 font-bold text-lg">EXPERT IT & IA</p>
                    <p className="text-gray-600 text-sm mt-1">ArchiAtech Digital Solutions</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: <Zap className="w-6 h-6 text-white" />, title: "Automatisation", desc: "Workflows & RPA", color: "from-yellow-500 to-orange-600" },
                    { icon: <Cpu className="w-6 h-6 text-white" />, title: "Support IT", desc: "Déploiement & Maintenance", color: "from-blue-500 to-indigo-600" },
                    { icon: <Code className="w-6 h-6 text-white" />, title: "IA & No-Code", desc: "Solutions innovantes", color: "from-purple-500 to-pink-600" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:from-red-100 hover:to-orange-100 transition group">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-gray-100 text-center">
                  <p className="text-sm text-gray-500 italic">
                    ArchiAtech Digital Solutions
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Accélérez votre transformation numérique
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau Citation */}
      <section className="py-8 px-6 bg-gradient-to-r from-red-600 via-red-700 to-red-600">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white text-xl font-medium italic flex items-center justify-center space-x-3">
            <Star className="w-6 h-6" />
            <span>"ArchiAtech Digital Solutions - Accélérez votre transformation numérique"</span>
            <Star className="w-6 h-6" />
          </p>
        </div>
      </section>

      {/* Services Section Moderne */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold text-sm uppercase tracking-widest">Mes expertises</span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 mt-3">Services proposés</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour automatiser et digitaliser vos processus métiers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Automatisation Workflows",
                desc: "Automatisez vos tâches répétitives et gagnez des heures chaque semaine. RPA, connecteurs, API.",
                items: ["Make, Zapier, n8n", "Intégration API & Webhooks", "Automatisation emails & docs"],
                gradient: "from-yellow-500 to-orange-600"
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Intelligence Artificielle",
                desc: "Intégrez l'IA dans vos processus : chatbots, analyse de données, génération de contenu.",
                items: ["ChatGPT, Claude, Gemini", "Chatbots intelligents", "Analyse prédictive"],
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Solutions No-Code",
                desc: "Créez des applications et outils métiers sans code. Rapide, flexible, économique.",
                items: ["Airtable, Notion, Bubble", "Webflow, Softr", "Applications métiers"],
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Support IT & Déploiement",
                desc: "Installation, configuration et maintenance de votre infrastructure informatique.",
                items: ["Déploiement postes de travail", "Support technique 7j/7", "Maintenance préventive"],
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Formation & Accompagnement",
                desc: "Formez vos équipes aux outils d'automatisation et d'IA pour gagner en autonomie.",
                items: ["Formation sur-mesure", "Documentation complète", "Support post-formation"],
                gradient: "from-orange-500 to-red-600"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Conseil & Audit",
                desc: "Audit de vos processus et recommandations personnalisées pour optimiser votre efficacité.",
                items: ["Audit gratuit offert 🎁", "Roadmap d'automatisation", "ROI estimé"],
                gradient: "from-pink-500 to-rose-600"
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-xl`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus Section */}
      <section id="processus" className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold text-sm uppercase tracking-widest">Ma méthodologie</span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 mt-3">Comment je travaille</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus éprouvé en 4 étapes pour garantir votre réussite
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", icon: <Search className="w-7 h-7" />, title: "Audit & Diagnostic", desc: "J'analyse vos processus actuels pour identifier les opportunités d'automatisation et d'optimisation.", color: "from-blue-500 to-cyan-600" },
              { num: "02", icon: <Lightbulb className="w-7 h-7" />, title: "Conception & Stratégie", desc: "Je conçois une solution sur-mesure adaptée à vos besoins spécifiques et votre budget.", color: "from-yellow-500 to-orange-600" },
              { num: "03", icon: <Rocket className="w-7 h-7" />, title: "Déploiement & Formation", desc: "Mise en place des solutions avec formation complète de vos équipes pour une adoption réussie.", color: "from-purple-500 to-pink-600" },
              { num: "04", icon: <Headphones className="w-7 h-7" />, title: "Suivi & Optimisation", desc: "Support continu, maintenance et optimisation pour assurer votre succès à long terme.", color: "from-green-500 to-emerald-600" }
            ].map((step, idx) => (
              <div key={idx} className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:border-red-300 transition-all">
                <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                  {step.num}
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white mb-5 shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-red-600 font-bold text-sm uppercase tracking-widest">Pourquoi me choisir</span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 mt-3">Mon expertise à votre service</h2>
              <div className="space-y-5">
                {[
                  { title: "Expert certifié IT & IA", desc: "Plus de 10 ans d'expérience dans la transformation digitale" },
                  { title: "Accompagnement personnalisé", desc: "Je vous guide étape par étape dans votre transformation" },
                  { title: "ROI rapide et mesurable", desc: "Retour sur investissement visible dès les premiers mois" },
                  { title: "Support réactif 7j/7", desc: "Je suis disponible pour vous accompagner en continu" },
                  { title: "Solutions adaptées aux PME", desc: "Des tarifs accessibles et des solutions scalables" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-3xl p-10 text-white shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                <div className="relative">
                  <h3 className="text-3xl font-bold mb-6">Résultats concrets</h3>
                  <p className="text-red-100 mb-8 text-lg leading-relaxed">
                    Mes clients constatent en moyenne une <strong className="text-white">réduction de 40%</strong> du temps consacré aux tâches répétitives.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "95%", label: "Satisfaction client", icon: "⭐" },
                      { value: "150+", label: "Projets livrés", icon: "🚀" },
                      { value: "40%", label: "Gain de temps", icon: "⚡" },
                      { value: "24/7", label: "Support disponible", icon: "🎯" }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
                        <div className="text-4xl mb-2">{stat.icon}</div>
                        <div className="text-5xl font-bold mb-2">{stat.value}</div>
                        <div className="text-red-100 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offre Audit Gratuit */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12 border-4 border-red-600 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-block text-7xl mb-4">🎁</div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                  AUDIT AUTOMATISATION <span className="text-red-600">GRATUIT</span>
                </h2>
                <p className="text-xl text-gray-700 mb-6 font-medium">
                  Découvrez comment gagner jusqu'à 40% de temps sur vos tâches quotidiennes
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: <Search className="w-6 h-6 text-red-600" />, title: "Analyse complète", desc: "Audit de vos processus actuels" },
                  { icon: <Target className="w-6 h-6 text-red-600" />, title: "Opportunités identifiées", desc: "Recommandations personnalisées" },
                  { icon: <TrendingUp className="w-6 h-6 text-red-600" />, title: "ROI estimé", desc: "Calcul du retour sur investissement" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a href="#contact" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105">
                  🎁 RÉSERVER MON AUDIT GRATUIT
                  <ArrowRight className="ml-3 w-6 h-6" />
                </a>
                <p className="text-sm text-gray-600 mt-4 font-medium">Sans engagement • Durée : 30-45 minutes • En visio ou au téléphone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')` }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Contactez-moi</h2>
            <p className="text-xl text-red-100 leading-relaxed max-w-3xl mx-auto">
              Discutons de votre projet et de comment je peux vous aider à automatiser vos processus
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Mes coordonnées</h3>
              <div className="space-y-5">
                {[
                  { icon: <Mail className="w-6 h-6" />, label: "Email", value: "jeloi@archiatech.com", href: "mailto:jeloi@archiatech.com" },
                  { icon: <Phone className="w-6 h-6" />, label: "Téléphone", value: "07 83 82 93 10", href: "tel:0783829310" },
                  { icon: <Globe className="w-6 h-6" />, label: "Site web", value: "www.archiatech.com", href: "https://www.archiatech.com" },
                  { icon: <MapPin className="w-6 h-6" />, label: "Localisation", value: "Paris & Île-de-France", href: null }
                ].map((contact, idx) => (
                  contact.href ? (
                    <a key={idx} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center space-x-4 text-white hover:text-red-200 transition group">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-red-200">{contact.label}</p>
                        <p className="font-semibold">{contact.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div key={idx} className="flex items-center space-x-4 text-white">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-red-200">{contact.label}</p>
                        <p className="font-semibold">{contact.value}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-moi un message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
                  <input 
                    type="text" 
                    placeholder="Jean Dupont" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email professionnel *</label>
                  <input 
                    type="email" 
                    placeholder="jean.dupont@entreprise.com" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    placeholder="06 12 34 56 78" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Votre projet *</label>
                  <textarea 
                    rows={4}
                    placeholder="Décrivez-moi votre besoin en quelques mots..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-red-500/50 transition transform hover:scale-105 flex items-center justify-center">
                  Envoyer ma demande
                  <Send className="ml-2 w-5 h-5" />
                </button>
                <p className="text-xs text-gray-500 text-center font-medium">
                  Je vous réponds sous 24h maximum
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="hexagon-large flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-2xl relative" style={{ marginTop: '4px' }}>JE</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white block">ArchiAtech</span>
                  <span className="text-xs text-gray-400">Digital Solutions</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Solutions digitales innovantes pour PME et startups. Automatisation, IA et No-Code.
              </p>
              <p className="text-sm text-gray-400">
                <strong className="text-white">Johnny ELOI</strong><br/>
                Expert IT & Intelligence Artificielle
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-red-400 transition">Automatisation Workflows</a></li>
                <li><a href="#services" className="hover:text-red-400 transition">Intelligence Artificielle</a></li>
                <li><a href="#services" className="hover:text-red-400 transition">Solutions No-Code</a></li>
                <li><a href="#services" className="hover:text-red-400 transition">Support IT</a></li>
                <li><a href="#services" className="hover:text-red-400 transition">Formation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-400" />
                  <a href="mailto:jeloi@archiatech.com" className="hover:text-red-400 transition">jeloi@archiatech.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-400" />
                  <a href="tel:0783829310" className="hover:text-red-400 transition">07 83 82 93 10</a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-red-400" />
                  <a href="https://www.archiatech.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">www.archiatech.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              ArchiAtech Digital Solutions - Accélérez votre transformation numérique
            </p>
            <p className="text-xs text-gray-600">
              © 2025 Johnny ELOI - ArchiAtech Digital Solutions. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
