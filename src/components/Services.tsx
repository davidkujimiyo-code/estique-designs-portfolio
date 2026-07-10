import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSignature, 
  Crown, 
  Hash, 
  Compass, 
  CalendarDays, 
  Contact2, 
  Briefcase, 
  BookOpen, 
  Presentation, 
  Megaphone, 
  Printer, 
  UsersRound 
} from 'lucide-react';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  deliverables: string[];
  turnaround: string;
}

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const services: ServiceItem[] = [
    {
      icon: <FileSignature size={24} />,
      title: 'Logo Design',
      description: 'Crafting unique, memorable typographic and abstract logomarks that capture the essence of your business.',
      deliverables: ['Primary logo', 'Alternate marks', 'Vector files (AI, SVG, PDF)', 'Logo style guide'],
      turnaround: '5 - 7 Business Days',
    },
    {
      icon: <Crown size={24} />,
      title: 'Brand Identity Design',
      description: 'Building complete, cohesive brand visual systems including typography styles, patterns, color schemes, and styles.',
      deliverables: ['Logo suite', 'Color palette definitions', 'Typography styling guide', 'Complete brand identity book'],
      turnaround: '2 - 3 Weeks',
    },
    {
      icon: <Hash size={24} />,
      title: 'Social Media Design',
      description: 'Designing outstanding templates, carousels, and stories to keep your online feeds unified, professional, and engaging.',
      deliverables: ['Instagram grid templates', 'Sermon quote layouts', 'Story templates', 'LinkedIn/Facebook banners'],
      turnaround: '4 - 6 Business Days',
    },
    {
      icon: <Compass size={24} />,
      title: 'Flyers & Posters',
      description: 'High-impact print and digital announcements styled for promotional campaigns, sermon series, and events.',
      deliverables: ['Print-ready PDF files', 'High-res JPEG/PNG files', 'Square & story size adaptations'],
      turnaround: '3 - 5 Business Days',
    },
    {
      icon: <CalendarDays size={24} />,
      title: 'Event Branding',
      description: 'Full identity design for conferences, luxury parties, weddings, or concerts, covering all physical and digital graphics.',
      deliverables: ['Digital invitation screens', 'Printed brochures', 'Roll-up banners', 'Stage backdrop designs'],
      turnaround: '7 - 10 Business Days',
    },
    {
      icon: <Contact2 size={24} />,
      title: 'Business Cards',
      description: 'Premium stationery cards using minimalist geometry, luxury typographic structures, and finishes.',
      deliverables: ['Custom front/back layout design', 'Print production specifications', 'Multiple format source files'],
      turnaround: '2 - 3 Business Days',
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Corporate Branding',
      description: 'Visual identity system for corporate entities: letterheads, brand assets, email footers, and official document assets.',
      deliverables: ['Letterhead & envelope templates', 'Invoice templates', 'PowerPoint / Keynote slides', 'Corporate email signature'],
      turnaround: '10 - 14 Business Days',
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Book Cover Design',
      description: 'Premium print and digital cover layouts that reflect the narrative tone, ensuring high visibility on books shelves.',
      deliverables: ['KDP paperback layout wrap', 'Hardcover wrap specifications', '3D digital mockup displays'],
      turnaround: '5 - 7 Business Days',
    },
    {
      icon: <Presentation size={24} />,
      title: 'Presentation Design',
      description: 'Clean slide decks built to pitch partners, communicate corporate strategies, or run religious/educational programs.',
      deliverables: ['Custom presentation slides', 'Master templates', 'Transition layouts', 'Icons package'],
      turnaround: '4 - 6 Business Days',
    },
    {
      icon: <Megaphone size={24} />,
      title: 'Marketing Graphics',
      description: 'High-converting graphics and campaign banners tailored for Google ads, newsletter templates, and product launches.',
      deliverables: ['Ad banners pack', 'Email marketing layouts', 'Product launch social media sets'],
      turnaround: '3 - 5 Business Days',
    },
    {
      icon: <Printer size={24} />,
      title: 'Print Design',
      description: 'Tangible layouts covering magazines, print manuals, clothing catalogs, brochures, and banner stands.',
      deliverables: ['Multi-page layout design', 'Print setup formatting', 'High-res print-ready source files'],
      turnaround: '7 - 12 Business Days',
    },
    {
      icon: <UsersRound size={24} />,
      title: 'Creative Consultation',
      description: '1-on-1 strategic visual session to align your brand goals, map visual guidelines, and establish aesthetics.',
      deliverables: ['Recorded strategy session', 'Visual moodboard document', 'Project scoping proposal'],
      turnaround: 'Scheduled 1-Hour Call',
    },
  ];

  const handleInquire = (serviceName: string) => {
    onSelectService(serviceName);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };


  return (
    <section
      id="services"
      className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-3xl text-left mb-16">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold mb-4 block">
            OUR SPECIALTIES
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4">
            Premium Creative Services
          </h2>
          <p className="font-body text-zinc-600 dark:text-zinc-400 font-light text-base leading-relaxed">
            We deliver top-tier design assets crafted with precision, strategy, and pure creativity. Each project is designed to elevate your brand presence and command immediate trust.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="p-8 rounded-2xl border border-zinc-100 bg-[#fbfbfb] dark:bg-[#111111] dark:border-zinc-900 hover:border-brand-gold/40 dark:hover:border-brand-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                {/* Service Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald flex items-center justify-center mb-6 group-hover:bg-brand-emerald group-hover:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-brand-gold dark:group-hover:bg-brand-gold dark:group-hover:text-brand-black transition-all duration-300">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mb-3 tracking-wide">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="border-t border-zinc-100 dark:border-zinc-850 pt-4 mb-6">
                  <h4 className="font-heading text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 mb-2.5">
                    KEY DELIVERABLES
                  </h4>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((deliv, idx) => (
                      <li key={idx} className="font-body text-[11px] text-zinc-600 dark:text-zinc-400 font-light flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-brand-gold" />
                        {deliv}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Turnaround & Inquire Action */}
              <div className="flex items-center justify-between mt-auto border-t border-zinc-150 dark:border-zinc-850 pt-4">
                <div className="flex flex-col text-left">
                  <span className="font-heading text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                    TURNAROUND
                  </span>
                  <span className="font-body text-xs text-zinc-900 dark:text-white font-semibold mt-0.5">
                    {service.turnaround}
                  </span>
                </div>
                
                <button
                  onClick={() => handleInquire(service.title)}
                  className="text-xs font-heading font-extrabold uppercase text-brand-emerald dark:text-brand-gold hover:text-brand-black dark:hover:text-white transition-colors duration-300 cursor-pointer interactive-hover"
                >
                  Inquire
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
