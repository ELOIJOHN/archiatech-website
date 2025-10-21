# ⚡ Guide d'Optimisation des Performances - ArchiAtech

## 🎯 Vue d'ensemble

L'optimisation des performances est cruciale pour l'expérience utilisateur et le SEO. Ce guide couvre toutes les optimisations implémentées pour améliorer les Core Web Vitals et les métriques de performance.

## ✨ Optimisations Implémentées

### 📊 **Core Web Vitals Monitoring**
- Mesure automatique du LCP, FID, CLS
- Envoi des métriques à Google Analytics
- Monitoring en temps réel des performances

### 🚀 **Bundle Optimization**
- Code splitting avancé
- Tree shaking automatique
- Minification Terser avec passes multiples
- Chunk optimization

### 🖼️ **Resource Optimization**
- Preloading des ressources critiques
- Lazy loading des sections non critiques
- Compression des assets
- Optimisation des images et vidéos

### ⚡ **Rendering Optimization**
- Lazy loading des composants
- Suspense pour les modules
- Optimisation des animations
- Déferrement des scripts non critiques

## 🏗️ Architecture des Performances

```
archiatech-website/
├── src/
│   ├── utils/
│   │   └── performance.js          # Utilitaires de performance
│   ├── components/
│   │   ├── LazySection.jsx         # Lazy loading des sections
│   │   ├── OptimizedImage.jsx      # Images optimisées
│   │   └── SimpleLazyVideo.jsx     # Vidéos optimisées
│   └── services/
│       └── contactAPI.js           # API optimisée
├── scripts/
│   ├── analyze-performance.mjs     # Analyse des performances
│   └── optimize-images.mjs         # Optimisation des images
└── vite.config.js                  # Configuration Vite optimisée
```

## 📚 Utilisation des Utilitaires

### **1. Monitoring des Core Web Vitals**

```javascript
import { initPerformanceOptimizations } from './utils/performance';

// Initialiser dans App.jsx
useEffect(() => {
  initPerformanceOptimizations();
}, []);
```

#### **Métriques Trackées**
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms  
- **CLS** (Cumulative Layout Shift) : < 0.1

#### **Intégration Google Analytics**
```javascript
// Les métriques sont automatiquement envoyées à GA4
window.gtag('event', 'web_vitals', {
  event_category: 'Web Vitals',
  event_label: 'LCP',
  value: Math.round(lcpValue)
});
```

### **2. Lazy Loading des Sections**

```jsx
import LazySection from './components/LazySection';

// Section avec lazy loading
<LazySection 
  className="py-24 px-6 bg-white"
  threshold={0.1}
  rootMargin="100px"
>
  <ExpensiveComponent />
</LazySection>
```

#### **Props**
- `threshold` : Seuil de visibilité (0.1 = 10%)
- `rootMargin` : Marge avant chargement ('100px')
- `placeholder` : Composant de remplacement
- `fallback` : Composant de fallback Suspense

### **3. Preloading des Ressources**

```javascript
import { preloadCriticalResources } from './utils/performance';

// Precharger automatiquement
preloadCriticalResources();
```

#### **Ressources Préchargées**
- Polices critiques (Inter)
- Images hero (desktop/mobile)
- Vidéo hero
- CSS critique

### **4. Optimisation des Animations**

```javascript
// Utiliser will-change pour les éléments animés
const animatedElements = document.querySelectorAll('[data-animated]');
animatedElements.forEach(element => {
  element.style.willChange = 'transform, opacity';
});
```

## 🔧 Configuration Vite Optimisée

### **Build Optimization**

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // Minification avancée
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2, // Compression multiple
      },
    },
    
    // Code splitting optimisé
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide': ['lucide-react'],
          'utils': ['src/utils/performance.js'],
          'components': ['src/components/OptimizedImage.jsx'],
        },
      },
    },
    
    // Target moderne
    target: 'esnext',
    cssCodeSplit: true,
  },
});
```

### **Dependency Optimization**

```javascript
optimizeDeps: {
  include: [
    'react', 
    'react-dom', 
    'lucide-react',
    'framer-motion'
  ],
}
```

## 📊 Analyse des Performances

### **Script d'Analyse**

```bash
# Analyser les performances
npm run analyze:performance

