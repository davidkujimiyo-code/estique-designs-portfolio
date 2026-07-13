import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { PortfolioItem } from '../data/portfolio';
import logoCollage from '../assets/logo-collage.jpg';




// Premium CSS/SVG placeholder card when no image is loaded
export const CardPlaceholder: React.FC<{ category: string; title: string }> = ({ category, title }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-[#121212] to-zinc-900 flex flex-col justify-between p-8 border border-zinc-800/40 relative overflow-hidden select-none group min-h-[300px]">
      {/* Abstract Glowing Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-brand-gold/5 filter blur-sm group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-brand-emerald/5 filter blur-xs group-hover:scale-105 transition-transform duration-700" />
      
      {/* Top Banner */}
      <div className="flex justify-between items-center z-10">
        <span className="font-heading text-[8px] uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold font-bold">
          ESTIQUE DESIGNS
        </span>
        <div className="w-6 h-6 rounded-full border border-brand-gold/30 bg-black flex items-center justify-center font-heading font-extrabold text-[8px] text-brand-gold">
          ED
        </div>
      </div>
      
      {/* Center Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10 transform group-hover:rotate-12 transition-transform duration-700">
        <span className="font-heading text-8xl font-black text-brand-gold tracking-tight select-none">
          EU
        </span>
      </div>

      {/* Bottom info */}
      <div className="text-left z-10">
        <span className="font-heading text-[8px] uppercase tracking-widest text-brand-emerald dark:text-brand-gold font-extrabold block mb-1">
          {category}
        </span>
        <h4 className="font-heading text-sm font-bold text-white leading-tight">
          {title}
        </h4>
        <span className="font-body text-[9px] text-zinc-500 font-light mt-1.5 block">
          Creative Concept Layout
        </span>
      </div>
    </div>
  );
};

