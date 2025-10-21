import React, { useState } from 'react';
import { Cpu, Zap, Cog, Users, Code, Rocket, CheckCircle, ArrowRight, Menu, Mail, Phone, MapPin, Star, TrendingUp, Shield } from 'lucide-react';
import HeroVideo from "./components/HeroVideo";
import MediaGallery from "./components/MediaGallery";
import BackgroundVideo from "./components/BackgroundVideo";

function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = "Demande d'audit – ArchiAtech";
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
}

export default function ArchiAtechWebsite() {
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <BackgroundVideo src="/videos/working-test.mp4" />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Transformez votre entreprise avec <span className="text-red-500">l'IA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Gagnez en efficacité et réduisez vos coûts grâce à nos solutions d'intelligence artificielle et d'automatisation no-code.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 shadow-xl">
              Demander une démo
            </a>
            <a href="#services" className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition duration-300 shadow-xl">
              Nos services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Prêt à automatiser vos processus?</h2>
          <p className="text-xl mb-8">Contactez-nous pour un audit gratuit et découvrez comment gagner en efficacité.</p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <a href="#" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white">Archi<span className="text-red-600">Atech</span></span>
            </a>
            <p className="text-sm">Votre partenaire en intelligence artificielle, automatisation et transformation digitale.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Automatisation</a></li>
              <li><a href="#" className="hover:text-white transition">Intelligence Artificielle</a></li>
              <li><a href="#" className="hover:text-white transition">Support IT</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@archiatech.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+33 7 83 82 93 10</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-600 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 ArchiAtech. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}