import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedText from './AnimatedText';
import ParticleBackground, { AnimatedGradient, FloatingShapes } from './ParticleBackground';
import { MagneticButton, Card3D, RevealText, RippleButton, GlitchText } from './InteractiveElements';
import { ScrollProgress, ScrollReveal, AnimatedCounter, TypewriterText, MorphingShape } from './ScrollAnimations';

const AnimationShowcase = () => {
  return (
    <section id="animation-showcase" className="py-24 px-6 bg-gray-50 relative overflow-hidden">
      {/* Backgrounds Animés */}
      <ParticleBackground particleCount={20} speed={0.3} opacity={0.05} />
      <AnimatedGradient colors={["#dc2626", "#ef4444", "#f87171"]} duration={5} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0.2}>
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Innovations Visuelles</span>
          </ScrollReveal>
          <AnimatedText 
            text="Animations & Interactivité Modernes"
            className="text-5xl font-bold text-gray-900 mb-4 mt-3"
            delay={0.5}
            stagger={0.05}
          />
          <RevealText 
            text="Découvrez les animations avancées qui rendent votre site unique et engageant"
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            delay={0.8}
            direction="up"
          />
        </div>

        {/* Grid d'animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Animation 1: Bouton Magnétique */}
          <ScrollReveal delay={0.2} direction="up" distance={50}>
            <Card3D className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bouton Magnétique</h3>
                <p className="text-gray-600 mb-4">Effet 3D au survol avec attraction magnétique</p>
                <MagneticButton 
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
                  strength={0.3}
                >
                  Testez l'effet
                </MagneticButton>
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Animation 2: Ripple Effect */}
          <ScrollReveal delay={0.4} direction="up" distance={50}>
            <Card3D className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Effet Ripple</h3>
                <p className="text-gray-600 mb-4">Ondes de clic avec animation fluide</p>
                <RippleButton 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                  rippleColor="rgba(255,255,255,0.4)"
                >
                  Cliquez ici
                </RippleButton>
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Animation 3: Texte Glitch */}
          <ScrollReveal delay={0.6} direction="up" distance={50}>
            <Card3D className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(139, 92, 246, 0.7)",
                      "0 0 0 10px rgba(139, 92, 246, 0)",
                      "0 0 0 0 rgba(139, 92, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Effet Glitch</h3>
                <p className="text-gray-600 mb-4">Texte avec effet de perturbation</p>
                <GlitchText 
                  text="Hover me!"
                  className="text-purple-600 font-bold text-lg"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Animation 4: Compteur Animé */}
          <ScrollReveal delay={0.8} direction="up" distance={50}>
            <Card3D className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center">
                <MorphingShape 
                  className="w-16 h-16 mx-auto mb-4"
                  shapes={["circle", "square", "triangle"]}
                  duration={2}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Compteur Animé</h3>
                <p className="text-gray-600 mb-4">Comptage progressif des chiffres</p>
                <div className="text-3xl font-bold text-green-600">
                  <AnimatedCounter end={127} duration={2} />
                  <span className="text-sm text-gray-500"> clients</span>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Animation 5: Typewriter */}
          <ScrollReveal delay={1} direction="up" distance={50}>
            <Card3D className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4"
                  animate={{ 
                    background: [
                      "linear-gradient(45deg, #f97316, #ea580c)",
                      "linear-gradient(135deg, #ea580c, #dc2626)",
                      "linear-gradient(45deg, #dc2626, #f97316)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Machine à Écrire</h3>
                <p className="text-gray-600 mb-4">Texte qui s'écrit automatiquement</p>
                <TypewriterText 
                  texts={["ArchiAtech", "Solutions IA", "Automatisation", "Innovation"]}
                  speed={150}
                  className="text-orange-600 font-bold text-lg"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Animation 6: Forme Morphing */}
          <ScrollReveal delay={1.2} direction="up" distance={50}>
            <Card3D className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center">
                <MorphingShape 
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-pink-600"
                  shapes={["circle", "square", "triangle"]}
                  duration={3}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Morphing Shape</h3>
                <p className="text-gray-600 mb-4">Formes qui se transforment</p>
                <div className="text-pink-600 font-bold text-lg">Transformation continue</div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>

        {/* Section de démonstration interactive */}
        <ScrollReveal delay={0.5} direction="up">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Expérience Interactive Complète
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Testez toutes nos animations en temps réel et découvrez comment elles peuvent transformer votre site web.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton 
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl"
                strength={0.2}
              >
                🎯 Bouton Magnétique
              </MagneticButton>
              
              <RippleButton 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl"
                rippleColor="rgba(255,255,255,0.3)"
              >
                💫 Effet Ripple
              </RippleButton>
              
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 10px 30px rgba(147, 51, 234, 0.2)",
                    "0 20px 40px rgba(147, 51, 234, 0.3)",
                    "0 10px 30px rgba(147, 51, 234, 0.2)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Hover Magic
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AnimationShowcase;
