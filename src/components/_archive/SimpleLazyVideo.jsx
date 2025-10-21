import React, { useRef, useEffect, useState } from 'react';

/**
 * Composant SimpleLazyVideo - Version simplifiée et robuste
 * - Lazy loading basique des vidéos
 * - Pas de pause automatique (plus simple)
 * - Chargement différé avec IntersectionObserver
 */
const SimpleLazyVideo = ({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  priority = false,
  onLoad,
  ...props
}) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);

  // IntersectionObserver pour lazy loading
  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Commence à charger 50px avant d'être visible
        threshold: 0.1
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [priority]);

  // Gestion du chargement
  const handleLoadedData = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Si pas encore visible, afficher un placeholder
  if (!isVisible) {
    return (
      <div
        ref={videoRef}
        className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '200px'
        }}
      >
        <div className="text-gray-400 text-sm">Chargement vidéo...</div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      preload={priority ? 'auto' : 'metadata'}
      onLoadedData={handleLoadedData}
      {...props}
    >
      <source src={src} type="video/mp4" />
      Votre navigateur ne supporte pas la vidéo HTML5.
    </video>
  );
};

export default SimpleLazyVideo;
