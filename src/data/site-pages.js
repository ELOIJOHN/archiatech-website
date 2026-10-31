// Définition de toutes les pages du site.
// Fichier en JavaScript pur : il est lu à la fois par React (affichage) et par
// scripts/prerender.mjs (génération du HTML de chaque page + sitemap).
import { blogPosts } from './blog-posts.js';
import { autoflowLanding } from './offers.js';

export const SITE_URL = 'https://www.archiatech.com';

export const servicePages = [
  {
    slug: 'ia-souveraine',
    name: 'Conseil & intégration IA souveraine',
    tagline: "Mettre l'IA au travail dans votre entreprise, sans perdre le contrôle de vos données.",
    intro:
      "Nous vous aidons à choisir, intégrer et encadrer des solutions d'intelligence artificielle adaptées à vos processus métiers, avec une attention particulière portée à l'hébergement des données et à la conformité.",
    offers: [
      "Cadrage des cas d'usage : où l'IA fait gagner du temps, où elle n'en fait pas gagner",
      'Assistants internes qui s’appuient sur vos propres documents',
      'Choix de modèles et d’hébergement (cloud européen ou hébergement local)',
      'Intégration aux outils existants (Microsoft 365, messagerie, CRM, outils métiers)',
      'Règles d’usage, sensibilisation des équipes, points de vigilance RGPD',
      'Sécurité des données : accès limités, secrets protégés, sauvegardes et journalisation des automatisations',
      'Sobriété : un modèle adapté à chaque tâche plutôt que toujours le plus gros',
    ],
    audience:
      "PME, startups et indépendants qui veulent utiliser l'IA de façon concrète, sans exposer leurs données sensibles.",
    steps: [
      ['Échange', 'Nous comprenons votre activité et identifions les cas d’usage les plus utiles.'],
      ['Prototype', 'Nous testons une première version sur un périmètre limité pour valider l’intérêt.'],
      ['Déploiement', 'Nous mettons en production, formons vos équipes et documentons l’ensemble.'],
    ],
    metaTitle: 'Conseil et intégration IA souveraine | ArchiAtech',
    metaDescription:
      "Conseil et intégration d'IA souveraine pour PME à Monaco, Nice et en France : cas d'usage, assistants internes, hébergement maîtrisé des données.",
  },
  {
    slug: 'automatisation-n8n',
    name: 'Automatisation de workflows (n8n, RPA, API)',
    tagline: 'Supprimer les tâches répétitives et connecter vos outils entre eux.',
    intro:
      "Nous concevons des automatisations fiables qui relient vos applications et exécutent à votre place les tâches répétitives : saisies, relances, synchronisations, rapports.",
    offers: [
      'Audit des tâches répétitives et priorisation par gain de temps',
      'Workflows n8n, Zapier ou Make reliant vos applications',
      'Connecteurs et appels d’API sur mesure',
      'Automatisation de processus (RPA) quand aucune API n’est disponible',
      'Supervision, gestion des erreurs et documentation des workflows livrés',
    ],
    audience:
      "Équipes qui perdent du temps en copier-coller entre outils, en relances manuelles ou en reporting à la main.",
    steps: [
      ['Audit', 'Nous listons les tâches répétitives et mesurons le temps qu’elles vous coûtent.'],
      ['Construction', 'Nous construisons et testons les workflows sur des données réelles.'],
      ['Mise en service', 'Nous livrons avec supervision, alertes en cas d’erreur et documentation.'],
    ],
    metaTitle: 'Automatisation de workflows n8n, RPA et API | ArchiAtech',
    metaDescription:
      "Automatisation de workflows avec n8n, RPA et API pour PME à Monaco, Nice et en France : supprimez les tâches répétitives et connectez vos outils.",
  },
  {
    slug: 'support-it',
    name: 'Support & déploiement IT',
    tagline: 'Des postes et des outils qui fonctionnent, et un interlocuteur quand ça coince.',
    intro:
      "Nous installons, configurons et déployons vos postes de travail et vos outils, puis assurons le support de vos utilisateurs au quotidien.",
    offers: [
      'Installation, configuration et déploiement de postes de travail',
      'Environnements Microsoft 365 : comptes, messagerie, collaboration',
      'Inventaire du parc et gestion des correctifs',
      'Support aux utilisateurs, sur site ou à distance',
      'Bonnes pratiques de sécurité de base et accompagnement des équipes',
    ],
    audience:
      "Entreprises de Monaco et des Alpes-Maritimes qui n'ont pas de service informatique interne, ou qui veulent renforcer le leur.",
    steps: [
      ['État des lieux', 'Nous faisons le point sur votre parc, vos outils et vos besoins.'],
      ['Mise en place', 'Nous déployons et configurons selon un plan convenu à l’avance.'],
      ['Suivi', 'Nous restons disponibles pour le support et les évolutions.'],
    ],
    metaTitle: 'Support et déploiement IT à Monaco et Nice | ArchiAtech',
    metaDescription:
      "Support et déploiement IT pour entreprises à Monaco, Nice et dans les Alpes-Maritimes : postes de travail, Microsoft 365, assistance utilisateurs.",
  },
];

