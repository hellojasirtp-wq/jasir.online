import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Keyboard, Layers, Cpu, Award } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const HelpOverlay: React.FC = () => {
  const { journeyStarted, showHelp, setShowHelp, achievements } = usePortfolio();

  // Listen for the 'h' key to toggle help
  useEffect(() => {
    if (!journeyStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement?.tagName;
      if (activeEl === 'INPUT' || activeEl === 'TEXTAREA') return;

      if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setShowHelp(!showHelp);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [journeyStarted, showHelp, setShowHelp]);

  if (!journeyStarted) return null;

  const shortcuts = [
    { key: 'Enter', desc: 'Starts the cinematic journey on landing.' },
    { key: '1 - 8', desc: 'Jump to specific sections directly (Story, Journey, Frontend, Backend, etc.).' },
    { key: '↑ / →', desc: 'Scroll up / next section.' },
    { key: '↓ / ←', desc: 'Scroll down / previous section.' },
    { key: 'h', desc: 'Toggle this interactive Help HUD Guide.' },
    { key: 'Konami', desc: '↑ ↑ ↓ ↓ ← → ← → B A unlocks Developer matrix theme!' }
  ];

  const sections = [
    { name: '1. Story', desc: 'Core career timeline, timeline milestones & statistics dashboard.' },
    { name: '2. Journey', desc: 'Interactive VS Code code explorer listing project typescript configurations.' },
    { name: '3. AI Search', desc: 'Live Google & AI Search ranking visibility metrics & SEO index.' },
    { name: '4. Frontend', desc: 'Dynamic client-side galaxy orbits (React 19, Next.js, TS).' },
    { name: '5. Backend', desc: 'APIs control boards and security routing parameters (REST, Auth, Cognito).' },
    { name: '6. Packages', desc: 'An Ag-Grid styled comparative table detailing UI libraries optimization tips.' },
    { name: '7. Works', desc: 'A cinematic slides deck mapping case studies, results, and challenges.' },
    { name: '8. Contact', desc: 'Interactive terminal CLI mailer to send messages and connect directly.' }
  ];

  return (
    <>
      {/* Floating help trigger button in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          onClick={() => setShowHelp(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center cursor-pointer shadow-neon-primary hover:shadow-neon-secondary hover:scale-105 active:scale-95 transition-all group"
          title="Keyboard Guide & Tech Stack Info"
        >
          <HelpCircle className="w-6 h-6 text-glow-primary group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Guide HUD Modal overlay */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Background cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="absolute inset-0 bg-bgMain/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl glass-panel p-6 md:p-8 rounded-2xl border border-white/15 shadow-2xl z-10 max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col gap-6"
            >
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-6 h-6 text-highlight" />
                  <div>
                    <h3 className="text-xl heading-premium text-white font-extrabold">System Guide HUD</h3>
                    <p className="text-[10px] font-mono text-muted uppercase mt-0.5">Jasir Portfolio Controls</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="p-1 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Grid content columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed select-none">
                
                {/* Shortcuts & Tech stack */}
                <div className="space-y-4">
                  
                  {/* Shortcuts list */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block font-bold">Keyboard Controls</span>
                    <div className="space-y-1.5 font-mono">
                      {shortcuts.map((s) => (
                        <div key={s.key} className="flex gap-2 items-start">
                          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-highlight font-bold flex-shrink-0 min-w-[50px] text-center">
                            {s.key}
                          </kbd>
                          <span className="text-muted text-[11px]">{s.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core tech stack card */}
                  <div className="bg-white/3 border border-white/5 p-4 rounded-xl space-y-2">
                    <span className="font-mono text-[10px] text-highlight uppercase tracking-widest block font-bold flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" /> Engine Tech Stack
                    </span>
                    <p className="text-muted font-sans leading-normal">
                      React 19, TypeScript, Vite, TailwindCSS, Framer Motion, GSAP, Lenis Scroll, Three.js, React Three Fiber, Drei, Lucide Icons, Canvas Confetti.
                    </p>
                  </div>

                </div>

                {/* Section Guide map */}
                <div className="space-y-3 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  <span className="font-mono text-[10px] text-primary-300 uppercase tracking-widest block font-bold flex items-center gap-1" style={{ color: '#6C63FF' }}>
                    <Layers className="w-3.5 h-3.5" /> Section Explorer Map
                  </span>
                  
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 no-scrollbar">
                    {sections.map((sec) => (
                      <div key={sec.name} className="space-y-0.5">
                        <div className="font-bold text-white tracking-wide">{sec.name}</div>
                        <p className="text-muted text-[11px] font-light leading-normal">{sec.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Achievements summary */}
              {achievements.length > 0 && (
                <div className="flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-xl p-3 text-[10px] text-accent font-semibold justify-center font-mono">
                  <Award className="w-4 h-4 animate-bounce" />
                  <span>Uncovered Easter Egg Achievements: {achievements.join(', ')}!</span>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
