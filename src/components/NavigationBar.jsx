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
        ? 'bg-[#E60023]/90 backdrop-blur-xl border-b border-white/20'
        : 'bg-[#E60023]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo ArchiAtech - Optimisé responsive */}
          <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                            bg-gradient-to-br from-[#E60023] to-red-800
                            rounded-md xs:rounded-lg sm:rounded-xl
                            flex items-center justify-center
                            touch-target">
              <Cpu className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
              Archi<span className="text-white">Atech</span>
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
                          text-white hover:text-white transition-all duration-300
                          font-semibold group touch-target
                          text-base lg:text-lg xl:text-xl
                          px-4 py-3 rounded-lg
                          hover:bg-white/10"
              >
                <span>ArchiAtech</span>
                <ChevronDown className={`nav-dropdown-arrow w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6
                                        transition-all duration-300
                                        ${isDropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
              </button>

              {/* Dropdown Menu - Z-index augmenté */}
              {isDropdownOpen && (
                <div
                  className="nav-dropdown absolute top-full left-0 mt-3
                            w-72 md:w-80 lg:w-[340px]
                            rounded-2xl overflow-hidden
                            z-dropdown
                            bg-gradient-to-br from-[#E60023]/75 via-[#E60023]/70 to-[#C4001D]/75
                            backdrop-blur-2xl border border-white/20
                            shadow-[0_8px_32px_rgba(230,0,35,0.3),0_0_0_1px_rgba(255,255,255,0.1)]"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="p-2.5 md:p-3">
                    {archiSubmenu.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <a
                          key={index}
                          href={item.href}
                          className="nav-dropdown-item flex items-center
                                    gap-3.5 md:gap-4
                                    p-3.5 md:p-4
                                    rounded-xl
                                    transition-all duration-300 group
                                    touch-target
                                    hover:bg-white/20 bg-white/0
                                    hover:shadow-lg hover:shadow-black/10
                                    hover:-translate-y-0.5
                                    border border-white/0 hover:border-white/20"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="nav-dropdown-icon flex-shrink-0
                                        w-11 h-11 md:w-12 md:h-12
                                        rounded-xl
                                        flex items-center justify-center
                                        bg-white shadow-lg shadow-black/10
                                        group-hover:scale-110 group-hover:rotate-3
                                        transition-all duration-300">
                            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#E60023]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="nav-dropdown-text text-white font-semibold
                                          text-sm md:text-base transition-colors
                                          group-hover:text-white/95 mb-0.5">
                              {item.label}
                            </div>
                            <div className="nav-dropdown-description text-white/70
                                          text-xs md:text-[0.8125rem]
                                          leading-relaxed
                                          group-hover:text-white/80 transition-colors">
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
                          font-medium touch-target text-base lg:text-lg xl:text-xl whitespace-nowrap
                          px-3 py-2 rounded-lg hover:bg-white/10"
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