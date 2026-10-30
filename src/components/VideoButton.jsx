import React from 'react';
import { Play } from 'lucide-react';

const videoMapping = {
  "Support & Déploiement IT": 0,
  "Conseil & Intégration IA": 1,
  "Automatisation Workflows": 2,
  "Solutions No-Code/Low-Code": 3,
  "Formation & Accompagnement": 4,
  "Transformation Digitale": 5
};

export default function VideoButton({ serviceTitle, className = "" }) {
  const scrollToVideoSection = () => {
    // Scroll vers la section vidéo
    const videoSection = document.getElementById('videos');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
      
      // Attendre un peu puis déclencher le changement de vidéo
      setTimeout(() => {
        const videoIndex = videoMapping[serviceTitle];
        if (videoIndex !== undefined) {
          // Déclencher un événement personnalisé pour changer la vidéo
          window.dispatchEvent(new CustomEvent('changeVideo', { 
            detail: { videoIndex } 
          }));
        }
      }, 500);
    }
  };

  return (
    <button
      onClick={scrollToVideoSection}
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                  bg-[#E60023] hover:bg-red-700 text-white font-semibold
                  transition-colors focus:outline-none focus:ring-2 focus:ring-[#E60023]/50
                  w-full sm:w-auto sm:self-start ${className}`}
    >
      <Play className="w-4 h-4" />
      Voir la démo
    </button>
  );
}
