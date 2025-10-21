import React, { useState, useEffect } from 'react';

export const OptimizedBackgroundImage = ({
  src,
  children,
  className = '',
  overlay = false,
  overlayOpacity = 0.5,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      setBackgroundUrl(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div
      className={`relative ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      {...props}
    >
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children}
    </div>
  );
};
