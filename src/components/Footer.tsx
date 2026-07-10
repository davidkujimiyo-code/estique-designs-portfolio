import React, { useState } from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';
import logoMonogramOnly from '../assets/logo-monogram-only.png';
import { motion, AnimatePresence } from 'framer-motion';



export const Footer: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-zinc-50 dark:bg-[#080808] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 pt-20 pb-20">
      {/* Back-to-Top Button integrated into top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={handleScrollTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          className="w-12 h-12 rounded-full border border-[#C9A227]/40 dark:border-[#C9A227]/30 bg-zinc-950 dark:bg-zinc-950 text-[#C9A227] flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[#C9A227]/10 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* ========================================================================= */}
        {/* DESKTOP FOOTER (Visible on md and above: >= 768px) */}
        {/* ========================================================================= */}
        <div className="w-full hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 border-b border-zinc-200/60 dark:border-zinc-900 pb-12 mb-8 text-left items-start">
          {/* Logo & Brand Statement (md:col-span-5) */}
          <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start pr-0 md:pr-6">
            {/* Left sub-column: Logo */}
            <div className="md:col-span-4 flex justify-start">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); handleScrollTop(); }}
                className="cursor-pointer group block"
                title="Scroll back to top"
              >
                <img
                  src={logoMonogramOnly}
                  alt="Estique Designs EU Monogram"
                  className="h-[120px] md:h-[130px] lg:h-[140px] w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] hover:drop-shadow-[0_0_15px_rgba(201,162,39,0.25)]"
                />
              </a>
            </div>

            {/* Right sub-column: Rich details */}
            <div className="md:col-span-8 flex flex-col items-start text-left">
              <p className="font-heading text-lg md:text-[19px] font-semibold text-zinc-900 dark:text-white leading-snug mb-3">
                Estique Designs is a premium creative studio led by Esther Udoh.
              </p>
              <p className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light leading-relaxed mb-4">
                We specialize in brand identity, logo design, church creatives, book cover design, and marketing visuals that help brands communicate with confidence and leave lasting impressions.
              </p>


              {/* Subdued Premium pills */}
              <div className="flex flex-wrap gap-1.5 mb-5 w-full">
                {['Brand Identity', 'Logo Design', 'Church Designs', 'Book Covers', 'Social Media', 'Creative Direction'].map((service) => (
                  <span
                    key={service}
                    className="px-2.5 py-1 rounded-full text-[9px] font-heading font-bold tracking-wider uppercase bg-zinc-150/40 border border-zinc-200/30 dark:bg-zinc-900/60 dark:border-zinc-800/40 text-zinc-550 dark:text-zinc-450 hover:text-brand-emerald dark:hover:text-brand-gold hover:border-brand-emerald/20 dark:hover:border-brand-gold/20 transition-colors"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="w-full">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 text-white hover:bg-brand-emerald dark:bg-white dark:text-zinc-950 dark:hover:bg-brand-gold transition-all duration-300 font-heading text-[10px] font-extrabold uppercase tracking-wider shadow-md hover:shadow-brand-emerald/10 dark:hover:shadow-brand-gold/10 hover:scale-[1.02] active:scale-[0.98] mb-2 interactive-hover cursor-pointer"
                >
                  Start Your Project <ArrowRight size={12} />
                </a>
                <p className="font-body text-[9px] text-zinc-400 dark:text-zinc-500 font-light tracking-wide">
                  Trusted by businesses, ministries, entrepreneurs, and authors.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="font-heading text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 dark:text-zinc-600 mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-body text-xs text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors font-light"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Design Services list */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="font-heading text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 dark:text-zinc-600 mb-4">
              Services
            </h4>
            <div className="flex flex-col gap-2.5">
              <span className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light">Church Designs</span>
              <span className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light">Brand Identity</span>
              <span className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light">Book Cover Designs</span>
              <span className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light">Social Media Designs</span>
              <span className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light">Event Flyers</span>
              <span className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light">Corporate Branding</span>
            </div>
          </div>

          {/* Contact & Socials details */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="font-heading text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 dark:text-zinc-600 mb-4">
              Contact Information
            </h4>
            <p className="font-heading text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Esther Udoh
            </p>
            <p className="font-body text-[10px] text-zinc-400 dark:text-zinc-500 font-light uppercase tracking-wider mb-4">
              Founder & Creative Director
            </p>
            
            <div className="flex flex-col gap-2 mb-5 font-light">
              <a
                href="mailto:estherudoh27@gmail.com"
                className="font-body text-xs text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors break-all"
              >
                estherudoh27@gmail.com
              </a>
              <a
                href="https://wa.me/2349027966779"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Social Icons Media Strip */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://pin.it/2tTOplPYr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="text-zinc-400 dark:text-zinc-500 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors cursor-pointer"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.13.9 2.73.1.12.11.23.08.35l-.34 1.39c-.06.23-.19.28-.44.17-1.64-.76-2.66-3.15-2.66-5.07 0-4.13 3-7.92 8.65-7.92 4.54 0 8.07 3.24 8.07 7.56 0 4.52-2.85 8.16-6.8 8.16-1.33 0-2.58-.69-3.01-1.5l-.82 3.14c-.3 1.14-1.1 2.57-1.64 3.44C10.3 23.83 11.13 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="mailto:estherudoh27@gmail.com"
                whileHover={{ scale: 1.15, y: -2 }}
                className="text-zinc-400 dark:text-zinc-500 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors cursor-pointer"
                aria-label="Email"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://wa.me/2349027966779"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="text-zinc-400 dark:text-zinc-500 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors cursor-pointer"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.414 9.866-9.842.002-2.63-1.023-5.101-2.885-6.965C16.388 1.936 13.91 .916 11.278.916c-5.44 0-9.866 4.414-9.87 9.846-.001 1.77.472 3.498 1.372 5.048L1.722 20.3l4.925-1.146zM17.6 14.86c-.305-.153-1.808-.891-2.088-.992-.28-.101-.485-.153-.688.153-.203.305-.785.992-.962 1.194-.178.203-.355.228-.66.076-2.066-1.033-3.41-1.78-4.768-4.108-.36-.615.36-.572 1.033-1.921.114-.228.057-.428-.028-.58-.086-.153-.688-1.659-.942-2.27-.248-.596-.5-.514-.688-.523-.178-.009-.38-.01-.582-.01-.203 0-.533.076-.812.38-.28.305-1.066 1.042-1.066 2.541s1.09 2.946 1.243 3.149c.153.203 2.146 3.277 5.198 4.593.726.313 1.293.5 1.734.64.729.23 1.39.198 1.913.12.583-.087 1.808-.738 2.062-1.451.254-.714.254-1.325.178-1.452-.076-.127-.28-.203-.585-.355z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE FOOTER (Redesigned for screen sizes < 768px: block md:hidden) */}
        {/* ========================================================================= */}
        <div className="w-full block md:hidden border-b border-zinc-200/60 dark:border-zinc-900 pb-12 mb-8 text-center">
          
          {/* Top Branding Block */}
          <div className="flex flex-col items-center justify-center mb-10 px-2">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleScrollTop(); }}
              className="cursor-pointer group block mb-5 active:scale-95 transition-transform"
              title="Scroll back to top"
            >
              <img
                src={logoMonogramOnly}
                alt="Estique Designs EU Monogram"
                className="h-24 w-auto object-contain mx-auto transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(201,162,39,0.25)]"
              />
            </a>

            <p className="font-heading text-lg font-semibold text-zinc-900 dark:text-white leading-snug mb-2 max-w-sm">
              Estique Designs is a premium creative studio led by Esther Udoh.
            </p>
            <p className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light leading-relaxed max-w-sm mb-6">
              We specialize in brand identity, logo design, church creatives, book cover design, and marketing visuals that help brands communicate with confidence and leave lasting impressions.
            </p>


            {/* Subdued Premium pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6 max-w-xs">
              {['Brand Identity', 'Logo Design', 'Church Designs', 'Book Covers', 'Social Media', 'Creative Direction'].map((service) => (
                <span
                  key={service}
                  className="px-2.5 py-1 rounded-full text-[9px] font-heading font-bold tracking-wider uppercase bg-zinc-150/40 border border-zinc-250/20 dark:bg-zinc-900/60 dark:border-zinc-800/40 text-zinc-550 dark:text-zinc-450"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* "Start Your Project" CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 w-full flex flex-col items-center justify-center"
            >
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white hover:bg-brand-emerald dark:bg-white dark:text-zinc-950 dark:hover:bg-brand-gold transition-all duration-300 font-heading text-[10px] font-extrabold uppercase tracking-widest shadow-md active:scale-95 relative overflow-hidden group cursor-pointer"
              >
                {/* Refined Shimmer Effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shimmer-once" />
                Start Your Project <ArrowRight size={12} />
              </a>
              <p className="font-body text-[9px] text-zinc-400 dark:text-zinc-500 font-light tracking-wide mt-2">
                Trusted by businesses, ministries, entrepreneurs, and authors.
              </p>
            </motion.div>

            {/* Social Icons Media Strip */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <motion.a
                href="https://pin.it/2tTOplPYr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-zinc-550 dark:text-zinc-450 hover:text-brand-emerald dark:hover:text-brand-gold hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.3)] transition-colors cursor-pointer p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-full"
                aria-label="Pinterest"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.13.9 2.73.1.12.11.23.08.35l-.34 1.39c-.06.23-.19.28-.44.17-1.64-.76-2.66-3.15-2.66-5.07 0-4.13 3-7.92 8.65-7.92 4.54 0 8.07 3.24 8.07 7.56 0 4.52-2.85 8.16-6.8 8.16-1.33 0-2.58-.69-3.01-1.5l-.82 3.14c-.3 1.14-1.1 2.57-1.64 3.44C10.3 23.83 11.13 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="mailto:estherudoh27@gmail.com"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-zinc-550 dark:text-zinc-450 hover:text-brand-emerald dark:hover:text-brand-gold hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.3)] transition-colors cursor-pointer p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-full"
                aria-label="Email"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://wa.me/2349027966779"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-zinc-550 dark:text-zinc-450 hover:text-brand-emerald dark:hover:text-brand-gold hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.3)] transition-colors cursor-pointer p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-full"
                aria-label="WhatsApp"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.414 9.866-9.842.002-2.63-1.023-5.101-2.885-6.965C16.388 1.936 13.91 .916 11.278.916c-5.44 0-9.866 4.414-9.87 9.846-.001 1.77.472 3.498 1.372 5.048L1.722 20.3l4.925-1.146zM17.6 14.86c-.305-.153-1.808-.891-2.088-.992-.28-.101-.485-.153-.688.153-.203.305-.785.992-.962 1.194-.178.203-.355.228-.66.076-2.066-1.033-3.41-1.78-4.768-4.108-.36-.615.36-.572 1.033-1.921.114-.228.057-.428-.028-.58-.086-.153-.688-1.659-.942-2.27-.248-.596-.5-.514-.688-.523-.178-.009-.38-.01-.582-.01-.203 0-.533.076-.812.38-.28.305-1.066 1.042-1.066 2.541s1.09 2.946 1.243 3.149c.153.203 2.146 3.277 5.198 4.593.726.313 1.293.5 1.734.64.729.23 1.39.198 1.913.12.583-.087 1.808-.738 2.062-1.451.254-.714.254-1.325.178-1.452-.076-.127-.28-.203-.585-.355z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Collapsible Accordion Sections */}
          <div className="space-y-4 px-2 max-w-sm mx-auto">
            
            {/* Navigation Accordion */}
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-900 overflow-hidden bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md transition-all duration-300">
              <button
                onClick={() => toggleAccordion('navigation')}
                aria-expanded={openAccordion === 'navigation'}
                className="w-full flex items-center justify-between px-6 py-4 font-heading text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-250 focus:outline-none hover:bg-zinc-100/30 dark:hover:bg-zinc-900/30 transition-colors cursor-pointer"
              >
                <span>Navigation</span>
                <motion.span
                  animate={{ rotate: openAccordion === 'navigation' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#C9A227] text-[10px]"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openAccordion === 'navigation' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3.5 pb-6 pt-2 items-center">
                      {navLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => {
                            handleLinkClick(e, link.href);
                            setOpenAccordion(null);
                          }}
                          className="font-body text-xs text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors font-light py-1"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Accordion */}
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-900 overflow-hidden bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md transition-all duration-300">
              <button
                onClick={() => toggleAccordion('services')}
                aria-expanded={openAccordion === 'services'}
                className="w-full flex items-center justify-between px-6 py-4 font-heading text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-250 focus:outline-none hover:bg-zinc-100/30 dark:hover:bg-zinc-900/30 transition-colors cursor-pointer"
              >
                <span>Services</span>
                <motion.span
                  animate={{ rotate: openAccordion === 'services' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#C9A227] text-[10px]"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openAccordion === 'services' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3.5 pb-6 pt-2 items-center text-center">
                      {[
                        'Church Designs',
                        'Brand Identity',
                        'Book Cover Designs',
                        'Social Media Designs',
                        'Event Flyers',
                        'Corporate Branding'
                      ].map((serviceName) => (
                        <span key={serviceName} className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light py-1">
                          {serviceName}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Accordion */}
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-900 overflow-hidden bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md transition-all duration-300">
              <button
                onClick={() => toggleAccordion('contact')}
                aria-expanded={openAccordion === 'contact'}
                className="w-full flex items-center justify-between px-6 py-4 font-heading text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-250 focus:outline-none hover:bg-zinc-100/30 dark:hover:bg-zinc-900/30 transition-colors cursor-pointer"
              >
                <span>Contact Information</span>
                <motion.span
                  animate={{ rotate: openAccordion === 'contact' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#C9A227] text-[10px]"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openAccordion === 'contact' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col pb-6 pt-2 items-center">
                      <p className="font-heading text-xs font-bold text-zinc-850 dark:text-zinc-200 mb-1">
                        Esther Udoh
                      </p>
                      <p className="font-body text-[9px] text-zinc-450 dark:text-zinc-550 font-light uppercase tracking-wider mb-4">
                        Founder & Creative Director
                      </p>
                      
                      <div className="flex flex-col gap-3.5 items-center font-light w-full">
                        <a
                          href="mailto:estherudoh27@gmail.com"
                          className="font-body text-xs text-[#C9A227] hover:underline transition-colors break-all py-1"
                        >
                          estherudoh27@gmail.com
                        </a>
                        <a
                          href="https://wa.me/2349027966779"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-xs text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors py-1"
                        >
                          Chat on WhatsApp
                        </a>
                        <a
                          href="https://pin.it/2tTOplPYr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-xs text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors py-1"
                        >
                          Pinterest
                        </a>
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-xs text-zinc-650 dark:text-zinc-400 hover:text-brand-emerald dark:hover:text-brand-gold transition-colors py-1"
                        >
                          Instagram
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Copyright Layout footer bar */}
        <div className="w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-body text-[10px] text-zinc-500 dark:text-zinc-500 font-medium">
            &copy; 2026 Estique Designs.
          </p>
          <p className="font-body text-[10px] text-zinc-450 dark:text-zinc-500 font-light tracking-widest uppercase">
            Designed with passion and creative excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

