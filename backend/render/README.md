# Préproduction ArchiAgent sur Render

Configuration préparée le 24 octobre 2026. **Aucun service Render créé ou déployé par la préparation de ces fichiers.** Cette préproduction est indépendante du site GitHub Pages, de son domaine et de la branche main.

## Choix retenu

Render Web Service, région Francfort, offre `free`, relié à `ELOIJOHN/archiatech-website`, branche `audit/securisation-archiagent`. Render fournit l’URL HTTPS et son certificat. Le code Node utilise uniquement les modules natifs : aucune installation npm ni dépendance frontend n’est nécessaire sur ce service.

L’offre gratuite se met en veille après 15 minutes sans trafic et le redémarrage peut prendre environ une minute. Elle convient aux essais, pas au site de production. Les quotas de bande passante et de construction s’appliquent : avec un moyen de paiement enregistré, des dépassements peuvent être facturés. Sans moyen de paiement, Render suspend les services concernés à l’épuisement des quotas. Les appels au fournisseur IA sont facturés séparément. Aucun plan payant ne doit être activé sans décision explicite.

## Activation après connexion du compte Render

1. Connecter Render dans cette conversation et sélectionner le compte/espace de travail prévu pour les essais. L’intégration GitHub de Render doit pouvoir lire ce dépôt.
2. Importer le Blueprint `render.yaml` depuis la branche `audit/securisation-archiagent`. Vérifier le nom `archiatech-archiagent-preprod`, le plan Free et la région Frankfurt. L’import effectue le premier déploiement ; `autoDeployTrigger: "off"` empêche uniquement les déploiements ultérieurs automatiques.
3. Saisir `OPENAI_API_KEY` **dans les secrets du service Render**, jamais dans GitHub, une variable VITE, la page de test ou la conversation. Utiliser un projet IA consacré aux essais, avec ses contrôles de dépenses appropriés. Une clé manquante empêche le démarrage.
4. Render génère `PREVIEW_ACCESS_TOKEN`. Récupérer ce code dans les variables du service pour accéder à l’API de test. Il ne s’agit pas de la clé fournisseur. Ne pas le partager publiquement. Le remplacer dans Render permet de le révoquer après redéploiement.
5. Ouvrir l’URL HTTPS attribuée par Render. La page de test est publique mais tout appel à l’IA exige le code d’accès. Saisir une question et vérifier la réponse réelle.
6. Vérifier `/healthz`, le refus d’un code absent/incorrect, le refus de l’origine du site de production, les erreurs fournisseur et les limites. Le statut healthy signifie que le serveur répond, pas que la clé ou le modèle a été validé auprès du fournisseur.
7. Suspendre ou supprimer la préproduction après les essais si elle n’est plus utile. Ne pas modifier le site public ou main à cette étape.

## Garanties et limites

- Le point d’entrée `backend/render/preview-server.mjs` écoute `0.0.0.0:$PORT`, comme requis par Render, au lieu de modifier l’écoute locale par défaut du backend existant.
- Seule l’origine HTTPS donnée par `RENDER_EXTERNAL_URL` est acceptée. `https://www.archiatech.com` n’est pas ajouté. Aucun domaine personnalisé n’est configuré.
- Les appels API nécessitent un Bearer token d’au moins 32 caractères, comparé via des empreintes de longueur fixe et une comparaison à temps constant. Les clés ne sont jamais incorporées dans les ressources publiques.
- Les en-têtes IP transférés ne sont pas utilisés : aucune hypothèse non vérifiée sur la chaîne de proxy Render. Limite conservatrice globale de 12 requêtes/minute/processus, et 2 opérations simultanées. Les quotas mémoire se réinitialisent au redémarrage ; ce ne sont pas des plafonds de facturation durables.
- Le backend existant conserve ses contrôles de messages, de taille, de délais et de réponse fournisseur. L’accès de test supplémentaire n’est pas destiné à remplacer une authentification de production.
- La page utilise `textContent`, un délai de 20 secondes, aucun stockage du code et une politique CSP restrictive. Aucun script tiers n’est chargé. Chaque essai envoie une seule question au backend ; ce diagnostic privé ne remplace pas le chatbot public complet testé dans l’environnement Docker.
- Les requêtes et secrets ne sont pas journalisés par le code. Les journaux et fonctionnalités de la plateforme devront être vérifiés après connexion.
- La configuration est prête à importer, mais son acceptation effective par Render, l’URL allouée, le certificat et un appel réel au fournisseur restent à vérifier après connexion et saisie du secret.

## Vérifications reproductibles

`node --test backend/render-preview.test.mjs` exécute 9 tests sans clé réelle, sans ouvrir de port : validation du démarrage, absence de secrets dans les ressources, health check, refus d’accès, restriction d’origine, contrat du backend, plafond global, erreurs fournisseur et routes inconnues. Ces tests sont inclus dans `npm run test:archiagent` et dans GitHub Actions.

Le YAML a été analysé localement : offre Free, branche d’audit et désactivation des déploiements automatiques vérifiées. L’analyse YAML ne remplace pas la validation du Blueprint par Render.

## Documentation officielle

- [Offre gratuite et limites](https://render.com/docs/free)
- [Web Services et écoute réseau](https://render.com/docs/web-services)
- [Blueprint YAML](https://render.com/docs/blueprint-spec)
- [Variables de la plateforme](https://render.com/docs/environment-variables)
- [Health checks](https://render.com/docs/health-checks)
