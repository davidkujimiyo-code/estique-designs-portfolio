import React from 'react';
import { motion } from 'framer-motion';

interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export const DesignProcess: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      num: '01',
      title: 'Discovery',
      description: 'Understanding your business targets, target audience preferences, visual aspirations, and current brand pain points.',
    },
    {
      num: '02',
      title: 'Research',
      description: 'Analyzing competitors, studying market positioning, and gathering modern luxury design inspirations.',
    },
    {
      num: '03',
      title: 'Strategy',
      description: 'Formulating typography systems, structural layout rules, brand palettes, and style guides tailored for your niche.',
    },
    {
      num: '04',
      title: 'Design',
      description: 'Creating high-fidelity vector shapes, custom layouts, posters, or books using premium grid structures.',
    },
    {
      num: '05',
      title: 'Review',
      description: 'Presenting visual drafts to align with user directions, making revisions to refine spacing and details.',
    },
    {
      num: '06',
      title: 'Delivery',
      description: 'Deploying high-resolution vector and raster assets, layered design systems, and launch guidelines.',
    },
  ];

  return (
    <section
      id="process"
      className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl text-left mb-20">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold mb-4 block">
            HOW WE WORK
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            Our Design Process
          </h2>
          <p className="font-body text-zinc-600 dark:text-zinc-400 font-light text-base leading-relaxed">
            A methodical, strategy-led approach that takes ideas from raw briefs to pixel-perfect, premium realities.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="relative">
          {/* Central Connecting Line for Desktop */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-100 dark:bg-zinc-900 -translate-x-1/2 z-0">
            {/* Animated filling line as view triggers */}
            <motion.div
              className="w-full bg-gradient-to-b from-brand-emerald to-brand-gold origin-top"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`flex flex-col md:flex-row relative z-10 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-start md:items-center`}
                >
                  {/* Indicator Dot */}
                  <div className="absolute left-[30px] md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#0a0a0a] border-4 border-brand-emerald dark:border-brand-gold -translate-x-1/2 flex items-center justify-center shadow-md z-20">
                    <span className="w-2 h-2 rounded-full bg-brand-emerald dark:bg-brand-gold" />
                  </div>

                  {/* Content Panel (Left or Right) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12 text-left">
                    <motion.div
                      className="p-8 rounded-2xl glass-card text-left flex gap-6 hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Big Number */}
                      <span className="font-heading text-4xl font-extrabold text-brand-gold dark:text-zinc-700 leading-none">
                        {step.num}
                      </span>
                      
                      {/* Step Text */}
                      <div>
                        <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white mb-2.5">
                          {step.title}
                        </h3>
                        <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
