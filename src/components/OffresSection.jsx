import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { offers } from '../data/offers';

// Section « Offres » de l'accueil. Aucun prix : chaque projet est chiffré sur devis après un audit gratuit.
export default function OffresSection() {
  return (
    <section id="offres" className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#E60023] font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Nos offres
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Quatre offres, un point de départ : l&apos;audit gratuit
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Chaque projet est chiffré sur devis, après un échange gratuit pour comprendre votre besoin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {offers.map((o) => (
            <article
              key={o.slug}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-[#E60023]/40 transition-all"
            >
              <span className="self-start text-xs font-semibold uppercase tracking-wider text-[#E60023] bg-red-50 rounded-full px-3 py-1 mb-4">
                {o.label}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{o.name}</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">{o.tagline}</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                {o.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <Check className="w-4 h-4 text-[#E60023] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-3">Sur devis</p>
                {o.landing ? (
                  <a
                    href={`/offres/${o.slug}/`}
                    className="inline-flex items-center gap-2 text-[#E60023] hover:text-red-700 font-semibold"
                  >
                    Découvrir {o.name} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <a
                    href="/contact/"
                    className="inline-flex items-center gap-2 text-[#E60023] hover:text-red-700 font-semibold"
                  >
                    Demander un audit gratuit <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Réserver mon audit gratuit <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-gray-500 mt-3">Sans engagement. Réponse sous 24 h ouvrées.</p>
        </div>
      </div>
    </section>
  );
}
