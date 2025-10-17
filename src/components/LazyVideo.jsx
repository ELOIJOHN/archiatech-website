import React, { useRef, useEffect, useState } from 'react';

/**
 * Composant LazyVideo - Vidéo avec lazy loading
 * - Chargement différé des vidéos
 * - Détection de visibilité avec IntersectionObserver
 * - Preload minimal pour économiser la bande passante
 * - Pause automatique hors écran
 */
const LazyVideo = ({
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

  // IntersectionObserver pour détecter quand la vidéo est visible
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          
          // Charger la vidéo quand elle devient visible
          if (entry.isIntersecting && videoRef.current && !isLoaded) {
            videoRef.current.load();
            setIsLoaded(true);
          }

          // Pause/Play automatique basé sur la visibilité
          if (autoPlay && videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(err => {
                console.log('Autoplay prevented:', err);
              });
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        rootMargin: '100px', // Commence à charger 100px avant d'être visible
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
  }, [priority, autoPlay, isLoaded]);

  // Gestion du chargement
  const handleLoadedData = (e) => {
    if (onLoad) onLoad(e);
  };

  return (
    <video
      ref={videoRef}
      className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      poster={poster}
      autoPlay={false} // On gère l'autoplay manuellement
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      preload={priority ? 'auto' : 'metadata'}
      onLoadedData={handleLoadedData}
      {...props}
    >
      {/* Charger la source seulement quand nécessaire */}
      {(isVisible || priority) && src && (
        <source src={src} type="video/mp4" />
      )}
      Votre navigateur ne supporte pas la vidéo HTML5.
    </video>
  );
};

/**
 * Hook pour preloader des vidéos critiques
 */
export const useVideoPreload = (videoSources) => {
  useEffect(() => {
    if (!videoSources || videoSources.length === 0) return;

    videoSources.forEach((src) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = src;
    });
  }, [videoSources]);
};

export default LazyVideo;
