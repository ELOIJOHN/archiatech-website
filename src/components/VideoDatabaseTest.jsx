import React, { useState, useEffect } from 'react';
import videoDB from '../services/VideoDatabaseManager';
import youtubeAPI from '../services/YouTubeAPIService';

const VideoDatabaseTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const addTestResult = (test, status, message, data = null) => {
    setTestResults(prev => [...prev, {
      test,
      status,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setTestResults([]);

    try {
      // Test 1: Chargement de la base de données
      addTestResult('Base de données', 'loading', 'Chargement de la base de données...');
      const allVideos = videoDB.getAllVideos();
      addTestResult('Base de données', 'success', `${allVideos.length} vidéos chargées`, allVideos);

      // Test 2: Vidéos mises en vedette
      addTestResult('Vidéos vedettes', 'loading', 'Récupération des vidéos vedettes...');
      const featuredVideos = videoDB.getFeaturedVideos();
      addTestResult('Vidéos vedettes', 'success', `${featuredVideos.length} vidéos vedettes trouvées`, featuredVideos);

      // Test 3: Statistiques
      addTestResult('Statistiques', 'loading', 'Calcul des statistiques...');
      const stats = videoDB.getChannelStats();
      addTestResult('Statistiques', 'success', 'Statistiques calculées', stats);

      // Test 4: Recherche
      addTestResult('Recherche', 'loading', 'Test de recherche...');
      const searchResults = videoDB.searchVideos('IA');
      addTestResult('Recherche', 'success', `${searchResults.length} résultats pour "IA"`, searchResults);

      // Test 5: Catégories
      addTestResult('Catégories', 'loading', 'Récupération des catégories...');
      const categories = videoDB.getAllCategories();
      addTestResult('Catégories', 'success', `${categories.length} catégories trouvées`, categories);

      // Test 6: API YouTube (si clé fournie)
      if (apiKey && apiKey !== 'YOUR_YOUTUBE_API_KEY_HERE') {
        addTestResult('API YouTube', 'loading', 'Test de connexion à l\'API YouTube...');
        youtubeAPI.setApiKey(apiKey);
        
        try {
          const channelStats = await youtubeAPI.getChannelStats();
          addTestResult('API YouTube', 'success', 'Connexion API réussie', channelStats);
        } catch (error) {
          addTestResult('API YouTube', 'error', `Erreur API: ${error.message}`);
        }
      } else {
        addTestResult('API YouTube', 'warning', 'Clé API non configurée - Test ignoré');
      }

    } catch (error) {
      addTestResult('Tests', 'error', `Erreur générale: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSpecificFunction = (functionName) => {
    try {
      let result;
      switch (functionName) {
        case 'getRecentVideos':
          result = videoDB.getRecentVideos(3);
          addTestResult('Vidéos récentes', 'success', `${result.length} vidéos récentes`, result);
          break;
        case 'getMostViewedVideos':
          result = videoDB.getMostViewedVideos(3);
          addTestResult('Vidéos populaires', 'success', `${result.length} vidéos populaires`, result);
          break;
        case 'getTrendingVideos':
          result = videoDB.getTrendingVideos();
          addTestResult('Vidéos tendance', 'success', `${result.length} vidéos tendance`, result);
          break;
        case 'exportDatabase':
          result = videoDB.exportDatabase();
          addTestResult('Export', 'success', 'Base de données exportée', { size: result.length });
          break;
        default:
          addTestResult('Test spécifique', 'error', 'Fonction non reconnue');
      }
    } catch (error) {
      addTestResult('Test spécifique', 'error', `Erreur: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Test de la Base de Données Vidéos</h1>
      
      {/* Configuration API */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Configuration API YouTube</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Votre clé API YouTube (optionnel)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60023]"
          />
          <button
            onClick={runAllTests}
            disabled={isLoading}
            className="px-6 py-2 bg-[#E60023] text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Tests en cours...' : 'Lancer tous les tests'}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          💡 Pour tester l'API YouTube, obtenez une clé API sur Google Cloud Console
        </p>
      </div>

      {/* Tests spécifiques */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Tests spécifiques</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => testSpecificFunction('getRecentVideos')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Vidéos récentes
          </button>
          <button
            onClick={() => testSpecificFunction('getMostViewedVideos')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Vidéos populaires
          </button>
          <button
            onClick={() => testSpecificFunction('getTrendingVideos')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Vidéos tendance
          </button>
          <button
            onClick={() => testSpecificFunction('exportDatabase')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Export DB
          </button>
        </div>
      </div>

      {/* Résultats des tests */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Résultats des tests</h2>
        
        {testResults.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            Cliquez sur "Lancer tous les tests" pour commencer
          </div>
        )}

        {testResults.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              result.status === 'success' ? 'bg-green-50 border-green-500' :
              result.status === 'error' ? 'bg-red-50 border-red-500' :
              result.status === 'warning' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{result.test}</h3>
                <p className="text-sm text-gray-600">{result.message}</p>
                {result.data && (
                  <details className="mt-2">
                    <summary className="text-sm text-gray-500 cursor-pointer">
                      Voir les données
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${
                  result.status === 'success' ? 'text-green-600' :
                  result.status === 'error' ? 'text-red-600' :
                  result.status === 'warning' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  {result.status === 'success' ? '✅' :
                   result.status === 'error' ? '❌' :
                   result.status === 'warning' ? '⚠️' : '🔄'}
                  {result.status.toUpperCase()}
                </div>
                <div className="text-xs text-gray-500">{result.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Informations sur la base de données */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Informations sur la base de données</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-semibold">Fichier principal</div>
            <div className="text-gray-600">src/data/videos-database.json</div>
          </div>
          <div>
            <div className="font-semibold">Gestionnaire</div>
            <div className="text-gray-600">VideoDatabaseManager.js</div>
          </div>
          <div>
            <div className="font-semibold">API Service</div>
            <div className="text-gray-600">YouTubeAPIService.js</div>
          </div>
          <div>
            <div className="font-semibold">Interface</div>
            <div className="text-gray-600">VideoManager.jsx</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDatabaseTest;
