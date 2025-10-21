import React from 'react';
import { Shield, TrendingUp, Rocket, Star } from 'lucide-react';

export default function ApprocheSection() {
  const steps = [
    { 
      step: "01", 
      title: "Audit", 
      desc: "Analyse de vos besoins et processus actuels", 
      icon: <Shield className="w-6 h-6" /> 
    },
    { 
      step: "02", 
      title: "Stratégie", 
      desc: "Plan d'action personnalisé et ROI prévu", 
      icon: <TrendingUp className="w-6 h-6" /> 
    },
    { 
      step: "03", 
      title: "Déploiement", 
      desc: "Mise en œuvre des solutions adaptées", 
      icon: <Rocket className="w-6 h-6" /> 
    },
    { 
      step: "04", 
      title: "Support", 
      desc: "Accompagnement et optimisation continus", 
      icon: <Star className="w-6 h-6" /> 
    }
  ];

  return (
    <section 
      id="approche" 
      className="py-16 sm:py-20 md:py-24"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 30%, #0d0d0d 70%, #000000 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête centré */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-[#E60023] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 block">MÉTHODOLOGIE</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            Notre <span className="text-[#E60023]">Approche</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#a8b2d1] max-w-4xl mx-auto leading-relaxed">
            Un accompagnement sur mesure en 4 étapes
          </p>
        </div>

        {/* Grille des 4 cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              <div 
                className="p-8 sm:p-10 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-[#E60023]/20 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Numéro de l'étape - Rouge vif */}
                <div className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 text-[#E60023]">
                  {item.step}
                </div>
                
                {/* Icône dans carré rouge */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E60023] rounded-xl flex items-center justify-center text-white mb-6 mx-auto">
                  {item.icon}
                </div>
                
                {/* Titre de l'étape */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">{item.title}</h3>
                
                {/* Description */}
                <p className="text-base sm:text-lg text-[#a8b2d1] leading-relaxed text-center">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

