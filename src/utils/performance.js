/**
 * Utilitaires de performance pour ArchiAtech
 * - Mesure des Core Web Vitals
 * - Optimisation du rendu
 * - Preloading des ressources critiques
 * - Monitoring des performances
 */

// Core Web Vitals Measurement
export const measureCoreWebVitals = () => {
  // Largest Contentful Paint (LCP)
  const measureLCP = () => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      
      // Envoyer à Google Analytics si disponible
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime),
          custom_map: {
            metric_name: 'LCP',
            metric_value: Math.round(lastEntry.startTime)
          }
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID)
  const measureFID = () => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime),
            custom_map: {
              metric_name: 'FID',
              metric_value: Math.round(entry.processingStart - entry.startTime)
            }
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });
  };

  // Cumulative Layout Shift (CLS)
  const measureCLS = () => {
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000),
          custom_map: {
            metric_name: 'CLS',
            metric_value: Math.round(clsValue * 1000)
          }
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  };

  // Mesurer les Core Web Vitals
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    measureLCP();
    measureFID();
    measureCLS();
  }
};

// Preloading des ressources critiques
export const preloadCriticalResources = () => {
  const criticalResources = [
    // Polices critiques
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    
    // Images critiques
    { href: '/images/hero-desktop.webp', as: 'image' },
    { href: '/images/hero-mobile.webp', as: 'image' },
    
    // Vidéos critiques
    { href: '/videos/20251011_2138_SupportIT.mp4', as: 'video', type: 'video/mp4' },
    
    // CSS critiques
    { href: '/index.css', as: 'style' }
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    
    document.head.appendChild(link);
  });
};

// Optimisation du rendu
export const optimizeRendering = () => {
  // Déferrer les scripts non critiques
  const deferNonCriticalScripts = () => {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach((script) => {
      script.defer = true;
    });
  };

  // Lazy loading des composants non critiques
  const lazyLoadComponents = () => {
    const components = document.querySelectorAll('[data-lazy-component]');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const component = entry.target;
            const componentName = component.dataset.lazyComponent;
            
            // Charger le composant dynamiquement
            import(`../components/${componentName}.jsx`).then((module) => {
              // Remplacer le placeholder par le composant réel
              component.innerHTML = '';
              component.appendChild(new module.default());
            });
            
            observer.unobserve(component);
          }
        });
      });
      
      components.forEach((component) => observer.observe(component));
    }
  };

  // Optimiser les animations
  const optimizeAnimations = () => {
    // Utiliser will-change pour les éléments animés
    const animatedElements = document.querySelectorAll('[data-animated]');
    animatedElements.forEach((element) => {
      element.style.willChange = 'transform, opacity';
      
      // Retirer will-change après animation
      element.addEventListener('animationend', () => {
        element.style.willChange = 'auto';
      });
    });
  };

  // Exécuter les optimisations
  deferNonCriticalScripts();
  lazyLoadComponents();
  optimizeAnimations();
};

// Compression et optimisation des données
export const optimizeDataLoading = () => {
  // Debounce pour les recherches
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Throttle pour les événements de scroll
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  return { debounce, throttle };
};

// Monitoring des performances
export const performanceMonitoring = {
  // Mesurer le temps de chargement des pages
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
        
        console.log('Page Load Time:', loadTime);
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'load',
            value: Math.round(loadTime)
          });
        }
      });
    }
  },

  // Mesurer le temps de rendu
  measureRenderTime: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'react-dom-render') {
            console.log('React Render Time:', entry.duration);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
    }
  },

  // Mesurer la mémoire utilisée
  measureMemoryUsage: () => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = performance.memory;
      console.log('Memory Usage:', {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      });
    }
  }
};

// Initialisation des optimisations de performance
export const initPerformanceOptimizations = () => {
  // Mesurer les Core Web Vitals
  measureCoreWebVitals();
  
  // Preloader les ressources critiques
  preloadCriticalResources();
  
  // Optimiser le rendu
  optimizeRendering();
  
  // Démarrer le monitoring
  performanceMonitoring.measurePageLoad();
  performanceMonitoring.measureRenderTime();
  performanceMonitoring.measureMemoryUsage();
  
  console.log('🚀 Performance optimizations initialized');
};

export default {
  measureCoreWebVitals,
  preloadCriticalResources,
  optimizeRendering,
  optimizeDataLoading,
  performanceMonitoring,
  initPerformanceOptimizations
};
