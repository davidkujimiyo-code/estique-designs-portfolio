import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import headshot from '../assets/headshot.jpg';


export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
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
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full border border-brand-gold/20 animate-float-1 hidden md:block" />
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full border border-brand-emerald/10 animate-float-2 hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left column text */}
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

        {/* Right column image with creative layout */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
        >
          {/* Framed Headshot Container */}
          <div className="relative w-[280px] sm:w-[360px] h-[360px] sm:h-[460px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900 group">
            {/* Emerald/Gold border glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald to-brand-gold opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-10" />
            <img
              src={headshot}
              alt="Esther — Creative Director at Estique Designs"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Floating Monogram Icon */}
          <div className="absolute -bottom-6 -left-6 bg-brand-black text-white p-4 rounded-xl border border-zinc-800 flex items-center gap-3 shadow-xl z-20">
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center font-heading font-extrabold text-xs text-brand-black leading-none">
              ED
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading font-bold text-xs tracking-wider uppercase">
                Esther Udoh
              </span>
              <span className="font-body text-[9px] text-[#777777] font-medium leading-none mt-0.5">
                Founder & CEO
              </span>
            </div>

          </div>

          {/* Floating geometry background element */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-gold/10 rounded-full filter blur-xl z-0" />
        </motion.div>
      </div>
    </section>
  );
};
