import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Award, Layers, Users, Download, Eye, X } from 'lucide-react';

export const CareerProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Esther_Udoh_CV.pdf';
    link.download = 'Esther_Udoh_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const highlights = [
    {
      icon: <Briefcase className="text-[#C9A227]" size={20} />,
      title: "Founder & Creative Director",
      description: "Estique Designs — Specialized in visual strategy and brand engineering."
    },
    {
      icon: <Award className="text-[#C9A227]" size={20} />,
      title: "30+ Branding Projects Delivered",
      description: "Proven track record of high-impact brand identities across diverse sectors."
    },
    {
      icon: <Layers className="text-[#C9A227]" size={20} />,
      title: "Brand Identity & Strategy",
      description: "Expertise in logo design, product packaging, and creative art direction."
    },
    {
      icon: <Users className="text-[#C9A227]" size={20} />,
      title: "Multi-Sector Collaborations",
      description: "Helping ministries, businesses, authors, and creators launch confidently."
    }
  ];

  return (
    <section id="career" className="py-24 bg-white dark:bg-[#0c0c0c] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold mb-4 block">
            CAREER BLUEPRINT
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            Career Profile
          </h2>
          <p className="font-body text-zinc-650 dark:text-zinc-400 font-light text-base leading-relaxed">
            Explore my professional journey, creative expertise, and experience helping businesses, ministries, entrepreneurs, authors, and organizations build memorable brands through strategic design and visual communication.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Mockup Column (Right on desktop, First on mobile) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center">
            
            {/* Professional Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#C9A227] font-heading text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              Updated 2026
            </div>

            {/* Document Preview Card Mockup */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={() => setIsModalOpen(true)}
              className="w-full max-w-[340px] aspect-[1/1.41] bg-white border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-400 cursor-pointer overflow-hidden p-6 relative group select-none text-left"
            >
              {/* Overlay hover effect */}
              <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#C9A227] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-350">
                  <Eye size={20} />
                </div>
                <span className="font-heading text-[10px] uppercase tracking-wider text-white font-extrabold shadow-sm">
                  View Career Profile
                </span>
              </div>

              {/* Realistic Document Content Mockup (Pure CSS) */}
              <div className="flex flex-col h-full text-[6px] text-zinc-400 leading-normal select-none pointer-events-none">
                {/* Header */}
                <div className="text-center border-b border-zinc-200 pb-3 mb-3">
                  <div className="font-heading font-black text-[12px] text-zinc-900 tracking-tight leading-none mb-1">
                    ESTHER UDOH
                  </div>
                  <div className="text-[5px] text-zinc-500 uppercase tracking-widest leading-none">
                    Oke-Ira Ogba, Lagos &bull; estherudoh27@gmail.com
                  </div>
                </div>

                {/* Section 1: Profile */}
                <div className="mb-3">
                  <div className="font-heading font-bold text-[7px] text-[#C9A227] uppercase tracking-wider mb-1">
                    Professional Profile
                  </div>
                  <p className="font-light text-zinc-550 line-clamp-4 leading-relaxed">
                    Creative Director, Brand Identity Designer, and Visual Communication Professional with extensive experience in branding, creative strategy, and digital design. Founder and Creative Director of Estique Designs, a premium creative studio dedicated to helping clients...
                  </p>
                </div>

                {/* Section 2: Core Competencies */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <div className="font-heading font-bold text-[7px] text-[#C9A227] uppercase tracking-wider mb-1">
                      Core Competencies
                    </div>
                    <ul className="list-disc pl-2 space-y-0.5 font-light">
                      <li>Brand Identity & Strategy</li>
                      <li>Logo Design & Creative Direction</li>
                      <li>Ministry & Church Branding</li>
                      <li>Book Cover Design</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-[7px] text-[#C9A227] uppercase tracking-wider mb-1">
                      Software Skills
                    </div>
                    <ul className="list-disc pl-2 space-y-0.5 font-light">
                      <li>Adobe Photoshop & Illustrator</li>
                      <li>Adobe InDesign & Figma</li>
                      <li>Canva & Creative AI Tools</li>
                      <li>Project Management</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3: Professional Experience */}
                <div>
                  <div className="font-heading font-bold text-[7px] text-[#C9A227] uppercase tracking-wider mb-1">
                    Professional Experience
                  </div>
                  <div className="mb-1.5">
                    <div className="flex justify-between font-bold text-zinc-800 text-[6px]">
                      <span>Estique Designs &mdash; Lagos, Nigeria</span>
                      <span>2024 &ndash; Present</span>
                    </div>
                    <div className="text-[#C9A227] font-medium text-[5px]">Founder & Creative Director</div>
                    <p className="font-light text-zinc-550 line-clamp-3 mt-0.5 leading-relaxed">
                      Founded and currently lead Estique Designs, a premium creative studio specializing in brand identity design, creative strategy, and visual communication solutions for businesses, ministries, entrepreneurs, authors, and creators.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTAs Below Preview */}
            <div className="mt-8 flex items-center gap-4 w-full max-w-[340px]">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-950 text-white hover:bg-brand-emerald dark:bg-white dark:text-zinc-950 dark:hover:bg-brand-gold transition-all duration-300 font-heading text-[10px] font-extrabold uppercase tracking-widest shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                View Career Profile
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 p-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-brand-emerald dark:hover:border-brand-gold text-zinc-700 dark:text-zinc-300 hover:text-brand-emerald dark:hover:text-brand-gold bg-transparent transition-all hover:scale-[1.05] cursor-pointer"
                title="Download CV"
              >
                <Download size={16} />
              </button>
            </div>

          </div>

          {/* Info Column (Left on desktop, Second on mobile) */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-start text-left">
            
            {/* Milestones Intro */}
            <p className="font-body text-zinc-650 dark:text-zinc-400 font-light text-sm leading-relaxed mb-8 max-w-xl">
              Led by Esther Udoh, a multidisciplinary designer and creative director, Estique Designs is backed by over five years of active visual communication experience. With a background spanning corporate identity development, publication systems, and ministry graphics, Esther has established herself as a trusted visual partner for leaders and brands.
            </p>

            {/* Highlight Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-10">
              {highlights.map((card, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-250/20 dark:border-zinc-900/60 flex items-start gap-4 hover:border-brand-emerald/15 dark:hover:border-brand-gold/15 transition-colors duration-300"
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 shadow-sm flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-zinc-900 dark:text-white mb-1">
                      {card.title}
                    </h4>
                    <p className="font-body text-[10px] text-zinc-500 dark:text-zinc-500 font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Elegant Callout */}
            <div className="border-l-2 border-[#C9A227] pl-4 py-1">
              <span className="font-heading text-sm font-semibold tracking-wide text-zinc-900 dark:text-white block mb-0.5">
                "Discover the experience behind the designs."
              </span>
              <span className="font-body text-[10px] text-zinc-500 dark:text-zinc-500 font-light">
                Inspect the full career blueprint detailing certifications, software skillsets, and corporate history.
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Embedded PDF Viewer Slide Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-4xl bg-zinc-950 border border-zinc-850 rounded-3xl overflow-hidden flex flex-col shadow-2xl h-[85vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-900 bg-zinc-950">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center font-heading font-extrabold text-[10px] text-[#C9A227]">
                    EU
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs text-white leading-none">
                      Esther_Udoh_CV.pdf
                    </h3>
                    <span className="font-body text-[9px] text-zinc-500 font-light">
                      Interactive Document Viewer
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-zinc-950 hover:bg-[#C9A227] hover:text-zinc-950 font-heading text-[9px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Download size={10} /> Download
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Interactive PDF Container */}
              <div className="flex-1 bg-zinc-900 relative">
                <iframe
                  src="/Esther_Udoh_CV.pdf#toolbar=0&navpanes=0&view=FitH"
                  className="w-full h-full border-none"
                  title="Esther Udoh Professional CV"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-gold/5 rounded-full filter blur-3xl -z-10" />
    </section>
  );
};
