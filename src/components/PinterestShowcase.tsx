import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { CardPlaceholder } from './Portfolio';

export const PinterestShowcase: React.FC = () => {
  // Take 6 projects to showcase in the Pinterest feed
  const pinsToShow = portfolioData.slice(3, 9);

  return (
    <section
      id="pinterest"
      className="py-24 bg-zinc-950 text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Red/Gold ambient gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-650 rounded-full filter blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-gold rounded-full filter blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-left">
          <div className="max-w-xl">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-red-500 mb-4 block">
              PINTEREST GALLERY
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Explore Our Live Boards
            </h2>
            <p className="font-body text-zinc-400 font-light text-base leading-relaxed">
              We update our creative collections daily with fresh layouts, flyer explorations, and typography systems. Check out our board directly.
            </p>
          </div>

          <a
            href="https://pin.it/2tTOplPYr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-heading text-xs tracking-wider uppercase font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-red-600/20 interactive-hover"
          >
            Visit Pinterest Board <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Masonry-inspired grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {pinsToShow.map((pin, idx) => (
            <motion.div
              key={pin.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900 group cursor-pointer break-inside-avoid flex flex-col"
            >
              {pin.imageUrl === 'placeholder' || !pin.imageUrl ? (
                <CardPlaceholder category={pin.category} title={pin.title} />
              ) : (
                <img
                  src={pin.imageUrl}
                  alt={pin.title || 'Pinterest Pin'}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-103"
                />
              )}

              {/* Overlaid Hover State */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="font-heading text-[8px] uppercase tracking-widest text-red-500 font-bold mb-1">
                  {pin.category}
                </span>
                <h4 className="font-heading text-base font-bold text-white mb-2 leading-none">
                  {pin.title || 'Visual Study'}
                </h4>
                <a
                  href={pin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-[9px] uppercase tracking-widest font-extrabold text-[#777777] hover:text-white flex items-center gap-1 mt-1 transition-colors"
                >
                  Inspect on Pinterest <ArrowUpRight size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
