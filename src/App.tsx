import { useState, useEffect } from 'react';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { DesignProcess } from './components/DesignProcess';
import { Testimonials } from './components/Testimonials';
import { WhyUs } from './components/WhyUs';
import { PinterestShowcase } from './components/PinterestShowcase';
import { Contact } from './components/Contact';
import { CareerProfile } from './components/CareerProfile';
import { Footer } from './components/Footer';
import { SchemaMarkup } from './components/SchemaMarkup';

import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import type { PortfolioItem } from './data/portfolio';
import { trackPageView, trackEvent } from './utils/analytics';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Handle dark mode class toggling on document element & update browser theme-color meta
  const [themeInit, setThemeInit] = useState(false);
  useEffect(() => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      metaThemeColor.setAttribute('content', '#0a0a0a');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      metaThemeColor.setAttribute('content', '#ffffff');
    }

    if (themeInit) {
      trackEvent('theme_switch', { theme: darkMode ? 'dark' : 'light' });
    } else {
      setThemeInit(true);
    }
  }, [darkMode]);


  // Track scrolling active sections for Navbar updates
  useEffect(() => {
    if (isLoading) return;
    
    const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'career', 'contact'];

    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  // Track page views when active section or hash changes
  useEffect(() => {
    if (!isLoading) {
      trackPageView(window.location.pathname + '#' + activeSection);
    }
  }, [activeSection, isLoading]);

  return (
    <>
      {/* Schema.org Structured JSON-LD Markup */}
      <SchemaMarkup />

      {/* Loading preloader splash screen */}
      <PageLoader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-450 selection:bg-brand-emerald selection:text-white dark:selection:bg-brand-gold dark:selection:text-brand-black">
          {/* Custom Cursor Trailing Effect */}
          <CustomCursor />

          {/* Header Navigation */}
          <Navbar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            activeSection={activeSection} 
          />

          {/* Main Layout Content */}
          <main>
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. About Section */}
            <About />

            {/* 3. Services Section */}
            <Services onSelectService={(serviceName) => setSelectedService(serviceName)} />

            {/* 4. Portfolio Section */}
            <Portfolio onSelectItem={(item) => setSelectedProject(item)} />



            {/* 5. Design Process Timeline */}
            <DesignProcess />

            {/* 6. Testimonials Section */}
            <Testimonials />

            {/* 7. Why Us Section */}
            <WhyUs />

            {/* 8. Pinterest Live Board Grid */}
            <PinterestShowcase />

            {/* 9. Career Profile Section */}
            <CareerProfile />

            {/* 10. Contact form & Details */}
            <Contact selectedService={selectedService} />

          </main>

          {/* Footer Branding */}
          <Footer />

          {/* Project Details slide modal */}
          <ProjectDetailsModal
            item={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNavigate={(newItem) => setSelectedProject(newItem)}
          />
        </div>
      )}
    </>
  );
}

export default App;
