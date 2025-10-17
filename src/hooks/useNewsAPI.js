import { useState, useEffect } from 'react';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'demo-key';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Configuration des sources et mots-clés pour ArchiAtech
const NEWS_CONFIG = {
  sources: [
    'techcrunch',
    'ars-technica', 
    'wired',
    'the-verge',
    'engadget',
    'mashable'
  ],
  keywords: [
    'artificial intelligence',
    'machine learning',
    'automation',
    'no-code',
    'low-code',
    'digital transformation',
    'workflow',
    'RPA',
    'AI',
    'ML'
  ],
  language: 'fr',
  sortBy: 'publishedAt',
  pageSize: 20
};

export const useNewsAPI = (category = 'all') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mots-clés spécifiques par catégorie
  const getCategoryKeywords = (cat) => {
    const categoryKeywords = {
      'technology': ['technology', 'innovation', 'startup', 'tech'],
      'business': ['business', 'enterprise', 'ROI', 'efficiency', 'productivity'],
      'artificial-intelligence': ['artificial intelligence', 'machine learning', 'AI', 'ML', 'neural network', 'deep learning'],
      'automation': ['automation', 'workflow', 'RPA', 'process automation', 'business process']
    };
    
    return categoryKeywords[cat] || NEWS_CONFIG.keywords;
  };

  const fetchNews = async (cat = category) => {
    setLoading(true);
    setError(null);

    try {
      // Si c'est une démo (pas de clé API), utiliser les articles de démonstration
      if (NEWS_API_KEY === 'demo-key') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai
        
        const demoArticles = getDemoArticles(cat);
        setArticles(demoArticles);
        return;
      }

      // Construction de la requête pour l'API NewsAPI
      const keywords = getCategoryKeywords(cat);
      const query = keywords.join(' OR ');
      
      const params = new URLSearchParams({
        q: query,
        sources: NEWS_CONFIG.sources.join(','),
        language: NEWS_CONFIG.language,
        sortBy: NEWS_CONFIG.sortBy,
        pageSize: NEWS_CONFIG.pageSize.toString(),
        apiKey: NEWS_API_KEY
      });

      const response = await fetch(`${NEWS_API_URL}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'ok') {
        const processedArticles = data.articles.map((article, index) => ({
          id: `api-${index}`,
          title: article.title,
          description: article.description || article.content?.substring(0, 200) + '...',
          url: article.url,
          urlToImage: article.urlToImage || getDefaultImage(cat),
          publishedAt: article.publishedAt,
          source: { name: article.source.name },
          category: cat,
          author: article.author
        }));
        
        setArticles(processedArticles);
      } else {
        throw new Error(data.message || 'Erreur lors du chargement des actualités');
      }
    } catch (err) {
      console.error('Erreur fetchNews:', err);
      setError(err.message);
      // En cas d'erreur, utiliser les articles de démonstration
      setArticles(getDemoArticles(cat));
    } finally {
      setLoading(false);
    }
  };

  // Articles de démonstration par catégorie
  const getDemoArticles = (cat) => {
    const allDemoArticles = [
      {
        id: 1,
        title: "L'IA générative révolutionne l'automatisation des processus métier",
        description: "Les entreprises adoptent massivement les solutions d'IA pour automatiser leurs workflows et gagner en efficacité opérationnelle. Découvrez comment cette technologie transforme les organisations.",
        url: "https://example.com/article1",
        urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        publishedAt: new Date().toISOString(),
        source: { name: "TechCrunch" },
        category: "artificial-intelligence"
      },
      {
        id: 2,
        title: "Les solutions No-Code transforment le développement d'applications",
        description: "Les plateformes No-Code permettent aux entreprises de créer des applications sans compétences techniques approfondies, réduisant les coûts et accélérant la mise sur le marché.",
        url: "https://example.com/article2",
        urlToImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: { name: "Forbes" },
        category: "technology"
      },
      {
        id: 3,
        title: "ROI de l'automatisation : comment mesurer le succès de vos projets",
        description: "Guide complet pour évaluer l'impact financier et opérationnel de vos initiatives d'automatisation. Méthodes et outils pour quantifier les bénéfices.",
        url: "https://example.com/article3",
        urlToImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: { name: "Harvard Business Review" },
        category: "business"
      },
      {
        id: 4,
        title: "Workflow automation : les meilleures pratiques pour 2024",
        description: "Découvrez les tendances et stratégies gagnantes pour automatiser vos processus métier cette année. Retours d'expérience et recommandations d'experts.",
        url: "https://example.com/article4",
        urlToImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        source: { name: "MIT Technology Review" },
        category: "automation"
      },
      {
        id: 5,
        title: "Transformation digitale : les défis des PME françaises",
        description: "Analyse des enjeux et opportunités de la digitalisation pour les petites et moyennes entreprises. Étude de cas et bonnes pratiques.",
        url: "https://example.com/article5",
        urlToImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        source: { name: "Les Échos" },
        category: "business"
      },
      {
        id: 6,
        title: "Machine Learning et automatisation : l'avenir du travail",
        description: "Comment l'IA et l'automatisation redéfinissent les métiers et créent de nouvelles opportunités. Impact sur l'emploi et compétences requises.",
        url: "https://example.com/article6",
        urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        source: { name: "Wired" },
        category: "artificial-intelligence"
      },
      {
        id: 7,
        title: "Intelligence artificielle : les nouvelles tendances du marché",
        description: "Panorama des innovations récentes en IA et leur impact sur les entreprises. Focus sur les applications pratiques et les retours sur investissement.",
        url: "https://example.com/article7",
        urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 518400000).toISOString(),
        source: { name: "VentureBeat" },
        category: "artificial-intelligence"
      },
      {
        id: 8,
        title: "Solutions Low-Code : démocratiser le développement logiciel",
        description: "Comment les plateformes Low-Code permettent aux entreprises de développer plus rapidement tout en réduisant les coûts et la dépendance aux développeurs.",
        url: "https://example.com/article8",
        urlToImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        publishedAt: new Date(Date.now() - 604800000).toISOString(),
        source: { name: "ZDNet" },
        category: "technology"
      }
    ];

    return cat === 'all' 
      ? allDemoArticles 
      : allDemoArticles.filter(article => article.category === cat);
  };

  // Images par défaut selon la catégorie
  const getDefaultImage = (cat) => {
    const defaultImages = {
      'technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      'business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      'artificial-intelligence': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      'automation': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop'
    };
    
    return defaultImages[cat] || defaultImages['technology'];
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  return {
    articles,
    loading,
    error,
    refreshNews: () => fetchNews(category)
  };
};

export default useNewsAPI;
