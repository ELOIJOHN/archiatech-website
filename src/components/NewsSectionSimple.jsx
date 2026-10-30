import React, { useEffect, useState } from 'react';
import { ExternalLink, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { NEWS_API_URL } from '../config/news';
import { blogPosts } from '../data/blog-posts';

// Les actualités viennent de n8n : un workflow quotidien repère les nouveaux articles de sources
// reconnues, puis chaque article est validé (Telegram) avant d'apparaître ici.
// Tant qu'aucune actualité n'est validée, la section présente les derniers articles du blog ArchiAtech.
const isValid = (a) =>
  a && typeof a.title === 'string' && a.title.trim() && /^https?:\/\//.test(a.url || '');

const formatDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const FALLBACK = blogPosts.slice(0, 3).map((p) => ({
  title: p.title,
  url: `/blog/${p.slug}/`,
  source: 'Blog ArchiAtech',
  summary: p.description,
  publishedAt: p.date,
  internal: true,
}));

const NewsSectionSimple = () => {
  const [articles, setArticles] = useState(FALLBACK);
  const [external, setExternal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(NEWS_API_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        const list = (Array.isArray(data?.articles) ? data.articles : []).filter(isValid).slice(0, 6);
        if (!cancelled && list.length > 0) {
          setArticles(list);
          setExternal(true);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="actualites" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F70D1A]/5 via-transparent to-[#F70D1A]/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F70D1A]/20 border border-[#F70D1A]/40 text-[#F70D1A] rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 backdrop-blur-md">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Veille Technologique</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Actualités{' '}
            <span className="bg-gradient-to-r from-[#F70D1A] via-red-600 to-[#F70D1A] bg-clip-text text-transparent">
              IA & Digital
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
            {external
              ? "Une sélection d'articles de sources reconnues, choisis par ArchiAtech. Les contenus appartiennent à leurs auteurs."
              : "Nos derniers articles sur l'IA, l'automatisation et le support IT pour les PME."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {articles.map((article) => (
            <article
              key={article.url}
              className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#F70D1A]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#F70D1A]/20 group flex flex-col"
            >
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between text-xs sm:text-sm text-white/60 mb-2 sm:mb-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  {article.source && (
                    <span className="bg-white/10 px-2 py-1 rounded-full text-xs">{article.source}</span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 line-clamp-3 group-hover:text-[#F70D1A] transition-colors">
                  {article.title}
                </h3>

                {article.summary && (
                  <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                )}

                <a
                  href={article.url}
                  {...(article.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="mt-auto flex items-center justify-between text-[#F70D1A] text-xs sm:text-sm font-medium hover:text-red-400 transition-colors"
                >
                  <span>Lire l'article</span>
                  {article.internal ? (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 px-4">
            Un projet d'automatisation ou d'IA en tête ?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="/blog/" className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#F70D1A] hover:bg-red-700 text-white font-semibold transition-colors text-sm sm:text-base">
              <span>Tous nos articles</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
            <a href="/contact/" className="text-white/80 hover:text-white underline underline-offset-4 text-sm sm:text-base">
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSectionSimple;
