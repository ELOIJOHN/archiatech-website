# 🖼️ Guide d'Optimisation des Images - ArchiAtech

## 🎯 Vue d'ensemble

L'optimisation des images est cruciale pour les performances du site ArchiAtech. Ce guide couvre tous les aspects de l'optimisation : formats modernes (WebP), lazy loading, compression et responsive images.

## ✨ Fonctionnalités Implémentées

### 📦 **Composants React**
- `OptimizedImage` : Images optimisées avec lazy loading
- `LazyVideo` : Vidéos avec chargement différé
- `OptimizedBackgroundImage` : Images de fond optimisées

### 🔧 **Outils**
- Script d'optimisation automatique (`scripts/optimize-images.mjs`)
- Plugin Vite pour build (`vite-plugin-image-optimizer.js`)
- Support Sharp pour compression avancée

### 🚀 **Optimisations**
- Conversion automatique en WebP
- Lazy loading natif + IntersectionObserver
- Placeholder blur pendant chargement
- Images responsives multi-tailles
- Compression progressive

## 🏗️ Architecture

```
archiatech-website/
├── src/
│   └── components/
│       ├── OptimizedImage.jsx       # Composant image optimisé
│       ├── LazyVideo.jsx            # Composant vidéo lazy
│       └── OptimizedBackgroundImage # Images de fond
├── scripts/
│   └── optimize-images.mjs          # Script d'optimisation
├── vite-plugin-image-optimizer.js   # Plugin Vite
└── public/
    ├── images/                      # Images sources
    └── images/optimized/            # Images optimisées
```

## 📚 Utilisation des Composants

### **1. OptimizedImage**

Composant pour les images statiques avec lazy loading automatique.

```jsx
import OptimizedImage from './components/OptimizedImage';

// Utilisation basique
<OptimizedImage
  src="/images/hero-image.jpg"
  alt="Description de l'image"
  className="w-full h-64 object-cover"
/>

// Avec options avancées
<OptimizedImage
  src="/images/hero-desktop.png"
  alt="Hero desktop"
  width={1920}
  height={1080}
  priority={true}                    // Charge immédiatement
  placeholder="blur"                 // Blur effect pendant chargement
  objectFit="cover"
  quality={85}
  onLoad={(e) => console.log('Loaded')}
/>
```

#### **Props**
- `src` (string, required) : Chemin de l'image
- `alt` (string, required) : Texte alternatif
- `className` (string) : Classes CSS
- `width` (number) : Largeur
- `height` (number) : Hauteur
- `priority` (boolean) : Charge immédiatement si true
- `objectFit` (string) : Mode d'ajustement ('cover', 'contain')
- `quality` (number) : Qualité 0-100
- `placeholder` (string) : Type de placeholder ('blur', 'empty')
- `onLoad` (function) : Callback au chargement

#### **Fonctionnalités**
- ✅ Conversion WebP automatique avec fallback
- ✅ Lazy loading natif + IntersectionObserver
- ✅ Placeholder blur pendant chargement
- ✅ Gestion d'erreurs gracieuse
- ✅ Optimisation automatique des performances

### **2. LazyVideo**

Composant pour les vidéos avec chargement différé et pause automatique.

```jsx
import LazyVideo from './components/LazyVideo';

// Vidéo avec lazy loading
<LazyVideo
  src="/videos/service-automation.mp4"
  poster="/images/video-poster.jpg"
  className="w-full h-full object-cover"
  autoPlay={true}
  loop={true}
  muted={true}
  playsInline={true}
/>

// Vidéo prioritaire (Hero)
<LazyVideo
  src="/videos/hero-video.mp4"
  priority={true}                    // Charge immédiatement
  className="w-full h-full object-cover"
/>
```

#### **Props**
- `src` (string, required) : Chemin de la vidéo
- `poster` (string) : Image de poster
- `className` (string) : Classes CSS
- `autoPlay` (boolean) : Lecture automatique
- `loop` (boolean) : Boucle
- `muted` (boolean) : Muet
- `playsInline` (boolean) : Lecture inline
- `controls` (boolean) : Afficher les contrôles
- `priority` (boolean) : Charge immédiatement

#### **Fonctionnalités**
- ✅ Chargement différé avec IntersectionObserver
- ✅ Pause automatique hors écran
- ✅ Play automatique à l'entrée dans le viewport
- ✅ Préchargement optimisé (metadata only)
- ✅ Économie de bande passante

### **3. OptimizedBackgroundImage**

Composant pour les images de fond optimisées.

```jsx
import { OptimizedBackgroundImage } from './components/OptimizedImage';

<OptimizedBackgroundImage
  src="/images/hero-background.jpg"
  className="h-screen"
  overlay={true}
  overlayOpacity={0.5}
>
  <div className="relative z-10">
    <h1>Contenu par-dessus l'image</h1>
  </div>
</OptimizedBackgroundImage>
```

## 🔧 Scripts d'Optimisation

### **Script Manuel**

Optimise toutes les images du dossier `public/images` :

```bash
npm run optimize:images
```

#### **Configuration**
Éditez `scripts/optimize-images.mjs` :

```javascript
const CONFIG = {
  inputDir: 'public/images',           // Dossier source
  outputDir: 'public/images/optimized', // Dossier sortie
  qualities: {
    webp: 85,                          // Qualité WebP
    jpeg: 85,                          // Qualité JPEG
    png: 90                            // Qualité PNG
  },
  sizes: [                             // Tailles responsives
    { name: 'thumbnail', width: 320 },
    { name: 'small', width: 640 },
    { name: 'medium', width: 1024 },
    { name: 'large', width: 1920 }
  ]
};
```

