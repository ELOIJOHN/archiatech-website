import React from 'react';
import { ArrowRight, Check, Mail, Workflow, FileText, BellRing, Cpu, ShieldCheck, LifeBuoy } from 'lucide-react';

const repères = ['Audit gratuit', 'Retour sous 24 h ouvrées', 'Données et hébergement maîtrisés'];

const metiers = [
  {
    icon: Workflow,
    titre: 'Automatisation',
    texte: 'Relances, saisies, rapports : vos outils travaillent ensemble.',
    href: '/services/automatisation-n8n/',
  },
  {
    icon: ShieldCheck,
    titre: 'IA souveraine',
    texte: "Des assistants IA qui respectent vos données et le RGPD.",
    href: '/services/ia-souveraine/',
  },
  {
    icon: LifeBuoy,
    titre: 'Support IT',
    texte: 'Postes, Microsoft 365, réseau : un interlocuteur unique.',
    href: '/services/support-it/',
  },
];

const etapes = [
  { icon: Mail, label: 'Demande reçue par e-mail' },
  { icon: Cpu, label: 'Automatisation n8n' },
  { icon: FileText, label: 'Fiche créée dans votre outil' },
  { icon: BellRing, label: 'Relance envoyée au bon moment' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-red-50/40
                 px-4 sm:px-8 lg:px-16 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <p className="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#E60023] shadow-sm">
            Conseil IA, automatisation et support IT · Monaco et France
          </p>

          <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
            Automatisez vos tâches répétitives.{' '}
            <span className="text-[#E60023]">Mettez l&apos;IA au travail</span>, sans perdre le contrôle de vos données.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-gray-600 leading-relaxed">
            ArchiAtech accompagne les PME et les startups : audit, mise en place et suivi, sur devis.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <a
              href="/contact/?objet=audit#formulaire"
              className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-base sm:text-lg shadow-lg transition-colors"
            >
              Audit gratuit <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="#offres" className="text-gray-700 hover:text-[#E60023] font-semibold underline underline-offset-4">
              Voir nos offres
            </a>
          </div>

          <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 text-sm sm:text-base text-gray-700">
            {repères.map((r) => (
              <li key={r} className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Exemple d'automatisation : schéma illustratif */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm">
          <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500">
            Exemple d&apos;automatisation : du message reçu à la relance
          </p>
          <ol className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 items-stretch">
            {etapes.map((e, i) => (
              <li key={e.label} className="relative flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#E60023]">
                  <e.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <span className="text-sm sm:text-base font-medium text-gray-800">{e.label}</span>
                {i < etapes.length - 1 && (
                  <ArrowRight
                    className="hidden sm:block absolute top-3 -right-3 w-5 h-5 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs sm:text-sm text-gray-500">
            Schéma illustratif : chaque automatisation est conçue après un audit de vos propres outils.
          </p>
        </div>

        {/* Ce que nous faisons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {metiers.map((m) => (
            <a
              key={m.titre}
              href={m.href}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-[#E60023] hover:shadow-md transition"
            >
              <m.icon className="w-6 h-6 text-[#E60023]" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold text-gray-900">{m.titre}</h2>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{m.texte}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#E60023]">
                En savoir plus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
