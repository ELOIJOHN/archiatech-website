import React from 'react';
import { 
  Cpu, 
  Zap, 
  Code, 
  Star, 
  Wrench, 
  Lightbulb, 
  Puzzle, 
  Users, 
  Rocket, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: "Automatisation Workflows",
    description: "Workflows intelligents et RPA pour optimiser vos processus métiers",
    features: ["RPA avancé", "Connecteurs API", "Workflows personnalisés"],
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Cpu,
    title: "Intelligence Artificielle",
    description: "Solutions IA sur-mesure pour votre entreprise",
    features: ["IA conversationnelle", "Machine Learning", "Analyse prédictive"],
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Code,
    title: "Solutions No-Code",
    description: "Développement rapide sans programmation",
    features: ["Zapier", "Make", "Airtable", "Notion"],
    color: "from-green-500 to-green-600"
  },
  {
    icon: Star,
    title: "Services Premium",
    description: "Solutions complètes pour digitaliser vos processus",
    features: ["Audit gratuit", "Accompagnement", "Support 24/7"],
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Wrench,
    title: "Support & Déploiement IT",
    description: "Installation et configuration de postes de travail",
    features: ["Déploiement", "Maintenance", "Formation"],
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Lightbulb,
    title: "Conseil & Intégration IA",
    description: "Solutions IA appliquées à vos processus métiers",
    features: ["Stratégie IA", "Intégration", "Optimisation"],
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Puzzle,
    title: "Solutions No-Code/Low-Code",
    description: "Développement avec les meilleures plateformes",
    features: ["Bubble", "Webflow", "Airtable", "Zapier"],
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: Users,
    title: "Formation & Accompagnement",
    description: "Support continu et formation de vos équipes",
    features: ["Formation", "Tutoriels", "Support technique"],
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: Rocket,
    title: "Transformation Digitale",
    description: "Stratégie complète d'innovation et digitalisation",
    features: ["Audit digital", "Roadmap", "Mise en œuvre"],
    color: "from-red-500 to-red-600"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Services <span className="text-red-600">Premium</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de solutions pour transformer votre entreprise 
            avec l'intelligence artificielle et l'automatisation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a 
                href="#contact" 
                className="group/btn inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
              >
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à transformer votre entreprise ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contactez-nous pour un audit gratuit et découvrez comment nos solutions 
              peuvent optimiser vos processus métiers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                Demander un audit gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="tel:+33783829310" 
                className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-red-600 text-gray-700 hover:text-red-600 rounded-xl font-semibold transition-colors duration-200"
              >
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
