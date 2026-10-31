import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import PageShell, { CtaButton } from './PageShell';
import BrandIcon from '../components/BrandIcon';
import { enPages } from '../data/en-pages';
import { BOOKING_URL } from '../config/booking';
import { company } from '../data/company';

// Pages clés en anglais (accueil, services, contact). Les pages offres restent en français.
export default function EnglishPage({ slug }) {
  const p = enPages.find((e) => e.slug === slug);
  if (!p) return null;

  return (
    <PageShell eyebrow={p.eyebrow} title={p.h1} intro={p.intro}>
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        {BOOKING_URL && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F70D1A] hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <BrandIcon className="h-5 w-auto" /> Pick a time for your free audit
          </a>
        )}
        <a
          href={`mailto:${company.email}?subject=Free%20audit%20request`}
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:border-[#F70D1A] transition-colors"
        >
          <Mail className="w-4 h-4" aria-hidden="true" /> {company.email}
        </a>
      </div>

      {(p.sections || []).map((s) => (
        <section key={s.title} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{s.title}</h2>
          {s.text && <p className="text-gray-700 leading-relaxed">{s.text}</p>}
          {s.items && (
            <ul className="grid sm:grid-cols-2 gap-4">
              {s.items.map(([name, text, href]) => (
                <li key={name} className="rounded-xl border border-gray-200 p-5">
                  <a href={href} className="font-semibold text-gray-900 hover:text-[#F70D1A] inline-flex items-center gap-1">
                    {name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          )}
          {s.note && <p className="mt-3 text-sm text-gray-500">{s.note}</p>}
        </section>
      ))}

      {p.faq && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          <dl className="space-y-5">
            {p.faq.map(([q, a]) => (
              <div key={q}>
                <dt className="font-semibold text-gray-900">{q}</dt>
                <dd className="text-gray-600 leading-relaxed mt-1">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {p.contact && (
        <p className="text-gray-700 mb-12">
          Prefer to write a detailed message? Use our{' '}
          <a href="/contact/?objet=audit#formulaire" className="text-[#F70D1A] font-medium hover:underline">contact form</a>{' '}
          (the form is in French, but we answer in English).
        </p>
      )}

      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Start with a free audit</h2>
        <p className="text-gray-600 mb-5">30 minutes, no commitment. If a project follows, it is quoted afterwards.</p>
        <CtaButton href={BOOKING_URL || '/contact/?objet=audit#formulaire'}>Book my free audit</CtaButton>
      </div>

      <p className="mt-10 text-sm text-gray-500">
        <a href={p.fr} className="hover:text-[#F70D1A]">Version française</a>
      </p>
    </PageShell>
  );
}
