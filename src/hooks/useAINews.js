import { useState, useEffect, useCallback } from 'react';
import { getAINews, refreshAINews, getNewsStats } from '../api/aiNewsAPI';

/**
 * Hook personnalisé pour gérer les actualités IA
 * @param {Object} options - Options de configuration
 * @returns {Object} État et fonctions pour les actualités
 */
export const useAINews = (options = {}) => {
  const {
    limit = 5,
    language = 'all',
    autoRefresh = false,
    refreshInterval = 60000 // 1 minute par défaut
  } = options;

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [stats, setStats] = useState(null);

  // Fonction pour charger les actualités
  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [newsData, statsData] = await Promise.all([
        getAINews(limit, language),
        getNewsStats()
      ]);

      setNews(newsData);
      setStats(statsData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des actualités:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, language]);

  // Fonction pour actualiser les données
  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await refreshAINews();
      await loadNews();
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de l\'actualisation:', err);
    } finally {
      setLoading(false);
    }
  }, [loadNews]);

  // Chargement initial
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Auto-refresh si activé
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadNews();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loadNews]);

  // Fonction pour filtrer par catégorie
  const filterByCategory = useCallback((category) => {
    return news.filter(article => article.category === category);
  }, [news]);

  // Fonction pour filtrer par langue
  const filterByLanguage = useCallback((lang) => {
    return news.filter(article => article.language === lang);
  }, [news]);

  // Fonction pour rechercher dans les articles
  const searchArticles = useCallback((query) => {
    const lowercaseQuery = query.toLowerCase();
    return news.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.summary.toLowerCase().includes(lowercaseQuery) ||
      article.source.toLowerCase().includes(lowercaseQuery)
    );
  }, [news]);

  // Statistiques calculées
  const computedStats = {
    totalArticles: news.length,
    categories: [...new Set(news.map(article => article.category))],
    languages: [...new Set(news.map(article => article.language))],
    sources: [...new Set(news.map(article => article.source))],
    lastUpdate,
    isLoading: loading,
    hasError: !!error
  };

  return {
    // État
    news,
    loading,
    error,
    lastUpdate,
    stats,
    
    // Actions
    loadNews,
    refresh,
    
    // Filtres
    filterByCategory,
    filterByLanguage,
    searchArticles,
    
    // Statistiques
    computedStats
  };
};
