import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { generateLLMResponse, detectUserProfile } from '../services/llmService';

const ArchiAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // C-Level, Technical, Novice
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Messages d'accueil selon le profil utilisateur
  const welcomeMessages = {
    'C-Level': "Bonjour ! Je suis Archi, votre expert en Intelligence Artificielle et transformation digitale. Je suis ici pour vous accompagner dans l'optimisation de votre ROI et l'accélération de votre croissance grâce à l'IA. Quel est votre principal défi opérationnel aujourd'hui ?",
    'Technical': "Salut ! Je suis Archi, expert en IA et solutions techniques. Je peux vous aider avec l'intégration d'APIs, l'architecture de systèmes ML, ou l'automatisation de vos workflows. Sur quel aspect technique souhaitez-vous vous concentrer ?",
    'Novice': "Bonjour ! Je suis Archi, votre guide personnel pour découvrir l'IA et la transformation digitale. Pas de jargon technique ici - je vais vous expliquer tout simplement comment l'IA peut transformer votre entreprise. Quel est votre objectif principal aujourd'hui ?",
    'default': "Bonjour ! Je suis Archi, l'expert en Intelligence Artificielle et votre guide sur notre site. Je suis ici pour vous aider à trouver la solution la plus efficace pour votre transformation digitale. Quel est le principal objectif que vous cherchez à atteindre aujourd'hui ?"
  };

  // Base de connaissances des services ArchiAtech
  const servicesKnowledge = {
    'Support & Déploiement IT': {
      description: "Support technique 24/7 et déploiement sécurisé de vos solutions IT",
      benefits: ["Réduction des temps d'arrêt", "Support réactif", "Déploiement sans interruption"],
      useCases: ["Maintenance préventive", "Résolution rapide des incidents", "Migration sécurisée"]
    },
    'Conseil & Intégration IA': {
      description: "Stratégie IA personnalisée et intégration de solutions d'intelligence artificielle",
      benefits: ["ROI optimisé", "Solutions sur mesure", "Accompagnement expert"],
      useCases: ["Audit IA", "Roadmap technologique", "Intégration progressive"]
    },
    'Automatisation des Workflows': {
      description: "Automatisation intelligente de vos processus métier pour gagner en efficacité",
      benefits: ["+40% d'efficacité", "Réduction des erreurs", "Gain de temps"],
      useCases: ["Processus répétitifs", "Workflows complexes", "Intégration systèmes"]
    },
    'Solutions No-Code/Low-Code': {
      description: "Développement rapide d'applications sans compétences techniques approfondies",
      benefits: ["Développement accéléré", "Coûts réduits", "Flexibilité maximale"],
      useCases: ["Prototypage rapide", "Applications métier", "Intégrations API"]
    },
    'Formation & Accompagnement': {
      description: "Formation de vos équipes aux technologies IA et accompagnement au changement",
      benefits: ["Équipes autonomes", "Adoption réussie", "Compétences durables"],
      useCases: ["Formation technique", "Changement organisationnel", "Support continu"]
    },
    'Transformation Digitale': {
      description: "Accompagnement complet de votre transformation digitale et modernisation",
      benefits: ["Vision stratégique", "Implémentation progressive", "ROI mesurable"],
      useCases: ["Stratégie digitale", "Modernisation IT", "Culture numérique"]
    }
  };

  // Cycle de vie Archi (Audit, Stratégie, Déploiement, Support)
  const archiMethodology = {
    'Audit': "Analyse complète de votre écosystème actuel pour identifier les opportunités d'amélioration",
    'Stratégie': "Définition d'une roadmap personnalisée alignée sur vos objectifs business",
    'Déploiement': "Implémentation progressive et sécurisée des solutions choisies",
    'Support': "Accompagnement continu et optimisation des performances"
  };

  // Fonction pour convertir l'historique des messages au format LLM
  const convertMessagesToLLMFormat = () => {
    return messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  // Génération de réponse intelligente avec LLM
  const generateResponse = async (userMessage) => {
    try {
      // Détection du profil si pas encore défini
      if (!userProfile) {
        const profile = detectUserProfile(userMessage);
        if (profile) {
          setUserProfile(profile);
        }
      }

      // Convertir l'historique des messages au format LLM
      const conversationHistory = convertMessagesToLLMFormat();

      // Ajouter le nouveau message utilisateur
      conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Appeler le service LLM
      const response = await generateLLMResponse(conversationHistory);

      return response;
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse:', error);
      return "Je suis désolé, je rencontre une difficulté technique. Pouvez-vous reformuler votre question ?";
    }
  };

  // Simulation de frappe
  const simulateTyping = (text, callback) => {
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        callback(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);
  };

  // Envoi de message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageText = inputValue;
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Génération de la réponse avec le LLM
    try {
      const response = await generateResponse(messageText);
      const botMessage = {
        id: Date.now() + 1,
        text: '',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Simulation de frappe pour la réponse
      simulateTyping(response, (partialText) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessage.id
              ? { ...msg, text: partialText }
              : msg
          )
        );
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setIsTyping(false);

      const errorMessage = {
        id: Date.now() + 1,
        text: "Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Gestion des touches
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Message d'accueil initial
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: welcomeMessages.default,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  return (
    <>
      {/* Bouton flottant - TEST FORCÉ VISIBLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-0 cursor-pointer flex items-center justify-center"
        style={{
          zIndex: 2147483647, // Max z-index possible
          background: 'linear-gradient(135deg, #E60023 0%, #ff0033 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(230, 0, 35, 0.8)',
          display: isOpen ? 'none' : 'flex',
          animation: 'pulse 2s infinite'
        }}
        aria-label="Ouvrir le chat avec Archi"
      >
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span
          className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold"
          style={{
            background: '#10B981',
            color: 'white'
          }}
        >
          !
        </span>
      </button>

      {/* Widget de chat */}
      {isOpen && (
        <div
          className={`fixed bg-white rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized
              ? 'w-[calc(100vw-2rem)] sm:w-80 h-16 bottom-4 right-4 sm:bottom-6 sm:right-6'
              : 'w-[calc(100vw-2rem)] sm:w-96 h-[70vh] sm:h-[500px] bottom-4 right-4 sm:bottom-6 sm:right-6'
          }`}
          style={{
            zIndex: 999999,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)',
            maxWidth: isMinimized ? '320px' : '384px'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#E60023] to-red-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Archi</h3>
                <p className="text-xs text-white/80">Expert IA • En ligne</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label={isMinimized ? "Agrandir" : "Réduire"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-[#E60023] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-[#E60023] text-white p-2 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Envoyer le message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ArchiAgent;
