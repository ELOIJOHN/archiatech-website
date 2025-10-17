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
    <section id="approche" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#E60023] font-semibold text-xs sm:text-sm uppercase tracking-wider">Méthodologie</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 mt-2 sm:mt-3">Notre Approche</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 px-4">Un accompagnement sur mesure en 4 étapes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              <div className="bg-gray-900/50 backdrop-blur-md p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-[#E60023]/40 hover:shadow-xl hover:shadow-[#E60023]/20 transition-all duration-300">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-[#E60023]/20 to-[#E60023]/10 bg-clip-text text-transparent mb-3 sm:mb-4">
                  {item.step}
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#E60023] to-red-700 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">{item.desc}</p>
              </div>
              {index < 3 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#E60023]/40 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

