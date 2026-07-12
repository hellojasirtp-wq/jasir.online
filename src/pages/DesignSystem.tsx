import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, ChevronRight, Layout, Type, 
  Eye, X, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const DesignSystem: React.FC = () => {
  const { addAchievement } = usePortfolio();
  const [modalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  
  // Custom button click
  const triggerAlert = (type: 'success' | 'error') => {
    setAlertType(type);
    addAchievement('UI Token Inspector');
    setTimeout(() => setAlertType(null), 3000);
  };

  const colors = [
    { name: 'Background', hex: '#050816', desc: 'Main dark cosmic background' },
    { name: 'Primary', hex: '#6C63FF', desc: 'Primary brand neon purple' },
    { name: 'Secondary', hex: '#00D4FF', desc: 'Action neon cyan/blue' },
    { name: 'Accent', hex: '#FF4D8D', desc: 'Alert and highlight hot pink' },
    { name: 'Highlight', hex: '#00FFB3', desc: 'Success and metrics mint green' },
  ];

  const typography = [
    { tag: 'h1.premium', font: 'Outfit 800 (Extra Bold)', size: '36px - 72px', desc: 'Cinematic title headers' },
    { tag: 'h2.sub', font: 'Outfit 600 (Semi Bold)', size: '24px - 32px', desc: 'Section headings' },
    { tag: 'body.sans', font: 'Inter 400 (Regular)', size: '14px - 18px', desc: 'Primary reading copies' },
    { tag: 'code.mono', font: 'Fira Code 500 (Medium)', size: '12px - 14px', desc: 'Syntax code blocks & terminal logs' },
  ];

  return (
    <section id="design-system" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center">
      
      {/* Glow Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-secondary/5 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>06. DESIGN SYSTEM</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Design System & UI Tokens
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Color Tokens & Typography */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Color Palette Panel */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-lg space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Palette className="w-4 h-4 text-primary" />
                <h3 className="font-mono text-xs font-bold uppercase text-white">Color Swatches</h3>
              </div>
              <div className="space-y-2.5">
                {colors.map((c) => (
                  <div key={c.hex} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex-shrink-0 border border-white/10 shadow-md"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-semibold">{c.name}</span>
                        <span className="text-muted">{c.hex}</span>
                      </div>
                      <p className="text-[10px] text-muted">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography scale panel */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-lg space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Type className="w-4 h-4 text-secondary" />
                <h3 className="font-mono text-xs font-bold uppercase text-white">Typography Scale</h3>
              </div>
              <div className="space-y-3 font-mono text-[10px] text-muted">
                {typography.map((t) => (
                  <div key={t.tag} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between font-bold text-white mb-0.5">
                      <span>{t.tag}</span>
                      <span className="text-secondary">{t.size}</span>
                    </div>
                    <p className="text-glow-primary">{t.font}</p>
                    <p className="text-[9px] text-muted">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2 & 3: Component playground */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Component sandbox panel */}
            <div className="glass-panel p-8 rounded-xl border border-white/10 shadow-xl space-y-8">
              
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Layout className="w-4 h-4 text-highlight" />
                <h3 className="font-mono text-xs font-bold uppercase text-white">Interactive Elements Sandbox</h3>
              </div>

              {/* Buttons Playground */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Button Tokens</span>
                <div className="flex flex-wrap gap-4">
                  {/* Primary Glowing */}
                  <button 
                    onClick={() => triggerAlert('success')}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs uppercase tracking-widest cursor-pointer shadow-neon-primary hover:shadow-neon-secondary hover:scale-102 active:scale-98 transition-all"
                  >
                    Action success
                  </button>

                  {/* Outline Neon */}
                  <button 
                    onClick={() => triggerAlert('error')}
                    className="px-6 py-2.5 rounded-full border border-accent bg-transparent text-accent hover:bg-accent/10 font-semibold text-xs uppercase tracking-widest cursor-pointer shadow-neon-accent hover:scale-102 active:scale-98 transition-all"
                  >
                    Action error
                  </button>

                  {/* Glass panel toggle button */}
                  <button 
                    onClick={() => setModalOpen(true)}
                    className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest cursor-pointer flex items-center gap-2 hover:scale-102 active:scale-98 transition-all"
                  >
                    <Eye className="w-4 h-4 text-highlight" />
                    <span>Launch overlay Modal</span>
                  </button>
                </div>
              </div>

              {/* Text fields Inputs */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Input Fields</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-muted uppercase">Sample Input</label>
                    <input 
                      type="text" 
                      placeholder="Focused outline glow..." 
                      className="w-full px-4 py-2.5 rounded-lg bg-bgMain border border-white/10 text-white font-mono text-xs placeholder-white/20 outline-none focus:border-secondary focus:box-shadow shadow-neon-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-muted uppercase">Select Field</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-lg bg-bgMain border border-white/10 text-white font-mono text-xs outline-none focus:border-primary focus:box-shadow shadow-neon-primary transition-all"
                    >
                      <option>React 19 Core Framework</option>
                      <option>Next.js Static Generation</option>
                      <option>Three.js WebGL rendering</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Alert notifications area */}
              <AnimatePresence>
                {alertType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-3 p-4 rounded-xl border font-mono text-xs ${
                      alertType === 'success' 
                        ? 'bg-highlight/10 border-highlight/30 text-highlight' 
                        : 'bg-accent/10 border-accent/30 text-accent'
                    }`}
                  >
                    {alertType === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span>
                      {alertType === 'success' 
                        ? 'Success Trigger: Primary token action executed successfully.' 
                        : 'Error Trigger: Outline accent token action resolved exceptions.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

      {/* Overlay Modal Component */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-bgMain/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md glass-panel p-6 rounded-2xl border border-white/15 shadow-2xl z-10 space-y-6"
            >
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-lg heading-premium text-white font-extrabold">Modal System overlay</h4>
                  <p className="text-[10px] font-mono text-muted uppercase mt-0.5">Custom Atom Component</p>
                </div>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Message body */}
              <p className="text-xs text-muted leading-relaxed font-sans">
                This dialog demonstrates responsive glassmorphism, depth blurring, entry spring paths, and layout-independent stack heights.
              </p>

              {/* Actions row */}
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] font-mono text-muted hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { setModalOpen(false); triggerAlert('success'); }}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 text-[10px] font-mono text-white transition-colors cursor-pointer"
                >
                  Confirm action
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
