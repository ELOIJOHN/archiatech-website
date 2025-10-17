/**
 * Service de connexion au LLM (Large Language Model)
 * Supporte OpenAI GPT et Anthropic Claude
 */

// Configuration - À remplacer par vos clés API
const LLM_CONFIG = {
  provider: 'openai', // 'openai' ou 'anthropic' ou 'local'
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  model: 'gpt-4', // ou 'gpt-3.5-turbo' pour OpenAI, 'claude-3-sonnet-20240229' pour Anthropic
  temperature: 0.7,
  maxTokens: 500
};

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
 * Appel à l'API OpenAI
 */
async function callOpenAI(messages) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LLM_CONFIG.apiKey}`
    },
    body: JSON.stringify({
      model: LLM_CONFIG.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: LLM_CONFIG.temperature,
      max_tokens: LLM_CONFIG.maxTokens
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Appel à l'API Anthropic Claude
 */
async function callAnthropic(messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': LLM_CONFIG.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: LLM_CONFIG.model,
      system: SYSTEM_PROMPT,
      messages: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      temperature: LLM_CONFIG.temperature,
      max_tokens: LLM_CONFIG.maxTokens
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
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
  try {
    // Si pas de clé API configurée, utiliser le fallback local
    if (!LLM_CONFIG.apiKey || LLM_CONFIG.provider === 'local') {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      return localResponse(lastMessage.content);
    }

    // Appeler l'API appropriée
    if (LLM_CONFIG.provider === 'openai') {
      return await callOpenAI(conversationHistory);
    } else if (LLM_CONFIG.provider === 'anthropic') {
      return await callAnthropic(conversationHistory);
    } else {
      throw new Error('Provider non supporté');
    }
  } catch (error) {
    console.error('Erreur LLM:', error);

    // En cas d'erreur, utiliser le fallback local
    const lastMessage = conversationHistory[conversationHistory.length - 1];
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
