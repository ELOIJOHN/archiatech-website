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
  },
];

// Contenu de la page dédiée AutoFlow (/offres/autoflow/).
export const autoflowLanding = {
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
