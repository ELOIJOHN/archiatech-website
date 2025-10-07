#!/bin/bash
# ========================================================
# 🚀 Script de déploiement ArchiaTech Website (React + Vite)
# ========================================================

echo "🔧 Étape 1 : Nettoyage du build précédent..."
rm -rf dist

echo "⚙️ Étape 2 : Build du site avec Vite..."
npm run build

echo "🚀 Étape 3 : Déploiement sur GitHub Pages..."
npx gh-pages -d dist -b gh-pages

# ========================================================
# ⚡ Étape 4 : Purge automatique du cache Cloudflare
# ========================================================
# 👉 Remplace ci-dessous par ton propre Token API Cloudflare
CF_API_TOKEN="TON_TOKEN_CLOUDFLARE_ICI"
ZONE_ID="TON_ZONE_ID_ICI"

if [ "$CF_API_TOKEN" != "TON_TOKEN_CLOUDFLARE_ICI" ]; then
  echo "🧹 Étape 4 : Purge du cache Cloudflare..."
  curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
       -H "Authorization: Bearer $CF_API_TOKEN" \
       -H "Content-Type: application/json" \
       --data '{"purge_everything":true}'
  echo "✅ Cache Cloudflare vidé avec succès."
else
  echo "⚠️ Aucun Token Cloudflare configuré, purge ignorée."
fi

echo "🌐 Déploiement terminé avec succès !"
echo "👉 Vérifie ton site sur : https://www.archiatech.com"