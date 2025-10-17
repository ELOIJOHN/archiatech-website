import React from 'react';
import { Target, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const approaches = [
  {
    icon: Target,
    title: "Analyse & Audit",
    description: "Nous analysons vos processus existants pour identifier les opportunités d'optimisation",
    steps: ["Audit gratuit", "Analyse des flux", "Identification des goulots"]
  },
  {
    icon: Users,
    title: "Accompagnement",
    description: "Formation et support continu de vos équipes pour une adoption réussie",
    steps: ["Formation personnalisée", "Support technique", "Suivi régulier"]
  },
  {
    icon: Zap,
    title: "Déploiement",
    description: "Mise en œuvre progressive et sécurisée de vos solutions d'automatisation",
    steps: ["Déploiement sécurisé", "Tests en production", "Optimisation continue"]
  }
];

export default function ApproachSection() {
  return (
    <section id="approche" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Notre <span className="text-red-600">Approche</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une méthodologie éprouvée pour garantir le succès de votre transformation digitale
          </p>
        </div>

        {/* Approach Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {approaches.map((approach, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <approach.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {approach.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {approach.description}
              </p>
              <ul className="space-y-2">
                {approach.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir ArchiAtech ?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre expertise et notre approche personnalisée font la différence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">5+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Années d'expérience</h4>
              <p className="text-sm text-gray-600">Dans l'IA et l'automatisation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">100+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Projets réalisés</h4>
              <p className="text-sm text-gray-600">Avec succès</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">24/7</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Support technique</h4>
              <p className="text-sm text-gray-600">Disponible</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">100%</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Satisfaction client</h4>
              <p className="text-sm text-gray-600">Garantie</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors duration-200"
            >
              Découvrir notre approche
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
