// Articles du blog ArchiAtech. Pour en ajouter un : ajouter un objet ci-dessous (le plus récent en premier),
// puis `python3 scripts/generate-og.py` pour son image de partage. Les pages, le sitemap et les balises SEO suivent seuls.
// Blocs de contenu : { h2 }, { p }, { ul: [ ... ] }.
export const blogPosts = [
  {
    slug: 'ia-souveraine-pme',
    title: "IA souveraine : ce que cela change concrètement pour une PME",
    metaTitle: "IA souveraine pour PME : définition et bénéfices | ArchiAtech",
    description:
      "Qu'est-ce qu'une IA souveraine, pourquoi les PME s'y intéressent et comment démarrer sans exposer ses données ? Les repères essentiels.",
    date: '2026-10-25',
    readingTime: '4 min',
    blocks: [
      { p: "Quand on utilise un outil d'IA grand public, les textes, documents et questions envoyés partent vers les serveurs de son éditeur. Pour une PME, cela peut inclure des devis, des contrats, des données clients ou des échanges internes. L'IA souveraine répond à cette inquiétude : garder la maîtrise de l'endroit où vivent les données et de la manière dont elles sont utilisées." },
      { h2: "Ce que recouvre le terme" },
      { p: "Il n'existe pas de définition unique, mais trois éléments reviennent presque toujours :" },
      { ul: [
        "Hébergement maîtrisé : les données restent en Europe, chez un hébergeur choisi, ou sur votre propre infrastructure.",
        "Contrôle des accès : vous décidez qui peut interroger l'IA et sur quels documents.",
        "Pas de réutilisation implicite : vos contenus ne servent pas à entraîner un modèle public, sauf accord explicite.",
      ] },
      { h2: "Les situations où cela compte le plus" },
      { ul: [
        "Documents contractuels, financiers ou juridiques.",
        "Données personnelles de clients ou de salariés (RGPD).",
        "Secteurs réglementés ou clients qui imposent des garanties dans leurs appels d'offres.",
      ] },
      { h2: "Par où commencer" },
      { p: "Inutile de tout changer d'un coup. Une démarche simple fonctionne bien :" },
      { ul: [
        "Recenser les usages d'IA déjà présents dans l'entreprise (souvent plus nombreux que prévu).",
        "Classer les données utilisées : publiques, internes, sensibles.",
        "Choisir pour chaque usage le bon niveau : un service cloud européen pour le courant, un modèle hébergé en interne pour le sensible.",
        "Écrire une courte charte d'utilisation et former les équipes.",
      ] },
      { h2: "Les limites à connaître" },
      { p: "Un modèle hébergé en interne demande des ressources techniques et un suivi, et ne vaut pas toujours les meilleurs modèles du marché sur toutes les tâches. L'objectif est un compromis réfléchi entre confidentialité, qualité et coût, pas un choix idéologique." },
    ],
  },
  {
    slug: 'automatiser-avec-n8n',
    title: "5 tâches de PME à automatiser avec n8n",
    metaTitle: "Automatiser sa PME avec n8n : 5 idées concrètes | ArchiAtech",
    description:
      "Formulaires, factures, relances, comptes rendus : cinq automatisations simples avec n8n qui font gagner du temps à une petite entreprise.",
    date: '2026-10-25',
    readingTime: '4 min',
    blocks: [
      { p: "n8n est un outil d'automatisation qui relie vos applications entre elles : messagerie, tableurs, CRM, comptabilité, messageries d'équipe. Il peut être hébergé chez vous, ce qui convient aux entreprises attentives à leurs données. Voici cinq usages courants, faciles à mettre en place." },
      { h2: "1. Traiter les demandes reçues par le site" },
      { p: "Un formulaire de contact déclenche l'archivage de la demande, un email à la bonne personne et une alerte instantanée. Plus aucune demande ne reste oubliée dans une boîte partagée." },
      { h2: "2. Relancer les factures en retard" },
      { p: "Un flux vérifie chaque semaine les factures échues et prépare un message de relance, que vous validez ou qui part seul selon vos règles." },
      { h2: "3. Classer les pièces reçues par email" },
      { p: "Factures, devis et contrats reçus en pièce jointe sont enregistrés dans le bon dossier, avec un nom cohérent, et listés dans un tableau de suivi." },
      { h2: "4. Préparer un compte rendu de réunion" },
      { p: "À partir d'une transcription, un flux produit un résumé, la liste des actions et leurs responsables, puis les envoie aux participants." },
      { h2: "5. Suivre l'actualité de son secteur" },
      { p: "Un flux surveille des sources choisies, trie les articles pertinents et vous envoie un récapitulatif hebdomadaire plutôt que cinquante alertes." },
      { h2: "Comment choisir par quoi commencer" },
      { ul: [
        "Une tâche répétitive qui revient chaque semaine.",
        "Des règles claires, sans cas particulier à chaque fois.",
        "Un gain visible rapidement, pour convaincre l'équipe.",
      ] },
      { p: "Il vaut mieux démarrer par un flux simple et fiable, puis l'enrichir, que viser dès le départ un scénario complexe." },
    ],
  },
  {
    slug: 'securite-microsoft-365-pme',
    title: "Microsoft 365 : 7 réglages de sécurité à vérifier dans votre PME",
    metaTitle: "Sécurité Microsoft 365 en PME : 7 points à vérifier | ArchiAtech",
    description:
      "Authentification multifacteur, comptes administrateurs, partage externe, sauvegarde : sept vérifications simples pour sécuriser Microsoft 365.",
    date: '2026-10-25',
    readingTime: '4 min',
    blocks: [
      { p: "Microsoft 365 est installé dans la plupart des PME, mais ses réglages de sécurité restent souvent ceux par défaut. Voici sept points à vérifier, par ordre d'importance. Certaines options dépendent de votre licence." },
      { ul: [
        "Authentification multifacteur : activée pour tous les comptes, en priorité les administrateurs et la direction.",
        "Comptes administrateurs : peu nombreux, dédiés à l'administration, et distincts des comptes de messagerie du quotidien.",
        "Partage externe : savoir qui peut partager des fichiers hors de l'entreprise, et avec quelles restrictions.",
        "Messagerie : règles de transfert automatique contrôlées, protection contre l'hameçonnage activée.",
        "Appareils : mots de passe ou codes obligatoires, et possibilité d'effacer les données d'un téléphone perdu.",
        "Sauvegarde : une copie indépendante de la messagerie et des fichiers, car la corbeille n'est pas une sauvegarde.",
        "Départs et arrivées : une procédure pour fermer les accès d'un salarié qui quitte l'entreprise et retirer sa licence.",
      ] },
      { h2: "Une vérification qui prend peu de temps" },
      { p: "Les trois premiers points couvrent déjà une grande part des incidents courants. Un tour complet des sept réglages représente en général une demi-journée pour une petite structure, et il se refait une ou deux fois par an." },
      { h2: "Et ensuite" },
      { p: "Une fois ces bases en place, on peut aller plus loin : accès conditionnels, gestion des appareils, sensibilisation des équipes. Chaque entreprise a un niveau de risque différent, et les mesures doivent rester proportionnées." },
    ],
  },
];

export const getPost = (slug) => blogPosts.find((p) => p.slug === slug);
