import React, { useState } from 'react';
import youtubeAPI from '../services/YouTubeAPIService';
import videoDB from '../services/VideoDatabaseManager';

const YouTubeSync = () => {
  const [apiKey, setApiKey] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSync = async () => {
    if (!apiKey) {
      setError('Veuillez entrer votre clé API YouTube');
      return;
    }

    setIsSyncing(true);
    setError(null);
    setSyncResults(null);

    try {
      // Configurer la clé API
      youtubeAPI.setApiKey(apiKey);

      // Synchroniser avec YouTube
      const updatedDatabase = await youtubeAPI.syncWithDatabase(videoDB);

      setSyncResults({
        videosCount: updatedDatabase.videos.length,
        channelInfo: updatedDatabase.channel,
        lastSync: updatedDatabase.settings.lastSync
      });

      // Optionnel : Sauvegarder la base de données mise à jour
      console.log('Base de données synchronisée:', updatedDatabase);

    } catch (error) {
      setError(`Erreur de synchronisation: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const testConnection = async () => {
    if (!apiKey) {
      setError('Veuillez entrer votre clé API YouTube');
      return;
    }

    try {
      youtubeAPI.setApiKey(apiKey);
      const channelStats = await youtubeAPI.getChannelStats();
      
      setSyncResults({
        connectionTest: true,
        channelInfo: channelStats
      });
      setError(null);
    } catch (error) {
      setError(`Erreur de connexion: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Synchronisation YouTube @ArchiatechMedia
      </h1>

      {/* Configuration */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Configuration API YouTube</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clé API YouTube
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Votre clé API YouTube..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60023] focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={testConnection}
              disabled={isSyncing}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Tester la connexion
            </button>
            
            <button
              onClick={handleSync}
              disabled={isSyncing || !apiKey}
              className="px-6 py-2 bg-[#E60023] text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isSyncing ? 'Synchronisation...' : 'Synchroniser les vidéos'}
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📋 Instructions :</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Allez sur <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
            <li>2. Créez un projet ou sélectionnez un projet existant</li>
            <li>3. Activez l'API YouTube Data v3</li>
            <li>4. Créez des identifiants → Clé API</li>
            <li>5. Copiez votre clé API et collez-la ci-dessus</li>
          </ol>
        </div>
      </div>

      {/* Informations de la chaîne */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Votre chaîne YouTube</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold text-green-700">Nom de la chaîne</div>
            <div className="text-green-600">@ArchiatechMedia</div>
          </div>
          <div>
            <div className="font-semibold text-green-700">ID de la chaîne</div>
            <div className="text-green-600 font-mono">UCtwJ6pMNI5QndQGeJWwkvYA</div>
          </div>
          <div>
            <div className="font-semibold text-green-700">URL</div>
            <div className="text-green-600">
              <a href="https://www.youtube.com/@ArchiatechMedia" target="_blank" rel="noopener noreferrer" className="underline">
                https://www.youtube.com/@ArchiatechMedia
              </a>
            </div>
          </div>
          <div>
            <div className="font-semibold text-green-700">Description</div>
            <div className="text-green-600">Solutions d'IA et d'automatisation pour entreprises</div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-600 font-semibold">❌ Erreur</div>
          </div>
          <div className="text-red-700 mt-2">{error}</div>
        </div>
      )}

      {syncResults && (
        <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="text-green-600 font-semibold">✅ Synchronisation réussie</div>
          </div>
          
          {syncResults.connectionTest && (
            <div className="text-green-700">
              <p className="font-semibold">Connexion API réussie !</p>
              <p>Votre clé API fonctionne correctement.</p>
            </div>
          )}

          {syncResults.videosCount && (
            <div className="text-green-700">
              <p className="font-semibold">{syncResults.videosCount} vidéos synchronisées</p>
              <p>Vos vidéos YouTube ont été importées dans la base de données.</p>
            </div>
          )}

          {syncResults.channelInfo && (
            <div className="mt-4 p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Informations de la chaîne</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-600">Abonnés</div>
                  <div className="text-gray-800">
                    {syncResults.channelInfo.subscriberCount 
                      ? syncResults.channelInfo.subscriberCount.toLocaleString() 
                      : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-600">Vidéos</div>
                  <div className="text-gray-800">
                    {syncResults.channelInfo.videoCount 
                      ? syncResults.channelInfo.videoCount.toLocaleString() 
                      : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-600">Vues totales</div>
                  <div className="text-gray-800">
                    {syncResults.channelInfo.viewCount 
                      ? syncResults.channelInfo.viewCount.toLocaleString() 
                      : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-600">Créée le</div>
                  <div className="text-gray-800">
                    {syncResults.channelInfo.publishedAt 
                      ? new Date(syncResults.channelInfo.publishedAt).toLocaleDateString('fr-FR')
                      : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fonctionnalités disponibles */}
      <div className="p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Fonctionnalités disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Synchronisation automatique des vidéos
            </div>
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Récupération des statistiques en temps réel
            </div>
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Mise à jour des métadonnées
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Gestion des catégories
            </div>
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Recherche et filtrage
            </div>
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Interface d'administration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSync;
