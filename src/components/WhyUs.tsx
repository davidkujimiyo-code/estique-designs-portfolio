import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Maximize2, 
  Gem, 
  Target, 
  MessageSquare, 
  Infinity as InfinityIcon, 
  HelpCircle 
} from 'lucide-react';

interface ReasonItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const WhyUs: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      icon: <Sparkles size={20} />,
      title: 'Creative Excellence',
      description: 'We strive for visual perfection in every project, pushing design boundaries to make your brand stand out.',
    },
    {
      icon: <Zap size={20} />,
      title: 'Fast Delivery',
      description: 'We value your project timelines. Our structured workflow ensures we deliver high-end designs quickly without sacrificing details.',
    },
    {
      icon: <Maximize2 size={20} />,
      title: 'Attention to Detail',
      description: 'Every layout element, font weight, line spacing, and color gradient is carefully adjusted for a cohesive finish.',
    },
    {
      icon: <Gem size={20} />,
      title: 'Affordable Premium Quality',
      description: 'Get world-class editorial designs at standard prices, maximizing the value of your design investment.',
    },
    {
      icon: <Target size={20} />,
      title: 'Brand-Focused Thinking',
      description: 'We align visual outputs with your brand objectives, ensuring every flyer, logo, and cover speaks to your target audience.',
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'Excellent Communication',
      description: 'We keep you updated at every stage of the design cycle, offering rapid responses and updates.',
    },
    {
      icon: <InfinityIcon size={20} />,
      title: 'Unlimited Creativity',
      description: 'We offer fresh concepts tailored to your brand, avoiding templates to give you a unique visual identity.',
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'Reliable Support',
      description: 'We provide post-delivery assistance, helping you format files, prepare print layouts, and answer visual questions.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };


  return (
    <section
      id="why-us"
      className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold mb-4 block">
            THE ESTIQUE ADVANTAGE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            Why Work With Estique Designs
          </h2>
          <p className="font-body text-zinc-600 dark:text-zinc-400 font-light text-base leading-relaxed">
            We partner with entrepreneurs, startups, and organizations to solve branding and marketing design challenges, serving as a reliable creative partner.
          </p>
        </div>

        {/* 8-Grid reasons */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              className="p-6 rounded-2xl border border-zinc-100 bg-[#fbfbfb] dark:bg-[#111111] dark:border-zinc-900 hover:border-brand-emerald/40 dark:hover:border-brand-gold/40 hover:shadow-lg transition-all duration-300 text-left flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="p-3 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald dark:bg-zinc-800 dark:border-zinc-700 dark:text-brand-gold mb-5">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white mb-2 tracking-wide">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="font-body text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
