import React, { useState, useEffect } from 'react';

const YouTubeGridReal = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration de votre chaîne
  const channelConfig = {
    channelId: 'UCtwJ6pMNI5QndQGeJWwkvYA', // ID de votre chaîne @ArchiatechMedia
    apiKey: 'YOUR_YOUTUBE_API_KEY', // Vous devrez remplacer par votre vraie clé API
    maxResults: 12
  };

  // Fonction pour récupérer les vidéos de la chaîne
  const fetchChannelVideos = async () => {
    try {
      setLoading(true);
      
      // URL de l'API YouTube Data v3
      const url = `https://www.googleapis.com/youtube/v3/search?` +
        `key=${channelConfig.apiKey}&` +
        `channelId=${channelConfig.channelId}&` +
        `part=snippet&` +
        `order=date&` +
        `maxResults=${channelConfig.maxResults}&` +
        `type=video`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des vidéos');
      }
      
      const data = await response.json();
      
      if (data.items) {
        const videosData = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description
        }));
        
        setVideos(videosData);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur API YouTube:', err);
      setError('Impossible de charger les vidéos. Vérifiez votre clé API YouTube.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Pour l'instant, on utilise des données simulées
    // Décommentez la ligne suivante quand vous aurez votre clé API
    // fetchChannelVideos();
    
    // Simulation de données
    const mockVideos = [
      {
        id: 'dQw4w9WgXcQ',
        title: 'ArchiAtech - Solutions IA & Automatisation',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        publishedAt: '2024-01-15T10:30:00Z',
        description: 'Découvrez nos solutions d\'intelligence artificielle pour votre entreprise'
      },
      {
        id: 'jNQXAC9IVRw',
        title: 'Automatisation No-Code avec ArchiAtech',
        thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
        publishedAt: '2024-01-10T14:20:00Z',
        description: 'Automatisez vos processus métier sans coder une seule ligne'
      },
      {
        id: 'M7lc1UVf-VE',
        title: 'Témoignages Clients - ROI IA',
        thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
        publishedAt: '2024-01-05T09:15:00Z',
        description: 'Nos clients témoignent de leurs résultats avec nos solutions IA'
      },
      {
        id: 'abc123def456',
        title: 'Formation IA pour Entreprises',
        thumbnail: 'https://img.youtube.com/vi/abc123def456/maxresdefault.jpg',
        publishedAt: '2024-01-01T16:45:00Z',
        description: 'Formation complète sur l\'intelligence artificielle pour les entreprises'
      },
      {
        id: 'xyz789uvw012',
        title: 'Déploiement Solutions IT',
        thumbnail: 'https://img.youtube.com/vi/xyz789uvw012/maxresdefault.jpg',
        publishedAt: '2023-12-28T11:30:00Z',
        description: 'Guide complet pour déployer vos solutions IT'
      },
      {
        id: 'def456ghi789',
        title: 'Transformation Digitale - Cas d\'Usage',
        thumbnail: 'https://img.youtube.com/vi/def456ghi789/maxresdefault.jpg',
        publishedAt: '2023-12-25T13:20:00Z',
        description: 'Exemples concrets de transformation digitale'
      }
    ];

    // Simuler un délai de chargement
    setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E60023]"></div>
        <span className="ml-3 text-gray-600">Chargement des vidéos de @ArchiatechMedia...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">❌ {error}</div>
        <div className="text-sm text-gray-500 mb-4">
          Pour utiliser l'API YouTube, vous devez :
          <br />1. Créer un projet sur Google Cloud Console
          <br />2. Activer l'API YouTube Data v3
          <br />3. Générer une clé API
          <br />4. Remplacer 'YOUR_YOUTUBE_API_KEY' dans le code
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#E60023] text-white px-4 py-2 rounded-full mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="font-semibold">@ArchiatechMedia</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="text-[#E60023]">Vidéos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez nos solutions d'IA et d'automatisation à travers nos démonstrations vidéos
          </p>
        </div>

        {/* Grille de vidéos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#E60023]/30 cursor-pointer"
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

                {/* Badge "Nouveau" pour les vidéos récentes */}
                {new Date(video.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                  <div className="absolute top-2 left-2 bg-[#E60023] text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Nouveau
                  </div>
                )}
              </div>

              {/* Informations de la vidéo */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-[#E60023] transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {formatDate(video.publishedAt)}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    ArchiAtech
                  </span>
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
            Voir toutes nos vidéos sur YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default YouTubeGridReal;
