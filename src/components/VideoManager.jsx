import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const videoData = [
  {
    id: 'support',
    title: 'Support & Déploiement IT',
    filename: '20251011_2138_SupportIT.mp4',
    thumbnail: '/images/archiatech-hero.jpg'
  },
  {
    id: 'ia',
    title: 'Conseil & Intégration IA',
    filename: '20251011_2242_Conseil_Integration IA.mp4',
    thumbnail: '/images/hero-mobile.png'
  },
  {
    id: 'workflows',
    title: 'Automatisation Workflows',
    filename: '20251011_2259_Automatisation Workflows.mp4',
    thumbnail: '/images/archiatech-hero.jpg'
  },
  {
    id: 'nocode',
    title: 'Solutions No-Code/Low-Code',
    filename: '20251011_2313_NoCode_LowCode.mp4',
    thumbnail: '/images/archiatech-hero.jpg'
  },
  {
    id: 'formation',
    title: 'Formation & Accompagnement',
    filename: '20251011_2323_Formation_Accompagnement.mp4',
    thumbnail: '/images/hero-mobile.png'
  },
  {
    id: 'transformation',
    title: 'Transformation Digitale',
    filename: '20251011_2325_Transformation Digital.mp4',
    thumbnail: '/images/archiatech-hero.jpg'
  }
];

export default function VideoManager() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const mainVideoRef = useRef(null);
  const thumbnailVideosRef = useRef([]);

  // Auto-play seulement la vidéo active pour éviter les problèmes de performance
  useEffect(() => {
    // D'abord, mettre en pause toutes les vidéos vignettes
    thumbnailVideosRef.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
    
    // Puis jouer seulement la vidéo active
    if (thumbnailVideosRef.current[activeVideo]) {
      thumbnailVideosRef.current[activeVideo].currentTime = 0;
      thumbnailVideosRef.current[activeVideo].play().catch(() => {
        // Ignore les erreurs d'autoplay silencieusement
      });
    }
  }, [activeVideo]);

  // Écouter les événements de changement de vidéo depuis les boutons
  useEffect(() => {
    const handleVideoChangeEvent = (event) => {
      const { videoIndex } = event.detail;
      if (videoIndex >= 0 && videoIndex < videoData.length) {
        handleVideoChange(videoIndex);
      }
    };

    window.addEventListener('changeVideo', handleVideoChangeEvent);
    return () => {
      window.removeEventListener('changeVideo', handleVideoChangeEvent);
    };
  }, []);

  // Gestion du changement de vidéo principale
  const handleVideoChange = (index) => {
    setActiveVideo(index);
    setIsPlaying(true);
    
    // Mettre à jour la vidéo principale
    if (mainVideoRef.current) {
      mainVideoRef.current.src = `/videos/${videoData[index].filename}`;
      mainVideoRef.current.play().catch(() => {
        // Ignore les erreurs d'autoplay
      });
    }
  };

  // Contrôles vidéo principale
  const togglePlay = () => {
    if (mainVideoRef.current) {
      if (mainVideoRef.current.paused) {
        mainVideoRef.current.play();
        setIsPlaying(true);
      } else {
        mainVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = !mainVideoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Vidéo principale */}
      <div 
        className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-8"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={mainVideoRef}
          className="w-full h-auto"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={videoData[activeVideo].thumbnail}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={`/videos/${videoData[activeVideo].filename}`} type="video/mp4" />
        </video>

        {/* Overlay avec titre */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
          <h3 className="text-white font-bold text-lg">{videoData[activeVideo].title}</h3>
        </div>

        {/* Contrôles */}
        {showControls && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 transition"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 transition"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-white text-sm">
                {activeVideo + 1} / {videoData.length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grille des vidéos vignettes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {videoData.map((video, index) => (
          <div
            key={video.id}
            className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
              index === activeVideo 
                ? 'ring-4 ring-red-500 scale-105 shadow-xl' 
                : 'hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => handleVideoChange(index)}
          >
            <video
              ref={(el) => (thumbnailVideosRef.current[index] = el)}
              className="w-full h-24 object-cover"
              loop
              muted
              playsInline
              poster={video.thumbnail}
            >
              <source src={`/videos/${video.filename}`} type="video/mp4" />
            </video>
            
            {/* Overlay avec titre */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
              <div className="p-2 w-full">
                <h4 className="text-white text-xs font-semibold leading-tight">
                  {video.title}
                </h4>
              </div>
            </div>

            {/* Indicateur de sélection */}
            {index === activeVideo && (
              <div className="absolute top-2 right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                <Play className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-center mt-6 space-x-4">
        {videoData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleVideoChange(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeVideo ? 'bg-red-500' : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Voir ${videoData[index].title}`}
          />
        ))}
      </div>
    </div>
  );
}
