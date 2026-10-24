# Audit ArchiAgent — 24 octobre 2026

Base vérifiée : `09fa986`, sommet initial de `audit/securisation-archiagent`. Aucun changement de main, aucun déploiement en production. Le dépôt ne contenait aucune configuration du reverse proxy réel : les résultats ci-dessous concernent le proxy nginx de référence ajouté et exécuté localement.

## Corrections

- Historique navigateur limité aux derniers messages compatibles avec le contrat backend : 20 messages, 2 000 caractères/message, 16 384 octets JSON UTF-8. Le message utilisateur le plus récent est conservé. Les longues réponses précédentes ne font plus rejeter la requête suivante.
- Délai maximal navigateur de 20 secondes, annulation de la requête, refus des redirections et absence d’envoi de cookies. Une panne affiche une indisponibilité explicite au lieu d’une réponse locale laissant croire au bon fonctionnement de l’IA. Le mode local reste disponible lorsque l’endpoint n’est pas configuré.
- Champ de saisie limité à 2 000 caractères et garde contre l’envoi pendant une réponse.
- Identification du visiteur derrière un proxy explicitement approuvé par `TRUSTED_PROXIES` ; un unique X-Real-IP valide est exigé et nginx l’écrase. Les en-têtes Forwarded/X-Forwarded-For ne sont jamais utilisés. Défaut sans confiance proxy conservé. Ajout d’un plafond global de 120 requêtes/minute/processus en plus des 12/minute/client.
- Environnement Docker dédié, ports limités à 127.0.0.1, backend inaccessible directement depuis l’hôte, utilisateurs sans privilèges, ressources limitées, images figées par digest, certificat de test temporaire et fournisseur IA simulé sans clé réelle.
- Proxy : TLS 1.2/1.3, redirection HTTPS vers une autorité fixe, HSTS, CORS exact, erreurs 429 lisibles par le navigateur, limites de taille, débit, connexions et délais. Pas de nouvelle tentative automatique de POST vers le fournisseur.
- Mises à jour compatibles du verrouillage npm : 27 alertes initiales (1 critique, 20 élevées, 5 modérées, 1 faible) ramenées à 15 (0 critique, 11 élevées, 4 modérées). Toutes les alertes restantes concernent des dépendances de développement dans le verrouillage.

## Résultats mesurés

| Vérification | Résultat |
|---|---|
| Suite initiale non modifiée | 41/41 réussis |
| Suite backend/client étendue, Node local 25.8.0 | 47/47 réussis, 0 ignoré |
| Même suite sous Node 22, conteneur sans réseau | 47/47 réussis, 0 ignoré |
| Navigateur Chrome, site construit → HTTPS nginx → backend → fournisseur simulé | 4 scénarios réussis |
| Contrôles HTTP/HTTPS du proxy | 5 scénarios réussis |
| Compteur du lanceur E2E Node | 10/10, dont le groupe parent des 4 scénarios navigateur ; 0 ignoré |
| Syntaxe nginx | nginx -t réussi |
| Construction du site après mises à jour | réussie |
| Analyse ESLint du service LLM modifié | réussie |
| Espaces/patch Git | git diff --check réussi |

Les quatre scénarios navigateur couvrent la réponse visible, la panne fournisseur, le rendu inoffensif d’une chaîne HTML et une requête bloquée annulée après 20 secondes avec retour du champ de saisie (environ 23 secondes avec l’animation du message).

Les cinq scénarios proxy couvrent la redirection avec Host falsifié, TLS 1.2/1.3 et refus TLS 1.1, CORS/méthodes/routes/en-têtes d’erreur, refus des corps trop volumineux/compressés/non JSON, puis une rafale de 20 requêtes avec faux en-têtes IP provoquant des 429 avec Retry-After. La suite backend couvre aussi l’expiration des quotas, le plafond global distribué, les délais fournisseur/corps, la concurrence, les données invalides et l’annulation fournisseur lors d’une déconnexion.

Les premiers essais ont révélé des permissions de répertoires temporaires nginx incorrectes, une incompatibilité de publication de ports avec le réseau Docker internal, et une attente navigateur inadaptée aux vidéos. Le scénario final corrige ces points, remet les quotas à zéro au démarrage et arrête automatiquement ses conteneurs à la fin.

## Limites et suites nécessaires

1. Le reverse proxy de production, la chaîne CDN, le certificat public/son renouvellement et l’infrastructure d’hébergement n’ont pas été inspectés. Ne pas considérer ces résultats comme une certification de production.
2. Aucun appel réel au fournisseur IA : le parcours réseau et l’interface sont testés avec un fournisseur simulé. Qualité des réponses, droits de la clé et accès réel au modèle restent à valider dans un staging autorisé.
3. Origin n’est pas une authentification. Les quotas locaux se réinitialisent au redémarrage et ne sont pas partagés entre plusieurs processus. Une protection bots/challenge, des quotas durables et un plafond fournisseur de dépenses restent des décisions de mise en production.
4. Les 15 alertes de développement restantes impliquent notamment Puppeteer et ses dépendances, Vite/esbuild et Tailwind/postcss-selector-parser. Les suppressions proposées par npm nécessitent des migrations majeures ; elles n’ont pas été forcées dans cet audit du chatbot. Le backend déployable n’utilise aucune dépendance npm. Aucune alerte restante n’est classée en dépendance de production dans le verrouillage, ce qui ne garantit pas l’absence de vulnérabilité.
5. Le réseau Docker dédié n’est pas un pare-feu sortant. Le fournisseur est isolé par injection d’un simulateur et absence de secrets ; le navigateur de test bloque les requêtes externes. Le certificat auto-signé et la clé jetable ne sont pas destinés à la production.

## Reproduction et références

Voir [README](README.md) pour `npm run test:archiagent` et `npm run test:archiagent:e2e`. Le workflow de la seule branche d’audit exécute également ces contrôles et conserve la capture navigateur ; il ne déploie pas.

Documentation primaire utilisée pour les limites et les paramètres du proxy : [nginx limit_req](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html), [nginx proxy](https://nginx.org/en/docs/http/ngx_http_proxy_module.html).
