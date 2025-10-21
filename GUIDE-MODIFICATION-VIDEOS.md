# 📹 Guide de Modification des Vidéos YouTube

## 🎯 Comment modifier la liste des vidéos

### **Fichier à modifier :** `src/components/YouTubeGrid.jsx`

### **Étape 1 : Ouvrir le fichier**
1. Naviguez vers `src/components/YouTubeGrid.jsx`
2. Ouvrez le fichier dans votre éditeur

### **Étape 2 : Localiser la section des vidéos**
Recherchez cette section (lignes 16-65) :
```javascript
const mockVideos = [
  {
    id: 'Dg3tAcyw0Us', // ← ID YouTube de la vidéo
    title: 'ArchiAtech - Solutions IA & Automatisation', // ← Titre affiché
    thumbnail: 'https://img.youtube.com/vi/Dg3tAcyw0Us/maxresdefault.jpg',
    publishedAt: '2024-01-15', // ← Date de publication
    duration: '3:32', // ← Durée de la vidéo
    viewCount: '1.2K' // ← Nombre de vues
  },
  // ... autres vidéos
];
```

### **Étape 3 : Modifier une vidéo**

#### **Pour remplacer une vidéo existante :**
```javascript
{
  id: 'VOTRE_ID_YOUTUBE', // Remplacez par l'ID de votre vidéo
  title: 'Votre Titre de Vidéo',
  thumbnail: 'https://img.youtube.com/vi/VOTRE_ID_YOUTUBE/maxresdefault.jpg',
  publishedAt: '2024-01-15',
  duration: '4:30',
  viewCount: '2.5K'
}
```

#### **Pour ajouter une nouvelle vidéo :**
Ajoutez un nouvel objet dans le tableau `mockVideos` :
```javascript
{
  id: 'NOUVEL_ID_YOUTUBE',
  title: 'Nouvelle Vidéo ArchiAtech',
  thumbnail: 'https://img.youtube.com/vi/NOUVEL_ID_YOUTUBE/maxresdefault.jpg',
  publishedAt: '2024-01-20',
  duration: '5:15',
  viewCount: '1.8K'
}
```

### **Étape 4 : Comment obtenir l'ID YouTube**

1. **Depuis l'URL YouTube :**
   - URL : `https://www.youtube.com/watch?v=ABC123DEF456`
   - ID : `ABC123DEF456`

2. **Depuis l'URL d'intégration :**
   - URL : `https://www.youtube.com/embed/ABC123DEF456`
   - ID : `ABC123DEF456`

### **Étape 5 : Sauvegarder et tester**
1. Sauvegardez le fichier
2. Rafraîchissez votre navigateur
3. Vérifiez que les nouvelles vidéos s'affichent

## 🔧 Configuration avancée

### **Utiliser l'API YouTube réelle :**
Pour utiliser vos vraies vidéos YouTube automatiquement :

1. **Obtenez une clé API YouTube :**
   - Allez sur [Google Cloud Console](https://console.cloud.google.com/)
   - Activez l'API YouTube Data v3
   - Créez une clé API

2. **Modifiez le fichier :**
   ```javascript
   const channelConfig = {
     channelId: 'VOTRE_CHANNEL_ID', // ID de votre chaîne
     apiKey: 'VOTRE_CLE_API', // Votre clé API
     maxResults: 6
   };
   ```

3. **Décommentez la ligne :**
   ```javascript
   fetchChannelVideos(); // Décommentez cette ligne
   ```

## 📝 Exemple complet

```javascript
const mockVideos = [
  {
    id: 'ABC123DEF456',
    title: 'Démonstration Support IT',
    thumbnail: 'https://img.youtube.com/vi/ABC123DEF456/maxresdefault.jpg',
    publishedAt: '2024-01-20',
    duration: '4:30',
    viewCount: '1.2K'
  },
  {
    id: 'XYZ789UVW012',
    title: 'Formation IA - Cas Pratique',
    thumbnail: 'https://img.youtube.com/vi/XYZ789UVW012/maxresdefault.jpg',
    publishedAt: '2024-01-18',
    duration: '6:15',
    viewCount: '2.1K'
  }
  // Ajoutez autant de vidéos que nécessaire
];
```

## ⚠️ Notes importantes

- **ID YouTube** : Doit être valide et correspondre à une vidéo publique
- **Miniatures** : L'URL `https://img.youtube.com/vi/ID/maxresdefault.jpg` fonctionne automatiquement
- **Format des dates** : Utilisez le format `YYYY-MM-DD`
- **Durée** : Format `MM:SS` ou `HH:MM:SS`
- **Vues** : Peut être un nombre ou une chaîne (ex: `'1.2K'`, `'500'`)

## 🚀 Test rapide

1. Modifiez une vidéo dans le fichier
2. Sauvegardez
3. Rafraîchissez `http://localhost:5173`
4. Vérifiez la section "Nos Vidéos"
