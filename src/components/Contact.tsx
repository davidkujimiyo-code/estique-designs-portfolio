import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '../utils/analytics';



declare global {
  interface Window {
    turnstile: any;
  }
}

interface ContactProps {
  selectedService: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Identity Design',
    budget: '$150 – $300',
    timeline: '1 - 2 Weeks',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Sync selectedService from props
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, projectType: selectedService }));
      // Ensure we scroll to the contact form when selection changes
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedService]);

  // Cloudflare Turnstile initialization logic
  useEffect(() => {
    const initTurnstile = () => {
      if (window.turnstile) {
        try {
          window.turnstile.render('#turnstile-container', {
            sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
            callback: (token: string) => {
              setTurnstileToken(token);
              setSubmitError(null);
            },
            'error-callback': () => {
              setSubmitError('Spam verification failed. Please try again.');
              setTurnstileToken('');
            },
            'expired-callback': () => {
              setTurnstileToken('');
              setSubmitError('Spam check expired. Please verify again.');
            }
          });
        } catch (e) {
          console.warn('Turnstile widget render error:', e);
        }
      } else {
        const timer = setTimeout(initTurnstile, 500);
        return () => clearTimeout(timer);
      }
    };

    if (!isSubmitted) {
      const cleanup = initTurnstile();
      return () => {
        if (typeof cleanup === 'function') cleanup();
      };
    }
  }, [isSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Track form opened when the contact component mounts
  useEffect(() => {
    trackEvent('booking_form_opened');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    if (!turnstileToken) {
      setSubmitError('Please complete the security check.');
      return;
    }

    setIsSubmitting(true);

    // Track submission attempt
    trackEvent('booking_form_submitted', { project_type: formData.projectType });

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Track successful request completion
      trackEvent('booking_request_success', { project_type: formData.projectType });

      setIsSubmitted(true);
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      setFormData({
        name: '',
        email: '',
        projectType: 'Brand Identity Design',
        budget: '$150 – $300',
        timeline: '1 - 2 Weeks',
        message: '',
      });
      setTurnstileToken('');
    } catch (err: any) {
      console.error('Booking submission failed:', err);
      
      const errorMsg = err.message || 'An unexpected error occurred during submission.';
      
      // Track submission failure
      trackEvent('booking_request_failed', { error: errorMsg });

      const isTechnical = 
        err instanceof SyntaxError || 
        err.message?.includes('JSON') || 
        err.message?.includes('fetch') ||
        err.message?.includes('Failed to execute');
        
      const friendlyError = isTechnical
        ? "We couldn't submit your booking right now. Please try again in a few moments."
        : errorMsg;
        
      setSubmitError(friendlyError);
      
      if (window.turnstile) {
        window.turnstile.reset();
      }
      setTurnstileToken('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = () => {
    trackEvent('whatsapp_click', { location: 'contact_section' });
    window.open('https://wa.me/2349027966779', '_blank');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', { location: 'contact_section' });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    trackEvent('booking_reset_clicked');
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Info, WhatsApp CTA & Map */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-emerald dark:text-brand-gold mb-4 block">
              GET IN TOUCH
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight mb-6">
              Let's Create <br />
              Something Amazing
            </h2>
            <p className="font-body text-zinc-650 dark:text-zinc-400 font-light text-sm md:text-base leading-relaxed mb-10">
              Ready to elevate your brand identity, book sermon slides, or build custom marketing campaigns? Fill out our inquiry form or chat with us instantly on WhatsApp.
            </p>

            {/* Direct Contacts */}
            <div className="space-y-6 mb-10">
              <a
                href="mailto:estherudoh27@gmail.com"
                onClick={handleEmailClick}
                className="flex items-center gap-4 group cursor-pointer interactive-hover"
              >
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-150 text-zinc-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 group-hover:text-brand-emerald dark:group-hover:text-brand-gold transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="font-heading text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    EMAIL INQUIRIES
                  </span>
                  <p className="font-body text-sm text-zinc-850 dark:text-zinc-200 font-semibold leading-none mt-1">
                    estherudoh27@gmail.com
                  </p>
                </div>
              </a>

              {/* Instant WhatsApp Button */}
              <button
                onClick={handleWhatsAppChat}
                className="flex items-center gap-4 group w-full text-left cursor-pointer interactive-hover"
              >
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 dark:bg-green-500/5 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="font-heading text-[10px] uppercase font-bold text-green-500 tracking-wider">
                    WHATSAPP DIRECT
                  </span>
                  <p className="font-body text-sm text-zinc-850 dark:text-zinc-200 font-semibold leading-none mt-1">
                    Chat on WhatsApp
                  </p>
                </div>
              </button>
            </div>

            {/* Styled Google Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-850 h-52 relative flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/10 to-brand-gold/10 opacity-60 z-0" />
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-heading text-[10px] uppercase font-bold text-brand-emerald dark:text-brand-gold tracking-widest">
                  ESTIQUE CREATIVE STUDIO
                </span>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 font-light mt-1.5">
                  Lagos, Nigeria &bull; Serving Globally
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 w-full">
            <div className="p-8 md:p-12 rounded-3xl border border-zinc-150 bg-[#fbfbfb] dark:bg-[#111111] dark:border-zinc-900 shadow-xl relative overflow-hidden">
              {/* Successful Wipe */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="py-16 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                  >
                    <CheckCircle2 size={56} className="text-brand-emerald dark:text-brand-gold mb-6 filter drop-shadow-[0_0_8px_rgba(201,162,39,0.25)]" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white mb-4"
                  >
                    Thank You for Your Enquiry!
                  </motion.h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                    className="font-body text-xs text-zinc-600 dark:text-zinc-400 font-light max-w-md leading-relaxed mb-8 space-y-3"
                  >
                    <p className="font-semibold text-zinc-850 dark:text-zinc-200">
                      We've successfully received your project request.
                    </p>
                    <p>
                      Esther will personally review your submission and contact you within 24–48 hours to discuss your project in more detail.
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-500 text-[11px] italic">
                      Please keep an eye on your email for your confirmation message and next steps.
                    </p>
                  </motion.div>
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 font-heading text-[10px] uppercase tracking-wider font-extrabold text-zinc-700 dark:text-zinc-300 hover:border-brand-emerald dark:hover:border-brand-gold hover:text-brand-emerald dark:hover:text-brand-gold transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Reset Form
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="name" className="font-heading text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-5 py-3.5 rounded-xl border ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-zinc-200 dark:border-zinc-800 focus:border-brand-emerald dark:focus:border-brand-gold'
                        } bg-white dark:bg-[#181818] focus:outline-none text-zinc-900 dark:text-white placeholder-zinc-450 text-xs transition-colors duration-300`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 mt-1 font-body">{errors.name}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="email" className="font-heading text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-5 py-3.5 rounded-xl border ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-zinc-200 dark:border-zinc-800 focus:border-brand-emerald dark:focus:border-brand-gold'
                        } bg-white dark:bg-[#181818] focus:outline-none text-zinc-900 dark:text-white placeholder-zinc-450 text-xs transition-colors duration-300`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 mt-1 font-body">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Project Type */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="project-type" className="font-heading text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        id="project-type"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181818] focus:outline-none focus:border-brand-emerald dark:focus:border-brand-gold text-zinc-900 dark:text-white text-xs transition-colors duration-300 cursor-pointer"
                      >
                        <option value="Logo Design">Logo Design</option>
                        <option value="Brand Identity Design">Brand Identity Design</option>
                        <option value="Social Media Design">Social Media Design</option>
                        <option value="Flyers & Posters">Flyers & Posters</option>
                        <option value="Event Branding">Event Branding</option>
                        <option value="Business Cards">Business Cards</option>
                        <option value="Corporate Branding">Corporate Branding</option>
                        <option value="Book Cover Design">Book Cover Design</option>
                        <option value="Presentation Design">Presentation Design</option>
                        <option value="Marketing Campaign Graphics">Marketing Campaign Graphics</option>
                        <option value="Print Design">Print Design</option>
                        <option value="Creative Consultation">Creative Consultation</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="budget" className="font-heading text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        name="budget"
                        id="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181818] focus:outline-none focus:border-brand-emerald dark:focus:border-brand-gold text-zinc-900 dark:text-white text-xs transition-colors duration-300 cursor-pointer"
                      >
                        <option value="$15 – $75">$15 – $75</option>
                        <option value="$75 – $150">$75 – $150</option>
                        <option value="$150 – $300">$150 – $300</option>
                        <option value="$300 – $500">$300 – $500</option>
                        <option value="$500 – $800">$500 – $800</option>
                        <option value="$800+">$800+</option>
                      </select>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="timeline" className="font-heading text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        id="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181818] focus:outline-none focus:border-brand-emerald dark:focus:border-brand-gold text-zinc-900 dark:text-white text-xs transition-colors duration-300 cursor-pointer"
                      >
                        <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
                        <option value="1 - 2 Weeks">1 - 2 Weeks</option>
                        <option value="2 - 4 Weeks">2 - 4 Weeks</option>
                        <option value="4+ Weeks">4+ Weeks</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="message" className="font-heading text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      Brief Description of Project
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-brand-emerald dark:focus:border-brand-gold bg-white dark:bg-[#181818] text-zinc-900 dark:text-white placeholder-zinc-450 text-xs transition-colors duration-300"
                      placeholder="Share some details about your target objectives, styling preferences, or design details..."
                    />
                  </div>

                  {/* Turnstile Antispam Security Check */}
                  <div className="flex justify-center items-center py-1">
                    <div id="turnstile-container" className="cf-turnstile"></div>
                  </div>

                  {/* Submit Error alert */}
                  {submitError && (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-body text-left flex items-start gap-2 animate-shake">
                      <span className="mt-0.5">⚠️</span>
                      <div>
                        <p className="font-semibold">Booking Request Failed</p>
                        <p className="mt-0.5">{submitError}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 rounded-xl font-heading text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-brand-black/15 interactive-hover ${
                      isSubmitting
                        ? 'bg-zinc-300 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed'
                        : 'bg-brand-black text-white hover:bg-brand-emerald dark:bg-white dark:text-brand-black dark:hover:bg-brand-gold hover:scale-[1.01] active:scale-99'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></span>
                        Processing Booking Request...
                      </>
                    ) : (
                      <>
                        Submit Booking Request <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
