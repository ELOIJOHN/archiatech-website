import React from 'react';
import { ExternalLink, Calendar, TrendingUp, ArrowRight } from 'lucide-react';

const NewsSectionSimple = () => {
  // Articles statiques de démonstration
  const articles = [
    {
      id: 1,
      title: "L'IA révolutionne l'automatisation des processus",
      description: "Découvrez comment l'intelligence artificielle transforme l'automatisation des workflows et améliore l'efficacité opérationnelle des entreprises.",
      url: "https://techcrunch.com",
      urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      publishedAt: "15/01/2024",
      source: { name: "TechCrunch" }
    },
    {
      id: 2,
      title: "No-Code : L'avenir du développement logiciel",
      description: "Les plateformes No-Code permettent aux entreprises de créer des applications sans compétences techniques, réduisant coûts et délais.",
      url: "https://forbes.com",
      urlToImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      publishedAt: "14/01/2024",
      source: { name: "Forbes" }
    },
    {
      id: 3,
      title: "Automatisation des workflows : +40% d'efficacité",
      description: "Les entreprises qui automatisent leurs processus gagnent en moyenne 40% de productivité. Méthodes et retours d'expérience.",
      url: "https://hbr.org",
      urlToImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      publishedAt: "13/01/2024",
      source: { name: "Harvard Business Review" }
    }
  ];

  return (
    <section id="actualites" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E60023]/5 via-transparent to-[#E60023]/10"></div>
      <div className="absolute top-10 left-5 w-48 h-48 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-[#E60023]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 sm:bottom-20 sm:right-10 sm:w-72 sm:h-72 bg-[#E60023]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E60023]/20 border border-[#E60023]/40 text-[#E60023] rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 backdrop-blur-md">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Veille Technologique</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Actualités{' '}
            <span className="bg-gradient-to-r from-[#E60023] via-red-600 to-[#E60023] bg-clip-text text-transparent">
              IA & Digital
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
            Restez informé des dernières tendances en intelligence artificielle et transformation digitale
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-[#E60023]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#E60023]/20 group cursor-pointer"
              onClick={() => window.open(article.url, '_blank')}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Meta */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-white/60 mb-2 sm:mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{article.publishedAt}</span>
                  </div>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs">
                    {article.source.name}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#E60023] transition-colors">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                  {article.description}
                </p>

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-[#E60023] text-xs sm:text-sm font-medium group-hover:text-red-400 transition-colors">
                    Lire l'article
                  </span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-[#E60023] group-hover:text-red-400 transition-colors" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 px-4">
            Vous souhaitez rester informé des dernières actualités ?
          </p>
          <button className="btn-archiatech inline-flex items-center space-x-2 text-sm sm:text-base">
            <span>S'abonner à la newsletter</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSectionSimple;
