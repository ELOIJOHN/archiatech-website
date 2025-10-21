import { useEffect } from 'react';

export const useImagePreload = (imageSources) => {
  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;

    const preloadImages = imageSources.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.allSettled(preloadImages).then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`Échec du preload de l'image: ${imageSources[index]}`);
        }
      });
    });
  }, [imageSources]);
};
