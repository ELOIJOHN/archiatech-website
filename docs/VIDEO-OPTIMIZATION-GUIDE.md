# 📹 Guide d'Optimisation des Vidéos - ArchiAtech

## 🎯 Vue d'ensemble

L'optimisation des vidéos est cruciale pour les performances du site ArchiAtech. Ce guide couvre les composants de lazy loading vidéo et les bonnes pratiques d'optimisation.

## ✨ Composants Disponibles

### **1. SimpleLazyVideo** (Recommandé)

Composant simplifié et robuste pour le lazy loading des vidéos.

```jsx
import SimpleLazyVideo from './components/SimpleLazyVideo';

// Vidéo hero (priorité haute)
<SimpleLazyVideo
  src="/videos/hero-video.mp4"
  className="w-full h-full object-cover"
  priority={true}          // Charge immédiatement
  autoPlay={true}
  loop={true}
  muted={true}
  playsInline={true}
/>

// Vidéo section (lazy loading)
<SimpleLazyVideo
  src="/videos/section-video.mp4"
  poster="/images/video-poster.jpg"
  className="w-full h-64 object-cover"
  priority={false}         // Lazy loading
  controls={true}
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
- `priority` (boolean) : Charge immédiatement si true

#### **Fonctionnalités**
- ✅ Lazy loading avec IntersectionObserver
- ✅ Placeholder pendant chargement
- ✅ Transition d'opacité fluide
- ✅ Pas de pause automatique (plus simple)
- ✅ Compatible Fast Refresh

### **2. LazyVideo** (Avancé)

Version plus avancée avec pause automatique (à utiliser avec précaution).

```jsx
import LazyVideo from './components/LazyVideo';

<LazyVideo
  src="/videos/demo.mp4"
  autoPlay={true}
  loop={true}
  muted={true}
/>
```

⚠️ **Note** : Ce composant peut causer des conflits avec Fast Refresh.

## 🎨 Bonnes Pratiques

### **1. Utiliser priority=true pour les vidéos critiques**

```jsx
// ✅ Bon : Vidéo hero charge immédiatement
<SimpleLazyVideo
  src="/videos/hero.mp4"
  priority={true}
  autoPlay={true}
/>

// ✅ Bon : Vidéos sections en lazy loading
<SimpleLazyVideo
  src="/videos/section.mp4"
  priority={false}  // Lazy loading
/>
```

### **2. Spécifier les attributs nécessaires**

```jsx
// ✅ Bon : Tous les attributs pour autoplay
<SimpleLazyVideo
  src="/videos/hero.mp4"
  autoPlay={true}
  loop={true}
  muted={true}        // Requis pour autoplay
  playsInline={true}  // Requis pour mobile
/>
```

### **3. Ajouter une image poster**

```jsx
// ✅ Bon : Image poster pour UX
<SimpleLazyVideo
  src="/videos/demo.mp4"
  poster="/images/video-poster.jpg"
  className="w-full h-64 object-cover"
/>
```

### **4. Optimiser les tailles de vidéos**

```jsx
// Mobile : vidéo plus légère
<SimpleLazyVideo
  src="/videos/hero-mobile.mp4"
  className="md:hidden"
/>

// Desktop : vidéo haute qualité
<SimpleLazyVideo
  src="/videos/hero-desktop.mp4"
  className="hidden md:block"
/>
```

## 📊 Optimisation des Fichiers Vidéo

### **Format Recommandé**
- **Container** : MP4
- **Codec vidéo** : H.264
- **Codec audio** : AAC
- **Résolution** : 1920x1080 (desktop), 1280x720 (mobile)
- **Bitrate** : 2-4 Mbps (desktop), 1-2 Mbps (mobile)

### **Compression**
```bash
# Avec FFmpeg
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# Optimisation mobile
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -vf scale=1280:720 -c:a aac -b:a 96k mobile.mp4
```

### **Tailles Recommandées**
- **Hero video** : < 5MB
- **Section videos** : < 3MB
- **Demo videos** : < 2MB

## 🐛 Troubleshooting

### **Vidéo ne se charge pas**
1. Vérifiez le chemin du fichier
2. Vérifiez que le fichier existe dans `public/videos/`
3. Testez avec `priority={true}`
4. Consultez la console du navigateur

### **Autoplay ne fonctionne pas**
1. Ajoutez `muted={true}`
2. Ajoutez `playsInline={true}`
3. Vérifiez les politiques du navigateur

### **Performance lente**
1. Compressez les vidéos
2. Utilisez des résolutions adaptées
3. Activez le lazy loading (`priority={false}`)

## 📈 Métriques de Performance

### **Avant Optimisation**
- Toutes les vidéos se chargent immédiatement
- Bande passante gaspillée
- Temps de chargement initial élevé

### **Après Optimisation**
- Lazy loading actif (sauf hero)
- Économie de bande passante
- Chargement progressif

### **Objectifs**
- ✅ Hero video : < 3s de chargement
- ✅ Section videos : < 1s (lazy loading)
- ✅ Total videos : < 10MB initial

## 🚀 Optimisations Futures

### **À Implémenter**
- [ ] Compression automatique des vidéos
- [ ] Formats modernes (WebM, AV1)
- [ ] Streaming adaptatif
- [ ] CDN pour vidéos
- [ ] Preload intelligent
- [ ] Analytics des vidéos

### **Monitoring**
- [ ] Temps de chargement des vidéos
- [ ] Taux d'abandon des vidéos
- [ ] Qualité de lecture
- [ ] Bandwidth usage

## 📞 Support

Pour toute question sur l'optimisation des vidéos :
- 📧 Email : contact@archiatech.com
- 📱 Téléphone : +33 7 83 82 93 10
- 🌐 Site : https://archiatech.com

---

**Version :** 1.0.0  
**Dernière mise à jour :** Décembre 2023  
**Auteur :** ArchiAtech Team
