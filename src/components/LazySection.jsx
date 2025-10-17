import React, { useState, useRef, useEffect, Suspense } from 'react';

/**
 * Composant LazySection - Chargement différé des sections
 * - Lazy loading avec IntersectionObserver
 * - Placeholder pendant chargement
 * - Suspense pour les composants React
 * - Optimisation des performances
 */
const LazySection = ({ 
  children, 
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  placeholder = null,
  fallback = null,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin]);

  // Placeholder par défaut
  const defaultPlaceholder = (
    <div className="min-h-[400px] bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Chargement...</div>
    </div>
  );

  // Si pas encore visible, afficher le placeholder
  if (!isVisible) {
    return (
      <div
        ref={sectionRef}
        className={className}
        {...props}
      >
        {placeholder || defaultPlaceholder}
      </div>
    );
  }

  // Si visible mais pas encore chargé, afficher avec Suspense
  return (
    <div
      ref={sectionRef}
      className={className}
      {...props}
    >
      <Suspense fallback={fallback || defaultPlaceholder}>
        {children}
      </Suspense>
    </div>
  );
};

/**
 * Hook pour lazy loading de composants
 */
const useLazyComponent = (importFn, deps = []) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!Component && !loading) {
      setLoading(true);
      importFn()
        .then((module) => {
          setComponent(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [Component, loading, ...deps]);

  return { Component, loading, error };
};

/**
 * Composant pour lazy loading de modules
 */
const LazyModule = ({ 
  importFn, 
  fallback = null,
  errorFallback = null,
  ...props 
}) => {
  const { Component, loading, error } = useLazyComponent(importFn);

  if (error) {
    return errorFallback || <div className="text-red-500">Erreur de chargement</div>;
  }

  if (loading || !Component) {
    return fallback || (
      <div className="min-h-[200px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Chargement du module...</div>
      </div>
    );
  }

  return <Component {...props} />;
};

export default LazySection;
