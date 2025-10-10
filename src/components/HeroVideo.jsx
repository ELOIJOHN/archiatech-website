import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

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

  return (
    <motion.div
      className="relative w-full rounded-2xl shadow-lg overflow-hidden bg-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <video
        ref={videoRef}
        className="w-full h-auto rounded-2xl"
        src="/videos/archiatech-hero.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/images/hero-desktop.png"
      />

      {/* Boutons de contrôle */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={togglePlay}
          className="bg-white/80 hover:bg-white text-red-600 font-bold px-3 py-2 rounded-full text-sm shadow-md transition"
        >
          {isPlaying ? "⏸ Pause" : "▶ Lecture"}
        </button>

        <button
          onClick={toggleMute}
          className="bg-white/80 hover:bg-white text-red-600 font-bold px-3 py-2 rounded-full text-sm shadow-md transition"
        >
          {isMuted ? "🔇 Activer son" : "🔊 Couper son"}
        </button>
      </div>

      {/* Dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
    </motion.div>
  );
}