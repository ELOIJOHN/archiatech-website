import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Eye, Clock, Heart, Share2, Download } from 'lucide-react';

const InteractiveVideoGallery = ({ 
  title = "Galerie Vidéo Interactive", 
  videos = [],
  showStats = true,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [videoStats, setVideoStats] = useState({});

  // Vidéos par défaut si aucune n'est fournie
  const defaultVideos = [
    {
      id: 1,
      src: '/videos/archiatech-hero.mp4',
      poster: '/images/archiatech-hero.jpg',
      title: 'Présentation ArchiAtech',
      description: 'Découvrez nos solutions d\'automatisation et d\'IA',
      duration: '2:30',
      views: 1250,
      likes: 89,
      category: 'Démonstration',
      tags: ['IA', 'Automatisation', 'Innovation']
    },
    {
      id: 2,
      src: '/videos/service-automation.mp4',
      poster: '/images/automation-poster.jpg',
      title: 'Automatisation Workflows',
      description: 'Comment optimiser vos processus métiers',
      duration: '1:45',
      views: 890,
      likes: 67,
      category: 'Service',
      tags: ['Workflow', 'RPA', 'Productivité']
    },
    {
      id: 3,
      src: '/videos/service-ia-integration.mp4',
      poster: '/images/ia-poster.jpg',
      title: 'Intégration IA',
      description: 'Solutions d\'intelligence artificielle',
      duration: '3:15',
      views: 2100,
      likes: 156,
      category: 'Technologie',
      tags: ['IA', 'Machine Learning', 'Innovation']
    },
    {
      id: 4,
      src: '/videos/service-it-support.mp4',
      poster: '/images/support-poster.jpg',
      title: 'Support IT',
      description: 'Déploiement et maintenance',
      duration: '2:00',
      views: 650,
      likes: 34,
      category: 'Support',
      tags: ['IT', 'Déploiement', 'Maintenance']
    }
  ];

  const videoList = videos.length > 0 ? videos : defaultVideos;

  // Gestion des statistiques des vidéos
  useEffect(() => {
    const stats = {};
    videoList.forEach(video => {
      stats[video.id] = {
        views: video.views || Math.floor(Math.random() * 2000) + 100,
        likes: video.likes || Math.floor(Math.random() * 200) + 10,
        shares: Math.floor(Math.random() * 50) + 5
      };
    });
    setVideoStats(stats);
  }, [videoList]);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    // Incrémenter les vues
    const videoId = videoList[index].id;
    setVideoStats(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        views: (prev[videoId]?.views || 0) + 1
      }
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleLike = (videoId, e) => {
    e.stopPropagation();
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
        // Décrémenter les likes
        setVideoStats(prevStats => ({
          ...prevStats,
          [videoId]: {
            ...prevStats[videoId],
            likes: Math.max(0, (prevStats[videoId]?.likes || 0) - 1)
          }
        }));
      } else {
        newSet.add(videoId);
        // Incrémenter les likes
        setVideoStats(prevStats => ({
          ...prevStats,
          [videoId]: {
            ...prevStats[videoId],
            likes: (prevStats[videoId]?.likes || 0) + 1
          }
        }));
      }
      return newSet;
    });
  };

  const shareVideo = (videoId, e) => {
    e.stopPropagation();
    const video = videoList.find(v => v.id === videoId);
    if (navigator.share && video) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href
      }).catch(console.error);
    }
    // Incrémenter les partages
    setVideoStats(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        shares: (prev[videoId]?.shares || 0) + 1
      }
    }));
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Titre */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full"></div>
      </div>

      {/* Grille de vidéos interactives */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {videoList.map((video, index) => (
          <motion.div
            key={video.id}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openModal(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Conteneur vidéo avec effets */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              {/* Vidéo de prévisualisation */}
              <video
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={video.src}
                poster={video.poster}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
              />

              {/* Overlay avec dégradé dynamique */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: hoveredIndex === index ? 0.8 : 0.6 }}
                transition={{ duration: 0.3 }}
              />

              {/* Indicateur de durée */}
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </div>

              {/* Bouton play central avec animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ 
                  scale: hoveredIndex === index ? 1.1 : 0.8,
                  opacity: hoveredIndex === index ? 1 : 0.8 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-2xl transition-all duration-300">
                  <Play className="w-8 h-8 text-red-600" />
                </div>
              </motion.div>

              {/* Effet de vague au hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: hoveredIndex === index ? 1 : 0,
                  opacity: hoveredIndex === index ? 0.3 : 0
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-full h-full bg-gradient-radial from-red-500/30 to-transparent rounded-full"></div>
              </motion.div>
            </div>

            {/* Informations de la vidéo */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-semibold text-sm leading-tight flex-1 pr-2">
                  {video.title}
                </h4>
                <button
                  onClick={(e) => toggleLike(video.id, e)}
                  className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                    likedVideos.has(video.id) 
                      ? 'text-red-500 bg-white/20' 
                      : 'text-white/70 hover:text-red-500 hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              {video.description && (
                <p className="text-white/80 text-xs mb-2 line-clamp-2">
                  {video.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {video.tags?.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-red-500/20 text-red-300 text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Statistiques et actions */}
              {showStats && (
                <div className="flex items-center justify-between text-white/70 text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{formatNumber(videoStats[video.id]?.views || video.views)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{formatNumber(videoStats[video.id]?.likes || video.likes)}</span>
                    </span>
                  </div>
                  <button
                    onClick={(e) => shareVideo(video.id, e)}
                    className="hover:text-white transition-colors"
                  >
                    <Share2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Indicateur de catégorie */}
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {video.category}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de visualisation améliorée */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
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
              {/* Header avec titre et bouton fermer */}
              <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {videoList[currentIndex]?.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {videoList[currentIndex]?.category} • {videoList[currentIndex]?.duration}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-700 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              {videoList.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevVideo(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextVideo(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Vidéo principale */}
              <div className="relative">
                <video
                  className="w-full max-h-[70vh] object-contain"
                  src={videoList[currentIndex]?.src}
                  poster={videoList[currentIndex]?.poster}
                  controls
                  autoPlay
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Informations et actions */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {videoList[currentIndex]?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {videoList[currentIndex]?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => toggleLike(videoList[currentIndex]?.id, e)}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                        likedVideos.has(videoList[currentIndex]?.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedVideos.has(videoList[currentIndex]?.id) ? 'fill-current' : ''}`} />
                      <span>{formatNumber(videoStats[videoList[currentIndex]?.id]?.likes || videoList[currentIndex]?.likes)}</span>
                    </button>
                    <button
                      onClick={(e) => shareVideo(videoList[currentIndex]?.id, e)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Partager</span>
                    </button>
                  </div>
                </div>
                
                {/* Indicateur de position */}
                {videoList.length > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    {videoList.map((_, index) => (
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

export default InteractiveVideoGallery;
