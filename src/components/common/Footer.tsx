import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Heart, ArrowUp, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { journeyStarted, achievements, addAchievement } = usePortfolio();
  const [rocketLaunched, setRocketLaunched] = useState(false);

  const handleRocketLaunch = () => {
    if (rocketLaunched) return;
    
    setRocketLaunched(true);
    addAchievement('Space Commander');

    // Confetti showers as rocket reaches outer space
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 600);

    // Reset rocket position back to launcher pad after 4 seconds
    setTimeout(() => {
      setRocketLaunched(false);
    }, 4500);
  };

  const handleScrollTop = () => {
    const rootEl = document.getElementById('about');
    if (rootEl) {
      rootEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!journeyStarted) return null;

  return (
    <footer className="relative w-full border-t border-white/5 bg-[#03050f]/80 backdrop-blur-md py-16 px-6 md:px-12 select-none overflow-hidden">
      
      {/* Background stars */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 font-mono text-xs text-muted">
        
        {/* Logo and signature */}
        <div className="space-y-2 text-center md:text-left">
          <div className="text-white font-bold tracking-widest text-sm font-sans">
            JASIR<span className="text-secondary">.</span>TP
          </div>
          <p className="flex items-center justify-center md:justify-start gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-accent animate-pulse" /> in Kerala, India
          </p>
          <p className="text-[10px] text-white/20">© 2026 Jasir T P. All rights reserved.</p>
        </div>

        {/* Launcher Launch pad rocket button */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-20 h-28 flex items-center justify-center">
            
            {/* Launch pad tower base */}
            <div className="absolute bottom-2 w-8 h-2 bg-white/20 rounded-full" />
            <div className="absolute bottom-4 w-5 h-0.5 bg-white/10" />

            {/* Glowing flame exhaust */}
            <AnimatePresence>
              {rocketLaunched && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.3, 0.9] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 0.15 }}
                  className="absolute bottom-1 w-4 h-12 bg-gradient-to-t from-accent via-primary to-transparent rounded-full filter blur-[2px]"
                />
              )}
            </AnimatePresence>

            {/* Floating vibrating rocket */}
            <motion.div
              onClick={handleRocketLaunch}
              animate={
                rocketLaunched 
                  ? { 
                      y: -400, 
                      scale: 0.6,
                      rotate: [0, -2, 2, -1, 1, 0]
                    } 
                  : { 
                      y: [0, -4, 0],
                      transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
                    }
              }
              transition={
                rocketLaunched 
                  ? { duration: 1.5, ease: 'easeIn' }
                  : undefined
              }
              className={`cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors border border-transparent ${
                rocketLaunched ? 'pointer-events-none' : 'hover:border-white/5'
              }`}
            >
              <Rocket className="w-8 h-8 text-highlight text-glow-highlight" />
            </motion.div>
          </div>

          <span className="text-[10px] uppercase text-white/30 tracking-[0.2em] font-semibold">
            {rocketLaunched ? 'Heading to Production!' : 'Click Rocket to Launch'}
          </span>
        </div>

        {/* Actions panel */}
        <div className="flex flex-col items-center md:items-end gap-3">
          
          <div className="flex items-center gap-2">
            <a
              href="/learn"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/learn');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-secondary font-medium text-xs cursor-pointer transition-all"
            >
              Visual Learn Hub (/learn)
            </a>

            {/* Scroll back to top */}
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTop();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-white font-medium text-xs cursor-pointer active:scale-95 transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5 text-secondary" />
              <span>Top</span>
            </a>
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <Award className="w-3.5 h-3.5 text-accent" />
            <span>Achievements Unlocked: {achievements.length}</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
