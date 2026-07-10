import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialItem {
  name: string;
  brand: string;
  role: string;
  quote: string;
  projects: string[];
  tags: string[];
  initials: string;
}

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  // Native touch gesture tracking
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const testimonials: TestimonialItem[] = [
    {
      name: "Damiglow",
      brand: "DAMIGLOW TRIBE",
      role: "YouTube Content Creator",
      quote: "Estique Designs completely transformed my online presence. Esther created a stunning visual ecosystem—from my logo and YouTube thumbnails to flyer designs and custom book covers. This cohesive, premium look instantly elevated my brand, increased viewer trust, and helped me connect with my tribe with ultimate confidence. Her creative direction is truly top-tier.",
      projects: ["Book Cover Design", "YouTube Thumbnail Design", "Logo Design", "Brand Flyer Design"],
      tags: ["Book Cover", "YouTube Branding", "Logo Design", "Brand Flyer"],
      initials: "DT"
    },
    {
      name: "Lois Amarachi",
      brand: "Evritin Loiza 360",
      role: "Founder",
      quote: "Collaborating with Estique Designs was a game-changer for Evritin Loiza 360. Esther designed a breathtaking logo, premium marketing flyers, and product packaging that instantly caught our customers' attention. The strategic visual identity gave our products a high-end luxury feel, drastically boosting our customer appeal and positioning us as a professional, trusted brand in our industry.",
      projects: ["Logo Design", "Brand Flyer Design", "Product Packaging Design"],
      tags: ["Logo Design", "Packaging", "Brand Identity"],
      initials: "EL"
    },
    {
      name: "IBK",
      brand: "Kobit Stores",
      role: "Business Owner",
      quote: "Esther's professionalism and attention to detail are unmatched. She took the time to understand Kobit Stores' vision, delivering a memorable logo and promotional flyers that perfectly capture our brand's essence. Having a polished, high-quality identity has built immense trust with our customers and set us apart from competitors. I highly recommend her creative services.",
      projects: ["Logo Design", "Brand Flyer Design"],
      tags: ["Logo Design", "Business Branding"],
      initials: "KS"
    },
    {
      name: "Pastor Owolabi Emmanuel",
      brand: "The Husband Blueprint Movement",
      role: "Founder & Pioneer",
      quote: "Visual clarity is essential for communicating ministry vision, and Estique Designs delivered exactly that. Esther crafted a powerful brand identity, a polished portfolio, and a striking book cover for The Husband Blueprint. Her work represents exceptional professional branding that commands respect and allows us to present our spiritual message with confidence and absolute clarity.",
      projects: ["Book Cover Design", "Brand Identity", "Brand Portfolio"],
      tags: ["Ministry Branding", "Book Cover", "Brand Identity"],
      initials: "HB"
    },
    {
      name: "Pastor Kehinde Lemoshe",
      brand: "Kenny Apparel",
      role: "Founder",
      quote: "Working with Esther to launch Kenny Apparel was an exceptional experience. She developed a sleek, premium brand identity and marketing flyers that perfectly reflect our fashion brand's high standards. This visual consistency has significantly enhanced our customer appeal, giving us a major competitive edge and establishing our studio's professional presence from day one.",
      projects: ["Brand Identity", "Brand Flyer Design"],
      tags: ["Fashion Branding", "Brand Identity"],
      initials: "KA"
    },
    {
      name: "Funmi Alimi",
      brand: "Daughters With Oil",
      role: "Founder",
      quote: "Estique Designs brought purpose-driven elegance to our ministry's visual presentation. Esther designed a beautiful logo, cohesive brand assets, and marketing flyers for Daughters With Oil that perfectly align with our spiritual calling. The visual consistency and premium quality of her work have built deep trust within our community, helping us communicate our message with grace.",
      projects: ["Logo Design", "Brand Flyer Design", "Brand Identity"],
      tags: ["Logo Design", "Brand Identity", "Ministry Branding"],
      initials: "DO"
    }
  ];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Sliding variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const stats = [
    { value: '30+', label: 'Projects Delivered' },
    { value: '15+', label: 'Brands Served' },
    { value: '100%', label: 'Custom Designs' },
    { value: '6+', label: 'Creative Services' }
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-zinc-50 dark:bg-[#080808] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Trusted by Brands & Ministries
          </h2>
          <p className="font-body text-zinc-650 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Real businesses, ministries, entrepreneurs, and creators who trusted Estique Designs to bring their vision to life.
          </p>
        </div>

        {/* Client Showcase Card Slider */}
        <div
          className="relative max-w-5xl mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden py-4 px-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 }
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Column: Brand & Service Card */}
                <div className="md:col-span-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-[#C9A227]/30 dark:hover:border-[#C9A227]/25 transition-all duration-300">
                  <div>
                    {/* Brand Initial Emblem */}
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800 flex items-center justify-center font-heading font-extrabold text-[#C9A227] mb-6 text-sm tracking-wide shadow-sm">
                      {testimonials[activeIndex].initials}
                    </div>

                    <h3 className="font-heading font-bold text-xl text-zinc-900 dark:text-white leading-tight mb-1">
                      {testimonials[activeIndex].brand}
                    </h3>
                    <div className="font-body text-xs text-zinc-500 dark:text-zinc-500 font-light mb-6">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{testimonials[activeIndex].name}</span>
                      <span className="mx-2">&bull;</span>
                      {testimonials[activeIndex].role}
                    </div>
                  </div>

                  <div className="border-t border-zinc-150/40 dark:border-zinc-900/60 pt-6">
                    <span className="font-heading text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-650 font-bold block mb-3">
                      Services Delivered
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {testimonials[activeIndex].tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded text-[9px] font-heading font-bold uppercase tracking-wider bg-zinc-100/60 dark:bg-zinc-900/60 border border-zinc-200/30 dark:border-zinc-800/30 text-zinc-550 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Premium Quote Card */}
                <div className="md:col-span-8 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden hover:border-brand-emerald/30 dark:hover:border-[#C9A227]/25 transition-all duration-300">
                  {/* Decorative Quote Icon Background */}
                  <div className="absolute -top-4 -right-4 text-zinc-100 dark:text-zinc-900/30 pointer-events-none">
                    <Quote size={120} className="transform rotate-180 opacity-60" />
                  </div>

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6 text-[#C9A227]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" className="stroke-none" />
                      ))}
                    </div>

                    <blockquote className="font-heading text-lg md:text-2xl font-light text-zinc-950 dark:text-zinc-200 leading-relaxed mb-6 italic">
                      "{testimonials[activeIndex].quote}"
                    </blockquote>
                  </div>

                  <div className="relative z-10 border-t border-zinc-150/40 dark:border-zinc-900/60 pt-6 flex flex-wrap gap-x-8 gap-y-2 text-left">
                    <div>
                      <span className="font-heading text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-650 font-bold block mb-1">
                        Completed Projects
                      </span>
                      <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light">
                        {testimonials[activeIndex].projects.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Pagination & Navigation controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-brand-emerald dark:hover:border-brand-gold text-zinc-700 dark:text-zinc-300 hover:text-brand-emerald dark:hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer interactive-hover"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Slider Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-6 bg-brand-emerald dark:bg-brand-gold' : 'w-2 bg-zinc-300 dark:bg-zinc-700'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-brand-emerald dark:hover:border-brand-gold text-zinc-700 dark:text-zinc-300 hover:text-brand-emerald dark:hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer interactive-hover"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Brand Stat Banner */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-900 pt-16 mt-16 text-center">
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-400 dark:text-zinc-500 mb-8">
            Trusted by entrepreneurs, ministries, authors, fashion brands, and content creators.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex flex-col items-center p-4 bg-white dark:bg-zinc-950/40 border border-zinc-200/30 dark:border-zinc-900/40 rounded-2xl shadow-sm"
              >
                <span className="font-heading text-3xl md:text-4xl font-extrabold text-[#C9A227] tracking-tight">
                  {stat.value}
                </span>
                <span className="font-body text-[10px] text-zinc-500 dark:text-zinc-500 mt-2 font-medium tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Background Accent Shape blur */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-brand-emerald/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-brand-gold/5 rounded-full filter blur-3xl -z-10" />
    </section>
  );
};

