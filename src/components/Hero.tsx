import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

// Lazy-loaded luxury 3D scene
const Hero3D = React.lazy(() =>
  import('./Hero3D').then((m) => ({ default: m.Hero3D }))
);

// Premium Abstract Fallback Background & Static Illustration
// Used when WebGL is loading, unsupported, or if prefers-reduced-motion is active
// Premium Abstract Fallback Background & Static Illustration
// Used when WebGL is loading, unsupported, or if prefers-reduced-motion is active
const PremiumFallback: React.FC<{ reduceMotion: boolean; isDark: boolean }> = ({ reduceMotion, isDark }) => {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[580px] lg:min-h-[620px] rounded-3xl overflow-hidden bg-[#fbfbfb] dark:bg-[#0d0d0d] border border-zinc-200/40 dark:border-zinc-800/40 shadow-2xl flex items-center justify-center">
      {/* Ambient Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-600/[0.04] dark:bg-emerald-600/10 rounded-full filter blur-[80px] ${reduceMotion ? '' : 'animate-pulse-slow'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-gold/[0.06] dark:bg-brand-gold/15 rounded-full filter blur-[100px] ${reduceMotion ? '' : 'animate-pulse-slower'}`} />
        <div className={`absolute -inset-[10px] opacity-25 mix-blend-color-dodge filter blur-md bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-transparent to-transparent dark:from-zinc-800 ${reduceMotion ? '' : 'animate-drift-streak'}`} />
      </div>

      {/* Floating Gold Dust Particles */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const delay = i * 0.8;
            const left = 15 + Math.random() * 70;
            const size = 2 + Math.random() * 3.5;
            return (
              <div
                key={i}
                className="absolute bg-brand-gold rounded-full opacity-50 animate-float-particle"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                  bottom: `-10px`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Abstract Luxury Architectural Sculpture Vector Illustration (Shifted Right) */}
      <div className="relative z-10 opacity-70 scale-95 md:scale-100 flex flex-col items-center">
        <svg width="240" height="320" viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          <g transform="translate(20, 5) scale(1.24)" transform-origin="120 140">
            {/* Base Pedestal */}
            <rect x="75" y="260" width="90" height="15" rx="1" fill={isDark ? "#1A1A1A" : "#E2DFD8"} stroke={isDark ? "#2A2A2A" : "#D1CDC5"} strokeWidth="0.5" />
            
            {/* Gold Gimbal Rings */}
            <ellipse cx="120" cy="140" rx="90" ry="90" stroke="#D4B895" strokeWidth="1.2" strokeDasharray="6,4" className={reduceMotion ? '' : 'animate-pulse-slow'} />
            <ellipse cx="120" cy="140" rx="76" ry="76" stroke="#D4B895" strokeWidth="0.8" />
            
            {/* Central Cube (behind panels) */}
            <rect x="85" y="105" width="70" height="70" rx="4" fill={isDark ? "#181818" : "#E6E3DB"} />
            
            {/* Emerald Core insert (Soft glow + Precision Octahedron Prism) */}
            <circle cx="120" cy="140" r="18" fill="#10B981" opacity="0.15" filter="blur(4px)" />
            <polygon points="120,122 138,140 120,158 102,140" fill="#10B981" opacity="0.85" />

            {/* 4 Floating Side Panels */}
            {/* Left Panel */}
            <rect x="67" y="110" width="8" height="60" rx="1" fill={isDark ? "#2C2C2C" : "#F7F5F0"} stroke={isDark ? "#3A3A3A" : "#DCD8CF"} strokeWidth="0.5" />
            {/* Right Panel */}
            <rect x="165" y="110" width="8" height="60" rx="1" fill={isDark ? "#2C2C2C" : "#F7F5F0"} stroke={isDark ? "#3A3A3A" : "#DCD8CF"} strokeWidth="0.5" />
            {/* Top Panel */}
            <rect x="80" y="87" width="80" height="8" rx="1" fill={isDark ? "#2C2C2C" : "#F7F5F0"} stroke={isDark ? "#3A3A3A" : "#DCD8CF"} strokeWidth="0.5" />
            {/* Bottom Panel */}
            <rect x="80" y="185" width="80" height="8" rx="1" fill={isDark ? "#2C2C2C" : "#F7F5F0"} stroke={isDark ? "#3A3A3A" : "#DCD8CF"} strokeWidth="0.5" />

            {/* Orbiting Gold Tiles */}
            <rect x="175" y="85" width="12" height="12" rx="1.5" fill="#D4B895" />
            <rect x="52" y="185" width="10" height="10" rx="1.5" fill="#D4B895" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Detect browser reduced motion setting
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
      if (e.matches) {
        setWebGLSupported(false); // Force static fallback layout if reduced motion is preferred
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    if (motionQuery.matches) {
      setWebGLSupported(false);
    }

    // 2. Perform raw WebGL support check
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      if (!hasWebGL) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }

    // 3. Track theme switch dynamically
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (id === '#contact') {
      trackEvent('book_a_project_click', { location: 'hero_section' });
    } else if (id === '#portfolio') {
      trackEvent('nav_click', { link_name: 'View Portfolio (Hero)' });
    }

    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white dark:bg-[#0a0a0a]"
    >
      {/* Background Gradients & Floating Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft radial emerald blur */}
        <div className="absolute top-1/4 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-emerald/5 rounded-full filter blur-[80px] md:blur-[120px] dark:bg-brand-emerald/[0.02]" />
        {/* Soft radial gold blur */}
        <div className="absolute bottom-1/4 right-0 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-brand-gold/5 rounded-full filter blur-[100px] md:blur-[150px] dark:bg-brand-gold/[0.02]" />

        {/* Abstract Floating Circles */}
        {!reduceMotion && (
          <>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full border border-brand-gold/20 animate-float-1 hidden md:block" />
            <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full border border-brand-emerald/10 animate-float-2 hidden md:block" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left column text (Preserved exactly as requested) */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Studio Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 mb-6 dark:bg-brand-emerald/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
            <span className="font-heading text-[10px] uppercase tracking-widest font-bold text-brand-emerald dark:text-zinc-300">
              Premium Creative Studio
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.08] mb-6"
          >
            Designs That Make <br />
            Brands <span className="title-reveal">Impossible</span> <br />
            to Ignore.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-8 leading-relaxed font-light"
          >
            Helping businesses stand out through strategic branding, premium graphic design, and visually compelling marketing materials that attract attention and build trust.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            {/* Book a Project */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 rounded-full bg-brand-emerald text-white hover:bg-brand-emerald/90 active:scale-95 transition-all duration-300 font-heading text-xs tracking-wider uppercase font-bold flex items-center gap-2 shadow-lg hover:shadow-brand-emerald/25 shadow-emerald-500/10 interactive-hover"
            >
              Book a Project <ArrowRight size={14} />
            </button>

            {/* View Portfolio */}
            <button
              onClick={() => scrollToSection('#portfolio')}
              className="px-8 py-4 rounded-full bg-transparent text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 active:scale-95 transition-all duration-300 font-heading text-xs tracking-wider uppercase font-bold flex items-center gap-2 interactive-hover"
            >
              View Portfolio
            </button>
          </motion.div>

          {/* Fast facts / Stats counters */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 md:gap-10 border-t border-zinc-100 dark:border-zinc-900 pt-8 w-full"
          >
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-zinc-900 dark:text-white leading-none mb-1.5">
                5+
              </h3>
              <p className="font-body text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-500 font-bold">
                Years Experience
              </p>
            </div>
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-zinc-900 dark:text-white leading-none mb-1.5">
                150+
              </h3>
              <p className="font-body text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-500 font-bold">
                Brands Served
              </p>
            </div>
            <div>
              <h3 className="font-heading text-3xl font-extrabold text-zinc-900 dark:text-white leading-none mb-1.5">
                98%
              </h3>
              <p className="font-body text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-500 font-bold">
                Client Trust
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right column image/3D scene container */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative w-full h-[400px] md:h-[580px] lg:h-[620px] lg:w-[120%] lg:-ml-[10%] z-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1], delay: 0.35 }}
        >
          {/* WebGL 3D Canvas */}
          {webGLSupported ? (
            <>
              {/* Fallback & Loading Backdrop (Zero layout shift) */}
              <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${threeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <PremiumFallback reduceMotion={reduceMotion} isDark={isDark} />
              </div>

              {/* Real 3D Experience (Fades in dynamically) */}
              <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${threeLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Ambient Breathing Studio Glows (Champagne & Emerald) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className={`w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(212,184,149,0.22)_0%,_rgba(212,184,149,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(212,184,149,0.12)_0%,_rgba(212,184,149,0)_70%)] blur-[90px] ${reduceMotion ? '' : 'animate-pulse-slow'}`} />
                  <div className={`absolute w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.16)_0%,_rgba(16,185,129,0)_70%)] blur-[80px] ${reduceMotion ? '' : 'animate-pulse-slower'}`} style={{ mixBlendMode: 'plus-lighter' }} />
                </div>

                <React.Suspense fallback={null}>
                  <Hero3D
                    onLoaded={() => setThreeLoaded(true)}
                    fallback={<PremiumFallback reduceMotion={reduceMotion} isDark={isDark} />}
                  />
                </React.Suspense>
              </div>
            </>
          ) : (
            /* Pure Premium Fallback (No WebGL available or reduced motion active) */
            <PremiumFallback reduceMotion={reduceMotion} isDark={isDark} />
          )}
        </motion.div>
      </div>
    </section>
  );
};
