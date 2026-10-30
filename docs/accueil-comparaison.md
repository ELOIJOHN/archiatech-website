# Proposition d’accueil — ArchIAtech

Branche : `design/accueil-trois-offres`.
Base distante : `audit/securisation-archiagent`, commit `4e56c56`.

## Comparer en local

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

- Nouvelle proposition : `http://127.0.0.1:5173/`
- Accueil précédent de la branche audit : `http://127.0.0.1:5173/?accueil=original`

Le lien en pied de page ouvre l’accueil précédent. Le bouton Retour du navigateur revient à la proposition. Cette référence correspond au code de la branche audit, et n’est pas une copie garantie du site de production.

## Changements

- Premier écran : offre, clientèle PME, zone Monaco et Alpes-Maritimes, contact et accès aux solutions.
- Trois offres : support informatique, automatisation et intelligence artificielle.
- Chaque offre mène à sa propre section détaillée, avec prestations et exemple de besoin. Il s’agit d’exemples, pas de références clients.
- Présentation de John Eloi et méthode en quatre étapes.
- Retrait des statistiques non documentées, engagements généraux de souveraineté et promesses de disponibilité de cette proposition.
- Accueil allégé : les vidéos et anciens contenus restent dans la version précédente.
- Formulaire conservé avec les corrections récentes de la branche audit. La nouvelle introduction parle d’un premier échange sans engagement. Le message est préparé, puis envoyé manuellement depuis la messagerie du visiteur.
- Styles limités à la proposition pour conserver la référence précédente.

## Vérification du 30 octobre 2026

- Compilation Vite réussie.
- ESLint du nouveau composant réussi.
- Trois tests de préparation des messages de contact réussis.
- Rendu contrôlé dans le navigateur, ordinateur et mobile 390 × 844.
- Suite backend tentée : le terminal interdit l’ouverture de ports locaux (`listen EPERM`). Ces erreurs ne constituent pas une validation du backend. Aucun changement backend dans cette proposition.

Ne pas lancer `npm run deploy`. Aucune modification de `main` et aucun déploiement de production ne sont nécessaires à cette comparaison.
