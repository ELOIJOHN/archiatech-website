import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from 'lucide-react';

const MediaGallery = ({ title = "Galerie Média ArchiAtech", showTitle = true, items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Médias par défaut si aucun n'est fourni
  const defaultItems = [
    {
      type: 'video',
      src: '/videos/archiatech-hero.mp4',
      poster: '/images/archiatech-hero.jpg',
      title: 'Présentation ArchiAtech',
      description: 'Découvrez nos solutions d\'automatisation et d\'IA'
    },
    {
      type: 'image',
      src: '/images/hero-desktop.png',
      title: 'Interface Desktop',
      description: 'Vue desktop de notre plateforme'
    },
    {
      type: 'image',
      src: '/images/hero-mobile.png',
      title: 'Interface Mobile',
      description: 'Version mobile optimisée'
    },
    {
      type: 'image',
      src: '/images/archiatech-hero.jpg',
      title: 'Vision ArchiAtech',
      description: 'Notre approche de la transformation digitale'
    }
  ];

  const mediaItems = items.length > 0 ? items : defaultItems;

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(false);
  };

  const toggleVideoPlay = () => {
    const video = document.querySelector('.modal-video');
    if (video) {
      if (video.paused) {
        video.play();
        setIsVideoPlaying(true);
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = () => {
    const video = document.querySelector('.modal-video');
    if (video) {
      video.muted = !video.muted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <div className="w-full">
      {showTitle && (
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full"></div>
        </div>
      )}

      {/* Galerie en grille */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {mediaItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => openModal(index)}
          >
            {item.type === 'video' ? (
              <div className="relative bg-gray-900 aspect-video">
                <video
                  className="w-full h-full object-cover"
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ) : (
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <h4 className="text-white font-semibold text-sm truncate">{item.title}</h4>
              {item.description && (
                <p className="text-white/80 text-xs truncate">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de visualisation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-6xl max-h-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Contenu média */}
              <div className="relative">
                {mediaItems[currentIndex]?.type === 'video' ? (
                  <div className="relative">
                    <video
                      className="modal-video w-full max-h-[80vh] object-contain"
                      src={mediaItems[currentIndex].src}
                      poster={mediaItems[currentIndex].poster}
                      controls={false}
                      muted={isVideoMuted}
                      loop
                      onClick={(e) => e.stopPropagation()}
                    />
                    
                    {/* Contrôles vidéo personnalisés */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleVideoPlay(); }}
                        className="px-4 py-2 bg-white/90 hover:bg-white rounded-lg flex items-center space-x-2 text-gray-800 font-medium transition"
                      >
                        {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isVideoPlaying ? 'Pause' : 'Lecture'}</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleVideoMute(); }}
                        className="px-4 py-2 bg-white/90 hover:bg-white rounded-lg flex items-center space-x-2 text-gray-800 font-medium transition"
                      >
                        {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        <span>{isVideoMuted ? 'Activer' : 'Couper'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={mediaItems[currentIndex]?.src}
                    alt={mediaItems[currentIndex]?.title}
                    className="w-full max-h-[80vh] object-contain"
                  />
                )}
              </div>

              {/* Informations du média */}
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {mediaItems[currentIndex]?.title}
                </h3>
                {mediaItems[currentIndex]?.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {mediaItems[currentIndex].description}
                  </p>
                )}
                
                {/* Indicateur de position */}
                {mediaItems.length > 1 && (
                  <div className="flex items-center justify-center mt-4 space-x-2">
                    {mediaItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition ${
                          index === currentIndex ? 'bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaGallery;