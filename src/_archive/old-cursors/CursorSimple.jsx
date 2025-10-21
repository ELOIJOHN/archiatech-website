import React, { useState, useEffect } from 'react';

const CursorSimple = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Données d'exemple d'actualités IA
  const sampleNews = [
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

  useEffect(() => {
    // Simuler le chargement des actualités
    const timer = setTimeout(() => {
      setNews(sampleNews);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les actualités selon la recherche
  const filteredNews = news.filter(article => 
    article.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des actualités IA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            📰 Actualités IA
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Restez informé des dernières innovations en intelligence artificielle
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8 flex justify-center">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Rechercher dans les actualités..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Résultats de recherche */}
        {searchQuery && (
          <div className="mb-6 text-center">
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
                  <span className="text-white text-lg">{article.sourceIcon}</span>
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
                <p className="text-gray-700 dark:text-gray-300 text-base mb-6">
                  {article.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{article.source}</span> - {article.date}
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-all duration-300 transform group-hover:scale-105">
                    Lire 📖
                  </button>
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
    </div>
  );
};

export default CursorSimple;
