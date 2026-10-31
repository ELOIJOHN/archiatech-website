// Les 4 offres commerciales ArchiAtech. Aucun prix n'est affiché : tout se fait « sur devis »,
// après un audit gratuit. Fichier en JavaScript pur (lu par React et par scripts/prerender.mjs).

export const offers = [
  {
    slug: 'autoflow',
    name: 'AutoFlow',
    label: 'Automatisation',
    tagline: 'Vos tâches répétitives, automatisées entre vos outils.',
    points: [
      'Workflows n8n reliés à vos applications',
      'Relances, saisies, synchronisations, rapports',
      'Alertes en cas d’erreur et documentation livrée',
    ],
    landing: true,
  },
  {
    slug: 'brainbot',
    name: 'BrainBot',
    label: 'Assistant IA',
    tagline: 'Un assistant IA qui répond à partir de vos propres documents.',
    points: [
      'Assistant interne ou pour vos clients',
      'Réponses fondées sur vos documents et procédures',
      'Hébergement adapté à la sensibilité de vos données',
    ],
    landing: true,
  },
  {
    slug: 'dashboard-pro',
    name: 'Dashboard Pro',
    label: 'Pilotage',
    tagline: 'Un tableau de bord clair pour suivre votre activité.',
    points: [
      'Vos chiffres clés réunis au même endroit',
      'Connecté à vos outils et fichiers existants',
      'Mise à jour automatique, lisible sans formation',
    ],
    landing: true,
  },
  {
    slug: 'techcare',
    name: 'TechCare',
    label: 'Support IT',
    tagline: 'Un suivi régulier de votre parc informatique et de vos outils.',
    points: [
      'Maintenance et suivi de vos postes et accès',
      'Un interlocuteur identifié en cas de problème',
      'Formule adaptée à la taille de votre équipe',
    ],
    landing: true,
  },
];

// Contenu de la page dédiée AutoFlow (/offres/autoflow/).
const autoflowLandingData = {
  slug: 'autoflow',
  metaTitle: 'AutoFlow : automatiser vos tâches répétitives | ArchiAtech',
  metaDescription:
    "AutoFlow : ArchiAtech automatise vos tâches répétitives avec n8n (relances, saisies, synchronisations, rapports). Audit gratuit, projet sur devis.",
  h1: 'AutoFlow : automatisez les tâches qui vous font perdre du temps',
  summary:
    "AutoFlow connecte vos outils et exécute à votre place les tâches répétitives. Audit gratuit, puis projet sur devis.",
  problems: [
    'Des données recopiées à la main d’un outil à l’autre',
    'Des relances clients ou fournisseurs oubliées',
    'Des rapports construits à la main chaque semaine',
    'Des demandes qui arrivent par mail et se perdent',
  ],
  deliverables: [
    'Un ou plusieurs workflows n8n reliés à vos applications',
    'Des tests sur vos données réelles avant la mise en service',
    'Une supervision : alerte si un workflow échoue',
    'Une documentation et une prise en main pour votre équipe',
    'Un hébergement adapté : cloud européen ou hébergement local selon vos besoins',
  ],
  steps: [
    ['Audit gratuit', 'Nous listons vos tâches répétitives et estimons le temps qu’elles vous coûtent.'],
    ['Devis', 'Vous recevez une proposition claire : périmètre, délais, tarif.'],
    ['Construction', 'Nous construisons et testons les workflows avec vous.'],
    ['Mise en service', 'Livraison, documentation, et suivi pour que tout reste fiable.'],
  ],
  examples: [
    'Un formulaire de contact qui crée la fiche client, notifie l’équipe et envoie un accusé de réception',
    'Les factures reçues par mail classées et enregistrées automatiquement',
    'Un rapport hebdomadaire d’activité envoyé chaque lundi sans intervention',
    'Une relance automatique des devis sans réponse',
  ],
  faq: [
    ['Combien ça coûte ?', 'Chaque projet est chiffré sur devis, après l’audit gratuit, selon le nombre de workflows et d’outils à relier.'],
    ['L’audit est-il vraiment gratuit ?', 'Oui. Il sert à identifier ce qui vaut la peine d’être automatisé, sans engagement de votre part.'],
    ['Mes données restent-elles chez moi ?', 'Nous choisissons avec vous l’hébergement (local ou cloud européen) et vous indiquons clairement quand un service externe intervient.'],
    ['Faut-il changer mes outils ?', 'Non. AutoFlow se branche sur ce que vous utilisez déjà (messagerie, Microsoft 365, CRM, tableurs, outils métiers).'],
  ],
};

