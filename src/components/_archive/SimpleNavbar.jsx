import React, { useState } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

/**
 * Version simplifiée du navbar pour debug
 */
const SimpleNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Navigation principale */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl shadow-lg z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <a href="#hero" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Cpu className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                Archi<span className="text-red-600">Atech</span>
              </span>
            </a>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#approche" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative group">
                Notre approche
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#veille" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative group">
                Veille IA
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Contact
              </a>
            </div>

            {/* Bouton Hamburger - MOBILE SEULEMENT */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-3 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                  <Cpu className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-gray-900">Menu</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Links */}
            <div className="p-6 space-y-2">
              <a 
                href="#services" 
                className="block py-4 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#approche" 
                className="block py-4 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notre approche
              </a>
              <a 
                href="#veille" 
                className="block py-4 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Veille IA
              </a>
              <a 
                href="#contact" 
                className="block py-4 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-center font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 mt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleNavbar;
