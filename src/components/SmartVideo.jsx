import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings, Wifi, WifiOff, Smartphone, Monitor } from 'lucide-react';

export default function SmartVideo({ 
  src = "/videos/archiatech-hero.mp4",
  poster = "/images/hero-desktop.png",
  title = "Vidéo Intelligente",
  description = "Optimisée pour tous les appareils",
  className = "",
  lazyLoad = true,
  autoQuality = true,
  mobileOptimized = true
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [videoQuality, setVideoQuality] = useState('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionType, setConnectionType] = useState('unknown');
  const [deviceType, setDeviceType] = useState('desktop');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const ref = useRef(null);
  const isInViewport = useInView(ref, { threshold: 0.3 });

  // Détection du type d'appareil
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android/i.test(userAgent) && window.innerWidth >= 768;
      
      if (isMobile && !isTablet) {
        setDeviceType('mobile');
      } else if (isTablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // Détection de la connexion réseau
  useEffect(() => {
    const detectConnection = () => {
      if (navigator.connection) {
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;
        
        switch (effectiveType) {
          case 'slow-2g':
          case '2g':
            setConnectionType('slow');
            if (autoQuality) setVideoQuality('low');
            break;
          case '3g':
            setConnectionType('medium');
            if (autoQuality) setVideoQuality('medium');
            break;
          case '4g':
          default:
            setConnectionType('fast');
            if (autoQuality) setVideoQuality('high');
            break;
        }
      } else {
        setConnectionType('unknown');
        if (autoQuality) setVideoQuality('high');
      }
    };

    detectConnection();
    if (navigator.connection) {
      navigator.connection.addEventListener('change', detectConnection);
    }

    return () => {
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', detectConnection);
      }
    };
  }, [autoQuality]);

  // Lazy loading intelligent
  useEffect(() => {
    if (lazyLoad && isInViewport && !hasLoaded && !isLoading) {
      setIsLoading(true);
      // Simuler un délai de chargement pour l'effet visuel
      setTimeout(() => {
        setHasLoaded(true);
        setIsLoading(false);
      }, 500);
    }
  }, [lazyLoad, isInViewport, hasLoaded, isLoading]);

  // Gestion des événements vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (video && hasLoaded) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handleError = (e) => {
        setError('Erreur de chargement de la vidéo');
        setIsLoading(false);
      };
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, [hasLoaded]);

  // Auto-play intelligent basé sur le scroll et l'appareil
  useEffect(() => {
    if (videoRef.current && hasLoaded) {
      if (isInViewport && deviceType === 'desktop') {
        // Auto-play sur desktop seulement
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else if (!isInViewport) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInViewport, deviceType, hasLoaded]);

  // Gestion du timeout des contrôles
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getConnectionIcon = () => {
    switch (connectionType) {
      case 'slow':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Wifi className="w-4 h-4 text-yellow-500" />;
      case 'fast':
        return <Wifi className="w-4 h-4 text-green-500" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  // Optimisations pour mobile
  const getMobileOptimizations = () => {
    if (deviceType === 'mobile') {
      return {
        preload: 'none', // Pas de préchargement sur mobile
        playsInline: true,
        muted: true, // Toujours muet sur mobile pour éviter les problèmes
        controls: false // Contrôles personnalisés
      };
    }
    return {
      preload: 'metadata',
      playsInline: true,
      muted: isMuted,
      controls: false
    };
  };

  const mobileOpts = getMobileOptimizations();

  return (
    <div 
      ref={ref}
      className={`relative w-full rounded-2xl shadow-2xl overflow-hidden bg-gray-900 group ${className}`}
      onMouseMove={resetControlsTimeout}
      onMouseEnter={resetControlsTimeout}
      onMouseLeave={() => {
        setShowControls(false);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      }}
      onTouchStart={resetControlsTimeout}
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Indicateur de chargement */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <motion.div
              className="text-white text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm">Chargement optimisé...</p>
            </motion.div>
          </div>
        )}

        {/* Indicateur d'erreur */}
        {error && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="text-center text-white">
              <div className="text-red-500 mb-4">⚠️</div>
              <p className="text-sm mb-2">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setHasLoaded(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {/* Vidéo */}
        {hasLoaded && !error && (
          <video
            ref={videoRef}
            className="w-full h-auto rounded-2xl"
            src={src}
            poster={poster}
            muted={mobileOpts.muted}
            loop
            playsInline={mobileOpts.playsInline}
            preload={mobileOpts.preload}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}

        {/* Placeholder si lazy loading */}
        {!hasLoaded && !isLoading && !error && lazyLoad && (
          <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setHasLoaded(true);
                  setIsLoading(false);
                }, 500);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
            >
              <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-2xl">
                <Play className="w-8 h-8 text-red-600" />
              </div>
            </button>
          </div>
        )}

        {/* Overlay avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-2xl" />
        
        {/* Indicateurs de statut */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          {/* Indicateur d'appareil */}
          <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            {getDeviceIcon()}
            <span className="capitalize">{deviceType}</span>
          </div>
          
          {/* Indicateur de connexion */}
          <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            {getConnectionIcon()}
            <span className="capitalize">{connectionType === 'unknown' ? 'Auto' : connectionType}</span>
          </div>

          {/* Indicateur de qualité */}
          <div className={`px-2 py-1 rounded-full text-xs text-white ${
            videoQuality === 'high' ? 'bg-green-500' : 
            videoQuality === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {videoQuality === 'auto' ? 'Auto' : videoQuality.toUpperCase()}
          </div>
        </div>

        {/* Informations vidéo */}
        <motion.div
          className="absolute top-4 right-4 text-white"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>
        </motion.div>

        {/* Contrôles adaptatifs */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Barre de progression */}
          {duration > 0 && (
            <div className="mb-3">
              <div 
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer hover:h-2 transition-all group/progress"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/80 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Boutons de contrôle adaptés au device */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="bg-white/90 hover:bg-white text-red-600 font-semibold px-4 py-2 rounded-lg text-sm shadow-lg transition flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Lecture'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="bg-white/90 hover:bg-white text-gray-700 font-semibold px-3 py-2 rounded-lg text-sm shadow-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {deviceType !== 'mobile' && (
                <button
                  onClick={toggleMute}
                  className="bg-white/90 hover:bg-white text-gray-700 font-semibold px-3 py-2 rounded-lg text-sm shadow-lg transition flex items-center space-x-1"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isMuted ? 'Son' : 'Muet'}</span>
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="bg-white/90 hover:bg-white text-gray-700 font-semibold px-3 py-2 rounded-lg text-sm shadow-lg transition"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* Menu des paramètres */}
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 text-white rounded-lg p-3 shadow-xl min-w-[200px]">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-white/80 block mb-2">Vitesse de lecture</label>
                        <div className="flex space-x-1">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                            <button
                              key={rate}
                              onClick={() => changePlaybackRate(rate)}
                              className={`px-2 py-1 text-xs rounded ${
                                playbackRate === rate ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-white/80 block mb-2">Qualité</label>
                        <div className="flex space-x-1">
                          {['auto', 'high', 'medium', 'low'].map(qual => (
                            <button
                              key={qual}
                              onClick={() => setVideoQuality(qual)}
                              className={`px-2 py-1 text-xs rounded ${
                                videoQuality === qual ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
                              }`}
                            >
                              {qual === 'auto' ? 'Auto' : qual.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-white/60 pt-2 border-t border-white/20">
                        <p>Appareil: {deviceType}</p>
                        <p>Connexion: {connectionType}</p>
                        <p>Lazy load: {lazyLoad ? 'Activé' : 'Désactivé'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="bg-white/90 hover:bg-white text-gray-700 font-semibold px-3 py-2 rounded-lg text-sm shadow-lg transition"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Indicateur de lecture au centre (quand pas de contrôles) */}
        {!showControls && !isPlaying && hasLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={togglePlay}
              className="bg-white/90 hover:bg-white text-red-600 rounded-full p-4 shadow-2xl transition transform hover:scale-110"
            >
              <Play className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
