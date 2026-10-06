import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Eye, Keyboard, Volume2,
  X, Sparkles, Contrast,
  HelpCircle
} from 'lucide-react';

export const AccessibilityLab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'focus-trap' | 'roving-tab' | 'live-region' | 'contrast'>('focus-trap');

  // --- Example 1: Focus Trap Modal Demo ---
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalOpen) {
      triggerBtnRef.current?.focus();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  // --- Example 2: Roving TabIndex Demo ---
  const [activeRovingIdx, setActiveRovingIdx] = useState(0);
  const rovingItems = ['All Projects', 'React 19', 'Design Systems', 'Micro Frontends', 'Accessibility'];
  const rovingBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleRovingKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (idx + 1) % rovingItems.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (idx - 1 + rovingItems.length) % rovingItems.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = rovingItems.length - 1;
    }

    if (nextIdx !== idx) {
      setActiveRovingIdx(nextIdx);
      rovingBtnRefs.current[nextIdx]?.focus();
    }
  };

  // --- Example 3: ARIA Live Region & Screen Reader Announcements ---
  const [cartCount, setCartCount] = useState(0);
  const [liveAnnouncement, setLiveAnnouncement] = useState('Cart initialized with 0 items.');
  const [livePoliteness, setLivePoliteness] = useState<'polite' | 'assertive'>('polite');

  const handleAddToCart = () => {
    setCartCount((c) => {
      const next = c + 1;
      setLiveAnnouncement(`Item added! Your cart now contains ${next} items.`);
      return next;
    });
  };

  // --- Example 4: WCAG 2.2 Contrast & APCA Checker ---
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#050816');

  // Luminance calculator helper
  const getLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    const rgb = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(textColor);
  const lum2 = getLuminance(bgColor);
  const contrastRatio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  const isAALarge = contrastRatio >= 3.0;
  const isAANormal = contrastRatio >= 4.5;
  const isAAANormal = contrastRatio >= 7.0;

  return (
    <div className="w-full space-y-8 select-none">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-highlight/30 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-highlight/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-highlight/20 to-secondary/20 border border-highlight/40 flex items-center justify-center text-highlight shadow-neon-highlight">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                Accessibility (a11y) & WCAG 2.2 Engineering Lab
                <span className="text-xs px-2 py-0.5 rounded-full bg-highlight/10 border border-highlight/30 text-highlight font-mono">
                  WCAG AAA Standard
                </span>
              </h3>
              <p className="text-xs text-muted">
                Interactive component demonstrations of keyboard navigation, focus management, roving tabindex, and screen reader live regions
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div role="tablist" aria-label="Accessibility Patterns" className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          {[
            { id: 'focus-trap', label: '1. Accessible Modal & Focus Trap', icon: Keyboard },
            { id: 'roving-tab', label: '2. Keyboard Roving TabIndex', icon: Eye },
            { id: 'live-region', label: '3. Screen Reader Live Regions', icon: Volume2 },
            { id: 'contrast', label: '4. WCAG Contrast Calculator', icon: Contrast },
          ].map((tab) => {
            const isSelected = activeSubTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-highlight/20 to-secondary/20 text-white shadow-neon-highlight border border-highlight/50'
                    : 'bg-white/5 text-muted hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-highlight' : 'text-muted'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Demonstrations */}
      <AnimatePresence mode="wait">
        {/* --- 1. Focus Trap & Accessible Modal --- */}
        {activeSubTab === 'focus-trap' && (
          <motion.div
            key="focus-trap"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-secondary uppercase tracking-widest block font-bold">
                    WCAG 2.4.3 & 2.1.2 Focus Order
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    Accessible Modal Dialog & Strict Focus Trap
                  </h4>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-highlight/10 text-highlight border border-highlight/30">
                  Keyboard Operable
                </span>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                When a modal opens, keyboard focus must be trapped within the dialog. Pressing <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 font-mono text-xs text-highlight">Tab</kbd> cycles through interactive elements without leaking to background content, and pressing <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 font-mono text-xs text-highlight">Esc</kbd> returns focus safely to the trigger element.
              </p>

              {/* Interactive Sandbox Trigger */}
              <div className="p-6 rounded-xl bg-black/50 border border-secondary/30 flex flex-col items-center justify-center space-y-4">
                <button
                  ref={triggerBtnRef}
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs uppercase tracking-wider shadow-neon-primary hover:scale-105 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
                >
                  Open Accessible Modal (Test Focus Trap)
                </button>
                <span className="text-xs font-mono text-muted">
                  Tip: After opening, press <kbd className="text-secondary font-bold">Tab</kbd>, <kbd className="text-secondary font-bold">Shift+Tab</kbd>, and <kbd className="text-secondary font-bold">Esc</kbd>.
                </span>
              </div>

              {/* Live Modal Popup Component */}
              <AnimatePresence>
                {modalOpen && (
                  <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={() => setModalOpen(false)}
                    role="presentation"
                  >
                    <motion.div
                      ref={modalRef}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-title"
                      aria-describedby="modal-desc"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="w-full max-w-lg p-6 rounded-2xl glass-panel border border-highlight/40 shadow-2xl bg-[#080d21] space-y-5 relative"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-highlight" />
                          <h3 id="modal-title" className="text-base font-bold text-white">
                            Accessible Dialog (Focus Trapped)
                          </h3>
                        </div>
                        <button
                          onClick={() => setModalOpen(false)}
                          aria-label="Close modal dialog"
                          className="p-1.5 rounded-lg text-muted hover:text-white bg-white/5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p id="modal-desc" className="text-xs text-gray-300 leading-relaxed">
                        Notice how your Tab key cannot escape this modal container into the background page. Screen readers announce this container with <code>role="dialog"</code> and <code>aria-modal="true"</code>.
                      </p>

                      <div className="space-y-3">
                        <label htmlFor="a11y-input" className="block text-xs font-mono text-muted">
                          Sample Accessible Input Field:
                        </label>
                        <input
                          id="a11y-input"
                          type="text"
                          placeholder="Type something..."
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-muted focus-visible:ring-2 focus-visible:ring-highlight focus-visible:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                        <button
                          onClick={() => setModalOpen(false)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
                        >
                          Cancel (Esc)
                        </button>
                        <button
                          onClick={() => {
                            alert('Action confirmed accessibly!');
                            setModalOpen(false);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-highlight/20 hover:bg-highlight/30 border border-highlight/50 text-highlight focus-visible:ring-2 focus-visible:ring-highlight focus-visible:outline-none cursor-pointer"
                        >
                          Confirm Action
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Code Snippet Box */}
              <div className="p-4 rounded-xl bg-[#030614] border border-white/10 font-mono text-xs space-y-2">
                <span className="text-secondary font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-highlight" />
                  Key Accessible Markup Implementation:
                </span>
                <pre className="text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{`// Accessible Modal markup
<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title" 
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">Accessible Dialog</h2>
  <p id="modal-desc">Trapped focus with Esc listener</p>
</div>`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- 2. Roving TabIndex --- */}
        {activeSubTab === 'roving-tab' && (
          <motion.div
            key="roving-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-secondary uppercase tracking-widest block font-bold">
                    WCAG 2.1.1 Keyboard Roving TabIndex Pattern
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    Arrow Key Navigation & Single Tab Stop Toolbar
                  </h4>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/30">
                  WAI-ARIA APG
                </span>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                In complex toolbars, tabs, and menus, having every button in the tab order causes keyboard fatigue. The <strong>Roving TabIndex</strong> pattern makes the entire component a single tab stop (<kbd className="font-mono text-highlight text-xs">Tab</kbd>), while internal navigation is handled via <kbd className="font-mono text-highlight text-xs">←</kbd> and <kbd className="font-mono text-highlight text-xs">→</kbd> arrow keys.
              </p>

              {/* Interactive Toolbar Sandbox */}
              <div className="p-6 rounded-xl bg-black/50 border border-secondary/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted uppercase">Interactive Roving Toolbar:</span>
                  <span className="text-xs font-mono text-highlight">Active: {rovingItems[activeRovingIdx]}</span>
                </div>

                <div 
                  role="toolbar" 
                  aria-label="Technology Filter Toolbar"
                  className="flex flex-wrap gap-2 p-2 rounded-2xl bg-white/5 border border-white/10"
                >
                  {rovingItems.map((item, idx) => {
                    const isFocused = activeRovingIdx === idx;
                    return (
                      <button
                        key={item}
                        ref={(el) => { rovingBtnRefs.current[idx] = el; }}
                        tabIndex={isFocused ? 0 : -1}
                        onClick={() => setActiveRovingIdx(idx)}
                        onKeyDown={(e) => handleRovingKeyDown(e, idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-highlight focus-visible:outline-none ${
                          isFocused
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-neon-primary scale-105'
                            : 'bg-white/5 text-muted hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-mono text-muted flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-secondary" />
                  <span>Tab into the toolbar once, then use Left/Right/Home/End arrow keys to navigate!</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- 3. Screen Reader Live Regions --- */}
        {activeSubTab === 'live-region' && (
          <motion.div
            key="live-region"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-secondary uppercase tracking-widest block font-bold">
                    WCAG 4.1.3 Status Messages
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    Dynamic Screen Reader Live Regions (<code>aria-live</code>)
                  </h4>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/40">
                  VoiceOver / NVDA Ready
                </span>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                When content updates asynchronously (cart additions, toasts, search results), sighted users see the visual badge change, but screen reader users are left unaware unless an <code>aria-live</code> region announces the mutation.
              </p>

              {/* Interactive Live Region Sandbox */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-black/50 border border-secondary/30 items-center">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-muted uppercase">Select Announcement Urgency:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLivePoliteness('polite')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                          livePoliteness === 'polite' ? 'bg-secondary/20 border-secondary text-secondary' : 'bg-white/5 border-white/10 text-muted'
                        }`}
                      >
                        aria-live="polite" (Waits for idle)
                      </button>
                      <button
                        onClick={() => setLivePoliteness('assertive')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                          livePoliteness === 'assertive' ? 'bg-accent/20 border-accent text-accent' : 'bg-white/5 border-white/10 text-muted'
                        }`}
                      >
                        aria-live="assertive" (Interrupts immediately)
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Add Item to Cart (Count: {cartCount})
                  </button>
                </div>

                {/* Simulated Screen Reader Speech Bubble */}
                <div className="p-4 rounded-xl bg-[#020512] border border-highlight/30 space-y-2">
                  <div className="flex items-center justify-between text-xs text-highlight font-mono font-bold">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>Screen Reader Audio Stream:</span>
                    </span>
                    <span className="text-[10px] text-muted font-mono">{livePoliteness.toUpperCase()}</span>
                  </div>

                  {/* Real Live Region DOM node */}
                  <div 
                    role="status" 
                    aria-live={livePoliteness}
                    aria-atomic="true"
                    className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-300"
                  >
                    🗣 &quot;{liveAnnouncement}&quot;
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- 4. Color Contrast Calculator --- */}
        {activeSubTab === 'contrast' && (
          <motion.div
            key="contrast"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-secondary uppercase tracking-widest block font-bold">
                    WCAG 1.4.3 & 1.4.6 Contrast
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    Color Contrast & Relative Luminance Inspector
                  </h4>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-highlight/10 text-highlight border border-highlight/30">
                  AA & AAA Compliance
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Controls */}
                <div className="space-y-4 p-6 rounded-xl bg-black/50 border border-white/10">
                  <div className="space-y-2">
                    <label htmlFor="text-color" className="block text-xs font-mono text-muted">Foreground Text Color:</label>
                    <div className="flex items-center gap-3">
                      <input 
                        id="text-color" 
                        type="color" 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" 
                      />
                      <span className="font-mono text-xs text-white">{textColor}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="bg-color" className="block text-xs font-mono text-muted">Background Surface Color:</label>
                    <div className="flex items-center gap-3">
                      <input 
                        id="bg-color" 
                        type="color" 
                        value={bgColor} 
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" 
                      />
                      <span className="font-mono text-xs text-white">{bgColor}</span>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {[
                      { label: 'Cyber Dark', text: '#00FFB3', bg: '#050816' },
                      { label: 'High Contrast White', text: '#000000', bg: '#FFFFFF' },
                      { label: 'Low Contrast Warning', text: '#777777', bg: '#222222' }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => { setTextColor(preset.text); setBgColor(preset.bg); }}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] font-mono text-muted hover:text-white transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Preview Box */}
                <div 
                  style={{ backgroundColor: bgColor, color: textColor }}
                  className="p-6 rounded-2xl border border-white/20 flex flex-col justify-between h-[240px] shadow-xl transition-colors"
                >
                  <div>
                    <h5 className="text-lg font-bold">Contrast Ratio: {contrastRatio.toFixed(2)}:1</h5>
                    <p className="text-xs mt-1">This is how body text appears at 14px regular font weight.</p>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs pt-4 border-t border-current/20">
                    <div className="flex items-center justify-between">
                      <span>WCAG AA Normal Text (4.5:1):</span>
                      <strong className={isAANormal ? 'text-emerald-400' : 'text-red-400'}>{isAANormal ? 'PASS ✔' : 'FAIL ✘'}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>WCAG AA Large Text (3.0:1):</span>
                      <strong className={isAALarge ? 'text-emerald-400' : 'text-red-400'}>{isAALarge ? 'PASS ✔' : 'FAIL ✘'}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>WCAG AAA Normal Text (7.0:1):</span>
                      <strong className={isAAANormal ? 'text-emerald-400' : 'text-red-400'}>{isAAANormal ? 'PASS ✔' : 'FAIL ✘'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
