// Service d'intégration avec l'API YouTube Data v3
class YouTubeAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://www.googleapis.com/youtube/v3';
    this.channelId = 'UCtwJ6pMNI5QndQGeJWwkvYA'; // ID de votre chaîne @ArchiatechMedia
  }

  // 🔑 Configuration de la clé API
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  // 📹 Récupérer les vidéos de la chaîne
  async getChannelVideos(maxResults = 50) {
    try {
      const url = `${this.baseURL}/search?` +
        `key=${this.apiKey}&` +
        `channelId=${this.channelId}&` +
        `part=snippet&` +
        `order=date&` +
        `maxResults=${maxResults}&` +
        `type=video`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items) {
        throw new Error('Aucune vidéo trouvée');
      }

      // Récupérer les détails supplémentaires pour chaque vidéo
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const videoDetails = await this.getVideoDetails(videoIds);

      // Combiner les données
      return data.items.map((item, index) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        category: this.mapCategory(item.snippet.categoryId),
        tags: item.snippet.tags || [],
        ...videoDetails[index]
      }));

    } catch (error) {
      console.error('Erreur lors de la récupération des vidéos:', error);
      throw error;
    }
  }

  // 📊 Récupérer les détails des vidéos (durée, vues, likes, etc.)
  async getVideoDetails(videoIds) {
    try {
      const url = `${this.baseURL}/videos?` +
        `key=${this.apiKey}&` +
        `id=${videoIds}&` +
        `part=statistics,contentDetails`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.items.map(item => ({
        duration: this.formatDuration(item.contentDetails.duration),
        viewCount: parseInt(item.statistics.viewCount || 0),
        likeCount: parseInt(item.statistics.likeCount || 0),
        commentCount: parseInt(item.statistics.commentCount || 0),
        status: 'published'
      }));

    } catch (error) {
      console.error('Erreur lors de la récupération des détails:', error);
      return [];
    }
  }

  // 📺 Récupérer les informations de la chaîne
  async getChannelInfo() {
    try {
      const url = `${this.baseURL}/channels?` +
        `key=${this.apiKey}&` +
        `id=${this.channelId}&` +
        `part=snippet,statistics`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error('Chaîne non trouvée');
      }

      const channel = data.items[0];
      return {
        title: channel.snippet.title,
        description: channel.snippet.description,
        subscriberCount: parseInt(channel.statistics.subscriberCount),
        videoCount: parseInt(channel.statistics.videoCount),
        viewCount: parseInt(channel.statistics.viewCount),
        customUrl: channel.snippet.customUrl,
        publishedAt: channel.snippet.publishedAt
      };

    } catch (error) {
      console.error('Erreur lors de la récupération des infos de chaîne:', error);
      throw error;
    }
  }

  // 📈 Récupérer les statistiques de la chaîne
  async getChannelStats() {
    try {
      const url = `${this.baseURL}/channels?` +
        `key=${this.apiKey}&` +
        `id=${this.channelId}&` +
        `part=statistics,snippet`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error('Chaîne non trouvée');
      }

      const channel = data.items[0];
      
      return {
        title: channel.snippet.title,
        description: channel.snippet.description,
        subscriberCount: parseInt(channel.statistics.subscriberCount || 0),
        videoCount: parseInt(channel.statistics.videoCount || 0),
        viewCount: parseInt(channel.statistics.viewCount || 0),
        customUrl: channel.snippet.customUrl,
        publishedAt: channel.snippet.publishedAt,
        thumbnails: channel.snippet.thumbnails
      };

    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }

  // 🔄 Synchroniser avec la base de données locale
  async syncWithDatabase(videoDB) {
    try {
      console.log('🔄 Synchronisation avec YouTube API...');
      
      // Récupérer les vidéos depuis YouTube
      const youtubeVideos = await this.getChannelVideos();
      
      // Récupérer les statistiques de la chaîne
      const channelStats = await this.getChannelStats();
      
      // Mettre à jour la base de données
      const updatedDatabase = {
        ...videoDB.database,
        channel: {
          ...videoDB.database.channel,
          ...channelStats,
          lastUpdated: new Date().toISOString()
        },
        videos: youtubeVideos.map((video, index) => ({
          ...video,
          featured: index < 3, // Les 3 premières vidéos sont mises en vedette
          priority: index + 1
        })),
        settings: {
          ...videoDB.database.settings,
          lastSync: new Date().toISOString()
        }
      };

      return updatedDatabase;

    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
      throw error;
    }
  }

  // 🏷️ Mapper les catégories YouTube
  mapCategory(categoryId) {
    const categoryMap = {
      '1': 'Film & Animation',
      '2': 'Autos & Vehicles',
      '10': 'Music',
      '15': 'Pets & Animals',
      '17': 'Sports',
      '19': 'Travel & Events',
      '20': 'Gaming',
      '22': 'People & Blogs',
      '23': 'Comedy',
      '24': 'Entertainment',
      '25': 'News & Politics',
      '26': 'Howto & Style',
      '27': 'Education',
      '28': 'Science & Technology'
    };
    
    return categoryMap[categoryId] || 'Autres';
  }

  // ⏱️ Formater la durée ISO 8601 en format lisible
  formatDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    
    if (!match) return '0:00';
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  // 🔍 Rechercher des vidéos spécifiques
  async searchVideos(query, maxResults = 10) {
    try {
      const url = `${this.baseURL}/search?` +
        `key=${this.apiKey}&` +
        `channelId=${this.channelId}&` +
        `q=${encodeURIComponent(query)}&` +
        `part=snippet&` +
        `maxResults=${maxResults}&` +
        `type=video`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt
      }));

    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  }

  // 📅 Récupérer les vidéos par période
  async getVideosByDateRange(startDate, endDate) {
    try {
      const url = `${this.baseURL}/search?` +
        `key=${this.apiKey}&` +
        `channelId=${this.channelId}&` +
        `part=snippet&` +
        `publishedAfter=${startDate}&` +
        `publishedBefore=${endDate}&` +
        `order=date&` +
        `type=video`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt
      }));

    } catch (error) {
      console.error('Erreur lors de la récupération par période:', error);
      throw error;
    }
  }
}

// Instance singleton
const youtubeAPI = new YouTubeAPIService('AIzaSyBca6tC9Vt4xD-M1Wu9SsdLfiMf4SSqIz8');

export default youtubeAPI;
