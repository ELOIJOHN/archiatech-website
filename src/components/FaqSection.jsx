import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import BrandIcon from './BrandIcon';
import { homeFaq } from '../data/faq';

// FAQ de l'accueil : questions repliables (éléments <details>, accessibles au clavier, sans script).
export default function FaqSection() {
  return (
    <section id="faq" className="bg-black py-20 sm:py-28 md:py-36 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-sm sm:text-base font-semibold tracking-wide text-[#ff5a6e]">Questions fréquentes</p>
          <h2 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] text-white">
            Avant de
            <br />
            <span className="text-gray-500">nous écrire.</span>
          </h2>
        </Motion.div>

        <div className="space-y-3">
          {homeFaq.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-[#111113] open:bg-[#17171a] transition-colors">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-medium text-white [&::-webkit-details-marker]:hidden">
                {q}
                <Plus className="h-5 w-5 flex-shrink-0 text-[#ff5a6e] transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="px-6 pb-6 text-base sm:text-lg text-gray-400 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact/?objet=audit#formulaire"
            className="inline-flex items-center gap-2 rounded-full bg-[#F70D1A] hover:bg-[#ff1f3f] text-white font-semibold px-8 py-3.5 text-base sm:text-lg transition-colors"
          >
            <BrandIcon className="h-5 w-auto" /> Une autre question ? Écrivez-nous
          </a>
          <p className="mt-6 text-base text-gray-400">
            Pas encore prêt ?{' '}
            <a href="/guide/" className="text-[#ff5a6e] hover:text-white font-medium underline-offset-4 hover:underline">
              Recevez gratuitement notre guide : 10 tâches à automatiser
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
