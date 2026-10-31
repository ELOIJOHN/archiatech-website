import React from 'react';
import BrandIcon from './BrandIcon';
import { motion as Motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { offers } from '../data/offers';

// Section « Offres » de l'accueil. Aucun prix : chaque projet est chiffré sur devis après un audit gratuit.
export default function OffresSection() {
  return (
    <section id="offres" className="bg-black py-20 sm:py-28 md:py-36 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="text-sm sm:text-base font-semibold tracking-wide text-[#ff5a6e]">Nos offres</p>
          <h2 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-white">
            Quatre offres.
            <br />
            <span className="text-gray-500">Un point de départ.</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Tout commence par un audit gratuit. Chaque projet est ensuite chiffré sur devis.
          </p>
        </Motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {offers.map((o, i) => (
            <Motion.a
              key={o.slug}
              href={o.landing ? `/offres/${o.slug}/` : '/contact/?objet=audit#formulaire'}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              className="group relative overflow-hidden rounded-[2rem] bg-[#111113] p-8 sm:p-10 min-h-[16rem] sm:min-h-[19rem] flex flex-col justify-between transition-colors hover:bg-[#17171a]"
            >
              <div
                className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#F70D1A] blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />
              <p className="relative text-sm font-semibold uppercase tracking-widest text-[#ff5a6e]">{o.label}</p>
              <div className="relative">
                <h3 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">{o.name}</h3>
                <p className="mt-3 text-base sm:text-lg text-gray-400 leading-snug max-w-sm">{o.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-base font-medium text-[#ff5a6e] group-hover:text-white transition-colors">
                  {o.landing ? `Découvrir ${o.name}` : 'Demander un audit'} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Motion.a>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 flex flex-col items-center gap-4">
          <a
            href="/contact/?objet=audit#formulaire"
            className="inline-flex items-center gap-2 rounded-full bg-[#F70D1A] hover:bg-[#ff1f3f] text-white font-semibold px-8 py-3.5 text-base sm:text-lg transition-colors"
          >
            <BrandIcon className="h-5 w-auto" /> Réserver mon audit gratuit
          </a>
          <p className="text-sm text-gray-500">Sans engagement. Réponse sous 24 h ouvrées.</p>
        </div>
      </div>
    </section>
  );
}
