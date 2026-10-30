import React from 'react';
import PageShell from './PageShell';
import { company } from '../data/company';

const H2 = ({ children }) => <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">{children}</h2>;
const P = ({ children }) => <p className="text-gray-700 leading-relaxed mb-3">{children}</p>;
const Mail = () => (
  <a href={`mailto:${company.email}`} className="text-[#F70D1A] hover:underline">{company.email}</a>
);

export function MentionsLegales() {
  return (
    <PageShell eyebrow="Mentions légales" title="Mentions légales">
      <P>Dernière mise à jour : {company.lastLegalUpdate}.</P>

      <H2>Éditeur du site</H2>
      <P>
        Le site www.archiatech.com est édité par <strong>{company.name}</strong>, exploitée par{' '}
        {company.publicationDirector}
        {company.legalForm ? `, ${company.legalForm.toLowerCase()}` : ''}.
      </P>
      <ul className="text-gray-700 leading-relaxed space-y-1 mb-3">
        {company.legalForm && <li>Forme juridique : {company.legalForm}</li>}
        <li>SIRET : {company.siret}</li>
        {company.address && <li>Adresse : {company.address}</li>}
        <li>Email : <Mail /></li>
        <li>Téléphone : <a href={company.phoneHref} className="text-[#F70D1A] hover:underline">{company.phone}</a></li>
        <li>Directeur de la publication : {company.publicationDirector}</li>
      </ul>

      <H2>Hébergement</H2>
      <P>
        Le site est hébergé par {company.host.name}, {company.host.address} (
        <a href={company.host.url} target="_blank" rel="noopener noreferrer" className="text-[#F70D1A] hover:underline">
          {company.host.url.replace('https://', '')}
        </a>
        ). Le nom de domaine et le réseau de distribution sont gérés par {company.cdn.name}, {company.cdn.address}.
      </P>

      <H2>Propriété intellectuelle</H2>
      <P>
        L’ensemble des contenus du site (textes, logos, images, vidéos produites par ArchiAtech) est protégé par le
        droit de la propriété intellectuelle. Toute reproduction sans autorisation préalable est interdite.
        Les vidéos YouTube intégrées restent la propriété de leurs auteurs respectifs.
      </P>

      <H2>Responsabilité</H2>
      <P>
        Nous nous efforçons de fournir des informations exactes, mais nous ne pouvons garantir qu’elles soient
        exhaustives ou à jour en permanence. Le site peut contenir des liens vers des sites tiers, dont nous ne
        maîtrisons pas le contenu.
      </P>

      <H2>Données personnelles</H2>
      <P>
        Le traitement des données personnelles est détaillé dans notre{' '}
        <a href="/confidentialite/" className="text-[#F70D1A] hover:underline">politique de confidentialité</a>.
      </P>
    </PageShell>
  );
}

export function Confidentialite() {
  return (
    <PageShell eyebrow="Confidentialité" title="Politique de confidentialité">
      <P>Dernière mise à jour : {company.lastLegalUpdate}.</P>

      <H2>Responsable du traitement</H2>
      <P>
        {company.name} — SIRET {company.siret} — <Mail />.
      </P>

      <H2>Données collectées et finalités</H2>
      <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2 mb-3">
        <li>
          <strong>Formulaire de contact</strong> : nom, adresse email et message que vous saisissez, utilisés
          uniquement pour répondre à votre demande.
        </li>
        <li>
          <strong>Assistant Archi Agent</strong> : les messages que vous saisissez servent à vous répondre sur la page.
        </li>
        <li>
          <strong>Vidéos YouTube intégrées</strong> : la lecture d’une vidéo charge un lecteur fourni par YouTube
          (Google), qui peut déposer des cookies et collecter des données de navigation selon sa propre politique de
          confidentialité.
        </li>
      </ul>

      <H2>Base légale et durée de conservation</H2>
      <P>
        Le traitement de votre demande de contact repose sur notre intérêt légitime à répondre aux sollicitations
        professionnelles. Les échanges sont conservés le temps nécessaire au traitement de la demande, puis au maximum
        3 ans après le dernier contact.
      </P>

      <H2>Destinataires et hébergement</H2>
      <P>
        Vos données ne sont ni vendues ni cédées. Elles peuvent être traitées par nos prestataires techniques
        ({company.host.name} pour l’hébergement du site, {company.cdn.name} pour le réseau de distribution) et, pour
        les vidéos, par YouTube/Google. Certains de ces prestataires sont situés hors de l’Union européenne.
      </P>

      <H2>Vos droits</H2>
      <P>
        Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et de
        portabilité de vos données. Pour les exercer, écrivez à <Mail />. Vous pouvez aussi introduire une réclamation
        auprès de la CNIL (www.cnil.fr).
      </P>
    </PageShell>
  );
}
