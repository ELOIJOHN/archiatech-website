import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const BackgroundVideo = ({ 
  src, 
  poster, 
  overlay = true, 
  overlayColor = 'black', 
  overlayOpacity = 0.4,
  controls = false,
  autoPlay = true,
  loop = true,
  muted = true,
  className = '',
  children 
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Lecture automatique bloquée:', error);
        });
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Vidéo d'arrière-plan */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onMouseEnter={() => controls && setShowControls(true)}
        onMouseLeave={() => controls && setShowControls(false)}
      />

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${overlayColor}/${overlayOpacity} 0%, ${overlayColor}/${overlayOpacity * 0.7} 100%)`
          }}
        />
      )}

      {/* Contrôles personnalisés */}
      {controls && (
        <motion.div
          className="absolute bottom-4 right-4 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={togglePlay}
            className="bg-white/90 hover:bg-white text-gray-800 font-medium px-3 py-2 rounded-lg text-sm shadow-lg transition flex items-center space-x-1"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Lecture'}</span>
          </button>

          <button
            onClick={toggleMute}
            className="bg-white/90 hover:bg-white text-gray-800 font-medium px-3 py-2 rounded-lg text-sm shadow-lg transition flex items-center space-x-1"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? 'Son' : 'Muet'}</span>
          </button>
        </motion.div>
      )}

      {/* Contenu par-dessus la vidéo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;