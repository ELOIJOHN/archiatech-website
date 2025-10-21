import { useEffect } from 'react';

export const useVideoPreload = (videoSources) => {
  useEffect(() => {
    if (!videoSources || videoSources.length === 0) return;

    videoSources.forEach((src) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = src;
    });
  }, [videoSources]);
};
