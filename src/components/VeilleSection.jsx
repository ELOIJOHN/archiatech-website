import React from 'react';
import VideoShowcase from './VideoShowcase';
import NewsSectionSimple from './NewsSectionSimple';

export default function VeilleSection() {
  return (
    <>
      <section id="videos" className="py-12 sm:py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="text-[#E60023] font-semibold text-xs sm:text-sm uppercase tracking-wider">Nos Solutions</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 sm:mt-3 mb-3 sm:mb-4">Démonstrations Vidéos</h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Découvrez nos solutions d'automatisation et d'IA à travers des démonstrations détaillées
            </p>
          </div>
        </div>
        <VideoShowcase />
      </section>

      {/* Section Actualités avec données statiques */}
      <NewsSectionSimple />
    </>
  );
}

