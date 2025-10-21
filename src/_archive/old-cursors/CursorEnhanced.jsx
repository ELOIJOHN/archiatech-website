import React, { useState, useEffect } from 'react';
import { Search, Filter, Sun, Moon, Share2, RefreshCw, Globe, Brain, Code, TrendingUp, BookOpen, Loader } from 'lucide-react';
import { fetchAllNews, searchNews, filterNews } from './services/newsAPI';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';

const CursorEnhanced = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    language: 'all'
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();

  // Charger les actualités au montage du composant
  useEffect(() => {
    loadNews();
  }, []);

  // Filtrer les actualités quand les filtres changent
  useEffect(() => {
    let filtered = news;
    
    // Appliquer la recherche
    if (searchQuery.trim()) {
      filtered = searchNews(filtered, searchQuery);
    }
    
    // Appliquer les filtres
    filtered = filterNews(filtered, filters);
    
    setFilteredNews(filtered);
  }, [news, searchQuery, filters]);

  // Basculer le mode sombre
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const newsData = await fetchAllNews();
      setNews(newsData);
      showSuccess(`${newsData.length} actualités chargées avec succès !`);
    } catch (err) {
      const errorMsg = 'Erreur lors du chargement des actualités';
      setError(errorMsg);
      showError(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadNews();
  };

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.headline,
        text: article.description,
        url: article.url
      }).then(() => {
        showSuccess('Article partagé avec succès !');
      }).catch(() => {
        showError('Erreur lors du partage');
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      navigator.clipboard.writeText(article.url).then(() => {
        showSuccess('Lien copié dans le presse-papiers !');
      }).catch(() => {
        showError('Erreur lors de la copie du lien');
      });
    }
  };

  const categories = ['all', 'Releases', 'Product', 'Research', 'Industry', 'Regulation', 'Innovation'];
  const languages = ['all', 'EN', 'FR'];

  const getSourceIcon = (source) => {
    const icons = {
      'OpenAI News': <Brain className="w-5 h-5 text-white" />,
      'Microsoft News': <Globe className="w-5 h-5 text-white" />,
      'Hugging Face': <Brain className="w-5 h-5 text-white" />,
      'TechCrunch': <Code className="w-5 h-5 text-white" />,
      'Euronews': <Globe className="w-5 h-5 text-white" />,
      'AI Business': <TrendingUp className="w-5 h-5 text-white" />
    };
    
    return icons[source] || <BookOpen className="w-5 h-5 text-white" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Chargement des actualités IA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header avec contrôles */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
            </button>
            
            <button
              onClick={handleRefresh}
              className="p-3 rounded-xl bg-red-100 hover:bg-red-200 transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`w-6 h-6 text-red-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            📰 Actualités IA
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Restez informé des dernières innovations en intelligence artificielle
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher dans les actualités..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filtres
            </button>
          </div>

          {/* Panneau de filtres */}
          {showFilters && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'Toutes les catégories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Langue
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>
                        {lang === 'all' ? 'Toutes les langues' : lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-8">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Résultats de recherche */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {filteredNews.length} résultat{filteredNews.length > 1 ? 's' : ''} pour "{searchQuery}"
            </p>
          </div>
        )}

        {/* Grille des actualités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Section gradient en haut */}
              <div className={`relative h-32 bg-gradient-to-br ${article.gradient} p-6 flex items-start justify-between`}>
                <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  {getSourceIcon(article.source)}
                  <span className="text-white text-sm font-semibold">{article.source}</span>
                </div>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                    {article.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                    {article.language}
                  </span>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {article.headline}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base line-clamp-3 mb-6">
                  {article.description}
                </p>

                {/* Footer avec actions */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{article.source}</span> - {article.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(article)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-all duration-300 transform group-hover:scale-105">
                      Lire <BookOpen className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredNews.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Aucune actualité trouvée pour vos critères de recherche.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400 text-sm">
          Powered by <span className="font-semibold text-red-600 dark:text-red-400">Cursor</span> • 
          Actualités mises à jour en temps réel
        </footer>
      </div>

      {/* Notifications Toast */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default CursorEnhanced;
