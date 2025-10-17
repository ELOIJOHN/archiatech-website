import React from 'react';
import { Cog, Cpu, Zap, Code, Users, Rocket, ArrowRight } from 'lucide-react';
import VideoButton from './VideoButton';

export default function ServicesSection() {
  const services = [
    {
      icon: <Cog className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Support & Déploiement IT",
      description: "Installation, configuration et déploiement de postes de travail en toute sérénité",
      gradient: "from-[#E60023] to-red-600"
    },
    {
      icon: <Cpu className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Conseil & Intégration IA",
      description: "Solutions d'intelligence artificielle appliquées à vos processus métiers",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Automatisation Workflows",
      description: "RPA, connecteurs, API pour optimiser vos processus",
      gradient: "from-[#E60023] to-red-600"
    },
    {
      icon: <Code className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Solutions No-Code/Low-Code",
      description: "Développement avec Zapier, Make, Airtable, Notion, Bubble...",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Formation & Accompagnement",
      description: "Support continu et formation de vos équipes",
      gradient: "from-[#E60023] to-red-600"
    },
    {
      icon: <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Transformation Digitale",
      description: "Stratégie complète d'innovation et de digitalisation",
      gradient: "from-red-600 to-red-800"
    }
  ];

  return (
    <section
      id="services"
      className="py-10 xs:py-12 sm:py-16 md:py-20 lg:py-24 bg-black
                landscape:py-8"
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <span className="text-[#E60023] font-semibold
                         text-[0.65rem] xs:text-xs sm:text-sm
                         uppercase tracking-wider">
            Nos expertises
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl
                       font-bold text-white
                       mb-2 xs:mb-3 sm:mb-4
                       mt-1.5 xs:mt-2 sm:mt-3">
            Services Premium
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl
                      text-white/70 max-w-3xl mx-auto
                      px-3 xs:px-4 leading-relaxed">
            Des solutions complètes pour digitaliser et automatiser vos processus métiers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                      gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative glass-card
                        p-4 xs:p-5 sm:p-6 md:p-8
                        transition-all duration-300
                        hover:scale-[1.02] active:scale-[0.98]"
            >

              <div className={`relative
                             w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14
                             bg-gradient-to-br ${service.gradient}
                             rounded-md xs:rounded-lg sm:rounded-xl
                             flex items-center justify-center text-white
                             mb-3 xs:mb-4 sm:mb-5
                             group-hover:scale-110 transition-transform
                             touch-target`}>
                {service.icon}
              </div>

              <h3 className="relative
                           text-base xs:text-lg sm:text-xl
                           font-bold glass-text
                           mb-1.5 xs:mb-2 sm:mb-3
                           leading-tight">
                {service.title}
              </h3>
              <p className="relative glass-text-light
                          mb-3 xs:mb-4 leading-relaxed
                          text-xs xs:text-sm sm:text-base">
                {service.description}
              </p>

              <div className="relative flex flex-col gap-1.5 xs:gap-2 sm:gap-3">
                <VideoButton
                  serviceTitle={service.title}
                  className="text-xs sm:text-sm touch-target"
                />
                <a
                  href="#services"
                  className="relative text-[#E60023] font-semibold
                           flex items-center group-hover:gap-2
                           transition-all
                           text-xs xs:text-sm sm:text-base
                           touch-target"
                >
                  En savoir plus <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}