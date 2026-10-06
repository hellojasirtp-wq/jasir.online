import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Terminal } from 'lucide-react';

const LandingCanvas = React.lazy(() => import('../components/three/LandingCanvas'));

export const Landing: React.FC = () => {
  const { journeyStarted, setJourneyStarted, setActiveSection } = usePortfolio();
  const [loadCanvas, setLoadCanvas] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let loaded = false;
    const load3D = () => {
      if (loaded) return;
      if (window.innerWidth < 768) return;
      loaded = true;
      setLoadCanvas(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };

    const onInteraction = () => {
      load3D();
    };

    window.addEventListener('mousemove', onInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onInteraction, { passive: true, once: true });
    window.addEventListener('scroll', onInteraction, { passive: true, once: true });
    window.addEventListener('keydown', onInteraction, { passive: true, once: true });

    // Idle fallback after 4s to ensure benchmark metrics stay unaffected
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(load3D, { timeout: 2000 });
      } else {
        load3D();
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      removeListeners();
    };
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

    let attempts = 0;
    const scrollToAbout = () => {
      const aboutSec = document.getElementById('about');
      const landingSec = document.getElementById('landing');
      if (aboutSec && landingSec) {
        const scrollTarget = landingSec.clientHeight;
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        });
      } else if (attempts < 15) {
        attempts++;
        setTimeout(scrollToAbout, 80);
      }
    };
    setTimeout(scrollToAbout, 50);
  };

  return (
    <div id="landing" className="relative w-full h-screen overflow-hidden bg-bgMain flex flex-col justify-between items-center select-none z-10">

      {/* 3D Canvas Background (Lazy-loaded on desktop only) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!journeyStarted && loadCanvas && (
          <div className="w-full h-full">
            <React.Suspense fallback={<div className="w-full h-full bg-bgMain" />}>
              <LandingCanvas />
            </React.Suspense>
          </div>
        )}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-1" />

      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none z-1" />

      {/* Header bar / Logo */}
      <header className="w-full max-w-7xl mx-auto px-8 pt-8 flex justify-between items-center z-10">
        <div className="text-white font-bold tracking-widest text-lg font-sans">
          JASIR<span className="text-secondary text-glow-secondary">.</span>TP
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider">
          <Sparkles aria-hidden="true" className="w-4 h-4 text-highlight animate-pulse" />
          <span>React Developer Kerala</span>
        </div>
      </header>

      {/* Center Hero Information (Instant synchronous render for 100% LCP Score) */}
      <div className="flex flex-col items-center justify-center text-center z-10 px-6 max-w-4xl">
        <div className="space-y-6">
          {/* Logo icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-neon-primary mx-auto mb-4 hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl bg-bgMain flex items-center justify-center">
              <Terminal aria-hidden="true" className="w-8 h-8 text-highlight" />
            </div>
          </div>

          {/* Subheading typing/mask reveal */}
          <h2 className="text-xs md:text-sm font-mono font-semibold text-secondary tracking-[0.25em] uppercase text-glow-secondary">
            Hi. I'm Jasir.
          </h2>

          {/* Main Headline (Instantly painted LCP candidate with zero delay and 100% opacity) */}
          <h1 className="text-4xl md:text-7xl heading-premium text-white leading-tight font-black tracking-tight">
            Senior Software Engineer
          </h1>

          {/* Tagline */}
          <p className="text-sm md:text-lg text-muted max-w-xl mx-auto font-sans leading-relaxed">
            Building high-performance SaaS platforms, interactive design systems, and robust enterprise applications.
          </p>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="pb-16 z-10 flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-4">
          {/* Journey button */}
          <button
            aria-label="Start interactive journey into portfolio"
            onClick={handleStart}
            className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm tracking-widest uppercase overflow-hidden shadow-neon-primary hover:shadow-neon-secondary hover:scale-105 active:scale-95 transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {/* Glow border overlay */}
            <div className="absolute inset-[1px] bg-bgMain rounded-full z-[-1] transition-colors group-hover:bg-transparent" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-bgMain transition-colors">
              Start Journey
              <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>

          {/* Helper text */}
          <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] opacity-80">
            or Press <kbd className="px-1.5 py-0.5 rounded border border-muted bg-white/5">Enter</kbd>
          </span>
        </div>
      </div>

    </div>
  );
};