interface PortfolioProps {
  onSelectItem: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6); // load-more limit


  const categories = [
    'All',
    'Brand Identity Design',
    'Church Media Design',
    'Social Media Design',
    'Marketing Campaign Design',
    'Book Cover Design',
    'Print Design',
  ];




  // 1. Featured Projects: 6-8 items
  const featuredProjects = useMemo(() => {
    return portfolioData.filter((item) => item.isFeatured);
  }, []);

  // 2. All Projects (Remaining): non-featured items filtered by category/search
  const filteredRemainingProjects = useMemo(() => {
    return portfolioData
      .filter((item) => !item.isFeatured)
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'All' ||
          item.category === activeCategory ||
          item.tags.includes(activeCategory);
        
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
      });
  }, [activeCategory, searchQuery]);

  const displayedRemaining = useMemo(() => {
    return filteredRemainingProjects.slice(0, visibleCount);
  }, [filteredRemainingProjects, visibleCount]);

  const hasMore = filteredRemainingProjects.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section
      id="portfolio"
      className="py-24 bg-zinc-50 dark:bg-[#0c0c0c] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold mb-4 block">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            Our Creative Portfolio
          </h2>
          <p className="font-body text-zinc-650 dark:text-zinc-400 font-light text-base leading-relaxed">
            Explore original, strategic designs produced by Estique Designs. Select any card to inspect the objective, visual strategy, and tools behind the work.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: FEATURED PROJECTS */}
        {/* ========================================================================= */}
        <div className="mb-24 text-left">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-10 flex items-baseline justify-between">
            <h3 className="font-heading text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-white">
              Featured Projects
            </h3>
            <span className="font-body text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
              Estique Highlights &bull; {featuredProjects.length} Designs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                onClick={() => onSelectItem(item)}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-zinc-200/40 dark:border-zinc-850 bg-[#fbfbfb] dark:bg-[#111111] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col md:grid md:grid-cols-12 min-h-[320px]"
              >
                {/* Visual Image container (5 cols) */}
                <div className="md:col-span-5 relative bg-zinc-150 dark:bg-zinc-900 flex items-center justify-center overflow-hidden aspect-[4/3] md:aspect-auto">
                  {item.imageUrl === 'placeholder' || !item.imageUrl ? (
                    <CardPlaceholder category={item.category} title={item.title} />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />


                  )}
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="px-5 py-2.5 rounded-full bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-white font-heading text-[10px] uppercase tracking-widest font-extrabold shadow-lg border border-brand-gold/15">
                      Case Study
                    </span>
                  </div>
                </div>

                {/* Details side container (7 cols) */}
                <div className="md:col-span-7 p-8 flex flex-col justify-between">
                  <div>
                    <span className="font-heading text-[8px] uppercase tracking-widest text-brand-emerald dark:text-brand-gold font-extrabold mb-3 block">
                      {item.category}
                    </span>
                    <h4 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mb-4 leading-snug group-hover:text-brand-emerald dark:group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Card tools and action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-850 pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.slice(0, 2).map((tool) => (
                        <span key={tool} className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 font-heading text-[8px] font-bold uppercase tracking-wider">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 font-heading text-[9px] uppercase tracking-wider font-extrabold text-brand-emerald dark:text-brand-gold group-hover:translate-x-1.5 transition-transform duration-300">
                      View details <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: ALL PROJECTS (REMAINING) */}
        {/* ========================================================================= */}


        <div className="text-left">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-white mb-1">
                More Creative Works
              </h3>
              <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light">
                Browse our remaining projects filtered by specific disciplines.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input
                type="text"
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-850 focus:outline-none focus:border-brand-emerald dark:focus:border-brand-gold text-xs text-zinc-900 dark:text-white placeholder-zinc-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filter Categories Scroller */}
          <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-none mb-12 -mx-6 px-6 md:-mx-0 md:px-0">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/40 border border-zinc-200/20 w-max">
              <div className="flex items-center gap-1 px-3 text-zinc-500 dark:text-zinc-400 font-heading text-[10px] uppercase font-bold tracking-wider">
                <SlidersHorizontal size={12} />
                Filter:
              </div>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full font-heading text-[10px] tracking-wider uppercase font-extrabold transition-all duration-300 whitespace-nowrap cursor-pointer interactive-hover ${
                      isActive
                        ? 'bg-brand-emerald text-white shadow-md dark:bg-brand-gold dark:text-brand-black'
                        : 'text-zinc-650 dark:text-zinc-400 hover:text-brand-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700/40'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Showcase Hero Block for Brand Identity & Logo Design */}
          {(activeCategory === 'Logo Design' || activeCategory === 'Brand Identity') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 bg-white dark:bg-[#111111] border border-zinc-200/50 dark:border-zinc-850 rounded-3xl p-6 md:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center shadow-lg"
            >
              {/* Left Column: Image (7 cols) */}
              <div className="lg:col-span-7 w-full overflow-hidden rounded-2xl border border-zinc-200/30 dark:border-zinc-800 relative group">
                <img
                  src={logoCollage}
                  alt="Estique Designs Logo Collection"
                  className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-102"
                />
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-zinc-950/10 dark:bg-zinc-950/20 pointer-events-none" />
              </div>

              {/* Right Column: Copy & Stats (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full text-left pr-0 lg:pr-4">
                <div>
                  <span className="font-heading text-[8px] uppercase tracking-widest text-brand-emerald dark:text-brand-gold font-extrabold mb-3 block">
                    Featured Collection
                  </span>
                  <h4 className="font-heading text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-2">
                    Logo Design & Brand Identity
                  </h4>
                  <p className="font-heading text-[10px] text-brand-emerald dark:text-[#C9A227] tracking-wider uppercase font-semibold mb-4 leading-normal">
                    Crafting distinctive visual identities that help businesses, ministries, creators, and entrepreneurs become instantly recognizable.
                  </p>
                  <p className="font-body text-xs text-zinc-650 dark:text-zinc-400 font-light leading-relaxed mb-6">
                    Esther Udoh's design philosophy views logos as strategic assets rather than simple illustrations. Every design is meticulously handcrafted to translate a brand's core values, target audience, and market positioning into an iconic, memorable visual signature that establishes confidence and lasting impact.
                  </p>
                  
                  {/* Brand List bullet tags */}
                  <div className="border-t border-zinc-150/40 dark:border-zinc-900/60 pt-4 mb-6">
                    <span className="font-heading text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-550 font-bold block mb-2">
                      Brands Featured Above
                    </span>
                    <p className="font-body text-[10px] text-zinc-500 dark:text-zinc-500 font-light leading-relaxed">
                      Kobit Stores &bull; Daughters With Oil &bull; Evritin Loiza 360 &bull; DFlourish Leather &bull; Fulness Hairvens &bull; Kohted Ventures &bull; The Rest Podcast &bull; Ajeku &bull; Damiglow Tribe &bull; Esther Unique &bull; SparklePro Nigeria
                    </p>
                  </div>
                </div>

                {/* Subdued Stats strips */}
                <div className="flex items-center gap-6 border-t border-zinc-150/40 dark:border-zinc-900/60 pt-4">
                  <div>
                    <span className="font-heading text-xl font-bold text-brand-emerald dark:text-brand-gold">15+</span>
                    <span className="font-body text-[9px] text-zinc-500 block">Real Brands served</span>
                  </div>
                  <div>
                    <span className="font-heading text-xl font-bold text-[#C9A227]">100%</span>
                    <span className="font-body text-[9px] text-zinc-500 block">Custom tailored</span>
                  </div>
                  <a
                    href="#contact"
                    className="ml-auto inline-flex items-center gap-1.5 font-heading text-[9px] uppercase tracking-widest font-extrabold text-brand-emerald dark:text-brand-gold hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    Start branding <ArrowRight size={10} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Responsive Masonry Grid of Remaining Items */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
          >

            <AnimatePresence mode="popLayout">
              {displayedRemaining.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => onSelectItem(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/40 dark:border-zinc-850 bg-[#fbfbfb] dark:bg-[#111111] shadow-md hover:shadow-xl transition-all duration-500 break-inside-avoid flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden w-full bg-zinc-150 dark:bg-zinc-900 flex items-center justify-center aspect-[4/3] sm:aspect-auto">
                    {item.imageUrl === 'placeholder' || !item.imageUrl ? (
                      <CardPlaceholder category={item.category} title={item.title} />
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-103"
                        loading="lazy"
                      />


                    )}
                    {/* Hover detail trigger */}
                    <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-white font-heading text-[9px] uppercase tracking-widest font-extrabold shadow-md border border-brand-gold/15">
                        Inspect
                      </span>
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="p-6 text-left border-t border-zinc-100 dark:border-zinc-850 bg-white dark:bg-[#111111]">
                    <span className="font-heading text-[8px] uppercase tracking-widest text-brand-emerald dark:text-brand-gold font-extrabold mb-2 block">
                      {item.category}
                    </span>
                    <h4 className="font-heading text-base font-bold text-zinc-900 dark:text-white mb-2 leading-snug group-hover:text-brand-emerald dark:group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="font-body text-[11px] text-zinc-550 dark:text-zinc-400 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredRemainingProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center mb-4 text-zinc-400 border border-zinc-200/20">
                <SlidersHorizontal size={18} />
              </div>
              <h4 className="font-heading text-base font-bold text-zinc-900 dark:text-white mb-1">
                No Projects Found
              </h4>
              <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light">
                Try adjusting your category filters or search keywords.
              </p>
            </motion.div>
          )}

          {/* Load More Option */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-brand-emerald dark:hover:border-brand-gold text-zinc-800 dark:text-zinc-200 hover:text-brand-emerald dark:hover:text-brand-gold font-heading text-xs tracking-wider uppercase font-bold transition-all cursor-pointer active:scale-98 interactive-hover"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


