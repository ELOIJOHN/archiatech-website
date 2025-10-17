import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Loader, X } from 'lucide-react';

export default function MobileTouchVideo({
  src = "/videos/archiatech-hero.mp4",
  poster = "/images/hero-desktop.png",
  title = "Vidéo Mobile",
  description = "Optimisée pour le touch",
  className = ""
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  // Valeurs pour les gestures
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useTransform(x, [-100, 100], [-5, 5]);

  // Gestion des événements vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  // Auto-hide controls après 3 secondes
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Gestion du double tap pour play/pause
  const handleDoubleTap = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap détecté
      togglePlay();
      
      // Animation visuelle
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full bg-white/30 pointer-events-none';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.left = `${e.touches[0].clientX - 50}px`;
      ripple.style.top = `${e.touches[0].clientY - 50}px`;
      ripple.style.animation = 'ripple 0.6s ease-out';
      containerRef.current?.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    setLastTap(now);
  };

  // Gestion des gestures de swipe
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
    resetControlsTimeout();
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return;

    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;

    // Swipe vertical pour ajuster la luminosité (côté gauche)
    if (Math.abs(deltaY) > Math.abs(deltaX) && e.touches[0].clientX < window.innerWidth / 2) {
      const newBrightness = Math.max(50, Math.min(150, brightness - deltaY / 2));
      setBrightness(newBrightness);
    }

    // Swipe vertical pour ajuster le volume (côté droit)
    if (Math.abs(deltaY) > Math.abs(deltaX) && e.touches[0].clientX > window.innerWidth / 2) {
      const newVolume = Math.max(0, Math.min(1, volume - deltaY / 200));
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
    }

    // Swipe horizontal pour avancer/reculer
    if (Math.abs(deltaX) > Math.abs(deltaY) && videoRef.current && duration) {
      const seekTime = (deltaX / window.innerWidth) * 10; // 10 secondes par swipe complet
      const newTime = Math.max(0, Math.min(duration, currentTime + seekTime));
      videoRef.current.currentTime = newTime;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
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

  const handleProgressTouch = (e) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0] || e.changedTouches[0];
      const pos = (touch.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onTouchStart={handleDoubleTap}
    >
      {/* Vidéo avec filtres */}
      <div 
        className="relative aspect-video"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={src}
          poster={poster}
          muted={isMuted}
          playsInline
          preload="metadata"
          style={{ filter: `brightness(${brightness}%)` }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Indicateur de chargement */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center space-y-3">
              <Loader className="w-12 h-12 text-white animate-spin" />
              <p className="text-white text-sm">Chargement...</p>
            </div>
          </div>
        )}

        {/* Informations vidéo */}
        <motion.div
          className="absolute top-4 left-4 right-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{title}</h3>
              <p className="text-white/90 text-sm drop-shadow-lg">{description}</p>
            </div>
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Indicateurs de gesture */}
        <motion.div
          className="absolute top-1/2 left-4 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 0.5 : 0 }}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white text-xs">
            <div className="flex flex-col items-center">
              <span className="text-2xl">☀️</span>
              <span>{brightness}%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-4 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 0.5 : 0 }}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white text-xs">
            <div className="flex flex-col items-center">
              <Volume2 className="w-6 h-6" />
              <span>{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Bouton central play/pause */}
        {!isPlaying && !showControls && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.button
              onClick={togglePlay}
              className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 shadow-2xl"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Play className="w-10 h-10 ml-1" />
            </motion.button>
          </motion.div>
        )}

        {/* Contrôles mobiles optimisés */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Barre de progression tactile */}
          {duration > 0 && (
            <div className="space-y-1">
              <div
                className="relative w-full h-2 bg-white/30 rounded-full overflow-hidden"
                onTouchStart={handleProgressTouch}
                onTouchMove={handleProgressTouch}
              >
                <div
                  className="absolute h-full bg-red-600 rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
                  style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/90">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Boutons de contrôle touch-friendly */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={togglePlay}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 shadow-lg"
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </motion.button>

              <motion.button
                onClick={handleRestart}
                className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700"
                whileTap={{ scale: 0.9 }}
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleMute}
                className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700"
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>

              <motion.button
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700"
                whileTap={{ scale: 0.9 }}
              >
                <Maximize className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Instructions gesture (première utilisation) */}
        {!isPlaying && showControls && (
          <motion.div
            className="absolute bottom-24 left-0 right-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-black/50 backdrop-blur-sm inline-block px-4 py-2 rounded-full text-white text-xs">
              👆 Double tap pour lire • Swipe pour naviguer
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
