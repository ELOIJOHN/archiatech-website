/**
 * API pour les actualités IA
 * Connecté au serveur MCP et workflow n8n
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Récupère les dernières actualités IA
 * @param {number} limit - Nombre d'articles à récupérer (défaut: 5)
 * @param {string} language - Langue des articles ('fr', 'en', 'all')
 * @returns {Promise<Array>} Liste des articles
 */
export const getAINews = async (limit = 5, language = 'all') => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      language: language,
      source: 'auto' // Source automatique via n8n
    });

    const response = await fetch(`${API_BASE_URL}/ai-news?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    // Retourner des données d'exemple en cas d'erreur
    return getMockNews();
  }
};

/**
 * Force la mise à jour des actualités via n8n
 * @returns {Promise<Object>} Résultat de la mise à jour
 */
export const refreshAINews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-news/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur de mise à jour: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    throw error;
  }
};

/**
 * Récupère les statistiques des actualités
 * @returns {Promise<Object>} Statistiques
 */
export const getNewsStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-news/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur stats: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    return {
      totalArticles: 0,
      lastUpdate: null,
      sources: []
    };
  }
};

/**
 * Données d'exemple (fallback)
 */
const getMockNews = () => [
  {
    id: 1,
    title: "OpenAI lance GPT-4 Turbo avec capacités multimodales améliorées",
    summary: "La nouvelle version offre des performances 3x plus rapides et une meilleure compréhension contextuelle.",
    source: "OpenAI Blog",
    url: "https://openai.com/blog/gpt-4-turbo",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    publishedAt: new Date().toISOString(),
    category: "Releases",
    language: "en"
  },
  {
    id: 2,
    title: "Microsoft Copilot intègre l'IA générative dans Office 365",
    summary: "Les utilisateurs peuvent désormais créer des documents, présentations et analyses automatiquement.",
    source: "Microsoft News",
    url: "https://news.microsoft.com/copilot-office365",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Product",
    language: "fr"
  }
];

/**
 * Configuration des sources d'actualités pour n8n
 */
export const NEWS_SOURCES = {
  OPENAI: {
    name: "OpenAI Blog",
    url: "https://openai.com/blog",
    rss: "https://openai.com/blog/rss.xml",
    category: "Releases"
  },
  HUGGINGFACE: {
    name: "Hugging Face",
    url: "https://huggingface.co/blog",
    rss: "https://huggingface.co/blog/rss.xml",
    category: "Research"
  },
  GOOGLE_NEWS: {
    name: "Google News AI",
    url: "https://news.google.com/search?q=artificial+intelligence",
    api: "https://newsapi.org/v2/everything",
    category: "Industry"
  },
  MICROSOFT: {
    name: "Microsoft AI",
    url: "https://blogs.microsoft.com/ai",
    rss: "https://blogs.microsoft.com/ai/feed",
    category: "Product"
  },
  LINKEDIN_TECH: {
    name: "LinkedIn Tech",
    url: "https://www.linkedin.com/pulse/artificial-intelligence",
    api: "linkedin-api",
    category: "Industry"
  }
};

/**
 * Configuration du workflow n8n
 */
export const N8N_CONFIG = {
  workflowId: "ai-news-collector",
  triggerInterval: "weekly", // Mise à jour hebdomadaire
  maxArticles: 5,
  languages: ["fr", "en"],
  sources: Object.keys(NEWS_SOURCES),
  categories: ["Releases", "Product", "Research", "Industry", "Regulation"]
};
