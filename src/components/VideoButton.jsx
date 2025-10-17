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
      className={`btn-archiatech btn-archiatech-sm ${className}`}
    >
      <Play className="w-4 h-4" />
      Voir la démo
    </button>
  );
}