export const pages = [
  {
    path: '/',
    type: 'home',
    title: 'ArchiAtech - Solutions IA & Automatisation',
    description:
      "Transformez votre entreprise avec l'intelligence artificielle et l'automatisation. Solutions RPA, IA, et support IT professionnel.",
    h1: 'ArchiAtech Digital Solutions',
    summary:
      "Conseil et intégration d'IA souveraine, automatisation de workflows, solutions no-code et support IT pour PME et startups à Monaco, dans les Alpes-Maritimes et en France.",
    priority: '1.0',
  },
  ...servicePages.map((s) => ({
    path: `/services/${s.slug}/`,
    type: 'service',
    slug: s.slug,
    title: s.metaTitle,
    description: s.metaDescription,
    h1: s.name,
    summary: `${s.tagline} ${s.intro}`,
    priority: '0.8',
  })),
  {
    path: `/offres/${autoflowLanding.slug}/`,
    type: 'offer',
    slug: autoflowLanding.slug,
    title: autoflowLanding.metaTitle,
    description: autoflowLanding.metaDescription,
    h1: autoflowLanding.h1,
    summary: autoflowLanding.summary,
    priority: '0.8',
  },
  {
    path: '/blog/',
    type: 'blog',
    title: 'Blog IA, automatisation et IT pour PME | ArchiAtech',
    description:
      "Conseils pratiques sur l'IA souveraine, l'automatisation (n8n) et la sécurité informatique pour les PME de Monaco, Nice et de France.",
    h1: 'Le blog ArchiAtech',
    summary: "Conseils pratiques sur l'IA souveraine, l'automatisation et le support IT pour les PME.",
    priority: '0.7',
  },
  ...blogPosts.map((b) => ({
    path: `/blog/${b.slug}/`,
    type: 'article',
    slug: b.slug,
    title: b.metaTitle,
    description: b.description,
    h1: b.title,
    summary: b.description,
    priority: '0.6',
  })),
  {
    path: '/a-propos/',
    type: 'about',
    title: 'À propos | ArchiAtech Digital Solutions',
    description:
      "ArchiAtech Digital Solutions accompagne les PME et startups de Monaco et de la Côte d'Azur dans l'IA, l'automatisation et le support IT.",
    h1: 'À propos d’ArchiAtech',
    summary:
      "ArchiAtech Digital Solutions accompagne les PME et startups de Monaco, des Alpes-Maritimes et de France dans l'IA, l'automatisation et le support IT.",
    priority: '0.6',
  },
  {
    path: '/contact/',
    type: 'contact',
    title: 'Contact | ArchiAtech Digital Solutions',
    description:
      'Contactez ArchiAtech pour parler de votre projet IA, automatisation ou support IT. Réponse rapide, intervention à Monaco, Nice et en France.',
    h1: 'Contactez-nous',
    summary: 'Parlez-nous de votre projet IA, automatisation ou support IT.',
    priority: '0.7',
  },
  {
    path: '/mentions-legales/',
    type: 'legal',
    title: 'Mentions légales | ArchiAtech Digital Solutions',
    description: "Mentions légales du site archiatech.com : éditeur, hébergeur, propriété intellectuelle.",
    h1: 'Mentions légales',
    summary: "Informations légales sur l'éditeur et l'hébergeur du site archiatech.com.",
    priority: '0.2',
  },
  {
    path: '/confidentialite/',
    type: 'privacy',
    title: 'Politique de confidentialité | ArchiAtech Digital Solutions',
    description:
      "Politique de confidentialité du site archiatech.com : données collectées, finalités, durées de conservation et vos droits.",
    h1: 'Politique de confidentialité',
    summary: 'Comment ArchiAtech traite les données personnelles collectées via le site archiatech.com.',
    priority: '0.2',
  },
];

// Normalise un chemin d'URL : toujours une barre oblique finale.
export function normalizePath(p) {
  let path = (p || '/').split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path += '/';
  return path;
}

export function findPage(p) {
  const path = normalizePath(p);
  return pages.find((pg) => pg.path === path) || null;
}
