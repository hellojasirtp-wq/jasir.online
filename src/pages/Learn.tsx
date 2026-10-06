import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Boxes, RefreshCw, Zap, FileText, ArrowLeft, 
  Sparkles, Download, ShieldCheck, Cpu
} from 'lucide-react';
import { FolderStructureExplainer } from '../components/learn/FolderStructureExplainer';
import { EventLoopSimulator } from '../components/learn/EventLoopSimulator';
import { React19Explainer } from '../components/learn/React19Explainer';
import { FiberConcurrencyExplainer } from '../components/learn/FiberConcurrencyExplainer';
import { AccessibilityLab } from '../components/learn/AccessibilityLab';
import { ResumeViewer } from '../components/learn/ResumeViewer';
import { downloadResumePdf } from '../utils/pdfGenerator';

export type LearnTab = 'folder' | 'event-loop' | 'react-19' | 'fiber' | 'a11y' | 'cv';

interface LearnProps {
  onBackToHome?: () => void;
}

export const Learn: React.FC<LearnProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<LearnTab>('folder');
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs: { id: LearnTab; label: string; icon: React.ComponentType<{ className?: string }>; badge: string; keyHint: string }[] = [
    { id: 'folder', label: 'Folder Architecture', icon: Boxes, badge: 'Interactive Tree', keyHint: '1' },
    { id: 'event-loop', label: 'Event Loop Engine', icon: RefreshCw, badge: 'Visual Runtime', keyHint: '2' },
    { id: 'react-19', label: 'React 19 Deep Dive', icon: Zap, badge: 'v19 Innovations', keyHint: '3' },
    { id: 'fiber', label: 'Fiber & Concurrency', icon: Cpu, badge: 'Time-Slicing Lab', keyHint: '4' },
    { id: 'a11y', label: 'Accessibility (a11y) Lab', icon: ShieldCheck, badge: 'WCAG 2.2', keyHint: '5' },
    { id: 'cv', label: 'CV & Resume Download', icon: FileText, badge: 'PDF Ready', keyHint: '6' },
  ];

  // Listen to URL hash for deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('event-loop') || hash.includes('eventloop')) {
        setActiveTab('event-loop');
      } else if (hash.includes('react-19') || hash.includes('react19')) {
        setActiveTab('react-19');
      } else if (hash.includes('fiber') || hash.includes('concurrency')) {
        setActiveTab('fiber');
      } else if (hash.includes('a11y') || hash.includes('accessibility')) {
        setActiveTab('a11y');
      } else if (hash.includes('cv') || hash.includes('resume')) {
        setActiveTab('cv');
      } else if (hash.includes('folder') || hash.includes('structure')) {
        setActiveTab('folder');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard navigation across tabs: 1-6 number shortcuts & Alt+C for CV download
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key >= '1' && e.key <= '6') {
        const idx = parseInt(e.key) - 1;
        if (idx >= 0 && idx < tabs.length) {
          handleTabSelect(tabs[idx].id);
        }
      } else if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        downloadResumePdf();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tabs]);

  const handleTabSelect = (tab: LearnTab) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (idx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (idx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = tabs.length - 1;
    }

    if (nextIdx !== idx) {
      handleTabSelect(tabs[nextIdx].id);
      tabButtonRefs.current[nextIdx]?.focus();
    }
  };

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <main id="learn-main-content" className="relative w-full min-h-screen bg-bgMain text-white pb-32 pt-8 px-4 md:px-12 selection:bg-primary/40 selection:text-highlight">
      
      {/* Skip to Content accessible link for keyboard screen reader users */}
      <a 
        href="#learn-tab-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-xl"
      >
        Skip to main learning content
      </a>

      {/* Aurora light spheres */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-secondary/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <button
            onClick={handleBack}
            aria-label="Return to portfolio home page"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-primary/40 text-xs md:text-sm font-medium text-white transition-all cursor-pointer group shadow-glass focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4 text-secondary group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted hidden sm:inline">
              Senior Engineering & a11y Knowledge Lab
            </span>
            <button
              onClick={() => downloadResumePdf()}
              aria-label="Download Jasir's official CV as PDF"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs flex items-center gap-2 shadow-neon-primary hover:scale-105 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-highlight focus-visible:outline-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV (Alt+C)</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-secondary text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-highlight animate-pulse" />
            <span>Interactive Engineering & Accessibility Lab</span>
          </div>

          <h1 className="text-3xl md:text-6xl heading-premium text-white leading-tight font-black">
            Frontend Architecture, Runtimes & a11y Lab
          </h1>

          <p className="text-sm md:text-lg text-muted max-w-3xl font-sans leading-relaxed">
            Deep-dive visual explainers into modern enterprise frontend architecture, JavaScript event loop mechanics, React 19 paradigms, React Fiber concurrency, WCAG accessibility, and verified CV portfolio.
          </p>

          {/* Keyboard Helper Badge */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-muted">
            <span>Keyboard Shortcuts:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-secondary">Keys [1 - 6]</span>
            <span>Switch Tabs |</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-highlight">Alt + C</span>
            <span>Instant Download CV</span>
          </div>
        </div>

        {/* Main Tab Navigation Buttons with ARIA TabList */}
        <div 
          role="tablist" 
          aria-label="Learning Modules"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 p-2 rounded-2xl glass-panel border border-white/10 shadow-glass"
        >
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                ref={(el) => { tabButtonRefs.current[idx] = el; }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabSelect(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`relative px-3.5 py-3 rounded-xl flex flex-col items-start justify-between gap-1 text-left transition-all cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/30 to-secondary/20 border border-secondary/50 text-white shadow-neon-secondary'
                    : 'hover:bg-white/5 text-muted hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-highlight' : 'text-muted'}`} />
                  <span className="text-[10px] font-mono opacity-50 font-bold">[{tab.keyHint}]</span>
                </div>

                <span className="text-xs font-semibold leading-tight mt-1">{tab.label}</span>

                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded mt-1 ${
                  isActive ? 'bg-secondary/30 text-secondary font-bold' : 'bg-white/5 text-muted/80'
                }`}>
                  {tab.badge}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderlineLearn"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-secondary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display with TabPanel */}
        <div 
          id="learn-tab-content" 
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${activeTab}`}
          className="w-full focus-visible:outline-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeTab === 'folder' && <FolderStructureExplainer />}
              {activeTab === 'event-loop' && <EventLoopSimulator />}
              {activeTab === 'react-19' && <React19Explainer />}
              {activeTab === 'fiber' && <FiberConcurrencyExplainer />}
              {activeTab === 'a11y' && <AccessibilityLab />}
              {activeTab === 'cv' && <ResumeViewer />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
};
