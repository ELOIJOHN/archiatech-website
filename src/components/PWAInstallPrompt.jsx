import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Share, Plus } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasDeclined, setHasDeclined] = useState(false);

  useEffect(() => {
    // Vérifier si on est sur iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Vérifier si l'app est déjà installée
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches 
      || window.navigator.standalone 
      || document.referrer.includes('android-app://');
    setIsStandalone(isInStandaloneMode);

    // Vérifier si l'utilisateur a déjà refusé
    const declined = localStorage.getItem('pwa-install-declined');
    if (declined) {
      const declinedTime = parseInt(declined);
      const daysSinceDeclined = (Date.now() - declinedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDeclined < 7) {
        setHasDeclined(true);
        return;
      }
    }

    // Écouter l'événement beforeinstallprompt (Android/Chrome)
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Afficher le prompt après 3 secondes
      setTimeout(() => {
        if (!isInStandaloneMode && !declined) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Pour iOS, afficher après 5 secondes si pas déjà installé
    if (isIOSDevice && !isInStandaloneMode && !declined) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Afficher le prompt natif
    deferredPrompt.prompt();

    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
      localStorage.setItem('pwa-install-declined', Date.now().toString());
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-declined', Date.now().toString());
    setHasDeclined(true);
  };

  // Ne rien afficher si déjà installé ou refusé récemment
  if (isStandalone || hasDeclined) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Prompt Modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:max-w-md md:rounded-2xl bg-white shadow-2xl z-50 overflow-hidden"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header avec gradient */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
              
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Smartphone className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Installer ArchiAtech</h3>
                  <p className="text-white/90 text-sm">
                    Accédez rapidement à nos services depuis votre écran d'accueil
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
              {/* Avantages */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">Accès rapide sans navigateur</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">Fonctionne hors ligne</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">Notifications instantanées</p>
                </div>
              </div>

              {/* Boutons */}
              {!isIOS ? (
                // Pour Android/Chrome
                <div className="space-y-3">
                  <motion.button
                    onClick={handleInstallClick}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-2"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-5 h-5" />
                    <span>Installer l'application</span>
                  </motion.button>
                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 active:scale-95 transition-all"
                  >
                    Plus tard
                  </button>
                </div>
              ) : (
                // Instructions pour iOS
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-blue-900">
                    Pour installer sur iOS :
                  </p>
                  <ol className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start space-x-2">
                      <span className="font-bold">1.</span>
                      <span>Appuyez sur l'icône <Share className="w-4 h-4 inline mx-1" /> Partager</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold">2.</span>
                      <span>Sélectionnez "Sur l'écran d'accueil" <Plus className="w-4 h-4 inline mx-1" /></span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold">3.</span>
                      <span>Appuyez sur "Ajouter"</span>
                    </li>
                  </ol>
                  <button
                    onClick={handleClose}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition-all mt-4"
                  >
                    J'ai compris
                  </button>
                </div>
              )}

              {/* Remarque */}
              <p className="text-center text-xs text-gray-500 mt-4">
                Gratuit • Sans publicité • Environ 5 MB
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
