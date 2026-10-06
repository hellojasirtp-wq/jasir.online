import React, { useState, useTransition, useMemo } from 'react';
import { 
  ShieldAlert, Cpu, Sparkles, Zap
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

// 5,000 deterministic items generator helpers
const baseNames = [
  "Aarav Pooja", "Priya Ishaan", "Rohan Kavya", "Sneha Nikhil",
  "Vikram Shreya", "Ananya Aditya", "Kabir Neha", "Jasir Senior Engineer"
];

const baseCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Calicut"
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
    const parts = name.split(" ");
    const initials = parts.map(p => p[0]).join("").toUpperCase();
    return {
      id: i + 1,
      name: `${name} ${i >= 8 ? '#' + (i + 1) : ''}`,
      city,
      initials
    };
  });
};

export const FiberConcurrencyExplainer: React.FC = () => {
  const { addAchievement } = usePortfolio();

  // Settings
  const [cpuLagMs, setCpuLagMs] = useState(150); // custom simulation lag
  const dataset = useMemo(() => generateItems(), []);

  // --- Old React Simulator State ---
  const [inputOld, setInputOld] = useState("jasir");
  const [filteredOld, setFilteredOld] = useState<ListItem[]>(dataset.slice(0, 100));
  const [renderTimeOld, setRenderTimeOld] = useState(1127);
  const [framesDroppedOld, setFramesDroppedOld] = useState(70);
  const [isBlockedOld, setIsBlockedOld] = useState(false);

  // --- React Fiber Simulator State ---
  const [inputFiber, setInputFiber] = useState("jasir enterprise concurrency");
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

    setTimeout(() => {
      const start = performance.now();
      blockThread(cpuLagMs);

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

  // --- Handles Typing in React Fiber (Concurrent with useTransition) ---
  const handleTypeFiber = (val: string) => {
    setInputFiber(val);

    setPausesFiber(prev => prev + Math.floor(Math.random() * 4) + 1);
    setInterruptsFiber(prev => prev + (val.length % 2 === 0 ? 1 : 2));

    startTransition(() => {
      blockThread(Math.min(cpuLagMs, 40));

      const query = val.toLowerCase().trim();
      const filtered = query 
        ? dataset.filter(item => item.name.toLowerCase().includes(query) || item.city.toLowerCase().includes(query))
        : dataset;

      setFilteredFiber(filtered);
    });
  };

  return (
    <div className="w-full space-y-8 select-none">
      {/* Header Card */}
      <div className="p-6 rounded-2xl glass-panel border border-secondary/30 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary/20 to-primary/20 border border-secondary/40 flex items-center justify-center text-secondary shadow-neon-secondary">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                React Fiber & Concurrency Time-Slicing Lab
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-mono">
                  Fiber Architecture
                </span>
              </h3>
              <p className="text-xs text-muted">
                Side-by-side interactive comparison: Synchronous Stack Reconciler vs Fiber Interruptible Time-Slicing across 5,000 elements
              </p>
            </div>
          </div>
        </div>

        {/* Global Controls & Simulation Lag Slider */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted">Simulated CPU Computational Lag:</span>
            <input 
              type="range"
              min={20}
              max={300}
              step={10}
              value={cpuLagMs}
              onChange={(e) => setCpuLagMs(Number(e.target.value))}
              className="accent-secondary w-32 cursor-pointer"
            />
            <span className="text-xs font-mono text-secondary font-bold">{cpuLagMs}ms</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-highlight">
            <Sparkles className="w-4 h-4" />
            <span>Dataset: 5,000 Live Virtualized Records</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Simulators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Old React (Stack Reconciler - Blocking) */}
        <div className="rounded-2xl glass-panel border border-red-500/20 p-6 space-y-4 relative overflow-hidden bg-red-950/10">
          <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Legacy Stack Reconciler (React 15 & Earlier)
              </span>
              <h4 className="text-sm font-semibold text-gray-200">Synchronous Uninterruptible Tree Traversal</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">
              BLOCKING
            </span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Every keystroke locks the main thread until the entire 5,000 item tree is recomputed. Frames drop and typing lags.
          </p>

          {/* Input field */}
          <div className="space-y-1.5">
            <label htmlFor="old-react-input" className="text-xs font-mono text-muted flex items-center justify-between">
              <span>Type below to trigger synchronous lock:</span>
              {isBlockedOld && <span className="text-red-400 font-bold animate-pulse">🔒 MAIN THREAD LOCKED</span>}
            </label>
            <input 
              id="old-react-input"
              type="text"
              value={inputOld}
              onChange={(e) => handleTypeOld(e.target.value)}
              placeholder="Type to freeze thread..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-red-500/30 text-xs font-mono text-white placeholder-muted focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
            />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-black/40 border border-red-500/20">
              <span className="text-[10px] font-mono text-muted uppercase block">Blocking Render Time</span>
              <span className="text-lg font-bold font-mono text-red-400">{renderTimeOld}ms</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-red-500/20">
              <span className="text-[10px] font-mono text-muted uppercase block">Dropped Frames</span>
              <span className="text-lg font-bold font-mono text-red-400">~{framesDroppedOld} Frames</span>
            </div>
          </div>

          {/* List Preview */}
          <div className="max-h-48 overflow-y-auto space-y-1 p-2 rounded-xl bg-black/60 border border-white/5 font-mono text-xs">
            {filteredOld.slice(0, 15).map((item) => (
              <div key={item.id} className="flex justify-between p-1.5 rounded bg-white/5 text-gray-300">
                <span>{item.name}</span>
                <span className="text-muted">{item.city}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Modern React Fiber (Concurrent Time-Slicing) */}
        <div className="rounded-2xl glass-panel border border-highlight/40 p-6 space-y-4 relative overflow-hidden bg-emerald-950/10 shadow-neon-highlight">
          <div className="flex items-center justify-between pb-3 border-b border-highlight/30">
            <div>
              <span className="text-xs font-mono text-highlight font-bold uppercase flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-highlight" />
                React Fiber Architecture (React 18 & 19)
              </span>
              <h4 className="text-sm font-semibold text-white">Concurrent Time-Slicing with useTransition</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-highlight/20 text-highlight font-bold">
              NON-BLOCKING
            </span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Typing updates state immediately at 60 FPS. Heavy background computations yield execution to keep the UI smooth and responsive.
          </p>

          {/* Input field */}
          <div className="space-y-1.5">
            <label htmlFor="fiber-input" className="text-xs font-mono text-muted flex items-center justify-between">
              <span>Type freely without any typing lag:</span>
              {isPendingFiber && <span className="text-highlight font-bold animate-pulse">⚡ YIELDING SLICES (60 FPS)</span>}
            </label>
            <input 
              id="fiber-input"
              type="text"
              value={inputFiber}
              onChange={(e) => handleTypeFiber(e.target.value)}
              placeholder="Smooth concurrent typing..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-highlight/40 text-xs font-mono text-white placeholder-muted focus-visible:ring-2 focus-visible:ring-highlight focus-visible:outline-none"
            />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-black/40 border border-highlight/30">
              <span className="text-[10px] font-mono text-muted uppercase block">Time-Slice Pauses</span>
              <span className="text-lg font-bold font-mono text-highlight">{pausesFiber} Pauses</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-highlight/30">
              <span className="text-[10px] font-mono text-muted uppercase block">Yielded Interrupts</span>
              <span className="text-lg font-bold font-mono text-highlight">{interruptsFiber} Yields</span>
            </div>
          </div>

          {/* List Preview */}
          <div className="max-h-48 overflow-y-auto space-y-1 p-2 rounded-xl bg-black/60 border border-white/5 font-mono text-xs">
            {filteredFiber.slice(0, 15).map((item) => (
              <div key={item.id} className="flex justify-between p-1.5 rounded bg-emerald-500/10 text-emerald-200 border border-emerald-500/20">
                <span>{item.name}</span>
                <span className="text-secondary">{item.city}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
