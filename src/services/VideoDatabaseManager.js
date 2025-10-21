import videosDatabase from '../data/videos-database.json';

class VideoDatabaseManager {
  constructor() {
    this.database = videosDatabase;
    this.videos = this.database.videos;
    this.categories = this.database.categories;
    this.channel = this.database.channel;
  }

  // 📹 Méthodes pour récupérer les vidéos
  getAllVideos() {
    return this.videos;
  }

  getFeaturedVideos() {
    return this.videos.filter(video => video.featured === true);
  }

  getVideosByCategory(categoryId) {
    return this.videos.filter(video => video.category.toLowerCase() === categoryId.toLowerCase());
  }

  getVideoById(videoId) {
    return this.videos.find(video => video.id === videoId);
  }

  getRecentVideos(limit = 6) {
    return this.videos
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  }

  getMostViewedVideos(limit = 6) {
    return this.videos
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  }

  getMostLikedVideos(limit = 6) {
    return this.videos
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, limit);
  }

  // 🏷️ Méthodes pour les catégories
  getAllCategories() {
    return this.categories;
  }

  getCategoryById(categoryId) {
    return this.categories.find(cat => cat.id === categoryId);
  }

  getVideosByTag(tag) {
    return this.videos.filter(video => 
      video.tags.some(videoTag => 
        videoTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  // 📊 Méthodes pour les statistiques
  getChannelStats() {
    const totalVideos = this.videos.length;
    const totalViews = this.videos.reduce((sum, video) => sum + video.viewCount, 0);
    const totalLikes = this.videos.reduce((sum, video) => sum + video.likeCount, 0);
    const totalComments = this.videos.reduce((sum, video) => sum + video.commentCount, 0);
    const avgViews = Math.round(totalViews / totalVideos);
    const avgLikes = Math.round(totalLikes / totalVideos);

    return {
      totalVideos,
      totalViews,
      totalLikes,
      totalComments,
      avgViews,
      avgLikes,
      channel: this.channel
    };
  }

  getCategoryStats() {
    return this.categories.map(category => {
      const videosInCategory = this.getVideosByCategory(category.id);
      const totalViews = videosInCategory.reduce((sum, video) => sum + video.viewCount, 0);
      
      return {
        ...category,
        videoCount: videosInCategory.length,
        totalViews,
        avgViews: videosInCategory.length > 0 ? Math.round(totalViews / videosInCategory.length) : 0
      };
    });
  }

  // 🔍 Méthodes de recherche
  searchVideos(query) {
    const searchTerm = query.toLowerCase();
    return this.videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // 📅 Méthodes pour les dates
  getVideosByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.videos.filter(video => {
      const videoDate = new Date(video.publishedAt);
      return videoDate >= start && videoDate <= end;
    });
  }

  getVideosByMonth(year, month) {
    return this.videos.filter(video => {
      const videoDate = new Date(video.publishedAt);
      return videoDate.getFullYear() === year && videoDate.getMonth() === month - 1;
    });
  }

  // 🎯 Méthodes pour les vidéos prioritaires
  getVideosByPriority() {
    return this.videos.sort((a, b) => a.priority - b.priority);
  }

  // 🔄 Synchronisation avec YouTube
  syncWithYouTube(youtubeVideos) {
    try {
      console.log('🔄 Début de la synchronisation avec YouTube...');
      
      // Fusionner les nouvelles vidéos avec les existantes
      const existingVideoIds = this.videos.map(v => v.id);
      const newVideos = youtubeVideos.filter(video => !existingVideoIds.includes(video.id));
      
      // Mettre à jour les vidéos existantes avec les nouvelles statistiques
      const updatedVideos = this.videos.map(existingVideo => {
        const youtubeVideo = youtubeVideos.find(v => v.id === existingVideo.id);
        if (youtubeVideo) {
          return {
            ...existingVideo,
            viewCount: youtubeVideo.viewCount || existingVideo.viewCount,
            likeCount: youtubeVideo.likeCount || existingVideo.likeCount,
            commentCount: youtubeVideo.commentCount || existingVideo.commentCount,
            lastUpdated: new Date().toISOString()
          };
        }
        return existingVideo;
      });

      // Ajouter les nouvelles vidéos
      const allVideos = [...updatedVideos, ...newVideos];

      // Mettre à jour la base de données
      this.videos = allVideos;
      this.database.videos = allVideos;
      this.database.channel.lastUpdated = new Date().toISOString();

      console.log(`✅ Synchronisation terminée: ${newVideos.length} nouvelles vidéos, ${updatedVideos.length} vidéos mises à jour`);
      
      return {
        totalVideos: allVideos.length,
        newVideos: newVideos.length,
        updatedVideos: updatedVideos.length,
        lastSync: new Date().toISOString()
      };

    } catch (error) {
      console.error('❌ Erreur lors de la synchronisation:', error);
      throw error;
    }
  }

  // 📈 Méthodes pour les tendances
  getTrendingVideos() {
    // Calculer un score de tendance basé sur les vues récentes et les likes
    return this.videos
      .map(video => ({
        ...video,
        trendScore: this.calculateTrendScore(video)
      }))
      .sort((a, b) => b.trendScore - a.trendScore);
  }

  calculateTrendScore(video) {
    const daysSincePublished = (new Date() - new Date(video.publishedAt)) / (1000 * 60 * 60 * 24);
    const viewsPerDay = video.viewCount / Math.max(daysSincePublished, 1);
    const likesRatio = video.likeCount / Math.max(video.viewCount, 1);
    
    return Math.round(viewsPerDay * (1 + likesRatio) * 100);
  }

  // 🔄 Méthodes de synchronisation (pour l'API YouTube)
  async syncWithYouTubeAPI() {
    // Cette méthode sera implémentée pour synchroniser avec l'API YouTube
    console.log('Synchronisation avec YouTube API...');
    // TODO: Implémenter la synchronisation avec l'API YouTube Data v3
  }

  // 💾 Méthodes de sauvegarde
  exportDatabase() {
    return JSON.stringify(this.database, null, 2);
  }

  importDatabase(jsonData) {
    try {
      this.database = JSON.parse(jsonData);
      this.videos = this.database.videos;
      this.categories = this.database.categories;
      this.channel = this.database.channel;
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import de la base de données:', error);
      return false;
    }
  }
}

// Instance singleton
const videoDB = new VideoDatabaseManager();

export default videoDB;
