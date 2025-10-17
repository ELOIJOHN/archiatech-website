import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings, Subtitles } from 'lucide-react';

export default function ScrollVideo({ 
  src = "/videos/archiatech-hero.mp4",
  poster = "/images/hero-desktop.png",
  title = "Démonstration ArchiAtech",
  description = "Découvrez nos solutions d'automatisation",
  autoPlayOnScroll = true,
  className = "",
  quality = 'auto' // 'auto', 'high', 'medium', 'low'
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [videoQuality, setVideoQuality] = useState(quality);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const ref = useRef(null);
  const isInViewport = useInView(ref, { threshold: 0.5 });

  // Auto-play intelligent basé sur le scroll
  useEffect(() => {
    if (autoPlayOnScroll && videoRef.current) {
      if (isInViewport && !isPlaying) {
        videoRef.current.play().catch(() => {
          // Fallback si auto-play échoue
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else if (!isInViewport && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInViewport, autoPlayOnScroll, isPlaying]);

  // Détection de la qualité réseau et adaptation automatique
  useEffect(() => {
    const handleNetworkChange = () => {
      if (navigator.connection) {
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;
        
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setVideoQuality('low');
        } else if (effectiveType === '3g') {
          setVideoQuality('medium');
        } else {
          setVideoQuality('high');
        }
      }
    };

    if (navigator.connection) {
      navigator.connection.addEventListener('change', handleNetworkChange);
      handleNetworkChange(); // Appel initial
    }

    return () => {
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', handleNetworkChange);
      }
    };
  }, []);

  // Gestion des événements vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  // Gestion du timeout des contrôles
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

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

  // Sélection automatique de la source vidéo selon la qualité
  const getVideoSrc = () => {
    if (quality === 'auto') {
      return src; // Le navigateur choisira automatiquement
    }
    
    // Pour une implémentation future avec plusieurs qualités
    const baseName = src.replace(/\.[^/.]+$/, "");
    const extension = src.split('.').pop();
    
    switch (videoQuality) {
      case 'high':
        return `${baseName}-high.${extension}`;
      case 'medium':
        return `${baseName}-medium.${extension}`;
      case 'low':
        return `${baseName}-low.${extension}`;
      default:
        return src;
    }
  };

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
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <video
          ref={videoRef}
          className="w-full h-auto rounded-2xl"
          src={getVideoSrc()}
          poster={poster}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedData={() => {
            // Auto-play si la vidéo entre dans le viewport
            if (autoPlayOnScroll && isInViewport) {
              videoRef.current?.play().catch(() => setIsPlaying(false));
            }
          }}
        />

        {/* Overlay avec dégradé et indicateur de scroll */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-2xl" />
        
        {/* Indicateur de scroll pour auto-play */}
        {autoPlayOnScroll && (
          <motion.div
            className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs"
            animate={{ 
              opacity: isInViewport ? 1 : 0.5,
              scale: isInViewport ? 1 : 0.9 
            }}
            transition={{ duration: 0.3 }}
          >
            {isInViewport ? '🔴 En cours' : '⏸️ En pause'}
          </motion.div>
        )}

        {/* Informations vidéo */}
        <motion.div
          className="absolute top-4 left-4 text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>
        </motion.div>

        {/* Contrôles avancés */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Barre de progression améliorée */}
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
                {/* Bulle de temps au hover */}
                <div className="absolute -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none">
                  {formatTime(currentTime)}
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/80 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    videoQuality === 'high' ? 'bg-green-500' : 
                    videoQuality === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {videoQuality === 'high' ? 'HD' : videoQuality === 'medium' ? 'MQ' : 'LQ'}
                  </span>
                  <span>{formatTime(duration)}</span>
                </span>
              </div>
            </div>
          )}

          {/* Boutons de contrôle principaux */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="bg-white/90 hover:bg-white text-red-600 font-semibold px-4 py-2 rounded-lg text-sm shadow-lg transition flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Lecture'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="bg-white/90 hover:bg-white text-gray-700 font-semibold px-3 py-2 rounded-lg text-sm shadow-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="bg-white/90 hover:bg-white text-gray-700 font-semibold px-3 py-2 rounded-lg text-sm shadow-lg transition flex items-center space-x-1"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isMuted ? 'Son' : 'Muet'}</span>
              </button>

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
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-white/80 block mb-1">Vitesse de lecture</label>
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
                        <label className="text-xs text-white/80 block mb-1">Qualité</label>
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
        {!showControls && !isPlaying && (
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
