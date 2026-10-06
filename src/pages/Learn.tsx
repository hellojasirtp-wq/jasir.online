import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Boxes, RefreshCw, Zap, FileText, ArrowLeft, 
  Sparkles, Download
} from 'lucide-react';
import { FolderStructureExplainer } from '../components/learn/FolderStructureExplainer';
import { EventLoopSimulator } from '../components/learn/EventLoopSimulator';
import { React19Explainer } from '../components/learn/React19Explainer';
import { ResumeViewer } from '../components/learn/ResumeViewer';
import { downloadResumePdf } from '../utils/pdfGenerator';

export type LearnTab = 'folder' | 'event-loop' | 'react-19' | 'cv';

interface LearnProps {
  onBackToHome?: () => void;
}

export const Learn: React.FC<LearnProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<LearnTab>('folder');

  // Listen to URL hash for deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('event-loop') || hash.includes('eventloop')) {
        setActiveTab('event-loop');
      } else if (hash.includes('react-19') || hash.includes('react19')) {
        setActiveTab('react-19');
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

  const handleTabSelect = (tab: LearnTab) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
  };

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const tabs: { id: LearnTab; label: string; icon: React.ComponentType<{ className?: string }>; badge: string }[] = [
    { id: 'folder', label: 'Folder Architecture', icon: Boxes, badge: 'Interactive Map' },
    { id: 'event-loop', label: 'Event Loop Engine', icon: RefreshCw, badge: 'Visual Runtime' },
    { id: 'react-19', label: 'React 19 Deep Dive', icon: Zap, badge: 'v19 Innovations' },
    { id: 'cv', label: 'CV & Resume Download', icon: FileText, badge: 'PDF Ready' },
  ];

  return (
    <div className="relative w-full min-h-screen bg-bgMain text-white pb-32 pt-8 px-4 md:px-12 selection:bg-primary/40 selection:text-highlight">
      
      {/* Aurora light spheres */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-secondary/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-primary/40 text-xs md:text-sm font-medium text-white transition-all cursor-pointer group shadow-glass"
          >
            <ArrowLeft className="w-4 h-4 text-secondary group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted hidden sm:inline">
              Senior Frontend Engineering Knowledge Hub
            </span>
            <button
              onClick={downloadResumePdf}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs flex items-center gap-2 shadow-neon-primary hover:scale-105 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-secondary text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-highlight animate-pulse" />
            <span>Visual Engineering & Learning Lab</span>
          </div>

          <h1 className="text-3xl md:text-6xl heading-premium text-white leading-tight font-black">
            Interactive Frontend Architecture & Runtime Lab
          </h1>

          <p className="text-sm md:text-lg text-muted max-w-3xl font-sans leading-relaxed">
            Deep-dive visual explainers into modern enterprise frontend architecture, JavaScript event loop mechanics, React 19 paradigms, and full CV experience portfolio.
          </p>
        </div>

        {/* Main Tab Navigation Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 rounded-2xl glass-panel border border-white/10 shadow-glass">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={`relative px-4 py-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2 text-left transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/30 to-secondary/20 border border-secondary/50 text-white shadow-neon-secondary'
                    : 'hover:bg-white/5 text-muted hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-highlight' : 'text-muted'}`} />
                  <span className="text-xs md:text-sm font-semibold">{tab.label}</span>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  isActive ? 'bg-secondary/30 text-secondary font-bold' : 'bg-white/5 text-muted/80'
                }`}>
                  {tab.badge}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-secondary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {activeTab === 'folder' && <FolderStructureExplainer />}
              {activeTab === 'event-loop' && <EventLoopSimulator />}
              {activeTab === 'react-19' && <React19Explainer />}
              {activeTab === 'cv' && <ResumeViewer />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
