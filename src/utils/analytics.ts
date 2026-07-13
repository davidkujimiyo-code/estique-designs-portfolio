declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: {
      (...args: any[]): void;
      q?: any[];
    };
  }
}

const GA_MEASUREMENT_ID = 'G-FCP6S28FYD';
const CLARITY_PROJECT_ID = 'xlkc4za75d';

export const isProduction = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  const isLocal = 
    hostname === 'localhost' || 
    hostname === '127.0.0.1' || 
    hostname.startsWith('192.168.') ||
    hostname.endsWith('.local');
    
  return import.meta.env.PROD && !isLocal;
};

// Check if browser has Do Not Track enabled
const isDoNotTrackEnabled = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as any;
  const win = window as any;
  return (
    nav.doNotTrack === '1' ||
    win.doNotTrack === '1' ||
    nav.msDoNotTrack === '1'
  );
};

let isInitialized = false;

export const initAnalytics = (): void => {
  if (typeof window === 'undefined' || isInitialized) return;
  
  // Respect Do Not Track settings and load only in production
  if (!isProduction() || isDoNotTrackEnabled()) {
    console.log('📊 Analytics skipped (dev environment, localhost, or Do Not Track enabled)');
    return;
  }

  try {
    // 1. Initialize Google Analytics 4 Script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Pageviews will be tracked manually for single-page routing
    });

    // 2. Initialize Microsoft Clarity Script
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    const clarityScript = document.createElement('script');
    clarityScript.async = true;
    clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(clarityScript, firstScript);
    } else {
      document.head.appendChild(clarityScript);
    }

    isInitialized = true;
    console.log('📊 Enterprise analytics initialized successfully (GA4 & Clarity)');
    
    // Track initial page load pageview
    trackPageView(window.location.pathname + window.location.hash);
  } catch (err) {
    console.warn('📊 Failed to load analytics services safely:', err);
  }
};

export const trackPageView = (path: string): void => {
  if (typeof window === 'undefined' || !isInitialized) return;
  try {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  } catch (err) {
    console.warn('📊 Failed to track page view:', err);
  }
};

export const trackEvent = (eventName: string, params?: object): void => {
  if (typeof window === 'undefined' || !isInitialized) return;
  try {
    // Track in Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, params || {});
    }
    // Track in Clarity
    if (window.clarity) {
      window.clarity('event', eventName);
    }
  } catch (err) {
    console.warn(`📊 Failed to track event "${eventName}":`, err);
  }
};
