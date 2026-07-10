import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoFullCropped from '../assets/logo-full-cropped.png';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved as 'dark' | 'light');
    } else if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const duration = 2000; // 2 seconds loader
    const interval = 20; // update every 20ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600); // Wait for sliding animation
          }, 400);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className={`fixed inset-0 z-[99999] flex flex-col justify-between p-8 md:p-16 select-none transition-colors duration-300 ${theme === 'dark' ? 'bg-[#111111]' : 'bg-zinc-50'}`}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Header */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img
                src={logoFullCropped}
                alt="Estique Designs Logo"
                className="h-10 sm:h-14 w-auto object-contain"
              />




              <span className="font-heading font-semibold text-xs tracking-[0.2em] text-[#C9A227]">
                ESTIQUE DESIGNS
              </span>
            </div>
            <span className={`font-heading font-medium text-xs tracking-widest ${theme === 'dark' ? 'text-[#555555]' : 'text-[#777777]'}`}>
              CREATIVE STUDIO ©2026
            </span>
          </div>


          {/* Center Brand / Progress */}
          <div className="flex flex-col items-start max-w-2xl text-left">
            <h2 className={`font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Designs That Make Brands{' '}
              <span className="text-[#138F01]">Impossible</span> to Ignore.
            </h2>
            <p className={`font-body text-sm md:text-base max-w-md ${theme === 'dark' ? 'text-[#777777]' : 'text-zinc-650'}`}>
              Helping premium brands stand out through strategic visual design, event graphics, and marketing assets.
            </p>
          </div>

          {/* Footer with Counter */}
          <div className={`flex justify-between items-end w-full border-t pt-8 ${theme === 'dark' ? 'border-[#222222]' : 'border-zinc-200'}`}>
            <div className="flex flex-col text-left">
              <span className={`font-heading text-[10px] tracking-[0.3em] ${theme === 'dark' ? 'text-[#555555]' : 'text-[#777777]'}`}>
                INITIALIZING EXPERIENCE
              </span>
              <span className={`font-body text-xs mt-1 ${theme === 'dark' ? 'text-[#777777]' : 'text-zinc-550'}`}>
                Visual Artistry & Brand Identity
              </span>
            </div>
            
            {/* Elegant big numbers */}
            <div className="overflow-hidden h-20 md:h-32 flex items-baseline">
              <span className={`font-heading text-7xl md:text-9xl font-extrabold tabular-nums leading-none ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {Math.round(progress)}
              </span>
              <span className="font-heading text-xl md:text-3xl font-semibold text-[#C9A227] ml-2">
                %
              </span>
            </div>
          </div>

          {/* Loading bar details */}
          <div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#138F01] to-[#C9A227] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
