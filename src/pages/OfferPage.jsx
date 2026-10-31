import React from 'react';
import { Check, X } from 'lucide-react';
import PageShell, { CtaButton } from './PageShell';
import { offerLandings, offers } from '../data/offers';

// Page dédiée à l'offre AutoFlow. Pas de prix : devis après audit gratuit.
export default function OfferPage({ slug = 'autoflow' }) {
  const L = offerLandings.find((o) => o.slug === slug) || offerLandings[0];
  const others = offers.filter((o) => o.slug !== L.slug);

  return (
    <PageShell
      eyebrow={L.eyebrow}
      title={L.h1}
      intro={L.intro}
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <CtaButton href="/contact/?objet=audit#formulaire">Réserver mon audit gratuit</CtaButton>
        <span className="self-center text-sm text-gray-500">Sans engagement · projet sur devis</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Vous reconnaissez-vous ?</h2>
      <ul className="space-y-3 mb-10">
        {L.problems.map((p) => (
          <li key={p} className="flex gap-3 text-gray-700">
            <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Ce que vous obtenez</h2>
      <ul className="space-y-3 mb-10">
        {L.deliverables.map((d) => (
          <li key={d} className="flex gap-3 text-gray-700">
            <Check className="w-5 h-5 text-[#F70D1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Exemples concrets</h2>
      <ul className="grid sm:grid-cols-2 gap-4 mb-10">
        {L.examples.map((e) => (
          <li key={e} className="rounded-xl border border-gray-200 p-5 text-sm text-gray-700 leading-relaxed">
            {e}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Comment ça se passe</h2>
      <ol className="grid sm:grid-cols-2 gap-4 mb-12">
        {L.steps.map(([title, text], i) => (
          <li key={title} className="rounded-xl border border-gray-200 p-5">
            <span className="text-[#F70D1A] font-bold text-sm">Étape {i + 1}</span>
            <h3 className="font-semibold text-gray-900 mt-1 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
      <dl className="space-y-5 mb-12">
        {L.faq.map(([q, a]) => (
          <div key={q}>
            <dt className="font-semibold text-gray-900">{q}</dt>
            <dd className="text-gray-600 leading-relaxed mt-1">{a}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Commençons par l&apos;audit gratuit</h2>
        <p className="text-gray-600 mb-5">
          Décrivez-nous votre besoin : nous vous disons ce qui est réaliste, sans engagement.
        </p>
        <CtaButton href="/contact/?objet=audit#formulaire">Réserver mon audit gratuit</CtaButton>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-3">Nos autres offres</h2>
      <ul className="space-y-2">
        {others.map((o) => (
          <li key={o.slug} className="text-gray-700">
            {o.landing ? (
              <a href={`/offres/${o.slug}/`} className="font-medium text-[#F70D1A] hover:underline">{o.name}</a>
            ) : (
              <span className="font-medium">{o.name}</span>
            )}{' '}
            : {o.tagline}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
