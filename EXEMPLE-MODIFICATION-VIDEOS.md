# 🎬 Guide : Comment Changer les Vidéos YouTube

## 📍 Fichier à Modifier
`src/components/YouTubePlayerSimple.jsx` (lignes 8-26)

## 🔧 Structure Actuelle
```javascript
const videos = [
  {
    id: 'dQw4w9WgXcQ', // ← Remplacez par votre ID YouTube
    title: 'ArchiAtech - Solutions IA & Automatisation',
    description: 'Découvrez nos solutions d\'intelligence artificielle pour votre entreprise',
    duration: '3:32'
  },
  // ... autres vidéos
];
```

## ✨ Exemple de Modification
```javascript
const videos = [
  {
    id: 'VOTRE_ID_VIDEO_1', // Remplacez par l'ID de votre première vidéo
    title: 'Votre Titre Vidéo 1',
    description: 'Description de votre première vidéo',
    duration: '5:20'
  },
  {
    id: 'VOTRE_ID_VIDEO_2', // Remplacez par l'ID de votre deuxième vidéo
    title: 'Votre Titre Vidéo 2',
    description: 'Description de votre deuxième vidéo',
    duration: '4:15'
  },
  {
    id: 'VOTRE_ID_VIDEO_3', // Remplacez par l'ID de votre troisième vidéo
    title: 'Votre Titre Vidéo 3',
    description: 'Description de votre troisième vidéo',
    duration: '6:30'
  }
];
```

## 🎯 Comment Obtenir l'ID YouTube
1. Allez sur YouTube et trouvez votre vidéo
2. Copiez l'URL : `https://www.youtube.com/watch?v=ABC123XYZ`
3. L'ID est : `ABC123XYZ` (la partie après `v=`)

## 📝 Étapes de Modification
1. Ouvrez `src/components/YouTubePlayerSimple.jsx`
2. Trouvez le tableau `videos` (ligne 8)
3. Remplacez les `id` par vos IDs YouTube
4. Modifiez les `title` et `description`
5. Sauvegardez le fichier
6. Rafraîchissez votre site web

## ⚠️ Important
- Les vidéos doivent être **publiques** sur YouTube
- Vérifiez que les IDs sont corrects
- Les miniatures se mettront à jour automatiquement
