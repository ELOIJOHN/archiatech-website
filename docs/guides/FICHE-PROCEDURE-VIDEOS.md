# 📋 Fiche de Procédure : Modifier les Vidéos YouTube

## 🎯 **Objectif**
Permettre de modifier facilement les vidéos YouTube affichées sur le site ArchiAtech.

---

## 📁 **Fichier à Modifier**
- **Chemin :** `src/components/YouTubePlayerSimple.jsx`
- **Lignes concernées :** 7-26 (tableau `videos`)

---

## 🔧 **Étape 1 : Ouvrir le Fichier**

### **Méthode 1 : Via l'Explorateur**
1. Naviguez vers le dossier `src/components/`
2. Double-cliquez sur `YouTubePlayerSimple.jsx`
3. Le fichier s'ouvre dans votre éditeur de code

### **Méthode 2 : Via l'Éditeur de Code**
1. Ouvrez votre éditeur de code (VS Code, etc.)
2. Ouvrez le dossier du projet
3. Allez dans `src/components/YouTubePlayerSimple.jsx`

---

## 🔍 **Étape 2 : Localiser le Code à Modifier**

### **Rechercher :**
```javascript
const videos = [
```

### **Vous devriez voir :**
```javascript
// Vidéos YouTube - Vos vidéos ArchiAtech
const videos = [
  {
    id: 'Dg3tAcyw0Us', // Votre première vidéo
    title: 'ArchiAtech - Solutions IA & Automatisation',
    description: 'Découvrez nos solutions d\'intelligence artificielle pour votre entreprise',
    duration: '3:32'
  },
  {
    id: 'EOxdOEoFRZI', // Votre deuxième vidéo
    title: 'Automatisation No-Code avec ArchiAtech',
    description: 'Automatisez vos processus métier sans coder une seule ligne',
    duration: '4:15'
  },
  {
    id: 'lO2FsJ6q8qk', // Votre troisième vidéo
    title: 'Témoignages Clients - ROI IA',
    description: 'Nos clients témoignent de leurs résultats avec nos solutions IA',
    duration: '2:48'
  }
];
```

---

## ✏️ **Étape 3 : Modifier une Vidéo**

### **Structure d'une Vidéo :**
```javascript
{
  id: 'ID_YOUTUBE',           // ID de la vidéo YouTube
  title: 'Titre de la vidéo', // Titre affiché sur le site
  description: 'Description', // Description affichée
  duration: '3:32'            // Durée (optionnel)
}
```

### **Exemple de Modification :**

**AVANT :**
```javascript
{
  id: 'Dg3tAcyw0Us',
  title: 'ArchiAtech - Solutions IA & Automatisation',
  description: 'Découvrez nos solutions d\'intelligence artificielle pour votre entreprise',
  duration: '3:32'
}
```

**APRÈS :**
```javascript
{
  id: 'VOTRE_NOUVEL_ID',
  title: 'Mon Nouveau Titre',
  description: 'Ma nouvelle description',
  duration: '5:20'
}
```

---

## 🎬 **Étape 4 : Obtenir l'ID YouTube**

### **Méthode 1 : URL Complète**
1. Allez sur YouTube
2. Trouvez votre vidéo
3. Copiez l'URL : `https://www.youtube.com/watch?v=ABC123`
4. L'ID est : `ABC123` (après `v=`)

### **Méthode 2 : URL Courte**
1. URL courte : `https://youtu.be/ABC123`
2. L'ID est : `ABC123` (après le dernier `/`)

### **Exemples d'URLs :**
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`

---

## 💾 **Étape 5 : Sauvegarder**

### **Raccourcis Clavier :**
- **Windows/Linux :** `Ctrl + S`
- **Mac :** `Cmd + S`

### **Via Menu :**
1. Cliquez sur "Fichier" → "Enregistrer"
2. Ou cliquez sur l'icône de sauvegarde

---

## 🔄 **Étape 6 : Tester**

### **Ouvrir le Site :**
1. Allez sur : http://localhost:5173
2. Rafraîchissez la page : `F5` ou `Ctrl+R`

### **Vérifier :**
- ✅ La vidéo se charge
- ✅ Le titre est correct
- ✅ La description est correcte
- ✅ La thumbnail s'affiche

---

## ⚠️ **Points d'Attention**

### **Syntaxe JavaScript :**
- ✅ Gardez les accolades `{}`
- ✅ Gardez les virgules `,`
- ✅ Gardez les guillemets `""`
- ✅ Respectez l'indentation

### **Vidéos YouTube :**
- ✅ Les vidéos doivent être **publiques**
- ✅ Vérifiez que l'ID est correct
- ✅ Testez l'URL : `https://www.youtube.com/watch?v=VOTRE_ID`

### **Erreurs Courantes :**
- ❌ Oublier une virgule
- ❌ Oublier une accolade fermante
- ❌ Mauvais ID YouTube
- ❌ Vidéo privée

---

## 🚀 **Cas d'Usage**

### **Remplacer une Vidéo Existante :**
1. Trouvez la vidéo à remplacer
2. Changez l'`id`
3. Modifiez le `title` et `description`
4. Sauvegardez et testez

### **Ajouter une Nouvelle Vidéo :**
1. Ajoutez un nouvel objet `{}`
2. Remplissez les champs
3. N'oubliez pas la virgule après l'objet précédent
4. Sauvegardez et testez

### **Supprimer une Vidéo :**
1. Supprimez tout l'objet `{...}`
2. Supprimez la virgule de l'objet précédent
3. Sauvegardez et testez

---

## 🆘 **Dépannage**

### **Le Site Ne Se Met Pas à Jour :**
1. Vérifiez que vous avez sauvegardé
2. Rafraîchissez la page (`F5`)
3. Videz le cache du navigateur (`Ctrl+Shift+R`)

### **Erreur de Syntaxe :**
1. Vérifiez les accolades, virgules, guillemets
2. Utilisez un éditeur avec coloration syntaxique
3. Vérifiez l'indentation

### **Vidéo Ne Se Charge Pas :**
1. Vérifiez que l'ID YouTube est correct
2. Vérifiez que la vidéo est publique
3. Testez l'URL : `https://www.youtube.com/watch?v=VOTRE_ID`

---

## 📞 **Support**

### **En Cas de Problème :**
1. Vérifiez cette fiche de procédure
2. Testez avec une vidéo YouTube connue (ex: Rick Astley)
3. Contactez le support technique

### **Fichiers de Sauvegarde :**
- Gardez toujours une copie de sauvegarde
- Testez sur un fichier de test avant

---

## ✅ **Checklist de Validation**

Avant de finaliser :
- [ ] Le fichier est sauvegardé
- [ ] La syntaxe JavaScript est correcte
- [ ] L'ID YouTube est valide
- [ ] La vidéo est publique
- [ ] Le site se met à jour correctement
- [ ] Les titres et descriptions sont corrects

---

**🎉 Félicitations ! Vous savez maintenant modifier les vidéos vous-même !**