# Alias court
npm run perf
```

#### **Métriques Analysées**
- Taille du bundle (seuil: 1MB)
- Core Web Vitals (LCP, FID, CLS)
- Scores Lighthouse (Performance, Accessibility, SEO)
- Recommandations d'optimisation

### **Exemple de Rapport**

```
📦 ANALYSE DE LA TAILLE DU BUNDLE
✓ Bundle Size: 856.2 KB (OK)
Top 5 des fichiers les plus lourds:
  1. index-B3REsGTT.js: 245.6 KB
  2. index-BTENdsg1.css: 89.3 KB
  3. vendor-lucide.js: 67.2 KB

⚡ ANALYSE DES CORE WEB VITALS
✓ Largest Contentful Paint (LCP): 1800ms (OK)
✓ First Input Delay (FID): 45ms (OK)
✓ Cumulative Layout Shift (CLS): 0.05 (OK)
```

## 🎯 Bonnes Pratiques

### **1. Images Optimisées**
```jsx
// ✅ Bon : Image optimisée avec lazy loading
<OptimizedImage
  src="/images/hero.jpg"
  alt="Description"
  priority={true}  // Pour images critiques
  className="w-full h-64 object-cover"
/>

// ❌ Mauvais : Image standard
<img src="/images/hero.jpg" alt="Description" />
```

### **2. Vidéos Optimisées**
```jsx
// ✅ Bon : Vidéo avec lazy loading
<SimpleLazyVideo
  src="/videos/hero.mp4"
  priority={true}  // Pour vidéo hero
  autoPlay={true}
  loop={true}
  muted={true}
/>

// ❌ Mauvais : Vidéo standard
<video src="/videos/hero.mp4" autoPlay loop muted />
```

### **3. Sections Lazy Loading**
```jsx
// ✅ Bon : Section non critique en lazy loading
<LazySection className="py-24 px-6">
  <ExpensiveComponent />
</LazySection>

// ❌ Mauvais : Toutes les sections se chargent immédiatement
<section className="py-24 px-6">
  <ExpensiveComponent />
</section>
```

### **4. Ressources Préchargées**
```javascript
// ✅ Bon : Precharger les ressources critiques
preloadCriticalResources();

// ❌ Mauvais : Aucun preload
```

## 📈 Métriques de Performance

### **Objectifs Core Web Vitals**
- **LCP** : < 2.5s (Excellent: < 2.5s, Besoin d'amélioration: 2.5s-4s, Pauvre: > 4s)
- **FID** : < 100ms (Excellent: < 100ms, Besoin d'amélioration: 100ms-300ms, Pauvre: > 300ms)
- **CLS** : < 0.1 (Excellent: < 0.1, Besoin d'amélioration: 0.1-0.25, Pauvre: > 0.25)

### **Objectifs Lighthouse**
- **Performance** : > 90
- **Accessibility** : > 95
- **Best Practices** : > 90
- **SEO** : > 95

### **Objectifs Bundle**
- **Taille totale** : < 1MB
- **Chunks individuels** : < 500KB
- **CSS** : < 100KB

## 🐛 Troubleshooting

### **Bundle trop lourd**
1. Analyser avec `npm run analyze:performance`
2. Identifier les chunks les plus lourds
3. Activer le tree shaking
4. Utiliser le code splitting

### **LCP trop lent**
1. Optimiser les images (WebP, lazy loading)
2. Precharger les ressources critiques
3. Optimiser le CSS critique
4. Utiliser un CDN

### **FID trop élevé**
1. Réduire le JavaScript initial
2. Déferrer les scripts non critiques
3. Optimiser les événements
4. Utiliser le code splitting

### **CLS élevé**
1. Définir les dimensions des images
2. Éviter les contenus dynamiques
3. Utiliser `font-display: swap`
4. Précharger les polices

## 🚀 Optimisations Futures

### **À Implémenter**
- [ ] Service Worker pour cache avancé
- [ ] CDN pour les assets statiques
- [ ] Lighthouse CI dans le pipeline
- [ ] Real User Monitoring (RUM)
- [ ] Performance budgets
- [ ] Error tracking avancé
- [ ] Resource hints (dns-prefetch, preconnect)
- [ ] Critical CSS inlining
- [ ] Font optimization (font-display: swap)
- [ ] HTTP/2 Server Push

### **Monitoring Avancé**
- [ ] Web Vitals API
- [ ] Performance Observer
- [ ] Long Tasks API
- [ ] Memory API
- [ ] Network Information API

## 📞 Support

Pour toute question sur l'optimisation des performances :
- 📧 Email : contact@archiatech.com
- 📱 Téléphone : +33 7 83 82 93 10
- 🌐 Site : https://archiatech.com

---

**Version :** 1.0.0  
**Dernière mise à jour :** Décembre 2023  
**Auteur :** ArchiAtech Team
