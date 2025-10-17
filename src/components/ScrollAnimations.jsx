import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Animation de scroll progressif
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-700 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Section avec effet de parallaxe
export const ParallaxSection = ({ 
  children, 
  speed = 0.5,
  className = ""
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Animation de révélation au scroll
export const ScrollReveal = ({ 
  children, 
  className = "",
  delay = 0,
  direction = "up",
  distance = 100,
  duration = 0.8
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      scale: direction === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Timeline animée
export const AnimatedTimeline = ({ items, className = "" }) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <ScrollReveal
          key={index}
          delay={index * 0.2}
          direction="right"
          distance={100}
        >
          <motion.div
            className="relative mb-8 last:mb-0"
            whileHover={{ x: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Ligne de connexion */}
            {index < items.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-red-500 to-red-600" />
            )}
            
            {/* Point de timeline */}
            <div className="absolute left-4 top-4 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg" />
            
            {/* Contenu */}
            <div className="ml-16">
              {item}
            </div>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
};

// Animation de compteur
export const AnimatedCounter = ({ 
  end, 
  duration = 2,
  className = ""
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
};

// Animation de morphing
export const MorphingShape = ({ 
  shapes = ["circle", "square", "triangle"],
  duration = 3,
  className = ""
}) => {
  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [shapes.length, duration]);

  const getShapeStyle = (shape) => {
    switch (shape) {
      case "circle":
        return { borderRadius: "50%" };
      case "square":
        return { borderRadius: "0%" };
      case "triangle":
        return { 
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          borderRadius: "0%"
        };
      default:
        return { borderRadius: "50%" };
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-br from-red-500 to-red-600 ${className}`}
      animate={getShapeStyle(shapes[currentShape])}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  );
};

// Animation de typing
export const TypewriterText = ({ 
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = ""
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? deleteSpeed : isPaused ? pauseTime : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Animation de carousel 3D
export const Carousel3D = ({ 
  items,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative h-64 perspective-1000">
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const isActive = offset === 0;
          const isPrev = offset === -1;
          const isNext = offset === 1;

          return (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{
                x: offset * 300,
                z: isActive ? 0 : -100,
                scale: isActive ? 1 : 0.8,
                opacity: Math.abs(offset) <= 1 ? 1 : 0,
                rotateY: offset * 45,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className={`w-full h-full transition-all duration-300 ${
                isActive ? "z-20" : isPrev || isNext ? "z-10" : "z-0"
              }`}>
                {item}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-4 space-x-4">
        <motion.button
          onClick={prevItem}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Précédent
        </motion.button>
        <motion.button
          onClick={nextItem}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Suivant
        </motion.button>
      </div>
    </div>
  );
};
