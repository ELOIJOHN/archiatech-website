import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, Target, Mail, Phone, ChevronRight, Zap, Cpu } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détection du scroll pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { icon: Home, label: 'Accueil', href: '#', color: 'from-red-500 to-red-600' },
    { icon: Briefcase, label: 'Services', href: '#services', color: 'from-blue-500 to-blue-600' },
    { icon: Target, label: 'Notre Approche', href: '#approche', color: 'from-green-500 to-green-600' },
    { icon: Mail, label: 'Contact', href: '#contact', color: 'from-purple-500 to-purple-600' }
  ];

  const handleMenuClick = (href) => {
    setIsOpen(false);
    // Petit délai pour l'animation avant le scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      {/* Navbar Mobile Fixe */}
      <motion.nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
            : 'bg-white/80 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Archi<span className="text-red-600">Atech</span>
              </span>
            </motion.div>

            {/* Bouton Menu Hamburger Avancé */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg active:shadow-xl"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Indicateur de progression du scroll */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-600 to-red-800"
          style={{ 
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
          }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
          }}
        />
      </motion.nav>

      {/* Menu Full Screen avec Gestures */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay avec blur */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu déroulant avec swipe-to-close */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-white via-gray-50 to-gray-100 z-50 md:hidden shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100 || velocity.x > 500) {
                  setIsOpen(false);
                }
              }}
            >
              {/* Header du menu */}
              <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 shadow-lg z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Menu</h2>
                    <p className="text-sm text-white/80">Swipe vers la droite pour fermer</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Indicateur de swipe */}
                <div className="w-16 h-1 bg-white/30 rounded-full mx-auto" />
              </div>

              {/* Items du menu avec animations */}
              <div className="p-6 space-y-3">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(item.href);
                    }}
                    className="group relative block bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Gradient animé au hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity`} />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                            {item.label}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Contact rapide */}
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Contact Rapide
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+33783829310"
                    className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Téléphone</p>
                      <p className="text-sm font-semibold text-gray-900">+33 7 83 82 93 10</p>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@archiatech.com"
                    className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-gray-900">contact@archiatech.com</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Footer du menu */}
              <div className="p-6 bg-gray-100 border-t border-gray-200">
                <p className="text-xs text-center text-gray-500">
                  © 2025 ArchiAtech. Tous droits réservés.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
