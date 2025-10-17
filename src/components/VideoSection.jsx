import React from 'react';
import VideoManager from './VideoManager';

export default function VideoSection() {
  return (
    <section id="videos" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#E60023] font-semibold text-sm uppercase tracking-wider">
            Nos Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Démonstrations Vidéos
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Découvrez nos solutions d'automatisation et d'IA à travers des démonstrations détaillées. 
            Cliquez sur une vignette pour voir la vidéo correspondante en grand.
          </p>
        </div>
        
        <VideoManager />
        
        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            💡 <strong>Astuce :</strong> Toutes les vidéos se lancent automatiquement en boucle. 
            Cliquez sur une vignette pour changer la vidéo principale.
          </p>
        </div>
      </div>
    </section>
  );
}
