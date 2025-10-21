import React from 'react';
import { Rocket } from 'lucide-react';
import HeroVideoSimple from './HeroVideoSimple';

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-[70vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E60023]/10 via-transparent to-[#E60023]/5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#E60023]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#E60023]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20">
        {/* Titre principal centré avec animations */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#E60023]/20 border border-[#E60023]/40 text-[#E60023] rounded-full text-sm font-semibold mb-6 backdrop-blur-md">
            <Rocket className="w-4 h-4" />
            <span>ArchiAtech – Bâtissez l'avenir de votre entreprise avec l'IA</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Transformez votre entreprise avec{' '}
            <span className="bg-gradient-to-r from-[#E60023] via-red-600 to-[#E60023] bg-clip-text text-transparent">
              l'IA
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto text-white/80">
            Gagnez en efficacité et réduisez vos coûts grâce à nos solutions d'intelligence artificielle et d'automatisation no-code.
          </p>
        </div>

        {/* Section vidéo centrée avec dimensions ajustées */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl glass-effect p-4 flex flex-col justify-center mx-auto">
            <div className="video-gradient video-red-glow rounded-2xl overflow-hidden" style={{ aspectRatio: '16/6' }}>
              <HeroVideoSimple />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
