import React, { useState } from 'react';

const DropdownMenu = ({ onServiceSelect, activeService = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { id: 0, title: "Support IT", icon: "⚙️" },
    { id: 1, title: "Conseil & Intégration IA", icon: "🤖" },
    { id: 2, title: "Automatisation Workflows", icon: "⚡" },
    { id: 3, title: "No Code / Low Code", icon: "🔧" },
    { id: 4, title: "Formation & Accompagnement", icon: "👥" },
    { id: 5, title: "Transformation Digitale", icon: "🚀" }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleServiceClick = (serviceId) => {
    onServiceSelect(serviceId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu principal */}
      <div 
        className="relative overflow-hidden"
        style={{
          background: 'rgba(26, 26, 26, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Bouton principal */}
        <button
          onClick={handleToggle}
          className={`w-full px-6 py-4 text-left transition-all duration-300 flex items-center justify-between group ${
            isOpen ? 'rounded-t-2xl' : 'rounded-2xl'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderBottom: isOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <span 
              className="text-white font-medium text-base"
              style={{
                fontFamily: 'Poppins, Montserrat, sans-serif',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
              }}
            >
              Nos Services IT
            </span>
          </div>
          
          {/* Icône de flèche animée */}
          <div 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Liste déroulante */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            background: 'rgba(26, 26, 26, 0.8)',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px'
          }}
        >
          <div className="py-2">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`w-full px-6 py-3 text-left transition-all duration-300 flex items-center gap-3 group relative overflow-hidden ${
                  service.id === activeService 
                    ? service.id === 1 // Conseil & Intégration IA
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 animate-glow-pulse'
                      : 'bg-gradient-to-r from-red-600 to-red-700'
                    : service.id === 1 // Effet hover spécial pour IA
                      ? 'hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-cyan-600/20 hover:shadow-lg hover:shadow-cyan-500/30'
                      : 'hover:bg-white/10'
                }`}
                style={{
                  animationDelay: isOpen ? `${index * 0.1}s` : '0s',
                  animation: isOpen ? 'slideInFromTop 0.4s ease-out forwards' : 'none'
                }}
              >
                {/* Indicateur de sélection */}
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    service.id === activeService ? 'animate-pulse' : 'bg-white/40'
                  }`}
                  style={{
                    backgroundColor: service.id === 1 && service.id === activeService ? '#00FFFF' : 'white',
                    boxShadow: service.id === activeService 
                      ? service.id === 1 
                        ? '0 0 12px rgba(0, 255, 255, 0.8)' 
                        : '0 0 8px rgba(255, 255, 255, 0.8)'
                      : 'none'
                  }}
                ></div>

                {/* Icône du service */}
                <span className="text-lg">{service.icon}</span>

                {/* Titre du service */}
                <span 
                  className="text-white font-medium text-sm flex-1"
                  style={{
                    fontFamily: 'Poppins, Montserrat, sans-serif',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {service.title}
                </span>

                {/* Effet de brillance pour le service actif */}
                {service.id === activeService && (
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: service.id === 1 
                        ? 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      animation: 'shimmer 2s infinite'
                    }}
                  ></div>
                )}

                {/* Effet spécial pour Conseil & Intégration IA */}
                {service.id === 1 && (
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(239, 68, 68, 0.1))',
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  ></div>
                )}

                {/* Effet de glow au survol */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Effet de rebond au déploiement */}
        {isOpen && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)',
              borderRadius: '16px',
              animation: 'bounceIn 0.6s ease-out'
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;

