/**
 * Service pour récupérer les actualités IA depuis différentes sources
 */

// Configuration des sources d'actualités
const NEWS_SOURCES = {
  newsapi: {
    baseUrl: 'https://newsapi.org/v2/everything',
    apiKey: 'demo_key', // Remplacez par votre clé API NewsAPI
    params: {
      q: 'artificial intelligence OR "intelligence artificielle" OR AI OR machine learning',
      language: 'fr,en',
      sortBy: 'publishedAt',
      pageSize: 20
    }
  },
  rss: {
    sources: [
      {
        name: 'OpenAI News',
        url: 'https://openai.com/blog/rss.xml',
        category: 'Releases',
        language: 'EN'
      },
      {
        name: 'Microsoft AI News',
        url: 'https://blogs.microsoft.com/ai/feed/',
        category: 'Product',
        language: 'EN'
      },
      {
        name: 'Hugging Face Blog',
        url: 'https://huggingface.co/blog/feed.xml',
        category: 'Research',
        language: 'EN'
      },
      {
        name: 'TechCrunch AI',
        url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
        category: 'Industry',
        language: 'EN'
      },
      {
        name: 'Euronews Tech',
        url: 'https://www.euronews.com/tech/feed',
        category: 'Regulation',
        language: 'FR'
      },
      {
        name: 'AI Business',
        url: 'https://aibusiness.com/feed',
        category: 'Innovation',
        language: 'EN'
      }
    ]
  }
};

// Données d'exemple en cas d'échec API
const FALLBACK_NEWS = [
  {
    id: 1,
    source: 'OpenAI News',
    sourceIcon: '🧠',
    category: 'Releases',
    language: 'EN',
    gradient: 'from-purple-500 to-blue-500',
    headline: 'OpenAI lance GPT-4 Turbo avec capacités multimodales améliorées',
    description: 'La nouvelle version offre des performances 3x plus rapides et une meilleure compréhension contextuelle pour les applications d\'entreprise.',
    date: '15 Jan 2024',
    url: '#'
  },
  {
    id: 2,
    source: 'Microsoft News',
    sourceIcon: '🌐',
    category: 'Product',
    language: 'FR',
    gradient: 'from-teal-500 to-green-500',
    headline: 'Microsoft Copilot intègre l\'IA générative dans Office 365',
    description: 'Les utilisateurs peuvent désormais créer des documents, présentations et analyses automatiquement grâce à l\'intelligence artificielle.',
    date: '14 Jan 2024',
    url: '#'
  },
  {
    id: 3,
    source: 'Hugging Face',
    sourceIcon: '🧠',
    category: 'Research',
    language: 'EN',
    gradient: 'from-pink-500 to-purple-500',
    headline: 'Hugging Face publie un nouveau modèle de traduction multilingue',
    description: 'Le modèle supporte 200+ langues avec une précision inégalée pour les traductions techniques et commerciales.',
    date: '13 Jan 2024',
    url: '#'
  },
  {
    id: 4,
    source: 'TechCrunch',
    sourceIcon: '💻',
    category: 'Industry',
    language: 'EN',
    gradient: 'from-orange-500 to-red-500',
    headline: 'L\'IA générative transforme l\'industrie du développement logiciel',
    description: 'Les développeurs rapportent 40% d\'augmentation de productivité avec les outils d\'IA intégrés dans leur workflow quotidien.',
    date: '12 Jan 2024',
    url: '#'
  },
  {
    id: 5,
    source: 'Euronews',
    sourceIcon: '🌐',
    category: 'Regulation',
    language: 'FR',
    gradient: 'from-blue-500 to-purple-500',
    headline: 'Nouvelle réglementation européenne sur l\'IA: ce qu\'il faut savoir',
    description: 'L\'UE finalise son cadre réglementaire pour l\'intelligence artificielle responsable et éthique dans les entreprises.',
    date: '11 Jan 2024',
    url: '#'
  },
  {
    id: 6,
    source: 'AI Business',
    sourceIcon: '📈',
    category: 'Innovation',
    language: 'EN',
    gradient: 'from-green-500 to-teal-500',
    headline: 'Nouveaux outils d\'IA pour l\'analyse prédictive en entreprise',
    description: 'Les entreprises adoptent massivement l\'IA prédictive pour anticiper les tendances et optimiser leurs décisions stratégiques.',
    date: '10 Jan 2024',
    url: '#'
  }
];

/**
 * Récupère les actualités depuis NewsAPI
 */
