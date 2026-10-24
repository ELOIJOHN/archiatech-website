# Configuration de l'Agent IA ArchiAgent avec LLM

## 🤖 Présentation

ArchiAgent est maintenant connecté à un Large Language Model (LLM) pour des conversations intelligentes et personnalisées. Le système supporte :

- **OpenAI GPT** (GPT-4, GPT-3.5-turbo)
- **Anthropic Claude** (Claude 3 Opus, Sonnet, Haiku)
- **Mode Local** (fallback sans API, réponses basées sur des règles)

## 📋 Configuration

### 1. Créer le fichier `.env`

Copiez le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

### 2. Choisir un provider

#### Option A : Mode Local (Gratuit, par défaut)

Pas besoin de clé API, utilise des réponses basées sur des règles.

```env
VITE_LLM_PROVIDER=local
```

**Avantages :**
- ✅ Gratuit
- ✅ Aucune configuration requise
- ✅ Fonctionne offline

**Inconvénients :**
- ❌ Réponses limitées et scriptées
- ❌ Pas de vraie compréhension du contexte

#### Option B : OpenAI GPT (Recommandé)

**Étapes :**

1. Créer un compte sur [OpenAI Platform](https://platform.openai.com/)
2. Générer une clé API : [API Keys](https://platform.openai.com/api-keys)
3. Ajouter des crédits à votre compte (min 5$)

```env
VITE_LLM_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
VITE_LLM_MODEL=gpt-3.5-turbo
```

**Modèles disponibles :**
- `gpt-4` : Le plus intelligent (~$0.03/1K tokens)
- `gpt-3.5-turbo` : Rapide et économique (~$0.001/1K tokens) ⭐ Recommandé
- `gpt-4-turbo` : Bon compromis (~$0.01/1K tokens)

**Avantages :**
- ✅ Excellente compréhension du contexte
- ✅ Réponses naturelles et pertinentes
- ✅ Grande base de connaissances

**Coût estimé :**
- 100 conversations (10 messages chacune) ≈ $0.10 - $0.50

#### Option C : Anthropic Claude

**Étapes :**

1. Créer un compte sur [Anthropic Console](https://console.anthropic.com/)
2. Générer une clé API
3. Ajouter des crédits

```env
VITE_LLM_PROVIDER=anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
VITE_LLM_MODEL=claude-3-sonnet-20240229
```

**Modèles disponibles :**
- `claude-3-opus-20240229` : Le plus puissant
- `claude-3-sonnet-20240229` : Équilibré ⭐ Recommandé
- `claude-3-haiku-20240307` : Rapide et économique

**Avantages :**
- ✅ Excellent en français
- ✅ Fenêtre de contexte très large (200K tokens)
- ✅ Bonne compréhension des nuances

## 🚀 Utilisation

### Démarrer le serveur de développement

```bash
npm run dev
```

### Tester ArchiAgent

1. Ouvrez votre navigateur sur `http://localhost:5173/archiatech-website/`
2. Cliquez sur le bouton rouge en bas à droite
3. Commencez une conversation !

## 🔧 Personnalisation

### Modifier le prompt système

Éditez le fichier `src/services/llmService.js` :

```javascript
const SYSTEM_PROMPT = `Tu es Archi, l'assistant IA expert d'ArchiAtech...`;
```

### Ajuster les paramètres

```javascript
const LLM_CONFIG = {
  temperature: 0.7,    // 0-1 : créativité (0 = précis, 1 = créatif)
  maxTokens: 500      // Longueur max de la réponse
};
```

## 📊 Surveillance des coûts

### OpenAI

Consultez votre usage sur : [OpenAI Usage](https://platform.openai.com/usage)

### Anthropic

Consultez votre usage sur : [Anthropic Console](https://console.anthropic.com/)

## 🔒 Sécurité

⚠️ **IMPORTANT** : Ne commitez JAMAIS votre fichier `.env` avec vos clés API !

Le fichier `.gitignore` contient déjà :
```
.env
.env.local
```

### En production (sur GitHub Pages)

Pour déployer sur GitHub Pages avec une API :

1. **NE PAS** mettre la clé API dans le `.env` (elle serait exposée côté client)
2. **Créer un backend** (Firebase Functions, Vercel Serverless, etc.) qui appelle l'API
3. Le frontend appelle votre backend sécurisé

**Alternative simple :** Utilisez le mode `local` en production pour éviter les coûts et les risques de sécurité.

## 🐛 Dépannage

### Erreur "API key not found"

Vérifiez que :
- Le fichier `.env` existe à la racine du projet
- La clé commence par `VITE_` (requis par Vite)
- Vous avez redémarré le serveur de développement après modification du `.env`

### Erreur "Insufficient credits"

Ajoutez des crédits à votre compte OpenAI/Anthropic.

### Réponses lentes

- Utilisez `gpt-3.5-turbo` au lieu de `gpt-4`
- Réduisez `maxTokens` dans `llmService.js`

### Mode local ne répond pas bien

C'est normal, le mode local utilise des réponses scriptées. Pour de vraies conversations IA, configurez OpenAI ou Anthropic.

## 📚 Ressources

- [Documentation OpenAI](https://platform.openai.com/docs)
- [Documentation Anthropic](https://docs.anthropic.com/)
- [Tarifs OpenAI](https://openai.com/pricing)
- [Tarifs Anthropic](https://www.anthropic.com/pricing)

## 🎯 Prochaines améliorations

- [ ] Intégration avec un backend sécurisé
- [ ] Mémorisation de contexte entre sessions
- [ ] Support de fichiers joints
- [ ] Analytics des conversations
- [ ] A/B testing des prompts
