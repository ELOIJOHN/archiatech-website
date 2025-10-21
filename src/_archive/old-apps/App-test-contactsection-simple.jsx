import React from 'react';

// Version simplifiée de ContactSection sans composant Button complexe
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ApprocheSection from './components/ApprocheSection';
import Avantages from './components/Avantages';
import VideoSection from './components/VideoSection';
import NewsSection from './components/NewsSection';

// Composant ContactSection simplifié
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
      <NewsSection />
      <SimpleContactSection />
      
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
            ✅ ContactSection Simplifié Fonctionne !
          </h2>
          <p>Le problème venait probablement du composant Button complexe.</p>
          <p>Nous allons maintenant tester ArchiAgent.</p>
        </div>
      </div>
    </div>
  );
}
