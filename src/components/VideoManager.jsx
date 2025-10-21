import React, { useState, useEffect } from 'react';
import videoDB from '../services/VideoDatabaseManager';
import { Play, Eye, Heart, MessageCircle, Calendar, Tag, Filter, Search } from 'lucide-react';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadVideos();
    loadStats();
    loadCategories();
  }, []);

  useEffect(() => {
    filterAndSortVideos();
  }, [selectedCategory, searchQuery, sortBy]);

  const loadVideos = () => {
    const allVideos = videoDB.getAllVideos();
    setVideos(allVideos);
    setFilteredVideos(allVideos);
  };

  const loadStats = () => {
    const channelStats = videoDB.getChannelStats();
    setStats(channelStats);
  };

  const loadCategories = () => {
    const allCategories = videoDB.getAllCategories();
    setCategories(allCategories);
  };

  const filterAndSortVideos = () => {
    let filtered = [...videos];

    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => 
        video.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Trier
    switch (sortBy) {
      case 'priority':
        filtered.sort((a, b) => a.priority - b.priority);
        break;
      case 'views':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'likes':
        filtered.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      default:
        filtered.sort((a, b) => a.priority - b.priority);
    }

    setFilteredVideos(filtered);
  };

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* En-tête avec statistiques */}
      {stats && (
        <div className="mb-8 bg-gradient-to-r from-[#E60023] to-red-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-4">Gestion des Vidéos @ArchiatechMedia</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalVideos}</div>
              <div className="text-sm opacity-90">Vidéos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatNumber(stats.totalViews)}</div>
              <div className="text-sm opacity-90">Vues totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatNumber(stats.totalLikes)}</div>
              <div className="text-sm opacity-90">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatNumber(stats.avgViews)}</div>
              <div className="text-sm opacity-90">Vues moy.</div>
            </div>
          </div>
        </div>
      )}

      {/* Filtres et recherche */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une vidéo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60023] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60023]"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60023]"
          >
            <option value="priority">Priorité</option>
            <option value="views">Vues</option>
            <option value="likes">Likes</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      {/* Grille des vidéos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#E60023]/30 cursor-pointer"
            onClick={() => handleVideoClick(video.id)}
          >
            {/* Miniature */}
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x225/E60023/FFFFFF?text=ArchiaTech';
                }}
              />
              
              {/* Overlay avec icône play */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#E60023] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Badge catégorie */}
              <div className="absolute top-2 left-2 bg-[#E60023] text-white text-xs px-2 py-1 rounded-full font-semibold">
                {video.category}
              </div>

              {/* Durée */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>

              {/* Badge featured */}
              {video.featured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  ⭐ Vedette
                </div>
              )}
            </div>

            {/* Informations */}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
              
              {/* Statistiques */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {formatNumber(video.viewCount)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {formatNumber(video.likeCount)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {video.commentCount}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(video.publishedAt)}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {video.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
                {video.tags.length > 3 && (
                  <span className="text-xs text-gray-400">+{video.tags.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucune vidéo trouvée */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucune vidéo trouvée</div>
          <div className="text-gray-400 text-sm">Essayez de modifier vos filtres de recherche</div>
        </div>
      )}
    </div>
  );
};

export default VideoManager;