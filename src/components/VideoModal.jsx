import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Composant modal pour afficher les vidéos des services
 * @param {object} props - Les props du composant
 * @param {boolean} props.isOpen - État d'ouverture de la modal
 * @param {function} props.onClose - Fonction pour fermer la modal
 * @param {string} props.videoUrl - URL de la vidéo à afficher
 * @param {string} props.title - Titre du service
 */
const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const videoRef = useRef(null);

  // Gérer la lecture/pause de la vidéo
  useEffect(() => {
    if (isOpen && videoRef.current && videoUrl) {
      console.log('Ouverture modal vidéo:', { videoUrl, title });
      // Charger et jouer la vidéo quand la modal s'ouvre
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error('Erreur de lecture vidéo:', error);
      });
    } else if (!isOpen && videoRef.current) {
      console.log('Fermeture modal vidéo');
      // Pause et reset quand la modal se ferme
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen, videoUrl, title]);

  // Fermer la modal avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Empêcher le scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Restaurer le scroll
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[60vh] object-contain"
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            onLoadStart={() => console.log('Début de chargement vidéo:', videoUrl)}
            onLoadedData={() => console.log('Vidéo chargée:', videoUrl)}
            onCanPlay={() => console.log('Vidéo prête à être lue:', videoUrl)}
            onError={(e) => {
              console.error('Erreur de chargement vidéo:', e);
              console.log('URL tentée:', videoUrl);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Cliquez sur ✕ ou appuyez sur Échap pour fermer
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
