import React from 'react';
import { Check } from 'lucide-react';
import PageShell, { CtaButton } from './PageShell';
import { servicePages } from '../data/site-pages';

export default function ServicePage({ slug }) {
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) return null;
  const others = servicePages.filter((s) => s.slug !== slug);

  return (
    <PageShell eyebrow="Nos services" title={service.name} intro={service.tagline}>
      <p className="text-gray-700 leading-relaxed mb-10">{service.intro}</p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Ce que nous faisons</h2>
      <ul className="space-y-3 mb-10">
        {service.offers.map((offer) => (
          <li key={offer} className="flex gap-3 text-gray-700">
            <Check className="w-5 h-5 text-[#F70D1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{offer}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Pour qui</h2>
      <p className="text-gray-700 leading-relaxed mb-10">{service.audience}</p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Comment nous travaillons</h2>
      <ol className="grid sm:grid-cols-3 gap-4 mb-12">
        {service.steps.map(([title, text], i) => (
          <li key={title} className="rounded-xl border border-gray-200 p-5">
            <span className="text-[#F70D1A] font-bold text-sm">Étape {i + 1}</span>
            <h3 className="font-semibold text-gray-900 mt-1 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Un projet en tête ?</h2>
        <p className="text-gray-600 mb-5">Décrivez-nous votre besoin, nous revenons vers vous rapidement.</p>
        <CtaButton>Nous contacter</CtaButton>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-3">Nos autres services</h2>
      <ul className="space-y-2">
        {others.map((s) => (
          <li key={s.slug}>
            <a href={`/services/${s.slug}/`} className="text-[#F70D1A] hover:underline font-medium">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
