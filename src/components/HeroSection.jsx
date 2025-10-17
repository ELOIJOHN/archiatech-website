import React from 'react';
import { Rocket } from 'lucide-react';
import HeroVideo from './HeroVideo';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[70vh] xs:min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh]
                 flex items-center justify-center relative overflow-hidden
                 bg-gradient-to-br from-gray-900 via-black to-gray-900
                 landscape:min-h-[90vh]"
    >
      {/* Background Elements - Optimisés pour différents écrans */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E60023]/10 via-transparent to-[#E60023]/5"></div>
      <div className="absolute top-8 xs:top-10 sm:top-16 md:top-20
                      right-4 xs:right-5 sm:right-8 md:right-10
                      w-32 h-32 xs:w-40 xs:h-40 sm:w-56 sm:h-56 md:w-72 md:h-72
                      bg-[#E60023]/20 rounded-full mix-blend-multiply
                      filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-8 xs:bottom-10 sm:bottom-16 md:bottom-20
                      left-4 xs:left-5 sm:left-8 md:left-10
                      w-32 h-32 xs:w-40 xs:h-40 sm:w-56 sm:h-56 md:w-72 md:h-72
                      bg-[#E60023]/20 rounded-full mix-blend-multiply
                      filter blur-3xl opacity-20 animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8
                      relative z-10 pt-14 xs:pt-16 sm:pt-20 md:pt-24 w-full">
        {/* Titre principal centré avec animations */}
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 fade-in-up">
          <div className="inline-flex items-center space-x-1.5 xs:space-x-2
                          px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2
                          bg-[#E60023]/20 border border-[#E60023]/40 text-[#E60023]
                          rounded-full text-[0.7rem] xs:text-xs sm:text-sm
                          font-semibold mb-3 xs:mb-4 sm:mb-6 backdrop-blur-md
                          touch-target">
            <Rocket className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 glow-pulse flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">ArchiAtech – Bâtissez l'avenir de votre entreprise avec l'IA</span>
            <span className="sm:hidden whitespace-nowrap">ArchiAtech – IA & Automatisation</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                         font-bold hero-text mb-3 xs:mb-4 sm:mb-6
                         leading-tight px-2 xs:px-3 sm:px-4">
            Transformez votre entreprise avec{' '}
            <span className="bg-gradient-to-r from-[#E60023] via-red-600 to-[#E60023]
                           bg-clip-text text-transparent glow-pulse">
              l'IA
            </span>
          </h1>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl
                        hero-text-light mb-5 xs:mb-6 sm:mb-8
                        leading-relaxed max-w-3xl mx-auto px-3 xs:px-4 sm:px-6">
            Gagnez en efficacité et réduisez vos coûts grâce à nos solutions d'intelligence artificielle et d'automatisation no-code.
          </p>
        </div>

        {/* Section vidéo centrée avec dimensions ajustées */}
        <div className="flex justify-center px-2 xs:px-0">
          <div className="w-full max-w-6xl glass-effect
                          p-1.5 xs:p-2 sm:p-3 md:p-4
                          flex flex-col justify-center mx-auto fade-in-up-delay-1
                          rounded-lg xs:rounded-xl sm:rounded-2xl">
            <div className="video-gradient video-red-glow
                            rounded-md xs:rounded-lg sm:rounded-xl md:rounded-2xl
                            overflow-hidden aspect-video">
              <HeroVideo
                src={`${import.meta.env.BASE_URL}videos/archiatech-hero.mp4`}
                poster={`${import.meta.env.BASE_URL}images/archiatech-hero.jpg`}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}