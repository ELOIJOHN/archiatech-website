import React from 'react';
import { Check } from 'lucide-react';
import PageShell, { CtaButton } from './PageShell';
import { localPages } from '../data/local-pages';
import { servicePages } from '../data/site-pages';
import { offers } from '../data/offers';

// Page de proximité (Monaco, Menton, Alpes-Maritimes).
export default function LocalPage({ slug }) {
  const p = localPages.find((l) => l.slug === slug);
  if (!p) return null;
  const others = localPages.filter((l) => l.slug !== slug);

  return (
    <PageShell eyebrow={p.zone} title={p.h1} intro={p.intro}>
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <CtaButton href="/contact/?objet=audit#formulaire">Réserver mon audit gratuit</CtaButton>
        <span className="self-center text-sm text-gray-500">Sans engagement · projet sur devis</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi ArchiAtech</h2>
      <ul className="space-y-3 mb-10">
        {p.why.map((w) => (
          <li key={w} className="flex gap-3 text-gray-700">
            <Check className="w-5 h-5 text-[#F70D1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{w}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos services</h2>
      <ul className="space-y-2 mb-10">
        {servicePages.map((s) => (
          <li key={s.slug}>
            <a href={`/services/${s.slug}/`} className="text-[#F70D1A] hover:underline font-medium">{s.name}</a>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos offres</h2>
      <ul className="space-y-2 mb-12">
        {offers.map((o) => (
          <li key={o.slug} className="text-gray-700">
            <a href={`/offres/${o.slug}/`} className="font-medium text-[#F70D1A] hover:underline">{o.name}</a> : {o.tagline}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold text-gray-900 mb-3">Autres zones</h2>
      <ul className="space-y-2">
        {others.map((o) => (
          <li key={o.slug}>
            <a href={`/${o.slug}/`} className="text-[#F70D1A] hover:underline font-medium">{o.zone}</a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
