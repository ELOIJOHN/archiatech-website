import React from 'react';
import { ArrowRight, Monitor, Zap, Cpu, Check, MapPin } from 'lucide-react';
import ContactSection from './ContactSectionSimple';
import ArchiAgent from './ArchiAgent';
import './HomePreview.css';

const offers = [
  { id: 'support-informatique', number: '01', Icon: Monitor, title: 'Support informatique', summary: 'Des outils qui fonctionnent. Des équipes accompagnées.', description: 'Gardez la maîtrise de votre informatique au quotidien : postes de travail, messagerie et assistance aux utilisateurs.', items: ['Installation et déploiement de postes Windows et Mac', 'Configuration de Microsoft 365 et de la messagerie', 'Assistance et accompagnement des utilisateurs'], example: 'Un nouveau collaborateur arrive ? Préparons son poste, ses accès et ses outils de travail.' },
  { id: 'automatisation', number: '02', Icon: Zap, title: 'Automatisation', summary: 'Moins de tâches répétitives. Plus de temps pour votre métier.', description: 'Reliez vos outils et simplifiez vos processus pour limiter les doubles saisies et les oublis.', items: ['Relances et notifications selon vos règles', 'Suivi de dossiers et centralisation des informations', 'Connexions entre vos applications et services'], example: 'Vous suivez vos dossiers dans plusieurs outils ? Étudions un circuit de suivi et de relance adapté.' },
  { id: 'intelligence-artificielle', number: '03', Icon: Cpu, title: 'Intelligence artificielle', summary: 'Une IA utile, pour un besoin précis.', description: 'Identifiez les usages pertinents et intégrez une solution adaptée à vos données, à vos équipes et à votre budget.', items: ['Recherche dans votre documentation', 'Assistants internes pour vos équipes', 'Aide à la rédaction et à la synthèse'], example: 'Votre équipe cherche souvent les mêmes informations ? Explorons un assistant documentaire avec des accès définis.' },
];

export default function HomePreview() {
  return (
    <div className="home-preview">
      <a className="hp-skip" href="#contenu">Aller au contenu</a>
      <header className="hp-header">
        <a className="hp-brand" href="#contenu" aria-label="ArchIAtech, accueil">Arch<span>IA</span>tech<span className="hp-dot">.</span></a>
        <nav aria-label="Navigation principale">
          <a href="#services">Nos solutions</a><a href="#accompagnement">Notre approche</a><a className="hp-nav-contact" href="#contact">Parlons de votre besoin <ArrowRight size={16} aria-hidden="true" /></a>
        </nav>
      </header>
      <main id="contenu">
        <section className="hp-hero" aria-labelledby="hp-title">
          <div>
            <p className="hp-eyebrow"><MapPin size={14} aria-hidden="true" /> Monaco & Alpes-Maritimes</p>
            <h1 id="hp-title">Simplifiez votre informatique.<br /><span>Automatisez vos tâches.</span></h1>
            <p className="hp-intro">ArchIAtech accompagne les PME dans le support informatique, l’automatisation et l’intégration de solutions IA adaptées à leurs besoins.</p>
            <div className="hp-actions"><a className="hp-button" href="#contact">Parlons de votre besoin <ArrowRight size={18} aria-hidden="true" /></a><a className="hp-secondary" href="#services">Découvrir nos solutions <ArrowRight size={18} aria-hidden="true" /></a></div>
            <p className="hp-reassurance">Un premier échange sans engagement pour comprendre votre projet.</p>
          </div>
          <aside className="hp-note" aria-label="Notre accompagnement">
            <span className="hp-note-label">VOTRE QUOTIDIEN, SIMPLIFIÉ</span>
            <h2>Un interlocuteur.<br />Trois expertises.</h2>
            {offers.map(({ id, Icon, title }) => <a key={id} href={`#${id}`}>{React.createElement(Icon, { size: 23, 'aria-hidden': true })}<span>{title}</span><ArrowRight size={17} aria-hidden="true" /></a>)}
            <p>Du besoin concret à la prise en main par vos équipes.</p>
          </aside>
        </section>
        <section className="hp-section" id="services" aria-labelledby="hp-services-title">
          <p className="hp-eyebrow">NOS SOLUTIONS</p>
          <div className="hp-section-heading"><h2 id="hp-services-title">Partons de vos besoins.</h2><p>Trois expertises complémentaires pour avancer à votre rythme.</p></div>
          <div className="hp-offers">{offers.map(({ id, number, Icon, title, summary, description }) => <article className="hp-card" key={id}><div className="hp-card-top">{React.createElement(Icon, { size: 25, 'aria-hidden': true })}<span>{number}</span></div><h3>{title}</h3><p className="hp-summary">{summary}</p><p>{description}</p><a href={`#${id}`}>Explorer cette offre <ArrowRight size={17} aria-hidden="true" /><span className="hp-sr"> : {title}</span></a></article>)}</div>
        </section>
        <section className="hp-about" id="accompagnement" aria-labelledby="hp-about-title"><div><p className="hp-eyebrow">UN ACCOMPAGNEMENT DE PROXIMITÉ</p><h2 id="hp-about-title">La technique au service<br />de votre quotidien.</h2><p>Je suis John Eloi, votre interlocuteur chez ArchIAtech. Mon expérience du support informatique et de l’accompagnement des utilisateurs guide mon approche : comprendre les difficultés du terrain et proposer des outils utiles.</p><p>Microsoft 365, Windows, macOS, messagerie et outils d’automatisation : nous choisissons les solutions selon votre environnement et vos contraintes.</p></div><ol className="hp-steps">{[['Échanger', 'Comprendre votre besoin, vos outils et vos priorités.'], ['Définir', 'Convenir du périmètre, du budget et des objectifs.'], ['Mettre en place', 'Configurer et vérifier la solution avec vous.'], ['Accompagner', 'Faciliter la prise en main et ajuster selon les retours.']].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
        <section className="hp-section hp-details" aria-labelledby="hp-details-title"><p className="hp-eyebrow">CONCRÈTEMENT</p><h2 id="hp-details-title">Que pouvons-nous simplifier ensemble ?</h2>{offers.map(({ id, title, items, example }) => <article id={id} key={id}><div><h3>{title}</h3><ul>{items.map(item => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul></div><div><p className="hp-example-label">EXEMPLE DE BESOIN</p><p>{example}</p><a href="#contact">Discutons de votre projet <ArrowRight size={17} aria-hidden="true" /></a></div></article>)}<p className="hp-data-note">Pour les projets IA, les modalités d’hébergement, l’accès aux données et les limites de la solution sont définis avant la mise en place.</p></section>
        <ContactSection heading="Un besoin informatique ou un projet à simplifier ?" introduction="Un premier échange sans engagement pour faire le point sur vos besoins en support IT, automatisation ou IA." />
        <div className="hp-direct"><a href="mailto:contact@archiatech.com">contact@archiatech.com</a><span>Monaco · Roquebrune-Cap-Martin · Alpes-Maritimes</span></div>
      </main>
      <footer className="hp-footer"><a className="hp-brand" href="#contenu">Arch<span>IA</span>tech.</a><p>Informatique · Automatisation · Intelligence artificielle</p><a href="?accueil=original">Comparer avec l’accueil précédent <ArrowRight size={15} aria-hidden="true" /></a></footer>
      <ArchiAgent />
    </div>
  );
}
