import React from 'react';
import { ExternalLink, Globe, Brain, Zap, Shield, TrendingUp, Code } from 'lucide-react';

const CursorNewsApp = () => {
  const newsData = [
    {
      id: 1,
      title: "OpenAI lance GPT-4 Turbo avec capacités multimodales améliorées",
      description: "La nouvelle version offre des performances 3x plus rapides et une meilleure compréhension contextuelle pour les applications d'entreprise.",
      source: "OpenAI News",
      sourceIcon: <Brain className="w-5 h-5" />,
      category: "Releases",
      language: "EN",
      date: "15 Jan 2024",
      gradient: "from-purple-500 to-blue-600",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      title: "Microsoft Copilot intègre l'IA générative dans Office 365",
      description: "Les utilisateurs peuvent désormais créer des documents, présentations et analyses automatiquement grâce à l'intelligence artificielle.",
      source: "Microsoft News",
      sourceIcon: <Globe className="w-5 h-5" />,
      category: "Product",
      language: "FR",
      date: "14 Jan 2024",
      gradient: "from-teal-500 to-green-600",
      categoryColor: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      title: "Hugging Face publie un nouveau modèle de traduction multilingue",
      description: "Le modèle supporte 200+ langues avec une précision inégalée pour les traductions techniques et commerciales.",
      source: "Hugging Face",
      sourceIcon: <Brain className="w-5 h-5" />,
      category: "Research",
      language: "EN",
      date: "13 Jan 2024",
      gradient: "from-pink-500 to-purple-600",
      categoryColor: "bg-purple-100 text-purple-800"
    },
    {
      id: 4,
      title: "L'IA générative transforme l'industrie du développement logiciel",
      description: "Les développeurs rapportent 40% d'augmentation de productivité avec les outils d'IA intégrés dans leur workflow quotidien.",
      source: "TechCrunch",
      sourceIcon: <Code className="w-5 h-5" />,
      category: "Industry",
      language: "EN",
      date: "12 Jan 2024",
      gradient: "from-orange-500 to-red-600",
      categoryColor: "bg-orange-100 text-orange-800"
    },
    {
      id: 5,
      title: "Nouvelle réglementation européenne sur l'IA: ce qu'il faut savoir",
      description: "L'UE finalise son cadre réglementaire pour l'intelligence artificielle responsable et éthique dans les entreprises.",
      source: "Euronews",
      sourceIcon: <Globe className="w-5 h-5" />,
      category: "Regulation",
      language: "FR",
      date: "11 Jan 2024",
      gradient: "from-blue-500 to-purple-600",
      categoryColor: "bg-purple-100 text-purple-800"
    },
    {
      id: 6,
      title: "Nouveaux outils d'IA pour l'analyse prédictive en entreprise",
      description: "Les entreprises adoptent massivement l'IA prédictive pour anticiper les tendances et optimiser leurs décisions stratégiques.",
      source: "AI Business",
      sourceIcon: <TrendingUp className="w-5 h-5" />,
      category: "Innovation",
      language: "EN",
      date: "10 Jan 2024",
      gradient: "from-green-500 to-teal-600",
      categoryColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Actualités IA
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restez informé des dernières innovations en intelligence artificielle
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
            >
              {/* Top Section with Gradient */}
              <div className={`h-32 bg-gradient-to-br ${article.gradient} relative p-6`}>
                <div className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    {article.sourceIcon}
                  </div>
                  <span className="font-semibold text-sm">{article.source}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {article.language}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {article.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {article.source} • {article.date}
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md">
                    <span>Lire</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Powered by Cursor • Actualités mises à jour en temps réel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorNewsApp;
