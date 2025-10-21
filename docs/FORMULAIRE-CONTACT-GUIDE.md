# 📧 Guide du Formulaire de Contact - ArchiAtech

## 🎯 Vue d'ensemble

Le formulaire de contact ArchiAtech est un composant React moderne et fonctionnel qui permet aux visiteurs de prendre contact avec l'équipe. Il intègre validation en temps réel, envoi d'emails, tracking analytics et accessibilité complète.

## ✨ Fonctionnalités

### 🔍 **Validation en Temps Réel**
- Validation des champs au fur et à mesure de la saisie
- Messages d'erreur contextuels et visuels
- Validation côté client et serveur

### 📨 **Envoi d'Emails**
- Email automatique à ArchiAtech avec toutes les informations
- Email de confirmation au client
- Templates HTML professionnels
- Support Gmail et SMTP personnalisé

### 📊 **Analytics & Tracking**
- Google Analytics 4 intégré
- Tracking des événements de formulaire
- Métriques de conversion

### ♿ **Accessibilité (WCAG 2.1)**
- Labels ARIA complets
- Navigation clavier
- Contraste optimisé
- Screen readers friendly

### 🎨 **Design Responsive**
- Design moderne avec glassmorphism
- Animations fluides
- Mobile-first approach
- États visuels (loading, success, error)

## 🏗️ Architecture

### **Frontend (React)**
```
src/
├── components/
│   └── ContactForm.jsx          # Composant principal
└── services/
    └── contactAPI.js            # Service API et validation
```

### **Backend (Node.js)**
```
backend/
├── server.js                    # Serveur Express
├── package.json                 # Dépendances
├── env.example                  # Configuration
└── start.sh                     # Script de démarrage
```

## 🚀 Installation & Configuration

### **1. Frontend (Déjà intégré)**
Le formulaire est déjà intégré dans `App-complete.jsx` et prêt à utiliser.

### **2. Backend (Optionnel mais recommandé)**

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Configurer l'environnement
cp env.example .env
# Éditer .env avec vos paramètres email

# Démarrer le serveur
./start.sh dev
```

### **3. Configuration Email**

#### **Option A: Gmail (Recommandé)**
```env
GMAIL_USER=votre-email@gmail.com
GMAIL_PASS=votre-mot-de-passe-app
```

**Pour obtenir un mot de passe d'application Gmail :**
1. Allez dans votre compte Google
2. Sécurité > Authentification à 2 facteurs
3. Mots de passe des applications
4. Générez un mot de passe pour "Mail"

#### **Option B: SMTP Personnalisé**
```env
SMTP_HOST=smtp.votre-domaine.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@votre-domaine.com
SMTP_PASS=votre-mot-de-passe
```

## 📋 Champs du Formulaire

### **Champs Obligatoires**
- **Nom complet** : 2-100 caractères
- **Email** : Format email valide
- **Message** : 10-2000 caractères

### **Champs Optionnels**
- **Téléphone** : Format français
- **Entreprise** : Nom de l'entreprise
- **Service** : Dropdown avec services ArchiAtech

### **Services Disponibles**
- Support & Déploiement IT
- Conseil & Intégration IA
- Automatisation Workflows
- Solutions No-Code / Low-Code
- Formation & Accompagnement
- Transformation Digitale
- Audit gratuit

## 🔧 API Endpoints

### **POST /api/contact**
Envoie un message de contact.

**Request Body:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@exemple.com",
  "phone": "06 12 34 56 78",
  "company": "Mon Entreprise",
  "service": "conseil-ia",
  "message": "Bonjour, j'aimerais..."
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Message envoyé avec succès",
  "data": {
    "id": "msg_1703123456789",
    "timestamp": "2023-12-21T10:30:00.000Z"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Données invalides",
  "errors": [
    {
      "field": "email",
      "message": "Format d'email invalide"
    }
  ]
}
```

### **GET /api/health**
Vérifie la santé de l'API.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-21T10:30:00.000Z",
  "version": "1.0.0"
}
```

## 🎨 Personnalisation

### **Modifier les Services**
Éditez le tableau `services` dans `ContactForm.jsx` :

```javascript
const services = [
  { value: '', label: 'Sélectionnez un service' },
  { value: 'nouveau-service', label: 'Nouveau Service' },
  // ...
];
```

### **Modifier les Templates Email**
Éditez les templates HTML dans `backend/server.js` :
- `adminMailOptions.html` : Email pour ArchiAtech
- `clientMailOptions.html` : Email de confirmation client

### **Modifier les Couleurs**
Les couleurs sont définies via Tailwind CSS :
- Fond : `bg-gradient-to-br from-red-600 via-red-700 to-red-900`
- Champs : `bg-white/10 border-white/20`
- Bouton : `bg-white text-red-700`

## 📊 Analytics & Tracking

### **Événements Trackés**
- `form_submit_start` : Début de soumission
- `form_submit_success` : Soumission réussie
- `form_submit_error` : Erreur de soumission
- `form_validation_error` : Erreur de validation
- `click_email` : Clic sur email
- `click_phone` : Clic sur téléphone

### **Données Trackées**
- Service sélectionné
- Présence du téléphone/entreprise
- Longueur du message
- Type d'erreur

## 🔒 Sécurité

### **Rate Limiting**
- 5 requêtes par IP par 15 minutes
- Protection contre le spam

### **Validation**
- Validation côté client et serveur
- Sanitisation des données
- Protection XSS

### **CORS**
- Origines autorisées configurées
- Credentials sécurisés

## 🐛 Debug & Troubleshooting

### **Problèmes Courants**

#### **Email ne s'envoie pas**
1. Vérifiez la configuration `.env`
2. Testez avec Gmail en premier
3. Vérifiez les logs du serveur
4. Testez l'endpoint `/api/health`

#### **Formulaire ne se soumet pas**
1. Ouvrez la console du navigateur
2. Vérifiez les erreurs de validation
3. Vérifiez la connexion API
4. Testez en mode développement

#### **Erreurs de validation**
1. Vérifiez le format des données
2. Consultez les règles de validation
3. Testez avec des données valides

### **Logs**
```bash
# Logs du serveur backend
tail -f backend/logs/app.log

# Logs du navigateur
F12 > Console
```

## 🚀 Déploiement

### **Frontend**
Le formulaire est déjà intégré et se déploie avec le site.

### **Backend**
```bash
# Production
cd backend
NODE_ENV=production npm start

# Avec PM2
pm2 start server.js --name "archiatech-api"

# Docker (optionnel)
docker build -t archiatech-api .
docker run -p 3001:3001 archiatech-api
```

## 📈 Optimisations Futures

### **Fonctionnalités à Ajouter**
- [ ] Base de données pour stocker les messages
- [ ] Dashboard admin pour voir les messages
- [ ] Templates email personnalisables
- [ ] Intégration CRM (HubSpot, Salesforce)
- [ ] Chatbot intelligent
- [ ] Calendrier de rendez-vous
- [ ] SMS de confirmation
- [ ] Webhooks pour intégrations

### **Performance**
- [ ] Cache des validations
- [ ] Compression des emails
- [ ] CDN pour les assets
- [ ] Monitoring avancé

## 📞 Support

Pour toute question sur le formulaire de contact :
- 📧 Email : contact@archiatech.com
- 📱 Téléphone : +33 7 83 82 93 10
- 🌐 Site : https://archiatech.com

---

**Version :** 1.0.0  
**Dernière mise à jour :** Décembre 2023  
**Auteur :** ArchiAtech Team
