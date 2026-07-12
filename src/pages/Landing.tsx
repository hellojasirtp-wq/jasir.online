import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

const LandingCanvas = React.lazy(() => import('../components/three/LandingCanvas'));

export const Landing: React.FC = () => {
  const { journeyStarted, setJourneyStarted, setActiveSection } = usePortfolio();
  const [step] = useState(3); // Render all elements immediately on mount to optimize LCP and Speed Index
  const [loadCanvas, setLoadCanvas] = useState(false);

  useEffect(() => {
    // Delay loading the 3D WebGL canvas slightly to let the critical render path
    // of HTML/CSS/text complete first, drastically improving FCP and LCP scores.
    const timer = setTimeout(() => {
      setLoadCanvas(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Enter key trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (journeyStarted) return;
      if (e.key === 'Enter') {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [journeyStarted]);

  const handleStart = () => {
    setJourneyStarted(true);
    setActiveSection('about');

    // Poll for #about and #landing to appear in DOM, then scroll.
    // Since #landing has a height of 100vh, we scroll exactly to its height.
    // This coordinate is fixed, preventing scroll overshooting while downstream components load/resize.
    let attempts = 0;
    const scrollToAbout = () => {
      const aboutSec = document.getElementById('about');
      const landingSec = document.getElementById('landing');
      if (aboutSec && landingSec) {
        const scrollTarget = landingSec.clientHeight;
        // Snap to top first to cancel any browser scroll-restoration quirks
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        // Scroll to the exact position smoothly
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        });
      } else if (attempts < 15) {
        attempts++;
        setTimeout(scrollToAbout, 80);
      }
    };
    // First attempt after a brief delay for React to start rendering sections
    setTimeout(scrollToAbout, 50);
  };

  return (
    <div id="landing" className="relative w-full h-screen overflow-hidden bg-bgMain flex flex-col justify-between items-center select-none z-10">

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          {step >= 1 && !journeyStarted && loadCanvas && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5 }}
              className="w-full h-full"
            >
              <React.Suspense fallback={<div className="w-full h-full bg-bgMain" />}>
                <LandingCanvas />
              </React.Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-1" />

      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none z-1" />

      {/* Header bar / Logo */}
      <div className="w-full max-w-7xl mx-auto px-8 pt-8 flex justify-between items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="text-white font-bold tracking-widest text-lg font-sans"
        >
          JASIR<span className="text-secondary text-glow-secondary">.</span>TP
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-highlight animate-pulse" />
          {/* <span>v2.0.26 Production Ready</span> */}
        </motion.div>
      </div>

      {/* Center Hero Information */}
      <div className="flex flex-col items-center justify-center text-center z-10 px-6 max-w-4xl">
        <AnimatePresence>
          {step >= 2 && (
            <div className="space-y-6">
              {/* Logo icon animation */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-neon-primary mx-auto mb-4"
              >
                <div className="w-full h-full rounded-2xl bg-bgMain flex items-center justify-center">
                  <Terminal className="w-8 h-8 text-highlight" />
                </div>
              </motion.div>

              {/* Subheading typing/mask reveal */}
              <motion.h4
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs md:text-sm font-mono font-semibold text-secondary tracking-[0.25em] uppercase text-glow-secondary"
              >
                Hi. I'm Jasir.
              </motion.h4>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-7xl heading-premium text-white leading-tight font-black"
              >
                Senior Software Engineer
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm md:text-lg text-muted max-w-xl mx-auto font-sans leading-relaxed"
              >
                Building high-performance SaaS platforms, interactive design systems, and robust enterprise applications.
              </motion.p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Call to Action Button */}
      <div className="pb-16 z-10 flex flex-col items-center gap-3">
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Journey button */}
              <motion.button
                onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm tracking-widest uppercase overflow-hidden shadow-neon-primary hover:shadow-neon-secondary transition-shadow group cursor-pointer"
              >
                {/* Glow border overlay */}
                <div className="absolute inset-[1px] bg-bgMain rounded-full z-[-1] transition-colors group-hover:bg-transparent" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-bgMain transition-colors">
                  Start Journey
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              {/* Helper text */}
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]"
              >
                or Press <kbd className="px-1.5 py-0.5 rounded border border-muted bg-white/5">Enter</kbd>
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
