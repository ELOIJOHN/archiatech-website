# Guide de Déploiement - ArchiAtech Website

## Vue d'ensemble

Site web responsive ArchiAtech déployé sur GitHub Pages avec domaine personnalisé **www.archiatech.com** via Cloudflare.

---

## Prérequis

- Node.js installé (v16+)
- Git configuré
- Compte GitHub avec accès au repository **ELOIJOHN/archiatech-website**
- Accès au dashboard Cloudflare pour le domaine **archiatech.com**

---

## Architecture de déploiement

```
Développement Local (localhost:5173)
    ↓
Git commit + push → GitHub (main branch)
    ↓
Build (Vite) → dist/
    ↓
Déploiement → GitHub Pages (gh-pages branch)
    ↓
DNS Cloudflare → www.archiatech.com
```

---

## Processus de déploiement complet

### Étape 1: Vérifier les modifications en local

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
# Vérifier que tout fonctionne correctement
```

### Étape 2: Vérifier l'état Git

```bash
# Voir les fichiers modifiés
git status

# Voir les différences
git diff
```

### Étape 3: Ajouter et committer les modifications

```bash
# Ajouter tous les fichiers modifiés
git add .

# OU ajouter des fichiers spécifiques
git add src/components/MonComposant.jsx

# Créer un commit avec message descriptif
git commit -m "feat: Description de la modification

- Détail 1
- Détail 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Étape 4: Pusher vers GitHub

```bash
git push origin main
```

### Étape 5: Build du projet

```bash
# Build de production
npm run build

# Vérifier que le build est réussi
# Doit afficher : ✓ built in X.XXs
```

### Étape 6: Déployer sur GitHub Pages

```bash
# Déploiement normal
npm run deploy

# OU déploiement forcé si nécessaire
npx gh-pages -d dist -f
```

### Étape 7: Purger le cache Cloudflare

**Méthode 1 : Via le Dashboard (Recommandé)**

1. Aller sur https://dash.cloudflare.com
2. Sélectionner le domaine **archiatech.com**
3. Menu **Caching** → **Configuration**
4. Cliquer sur **Purge Everything** (Tout vider)
5. Confirmer l'action
6. Attendre 30-60 secondes

**Méthode 2 : Via API Cloudflare**

```bash
# Nécessite CLOUDFLARE_ZONE_ID et CLOUDFLARE_API_TOKEN
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Étape 8: Vérifier le déploiement

1. Attendre 1-2 minutes après la purge du cache
2. Ouvrir https://www.archiatech.com
3. Faire CTRL+F5 (hard refresh) pour forcer le rechargement
4. Vérifier que les modifications sont visibles

---

## Commandes rapides

### Déploiement complet en une ligne

```bash
git add . && git commit -m "feat: Update" && git push origin main && npm run build && npm run deploy
```

### Vérifier les logs de déploiement

```bash
# Voir les derniers commits
git log --oneline -5

# Voir les branches
git branch -a

# Vérifier la branche gh-pages
git log origin/gh-pages --oneline -5
```

---

## Configuration du domaine personnalisé

### Configuration DNS (Cloudflare)

**Enregistrement CNAME :**
```
Type: CNAME
Name: www
Target: eloijohn.github.io
Proxy status: Proxied (Orange cloud)
TTL: Auto
```

**Enregistrements A (pour apex domain) :**
```
Type: A
Name: @
IPv4 address: 185.199.108.153
Proxy status: Proxied
```

```
Type: A
Name: @
IPv4 address: 185.199.109.153
Proxy status: Proxied
```

```
Type: A
Name: @
IPv4 address: 185.199.110.153
Proxy status: Proxied
```

```
Type: A
Name: @
IPv4 address: 185.199.111.153
Proxy status: Proxied
```

### Configuration GitHub Pages

1. Aller sur https://github.com/ELOIJOHN/archiatech-website
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: **gh-pages** / **(root)**
5. Custom domain: **www.archiatech.com**
6. Enforce HTTPS: **Activé**

---

## Structure du projet

```
archiatech-website/
├── public/              # Fichiers statiques
│   ├── videos/         # Vidéos de démonstration
│   ├── manifest.json   # PWA manifest
│   ├── sw.js          # Service Worker
│   ├── robots.txt     # SEO
│   └── sitemap.xml    # SEO
├── src/
│   ├── components/    # Composants React
│   ├── styles/        # CSS modulaires
│   ├── hooks/         # Custom hooks
│   ├── services/      # API services
│   ├── utils/         # Utilitaires
│   ├── App.jsx        # Point d'entrée app
│   ├── main.jsx       # Point d'entrée React
│   └── index.css      # CSS principal
├── dist/              # Build de production (généré)
├── vite.config.js     # Configuration Vite
├── tailwind.config.js # Configuration Tailwind
└── package.json       # Dépendances npm
```

---

## Troubleshooting

### Problème 1: Le site montre l'ancienne version

**Symptôme :** Après le déploiement, www.archiatech.com affiche encore l'ancienne version

**Solutions :**
1. Purger le cache Cloudflare (Étape 7)
2. Faire CTRL+F5 dans le navigateur
3. Vider le cache du navigateur
4. Essayer en navigation privée
5. Attendre 5-10 minutes (propagation DNS)

### Problème 2: Erreur "nothing to commit" lors du deploy

**Symptôme :** `npm run deploy` dit "rien à valider"

**Solution :**
```bash
# Forcer le redéploiement
npx gh-pages -d dist -f
```

### Problème 3: Build échoue

**Symptôme :** Erreurs lors de `npm run build`

**Solutions :**
```bash
# Nettoyer et réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Nettoyer le cache Vite
rm -rf dist .vite

