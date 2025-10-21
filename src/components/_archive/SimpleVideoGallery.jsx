import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import NavigationBar from './NavigationBar';
import LogoCorner from './LogoCorner';

const SimpleVideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleServiceSelect = (serviceId) => {
    if (serviceId === activeVideo) return; // Éviter les transitions inutiles
    
    setIsTransitioning(true);
    
    // Effet sonore simulé (clic UI doux)
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Transition visuelle de 1 seconde
    setTimeout(() => {
      setActiveVideo(serviceId);
      setIsTransitioning(false);
    }, 500);
  };

  const videos = [
    { id: 0, title: "Support IT", file: "20251011_2138_SupportIT.mp4" },
    { id: 1, title: "Conseil & Intégration IA", file: "20251011_2242_Conseil_Integration%20IA.mp4" },
    { id: 2, title: "Automatisation Workflows", file: "20251011_2259_Automatisation%20Workflows.mp4" },
    { id: 3, title: "No Code / Low Code", file: "20251011_2313_NoCode_LowCode.mp4" },
    { id: 4, title: "Formation & Accompagnement", file: "20251011_2323_Formation_Accompagnement.mp4" },
    { id: 5, title: "Transformation Digitale", file: "20251011_2325_Transformation%20Digital.mp4" }
  ];

  return (
    <>
      {/* Barre de navigation */}
      <NavigationBar />
      
      <div className="relative w-full h-screen bg-black">
      {/* Vidéo principale avec transition */}
      <div className="absolute inset-0">
        <video
          key={videos[activeVideo].file}
          src={`/videos/${videos[activeVideo].file}`}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          onError={(e) => {
            console.error('Erreur de chargement vidéo:', e);
            console.log('Fichier tenté:', `/videos/${videos[activeVideo].file}`);
            // Essayer avec le nom de fichier non encodé
            const fallbackFile = videos[activeVideo].file.replace(/%20/g, ' ').replace(/IA/g, 'Intégration IA');
            e.target.src = `/videos/${fallbackFile}`;
          }}
          onLoadStart={() => {
            console.log('Début de chargement vidéo:', `/videos/${videos[activeVideo].file}`);
          }}
          onCanPlay={() => {
            console.log('Vidéo prête à être lue:', videos[activeVideo].title);
          }}
        />
        
        {/* Overlay de transition */}
        {isTransitioning && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(239, 68, 68, 0.1))',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)'
            }}
          >
            <div className="text-center animate-pulse">
              <div className="text-6xl mb-4">🤖</div>
              <h3 
                className="text-2xl font-bold text-white"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  fontFamily: 'Poppins, Montserrat, sans-serif'
                }}
              >
                Accompagnez votre transformation avec l'intelligence artificielle
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Overlay avec titre */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        <div className="absolute bottom-8 left-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            {videos[activeVideo].title}
          </h2>
        </div>
      </div>

      {/* Menu déroulant en bas à droite */}
      <div className="absolute bottom-8 right-8 z-40">
        <DropdownMenu 
          onServiceSelect={handleServiceSelect} 
          activeService={activeVideo}
        />
      </div>

      {/* Logo ArchiAtech en coin inférieur gauche */}
      <LogoCorner />

      </div>
    </>
  );
};

export default SimpleVideoGallery;
