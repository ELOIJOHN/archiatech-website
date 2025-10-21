# 📺 Guide d'Intégration YouTube API - ArchiAtech

## 🎯 Vue d'ensemble

Ce guide vous explique comment configurer l'API YouTube Data v3 pour afficher automatiquement les vidéos de votre chaîne @ArchiatechMedia sur votre site web.

## 🚀 Configuration de l'API YouTube

### **Étape 1 : Créer un projet Google Cloud**

1. **Accédez à Google Cloud Console**
   - Allez sur [console.cloud.google.com](https://console.cloud.google.com)

2. **Créez un nouveau projet**
   - Cliquez sur "Nouveau projet"
   - Nom : "ArchiAtech YouTube Integration"
   - Cliquez sur "Créer"

### **Étape 2 : Activer l'API YouTube Data v3**

1. **Naviguez vers les APIs**
   - Dans le menu, cliquez sur "APIs et services" > "Bibliothèque"

2. **Recherchez l'API YouTube**
   - Tapez "YouTube Data API v3"
   - Cliquez sur "YouTube Data API v3"
   - Cliquez sur "Activer"

### **Étape 3 : Créer une clé API**

1. **Générez une clé API**
   - Allez dans "APIs et services" > "Identifiants"
   - Cliquez sur "+ CRÉER DES IDENTIFIANTS"
   - Sélectionnez "Clé API"

2. **Configurez la clé**
   - Copiez la clé générée
   - (Optionnel) Restreignez la clé à votre domaine

## 🔧 Intégration dans votre Site

### **Étape 4 : Remplacer la clé API**

1. **Ouvrez le fichier** `src/components/YouTubeGridReal.jsx`

2. **Remplacez la clé API**
   ```javascript
   const channelConfig = {
     channelId: 'UCtwJ6pMNI5QndQGeJWwkvYA', // Votre ID de chaîne
     apiKey: 'VOTRE_VRAIE_CLE_API_ICI', // ← Remplacez ceci
     maxResults: 12
   };
   ```

3. **Activez l'appel API**
   ```javascript
   useEffect(() => {
     // Décommentez cette ligne pour utiliser l'API réelle
     fetchChannelVideos();
     
     // Commentez cette section de simulation
     // const mockVideos = [...]
   }, []);
   ```

### **Étape 5 : Remplacer le composant**

Dans `src/components/VeilleSection.jsx`, remplacez :

```javascript
import YouTubeGrid from './YouTubeGrid';
```

Par :

```javascript
import YouTubeGridReal from './YouTubeGridReal';
```

Et remplacez :

```javascript
<YouTubeGrid />
```

Par :

```javascript
<YouTubeGridReal />
```

## 🎨 Personnalisation

### **Modifier le nombre de vidéos affichées**

```javascript
const channelConfig = {
  channelId: 'UCtwJ6pMNI5QndQGeJWwkvYA',
  apiKey: 'VOTRE_CLE_API',
  maxResults: 20 // ← Changez ce nombre
};
```

### **Modifier l'ordre des vidéos**

```javascript
const url = `https://www.googleapis.com/youtube/v3/search?` +
  `key=${channelConfig.apiKey}&` +
  `channelId=${channelConfig.channelId}&` +
  `part=snippet&` +
  `order=viewCount&` + // ← Changez l'ordre ici
  `maxResults=${channelConfig.maxResults}&` +
  `type=video`;
```

**Options d'ordre disponibles :**
- `date` : Les plus récentes
- `viewCount` : Les plus vues
- `relevance` : Les plus pertinentes
- `title` : Par ordre alphabétique

## 🔒 Sécurité

### **Restriction de la clé API (Recommandé)**

1. **Dans Google Cloud Console**
   - Allez dans "APIs et services" > "Identifiants"
   - Cliquez sur votre clé API
   - Dans "Restrictions d'application", sélectionnez "Sites web HTTP"
   - Ajoutez votre domaine : `https://votresite.com`

2. **Restriction par API**
   - Dans "Restrictions d'API", sélectionnez "Restreindre la clé"
   - Ajoutez "YouTube Data API v3"

## 📊 Fonctionnalités Avancées

### **Ajouter des statistiques de vidéos**

Pour obtenir les vues et durées des vidéos, ajoutez un second appel API :

```javascript
const fetchVideoDetails = async (videoIds) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?` +
    `key=${channelConfig.apiKey}&` +
    `id=${videoIds.join(',')}&` +
    `part=contentDetails,statistics`;
    
  const response = await fetch(url);
  const data = await response.json();
  
  return data.items;
};
```

### **Filtrage par mots-clés**

```javascript
const url = `https://www.googleapis.com/youtube/v3/search?` +
  `key=${channelConfig.apiKey}&` +
  `channelId=${channelConfig.channelId}&` +
  `part=snippet&` +
  `order=date&` +
  `maxResults=${channelConfig.maxResults}&` +
  `type=video&` +
  `q=IA automatisation`; // ← Ajoutez vos mots-clés
```

## 🚨 Dépannage

### **Erreur 403 : Quota exceeded**

- L'API YouTube a des limites de quota
- Chaque requête consomme des "units"
- Solution : Réduisez la fréquence des appels ou utilisez le cache

### **Erreur 400 : Bad Request**

- Vérifiez votre clé API
- Vérifiez l'ID de votre chaîne
- Vérifiez les paramètres de l'URL

### **Pas de vidéos affichées**

- Vérifiez que votre chaîne a des vidéos publiques
- Vérifiez les paramètres de confidentialité des vidéos
- Vérifiez que l'API est bien activée

## 📞 Support

Pour toute question sur l'intégration YouTube :

- 📧 Email : contact@archiatech.com
- 📱 Téléphone : +33 7 83 82 93 10
- 🌐 Site : https://archiatech.com

---

**Version :** 1.0.0  
**Dernière mise à jour :** Décembre 2024  
**Auteur :** ArchiAtech Team