# Rebuilder
npm run build
```

### Problème 4: Page 404 sur GitHub Pages

**Symptôme :** Le site affiche "Site not found"

**Solutions :**
1. Vérifier `vite.config.js` → `base: '/'` (pour domaine personnalisé)
2. Vérifier GitHub Pages Settings → Custom domain = **www.archiatech.com**
3. Vérifier que le fichier CNAME existe dans la branche gh-pages
4. Redéployer : `npm run deploy`

### Problème 5: HEAD détachée (detached HEAD)

**Symptôme :** Git indique "HEAD détachée"

**Solution :**
```bash
# Retourner sur main
git checkout main

# Créer une branche de sauvegarde si nécessaire
git checkout -b fix/my-changes
git merge main
git checkout main
git merge fix/my-changes
git push origin main
```

### Problème 6: Composants manquants après déploiement

**Symptôme :** Le site déployé n'affiche pas certains composants

**Solution :**
```bash
# Vérifier que tous les fichiers sont commités
git status

# Ajouter les fichiers manquants
git add src/components/*.jsx
git add src/styles/*.css
git commit -m "fix: Add missing components"
git push origin main

# Redéployer
npm run build
npm run deploy
```

---

## Checklist de déploiement

Avant chaque déploiement, vérifier :

- [ ] Le site fonctionne sur localhost (http://localhost:5173)
- [ ] Tous les composants s'affichent correctement
- [ ] Le responsive fonctionne sur mobile/tablette/desktop
- [ ] Aucune erreur dans la console du navigateur
- [ ] Les vidéos se chargent correctement
- [ ] Le formulaire de contact fonctionne
- [ ] `git status` ne montre pas de fichiers critiques non commités
- [ ] Le build réussit sans erreurs (`npm run build`)
- [ ] Les tests passent (si applicable)

Après le déploiement :

- [ ] Le déploiement GitHub Pages indique "Published"
- [ ] Le cache Cloudflare a été purgé
- [ ] Le site est accessible sur www.archiatech.com
- [ ] Hard refresh (CTRL+F5) montre les nouvelles modifications
- [ ] Le site est responsive sur différents appareils
- [ ] Aucune erreur 404 dans la console

---

## Contacts et ressources

- **Repository GitHub :** https://github.com/ELOIJOHN/archiatech-website
- **Site en production :** https://www.archiatech.com
- **GitHub Pages URL :** https://eloijohn.github.io/archiatech-website/
- **Cloudflare Dashboard :** https://dash.cloudflare.com
- **Documentation Vite :** https://vitejs.dev/
- **Documentation React :** https://react.dev/
- **Documentation Tailwind CSS :** https://tailwindcss.com/

---

## Versions

- **Node.js :** v16+
- **React :** 18.3.1
- **Vite :** 5.4.20
- **Tailwind CSS :** 3.4.17
- **gh-pages :** 6.2.0

---

## Notes importantes

1. **TOUJOURS** tester sur localhost avant de déployer
2. **NE JAMAIS** committer les fichiers `.env` contenant des clés API
3. **TOUJOURS** purger le cache Cloudflare après un déploiement
4. Le déploiement GitHub Pages peut prendre 1-5 minutes
5. La propagation du cache Cloudflare peut prendre jusqu'à 2 minutes
6. Utiliser des messages de commit descriptifs pour faciliter le suivi

---

**Dernière mise à jour :** 2025-10-17
