import React, { useState, useEffect } from 'react';

const CursorInlineStyles = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Styles inline pour contourner le problème Tailwind
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#111827' : '#ffffff',
      transition: 'all 0.3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    content: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '24px'
    },
    darkModeButton: {
      padding: '12px',
      borderRadius: '12px',
      backgroundColor: darkMode ? '#374151' : '#f3f4f6',
      border: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      transition: 'all 0.3s ease'
    },
    title: {
      fontSize: '48px',
      fontWeight: '800',
      color: darkMode ? '#ffffff' : '#111827',
      marginBottom: '16px',
      marginTop: '24px'
    },
    subtitle: {
      fontSize: '20px',
      color: darkMode ? '#d1d5db' : '#6b7280',
      marginBottom: '32px'
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    searchBox: {
      width: '100%',
      maxWidth: '400px',
      padding: '12px 16px',
      borderRadius: '12px',
      border: `2px solid ${darkMode ? '#374151' : '#d1d5db'}`,
      backgroundColor: darkMode ? '#374151' : '#ffffff',
      color: darkMode ? '#ffffff' : '#111827',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    searchBoxFocus: {
      borderColor: '#dc2626',
      boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
    },
    results: {
      textAlign: 'center',
      marginBottom: '24px',
      color: darkMode ? '#d1d5db' : '#6b7280'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '32px',
      marginBottom: '64px'
    },
    card: {
      backgroundColor: darkMode ? '#374151' : '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    cardHeader: {
      height: '128px',
      padding: '24px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      position: 'relative'
    },
    cardContent: {
      padding: '24px'
    },
    sourceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      borderRadius: '9999px',
      padding: '8px 16px'
    },
    sourceIcon: {
      fontSize: '20px',
      color: '#ffffff'
    },
    sourceText: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '600'
    },
    tagsContainer: {
      display: 'flex',
      gap: '8px'
    },
    tag: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      borderRadius: '9999px',
      padding: '4px 12px',
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: '600'
    },
    headline: {
      fontSize: '24px',
      fontWeight: '700',
      color: darkMode ? '#ffffff' : '#111827',
      marginBottom: '12px',
      lineHeight: '1.3',
      transition: 'color 0.3s ease'
    },
    headlineHover: {
      color: '#dc2626'
    },
    description: {
      color: darkMode ? '#d1d5db' : '#374151',
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '24px'
    },
    cardFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
      paddingTop: '16px'
    },
    date: {
      fontSize: '14px',
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    readButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 20px',
      backgroundColor: '#dc2626',
      color: '#ffffff',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    readButtonHover: {
      backgroundColor: '#b91c1c',
      transform: 'scale(1.05)'
    },
    loadingContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid #f3f4f6',
      borderTop: '4px solid #dc2626',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px'
    },
    loadingText: {
      color: '#6b7280',
      fontSize: '18px'
    },
    noResults: {
      textAlign: 'center',
      padding: '48px 0',
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '18px'
    },
    footer: {
      textAlign: 'center',
      marginTop: '64px',
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '14px'
    },
    poweredBy: {
      fontWeight: '600',
      color: '#dc2626'
    }
  };

  // Données d'exemple d'actualités IA
  const sampleNews = [
    {
      id: 1,
      source: 'OpenAI News',
      sourceIcon: '🧠',
      category: 'Releases',
      language: 'EN',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
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
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
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
      gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
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
      gradient: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
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
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
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
      gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
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
      <div style={styles.loadingContainer}>
        <div style={{ textAlign: 'center' }}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Chargement des actualités IA...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          
          .card:hover .headline {
            color: #dc2626;
          }
          
          .read-button:hover {
            background-color: #b91c1c;
            transform: scale(1.05);
          }
          
          .search-box:focus {
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
          }
        `}
      </style>
      
      <div style={styles.container}>
        <div style={styles.content}>
          
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.controls}>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={styles.darkModeButton}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
            
            <h1 style={styles.title}>
              📰 Actualités IA
            </h1>
            <p style={styles.subtitle}>
              Restez informé des dernières innovations en intelligence artificielle
            </p>
          </div>

          {/* Barre de recherche */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Rechercher dans les actualités..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchBox}
              className="search-box"
            />
          </div>

          {/* Résultats de recherche */}
          {searchQuery && (
            <div style={styles.results}>
              {filteredNews.length} résultat{filteredNews.length > 1 ? 's' : ''} pour "{searchQuery}"
            </div>
          )}

          {/* Grille des actualités */}
          <div style={styles.grid}>
            {filteredNews.map((article) => (
              <div
                key={article.id}
                className="card"
                style={styles.card}
              >
                {/* Section gradient en haut */}
                <div style={{
                  ...styles.cardHeader,
                  background: article.gradient
                }}>
                  <div style={styles.sourceContainer}>
                    <span style={styles.sourceIcon}>{article.sourceIcon}</span>
                    <span style={styles.sourceText}>{article.source}</span>
                  </div>
                  <div style={styles.tagsContainer}>
                    <span style={styles.tag}>{article.category}</span>
                    <span style={styles.tag}>{article.language}</span>
                  </div>
                </div>

                {/* Contenu principal */}
                <div style={styles.cardContent}>
                  <h2 className="headline" style={styles.headline}>
                    {article.headline}
                  </h2>
                  <p style={styles.description}>
                    {article.description}
                  </p>

                  {/* Footer */}
                  <div style={styles.cardFooter}>
                    <div style={styles.date}>
                      <span style={{ fontWeight: '500' }}>{article.source}</span> - {article.date}
                    </div>
                    <button 
                      className="read-button"
                      style={styles.readButton}
                    >
                      Lire 📖
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredNews.length === 0 && !loading && (
            <div style={styles.noResults}>
              Aucune actualité trouvée pour vos critères de recherche.
            </div>
          )}

          {/* Footer */}
          <footer style={styles.footer}>
            Powered by <span style={styles.poweredBy}>Cursor</span> • 
            Actualités mises à jour en temps réel
          </footer>
        </div>
      </div>
    </>
  );
};

export default CursorInlineStyles;
