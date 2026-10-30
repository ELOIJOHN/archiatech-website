import React from 'react';
import { ArrowRight } from 'lucide-react';

// Enveloppe commune des pages secondaires (décalage sous la barre de navigation fixe).
export default function PageShell({ eyebrow, title, intro, children, wide = false }) {
  return (
    <section className="bg-white pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className={`${wide ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-[#F70D1A]">Accueil</a>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{eyebrow || title}</span>
        </nav>
        {eyebrow && (
          <span className="text-[#F70D1A] font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
          {title}
        </h1>
        {intro && <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaButton({ href = '/contact/', children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 bg-[#F70D1A] hover:bg-red-700 text-white font-semibold
                 px-6 py-3 rounded-lg transition-colors touch-target"
    >
      {children} <ArrowRight className="w-4 h-4" />
    </a>
  );
}
