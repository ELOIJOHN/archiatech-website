/**
 * Service de connexion au LLM (Large Language Model)
 * Supporte OpenAI GPT et Anthropic Claude
 */

// Configuration - Lecture depuis les variables d'environnement
// Endpoint HTTPS d'un backend contrôlé par ArchIAtech.
// Ne jamais placer une clé fournisseur dans une variable VITE_* : elle serait publique.
const ARCHIAGENT_API_URL = import.meta.env.VITE_ARCHIAGENT_API_URL || '';

// Contexte système pour ArchiAgent
const SYSTEM_PROMPT = `Tu es Archi, l'assistant IA expert d'ArchiAtech, une entreprise spécialisée dans l'intelligence artificielle et la transformation digitale.

## Ton rôle :
- Aider les visiteurs à comprendre les services d'ArchiAtech
- Répondre aux questions sur l'IA, l'automatisation, le no-code
- Qualifier les besoins des prospects
- Orienter vers les bonnes solutions

## Services d'ArchiAtech :
1. **Support & Déploiement IT** : Support technique 24/7 et déploiement sécurisé
2. **Conseil & Intégration IA** : Stratégie IA personnalisée et intégration
3. **Automatisation des Workflows** : Automatisation intelligente (+40% d'efficacité)
4. **Solutions No-Code/Low-Code** : Développement rapide sans code
5. **Formation & Accompagnement** : Formation des équipes aux technologies IA
6. **Transformation Digitale** : Accompagnement complet de la transformation

## Méthodologie Archi :
1. **Audit** : Analyse de l'écosystème actuel
2. **Stratégie** : Définition d'une roadmap personnalisée
3. **Déploiement** : Implémentation progressive
4. **Support** : Accompagnement continu

## Ton style de communication :
- Professionnel mais accessible
- Adapte ton langage au profil détecté (C-Level, Technique, Novice)
- Concis et précis (max 3-4 phrases)
- Pose des questions pour qualifier les besoins
- Utilise des exemples concrets

Réponds toujours en français.`;

/**
 * Appel à notre propre backend. Les secrets et les appels aux fournisseurs
 * doivent être gérés uniquement côté serveur.
 */
async function callSecureBackend(messages) {
  const url = new URL(ARCHIAGENT_API_URL, window.location.origin);
  if (url.origin !== window.location.origin && url.protocol !== 'https:') {
    throw new Error('ArchiAgent exige HTTPS pour un backend externe');
  }
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!response.ok) throw new Error('Service ArchiAgent indisponible');
  const data = await response.json();
  if (typeof data.reply !== 'string' || !data.reply.trim()) {
    throw new Error('Réponse ArchiAgent invalide');
  }
  return data.reply;
}

/**
 * Fallback local (règles basiques) si pas de clé API
 */
function localResponse(userMessage) {
  const messageLower = userMessage.toLowerCase();

  // Détection de mots-clés pour générer une réponse pertinente
  const keywords = {
    'prix|tarif|coût': "Nos tarifs sont adaptés à chaque projet. Je vous propose d'échanger avec notre équipe commerciale pour un devis personnalisé. Pouvez-vous me préciser votre budget approximatif ?",
    'automatisation|workflow': "L'automatisation des workflows peut vous faire gagner jusqu'à 40% de temps sur vos processus répétitifs. Quels sont les processus que vous souhaitez automatiser ?",
    'ia|intelligence artificielle': "Nos solutions IA s'adaptent à votre secteur d'activité. Recherchez-vous plutôt de l'analyse de données, de l'automatisation intelligente, ou du conseil stratégique ?",
    'no-code|low-code': "Le no-code/low-code permet de créer des applications 10x plus rapidement. Avez-vous un projet d'application spécifique en tête ?",
    'formation': "Nous proposons des formations personnalisées pour vos équipes. Combien de personnes souhaitez-vous former et sur quelles technologies ?",
    'contact|rdv|démo': "Excellent ! Je peux vous mettre en relation avec notre équipe. Quelle est votre disponibilité pour un premier échange de 30 minutes ?",
  };

  for (const [pattern, response] of Object.entries(keywords)) {
    if (new RegExp(pattern, 'i').test(messageLower)) {
      return response;
    }
  }

  return "Je suis là pour vous aider à trouver la solution parfaite pour votre transformation digitale. Pouvez-vous me préciser votre besoin principal : automatisation, IA, no-code, ou formation ?";
}

/**
 * Fonction principale pour générer une réponse
 * @param {Array} conversationHistory - Historique de la conversation [{role: 'user'|'assistant', content: '...'}]
 * @returns {Promise<string>} - Réponse générée par le LLM
 */
export async function generateLLMResponse(conversationHistory) {
  const lastMessage = conversationHistory[conversationHistory.length - 1];
  if (!lastMessage || typeof lastMessage.content !== 'string') return '';
  if (!ARCHIAGENT_API_URL) return localResponse(lastMessage.content);
  try {
    return await callSecureBackend(conversationHistory);
  } catch (error) {
    console.error('ArchiAgent : backend indisponible', error);
    return localResponse(lastMessage.content);
  }
}

/**
 * Fonction pour détecter le profil utilisateur (C-Level, Technical, Novice)
 * @param {string} message - Message de l'utilisateur
 * @returns {string|null} - Profil détecté
 */
export function detectUserProfile(message) {
  const messageLower = message.toLowerCase();

  // C-Level indicators
  const cLevelKeywords = ['roi', 'croissance', 'stratégie', 'décision', 'budget', 'investissement', 'performance', 'efficacité', 'directeur', 'ceo', 'cto', 'cfo'];
  if (cLevelKeywords.some(keyword => messageLower.includes(keyword))) {
    return 'C-Level';
  }

  // Technical indicators
  const technicalKeywords = ['api', 'code', 'développement', 'technique', 'architecture', 'système', 'intégration', 'déploiement', 'programmation', 'algorithme'];
  if (technicalKeywords.some(keyword => messageLower.includes(keyword))) {
    return 'Technical';
  }

  // Novice indicators
  const noviceKeywords = ['comment', 'qu\'est-ce que', 'expliquer', 'simple', 'facile', 'débutant', 'apprendre', 'comprendre'];
  if (noviceKeywords.some(keyword => messageLower.includes(keyword))) {
    return 'Novice';
  }

  return null;
}

export default {
  generateLLMResponse,
  detectUserProfile
};
