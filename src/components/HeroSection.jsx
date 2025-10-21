import React from 'react';
import { Rocket } from 'lucide-react';
import YouTubePlayerSimple from './YouTubePlayerSimple';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[70vh] xs:min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh]
                 relative overflow-hidden
                 bg-gradient-to-br from-white via-gray-50 to-blue-50
                 flex flex-col justify-center items-center
                 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
                 pt-20 pb-8 xs:pt-24 xs:pb-10 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20"
    >
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cercles flottants */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-25 animate-pulse"></div>
        
        {/* Lignes géométriques */}
        <div className="absolute top-1/3 right-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        {/* Slogan professionnel avec effet lumineux */}
        <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="slogan-professionnel
                          inline-flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6
                          px-6 xs:px-8 sm:px-10 md:px-12 lg:px-16
                          py-4 xs:py-5 sm:py-6 md:py-7 lg:py-8
                          text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                          font-black text-white
                          bg-gradient-to-r from-[#E60023] via-red-600 to-[#E60023]
                          border-3 border-[#E60023]
                          rounded-2xl
                          shadow-[0_0_20px_rgba(230,0,35,0.6),0_0_40px_rgba(230,0,35,0.4),0_0_60px_rgba(230,0,35,0.2)]
                          drop-shadow-lg
                          mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16
                          animate-slogan-glow">
            <Rocket className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14" />
            <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              ArchiAtech – Bâtissez l'avenir de votre entreprise avec l'IA
            </span>
          </div>
        </div>

        {/* Titre principal */}
        <div className="mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                         font-black text-gray-900
                         leading-tight
                         mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7">
            <span className="block bg-gradient-to-r from-[#E60023] via-red-600 to-[#E60023] 
                             bg-clip-text text-transparent
                             drop-shadow-lg font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">ARCHIATECH</span>
            <span className="block text-gray-900 font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">accompagne</span>
            <span className="block text-gray-900 font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">votre entreprise</span>
          </h1>
        </div>

        {/* Sous-titre avec style moderne */}
        <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-block px-8 xs:px-10 sm:px-12 md:px-16 lg:px-20 py-4 xs:py-5 sm:py-6 md:py-7 lg:py-8
                          bg-gradient-to-r from-[#E60023] via-red-600 to-[#E60023]
                          rounded-2xl shadow-[0_0_30px_rgba(230,0,35,0.6),0_0_60px_rgba(230,0,35,0.4)]
                          transform hover:scale-105 transition-all duration-300">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                           font-black text-white uppercase tracking-wider
                           drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                           animate-pulse">
              INNOVEZ, ÉVOLUEZ, EXCELLEZ
            </h2>
          </div>
        </div>

        {/* Sous-titre élégant avec défilement sur 3 niveaux */}
        <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20 overflow-hidden">
          {/* Premier niveau */}
          <div className="animate-scroll-level-1 whitespace-nowrap mb-4">
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
                          font-light text-gray-600
                          leading-relaxed px-3 xs:px-4 sm:px-6
                          tracking-wide inline-block">
              Votre avenir commence ici
            </p>
          </div>
          
          {/* Deuxième niveau */}
          <div className="animate-scroll-level-2 whitespace-nowrap mb-4">
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
                          font-light text-gray-600
                          leading-relaxed px-3 xs:px-4 sm:px-6
                          tracking-wide inline-block">
              Accélérez votre transformation numérique et libérez du temps pour ce qui compte vraiment.
            </p>
          </div>
          
          {/* Troisième niveau */}
          <div className="animate-scroll-level-3 whitespace-nowrap">
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
                          font-light text-gray-600
                          leading-relaxed px-3 xs:px-4 sm:px-6
                          tracking-wide inline-block">
              Concentrez-vous sur votre cœur de métier pendant que l'IA automatise vos tâches chronophages.
            </p>
          </div>
        </div>

        {/* Section playlist YouTube avec cadre lumineux */}
        <div className="flex justify-center px-2 xs:px-0">
          <div className="w-full max-w-6xl video-container-spectacular
                          p-1.5 xs:p-2 sm:p-3 md:p-4
                          flex flex-col justify-center mx-auto fade-in-up-delay-1
                          rounded-lg xs:rounded-xl sm:rounded-2xl">
            <div className="video-gradient video-red-glow
                            rounded-md xs:rounded-lg sm:rounded-xl md:rounded-2xl
                            overflow-hidden p-4 bg-white">
              <YouTubePlayerSimple />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}