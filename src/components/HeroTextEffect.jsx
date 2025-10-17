import React from 'react';

const HeroTextEffect = () => {
  return (
    <div className="hero-text-container">
      <h1 className="hero-title">
        Accompagnez votre transformation avec l'
        <span className="ai-text">intelligence artificielle</span>
      </h1>
      
      <style jsx>{`
        .hero-text-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: transparent;
          font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 2rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 1.1;
          text-align: center;
          color: #FFFFFF;
          margin: 0;
          text-shadow: 
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(255, 255, 255, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.25);
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .ai-text {
          color: #E60023;
          background: linear-gradient(135deg, #E60023 0%, #FF1744 50%, #E60023 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
          text-shadow: none;
        }

        .ai-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #E60023 0%, #FF1744 50%, #E60023 100%);
          filter: blur(20px);
          opacity: 0.6;
          z-index: -1;
          border-radius: 8px;
        }

        .ai-text::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: radial-gradient(circle, rgba(230, 0, 35, 0.3) 0%, rgba(26, 26, 46, 0.2) 70%, transparent 100%);
          filter: blur(15px);
          z-index: -2;
          border-radius: 12px;
        }

        /* Effet de halo bleu-gris autour du texte rouge */
        .hero-title::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(26, 26, 46, 0.1) 0%, transparent 70%);
          filter: blur(30px);
          z-index: -3;
          pointer-events: none;
        }

        /* Animation subtile */
        .ai-text {
          animation: glow-pulse 3s ease-in-out infinite alternate;
        }

        @keyframes glow-pulse {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(1.1) saturate(1.2);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(1.8rem, 6vw, 3.5rem);
            line-height: 1.2;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroTextEffect;
