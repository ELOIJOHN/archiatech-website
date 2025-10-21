#!/bin/bash

# Script de validation SEO pour ArchiAtech
# Vérifie tous les éléments SEO critiques

echo "🔍 Validation SEO ArchiAtech"
echo "=============================="
echo ""

URL="http://localhost:5173"
ERROR_COUNT=0

# Fonction pour tester un élément
test_element() {
    local name=$1
    local pattern=$2
    local result=$(curl -s $URL | grep -c "$pattern")
    
    if [ $result -gt 0 ]; then
        echo "✅ $name"
    else
        echo "❌ $name - MANQUANT"
        ((ERROR_COUNT++))
    fi
}

echo "📄 Meta Tags de base"
echo "--------------------"
test_element "Title tag" "<title>ArchiAtech"
test_element "Meta description" 'name="description"'
test_element "Meta keywords" 'name="keywords"'
test_element "Meta robots" 'name="robots"'
test_element "Canonical URL" 'rel="canonical"'
test_element "Lang attribute" 'lang="fr"'
echo ""

echo "📱 Open Graph Tags"
echo "------------------"
test_element "OG Type" 'property="og:type"'
test_element "OG URL" 'property="og:url"'
test_element "OG Title" 'property="og:title"'
test_element "OG Description" 'property="og:description"'
test_element "OG Image" 'property="og:image"'
echo ""

echo "🐦 Twitter Card Tags"
echo "--------------------"
test_element "Twitter Card" 'name="twitter:card"'
test_element "Twitter Title" 'name="twitter:title"'
test_element "Twitter Description" 'name="twitter:description"'
test_element "Twitter Image" 'name="twitter:image"'
echo ""

echo "🏗️ Structured Data (Schema.org)"
echo "-------------------------------"
test_element "JSON-LD Script" 'application/ld+json'
test_element "Organization Schema" '"@type": "Organization"'
test_element "Service Schema" '"@type": "Service"'
test_element "WebSite Schema" '"@type": "WebSite"'
echo ""

echo "📋 Fichiers SEO"
echo "---------------"
ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL/robots.txt)
if [ $ROBOTS_STATUS -eq 200 ]; then
    echo "✅ robots.txt accessible"
else
    echo "❌ robots.txt - HTTP $ROBOTS_STATUS"
    ((ERROR_COUNT++))
fi

SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL/sitemap.xml)
if [ $SITEMAP_STATUS -eq 200 ]; then
    echo "✅ sitemap.xml accessible"
else
    echo "❌ sitemap.xml - HTTP $SITEMAP_STATUS"
    ((ERROR_COUNT++))
fi

MANIFEST_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL/manifest.json)
if [ $MANIFEST_STATUS -eq 200 ]; then
    echo "✅ manifest.json accessible"
else
    echo "❌ manifest.json - HTTP $MANIFEST_STATUS"
    ((ERROR_COUNT++))
fi
echo ""

echo "🔒 Security Headers"
echo "-------------------"
echo "ℹ️  Les headers de sécurité doivent être configurés sur le serveur de production"
echo ""

echo "=============================="
if [ $ERROR_COUNT -eq 0 ]; then
    echo "✅ Validation réussie ! Tous les éléments SEO sont présents."
    exit 0
else
    echo "❌ Validation échouée : $ERROR_COUNT erreur(s) trouvée(s)."
    exit 1
fi

