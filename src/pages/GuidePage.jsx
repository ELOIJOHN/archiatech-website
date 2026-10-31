import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PageShell from './PageShell';
import BrandIcon from '../components/BrandIcon';
import { GUIDE_WEBHOOK_URL } from '../config/contact';

const tasks = [
  'Accusé de réception des demandes',
  'Relance des devis sans réponse',
  'Relance des factures impayées',
  'Saisie des contacts sans recopie',
  'Classement des factures reçues par e-mail',
  'Rapport hebdomadaire d’activité',
  'Prise de rendez-vous et rappels',
  'Accueil d’un nouveau collaborateur',
  'Alertes en cas d’anomalie',
  'Réponses aux questions fréquentes',
];

// Page du guide gratuit « 10 tâches à automatiser » : formulaire avec consentement explicite.
export default function GuidePage() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam (invisible)
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setStatus(null);
    try {
      const body = new URLSearchParams({ email, website });
      if (consent) body.set('consent', 'on');
      if (newsletter) body.set('newsletter', 'on');
      const response = await fetch(GUIDE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error('refus');
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell
      eyebrow="Guide gratuit"
      title="10 tâches à automatiser dans votre entreprise"
      intro="Une checklist courte pour repérer, chez vous, les tâches qui font perdre du temps et qui se prêtent à l’automatisation. Gratuite, envoyée par e-mail."
    >
      <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
        {tasks.map((t, i) => (
          <li key={t} className="flex gap-3 text-gray-700">
            <span className="text-[#F70D1A] font-bold w-6 flex-shrink-0">{i + 1}.</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>

      <form onSubmit={submit} className="rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8 mb-12" noValidate>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recevoir le guide</h2>
        <label htmlFor="guide-email" className="block text-sm font-medium text-gray-700 mb-1">Votre adresse e-mail</label>
        <input
          id="guide-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#F70D1A]"
          placeholder="vous@entreprise.com"
        />
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <label className="mt-4 flex gap-3 text-sm text-gray-700 leading-snug">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 flex-shrink-0 accent-[#F70D1A]" />
          <span>
            J’accepte que mon adresse soit utilisée pour m’envoyer ce guide. Aucune revente, désinscription à tout
            moment. <a href="/confidentialite/" className="underline text-[#F70D1A]">Politique de confidentialité</a>.
          </span>
        </label>
        <label className="mt-3 flex gap-3 text-sm text-gray-700 leading-snug">
          <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="mt-1 h-4 w-4 flex-shrink-0 accent-[#F70D1A]" />
          <span>Je souhaite aussi recevoir la newsletter mensuelle (facultatif).</span>
        </label>

        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F70D1A] hover:bg-[#ff1f3f] disabled:opacity-60 text-white font-semibold px-8 py-3.5 text-base transition-colors"
        >
          <BrandIcon className="h-5 w-auto" /> {busy ? 'Envoi…' : 'Recevoir le guide'}
        </button>

        <div role="status" aria-live="polite" className="mt-4 text-sm">
          {status === 'ok' && (
            <p className="flex gap-2 text-green-700"><Check className="w-5 h-5 flex-shrink-0" aria-hidden="true" /> Guide envoyé : vérifiez votre boîte de réception (et les courriers indésirables).</p>
          )}
          {status === 'error' && (
            <p className="text-red-700">Envoi impossible. Vérifiez l’adresse e-mail et la case de consentement, puis réessayez.</p>
          )}
        </div>
      </form>

      <p className="text-gray-700">
        Envie d’aller plus loin ? <a href="/contact/?objet=audit#formulaire" className="text-[#F70D1A] font-medium hover:underline">Réservez un audit gratuit</a> :
        nous regardons ensemble lesquelles de ces tâches valent le coup chez vous.
      </p>
    </PageShell>
  );
}
