import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/system/ErrorBoundary';
import AppLoader from './components/system/AppLoader';
import SplashScreen from './components/system/SplashScreen';
import Header from './components/Header';

// Lazy loading all routes for code splitting
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('@services/ServicesPage'));
const FaceAnalysisPage = lazy(() => import('./pages/FaceAnalysisPage'));
const HairstyleSimulatorPage = lazy(() => import('./pages/HairstyleSimulatorPage'));
const SkinAdvisorPage = lazy(() => import('./pages/SkinAdvisorPage'));
const BeautyConciergePage = lazy(() => import('./pages/BeautyConciergePage'));
const EventPlannerPage = lazy(() => import('./pages/EventPlannerPage'));
const SalonFinderPage = lazy(() => import('./pages/SalonFinderPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const MyAppointmentsPage = lazy(() => import('./pages/MyAppointmentsPage'));

export default function App() {
  const location = useLocation();
  const [splashFinished, setSplashFinished] = useState(() => sessionStorage.getItem('splash_shown') === 'true');
  const [videoReady, setVideoReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    // Defer non-critical initialization using requestIdleCallback
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    const initHandle = idleCallback(() => {
      // Pre-fetch logic or analytics could go here in the future
    });

    return () => {
      mediaQuery.removeEventListener('change', listener);
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(initHandle);
      } else {
        clearTimeout(initHandle);
      }
    };
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_shown', 'true');
    setSplashFinished(true);
  };

  return (
    <ErrorBoundary>
      {!splashFinished && <SplashScreen onComplete={handleSplashComplete} />}

      <Suspense fallback={<AppLoader />}>
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '16px',
            padding: '16px 20px',
          },
          className: 'glass-toast'
        }} />

        {/* Global Persistent Hero Video */}
        <div 
          className="absolute top-0 left-0 w-full h-[650px] lg:h-[700px] xl:h-[750px] overflow-hidden z-[-1] pointer-events-none transform-gpu"
          style={{ 
            opacity: isHome ? 1 : 0,
            transition: 'opacity 1s ease-out',
            willChange: 'opacity, transform',
            transform: 'translateZ(0)'
          }}
        >
          {/* Poster Image for Graceful Fallback */}
          <img
            src="/images/hero-model.jpg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
            style={{
              opacity: videoReady && !prefersReducedMotion ? 0 : 1,
              transition: 'opacity 1s ease-in-out',
              willChange: 'opacity'
            }}
          />

          {!prefersReducedMotion && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlayThrough={() => setVideoReady(true)}
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 z-[2]" style={{ background: "rgba(0, 0, 0, 0.35)" }} />
        </div>

        <Header />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
            <Route path="/face-analysis" element={<PageTransition><FaceAnalysisPage /></PageTransition>} />
            <Route path="/hairstyle-simulator" element={<PageTransition><HairstyleSimulatorPage /></PageTransition>} />
            <Route path="/skin-advisor" element={<PageTransition><SkinAdvisorPage /></PageTransition>} />
            <Route path="/beauty-concierge" element={<PageTransition><BeautyConciergePage /></PageTransition>} />
            <Route path="/event-planner" element={<PageTransition><EventPlannerPage /></PageTransition>} />
            <Route path="/salon-finder" element={<PageTransition><SalonFinderPage /></PageTransition>} />
            <Route path="/compare" element={<PageTransition><ComparePage /></PageTransition>} />
            <Route path="/my-appointments" element={<PageTransition><MyAppointmentsPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  )
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-full min-h-screen flex flex-col transform-gpu"
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}
