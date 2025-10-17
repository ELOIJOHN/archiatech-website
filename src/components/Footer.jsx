import React from 'react';
import { Cpu, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white">
                Archi<span className="text-red-400">Atech</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Nous accompagnons votre transformation digitale avec des solutions d'intelligence 
              artificielle et d'automatisation innovantes pour optimiser vos processus métiers.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400" />
                <a 
                  href="mailto:contact@archiatech.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  contact@archiatech.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400" />
                <a 
                  href="tel:+33783829310" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +33 7 83 82 93 10
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">
                  France - Service national
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Automatisation Workflows
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Intelligence Artificielle
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Solutions No-Code
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Support IT
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Formation & Accompagnement
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Restez informé</h3>
            <p className="text-gray-300 mb-4">
              Recevez nos dernières actualités sur l'IA et l'automatisation.
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:contact@archiatech.com?subject=Newsletter%20ArchiAtech" 
                className="group inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                S'abonner à la newsletter
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <div className="pt-4 border-t border-gray-700">
                <a 
                  href="mailto:contact@archiatech.com?subject=Audit%20gratuit" 
                  className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
                >
                  Demander un audit gratuit →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} ArchiAtech. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