const faqCommun = (offre, extra) => [
  ['Combien ça coûte ?', `Chaque projet ${offre} est chiffré sur devis, après l’audit gratuit, selon le périmètre.`],
  ['L’audit est-il vraiment gratuit ?', 'Oui. Il sert à définir votre besoin et ce qui est réaliste, sans engagement de votre part.'],
  ...extra,
];

const brainbotLanding = {
  slug: 'brainbot',
  metaTitle: 'BrainBot : assistant IA sur vos documents | ArchiAtech',
  metaDescription:
    "BrainBot : un assistant IA qui répond à partir de vos propres documents, hébergement adapté à vos données. Audit gratuit, projet sur devis.",
  h1: 'BrainBot : un assistant IA qui connaît vos documents',
  eyebrow: 'Offre BrainBot',
  intro: 'BrainBot répond aux questions de vos équipes ou de vos clients à partir de vos procédures, contrats et documents, pas à partir d’internet.',
  summary: 'BrainBot est un assistant IA qui répond à partir de vos propres documents. Audit gratuit, puis projet sur devis.',
  problems: [
    'Les mêmes questions reviennent sans cesse à l’équipe',
    'L’information existe, mais personne ne sait où la trouver',
    'Les nouveaux arrivants mettent des semaines à connaître les procédures',
    'Vous hésitez à envoyer des documents internes à un outil grand public',
  ],
  deliverables: [
    'Un assistant branché sur les documents que vous choisissez',
    'Des réponses qui indiquent de quel document elles viennent',
    'Des accès limités selon qui a le droit de voir quoi',
    'Un hébergement choisi avec vous : cloud européen ou hébergement local',
    'Une prise en main de votre équipe et une documentation',
  ],
  steps: [
    ['Audit gratuit', 'Nous identifions les questions fréquentes et les documents qui y répondent.'],
    ['Devis', 'Vous recevez une proposition claire : périmètre, délais, tarif.'],
    ['Prototype', 'Nous testons l’assistant sur un petit ensemble de documents avec vous.'],
    ['Mise en service', 'Déploiement, formation de l’équipe et suivi de la qualité des réponses.'],
  ],
  examples: [
    'Un assistant interne qui répond sur les procédures et les consignes',
    'Un assistant qui aide à retrouver une clause ou une information dans vos contrats',
    'Un assistant d’accueil pour répondre aux questions fréquentes de vos clients',
    'Un support pour intégrer plus vite les nouveaux collaborateurs',
  ],
  faq: faqCommun('BrainBot', [
    ['Mes documents sont-ils envoyés à un service externe ?', 'Nous choisissons avec vous l’hébergement (local ou cloud européen) et vous indiquons clairement quand un service externe intervient.'],
    ['L’assistant peut-il se tromper ?', 'Oui, comme tout outil d’IA. C’est pourquoi les réponses citent leur source et qu’une vérification humaine reste prévue pour les sujets sensibles.'],
  ]),
};

