import React, { useState } from 'react';
import youtubeAPI from '../services/YouTubeAPIService';
import videoDB from '../services/VideoDatabaseManager';

const YouTubeSyncTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testYouTubeConnection = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🔍 Test de connexion YouTube API...');
      
      // Test 1: Vérifier la connexion API
      const channelInfo = await youtubeAPI.getChannelInfo();
      console.log('✅ Informations de chaîne:', channelInfo);

      // Test 2: Récupérer les vidéos
      const videos = await youtubeAPI.getChannelVideos(5); // Limiter à 5 vidéos pour le test
      console.log('✅ Vidéos récupérées:', videos);

      // Test 3: Mettre à jour la base de données
      const updatedDB = videoDB.syncWithYouTube(videos);
      console.log('✅ Base de données mise à jour:', updatedDB);

      setResult({
        channelInfo,
        videosCount: videos.length,
        videos: videos.slice(0, 3), // Afficher seulement les 3 premières
        lastSync: new Date().toLocaleString('fr-FR')
      });

    } catch (error) {
      console.error('❌ Erreur de synchronisation:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testDatabaseQuery = () => {
    try {
      const allVideos = videoDB.getAllVideos();
      const recentVideos = videoDB.getRecentVideos(3);
      const categories = videoDB.getAllCategories();

      setResult({
        databaseStats: {
          totalVideos: allVideos.length,
          recentVideos: recentVideos.length,
          categories: categories.length
        },
        recentVideos,
        categories
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h2 style={{ color: '#E60023', marginBottom: '20px' }}>
        🧪 Test de Synchronisation YouTube
      </h2>

      {/* Boutons de test */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={testYouTubeConnection}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#ccc' : '#E60023',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            marginRight: '10px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? '⏳ Synchronisation...' : '🔄 Tester la synchronisation YouTube'}
        </button>

        <button
          onClick={testDatabaseQuery}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          📊 Tester la base de données
        </button>
      </div>

      {/* Affichage des résultats */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>❌ Erreur :</strong> {error}
        </div>
      )}

      {result && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
            ✅ Résultats du test
          </h3>

          {/* Informations de chaîne */}
          {result.channelInfo && (
            <div style={{ marginBottom: '20px' }}>
              <h4>📺 Informations de chaîne :</h4>
              <p><strong>Nom :</strong> {result.channelInfo.title}</p>
              <p><strong>Abonnés :</strong> {result.channelInfo.subscriberCount?.toLocaleString() || 'N/A'}</p>
              <p><strong>Vidéos :</strong> {result.channelInfo.videoCount}</p>
            </div>
          )}

          {/* Statistiques de synchronisation */}
          {result.videosCount && (
            <div style={{ marginBottom: '20px' }}>
              <h4>🔄 Synchronisation :</h4>
              <p><strong>Vidéos récupérées :</strong> {result.videosCount}</p>
              <p><strong>Dernière sync :</strong> {result.lastSync}</p>
            </div>
          )}

          {/* Statistiques de base de données */}
          {result.databaseStats && (
            <div style={{ marginBottom: '20px' }}>
              <h4>📊 Base de données :</h4>
              <p><strong>Total vidéos :</strong> {result.databaseStats.totalVideos}</p>
              <p><strong>Vidéos récentes :</strong> {result.databaseStats.recentVideos}</p>
              <p><strong>Catégories :</strong> {result.databaseStats.categories}</p>
            </div>
          )}

          {/* Liste des vidéos */}
          {result.videos && result.videos.length > 0 && (
            <div>
              <h4>🎬 Vidéos récupérées :</h4>
              {result.videos.map((video, index) => (
                <div key={video.id} style={{
                  padding: '10px',
                  margin: '10px 0',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  border: '1px solid #e9ecef'
                }}>
                  <p><strong>{index + 1}. {video.title}</strong></p>
                  <p>👀 {video.viewCount?.toLocaleString() || 0} vues</p>
                  <p>👍 {video.likeCount?.toLocaleString() || 0} likes</p>
                  <p>📅 {new Date(video.publishedAt).toLocaleDateString('fr-FR')}</p>
                </div>
              ))}
            </div>
          )}

          {/* Vidéos récentes de la DB */}
          {result.recentVideos && result.recentVideos.length > 0 && (
            <div>
              <h4>📚 Vidéos récentes (Base de données) :</h4>
              {result.recentVideos.map((video, index) => (
                <div key={video.id} style={{
                  padding: '10px',
                  margin: '10px 0',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '6px',
                  border: '1px solid #c3e6c3'
                }}>
                  <p><strong>{index + 1}. {video.title}</strong></p>
                  <p>👀 {video.viewCount?.toLocaleString() || 0} vues</p>
                  <p>📅 {new Date(video.publishedAt).toLocaleDateString('fr-FR')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div style={{
        backgroundColor: '#d1ecf1',
        color: '#0c5460',
        padding: '15px',
        borderRadius: '6px',
        marginTop: '20px',
        border: '1px solid #bee5eb'
      }}>
        <h4>💡 Instructions :</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>Test de synchronisation :</strong> Récupère les dernières vidéos de votre chaîne YouTube</li>
          <li><strong>Test de base de données :</strong> Affiche les statistiques de votre base de données locale</li>
          <li><strong>Console :</strong> Ouvrez F12 pour voir les logs détaillés</li>
        </ul>
      </div>
    </div>
  );
};

export default YouTubeSyncTest;
