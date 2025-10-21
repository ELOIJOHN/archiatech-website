# 📧 Formulaire de Contact ArchiAtech

## 🎯 Fonctionnalités

✅ **Envoi d'email automatique** vers `contact@archiatech.fr`  
✅ **Validation côté client** (email, champs obligatoires)  
✅ **Animation de chargement** pendant l'envoi  
✅ **Messages de confirmation** (succès/erreur)  
✅ **Protection anti-spam** (honeypot)  
✅ **Design responsive** et moderne  
✅ **Pop-up modal** avec coordonnées de contact  

## 🚀 Installation

### 1. Configuration du serveur
Le script PHP nécessite un serveur web avec PHP activé :
- **Apache/Nginx** + **PHP 7.4+**
- **Fonction mail()** activée
- **Extensions** : `filter`, `json`

### 2. Configuration email
Modifiez dans `send-mail.php` :
```php
$to = 'contact@archiatech.fr';  // Votre email
$from = 'noreply@archiatech.fr'; // Email expéditeur
```

### 3. Test du formulaire
1. Ouvrez `test-form.html` dans votre navigateur
2. Remplissez et soumettez le formulaire
3. Vérifiez la réception de l'email

## 📁 Fichiers créés

### Backend
- **`send-mail.php`** - Script d'envoi d'email avec validation
- **`test-form.html`** - Formulaire de test standalone

### Frontend (React)
- **`ContactSection.jsx`** - Composant formulaire modifié
- **`index.css`** - Styles pour animations et messages

## 🎨 Design

### Couleurs
- **Rouge principal** : `#E53935`
- **Fond** : Dégradé noir → rouge
- **Texte** : Blanc avec nuances de gris

### Animations
- **Fade-in** : Messages de statut
- **Loading spinner** : Bouton pendant l'envoi
- **Hover effects** : Transformations douces

## 📧 Format d'email

### Sujet
```
[ArchiAtech] Nouvelle demande de contact
```

### Corps (HTML + texte)
```
Nom : [Nom complet]
Email : [Adresse email]
Société : [Nom de l'entreprise]
Message : [Message du visiteur]

Date d'envoi : [Date/Heure]
Envoyé depuis le site web ArchiAtech
```

## 🔒 Sécurité

### Protection anti-spam
- **Honeypot** : Champ caché détectant les bots
- **Validation** : Côté client et serveur
- **Sanitisation** : `htmlspecialchars()` pour XSS

### Validation
- **Email** : Format RFC compliant
- **Champs obligatoires** : Nom, email, message
- **Longueur** : Limites raisonnables

## 🐛 Dépannage

### Email non reçu
1. Vérifiez la configuration PHP `mail()`
2. Consultez les logs du serveur
3. Testez avec un autre email

### Erreur 500
1. Vérifiez les permissions PHP
2. Activez les extensions nécessaires
3. Consultez les logs d'erreur

### Validation échoue
1. Vérifiez le format email
2. Assurez-vous que tous les champs obligatoires sont remplis
3. Consultez la console navigateur

## 🚀 Utilisation

### Dans React
```jsx
// Le formulaire est déjà intégré dans ContactSection.jsx
// Aucune configuration supplémentaire nécessaire
```

### En standalone
```html
<!-- Utilisez test-form.html comme référence -->
<form id="contactForm">
  <!-- Champs du formulaire -->
</form>
```

## 📱 Responsive

- **Mobile** : Layout vertical, padding adaptatif
- **Tablet** : Grille 2 colonnes pour nom/email
- **Desktop** : Layout optimisé, effets hover

## 🔧 Personnalisation

### Modifier les couleurs
```css
/* Dans index.css */
.btn-contact-primary {
  background: linear-gradient(135deg, #VOTRE_COULEUR 0%, #VOTRE_COULEUR_FONCEE 100%);
}
```

### Modifier l'email de destination
```php
// Dans send-mail.php
$to = 'votre-email@domaine.com';
```

### Ajouter des champs
1. Ajoutez le champ dans le formulaire HTML
2. Modifiez la validation JavaScript
3. Mettez à jour le script PHP

## 📞 Support

Pour toute question ou problème :
- **Email** : contact@archiatech.fr
- **Téléphone** : +33 (0)7 82 83 93 10

---

**ArchiAtech – Digital Solutions**  
*Bâtissez l'avenir de votre entreprise avec l'IA* 🚀
