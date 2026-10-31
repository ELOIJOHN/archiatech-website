import React, { useRef } from 'react';
import BrandIcon from './BrandIcon';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } } };
const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } };

export default function HeroSection() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Effet « Apple » : en défilant, le logo recule légèrement et s'estompe.
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden bg-black text-white min-h-[100svh] flex flex-col items-center justify-center
                 px-5 sm:px-8 pt-24 pb-16 sm:pt-28"
    >
      {/* Halo rouge discret derrière le logo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Motion.div
          className="absolute left-1/2 top-[34%] h-[38rem] w-[38rem] sm:h-[52rem] sm:w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full
                     bg-[radial-gradient(circle,rgba(247,13,26,0.32)_0%,rgba(247,13,26,0.08)_45%,transparent_70%)]"
          animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <Motion.div
        className="relative z-10 w-full max-w-4xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Motion.div variants={rise} style={reduce ? undefined : { scale: logoScale, opacity: logoOpacity }}>
          <img
            src="/images/logo-archiatech-hero.webp"
            alt="ArchiAtech Digital Solutions"
            width="860"
            height="600"
            fetchpriority="high"
            className="mx-auto w-[78vw] max-w-[420px] sm:max-w-[520px] lg:max-w-[580px] h-auto select-none"
            draggable="false"
          />
        </Motion.div>

        <Motion.div style={reduce ? undefined : { y: textY }}>
          <Motion.h1
            variants={rise}
            className="mt-8 sm:mt-10 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-white"
          >
            L&apos;IA et l&apos;automatisation,
            <br />
            <span className="hero-shimmer-dark">sans perdre le contrôle.</span>
          </Motion.h1>

          <Motion.p variants={rise} className="mt-5 text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Conseil, automatisation et support IT pour les PME. Monaco et France.
          </Motion.p>

          <Motion.div variants={rise} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="/contact/?objet=audit#formulaire"
              className="hero-btn-ring inline-flex items-center gap-2 rounded-full bg-[#F70D1A] hover:bg-[#ff1f3f] text-white font-semibold px-8 py-3.5 text-base sm:text-lg transition-colors"
            >
              <BrandIcon className="h-5 w-auto" /> Audit gratuit <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="#offres" className="inline-flex items-center gap-1 text-[#ff5a6e] hover:text-white font-medium text-base sm:text-lg transition-colors">
              Voir nos offres <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Motion.div>
        </Motion.div>
      </Motion.div>

      <a
        href="#services"
        aria-label="Découvrir nos services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors"
      >
        <Motion.span
          className="block"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-7 h-7" aria-hidden="true" />
        </Motion.span>
      </a>
    </section>
  );
}
