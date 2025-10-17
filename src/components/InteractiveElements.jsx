import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Bouton avec effet magnétique
export const MagneticButton = ({ 
  children, 
  className = "",
  strength = 0.3,
  ...props 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (event.clientX - centerX) * strength;
    const distanceY = (event.clientY - centerY) * strength;
    
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      style={{ x, y, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Carte avec effet 3D
export const Card3D = ({ 
  children, 
  className = "",
  intensity = 20,
  ...props 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [intensity, -intensity]);
  const rotateY = useTransform(x, [-100, 100], [-intensity, intensity]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Texte avec effet de révélation
export const RevealText = ({ 
  text, 
  className = "",
  delay = 0,
  direction = "up"
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        animate={isVisible ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

// Loader animé
export const AnimatedLoader = ({ 
  size = 40,
  color = "#dc2626",
  className = ""
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: size / 4,
            height: size / 4,
            backgroundColor: color,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

// Effet de parallaxe
export const ParallaxElement = ({ 
  children, 
  speed = 0.5,
  className = ""
}) => {
  const y = useMotionValue(0);

  return (
    <motion.div
      className={className}
      style={{ y }}
      onViewportChange={(entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementHeight = rect.height;
          
          const progress = (viewportHeight - elementTop) / (viewportHeight + elementHeight);
          y.set((progress - 0.5) * speed * 100);
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Bouton avec effet ripple
export const RippleButton = ({ 
  children, 
  className = "",
  rippleColor = "rgba(255,255,255,0.3)",
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
};

// Effet de glitch pour le texte
export const GlitchText = ({ 
  text, 
  className = "",
  glitchIntensity = 0.1
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);
  };

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onHoverStart={triggerGlitch}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          textShadow: [
            "0 0 0 transparent",
            "2px 0 0 #ff0000",
            "-2px 0 0 #00ff00",
            "0 0 0 transparent"
          ]
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};
