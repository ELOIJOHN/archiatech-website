import React from 'react';
import { motion } from 'framer-motion';

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
    visible: (i = 1) => ({
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
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </motion.span>
        ));
      case 'lines':
        return text.split('\n').map((line, index) => (
          <motion.div key={index} variants={child}>
            {line}
          </motion.div>
        ));
      case 'words':
      default:
        return text.split(' ').map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ));
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {splitText()}
    </motion.div>
  );
};

export default AnimatedText;
