import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, Workflow, X } from "lucide-react";

const API_URL = "https://n8n.archiatech.com/webhook/archibot";

const modes = [
  {
    id: "openai",
    label: "Version 1 · OpenAI direct",
    description:
      "Connexion directe à l'API OpenAI. Parfait pour un POC rapide avec clé côté client (à sécuriser ensuite).",
  },
  {
    id: "orchestrator",
    label: "Version 2 · MCP / n8n flow",
    description:
      "Passer par ton serveur MCP ou un flow n8n pour orchestrer et cacher la clé API en back-office.",
  },
];

const messageVariants = {
  initial: { opacity: 0, y: 16, scale: 0.96 },
  enter: { opacity: 1, y: 0, scale: 1 },
  vibrate: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: [0, -2, 2, -1, 1, 0],
    transition: { duration: 0.45 },
  },
};

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(() => [
    {
      id: createId(),
      role: "assistant",
      content:
        "Bonjour 👋 je suis ArchiBot, ton copilote IA connecté à ArchiaTech ! Pose-moi une question ou demande un audit IA 🚀",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const vibrationTimeoutRef = useRef(null);

  const toggleWidget = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    return () => {
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { id: createId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const assistantContent = await fetchResponse(trimmed, mode, apiKey);

      const assistantMessage = {
        id: createId(),
        role: "assistant",
        content: assistantContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setHighlightedId(assistantMessage.id);
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
      vibrationTimeoutRef.current = setTimeout(
        () => setHighlightedId(null),
        700
      );
    } catch (error) {
      const errorMessage = {
        id: createId(),
        role: "assistant",
        content:
          "🚧 Oups, je n'ai pas pu contacter le service. Vérifie la configuration puis réessaie.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setHighlightedId(errorMessage.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSend(event);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
              onClick={toggleWidget}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed bottom-24 right-6 w-full max-w-sm z-50"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-[0_24px_70px_-30px_rgba(220,38,38,0.55)] border border-red-100 bg-white">
                <div className="relative px-6 py-5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white">
                  <div className="absolute inset-0 bg-white/10" />
                  <div className="relative flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-white text-red-600 flex items-center justify-center shadow-lg">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            ArchiBot – Assistant IA
                          </h3>
                          <p className="text-white/80 text-sm">
                            Automatisation · Conseil · AI Ops
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={toggleWidget}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label="Fermer le chat"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="px-6 py-4 bg-white border-b border-red-100">
                  <div className="flex gap-2 bg-red-50/80 rounded-2xl p-1.5 border border-red-100/60">
                    {modes.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMode(item.id)}
                        className={`flex-1 rounded-2xl px-3 py-2 text-xs font-medium transition shadow-sm ${
                          mode === item.id
                            ? "bg-white text-red-600 shadow-md"
                            : "text-red-500 hover:bg-white/60"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-1.5">
                          {item.id === "openai" ? (
                            <Sparkles className="w-4 h-4" />
                          ) : (
                            <Workflow className="w-4 h-4" />
                          )}
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    {modes.find((item) => item.id === mode)?.description}
                  </p>
                </div>

                <div className="max-h-[24rem] flex flex-col bg-white">
                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3 bg-gradient-to-b from-red-50/40 via-white to-white">
                    <AnimatePresence initial={false}>
                      {messages.map((message) => {
                        const isAssistant = message.role === "assistant";
                        const isHighlighted = highlightedId === message.id;
                        return (
                          <motion.div
                            key={message.id}
                            variants={messageVariants}
                            initial="initial"
                            animate={isHighlighted ? "vibrate" : "enter"}
                            exit={{ opacity: 0, y: 10 }}
                            className={`flex ${
                              isAssistant ? "justify-start" : "justify-end"
                            }`}
                          >
                            <div
                              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                                isAssistant
                                  ? "bg-white border border-red-100 text-gray-700"
                                  : "bg-red-600 text-white border border-red-500/70"
                              }`}
                            >
                              {message.content}
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    {isLoading && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="px-4 py-3 rounded-2xl bg-white border border-red-100 text-sm text-gray-500 shadow-md">
                          Le copilote réfléchit...
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <form
                    onSubmit={handleSend}
                    className="border-t border-red-100 px-4 py-4 bg-white space-y-3"
                  >
                    {mode === "openai" && (
                      <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-3 py-2">
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(event) => setApiKey(event.target.value)}
                          placeholder="Clé OpenAI (sk-...)"
                          autoComplete="off"
                          className="flex-1 bg-transparent text-xs text-gray-600 placeholder:text-gray-400 focus:outline-none"
                        />
                        <span className="text-[10px] font-semibold text-red-500">
                          Mocké
                        </span>
                      </div>
                    )}

                    <div className="flex items-end gap-2">
                      <textarea
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Pose ta question..."
                        rows={2}
                        className="flex-1 resize-none rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                      />
                      <motion.button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        whileHover={{ scale: isLoading ? 1 : 1.05 }}
                        whileTap={{ scale: isLoading ? 1 : 0.95 }}
                        className="rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white p-3 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Envoyer le message"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-[10px] text-gray-400">
                      Enter pour envoyer · Shift + Enter pour une nouvelle ligne
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-50 rounded-full p-5 shadow-[0_18px_50px_-20px_rgba(220,38,38,0.8)] bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white border-4 border-white"
        initial={false}
        animate={{ scale: isOpen ? 0.94 : 1, rotate: [0, 3, -3, 0] }}
        transition={{
          rotate: { repeat: Infinity, duration: 1, delay: 10 },
          scale: { duration: 0.25 },
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir le chatbot ArchiAtech"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7" />
          {!isOpen && (
            <motion.span
              className="absolute -top-2 -right-2 inline-flex items-center justify-center text-[10px] font-semibold bg-white text-red-600 rounded-full px-2 py-1 shadow-lg"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              Bot
            </motion.span>
          )}
        </div>
      </motion.button>
    </>
  );
}

async function fetchResponse(message, mode = "orchestrator", apiKey = "") {
  try {
    const payload =
      mode === "openai"
        ? {
            provider: "openai",
            message,
            apiKey,
          }
        : {
            provider: "orchestrator",
            message,
          };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur ${response.status}`);
    }

    const data = await response.json();

    if (data.reply) return data.reply;
    if (typeof data === "string") return data;
    return "✅ ArchiBot connecté : mais la réponse du serveur est vide ou inattendue.";
  } catch (error) {
    console.error("Erreur lors de la connexion à n8n:", error);
    return "🚧 Oups, impossible de contacter le serveur n8n. Vérifie ta connexion ou la config MCP.";
  }
}

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
