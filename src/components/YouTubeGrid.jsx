import React, { useState, useEffect } from 'react';


const YouTubeGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration de votre chaîne ArchiAtech Media
  const channelConfig = {
    channelId: 'UCtwJ6pMNI5QndQGeJWwkvYA', // ID de votre chaîne @ArchiatechMedia
    maxResults: 12, // Nombre de vidéos à afficher
    order: 'date' // Trier par date (les plus récentes en premier)
  };

  // Simuler le chargement des vidéos (en attendant l'API YouTube)
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        
        // Vos vraies vidéos ArchiAtech
        const mockVideos = [
          {
            id: 'IR7BgFc6d6c',
            title: 'Simplifiez le déploiement de logiciels : la clé pour plus d\'efficacité',
            thumbnail: 'https://img.youtube.com/vi/IR7BgFc6d6c/maxresdefault.jpg',
            publishedAt: '2024-10-15',
            duration: '1h 01min',
            viewCount: '2.5K'
          },
          {
            id: 'XKE3GJ5LhOE',
            title: 'Usages, méthodologie et exemples : Comment intégrer l\'IA dans les processus métier des entreprises ?',
            thumbnail: 'https://img.youtube.com/vi/XKE3GJ5LhOE/maxresdefault.jpg',
            publishedAt: '2024-10-10',
            duration: '35min 55s',
            viewCount: '1.8K'
          },
          {
            id: 'XZXK1YsTPSI',
            title: '🚀 Workflow N8N ULTIME : Créer et Publier des Vidéos Automatiquement sur YouTube + Multi-Réseaux ! 🎬',
            thumbnail: 'https://img.youtube.com/vi/XZXK1YsTPSI/maxresdefault.jpg',
            publishedAt: '2024-10-05',
            duration: '30min 25s',
            viewCount: '3.2K'
          },
          {
            id: 'aLSHePjIS4E',
            title: 'J\'ai testé 300 outils No Code, voici les meilleurs pour 2024 !',
            thumbnail: 'https://img.youtube.com/vi/aLSHePjIS4E/maxresdefault.jpg',
            publishedAt: '2024-10-01',
            duration: '38min 50s',
            viewCount: '4.1K'
          },
          {
            id: 'Z-Cn9Gb1Xn8',
            title: 'Visiativ accompagne votre transformation digitale : les 6 étapes pour piloter votre transformation',
            thumbnail: 'https://img.youtube.com/vi/Z-Cn9Gb1Xn8/maxresdefault.jpg',
            publishedAt: '2024-09-28',
            duration: '8min 00s',
            viewCount: '1.2K'
          },
          {
            id: 'tLkp9zfmVKg',
            title: 'La transformation digitale pour les nuls !',
            thumbnail: 'https://img.youtube.com/vi/tLkp9zfmVKg/maxresdefault.jpg',
            publishedAt: '2024-09-25',
            duration: '59min 59s',
            viewCount: '5.8K'
          }
        ];

        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setVideos(mockVideos);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des vidéos');
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  // Fonction pour ouvrir une vidéo dans le lecteur YouTube
  const handleVideoClick = (videoId) => {
    // Ouvrir la vidéo dans une nouvelle fenêtre
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E60023]"></div>
        <span className="ml-3 text-gray-600">Chargement des vidéos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">❌ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#E60023] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="text-[#E60023]">Vidéos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez nos solutions d'IA et d'automatisation à travers nos démonstrations vidéos
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-[#E60023]">
            <span>📺</span>
            <span className="font-semibold">@ArchiatechMedia</span>
          </div>
        </div>

        {/* Grille de vidéos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#E60023]/30"
              onClick={() => handleVideoClick(video.id)}
            >
              {/* Miniature de la vidéo */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x225/E60023/FFFFFF?text=Video+ArchiaTech';
                  }}
                />
                
                {/* Overlay avec icône play */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#E60023] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Durée de la vidéo */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Informations de la vidéo */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-[#E60023] transition-colors">
                  {video.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.viewCount} vues</span>
                  <span>{new Date(video.publishedAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton pour voir plus de vidéos */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@ArchiatechMedia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-[#E60023] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Voir toutes nos vidéos
          </a>
        </div>
      </div>
    </div>
  );
};

export default YouTubeGrid;
