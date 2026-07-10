import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logoMonogramOnly from '../assets/logo-monogram-only.png';

const ThemeToggle: React.FC<{ darkMode: boolean; setDarkMode: (val: boolean) => void }> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="relative flex items-center p-1 rounded-full bg-zinc-200/50 dark:bg-zinc-900/60 border border-zinc-300/30 dark:border-zinc-800/40 backdrop-blur-md shadow-inner select-none transition-all duration-300">
      {/* Sliding background indicator */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute top-1 bottom-1 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-[#C9A227]/30 shadow-md z-0"
        style={{
          left: darkMode ? '4px' : 'calc(50% + 2px)',
          width: 'calc(50% - 6px)',
        }}
      />

      {/* Dark Button */}
      <button
        onClick={() => setDarkMode(true)}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-[9px] uppercase font-bold tracking-widest cursor-pointer transition-colors duration-300 ${
          darkMode 
            ? 'text-[#C9A227] drop-shadow-[0_0_8px_rgba(201,162,39,0.3)]' 
            : 'text-zinc-650 hover:text-zinc-850'
        }`}
      >
        <Moon size={10} className={darkMode ? 'rotate-[15deg] transition-transform duration-300' : ''} />
        <span>Dark</span>
      </button>

      {/* Light Button */}
      <button
        onClick={() => setDarkMode(false)}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-[9px] uppercase font-bold tracking-widest cursor-pointer transition-colors duration-300 ${
          !darkMode 
            ? 'text-[#C9A227] drop-shadow-[0_0_8px_rgba(201,162,39,0.3)]' 
            : 'text-zinc-550 hover:text-zinc-850 dark:text-zinc-450 dark:hover:text-zinc-200'
        }`}
      >
        <Sun size={10} className={!darkMode ? 'rotate-[30deg] transition-transform duration-500' : ''} />
        <span>Light</span>
      </button>
    </div>
  );
};

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Studio', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Profile', href: '#career' },
    { name: 'Contact', href: '#contact' },
  ];


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.hash.startsWith('#');
    if (isHomepage) {
      e.preventDefault();
      const targetElement = document.querySelector('#home');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookClick = () => {
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector('#contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-md'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo container */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 select-none group focus:outline-none"
          >
            <img
              src={logoMonogramOnly}
              alt="Estique Designs Logo"
              className="h-10 sm:h-12 md:h-14 w-auto transform transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="flex flex-col text-left">
              <span className="font-heading font-extrabold text-sm tracking-[0.15em] text-zinc-900 dark:text-white leading-none">
                ESTIQUE
              </span>
              <span className="font-heading text-[8px] tracking-[0.25em] text-brand-gold font-semibold uppercase mt-0.5">
                DESIGNS
              </span>
            </div>
          </a>


          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-heading text-xs tracking-wider uppercase font-semibold transition-colors duration-300 relative py-1 ${
                    isActive
                      ? 'text-brand-emerald dark:text-brand-gold'
                      : 'text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-emerald dark:bg-brand-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions: Theme toggle + CTA + Mobile trigger */}
          <div className="flex items-center gap-4">
            {/* Branded Theme Switch Toggle */}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* CTA Button */}
            <button
              onClick={handleBookClick}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-brand-black text-white hover:bg-brand-emerald dark:bg-white dark:text-brand-black dark:hover:bg-brand-gold hover:scale-105 active:scale-95 transition-all duration-300 font-heading text-xs tracking-wider uppercase font-bold border border-zinc-800 dark:border-zinc-200 shadow-md interactive-hover cursor-pointer"
            >
              Book a Project
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-zinc-900 dark:text-white interactive-hover cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/98 dark:bg-zinc-950/98 flex flex-col justify-center px-8 md:px-16 lg:hidden transition-colors duration-300"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-heading text-3xl font-bold tracking-tight text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white uppercase transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.5 }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.button
                onClick={handleBookClick}
                className="mt-8 px-8 py-4 rounded-full bg-brand-gold text-white font-heading tracking-widest font-extrabold uppercase text-sm w-full hover:bg-brand-gold-light active:scale-95 transition-transform duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.5 }}
              >
                Book a Project
              </motion.button>
            </div>

            {/* Mobile Footer */}
            <div className="absolute bottom-10 left-8 right-8 border-t border-zinc-200 dark:border-zinc-800 pt-6 flex justify-between items-center">
              <span className="font-heading text-[10px] tracking-widest text-zinc-450 dark:text-zinc-650">
                ESTIQUE DESIGNS
              </span>
              <span className="font-heading text-[10px] tracking-widest text-zinc-450 dark:text-zinc-650">
                ©2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
