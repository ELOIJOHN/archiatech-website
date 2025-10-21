# 📹 Documentation des Vidéos ArchiAtech

## Vidéos Actuellement Utilisées

### Vidéo Hero (Page d'accueil)
- **Fichier** : `archiatech-hero.mp4`
- **Taille** : 1.9MB
- **Statut** : ✅ Optimisée
- **Utilisation** : HeroSection background

### Vidéos Services (3 × 8KB)
- `service-automation.mp4` - Automatisation des workflows
- `service-ia-integration.mp4` - Intégration IA
- `service-it-support.mp4` - Support IT
- **Statut** : ✅ Optimisées (très légères)

### Vidéos Veille IA (Section démo)
- `20251011_2138_SupportIT.mp4` (5.1MB)
- `20251011_2242_Conseil_Integration IA.mp4` (6.5MB)
- `20251011_2259_Automatisation Workflows.mp4` (5.3MB)
- `20251011_2313_NoCode_LowCode.mp4` (5.0MB)
- `20251011_2323_Formation_Accompagnement.mp4` (4.4MB)
- `20251011_2325_Transformation Digital.mp4` (5.4MB)
- **Total** : ~32MB
- **Statut** : ⚠️ À optimiser

## Recommandations d'Optimisation

### 1. Conversion WebM (Priorité Haute)
```bash
# Installer FFmpeg si nécessaire
brew install ffmpeg

# Convertir en WebM (meilleure compression)
for file in public/videos/202510*.mp4; do
  ffmpeg -i "$file" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${file%.mp4}.webm"
done
```

**Gain estimé** : -50% de taille (~16MB au lieu de 32MB)

### 2. Lazy Loading Vidéos
Les vidéos utilisent déjà le lazy loading via les composants :
- `LazyVideo.jsx`
- `SmartVideo.jsx`
- `SimpleLazyVideo.jsx`

### 3. Preload Strategy
```html
<!-- Ajouté dans index.html -->
<link rel="preload" href="/videos/archiatech-hero.mp4" as="video" type="video/mp4">
```

### 4. Compression H.265/HEVC (Alternative)
```bash
# Meilleure qualité, mais support navigateur limité
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset medium output.mp4
```

## Vidéos Archivées
Les anciennes vidéos de test ont été déplacées vers `public/videos/_archive/` :
- `simple-test.mp4`
- `test-video.mp4`
- `working-test.mp4`
- `archiatech-hero_old.mp4`

## Bonnes Pratiques

### Format Vidéo Optimal
```html
<video>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la balise vidéo.
</video>
```

### Paramètres Recommandés
- **Résolution** : 1920×1080 max (1280×720 pour mobile)
- **Bitrate** : 2-4 Mbps pour vidéo de fond
- **FPS** : 30fps (24fps pour cinématique)
- **Format** : WebM (VP9) + MP4 (H.264) fallback

### Lazy Loading
```jsx
<video loading="lazy" preload="metadata">
  {/* Sources */}
</video>
```

## Performances Actuelles
- **Total vidéos** : 10 fichiers (39MB)
- **Vidéos Hero** : 1.9MB (bon)
- **Vidéos Services** : 24KB (excellent)
- **Vidéos Veille** : 32MB (à optimiser)

## Actions Recommandées
- [ ] Convertir vidéos 2025* en WebM
- [ ] Réduire résolution mobile à 720p
- [ ] Implémenter picture-in-picture pour démos
- [ ] Ajouter thumbnails statiques (JPEG) pour preview
- [ ] Considérer CDN pour hébergement vidéos
