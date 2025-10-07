import React from 'react';
import { 
  Cpu, Zap, Code, Settings, GraduationCap, Lightbulb, 
  CheckCircle, ArrowRight, Menu, Mail, Phone, Globe, MapPin,
  Award, TrendingUp, Users, ShieldCheck, Search, Rocket, 
  Headphones, Target, Send, Star, Sparkles
} from 'lucide-react';

export default function ArchiAtechModern() {
  return (
    <div className="min-h-screen bg-white">
      {/* Styles pour l'hexagone */}
      <style>{`
        .hexagon {
          width: 60px;
          height: 69px;
          background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
          position: relative;
          display: inline-block;
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }
        .hexagon-large {
          width: 80px;
          height: 92px;
        }
        .hexagon-xl {
          width: 100px;
          height: 115px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.6); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation ultra moderne */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-2xl shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="hexagon flex items-center justify-center shadow-xl animate-pulse-glow">
                <span className="text-white font-bold text-xl relative" style={{ marginTop: '3px' }}>JE</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block">
                  Archi<span className="text-red-600">Atech</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">Digital Solutions</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-red-600 transition font-medium">Services</a>
              <a href="#expertise" className="text-gray-600 hover:text-red-600 transition font-medium">Expertise</a>
              <a href="#processus" className="text-gray-600 hover:text-red-600 transition font-medium">Processus</a>
              <a href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-red-500/50 transition-all flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Audit Gratuit</span>
              </a>
            </div>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
