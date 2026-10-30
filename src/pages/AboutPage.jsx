import React from 'react';
import PageShell, { CtaButton } from './PageShell';
import { company } from '../data/company';
import { servicePages } from '../data/site-pages';

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="À propos"
      title="À propos d’ArchiAtech"
      intro="ArchiAtech Digital Solutions accompagne les PME et les startups dans l'adoption de l'IA, l'automatisation de leurs processus et le support de leur informatique."
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Notre approche</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Nous partons de vos besoins métiers, pas de la technologie. Chaque projet commence par comprendre ce
        qui vous coûte du temps ou de l’énergie, puis nous proposons la solution la plus simple qui règle le problème.
      </p>
      <p className="text-gray-700 leading-relaxed mb-10">
        Nous accordons une attention particulière à la maîtrise des données : où elles sont hébergées, qui y a
        accès, et comment elles sont utilisées par les outils d’IA que nous mettons en place.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">Où nous intervenons</h2>
      <p className="text-gray-700 leading-relaxed mb-10">
        {company.area}. Une partie des missions peut se faire à distance.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">Nos services</h2>
      <ul className="space-y-2 mb-10">
        {servicePages.map((s) => (
          <li key={s.slug}>
            <a href={`/services/${s.slug}/`} className="text-[#F70D1A] hover:underline font-medium">
              {s.name}
            </a>
          </li>
        ))}
      </ul>

      <p className="text-gray-700 mb-6">
        Retrouvez aussi nos vidéos sur{' '}
        <a href={company.youtube} target="_blank" rel="noopener noreferrer" className="text-[#F70D1A] hover:underline">
          la chaîne YouTube ArchiAtech Media
        </a>
        .
      </p>
      <CtaButton>Discutons de votre projet</CtaButton>
    </PageShell>
  );
}