const dashboardLanding = {
  slug: 'dashboard-pro',
  metaTitle: 'Dashboard Pro : tableau de bord sur mesure | ArchiAtech',
  metaDescription:
    "Dashboard Pro : un tableau de bord clair qui réunit vos chiffres clés, connecté à vos outils et mis à jour automatiquement. Audit gratuit, sur devis.",
  h1: 'Dashboard Pro : vos chiffres clés au même endroit',
  eyebrow: 'Offre Dashboard Pro',
  intro: 'Dashboard Pro réunit les chiffres qui comptent pour votre activité dans un tableau de bord lisible, mis à jour automatiquement.',
  summary: 'Dashboard Pro est un tableau de bord clair connecté à vos outils et fichiers existants. Audit gratuit, puis projet sur devis.',
  problems: [
    'Vos chiffres sont dispersés entre plusieurs fichiers et outils',
    'Le point d’activité se prépare à la main, souvent en retard',
    'Chacun lit les chiffres à sa façon',
    'Vous découvrez les problèmes trop tard',
  ],
  deliverables: [
    'Un tableau de bord avec les indicateurs choisis avec vous',
    'Une connexion à vos outils et fichiers existants',
    'Une mise à jour automatique, sans manipulation',
    'Une lecture simple, sans formation nécessaire',
    'Une documentation et une prise en main de votre équipe',
  ],
  steps: [
    ['Audit gratuit', 'Nous définissons les décisions à éclairer et les indicateurs utiles.'],
    ['Devis', 'Vous recevez une proposition claire : indicateurs, sources de données, délais, tarif.'],
    ['Construction', 'Nous connectons les données et construisons le tableau de bord avec vous.'],
    ['Mise en service', 'Livraison, prise en main et ajustements après les premières semaines.'],
  ],
  examples: [
    'Un suivi des ventes ou des devis en cours, mis à jour chaque jour',
    'Un tableau de trésorerie simple à partir de vos exports comptables',
    'Un suivi des demandes clients et de leurs délais de réponse',
    'Un point d’activité hebdomadaire envoyé automatiquement',
  ],
  faq: faqCommun('Dashboard Pro', [
    ['Faut-il changer mes outils ?', 'Non. Dashboard Pro se branche sur vos fichiers et outils actuels (tableurs, comptabilité, CRM, outils métiers) quand ils permettent un accès aux données.'],
    ['Qui peut voir le tableau de bord ?', 'Vous décidez des accès, personne par personne, selon la sensibilité des chiffres.'],
  ]),
};

const techcareLanding = {
  slug: 'techcare',
  metaTitle: 'TechCare : suivi de votre parc informatique | ArchiAtech',
  metaDescription:
    "TechCare : suivi régulier de vos postes et outils, un interlocuteur identifié, formule adaptée à votre équipe. Monaco, Alpes-Maritimes. Audit gratuit.",
  h1: 'TechCare : un suivi régulier de votre informatique',
  eyebrow: 'Offre TechCare',
  intro: 'TechCare assure le suivi de vos postes, accès et outils, avec un interlocuteur identifié quand un problème survient.',
  summary: 'TechCare est un suivi régulier de votre parc informatique, avec un interlocuteur identifié. Audit gratuit, puis formule sur devis.',
  problems: [
    'Vous n’avez personne de référence quand un poste ou un accès tombe en panne',
    'Les mises à jour et les sauvegardes sont faites quand on y pense',
    'Les arrivées et départs de collaborateurs ne sont pas cadrés',
    'Vous ne savez pas exactement quel matériel et quels logiciels vous utilisez',
  ],
  deliverables: [
    'Un état des lieux de votre parc et de vos accès',
    'Un suivi régulier : mises à jour, sauvegardes, points de sécurité',
    'Un interlocuteur identifié pour vos demandes',
    'Un accompagnement lors des arrivées et départs de collaborateurs',
    'Une formule adaptée à la taille de votre équipe',
  ],
  steps: [
    ['Audit gratuit', 'Nous faisons le point sur votre parc, vos outils et vos besoins.'],
    ['Devis', 'Vous recevez une formule claire : périmètre, fréquence de suivi, tarif.'],
    ['Mise en place', 'Nous documentons le parc et installons les routines de suivi.'],
    ['Suivi', 'Interventions et points réguliers, avec un compte rendu simple.'],
  ],
  examples: [
    'Le suivi des mises à jour et des sauvegardes d’une petite équipe',
    'La préparation d’un poste pour un nouvel arrivant',
    'La gestion des accès Microsoft 365 et de la messagerie',
    'Le dépannage et la mise en service de nouveaux postes',
  ],
  faq: faqCommun('TechCare', [
    ['Intervenez-vous sur place ?', 'Oui à Monaco et dans les Alpes-Maritimes, selon la demande. À distance pour le reste de la France.'],
    ['Faut-il un contrat long ?', 'Les conditions sont précisées dans le devis, après l’audit gratuit.'],
  ]),
};

export const autoflowLanding = { ...autoflowLandingData, eyebrow: 'Offre AutoFlow',
  intro: 'AutoFlow connecte vos outils et exécute à votre place les tâches répétitives, pour que votre équipe se concentre sur son métier.' };

// Toutes les pages dédiées aux offres.
export const offerLandings = [autoflowLanding, brainbotLanding, dashboardLanding, techcareLanding];
