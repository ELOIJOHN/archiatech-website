import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Menu, X, ChevronDown, Building2, Target, Zap, Briefcase } from 'lucide-react';

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sous-menu ArchiAtech
  const archiSubmenu = [
    { 
      label: 'Nos expertises', 
      href: '#services',
      icon: Building2,
      description: 'Découvrez nos domaines d\'expertise'
    },
    { 
      label: 'Méthodologie', 
      href: '#approche',
      icon: Target,
      description: 'Notre approche structurée'
    },
    { 
      label: 'Nos avantages', 
      href: '#avantages',
      icon: Zap,
      description: 'Les bénéfices de nos solutions'
    },
    { 
      label: 'Nos Solutions', 
      href: '#videos',
      icon: Briefcase,
      description: 'Solutions clés en main'
    }
  ];

  // Menu principal
  const mainNavItems = [
    { label: 'Actualités IA', href: '#actualites' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-navigation transition-all duration-300 ${
      isScrolled
        ? 'bg-black/80 backdrop-blur-xl border-b border-[#E60023]/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo ArchiAtech - Optimisé responsive */}
          <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3">
            <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10
                            bg-gradient-to-br from-[#E60023] to-red-800
                            rounded-md xs:rounded-lg sm:rounded-xl
                            flex items-center justify-center
                            touch-target">
              <Cpu className="text-white w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-lg xs:text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
              Archi<span className="text-[#E60023]">Atech</span>
            </span>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {/* Menu déroulant ArchiAtech */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="nav-dropdown-button flex items-center space-x-1.5 lg:space-x-2
                          text-white/80 hover:text-[#E60023] transition-colors duration-200
                          font-medium group touch-target
                          text-sm lg:text-base"
              >
                <span>ArchiAtech</span>
                <ChevronDown className={`nav-dropdown-arrow w-3.5 h-3.5 lg:w-4 lg:h-4
                                        transition-transform duration-200
                                        ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu - Z-index augmenté */}
              {isDropdownOpen && (
                <div
                  className="nav-dropdown absolute top-full left-0 mt-2
                            w-64 md:w-72 lg:w-80
                            rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden
                            z-dropdown"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="p-1.5 md:p-2">
                    {archiSubmenu.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <a
                          key={index}
                          href={item.href}
                          className="nav-dropdown-item flex items-start
                                    space-x-2.5 md:space-x-3
                                    p-2.5 md:p-3
                                    rounded-lg md:rounded-xl
                                    transition-all duration-200 group
                                    touch-target"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="nav-dropdown-icon flex-shrink-0
                                        w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10
                                        rounded-md md:rounded-lg
                                        flex items-center justify-center">
                            <IconComponent className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-[#E60023]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="nav-dropdown-text text-white font-medium
                                          text-xs md:text-sm transition-colors">
                              {item.label}
                            </div>
                            <div className="nav-dropdown-description text-white/60
                                          text-[0.65rem] md:text-xs mt-0.5 md:mt-1
                                          leading-tight">
                              {item.description}
                            </div>
              </div>
                        </a>
                      );
                    })}
                </div>
                </div>
              )}
            </div>

            {/* Autres éléments de navigation */}
            {mainNavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white/80 hover:text-[#E60023] transition-colors duration-200
                          font-medium touch-target text-sm lg:text-base whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Menu Mobile Button - Touch optimisé */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#E60023] transition-colors
                      touch-target rounded-lg active:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ?
              <X className="w-5 h-5 xs:w-6 xs:h-6" /> :
              <Menu className="w-5 h-5 xs:w-6 xs:h-6" />
            }
          </button>
            </div>

        {/* Menu Mobile - Amélioré responsive */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 xs:mt-3 sm:mt-4 pb-2 xs:pb-3 sm:pb-4
                         border-t border-[#E60023]/20 mobile-menu-enter">
            <div className="flex flex-col space-y-1.5 xs:space-y-2 pt-2 xs:pt-3 sm:pt-4">
              {/* Section ArchiAtech dans le menu mobile */}
              <div className="mobile-nav-section border-b border-white/10
                            pb-3 xs:pb-4 mb-2 xs:mb-4 rounded-lg xs:rounded-xl">
                <div className="text-white/60 text-[0.65rem] xs:text-xs
                              font-semibold uppercase tracking-wider
                              mb-2 xs:mb-3 px-1.5 xs:px-2">
                  ArchiAtech
                </div>
                <div className="space-y-0.5 xs:space-y-1">
                  {archiSubmenu.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={index}
                        href={item.href}
                        className="mobile-nav-item flex items-center
                                  space-x-2 xs:space-x-2.5 sm:space-x-3
                                  px-1.5 xs:px-2 py-2.5 xs:py-3
                                  rounded-md xs:rounded-lg
                                  transition-all duration-200 group
                                  touch-target"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="mobile-nav-icon flex-shrink-0
                                      w-7 h-7 xs:w-8 xs:h-8
                                      rounded-md xs:rounded-lg
                                      flex items-center justify-center">
                          <IconComponent className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#E60023]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium
                                        text-xs xs:text-sm">
                            {item.label}
                          </div>
                          <div className="text-white/60
                                        text-[0.65rem] xs:text-xs
                                        leading-tight mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </div>
              </div>

              {/* Autres éléments de navigation mobile */}
              {mainNavItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-white/80 hover:text-[#E60023]
                            transition-colors duration-200 font-medium
                            py-2.5 xs:py-3 px-1.5 xs:px-2
                            rounded-md xs:rounded-lg
                            hover:bg-white/10 active:bg-white/20
                            touch-target text-sm xs:text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
        </div>
    </nav>
  );
}