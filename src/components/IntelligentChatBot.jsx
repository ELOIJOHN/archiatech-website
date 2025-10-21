import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Zap,
  Cpu,
  Cog,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const IntelligentChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    stage: 'greeting', // greeting, service_inquiry, contact_request, scheduling
    userIntent: null,
    collectedInfo: {}
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messages.length]);

  // Analyse de l'intention utilisateur avec IA simulée
  const analyzeUserIntent = (message) => {
    const text = message.toLowerCase();
    
    // Intentions détectées
    if (text.includes('automatisation') || text.includes('rpa') || text.includes('workflow')) {
      return 'service_automation';
    }
    if (text.includes('ia') || text.includes('intelligence artificielle') || text.includes('ai')) {
      return 'service_ai';
    }
    if (text.includes('support') || text.includes('it') || text.includes('déploiement')) {
      return 'service_support';
    }
    if (text.includes('prix') || text.includes('tarif') || text.includes('coût') || text.includes('budget')) {
      return 'pricing';
    }
    if (text.includes('démo') || text.includes('démonstration') || text.includes('rdv')) {
      return 'demo_request';
    }
    if (text.includes('contact') || text.includes('téléphone') || text.includes('email')) {
      return 'contact_info';
    }
    if (text.includes('salut') || text.includes('bonjour') || text.includes('hello')) {
      return 'greeting';
    }
    
    return 'general_inquiry';
  };

  // Génération de réponse intelligente
  const generateIntelligentResponse = (userMessage, intent) => {
    const responses = {
      greeting: [
        "Bonjour ! Je suis l'assistant IA d'ArchiAtech. 🤖 Comment puis-je vous aider à transformer votre entreprise aujourd'hui ?",
        "Salut ! 👋 Ravi de vous rencontrer. Je suis là pour vous expliquer nos solutions d'automatisation et d'IA. Que souhaitez-vous savoir ?"
      ],
      service_automation: [
        `Excellent choix ! 🚀 Notre service d'**Automatisation des Workflows** peut révolutionner vos processus :
        
**Ce que nous faisons :**
• RPA (Robotic Process Automation)
• Connecteurs API personnalisés
• Solutions no-code/low-code

**Bénéfices :**
• Réduction des coûts jusqu'à 60%
• Élimination des erreurs humaines
• Gain de temps significatif
• Scalabilité instantanée

**Investissement :** À partir de 2000€/mois
**Délai :** 2-4 semaines

Souhaitez-vous planifier une démonstration personnalisée ? 🎯`,
        `L'automatisation est notre spécialité ! ⚡ Voici comment nous transformons vos processus :

**Notre approche :**
1. **Audit** de vos processus existants
2. **Conception** de solutions sur mesure
3. **Déploiement** progressif et sécurisé
4. **Formation** de vos équipes

**Résultats typiques :**
• 70% de réduction du temps de traitement
• 50% d'économie sur les coûts opérationnels
• ROI positif dès le 3ème mois

Intéressé(e) par une démonstration ? 📅`
      ],
      service_ai: [
        `L'IA est l'avenir ! 🧠 Notre expertise en **Intégration IA** peut donner un avantage concurrentiel à votre entreprise :

**Nos solutions IA :**
• Machine Learning pour l'analyse prédictive
• Chatbots intelligents pour le service client
• Reconnaissance d'images et de documents
• Optimisation automatique des processus

**Impact business :**
• Décisions basées sur les données
• Prédiction des tendances marché
• Personnalisation client avancée
• Automatisation intelligente

**Investissement :** À partir de 3500€/mois
**Délai :** 4-8 semaines

Prêt à découvrir le potentiel de l'IA pour votre secteur ? 🎯`,
        `L'intelligence artificielle transforme les entreprises ! 🚀 Voici notre approche :

**Phases d'intégration :**
1. **Analyse** de vos données existantes
2. **Modélisation** d'algorithmes personnalisés
3. **Intégration** dans vos systèmes
4. **Monitoring** et optimisation continue

**Cas d'usage populaires :**
• Prédiction de la demande
• Détection d'anomalies
• Classification automatique
• Recommandations intelligentes

Souhaitez-vous une démonstration adaptée à votre secteur ? 💡`
      ],
      service_support: [
        `Support IT professionnel ! 💻 Notre équipe assure une infrastructure technologique de pointe :

**Nos services :**
• Déploiement rapide de postes de travail
• Configuration et sécurisation
• Support technique 24/7
• Maintenance proactive

**Avantages :**
• Temps de déploiement réduit de 80%
• Disponibilité 99.9%
• Sécurité renforcée
• Équipe d'experts dédiée

**Tarification :** À partir de 150€/poste/mois
**Délai :** 1-2 semaines

Besoin d'un audit de votre infrastructure actuelle ? 🔍`,
        `IT Support de nouvelle génération ! ⚡ Nous modernisons votre infrastructure :

**Notre méthode :**
1. **Audit** de votre environnement actuel
2. **Planification** de la migration
3. **Déploiement** sans interruption
4. **Support** continu et formation

**Garanties :**
• Zéro perte de données
• Migration transparente
• Formation utilisateurs incluse
• Support prioritaire

Combien de postes souhaitez-vous moderniser ? 📊`
      ],
      pricing: [
        `Transparence totale sur nos tarifs ! 💰 Voici nos grilles tarifaires :

**Automatisation Workflows :**
• Starter : 2000€/mois (jusqu'à 5 processus)
• Professional : 4000€/mois (jusqu'à 15 processus)
• Enterprise : Sur devis (processus illimités)

**Intégration IA :**
• Discovery : 3500€/mois (projet pilote)
• Scale : 7000€/mois (déploiement complet)
• Premium : Sur devis (solutions sur mesure)

**Support IT :**
• 150€/poste/mois (support standard)
• 250€/poste/mois (support premium + monitoring)

**🎯 Offre de lancement :** -20% sur le premier mois !

Intéressé(e) par un devis personnalisé ? 📋`,
        `Investissement rentable garanti ! 📈 Nos tarifs incluent :

**Ce qui est inclus :**
• Analyse et audit gratuit
• Développement sur mesure
• Formation équipes
• Support technique
• Mises à jour
• Monitoring 24/7

**ROI typique :**
• Automatisation : ROI en 3-6 mois
• IA : ROI en 6-12 mois
• Support IT : Économies immédiates

**Financement possible :** Paiement échelonné sur 12 mois

Souhaitez-vous un devis adapté à votre budget ? 💡`
      ],
      demo_request: [
        `Parfait ! 🎯 Organisons votre démonstration personnalisée :

**Options de démo :**
• **Visio** (30 min) : Présentation générale
• **Sur site** (1h) : Démonstration pratique
• **POC** (2 semaines) : Preuve de concept gratuite

**Prochaines disponibilités :**
• Aujourd'hui : 14h, 16h
• Demain : 9h, 11h, 15h
• Cette semaine : Libre selon vos disponibilités

**Préparation :**
• Questionnaire pré-démo
• Analyse de vos processus
• Démonstration ciblée

Quel créneau vous convient ? 📅`,
        `Démonstration sur mesure ! 🚀 Voici comment procéder :

**Étapes :**
1. **Appel découverte** (15 min) - Vos besoins
2. **Préparation démo** - Scénarios personnalisés
3. **Démonstration** - Solutions concrètes
4. **Questions/Réponses** - Clarifications
5. **Prochaines étapes** - Proposition

**Durée totale :** 45 minutes
**Format :** Visio ou sur site
**Prérequis :** Aucun, nous nous adaptons !

Disponible cette semaine ? ⏰`
      ],
      contact_info: [
        `Voici nos coordonnées ! 📞

**Contact direct :**
• 📧 Email : contact@archiatech.com
• 📱 Téléphone : +33 7 83 82 93 10
• 🌐 Site : www.archiatech.com

**Horaires :**
• Lundi-Vendredi : 9h-18h
• Urgences : Support 24/7

**Équipe :**
• Jean-Éloi (Fondateur) - Expert IA/Automation
• Équipe technique dédiée
• Support client prioritaire

**Réponse garantie :**
• Email : < 2h en journée
• Téléphone : Réponse immédiate
• Urgences : < 30 min

Prêt à échanger directement ? 💬`,
        `Connectons-nous ! 🤝

**Moyens de contact :**
• **Appel direct** : +33 7 83 82 93 10
• **Email** : contact@archiatech.com
• **WhatsApp** : Même numéro
• **LinkedIn** : /company/archiatech

**Pourquoi nous choisir :**
• Expertise reconnue en IA
• Clients satisfaits (100% recommandent)
• Support personnalisé
• Innovation continue

**Prochaines étapes :**
1. Échange de 15 min
2. Audit gratuit
3. Proposition sur mesure

Quel est le meilleur moment pour vous appeler ? ⏰`
      ],
      general_inquiry: [
        `Je suis là pour vous aider ! 😊 Voici ce que nous pouvons faire pour votre entreprise :

**Nos domaines d'expertise :**
🤖 **Automatisation** - RPA, workflows, connecteurs
🧠 **Intelligence Artificielle** - ML, chatbots, analyse prédictive
💻 **Support IT** - Déploiement, maintenance, sécurité

**Questions fréquentes :**
• Comment automatiser mes processus ?
• L'IA peut-elle m'aider à gagner en efficacité ?
• Combien coûte une solution sur mesure ?
• Combien de temps pour voir des résultats ?

**Par où commencer ?**
Je recommande une démonstration personnalisée pour comprendre vos besoins spécifiques.

Quel aspect vous intéresse le plus ? 🎯`,
        `Excellente question ! 💡 Laissez-moi vous orienter :

**ArchiAtech en bref :**
• 🏆 Leader en solutions IA & Automation
• 🎯 +200 entreprises transformées
• ⚡ ROI moyen : 300% en 12 mois
• 🛡️ Support et garantie inclus

**Notre promesse :**
• Solutions sur mesure
• Déploiement sans interruption
• Formation complète
• Suivi personnalisé

**Prochaines étapes suggérées :**
1. Audit gratuit (30 min)
2. Démonstration ciblée
3. Proposition personnalisée
4. Accompagnement complet

Quel est votre défi principal actuellement ? 🚀`
      ]
    };

    // Sélection intelligente de réponse
    const intentResponses = responses[intent] || responses.general_inquiry;
    const selectedResponse = intentResponses[Math.floor(Math.random() * intentResponses.length)];

    return selectedResponse;
  };

  // Traitement des messages utilisateur
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulation du délai de traitement IA
    setTimeout(() => {
      const intent = analyzeUserIntent(inputValue);
      const response = generateIntelligentResponse(inputValue, intent, conversationContext);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date(),
        intent: intent
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Mise à jour du contexte
      setConversationContext(prev => ({
        ...prev,
        stage: intent === 'demo_request' ? 'scheduling' : prev.stage,
        userIntent: intent
      }));
    }, 1500 + Math.random() * 1000);
  };

  // Messages de bienvenue
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        content: "👋 Bonjour ! Je suis l'assistant IA d'ArchiAtech. Je suis là pour vous aider à découvrir comment l'automatisation et l'IA peuvent transformer votre entreprise. Que souhaitez-vous savoir ?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const quickActions = [
    { label: "Automatisation", icon: <Cog className="w-4 h-4" />, intent: "service_automation" },
    { label: "Intelligence IA", icon: <Cpu className="w-4 h-4" />, intent: "service_ai" },
    { label: "Support IT", icon: <Zap className="w-4 h-4" />, intent: "service_support" },
    { label: "Tarifs", icon: <CheckCircle className="w-4 h-4" />, intent: "pricing" },
    { label: "Démonstration", icon: <Calendar className="w-4 h-4" />, intent: "demo_request" },
    { label: "Contact", icon: <Phone className="w-4 h-4" />, intent: "contact_info" }
  ];

  const handleQuickAction = (intent) => {
    const actionMessages = {
      service_automation: "Je souhaite en savoir plus sur l'automatisation des workflows",
      service_ai: "Pouvez-vous me présenter vos solutions d'intelligence artificielle ?",
      service_support: "J'aimerais connaître vos services de support IT",
      pricing: "Quels sont vos tarifs pour les différentes solutions ?",
      demo_request: "Je souhaite planifier une démonstration",
      contact_info: "Comment puis-je vous contacter directement ?"
    };

    setInputValue(actionMessages[intent]);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 200 }}
        >
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        </motion.button>
      )}

      {/* Interface du chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Assistant ArchiAtech</h3>
                  <p className="text-red-100 text-sm">En ligne maintenant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-red-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-gray-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Actions rapides */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">Actions rapides :</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.intent)}
                      className="flex items-center space-x-2 p-2 text-xs bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Powered by ArchiAtech AI</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>En ligne</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntelligentChatBot;
