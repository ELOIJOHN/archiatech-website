import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, TouchIcon as Touch, Wifi, Battery, Download, Heart } from 'lucide-react';
import MobileTouchVideo from './MobileTouchVideo';
import PWAInstallPrompt from './PWAInstallPrompt';

export default function MobileShowcase() {
  const features = [
    {
      icon: Touch,
      title: 'Gestures Intuitifs',
      description: 'Double tap, swipe vertical et horizontal pour contrôler vos vidéos',
      color: 'from-blue-500 to-blue-600',
      gradient: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Interface Adaptative',
      description: 'Design optimisé pour toutes les tailles d\'écran mobile',
      color: 'from-purple-500 to-purple-600',
      gradient: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'Performance Ultra-rapide',
      description: 'Chargement instantané et transitions fluides à 60fps',
      color: 'from-yellow-500 to-yellow-600',
      gradient: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Wifi,
      title: 'Mode Hors Ligne',
      description: 'Accédez au contenu même sans connexion internet',
      color: 'from-green-500 to-green-600',
      gradient: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Battery,
      title: 'Économie d\'Énergie',
      description: 'Optimisé pour préserver la batterie de votre appareil',
      color: 'from-red-500 to-red-600',
      gradient: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: Download,
      title: 'Installation PWA',
      description: 'Installez l\'app sur votre écran d\'accueil en un clic',
      color: 'from-pink-500 to-pink-600',
      gradient: 'bg-pink-100',
      iconColor: 'text-pink-600'
    }
  ];

  const gestures = [
    {
      gesture: '👆 Double Tap',
      action: 'Lecture / Pause',
      description: 'Tapez deux fois rapidement sur la vidéo'
    },
    {
      gesture: '🔼 Swipe Vertical (Gauche)',
      action: 'Luminosité',
      description: 'Ajustez la luminosité de la vidéo'
    },
    {
      gesture: '🔼 Swipe Vertical (Droite)',
      action: 'Volume',
      description: 'Contrôlez le volume audio'
    },
    {
      gesture: '◀️ Swipe Horizontal',
      action: 'Avancer / Reculer',
      description: 'Naviguez dans la timeline'
    },
    {
      gesture: '🤌 Pinch',
      action: 'Zoom',
      description: 'Zoomez sur la vidéo (à venir)'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <PWAInstallPrompt />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Smartphone className="w-4 h-4" />
              <span>Expérience Mobile Premium</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Optimisé pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Mobile</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience tactile révolutionnaire avec gestures intuitifs,
              performance ultra-rapide et installation PWA.
            </p>
          </motion.div>
        </div>

        {/* Vidéo de démonstration mobile */}
        <div className="mb-16">
          <div className="max-w-md mx-auto">
            <MobileTouchVideo
              src="/videos/working-test.mp4"
              poster="/images/hero-desktop.png"
              title="Démo Interactive Mobile"
              description="Testez les gestures tactiles"
            />
            
            {/* Instructions rapides */}
            <motion.div
              className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center">
                <Touch className="w-4 h-4 mr-2" />
                Essayez les gestures :
              </h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Double tap pour lecture/pause</li>
                <li>• Swipe vertical pour luminosité/volume</li>
                <li>• Swipe horizontal pour naviguer</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Fonctionnalités mobiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.gradient} mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Guide des gestures */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-3">Guide des Gestures</h3>
            <p className="text-gray-300">Maîtrisez tous les contrôles tactiles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gestures.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-3">{item.gesture}</div>
                <h4 className="text-lg font-bold mb-2">{item.action}</h4>
                <p className="text-sm text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistiques mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '60fps', label: 'Animations Fluides', icon: '⚡' },
            { number: '<100ms', label: 'Temps de Réponse', icon: '🚀' },
            { number: '5MB', label: 'Taille de l\'App', icon: '💾' },
            { number: '95%', label: 'Satisfaction Mobile', icon: '❤️' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-red-600 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Installation PWA */}
        <motion.div
          className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Décorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative">
            <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
              <Smartphone className="w-12 h-12" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Installez ArchiAtech sur votre mobile
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Accédez instantanément à nos services depuis votre écran d'accueil.
              Gratuit, sans publicité et fonctionne hors ligne.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Installer maintenant</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all">
                En savoir plus
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Heart className="w-4 h-4 fill-current" />
                <span>100% Gratuit</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Zap className="w-4 h-4" />
                <span>Ultra Rapide</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Wifi className="w-4 h-4" />
                <span>Mode Hors Ligne</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compatibilité */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Compatible avec :</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['iOS 14+', 'Android 8+', 'Chrome 90+', 'Safari 14+', 'Edge 90+'].map((platform, index) => (
              <div key={index} className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
