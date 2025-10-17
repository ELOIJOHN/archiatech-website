import React, { useState } from 'react';
import { ExternalLink, Calendar, TrendingUp, ArrowRight, RefreshCw } from 'lucide-react';
import useNewsAPI from '../hooks/useNewsAPI';

const NewsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const { articles, loading, error, refreshNews } = useNewsAPI(selectedCategory);

  // Catégories de news pertinentes pour ArchiAtech
  const categories = [
    { id: 'technology', name: 'Technologie', emoji: '💻' },
    { id: 'business', name: 'Business', emoji: '📈' },
    { id: 'artificial-intelligence', name: 'IA & ML', emoji: '🤖' },
    { id: 'automation', name: 'Automatisation', emoji: '⚡' }
  ];


  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  // Fonction pour ouvrir l'article
  const openArticle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="actualites" className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E60023]/5 via-transparent to-[#E60023]/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#E60023]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#E60023]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#E60023]/20 border border-[#E60023]/40 text-[#E60023] rounded-full text-sm font-semibold mb-6 backdrop-blur-md">
            <TrendingUp className="w-4 h-4" />
            <span>Veille Technologique</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
            Actualités{' '}
            <span className="bg-gradient-to-r from-[#E60023] via-red-600 to-[#E60023] bg-clip-text text-transparent">
              IA & Digital
            </span>
          </h2>
          
          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
            Restez informé des dernières tendances en intelligence artificielle, automatisation et transformation digitale
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#E60023] text-white shadow-lg shadow-[#E60023]/30'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-md border border-white/20'
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={refreshNews}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-pulse">
                <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-xl mb-4">❌ {error}</div>
            <button
              onClick={refreshNews}
              className="px-6 py-3 bg-[#E60023] text-white rounded-full hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#E60023]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#E60023]/20 group cursor-pointer"
                onClick={() => openArticle(article.url)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-[#E60023] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {categories.find(cat => cat.id === article.category)?.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <span className="bg-white/10 px-2 py-1 rounded-full">
                      {article.source.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#E60023] transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#E60023] text-sm font-medium group-hover:text-red-400 transition-colors">
                      Lire l'article
                    </span>
                    <ExternalLink className="w-4 h-4 text-[#E60023] group-hover:text-red-400 transition-colors" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-white/60 mb-6">
            Vous souhaitez rester informé des dernières actualités ?
          </p>
          <button className="btn-archiatech inline-flex items-center space-x-2">
            <span>S'abonner à la newsletter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
