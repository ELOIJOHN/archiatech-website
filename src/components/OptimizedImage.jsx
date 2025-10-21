import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant OptimizedImage - Image optimisée avec lazy loading
 * - Support WebP avec fallback
 * - Lazy loading natif et IntersectionObserver
 * - Placeholder blur
 * - Responsive images
 * - Performance optimale
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  placeholder = 'blur',
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer pour lazy loading avancé
  useEffect(() => {
    if (isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Commence à charger 50px avant d'être visible
        threshold: 0.01
      }
    );

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [isInView]);

  // Gestion du chargement
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Gestion des erreurs
  const handleError = () => {
    setHasError(true);
    console.error(`Erreur de chargement de l'image: ${src}`);
  };

  // Génération des sources WebP et fallback
  const getImageSources = (imageSrc) => {
    if (!imageSrc) return { webp: null, fallback: null };

    const ext = imageSrc.split('.').pop().toLowerCase();
    const basePath = imageSrc.substring(0, imageSrc.lastIndexOf('.'));

    return {
      webp: `${basePath}.webp`,
      fallback: imageSrc,
      isWebpAvailable: ext === 'webp' || ext === 'jpg' || ext === 'jpeg' || ext === 'png'
    };
  };

  const sources = getImageSources(src);

  // Placeholder pour le blur effect
  const placeholderDataUrl = 
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cfilter id="b" color-interpolation-filters="sRGB"%3E%3CfeGaussianBlur stdDeviation="20"/%3E%3CfeColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1" result="s"/%3E%3CfeFlood x="0" y="0" width="100%25" height="100%25"/%3E%3CfeComposite operator="out" in="s"/%3E%3CfeComposite in2="SourceGraphic"/%3E%3CfeGaussianBlur stdDeviation="20"/%3E%3C/filter%3E%3Cimage width="100%25" height="100%25" x="0" y="0" preserveAspectRatio="none" style="filter: url(%23b);" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="/%3E%3C/svg%3E';

  // Classes pour les états de chargement
  const imageClasses = `
    ${className}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    ${!isLoaded && placeholder === 'blur' ? 'blur-sm' : ''}
    transition-all duration-500 ease-in-out
  `.trim();

  // Si l'image n'est pas encore visible, afficher un placeholder
  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`${className} bg-gray-200 animate-pulse`}
        style={{
          width: width || '100%',
          height: height || '100%',
          objectFit
        }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  // Si erreur de chargement
  if (hasError) {
    return (
      <div
        className={`${className} bg-gray-300 flex items-center justify-center`}
        style={{
          width: width || '100%',
          height: height || '100%'
        }}
      >
        <span className="text-gray-500 text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <picture ref={imgRef} className="contents">
      {/* Source WebP pour navigateurs modernes */}
      {sources.isWebpAvailable && (
        <source
          srcSet={sources.webp}
          type="image/webp"
        />
      )}
      
      {/* Fallback pour anciens navigateurs */}
      <img
        src={sources.fallback}
        alt={alt}
        width={width}
        height={height}
        loading={'lazy'}
        decoding="async"
        className={imageClasses}
        style={{
          objectFit,
          ...(placeholder === 'blur' && !isLoaded && {
            backgroundImage: `url(${placeholderDataUrl})`,
            backgroundSize: 'cover'
          })
        }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
