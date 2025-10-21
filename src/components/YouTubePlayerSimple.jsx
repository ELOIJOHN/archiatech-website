import React, { useState } from 'react';

const YouTubePlayerSimple = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Vidéos YouTube - Vos vidéos ArchiAtech (6 vidéos)
  const videos = [
    {
      id: 'IR7BgFc6d6c', // Support & Déploiement IT
      title: 'Simplifiez le déploiement de logiciels : la clé pour plus d\'efficacité',
      description: 'Ce webinaire présente les défis et solutions pour automatiser le déploiement de logiciels, l\'inventaire et la gestion des correctifs, en utilisant la plateforme NinjaOne pour une efficacité accrue.',
      duration: '1h 01min'
    },
    {
      id: 'XKE3GJ5LhOE', // Conseil & Intégration IA
      title: 'Usages, méthodologie et exemples : Comment intégrer l\'IA dans les processus métier des entreprises ?',
      description: 'La vidéo explore la méthodologie d\'intégration de l\'IA (Machine Learning, Deep Learning, IA Générative) dans les processus métier, les cas d\'usage et l\'importance de la maturité digitale de l\'entreprise.',
      duration: '35min 55s'
    },
    {
      id: 'XZXK1YsTPSI', // Automatisation Workflows
      title: '🚀 Workflow N8N ULTIME : Créer et Publier des Vidéos Automatiquement sur YouTube + Multi-Réseaux ! 🎬',
      description: 'Un tutoriel détaillé montrant comment construire un workflow avec N8N pour automatiser la création et la publication de vidéos sur YouTube et d\'autres réseaux sociaux, y compris la génération de contenu et l\'utilisation d\'APIs.',
      duration: '30min 25s'
    },
    {
      id: 'aLSHePjIS4E', // Solutions No-Code/Low-Code
      title: 'J\'ai testé 300 outils No Code, voici les meilleurs pour 2024 !',
      description: 'Présentation des meilleurs outils No-Code/Low-Code (Bubble, FlutterFlow, Webflow, Softr, Power Apps) à maîtriser en 2024, en mettant l\'accent sur leurs fonctionnalités et leur intégration avec l\'Intelligence Artificielle.',
      duration: '38min 50s'
    },
    {
      id: 'Z-Cn9Gb1Xn8', // Formation & Accompagnement
      title: 'Visiativ accompagne votre transformation digitale : les 6 étapes pour piloter votre transformation',
      description: 'La vidéo décrit une démarche d\'accompagnement, structurée en six étapes, pour aider les entreprises à accélérer et réussir leur transformation digitale.',
      duration: '8min 00s'
    },
    {
      id: 'tLkp9zfmVKg', // Transformation Digitale
      title: 'La transformation digitale pour les nuls !',
      description: 'Une présentation complète sur la transformation digitale, abordant les enjeux, les objectifs clés (collaboration, optimisation, automatisation), les cinq piliers de la transformation et les erreurs à éviter.',
      duration: '59min 59s'
    }
  ];

  const currentVideo = videos[currentVideoIndex];

  const handleThumbnailClick = (index) => {
    setCurrentVideoIndex(index);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Lecteur YouTube principal */}
      <div className="relative">
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${currentVideo.id}?controls=1&modestbranding=1&rel=0&showinfo=0`}
          title={currentVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-t-xl"
        />
        
        {/* Overlay avec contrôles personnalisés */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrevVideo}
                className="bg-[#E60023] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ← Précédent
              </button>
              <button
                onClick={handleNextVideo}
                className="bg-[#E60023] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Suivant →
              </button>
            </div>
            <div className="text-sm">
              Vidéo {currentVideoIndex + 1} sur {videos.length}
            </div>
          </div>
        </div>
      </div>

      {/* Informations de la vidéo */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {currentVideo.title}
        </h3>
        <p className="text-gray-600 mb-3">
          {currentVideo.description}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Durée : {currentVideo.duration}</span>
          <span>•</span>
          <span>Chaîne ArchiAtech Media</span>
        </div>
      </div>

      {/* Playlist thumbnails */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Playlist</h4>
          <span className="text-sm text-gray-500">{videos.length} vidéos</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <div
              key={video.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentVideoIndex
                  ? 'ring-2 ring-[#E60023] scale-105'
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-32 object-cover"
              />
              
              {/* Badge "En cours" */}
              {index === currentVideoIndex && (
                <div className="absolute top-2 right-2 bg-[#E60023] text-white text-xs px-2 py-1 rounded-full font-semibold">
                  En cours
                </div>
              )}
              
              {/* Overlay avec icône play */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-[#E60023] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              {/* Informations de la vidéo */}
              <div className="p-3 bg-white">
                <h5 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                  {video.title}
                </h5>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{video.duration}</span>
                  <span className="text-xs text-[#E60023] font-semibold">ArchiAtech</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrôles de navigation */}
      <div className="bg-[#E60023] p-4">
        <div className="flex items-center justify-between text-white">
          <button
            onClick={handlePrevVideo}
            className="flex items-center space-x-2 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            <span>←</span>
            <span>Précédent</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span className="text-sm">Lecture</span>
          </div>
          
          <button
            onClick={handleNextVideo}
            className="flex items-center space-x-2 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            <span>Suivant</span>
            <span>→</span>
          </button>
        </div>
        
        {/* Barre de progression */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm text-white/80 mb-1">
            <span>{currentVideoIndex + 1}/{videos.length}</span>
            <span>{Math.round(((currentVideoIndex + 1) / videos.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentVideoIndex + 1) / videos.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayerSimple;
