import React, { useEffect, Suspense, lazy } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import type { SectionType } from './context/PortfolioContext';
import { FloatingNavbar } from './components/common/FloatingNavbar';
import { MatrixRain } from './components/common/MatrixRain';

// Lazy loading all pages for optimized client chunking (splitting initial critical bundles)
const Landing = lazy(() => import('./pages/Landing').then(m => ({ default: m.Landing })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Experience = lazy(() => import('./pages/Experience').then(m => ({ default: m.Experience })));
const SearchVisibility = lazy(() => import('./pages/SearchVisibility').then(m => ({ default: m.SearchVisibility })));
const FrontendSkills = lazy(() => import('./pages/FrontendSkills').then(m => ({ default: m.FrontendSkills })));
const BackendSkills = lazy(() => import('./pages/BackendSkills').then(m => ({ default: m.BackendSkills })));
const PackagesSkills = lazy(() => import('./pages/PackagesSkills').then(m => ({ default: m.PackagesSkills })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const Playground = lazy(() => import('./pages/Playground').then(m => ({ default: m.Playground })));
const DesignSystem = lazy(() => import('./pages/DesignSystem').then(m => ({ default: m.DesignSystem })));
const Curriculum = lazy(() => import('./pages/Curriculum').then(m => ({ default: m.Curriculum })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Learn = lazy(() => import('./pages/Learn').then(m => ({ default: m.Learn })));
const Footer = lazy(() => import('./components/common/Footer').then(m => ({ default: m.Footer })));
const HelpOverlay = lazy(() => import('./components/common/HelpOverlay').then(m => ({ default: m.HelpOverlay })));

// Loading spinner fallback fitting the dark futuristic theme
const LoaderFallback: React.FC = () => (
  <div className="w-full min-h-[300px] flex flex-col items-center justify-center space-y-4 py-20 select-none">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 rounded-full border-t-2 border-secondary animate-spin shadow-neon-secondary" />
    </div>
    <span className="text-[10px] font-mono text-muted uppercase tracking-[0.25em] animate-pulse">
      Compiling System Chunks...
    </span>
  </div>
);

// Ordered list of sections for keyboard navigation mapping
const SECTIONS: SectionType[] = [
  'about',
  'experience',
  'visibility',
  'frontend',
  'backend',
  'packages',
  'projects',
  'playground',
  'curriculum',
  'design-system'
];

const PortfolioJourney: React.FC = () => {
  const { journeyStarted, activeSection, setActiveSection, currentRoute, navigateToRoute } = usePortfolio();

  // Initialize Lenis Smooth Scroll dynamically to avoid blocking critical bundle load
  useEffect(() => {
    if (!journeyStarted || currentRoute === 'learn') return;

    let lenisInstance: any;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        if (lenisInstance) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
      };

      requestAnimationFrame(raf);
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, [journeyStarted, currentRoute]);

  // Scroll Spy Observer to dynamically highlight navbar links
  useEffect(() => {
    if (!journeyStarted || currentRoute === 'learn') return;

    const observerOptions = {
      root: null, // viewport
      rootMargin: '-20% 0px -60% 0px', // trigger when section occupies center third
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id') as SectionType;
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    let observer: IntersectionObserver | null = null;
    let timeoutId: any;

    const setupObserver = () => {
      observer = new IntersectionObserver(observerCallback, observerOptions);
      let allFound = true;
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          observer?.observe(el);
        } else {
          allFound = false;
        }
      });

      // If some sections are not loaded yet, retry setup in 100ms
      if (!allFound) {
        observer.disconnect();
        timeoutId = setTimeout(setupObserver, 100);
      }
    };

    // Delay setup slightly to let React mount elements
    timeoutId = setTimeout(setupObserver, 200);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [journeyStarted, setActiveSection, currentRoute]);

  // Keyboard Navigation: Listen for arrows and section jumps
  useEffect(() => {
    if (!journeyStarted || currentRoute === 'learn') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key hits if user is typing inside code inputs or shell console text areas
      const activeEl = document.activeElement?.tagName;
      if (activeEl === 'INPUT' || activeEl === 'TEXTAREA') return;

      const currentIndex = SECTIONS.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = Math.min(SECTIONS.length - 1, currentIndex + 1);
        scrollToSection(SECTIONS[nextIndex]);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(0, currentIndex - 1);
        scrollToSection(SECTIONS[prevIndex]);
      } else if (e.key >= '1' && e.key <= '8') {
        const index = parseInt(e.key) - 1;
        if (index >= 0 && index < SECTIONS.length) {
          scrollToSection(SECTIONS[index]);
        }
      }
    };

    const scrollToSection = (id: SectionType) => {
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [journeyStarted, activeSection, setActiveSection, currentRoute]);

  // If on /learn route, render the dedicated Learn Knowledge Hub
  if (currentRoute === 'learn') {
    return (
      <div className="relative w-full bg-bgMain text-white min-h-screen">
        <MatrixRain />
        <Suspense fallback={<LoaderFallback />}>
          <Learn onBackToHome={() => navigateToRoute('portfolio')} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className={`relative w-full bg-bgMain text-white ${!journeyStarted ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* Background Matrix digital rain overlay */}
      <MatrixRain />

      {/* Floating navigation bar */}
      <FloatingNavbar />

      <Suspense fallback={<LoaderFallback />}>
        {/* Interactive help guide overlay & floating button */}
        {journeyStarted && <HelpOverlay />}

        {/* Landing page is always at the top of the DOM flow */}
        <Landing />

        {/* Render the rest of the journey only after starting */}
        {journeyStarted && (
          <div className="w-full flex flex-col">
            {/* Main Story & Stats */}
            <About />

            {/* Interactive IDE mock workspace */}
            <Experience />

            {/* Google Search and AI Overview rankings */}
            <SearchVisibility />

            {/* 3D client galaxy frontend skills */}
            <FrontendSkills />

            {/* Server APIs & Backend infrastructure */}
            <BackendSkills />

            {/* Package comparisons & UI showcase grid */}
            <PackagesSkills />

            {/* Cinematic project details */}
            <Projects />

            {/* Interactive Terminal Sandbox */}
            <Playground />

            {/* Curriculum visualizer */}
            <Curriculum />

            {/* UI Components lab */}
            <DesignSystem />

            {/* Terminal CLI mailer */}
            <Contact />

            {/* Launch pad rocket footer */}
            <Footer />
          </div>
        )}
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <PortfolioProvider>
      <PortfolioJourney />
    </PortfolioProvider>
  );
}

export default App;
