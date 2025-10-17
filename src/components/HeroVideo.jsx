import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";

export default function HeroVideo({ 
  src = "/videos/archiatech-hero.mp4",
  poster = "/images/hero-desktop.png",
  title = "Démonstration ArchiAtech",
  description = "Découvrez nos solutions d'automatisation",
  showInfo = true,
  className = ""
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
      };
    }
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
        videoRef.current.play();
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
      videoRef.current.play();
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

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full rounded-2xl shadow-2xl overflow-hidden bg-gray-900 group ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-auto rounded-2xl"
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster={poster}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Overlay avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-2xl" />

      {/* Informations vidéo */}
      {showInfo && (
        <motion.div
          className="absolute top-4 left-4 text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>
        </motion.div>
      )}

      {/* Contrôles principaux */}
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
              className="w-full h-1 bg-white/30 rounded-full cursor-pointer hover:h-2 transition-all"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/80 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* Boutons de contrôle */}
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

            <button
              onClick={toggleFullscreen}
              className="bg-white/90 hover:bg-white text-gray-700 font-semibold px-3 py-2 rounded-lg text-sm shadow-lg transition"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Indicateur de lecture au centre */}
      {!showControls && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.5 : 1 }}
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
  );
}