#### **Résultats**
- ✅ Conversion en WebP (économie ~30-50%)
- ✅ Compression optimale
- ✅ Versions responsives multiples
- ✅ Conservation format original optimisé

### **Plugin Vite (Build)**

Optimise automatiquement toutes les images lors du build.

Configuration dans `vite.config.js` :

```javascript
import imageOptimizer from './vite-plugin-image-optimizer.js';

export default defineConfig({
  plugins: [
    react(),
    imageOptimizer({
      quality: 85,              // Qualité de compression
      webp: true,               // Générer versions WebP
      responsive: false,        // Générer versions responsives
      sizes: [640, 1024, 1920]  // Tailles pour responsive
    })
  ]
});
```

## 📊 Formats d'Images

### **WebP**
- **Avantages** : 30-50% plus léger que JPEG/PNG
- **Support** : 95%+ des navigateurs modernes
- **Utilisation** : Automatique avec fallback

### **JPEG**
- **Utilisation** : Photos, images complexes
- **Compression** : Progressive, MozJPEG
- **Qualité recommandée** : 80-85

### **PNG**
- **Utilisation** : Logos, icônes, transparence
- **Compression** : Level 9
- **Qualité recommandée** : 90

## 🎨 Bonnes Pratiques

### **1. Choisir le Bon Format**
```jsx
// Photos → JPEG/WebP
<OptimizedImage src="/images/photo.jpg" />

// Logos/Icônes → PNG/SVG
<img src="/images/logo.svg" />  // SVG préféré pour icônes

// Vidéos courtes → MP4
<LazyVideo src="/videos/demo.mp4" />
```

### **2. Utiliser priority pour Images Critiques**
```jsx
// Image hero (above the fold)
<OptimizedImage 
  src="/images/hero.jpg" 
  priority={true}  // ⚠️ Charge immédiatement
/>

// Images below the fold
<OptimizedImage 
  src="/images/section.jpg" 
  priority={false}  // ✅ Lazy loading
/>
```

### **3. Spécifier width et height**
```jsx
// ✅ Bon : Évite le layout shift
<OptimizedImage 
  src="/images/product.jpg"
  width={800}
  height={600}
  alt="Produit"
/>

// ❌ Mauvais : Layout shift possible
<OptimizedImage 
  src="/images/product.jpg"
  alt="Produit"
/>
```

### **4. Optimiser les Tailles**
```jsx
// Mobile : 640px max
<OptimizedImage 
  src="/images/hero-mobile.jpg"
  className="md:hidden"
/>

// Desktop : 1920px max
<OptimizedImage 
  src="/images/hero-desktop.jpg"
  className="hidden md:block"
/>
```

## 📈 Métriques de Performance

### **Avant Optimisation**
- Hero image (desktop) : 1.8MB
- Hero image (mobile) : 829KB
- Total images : ~3.6MB
- Temps de chargement : ~8s (3G)

### **Après Optimisation**
- Hero image (desktop WebP) : 540KB (-70%)
- Hero image (mobile WebP) : 249KB (-70%)
- Total images : ~1.1MB (-69%)
- Temps de chargement : ~2.4s (3G)

### **Objectifs**
- ✅ Largest Contentful Paint (LCP) : < 2.5s
- ✅ First Input Delay (FID) : < 100ms
- ✅ Cumulative Layout Shift (CLS) : < 0.1
- ✅ Total images : < 1.5MB

## 🐛 Troubleshooting

### **Images ne se chargent pas**
1. Vérifiez le chemin relatif
2. Vérifiez que l'image existe dans `public/`
3. Consultez la console du navigateur
4. Testez avec `priority={true}`

### **WebP non supporté**
- Le fallback automatique gère les anciens navigateurs
- Vérifiez que l'image source existe

### **Vidéos ne jouent pas**
1. Vérifiez le format (MP4 recommandé)
2. Ajoutez `muted={true}` pour autoplay
3. Utilisez `priority={true}` pour vidéos critiques

### **Performances toujours lentes**
1. Exécutez `npm run optimize:images`
2. Vérifiez la taille des vidéos
3. Utilisez des CDN si possible
4. Compressez les vidéos (H.264, CRF 23)

## 🚀 Optimisations Futures

### **À Implémenter**
- [ ] CDN pour les images et vidéos
- [ ] Format AVIF (encore plus léger que WebP)
- [ ] Responsive images avec srcset
- [ ] Blurhash pour placeholders
- [ ] Service Worker pour cache avancé
- [ ] Compression vidéo automatique
- [ ] Images dynamiques (Cloudinary, Imgix)

### **Monitoring**
- [ ] Lighthouse CI dans pipeline
- [ ] Real User Monitoring (RUM)
- [ ] Alertes si images > 500KB
- [ ] Dashboard de métriques

## 📞 Support

Pour toute question sur l'optimisation des images :
- 📧 Email : contact@archiatech.com
- 📱 Téléphone : +33 7 83 82 93 10
- 🌐 Site : https://archiatech.com

---

**Version :** 1.0.0  
**Dernière mise à jour :** Décembre 2023  
**Auteur :** ArchiAtech Team
