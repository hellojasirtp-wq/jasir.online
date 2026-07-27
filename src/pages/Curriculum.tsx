import React, { useState, useTransition, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Info, ShieldAlert, Cpu
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// 5,000 deterministic items generator helpers
const baseNames = [
  "Aarav Pooja", "Priya Ishaan", "Rohan Kavya", "Sneha Nikhil",
  "Vikram Shreya", "Ananya Aditya", "Kabir Neha"
];

const baseCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"
];

interface ListItem {
  id: number;
  name: string;
  city: string;
  initials: string;
}

const generateItems = (): ListItem[] => {
  return Array.from({ length: 5000 }, (_, i) => {
    const name = baseNames[i % baseNames.length];
    const city = baseCities[i % baseCities.length];
    // AP, PI, RK etc.
    const parts = name.split(" ");
    const initials = parts.map(p => p[0]).join("").toUpperCase();
    return {
      id: i + 1,
      name: `${name} ${i >= 7 ? '#' + (i + 1) : ''}`,
      city,
      initials
    };
  });
};

export const Curriculum: React.FC = () => {
  const { addAchievement } = usePortfolio();

  // Settings
  const [cpuLagMs, setCpuLagMs] = useState(150); // custom simulation lag
  const dataset = useMemo(() => generateItems(), []);

  // --- Old React Simulator State ---
  const [inputOld, setInputOld] = useState("jasir");
  const [filteredOld, setFilteredOld] = useState<ListItem[]>(dataset.slice(0, 100));
  const [renderTimeOld, setRenderTimeOld] = useState(1127); // default matching screenshot
  const [framesDroppedOld, setFramesDroppedOld] = useState(70);
  const [isBlockedOld, setIsBlockedOld] = useState(false);

  // --- React Fiber Simulator State ---
  const [inputFiber, setInputFiber] = useState("1233ddsjsdjdskdsdsajkdsadsakajjsajskdsakjasasjd");
  const [filteredFiber, setFilteredFiber] = useState<ListItem[]>(dataset.slice(0, 100));
  const [isPendingFiber, startTransition] = useTransition();
  const [pausesFiber, setPausesFiber] = useState(63);
  const [interruptsFiber, setInterruptsFiber] = useState(33);

  // CPU blocker loop helper
  const blockThread = (ms: number) => {
    const start = performance.now();
    while (performance.now() - start < ms) {
      // Synchronous thread lock
    }
  };

  // --- Handles Typing in Old React (Synchronous) ---
  const handleTypeOld = (val: string) => {
    setInputOld(val);
    setIsBlockedOld(true);

    // Run synchronous blocking block inside a brief timeout so react has context
    setTimeout(() => {
      const start = performance.now();
      
      // Perform blocking operation representing heavy UI tree rendering
      blockThread(cpuLagMs);

      // Perform actual search logic
      const query = val.toLowerCase().trim();
      const filtered = query 
        ? dataset.filter(item => item.name.toLowerCase().includes(query) || item.city.toLowerCase().includes(query))
        : dataset;

      setFilteredOld(filtered);
      
      const elapsed = Math.round(performance.now() - start);
      setRenderTimeOld(elapsed);
      setFramesDroppedOld(Math.round(elapsed / 16.67));
      setIsBlockedOld(false);

      if (elapsed > 200) {
        addAchievement('Thread Blocker');
      }
    }, 10);
  };

  // --- Handles Typing in React Fiber (Concurrent) ---
  const handleTypeFiber = (val: string) => {
    setInputFiber(val);

    // Transition filters list concurrently in background thread, allowing input to remain smooth
    startTransition(() => {
      const query = val.toLowerCase().trim();
      const filtered = query 
        ? dataset.filter(item => item.name.toLowerCase().includes(query) || item.city.toLowerCase().includes(query))
        : dataset;

      setFilteredFiber(filtered);
      
      // Dynamic rendering pause/interrupt calculations to reflect UI
      const len = query.length;
      if (len === 0) {
        setPausesFiber(0);
        setInterruptsFiber(0);
      } else {
        setPausesFiber(len * 8 + Math.floor(Math.random() * 6));
        setInterruptsFiber(len * 4 + Math.floor(Math.random() * 4));
      }
      
      addAchievement('Fiber Explorer');
    });
  };

  // Colors mapping for initials avatar circles
  const getAvatarBg = (initials: string) => {
    const val = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    const colors = [
      'bg-red-500/20 text-red-400 border-red-500/30',
      'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'bg-green-500/20 text-green-400 border-green-500/30',
      'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'bg-pink-500/20 text-pink-400 border-pink-500/30',
    ];
    return colors[val % colors.length];
  };

  return (
    <section id="curriculum" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center overflow-hidden select-none">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
        
        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
              <ChevronRight className="w-4 h-4 text-highlight animate-pulse" />
              <span>09. RECONCILIATION DEEP DIVE</span>
            </div>
            <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
              React Fiber Visualizer
            </h2>
            <p className="text-sm text-muted max-w-2xl">
              Understand the core of React's render engine. Old React blocks the browser during heavy updates (Synchronous). React Fiber splits rendering into interruptible chunks, keeping the user interface completely responsive (Concurrent).
            </p>
          </div>

          {/* Interactive CPU Workload Slider */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col space-y-2 w-full md:w-80 select-none">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-secondary" />
                Simulated Render Cost
              </span>
              <span className="text-white font-bold">{cpuLagMs}ms / keystroke</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="400" 
              step="10" 
              value={cpuLagMs}
              onChange={(e) => setCpuLagMs(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <span className="text-[10px] text-muted font-mono leading-none">
              Controls CPU thread lock duration on the left panel.
            </span>
          </div>
        </div>

        {/* Central Split Title */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 select-none">
          <span className="text-lg md:text-xl font-bold font-sans text-[#FF4D8D] text-glow-accent">Old React</span>
          <span className="hidden md:inline text-xs font-mono text-muted/60 uppercase tracking-widest">Type in boxes below to feel the difference</span>
          <span className="text-lg md:text-xl font-bold font-sans text-[#00FFB3] text-glow-highlight">React Fiber</span>
        </div>

        {/* Side-by-Side Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ==================== LEFT PANEL: OLD REACT ==================== */}
          <div className={`glass-panel rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden shadow-2xl relative ${
            isBlockedOld ? 'border-accent/60 ring-2 ring-accent/20 bg-accent/[0.02]' : 'border-white/10 hover:border-white/15'
          }`}>
            {isBlockedOld && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px] pointer-events-none z-20 flex items-center justify-center">
                <div className="bg-bgMain/90 border border-accent/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-neon-accent animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] font-mono text-accent uppercase tracking-wider">Main Thread Blocked</span>
                </div>
              </div>
            )}

            {/* Header Area */}
            <div className="p-5 border-b border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF4D8D]/40 bg-[#FF4D8D]/5 border border-[#FF4D8D]/20 px-2.5 py-1 rounded-full uppercase">
                  Synchronous - No Pause
                </span>
                <span className="text-[10px] font-mono text-muted">React &lt; v16</span>
              </div>

              {/* Typing Box */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-secondary uppercase tracking-wider">
                  <span>Typing</span>
                  {inputOld && (
                    <span className="text-accent">
                      ✓ Render done — {renderTimeOld}ms blocked
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={inputOld}
                  onChange={(e) => handleTypeOld(e.target.value)}
                  placeholder="Type to filter synchronous list..."
                  className="w-full bg-[#0a0d1a]/80 border border-white/10 focus:border-accent/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/10 outline-none transition-colors font-mono"
                />
              </div>
            </div>

            {/* Metrics HUD Grid */}
            <div className="grid grid-cols-3 border-b border-white/5 bg-[#090b14]/50 select-none">
              <div className="p-4 flex flex-col items-center justify-center text-center border-r border-white/5 space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Render Time</span>
                <span className="text-lg font-bold font-mono text-white text-glow-white">
                  {renderTimeOld}ms
                </span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center border-r border-white/5 space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Input Blocked</span>
                <span className="text-lg font-bold font-mono text-accent text-glow-accent">
                  -{renderTimeOld}ms
                </span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Frames Dropped</span>
                <span className="text-lg font-bold font-mono text-[#FF4D8D]">
                  {framesDroppedOld}
                </span>
              </div>
            </div>

            {/* Render Flow Pipeline */}
            <div className="p-6 border-b border-white/5 space-y-3.5 bg-[#070911]/40">
              <span className="text-[9px] font-mono text-muted uppercase tracking-wider block">Rendering Pipeline</span>
              <div className="relative pl-6 space-y-3 font-mono text-xs">
                {/* Connecting vertical line */}
                <div className="absolute left-1.5 top-2.5 bottom-2.5 w-[2px] bg-accent/30" />

                {[
                  { label: "Header", priority: "HIGH" },
                  { label: "Typing Input", priority: "HIGH" },
                  { label: "List (5000 items)", priority: "LOW" },
                  { label: "Remaining UI", priority: "LOW" },
                  { label: "DOM Update", priority: "" }
                ].map((step, idx) => (
                  <div key={idx} className="flex justify-between items-center text-muted">
                    <div className="flex items-center gap-3">
                      {/* Node bullet */}
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-accent bg-bgMain flex-shrink-0 z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      </div>
                      <span className={idx === 2 && isBlockedOld ? 'text-accent font-semibold' : ''}>{step.label}</span>
                    </div>
                    {step.priority && (
                      <span className={`text-[9px] border px-1.5 py-0.5 rounded leading-none ${
                        step.priority === "HIGH" ? 'border-accent/40 bg-accent/5 text-accent' : 'border-white/10 bg-white/5 text-muted'
                      }`}>
                        {step.priority}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* List Showcase */}
            <div className="flex-1 flex flex-col min-h-[380px] bg-[#06080f]/90">
              <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center select-none text-[10px] font-mono tracking-wider uppercase text-muted">
                <span>List</span>
                <span className="text-secondary">{filteredOld.length.toLocaleString()} / 5,000</span>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[380px] p-4 space-y-2 font-mono scrollbar-thin">
                {filteredOld.slice(0, 100).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${getAvatarBg(item.initials)}`}>
                        {item.initials}
                      </div>
                      <div>
                        <div className="text-xs text-white font-medium">{item.name}</div>
                        <div className="text-[10px] text-muted">{item.city}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#FF4D8D]/40 font-mono">#{item.id}</span>
                  </div>
                ))}
                {filteredOld.length === 0 && (
                  <div className="text-center py-10 text-xs text-muted">No items matched query.</div>
                )}
                {filteredOld.length > 100 && (
                  <div className="text-center py-3 text-[10px] text-muted border-t border-white/5">
                    Showing first 100 of {filteredOld.length} matches...
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ==================== RIGHT PANEL: REACT FIBER ==================== */}
          <div className={`glass-panel rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden shadow-2xl relative ${
            isPendingFiber ? 'border-highlight/60 ring-2 ring-highlight/20 bg-highlight/[0.01]' : 'border-white/10 hover:border-white/15'
          }`}>
            
            {/* Header Area */}
            <div className="p-5 border-b border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#00FFB3]/50 bg-[#00FFB3]/5 border border-[#00FFB3]/20 px-2.5 py-1 rounded-full uppercase">
                  Concurrent - With Pause
                </span>
                <span className="text-[10px] font-mono text-muted">React v16+ (Fiber Engine)</span>
              </div>

              {/* Typing Box */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-secondary uppercase tracking-wider">
                  <span>Typing</span>
                  <span className={isPendingFiber ? 'text-[#00FFB3]/80 animate-pulse' : 'text-highlight'}>
                    {isPendingFiber ? '⚡ Traversal rendering (non-blocking)...' : '✓ All done — input never blocked'}
                  </span>
                </div>
                <input
                  type="text"
                  value={inputFiber}
                  onChange={(e) => handleTypeFiber(e.target.value)}
                  placeholder="Type to filter concurrent list smoothly..."
                  className="w-full bg-[#0a0d1a]/80 border border-white/10 focus:border-highlight/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/10 outline-none transition-colors font-mono"
                />
              </div>
            </div>

            {/* Metrics HUD Grid */}
            <div className="grid grid-cols-3 border-b border-white/5 bg-[#090b14]/50 select-none">
              <div className="p-4 flex flex-col items-center justify-center text-center border-r border-white/5 space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Input Response</span>
                <span className="text-lg font-bold font-mono text-highlight text-glow-highlight">
                  &lt; 2ms
                </span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center border-r border-white/5 space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Pauses Made</span>
                <span className="text-lg font-bold font-mono text-white text-glow-white">
                  {pausesFiber}
                </span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Interrupts</span>
                <span className="text-lg font-bold font-mono text-[#00D4FF]">
                  {interruptsFiber}
                </span>
              </div>
            </div>

            {/* Render Flow Pipeline */}
            <div className="p-6 border-b border-white/5 space-y-3.5 bg-[#070911]/40">
              <span className="text-[9px] font-mono text-muted uppercase tracking-wider block">Rendering Pipeline</span>
              <div className="relative pl-6 space-y-3 font-mono text-xs">
                {/* Connecting vertical line */}
                <div className="absolute left-1.5 top-2.5 bottom-2.5 w-[2px] bg-highlight/30" />

                {[
                  { label: "Header", priority: "HIGH" },
                  { label: "Typing Input", priority: "HIGH" },
                  { label: "List (5000 items)", priority: "LOW" },
                  { label: "Remaining UI", priority: "LOW" },
                  { label: "DOM Update", priority: "" }
                ].map((step, idx) => (
                  <div key={idx} className="flex justify-between items-center text-muted relative font-mono">
                    {/* Animated background highlights during rendering updates */}
                    {isPendingFiber && idx === 2 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="absolute inset-0 -mx-4 rounded bg-highlight/10 pointer-events-none"
                      />
                    )}
                    
                    <div className="flex items-center gap-3">
                      {/* Node bullet */}
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-highlight bg-bgMain flex-shrink-0 z-10 flex items-center justify-center">
                        {isPendingFiber && idx === 2 ? (
                          <motion.div 
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-highlight"
                          />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-highlight" />
                        )}
                      </div>
                      <span className={idx === 2 && isPendingFiber ? 'text-highlight font-semibold' : ''}>{step.label}</span>
                    </div>
                    {step.priority && (
                      <span className={`text-[9px] border px-1.5 py-0.5 rounded leading-none ${
                        step.priority === "HIGH" ? 'border-highlight/40 bg-highlight/5 text-highlight' : 'border-white/10 bg-white/5 text-muted'
                      }`}>
                        {step.priority}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* List Showcase */}
            <div className="flex-1 flex flex-col min-h-[380px] bg-[#06080f]/90">
              <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center select-none text-[10px] font-mono tracking-wider uppercase text-muted">
                <span>List</span>
                <span className="text-secondary">{filteredFiber.length.toLocaleString()} / 5,000</span>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[380px] p-4 space-y-2 font-mono scrollbar-thin">
                {filteredFiber.slice(0, 100).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${getAvatarBg(item.initials)}`}>
                        {item.initials}
                      </div>
                      <div>
                        <div className="text-xs text-white font-medium">{item.name}</div>
                        <div className="text-[10px] text-muted">{item.city}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#00FFB3]/40 font-mono font-medium">#{item.id}</span>
                  </div>
                ))}
                {filteredFiber.length === 0 && (
                  <div className="text-center py-10 text-xs text-muted">No items matched query.</div>
                )}
                {filteredFiber.length > 100 && (
                  <div className="text-center py-3 text-[10px] text-muted border-t border-white/5">
                    Showing first 100 of {filteredFiber.length} matches...
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Explainers / Footer Info details card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-start shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0 border border-secondary/25">
            <Info className="w-6 h-6 text-secondary" />
          </div>
          <div className="space-y-2 flex-1">
            <h4 className="text-white text-base font-bold">Why does this happen?</h4>
            <p className="text-xs md:text-sm text-muted leading-relaxed">
              In older versions of React (stack reconciliation), once updates began, the engine traversed the component tree synchronously. The main thread was fully locked, meaning typing inputs, scrolling events, and layout repaints had to wait. If a render took 150ms, the interface froze entirely for 10 frames.
            </p>
            <p className="text-xs md:text-sm text-muted leading-relaxed">
              React Fiber introduced a complete rewrite of the core scheduler. By breaking tasks into atomic fiber nodes and linking them in a virtual linked list tree, React gains the ability to execute work in loops, pause during high priority events (like typing or animation frames), and commit adjustments synchronously only after all calculations are complete.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
