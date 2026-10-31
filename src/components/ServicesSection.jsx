import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Cog, Cpu, Zap, Code, Users, Rocket, ArrowRight } from 'lucide-react';

// Une idée, une phrase par service. Le détail est sur chaque page de service.
const services = [
  { icon: Cog, title: 'Support & déploiement IT', text: 'Vos postes installés, configurés et suivis.', href: '/services/support-it/' },
  { icon: Cpu, title: 'Conseil & intégration IA', text: "L'IA appliquée à vos processus, sans jargon.", href: '/services/ia-souveraine/' },
  { icon: Zap, title: 'Automatisation', text: 'Vos outils reliés, vos tâches répétitives en moins.', href: '/services/automatisation-n8n/' },
  { icon: Code, title: 'No-code / low-code', text: 'Des applications simples, livrées vite.', href: '/services/automatisation-n8n/' },
  { icon: Users, title: 'Formation', text: 'Vos équipes autonomes sur leurs nouveaux outils.', href: '/contact/?objet=audit#formulaire' },
  { icon: Rocket, title: 'Transformation digitale', text: 'Une feuille de route claire, étape par étape.', href: '/contact/?objet=audit#formulaire' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-black py-20 sm:py-28 md:py-36 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="text-sm sm:text-base font-semibold tracking-wide text-[#ff5a6e]">Nos services</p>
          <h2 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-white">
            Six façons de
            <br />
            <span className="text-gray-500">gagner du temps.</span>
          </h2>
        </Motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s, i) => (
            <Motion.a
              key={s.title}
              href={s.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              className="group relative overflow-hidden rounded-[1.75rem] bg-[#111113] p-7 sm:p-8 min-h-[14rem] flex flex-col justify-between transition-colors hover:bg-[#17171a]"
            >
              <div
                className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#F70D1A] blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />
              <s.icon className="relative h-10 w-10 text-[#F70D1A]" strokeWidth={1.5} aria-hidden="true" />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mt-2 text-base text-gray-400 leading-snug">{s.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#ff5a6e] group-hover:text-white transition-colors">
                  En savoir plus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
