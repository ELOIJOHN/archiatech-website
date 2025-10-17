import React from 'react';
import { Rocket } from 'lucide-react';
import './Glassmorphism.css';

const LogoCorner = () => {
  return (
    <div 
      className="fixed bottom-6 left-6 z-40 cursor-pointer group"
      style={{
        opacity: 0.6,
        transition: 'all 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.6';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div 
        className="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300"
        style={{
          backgroundColor: 'rgba(26, 26, 26, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Icône fusée avec effet de brillance */}
        <div 
          className="relative flex items-center justify-center w-8 h-8 rounded-full animate-gentle-glow"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
          }}
        >
          <Rocket 
            className="w-5 h-5 text-white animate-soft-shine" 
            style={{
              filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.4))'
            }}
          />
          
          {/* Effet de brillance périodique */}
          <div 
            className="absolute inset-0 rounded-full animate-gentle-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
            }}
          ></div>
        </div>

        {/* Texte du logo */}
        <div className="flex flex-col">
          <span 
            className="text-sm font-bold"
            style={{
              color: '#fff',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              letterSpacing: '0.5px'
            }}
          >
            ArchiAtech
          </span>
          <span 
            className="text-xs"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textShadow: '0 1px 2px rgba(0,0,0,0.4)'
            }}
          >
            Solutions IA
          </span>
        </div>

        {/* Effet de brillance au survol */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(239, 68, 68, 0.1))',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default LogoCorner;
