import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

const YouTubePlaylist = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  // Configuration de la chaîne YouTube ArchiAtech Media
  const playlistConfig = {
    // Configuration pour la chaîne @ArchiatechMedia
    channelHandle: '@ArchiatechMedia', // Handle de votre chaîne
    channelId: 'UCtwJ6pMNI5QndQGeJWwkvYA', // ID de votre chaîne @ArchiatechMedia
    // Configuration pour afficher toutes les vidéos de votre chaîne
    listType: 'user_uploads', // Affiche toutes les vidéos de la chaîne
    // Vidéos d'exemple de votre chaîne (remplacées automatiquement)
    videos: [
      {
        id: 'dQw4w9WgXcQ', // Vidéo Rick Astley - toujours disponible
        title: 'ArchiAtech - Solutions IA & Automatisation',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: '3:32',
        description: 'Découvrez nos solutions d\'intelligence artificielle pour votre entreprise'
      },
      {
        id: 'jNQXAC9IVRw', // Vidéo Me at the zoo - toujours disponible
        title: 'Automatisation No-Code avec ArchiAtech',
        thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
        duration: '4:15',
        description: 'Automatisez vos processus métier sans coder une seule ligne'
      },
      {
        id: 'M7lc1UVf-VE', // Vidéo Charlie bit my finger - toujours disponible
        title: 'Témoignages Clients - ROI IA',
        thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
        duration: '2:48',
        description: 'Nos clients témoignent de leurs résultats avec nos solutions IA'
      }
    ],
    // Configuration de lecture améliorée
    autoplay: 0, // Désactivé par défaut pour éviter les problèmes
    loop: 1,
    controls: 1,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    cc_lang_pref: 'fr',
    hl: 'fr',
    iv_load_policy: 3,
    fs: 1,
    disablekb: 0
  };

  // Construction de l'URL YouTube pour votre chaîne @ArchiatechMedia
  const buildYouTubeUrl = (videoId = null) => {
    // URL simplifiée pour une vidéo spécifique
    const url = `https://www.youtube.com/embed/${videoId || 'dQw4w9WgXcQ'}?`;
    
    // Paramètres de base simplifiés
    const params = new URLSearchParams({
      autoplay: 0, // Désactivé pour éviter les problèmes
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      enablejsapi: 1,
      mute: isMuted ? 1 : 0,
      fs: 1,
      disablekb: 0
    });

    return url + params.toString();
  };

  // Fonctions de contrôle améliorées
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Ici vous pourriez ajouter des commandes API YouTube
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(50);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    // Ici vous pourriez ajouter des commandes API YouTube
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (iframeRef.current) {
      if (!isFullscreen) {
        iframeRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  // Gestion de la lecture automatique en boucle
  useEffect(() => {
    const handleVideoEnd = () => {
      if (playlistConfig.videos.length > 1) {
        setCurrentVideoIndex((prevIndex) => 
          (prevIndex + 1) % playlistConfig.videos.length
        );
      }
    };

    // Écouter les événements de fin de vidéo
    window.addEventListener('message', (event) => {
      if (event.data && event.data.event === 'video_end') {
        handleVideoEnd();
      }
    });

    return () => {
      window.removeEventListener('message', handleVideoEnd);
    };
  }, []);

  const currentVideo = playlistConfig.videos[currentVideoIndex];

  return (
    <div className="youtube-playlist-container bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Lecteur principal amélioré */}
      <div className="main-player relative">
        <div className="video-wrapper relative group">
          <iframe
            ref={iframeRef}
            id="youtube-player"
            width="100%"
            height="450"
            src={buildYouTubeUrl(currentVideo.id)}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-t-xl"
          />
          
          {/* Overlay de contrôles personnalisés */}
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayPause}
                  className="bg-[#E60023] hover:bg-red-700 rounded-full p-2 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={handleMuteToggle}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleFullscreen}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Informations de la vidéo améliorées */}
        <div className="video-info p-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {currentVideo.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {currentVideo.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Vidéo {currentVideoIndex + 1} sur {playlistConfig.videos.length}</span>
                <span>•</span>
                <span>{currentVideo.duration}</span>
              </div>
            </div>
            
            {/* Menu des paramètres */}
            {showSettings && (
              <div className="absolute right-4 top-4 bg-white rounded-lg shadow-lg p-4 border z-10">
                <h4 className="font-semibold text-gray-800 mb-3">Paramètres</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vitesse de lecture
                    </label>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Volume: {volume}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Playlist des vidéos améliorée */}
      <div className="playlist-videos p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-800">
            📺 Chaîne ArchiAtech Media
          </h4>
          <span className="text-sm text-gray-500">
            {playlistConfig.videos.length} vidéos
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlistConfig.videos.map((video, index) => (
            <div
              key={video.id}
              className={`video-item cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform ${
                index === currentVideoIndex
                  ? 'ring-2 ring-[#E60023] scale-105 shadow-xl'
                  : 'hover:shadow-xl hover:scale-102 hover:-translate-y-1'
              }`}
              onClick={() => setCurrentVideoIndex(index)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-36 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index === currentVideoIndex 
                      ? 'bg-[#E60023] scale-110' 
                      : 'bg-[#E60023]/80 hover:bg-[#E60023] hover:scale-110'
                  }`}>
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
                
                {/* Badge de statut */}
                {index === currentVideoIndex && (
                  <div className="absolute top-3 right-3 bg-[#E60023] text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    🔴 En cours
                  </div>
                )}
                
                {/* Durée */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <h5 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                  {video.title}
                </h5>
                <p className="text-gray-600 text-xs line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrôles de la playlist améliorés */}
      <div className="playlist-controls p-4 bg-gradient-to-r from-[#E60023] to-red-600">
        <div className="flex items-center justify-between">
          {/* Contrôles de navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentVideoIndex((prev) => 
                prev === 0 ? playlistConfig.videos.length - 1 : prev - 1
              )}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
            >
              <SkipBack className="w-4 h-4" />
              <span className="hidden sm:inline">Précédent</span>
            </button>
            
            <button
              onClick={handlePlayPause}
              className="bg-white text-[#E60023] hover:bg-gray-100 px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Lecture'}</span>
            </button>
            
            <button
              onClick={() => setCurrentVideoIndex((prev) => 
                (prev + 1) % playlistConfig.videos.length
              )}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
            >
              <span className="hidden sm:inline">Suivant</span>
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          {/* Informations de progression */}
          <div className="flex items-center space-x-4 text-white">
            <div className="text-sm">
              <span className="font-semibold">{currentVideoIndex + 1}</span>
              <span className="opacity-70"> / {playlistConfig.videos.length}</span>
            </div>
            
            {/* Barre de progression */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${((currentVideoIndex + 1) / playlistConfig.videos.length) * 100}%` }}
                />
              </div>
              <span className="text-xs opacity-70">
                {Math.round(((currentVideoIndex + 1) / playlistConfig.videos.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default YouTubePlaylist;
