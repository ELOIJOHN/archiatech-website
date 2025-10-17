import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoGallery = forwardRef(({ onVideoChange }, ref) => {
  const videos = [
    { 
      id: 1, 
      title: "Support IT", 
      file: "20251011_2138_SupportIT.mp4",
      description: "Installation et déploiement"
    },
    { 
      id: 2, 
      title: "Conseil & Intégration IA", 
      file: "20251011_2242_Conseil_Intégration IA.mp4",
      description: "Solutions IA sur-mesure"
    },
    { 
      id: 3, 
      title: "Automatisation Workflows", 
      file: "20251011_2259_Automatisation Workflows.mp4",
      description: "RPA et connecteurs"
    },
    { 
      id: 4, 
      title: "No Code / Low Code", 
      file: "20251011_2313_NoCode_LowCode.mp4",
      description: "Zapier, Make, Airtable..."
    },
    { 
      id: 5, 
      title: "Formation & Accompagnement", 
      file: "20251011_2323_Formation_Accompagnement.mp4",
      description: "Support et accompagnement"
    },
    { 
      id: 6, 
      title: "Transformation Digitale", 
      file: "20251011_2325_Transformation Digital.mp4",
      description: "Transformation digitale"
    }
  ];

  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Exposer les méthodes au composant parent via ref
  useImperativeHandle(ref, () => ({
    handleVideoChange: (videoId) => {
      const video = videos.find(v => v.id === videoId);
      if (video) {
        setActiveVideo(video);
        setIsPlaying(true);
        console.log(`Vidéo changée vers: ${video.title} (ID: ${videoId})`);
      }
    }
  }));

  // Fonction pour changer la vidéo active
  const handleVideoChange = (video) => {
    setActiveVideo(video);
    setIsPlaying(true);
    // Notifier le composant parent du changement
    if (onVideoChange) {
      onVideoChange(`/videos/${video.file}`);
    }
  };

  // Fonction pour toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      
      {/* Vidéo principale */}
      <div className="absolute inset-0 z-10">
        <video
          key={activeVideo.file}
          src={`/videos/${activeVideo.file}`}
          autoPlay={isPlaying}
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        
        {/* Overlay avec informations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20">
          <div className="absolute bottom-8 left-8 right-8">
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {activeVideo.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                {activeVideo.description}
              </p>
              
              {/* Bouton play/pause */}
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-6 h-6" />
                    <span className="text-lg font-medium">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    <span className="text-lg font-medium">Lecture</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grille de miniatures en arrière-plan */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid grid-cols-3 md:grid-cols-6 h-full">
          {videos.map((video) => (
            <div key={video.id} className="relative overflow-hidden">
              <video
                src={`/videos/${video.file}`}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-full object-cover transition-all duration-500 ${
                  activeVideo.id === video.id 
                    ? 'opacity-100 brightness-110' 
                    : 'opacity-60 hover:opacity-80'
                }`}
              />
              
              {/* Indicateur de sélection */}
              {activeVideo.id === video.id && (
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 to-transparent">
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de sélection flottants */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => handleVideoChange(video)}
              className={`group relative p-4 rounded-xl border text-left transition-all duration-300 backdrop-blur-sm min-w-[200px] ${
                activeVideo.id === video.id
                  ? 'bg-red-500/90 text-white border-red-400 shadow-2xl shadow-red-500/50 scale-105'
                  : 'bg-white/10 text-gray-200 border-white/20 hover:bg-white/20 hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeVideo.id === video.id 
                    ? 'bg-white animate-pulse' 
                    : 'bg-white/60 group-hover:bg-white'
                }`}></div>
                <div>
                  <div className="font-semibold text-sm">{video.title}</div>
                  <div className={`text-xs mt-1 ${
                    activeVideo.id === video.id ? 'text-white/80' : 'text-gray-400'
                  }`}>
                    {video.description}
                  </div>
                </div>
              </div>
              
              {/* Effet de sélection */}
              {activeVideo.id === video.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-xl"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Indicateur de lecture */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span className="text-white text-sm font-medium">
            {isPlaying ? 'En lecture' : 'En pause'}
          </span>
        </div>
      </div>

      {/* Indicateur de navigation mobile */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 md:hidden">
        <div className="flex gap-2">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => handleVideoChange(video)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeVideo.id === video.id ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

VideoGallery.displayName = 'VideoGallery';

export default VideoGallery;