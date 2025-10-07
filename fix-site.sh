#!/bin/bash

# Script de correction automatique du site ArchiAtech
# Ce script va réinstaller et reconfigurer Tailwind CSS

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║   🔧 CORRECTION AUTOMATIQUE - ARCHIATECH                     ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Vérifier qu'on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : package.json non trouvé"
    echo "   Assurez-vous d'être dans le dossier archiatech-website"
    exit 1
fi

echo "✓ Dossier du projet trouvé"
echo ""

# Étape 1 : Nettoyer
echo "🧹 Étape 1/5 : Nettoyage..."
rm -rf dist
rm -rf node_modules/.vite
echo "✓ Cache nettoyé"
echo ""

# Étape 2 : Réinstaller les dépendances
echo "📦 Étape 2/5 : Réinstallation des dépendances..."
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
echo "✓ Dépendances installées"
echo ""

# Étape 3 : Vérifier Tailwind
echo "🔍 Étape 3/5 : Vérification de Tailwind CSS..."
if npm list tailwindcss > /dev/null 2>&1; then
    echo "✓ Tailwind CSS installé"
else
    echo "❌ Tailwind CSS non trouvé, réinstallation..."
    npm install -D tailwindcss postcss autoprefixer
fi
echo ""

# Étape 4 : Initialiser Tailwind (si nécessaire)
echo "⚙️  Étape 4/5 : Configuration de Tailwind..."
if [ ! -f "tailwind.config.js" ]; then
    npx tailwindcss init -p
    echo "✓ Fichiers de configuration créés"
else
    echo "✓ Fichiers de configuration existants"
fi
echo ""

# Étape 5 : Build
echo "🔨 Étape 5/5 : Build du projet..."
npm run build
echo "✓ Build terminé"
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "✅ CORRECTION TERMINÉE !"
echo ""
echo "Pour tester le site :"
echo "   npm run dev"
echo ""
echo "Puis ouvrez : http://localhost:5173"
echo ""
echo "═══════════════════════════════════════════════════════════════"
