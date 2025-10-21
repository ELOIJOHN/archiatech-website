import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

export default function SimpleChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Bonjour ! Je suis ArchiBot, votre assistant IA pour ArchiAtech. Comment puis-je vous aider aujourd\'hui ?'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Ajouter le message utilisateur
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Réponse automatique simple
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Merci pour votre message ! Notre équipe vous répondra rapidement. En attendant, vous pouvez consulter nos services d\'automatisation et d\'IA.'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Modal du chat */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Window */}
          <div className="relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl">
            {/* Header */}
            <div className="bg-red-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">ArchiBot</h3>
                  <p className="text-xs text-red-100">Assistant IA</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
