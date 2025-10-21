import React from 'react';
import { motion as Motion } from 'framer-motion';

const AnimatedText = ({ 
  text, 
  className = "",
  delay = 0,
  duration = 0.05,
  stagger = 0.05,
  type = "words" // words, letters, lines
}) => {
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger,
        delayChildren: delay 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration
      },
    },
  };

  const splitText = () => {
    switch (type) {
      case 'letters':
        return text.split('').map((char, index) => (
          <Motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </Motion.span>
        ));
      case 'lines':
        return text.split('\n').map((line, index) => (
          <Motion.div key={index} variants={child}>
            {line}
          </Motion.div>
        ));
      case 'words':
      default:
        return text.split(' ').map((word, index) => (
          <Motion.span
            key={index}
            variants={child}
            className="inline-block mr-2"
          >
            {word}
          </Motion.span>
        ));
    }
  };

  return (
    <Motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {splitText()}
    </Motion.div>
  );
};

export default AnimatedText;