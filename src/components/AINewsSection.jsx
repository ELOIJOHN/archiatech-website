import React from 'react';
import { ExternalLink, Calendar, Globe, TrendingUp, RefreshCw } from 'lucide-react';
import { useAINews } from '../hooks/useAINews';

/**
 * Section Actualités IA avec galerie d'aperçus et flux d'actualités
 * Intégrée directement dans le site ArchiAtech
 */
const AINewsSection = () => {
  // Utilisation du hook personnalisé pour les actualités
  const {
    news,
    loading,
    error,
    lastUpdate,
    refresh
  } = useAINews({
    limit: 5,
    language: 'all',
    autoRefresh: false
  });

  // Fonction pour gérer l'actualisation
  const handleRefresh = async () => {
    try {
      await refresh();
    } catch (err) {
      console.error('Erreur lors de l\'actualisation:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Releases': 'bg-blue-100 text-blue-800',
      'Product': 'bg-green-100 text-green-800',
      'Research': 'bg-purple-100 text-purple-800',
      'Industry': 'bg-orange-100 text-orange-800',
      'Regulation': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="ai-news" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-red-600" />
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
              Veille technologique
            </span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Actualités <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">IA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Restez informé des dernières innovations et tendances en intelligence artificielle
          </p>
          
          {/* Contrôles */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Mise à jour hebdomadaire</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Français & Anglais</span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
          
          {lastUpdate && (
            <p className="text-sm text-gray-400 mt-2">
              Dernière mise à jour : {lastUpdate.toLocaleString('fr-FR')}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <span className="ml-3 text-gray-600">Chargement des actualités...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">Erreur lors du chargement des actualités</p>
              <p className="text-sm text-gray-500">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in-up 0.6s ease-out forwards'
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded">
                      {article.language.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">{article.source}</span>
                      <span>•</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Lire
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">
            Actualités collectées et analysées automatiquement par notre Agent IA
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>Sources : OpenAI, Microsoft, Hugging Face, Google News</span>
            <span>•</span>
            <span>Powered by n8n + MCP</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AINewsSection;
