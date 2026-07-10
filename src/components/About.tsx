import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import headshot from '../assets/headshot.jpg';


export const About: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };


  return (
    <section
      id="about"
      className="py-24 bg-zinc-50 dark:bg-[#121212] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual background frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-brand-gold/10 rounded-3xl pointer-events-none hidden md:block" />
            
            {/* Frame containing the headshot */}
            <motion.div
              className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img
                src={headshot}
                alt="Esther — Founder of Estique Designs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-left text-white">
                  <p className="font-heading font-extrabold text-sm tracking-wider uppercase text-brand-gold">
                    Esther Udoh
                  </p>
                  <p className="font-body text-xs text-zinc-300 font-light mt-0.5">
                    Founder & CEO
                  </p>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Section Tag */}
            <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold mb-4">
              ABOUT ESTIQUE
            </span>

            {/* Main Section Header */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-6">
              Meet the Creative Behind Estique Designs
            </h2>

            {/* Mission Hook Quote */}
            <p className="font-heading text-lg md:text-xl font-light text-brand-black dark:text-zinc-300 leading-relaxed mb-6 italic border-l-4 border-brand-gold pl-6">
              "I believe every brand deserves visuals that communicate excellence before a single word is spoken. Through thoughtful design and strategic creativity, I help businesses create lasting impressions."
            </p>

            {/* Personal Story */}
            <div className="font-body text-zinc-600 dark:text-zinc-400 font-light space-y-4 mb-10 leading-relaxed">
              <p>
                Estique Designs is built on the philosophy that visual communication should be both beautiful and highly functional. We combine editorial layouts with modern branding frameworks, designing assets that attract premium clients and establish market credibility.
              </p>
              <p>
                Whether launching a new logo, crafting a cohesive social media campaign, or designing flyers and posters for events, we ensure that every design is tailored to speak your audience's visual language.
              </p>
            </div>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-5 rounded-2xl glass-card text-left"
              >
                <div className="p-2.5 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald w-fit mb-4 dark:bg-brand-emerald/5">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="font-heading font-bold text-sm tracking-wide text-zinc-900 dark:text-white mb-2">
                  Our Mission
                </h3>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  To craft premium visual systems that empower businesses to scale and earn customer loyalty.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-5 rounded-2xl glass-card text-left"
              >
                <div className="p-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold w-fit mb-4 dark:bg-brand-gold/5">
                  <Heart size={18} />
                </div>
                <h3 className="font-heading font-bold text-sm tracking-wide text-zinc-900 dark:text-white mb-2">
                  Our Vision
                </h3>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  To establish Estique as a global premium creative partner known for modern luxury design.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-5 rounded-2xl glass-card text-left"
              >
                <div className="p-2.5 rounded-xl bg-brand-black/10 border border-brand-black/20 text-zinc-900 w-fit mb-4 dark:bg-zinc-800/40 dark:border-zinc-700 dark:text-white">
                  <Sparkles size={18} />
                </div>
                <h3 className="font-heading font-bold text-sm tracking-wide text-zinc-900 dark:text-white mb-2">
                  Design Creed
                </h3>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  Simplicity, clean grid systems, purposeful color choices, and meticulous attention to detail.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
