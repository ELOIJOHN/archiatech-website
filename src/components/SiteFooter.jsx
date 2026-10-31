import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { company } from '../data/company';
import { servicePages } from '../data/site-pages';

const linkClass = 'text-gray-300 hover:text-white transition-colors duration-200';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <a href="/" aria-label="ArchiAtech Digital Solutions - accueil">
              <img
                src="/images/logo-horizontal-white.png"
                alt="ArchiAtech Digital Solutions"
                width="889"
                height="160"
                loading="lazy"
                className="h-10 w-auto mb-5"
              />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              IA souveraine, automatisation et support IT pour les PME et startups.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-4">Services</h2>
            <ul className="space-y-2.5 text-sm">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}/`} className={linkClass}>{s.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-4">ArchiAtech</h2>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/a-propos/" className={linkClass}>À propos</a></li>
              <li><a href="/blog/" className={linkClass}>Blog</a></li>
              <li><a href="/guide/" className={linkClass}>Guide gratuit</a></li>
              <li><a href="/en/" className={linkClass} hrefLang="en" lang="en">English</a></li>
              <li><a href="/contact/" className={linkClass}>Contact</a></li>
              <li><a href="/#videos" className={linkClass}>Vidéos</a></li>
              <li>
                <a href={company.youtube} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Chaîne YouTube
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-4">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className={linkClass}>{company.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                <a href={company.phoneHref} className={linkClass}>{company.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-300">{company.area}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs sm:text-sm text-gray-400">
          <p>© {year} {company.name}. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a href="/mentions-legales/" className="hover:text-white">Mentions légales</a></li>
            <li><a href="/confidentialite/" className="hover:text-white">Confidentialité</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