async function fetchFromNewsAPI() {
  try {
    const { baseUrl, apiKey, params } = NEWS_SOURCES.newsapi;
    const url = new URL(baseUrl);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    url.searchParams.append('apiKey', apiKey);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.articles?.map((article, index) => ({
      id: index + 1,
      source: article.source?.name || 'Unknown Source',
      sourceIcon: getSourceIcon(article.source?.name),
      category: getCategoryFromTitle(article.title),
      language: detectLanguage(article.title + ' ' + article.description),
      gradient: getRandomGradient(),
      headline: article.title,
      description: article.description || article.content?.substring(0, 200) + '...',
      date: formatDate(article.publishedAt),
      url: article.url,
      imageUrl: article.urlToImage
    })) || [];
  } catch (error) {
    console.error('Erreur NewsAPI:', error);
    return [];
  }
}

/**
 * Parse un flux RSS
 */
async function fetchFromRSS(rssUrl) {
  try {
    // Utilisation d'un service proxy pour éviter les problèmes CORS
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`RSS fetch error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.items?.map((item, index) => ({
      id: index + 1,
      source: data.feed?.title || 'RSS Feed',
      sourceIcon: getSourceIcon(data.feed?.title),
      category: getCategoryFromTitle(item.title),
      language: detectLanguage(item.title + ' ' + item.content),
      gradient: getRandomGradient(),
      headline: item.title,
      description: item.content?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      date: formatDate(item.pubDate),
      url: item.link,
      imageUrl: item.thumbnail
    })) || [];
  } catch (error) {
    console.error('Erreur RSS:', error);
    return [];
  }
}

/**
 * Récupère toutes les actualités depuis différentes sources
 */
export async function fetchAllNews() {
  try {
    console.log('🔄 Récupération des actualités IA...');
    
    // Essayer NewsAPI d'abord
    let news = await fetchFromNewsAPI();
    
    // Si NewsAPI échoue, essayer les flux RSS
    if (news.length === 0) {
      console.log('📡 Tentative de récupération via RSS...');
      const rssPromises = NEWS_SOURCES.rss.sources.map(source => 
        fetchFromRSS(source.url)
      );
      
      const rssResults = await Promise.allSettled(rssPromises);
      news = rssResults
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value)
        .slice(0, 6); // Limiter à 6 articles
    }
    
    // Si tout échoue, utiliser les données d'exemple
    if (news.length === 0) {
      console.log('📰 Utilisation des données d\'exemple');
      news = FALLBACK_NEWS;
    }
    
    console.log(`✅ ${news.length} actualités récupérées`);
    return news;
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des actualités:', error);
    return FALLBACK_NEWS;
  }
}

/**
 * Utilitaires
 */
function getSourceIcon(sourceName) {
  const icons = {
    'OpenAI': '🧠',
    'Microsoft': '🌐',
    'Hugging Face': '🧠',
    'TechCrunch': '💻',
    'Euronews': '🌐',
    'AI Business': '📈'
  };
  
  return icons[sourceName] || '📰';
}

function getCategoryFromTitle(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('release') || titleLower.includes('nouveau') || titleLower.includes('launch')) {
    return 'Releases';
  } else if (titleLower.includes('product') || titleLower.includes('tool') || titleLower.includes('feature')) {
    return 'Product';
  } else if (titleLower.includes('research') || titleLower.includes('study') || titleLower.includes('model')) {
    return 'Research';
  } else if (titleLower.includes('industry') || titleLower.includes('business') || titleLower.includes('company')) {
    return 'Industry';
  } else if (titleLower.includes('regulation') || titleLower.includes('law') || titleLower.includes('policy')) {
    return 'Regulation';
  } else {
    return 'Innovation';
  }
}

function detectLanguage(text) {
  const frenchWords = ['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'ou', 'avec', 'pour', 'dans', 'sur'];
  const words = text.toLowerCase().split(' ');
  const frenchCount = words.filter(word => frenchWords.includes(word)).length;
  
  return frenchCount > 2 ? 'FR' : 'EN';
}

function getRandomGradient() {
  const gradients = [
    'from-purple-500 to-blue-500',
    'from-teal-500 to-green-500',
    'from-pink-500 to-purple-500',
    'from-orange-500 to-red-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500'
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return new Date().toLocaleDateString('fr-FR');
  }
}

/**
 * Recherche dans les actualités
 */
export function searchNews(news, query) {
  if (!query.trim()) return news;
  
  const searchTerm = query.toLowerCase();
  return news.filter(article => 
    article.headline.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm) ||
    article.source.toLowerCase().includes(searchTerm) ||
    article.category.toLowerCase().includes(searchTerm)
  );
}

/**
 * Filtre les actualités par catégorie et langue
 */
export function filterNews(news, filters) {
  let filtered = news;
  
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(article => article.category === filters.category);
  }
  
  if (filters.language && filters.language !== 'all') {
    filtered = filtered.filter(article => article.language === filters.language);
  }
  
  return filtered;
}
