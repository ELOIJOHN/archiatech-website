#!/bin/bash

# Script de vérification finale pour la production
# ArchiAtech Website - Production Readiness Check

echo "🔍 Vérification de l'état de production - ArchiAtech"
echo "===================================================="
echo ""

ERRORS=0
WARNINGS=0

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction de vérification
check() {
    local name=$1
    local status=$2
    
    if [ $status -eq 0 ]; then
        echo -e "${GREEN}✅${NC} $name"
    else
        echo -e "${RED}❌${NC} $name"
        ((ERRORS++))
    fi
}

check_warning() {
    local name=$1
    local status=$2
    
    if [ $status -eq 0 ]; then
        echo -e "${GREEN}✅${NC} $name"
    else
        echo -e "${YELLOW}⚠️${NC}  $name (Recommandé)"
        ((WARNINGS++))
    fi
}

echo "📄 Fichiers essentiels"
echo "----------------------"

# Vérifier les fichiers essentiels
[ -f "index.html" ] && check "index.html existe" 0 || check "index.html existe" 1
[ -f "package.json" ] && check "package.json existe" 0 || check "package.json existe" 1
[ -f "vite.config.js" ] && check "vite.config.js existe" 0 || check "vite.config.js existe" 1
[ -f "public/robots.txt" ] && check "robots.txt existe" 0 || check "robots.txt existe" 1
[ -f "public/sitemap.xml" ] && check "sitemap.xml existe" 0 || check "sitemap.xml existe" 1
[ -f "public/manifest.json" ] && check "manifest.json existe" 0 || check "manifest.json existe" 1
[ -f "public/.htaccess" ] && check ".htaccess existe" 0 || check ".htaccess existe" 1

echo ""
echo "🖼️  Images & Assets"
echo "-------------------"

# Vérifier les images
[ -f "public/images/archiatech-hero.jpg" ] && check "Image Open Graph existe" 0 || check "Image Open Graph existe" 1

# Vérifier les icons PWA
ICON_COUNT=$(ls public/images/icon-*.png 2>/dev/null | wc -l)
if [ $ICON_COUNT -ge 8 ]; then
    check "Icons PWA ($ICON_COUNT/9)" 0
else
    check_warning "Icons PWA ($ICON_COUNT/9)" 1
fi

echo ""
echo "📦 Dépendances Node"
echo "-------------------"

# Vérifier node_modules
[ -d "node_modules" ] && check "node_modules installés" 0 || check "node_modules installés" 1

# Vérifier les dépendances critiques
if [ -d "node_modules" ]; then
    [ -d "node_modules/react" ] && check "React installé" 0 || check "React installé" 1
    [ -d "node_modules/react-dom" ] && check "React DOM installé" 0 || check "React DOM installé" 1
    [ -d "node_modules/vite" ] && check "Vite installé" 0 || check "Vite installé" 1
fi

echo ""
echo "🔧 Configuration"
echo "----------------"

# Vérifier le contenu de index.html
if grep -q "ArchiAtech - Solutions IA" index.html; then
    check "Titre SEO optimisé" 0
else
    check "Titre SEO optimisé" 1
fi

if grep -q 'name="description"' index.html; then
    check "Meta description présente" 0
else
    check "Meta description présente" 1
fi

if grep -q 'property="og:' index.html; then
    check "Open Graph tags présents" 0
else
    check "Open Graph tags présents" 1
fi

if grep -q 'application/ld+json' index.html; then
    check "Structured Data présent" 0
else
    check "Structured Data présent" 1
fi

# Vérifier Google Analytics
if grep -q 'G-XXXXXXXXXX' index.html 2>/dev/null; then
    check_warning "Google Analytics configuré (remplacer G-XXXXXXXXXX)" 1
elif grep -q 'gtag/js' index.html 2>/dev/null; then
    check "Google Analytics installé" 0
else
    check_warning "Google Analytics installé" 1
fi

# Vérifier Google Search Console
if grep -q 'google-site-verification' index.html; then
    if grep -q 'VOTRE_CODE' index.html; then
        check_warning "Google Search Console (code à remplacer)" 1
    else
        check "Google Search Console configuré" 0
    fi
else
    check_warning "Google Search Console configuré" 1
fi

echo ""
echo "📊 Scripts & Utilitaires"
echo "------------------------"

[ -f "src/utils/analytics.js" ] && check "Utilitaires Analytics" 0 || check_warning "Utilitaires Analytics" 1
[ -f "scripts/validate-seo.sh" ] && check "Script validation SEO" 0 || check "Script validation SEO" 1
[ -f "scripts/generate-icons.mjs" ] && check "Script génération icons" 0 || check_warning "Script génération icons" 1

echo ""
echo "📚 Documentation"
echo "----------------"

[ -f "README.md" ] && check "README.md" 0 || check_warning "README.md" 1
[ -f "AMELIORATIONS-SEO.md" ] && check "AMELIORATIONS-SEO.md" 0 || check "AMELIORATIONS-SEO.md" 1
[ -f "SEO-CHECKLIST.md" ] && check "SEO-CHECKLIST.md" 0 || check "SEO-CHECKLIST.md" 1
[ -f "GUIDE-FINALISATION-SEO.md" ] && check "GUIDE-FINALISATION-SEO.md" 0 || check "GUIDE-FINALISATION-SEO.md" 1
[ -f "INSTRUCTIONS-FINALES.md" ] && check "INSTRUCTIONS-FINALES.md" 0 || check "INSTRUCTIONS-FINALES.md" 1

echo ""
echo "🧪 Tests"
echo "--------"

# Tester si npm run test:seo fonctionne
if command -v npm &> /dev/null; then
    if npm run test:seo &> /dev/null; then
        check "Validation SEO (npm run test:seo)" 0
    else
        check "Validation SEO (npm run test:seo)" 1
    fi
else
    check_warning "npm disponible" 1
fi

echo ""
echo "===================================================="
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ PRODUCTION READY !${NC}"
    echo ""
    echo "Votre site est prêt pour la production 🚀"
    echo ""
    echo "Prochaines étapes :"
    echo "  1. Générer les icons PWA (si manquants)"
    echo "  2. Configurer Google Search Console"
    echo "  3. Configurer Google Analytics 4"
    echo "  4. npm run build"
    echo "  5. npm run deploy"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  PRESQUE PRÊT${NC}"
    echo ""
    echo "Erreurs critiques : $ERRORS"
    echo "Avertissements : $WARNINGS"
    echo ""
    echo "Les éléments avec ⚠️ sont recommandés mais non bloquants."
    echo "Consultez INSTRUCTIONS-FINALES.md pour les dernières étapes."
    exit 0
else
    echo -e "${RED}❌ NON PRÊT POUR LA PRODUCTION${NC}"
    echo ""
    echo "Erreurs critiques : $ERRORS"
    echo "Avertissements : $WARNINGS"
    echo ""
    echo "Veuillez corriger les erreurs ❌ avant le déploiement."
    echo "Consultez la documentation pour plus d'informations."
    exit 1
fi

