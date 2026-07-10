import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Wrench, ShieldCheck, HelpCircle, Compass } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { PortfolioItem } from '../data/portfolio';
import { CardPlaceholder } from './Portfolio';





interface ProjectDetailsModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onNavigate: (newItem: PortfolioItem) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  item,
  onClose,
  onNavigate,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  // Find index for next/previous navigation
  const currentIndex = portfolioData.findIndex((p) => p.id === item.id);
  const prevProject = portfolioData[currentIndex - 1] || portfolioData[portfolioData.length - 1];
  const nextProject = portfolioData[currentIndex + 1] || portfolioData[0];

  // Get 3 related projects in the same category (excluding current)
  const relatedProjects = portfolioData
    .filter((p) => p.category === item.category && p.id !== item.id)
    .slice(0, 3);

  // If we don't have enough related projects in the same category, fill with others
  if (relatedProjects.length < 3) {
    const fillers = portfolioData.filter((p) => p.id !== item.id && !relatedProjects.some((rp) => rp.id === p.id));
    relatedProjects.push(...fillers.slice(0, 3 - relatedProjects.length));
  }

  const handleInquiry = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Optionally pre-fill contact form dropdown or message
        const projectSelect = document.getElementById('project-type') as HTMLSelectElement;
        if (projectSelect) {
          projectSelect.value = item.category;
          // Trigger a change event to update React state
          const event = new Event('change', { bubbles: true });
          projectSelect.dispatchEvent(event);
        }
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-6xl bg-white dark:bg-[#0c0c0c] border border-zinc-150 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
          transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 bg-white/90 dark:bg-[#0c0c0c]/90 backdrop-blur-md z-30 px-8 py-5 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
            <div className="flex flex-col text-left">
              <span className="font-heading text-[9px] uppercase tracking-widest text-[#777777] font-semibold">
                CASE STUDY
              </span>
              <span className="font-heading font-extrabold text-sm text-zinc-900 dark:text-white leading-none mt-1">
                {item.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick prev/next desktop buttons */}
              <button
                onClick={() => onNavigate(prevProject)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer interactive-hover"
                title="Previous Project"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => onNavigate(nextProject)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer interactive-hover"
                title="Next Project"
              >
                <ArrowRight size={16} />
              </button>

              {/* Divider */}
              <span className="w-[1px] h-6 bg-zinc-200 dark:bg-zinc-800 mx-2" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-850 dark:text-white transition-colors cursor-pointer interactive-hover"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-8 md:p-12 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Visual Showcase (Sticky-ready) */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800 shadow-sm relative">
                  {item.imageUrl === 'placeholder' || !item.imageUrl ? (
                    <CardPlaceholder category={item.category} title={item.title} />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>



                
                {/* Board Reference Link */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800 flex justify-between items-center text-left">
                  <div>
                    <h4 className="font-heading font-extrabold text-[10px] text-zinc-400 uppercase tracking-widest leading-none">
                      PINTEREST SOURCE
                    </h4>
                    <p className="font-body text-xs text-zinc-700 dark:text-zinc-300 font-semibold mt-1.5">
                      {item.boardName || 'Estique Boards'}
                    </p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-brand-black text-white hover:bg-brand-emerald dark:bg-white dark:text-brand-black dark:hover:bg-brand-gold font-heading text-[10px] uppercase font-bold tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 interactive-hover"
                  >
                    View Pin
                  </a>
                </div>
              </div>

              {/* Right Column: Case Study Text */}
              <div className="lg:col-span-6 flex flex-col text-left">
                {/* Category & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3.5 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald dark:bg-brand-emerald/5 dark:text-brand-emerald font-heading text-[9px] uppercase font-bold tracking-wider">
                    {item.category}
                  </span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 dark:bg-zinc-800/40 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-heading text-[9px] uppercase font-bold tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>



                {/* Case Study Details Grid */}
                <div className="space-y-8">
                  {/* Problem */}
                  <div className="flex gap-4">
                    <div className="p-2.5 h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase text-zinc-900 dark:text-white mb-2">
                        The Design Challenge (Problem)
                      </h4>
                      <p className="font-body text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-light">
                        {item.problem}
                      </p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-4">
                    <div className="p-2.5 h-10 w-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald flex items-center justify-center shrink-0">
                      <Compass size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase text-zinc-900 dark:text-white mb-2">
                        Creative Execution (Strategy & Solution)
                      </h4>
                      <p className="font-body text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-light">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="flex gap-4">
                    <div className="p-2.5 h-10 w-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase text-zinc-900 dark:text-white mb-2">
                        Strategic Business Result (Outcome)
                      </h4>
                      <p className="font-body text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-light">
                        {item.clientOutcome}
                      </p>
                    </div>
                  </div>

                  {/* Tools Badge Grid */}
                  <div className="flex gap-4 border-t border-zinc-100 dark:border-zinc-900 pt-6">
                    <div className="p-2.5 h-10 w-10 rounded-xl bg-zinc-100 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 flex items-center justify-center shrink-0">
                      <Wrench size={18} />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase text-zinc-900 dark:text-white mb-3">
                        Creative Toolkit
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300 font-heading text-[10px] font-bold"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Study Inquiry CTA */}
                <button
                  onClick={handleInquiry}
                  className="mt-10 px-8 py-4 rounded-full bg-brand-emerald text-white hover:bg-brand-emerald/90 active:scale-95 transition-all duration-300 font-heading text-xs tracking-widest uppercase font-bold w-full md:w-fit text-center shadow-lg hover:shadow-brand-emerald/20 interactive-hover"
                >
                  Book a Similar Project
                </button>
              </div>
            </div>

            {/* Related Case Studies Grid Section */}
            <div className="border-t border-zinc-100 dark:border-zinc-900 pt-12 mt-16 text-left">
              <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase text-zinc-400 mb-8">
                Related Design Studies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {relatedProjects.map((relItem) => (
                  <div
                    key={relItem.id}
                    onClick={() => onNavigate(relItem)}
                    className="group cursor-pointer flex flex-col gap-3"
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-250/20 dark:border-zinc-800 relative">
                      {relItem.imageUrl === 'placeholder' || !relItem.imageUrl ? (
                        <CardPlaceholder category={relItem.category} title={relItem.title} />
                      ) : (
                        <img
                          src={relItem.imageUrl}
                          alt={relItem.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="font-heading text-[9px] uppercase tracking-widest font-extrabold text-white px-4 py-2 border border-white/20 rounded-full">
                          View
                        </span>
                      </div>
                    </div>



                    <div>
                      <span className="font-heading text-[8px] uppercase tracking-widest text-[#777777] font-semibold">
                        {relItem.category}
                      </span>
                      <h5 className="font-heading text-sm font-bold text-zinc-900 dark:text-white leading-none mt-1 group-hover:text-brand-emerald dark:group-hover:text-brand-gold transition-colors">
                        {relItem.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
