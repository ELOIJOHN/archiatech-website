import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ChevronRight } from 'lucide-react';

/**
 * Composant de Navigation Responsive avec Menu Hamburger
 * - Menu hamburger pour mobile (< 768px)
 * - Navigation complète pour desktop
 * - Animations fluides et accessibilité ARIA
 * - Integration Google Analytics (events)
 */
const ResponsiveNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Gérer le scroll pour effet de fond
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du redimensionnement (passage desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Fonction pour toggle le menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fonction pour fermer le menu mobile et scroller vers la section
  const handleNavClick = (e, href) => {
    setIsMobileMenuOpen(false);
    
    // Track avec Google Analytics (si configuré)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_navigation', {
        link_name: href,
        event_category: 'Navigation',
      });
    }
  };

  // Liste des liens de navigation
  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#approche', label: 'Notre approche' },
    { href: '#veille', label: 'Veille IA' },
  ];

  return (
    <>
      {/* Barre de navigation principale */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg' 
            : 'bg-white/80 backdrop-blur-xl shadow-sm'
        } border-b border-gray-100`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo ArchiAtech */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg hover:shadow-red-500/30 transition-shadow duration-300">
                <Cpu className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <a 
                href="#hero"
                className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors duration-300"
                onClick={(e) => handleNavClick(e, '#hero')}
              >
                Archi<span className="text-red-600">Atech</span>
              </a>
            </div>

            {/* Navigation Desktop (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-600 hover:text-red-600 transition-colors duration-300 font-medium text-sm lg:text-base cursor-pointer relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              
              {/* Bouton Contact Desktop */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-5 py-2.5 lg:px-6 lg:py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] text-sm lg:text-base"
              >
                Contact
              </a>
            </div>

            {/* Bouton Menu Hamburger (visible on mobile only) */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden relative inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-all duration-300"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {/* Icône Hamburger / Croix avec animation */}
              <div className="relative w-6 h-6">
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0 top-1/2' : 'rotate-0 top-1'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-6 bg-current top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0 top-1/2' : 'rotate-0 bottom-1'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile (Overlay + Sidebar) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Overlay sombre */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>

        {/* Panneau de navigation mobile (Slide from right) */}
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation mobile"
        >
          {/* Header du menu mobile */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Archi<span className="text-red-600">Atech</span>
              </span>
            </div>
            
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Liens de navigation mobile */}
          <nav className="flex flex-col p-6 space-y-2" aria-label="Navigation mobile">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group flex items-center justify-between px-4 py-4 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-medium cursor-pointer border border-transparent hover:border-red-200"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                }}
              >
                <span className="text-lg">{link.label}</span>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            ))}

            {/* Bouton Contact mobile */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center justify-center px-6 py-4 mt-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] text-lg"
              style={{
                animationDelay: `${navLinks.length * 50}ms`,
                animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
              }}
            >
              Contactez-nous
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </nav>

          {/* Footer du menu mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              Solutions IA & Automatisation
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-xs text-gray-500">
                Disponible pour vous aider
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations CSS inline */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default ResponsiveNavbar;

