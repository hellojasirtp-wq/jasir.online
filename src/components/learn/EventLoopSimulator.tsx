import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, SkipForward,
  Terminal, Cpu, Globe, Zap, Clock,
  Info, Sparkles, RefreshCw
} from 'lucide-react';

interface SimulatorStep {
  stepNumber: number;
  title: string;
  explanation: string;
  stack: string[];
  webApis: { id: string; name: string; duration?: string }[];
  microtasks: string[];
  macrotasks: string[];
  consoleOutput: string[];
  activeComponent: 'stack' | 'webapi' | 'microtask' | 'macrotask' | 'loop' | 'none';
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  code: string;
  steps: SimulatorStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'classic',
    title: 'Promise vs setTimeout vs Synchronous',
    description: 'The definitive JavaScript execution interview question illustrating microtask prioritization.',
    code: `console.log('1: Start');

setTimeout(() => {
  console.log('2: Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Promise microtask');
});

console.log('4: End');`,
    steps: [
      {
        stepNumber: 1,
        title: 'Script Evaluation & Stack Initialization',
        explanation: 'The JS engine pushes main() script onto the Call Stack and begins synchronous execution.',
        stack: ['main()'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: [],
        activeComponent: 'stack'
      },
      {
        stepNumber: 2,
        title: 'Synchronous console.log("1: Start")',
        explanation: 'console.log("1: Start") is pushed onto the Call Stack, executed immediately, and printed.',
        stack: ['main()', 'console.log("1: Start")'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['1: Start'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 3,
        title: 'setTimeout() delegated to Web APIs',
        explanation: 'setTimeout() is called with a 0ms timer. The browser Web API environment registers the timer.',
        stack: ['main()', 'setTimeout(cb, 0)'],
        webApis: [{ id: 't1', name: 'Timer (0ms)', duration: '0ms' }],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['1: Start'],
        activeComponent: 'webapi'
      },
      {
        stepNumber: 4,
        title: 'Timer completes -> Enqueued into Macrotask Queue',
        explanation: 'The timer completes in Web API and moves its callback function to the Macrotask (Callback) Queue.',
        stack: ['main()'],
        webApis: [],
        microtasks: [],
        macrotasks: ['setTimeout cb()'],
        consoleOutput: ['1: Start'],
        activeComponent: 'macrotask'
      },
      {
        stepNumber: 5,
        title: 'Promise.resolve().then() -> Enqueued into Microtask Queue',
        explanation: 'The Promise resolves immediately. Its .then() callback is pushed to the high-priority Microtask Queue.',
        stack: ['main()', 'Promise.then()'],
        webApis: [],
        microtasks: ['Promise.then cb()'],
        macrotasks: ['setTimeout cb()'],
        consoleOutput: ['1: Start'],
        activeComponent: 'microtask'
      },
      {
        stepNumber: 6,
        title: 'Synchronous console.log("4: End")',
        explanation: 'console.log("4: End") executes on the stack. Script main() execution finishes and pops off.',
        stack: ['main()', 'console.log("4: End")'],
        webApis: [],
        microtasks: ['Promise.then cb()'],
        macrotasks: ['setTimeout cb()'],
        consoleOutput: ['1: Start', '4: End'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 7,
        title: 'Event Loop Check: Call Stack is Empty!',
        explanation: 'The Event Loop detects that the Call Stack is empty. Before running macrotasks, it MUST drain all Microtasks.',
        stack: [],
        webApis: [],
        microtasks: ['Promise.then cb()'],
        macrotasks: ['setTimeout cb()'],
        consoleOutput: ['1: Start', '4: End'],
        activeComponent: 'loop'
      },
      {
        stepNumber: 8,
        title: 'Drain Microtask: Promise Callback Executes',
        explanation: 'Promise.then callback is popped from Microtask Queue onto the Call Stack and prints "3: Promise microtask".',
        stack: ['Promise.then cb()', 'console.log("3: Promise microtask")'],
        webApis: [],
        microtasks: [],
        macrotasks: ['setTimeout cb()'],
        consoleOutput: ['1: Start', '4: End', '3: Promise microtask'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 9,
        title: 'Event Loop selects next Macrotask',
        explanation: 'With all Microtasks drained and stack empty, the Event Loop takes the first Macrotask from the queue.',
        stack: ['setTimeout cb()', 'console.log("2: Timeout callback")'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['1: Start', '4: End', '3: Promise microtask', '2: Timeout callback'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 10,
        title: 'Execution Complete!',
        explanation: 'All queues and Call Stack are clear. Final execution sequence: 1 -> 4 -> 3 -> 2.',
        stack: [],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['1: Start', '4: End', '3: Promise microtask', '2: Timeout callback'],
        activeComponent: 'none'
      }
    ]
  },
  {
    id: 'async_await',
    title: 'Async / Await with Microtask Resumption',
    description: 'See how async/await transforms execution into sequential Promise microtask checkpoints.',
    code: `async function fetchData() {
  console.log('Inside async function');
  await null;
  console.log('After await resume');
}

console.log('Script Top');
fetchData();
console.log('Script Bottom');`,
    steps: [
      {
        stepNumber: 1,
        title: 'Script Evaluation',
        explanation: 'Main thread pushes script onto Call Stack.',
        stack: ['main()'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: [],
        activeComponent: 'stack'
      },
      {
        stepNumber: 2,
        title: 'console.log("Script Top")',
        explanation: 'Prints "Script Top" synchronously.',
        stack: ['main()', 'console.log("Script Top")'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Script Top'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 3,
        title: 'Calling fetchData()',
        explanation: 'fetchData() begins executing synchronously until the first "await" expression.',
        stack: ['main()', 'fetchData()', 'console.log("Inside async function")'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Script Top', 'Inside async function'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 4,
        title: 'Encountering await null',
        explanation: 'The await expression pauses fetchData() execution, wrapping remaining body into a Microtask queue entry.',
        stack: ['main()'],
        webApis: [],
        microtasks: ['fetchData() [resume after await]'],
        macrotasks: [],
        consoleOutput: ['Script Top', 'Inside async function'],
        activeComponent: 'microtask'
      },
      {
        stepNumber: 5,
        title: 'console.log("Script Bottom")',
        explanation: 'Synchronous script continues without blocking and logs "Script Bottom".',
        stack: ['main()', 'console.log("Script Bottom")'],
        webApis: [],
        microtasks: ['fetchData() [resume after await]'],
        macrotasks: [],
        consoleOutput: ['Script Top', 'Inside async function', 'Script Bottom'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 6,
        title: 'Microtask Resumption: After Await',
        explanation: 'Call Stack empties. Event loop pulls resumed async execution from Microtask queue.',
        stack: ['fetchData() [resumed]', 'console.log("After await resume")'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Script Top', 'Inside async function', 'Script Bottom', 'After await resume'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 7,
        title: 'All Tasks Finished',
        explanation: 'Execution cleanly finishes. Demonstrates non-blocking async suspension.',
        stack: [],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Script Top', 'Inside async function', 'Script Bottom', 'After await resume'],
        activeComponent: 'none'
      }
    ]
  },
  {
    id: 'fetch_api',
    title: 'Fetch Network API & Macro vs Micro Queue',
    description: 'Trace an asynchronous HTTP network roundtrip through Web APIs and Promise microtask resolution.',
    code: `console.log('Initiating Request');

fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log('User Received'));

setTimeout(() => {
  console.log('Fallback Timer Triggered');
}, 50);

console.log('UI Render Continues');`,
    steps: [
      {
        stepNumber: 1,
        title: 'Synchronous Log',
        explanation: 'Pushes main() and executes console.log("Initiating Request").',
        stack: ['main()', 'console.log("Initiating Request")'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Initiating Request'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 2,
        title: 'fetch() handed to Web API Network Thread',
        explanation: 'fetch() delegates the HTTP socket request to background browser threads without freezing the UI.',
        stack: ['main()', 'fetch()'],
        webApis: [{ id: 'net', name: 'HTTP GET /api/user (Network Thread)', duration: '50ms' }],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Initiating Request'],
        activeComponent: 'webapi'
      },
      {
        stepNumber: 3,
        title: 'setTimeout() timer registered',
        explanation: 'Registers 50ms timer in Web APIs alongside the active HTTP request.',
        stack: ['main()', 'setTimeout(cb, 50)'],
        webApis: [
          { id: 'net', name: 'HTTP GET /api/user (Network Thread)', duration: '50ms' },
          { id: 't2', name: 'Timer (50ms)', duration: '50ms' }
        ],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Initiating Request'],
        activeComponent: 'webapi'
      },
      {
        stepNumber: 4,
        title: 'Synchronous Log: UI Continues',
        explanation: 'Prints "UI Render Continues". JavaScript thread is completely responsive.',
        stack: ['main()', 'console.log("UI Render Continues")'],
        webApis: [
          { id: 'net', name: 'HTTP GET /api/user (Network Thread)', duration: '50ms' },
          { id: 't2', name: 'Timer (50ms)', duration: '50ms' }
        ],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Initiating Request', 'UI Render Continues'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 5,
        title: 'HTTP Response arrives -> Microtask Enqueued',
        explanation: 'HTTP 200 payload returns from network. Promise .then() callback is enqueued into Microtask queue.',
        stack: [],
        webApis: [{ id: 't2', name: 'Timer (50ms)', duration: '50ms' }],
        microtasks: ['fetch.then(res => res.json())'],
        macrotasks: [],
        consoleOutput: ['Initiating Request', 'UI Render Continues'],
        activeComponent: 'microtask'
      },
      {
        stepNumber: 6,
        title: 'Microtask Executes: User Received',
        explanation: 'Event loop immediately runs the fetch resolution microtask.',
        stack: ['fetch.then()', 'console.log("User Received")'],
        webApis: [{ id: 't2', name: 'Timer (50ms)', duration: '50ms' }],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Initiating Request', 'UI Render Continues', 'User Received'],
        activeComponent: 'stack'
      },
      {
        stepNumber: 7,
        title: 'Timer Fires -> Macrotask Executes',
        explanation: 'Timer finishes in Web API and executes via Macrotask Queue.',
        stack: ['setTimeout cb()', 'console.log("Fallback Timer Triggered")'],
        webApis: [],
        microtasks: [],
        macrotasks: [],
        consoleOutput: ['Initiating Request', 'UI Render Continues', 'User Received', 'Fallback Timer Triggered'],
        activeComponent: 'stack'
      }
    ]
  }
];

export const EventLoopSimulator: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('classic');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(2000);

  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const currentStep = activeScenario.steps[currentStepIdx] || activeScenario.steps[0];
  const maxSteps = activeScenario.steps.length;

  // Auto player timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps, speedMs]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStepIdx < maxSteps - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full space-y-8 select-none">
      {/* Header & Scenario Selector */}
      <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-secondary">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                JavaScript Event Loop Architecture
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-mono">
                  Visual Micro/Macro Engine
                </span>
              </h3>
              <p className="text-xs text-muted">
                Step-by-step interactive simulator of the single-threaded asynchronous runtime
              </p>
            </div>
          </div>

          {/* Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(sc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedScenarioId === sc.id
                    ? 'bg-secondary/20 text-secondary border border-secondary/40 shadow-neon-secondary'
                    : 'bg-white/5 text-muted hover:text-white border border-transparent'
                }`}
              >
                {sc.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs flex items-center gap-1.5 shadow-neon-primary hover:scale-105 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Loop'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIdx >= maxSteps - 1}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-xs text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5 text-secondary" />
              <span>Step Next</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-muted hover:text-white transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step Counter & Speed */}
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-highlight" />
              <span>Step <strong className="text-white">{currentStepIdx + 1}</strong> of {maxSteps}</span>
            </div>

            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
              {[
                { label: '0.5x', val: 3000 },
                { label: '1x', val: 2000 },
                { label: '2x', val: 1000 },
              ].map((sp) => (
                <button
                  key={sp.label}
                  onClick={() => setSpeedMs(sp.val)}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    speedMs === sp.val ? 'bg-secondary/30 text-secondary font-bold' : 'text-muted hover:text-white'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code vs Live Explanation Status Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Snippet */}
        <div className="lg:col-span-5 rounded-2xl glass-panel border border-white/10 p-5 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-muted border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 text-secondary font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>script.js</span>
            </span>
            <span className="text-[10px] text-muted">Single-Threaded V8 Engine</span>
          </div>

          <pre className="text-xs text-emerald-300 bg-[#040714] p-3.5 rounded-xl border border-white/5 overflow-x-auto leading-relaxed">
            <code>{activeScenario.code}</code>
          </pre>
        </div>

        {/* Right: Current Execution Narrative */}
        <div className="lg:col-span-7 rounded-2xl glass-panel border border-secondary/30 p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-secondary">
            <Sparkles className="w-4 h-4 text-highlight animate-pulse" />
            <span className="uppercase tracking-wider font-bold">Current Cycle Action:</span>
          </div>

          <h4 className="text-base font-bold text-white">
            {currentStep.title}
          </h4>

          <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans bg-secondary/10 p-3.5 rounded-xl border border-secondary/20">
            {currentStep.explanation}
          </p>

          <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-muted">
            <Info className="w-3.5 h-3.5 text-primary" />
            <span>Priority Rule: Call Stack &gt; Microtask Queue &gt; Macrotask Queue</span>
          </div>
        </div>
      </div>

      {/* Visual Architectural Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        
        {/* 1. Call Stack Block (LIFO) */}
        <div className={`p-4 rounded-2xl glass-panel border transition-all flex flex-col justify-between min-h-[260px] ${
          currentStep.activeComponent === 'stack'
            ? 'border-primary shadow-neon-primary bg-primary/10'
            : 'border-white/10'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Cpu className="w-4 h-4" />
                <span>CALL STACK</span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase">LIFO</span>
            </div>

            <div className="space-y-1.5">
              <AnimatePresence>
                {currentStep.stack.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs font-mono text-muted/60 mt-4">
                    Stack is Empty
                  </div>
                ) : (
                  currentStep.stack.map((frame, i) => (
                    <motion.div
                      key={frame + i}
                      initial={{ scale: 0.9, y: 10, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.9, y: -10, opacity: 0 }}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-primary/30 to-purple-500/20 border border-primary/40 font-mono text-xs text-white shadow-sm flex items-center justify-between"
                    >
                      <span className="truncate">{frame}</span>
                      <span className="text-[9px] bg-primary/40 px-1.5 py-0.5 rounded text-highlight">
                        Frame #{currentStep.stack.length - i}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-[10px] font-mono text-muted text-center pt-2 border-t border-white/5">
            Synchronous Frame Pipeline
          </div>
        </div>

        {/* 2. Web APIs (Browser Background Environment) */}
        <div className={`p-4 rounded-2xl glass-panel border transition-all flex flex-col justify-between min-h-[260px] ${
          currentStep.activeComponent === 'webapi'
            ? 'border-cyan-400 shadow-neon-secondary bg-cyan-950/20'
            : 'border-white/10'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Globe className="w-4 h-4" />
                <span>WEB APIS</span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase">Async Threads</span>
            </div>

            <div className="space-y-1.5">
              <AnimatePresence>
                {currentStep.webApis.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs font-mono text-muted/60 mt-4">
                    No active timers / network ops
                  </div>
                ) : (
                  currentStep.webApis.map((api) => (
                    <motion.div
                      key={api.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 font-mono text-xs text-cyan-200 flex items-center justify-between"
                    >
                      <span className="truncate">{api.name}</span>
                      <span className="text-[9px] bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-300 animate-pulse">
                        {api.duration || 'Running'}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-[10px] font-mono text-muted text-center pt-2 border-t border-white/5">
            DOM / Timer / Network Delegates
          </div>
        </div>

        {/* 3. Microtask Queue (High Priority) */}
        <div className={`p-4 rounded-2xl glass-panel border transition-all flex flex-col justify-between min-h-[260px] ${
          currentStep.activeComponent === 'microtask'
            ? 'border-highlight shadow-neon-highlight bg-emerald-950/20'
            : 'border-white/10'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-highlight">
                <Zap className="w-4 h-4" />
                <span>MICROTASK QUEUE</span>
              </div>
              <span className="text-[9px] font-mono bg-highlight/20 text-highlight px-1.5 py-0.5 rounded uppercase font-bold">
                VIP High Priority
              </span>
            </div>

            <div className="space-y-1.5">
              <AnimatePresence>
                {currentStep.microtasks.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs font-mono text-muted/60 mt-4">
                    Microtask Queue Empty
                  </div>
                ) : (
                  currentStep.microtasks.map((task, i) => (
                    <motion.div
                      key={task + i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 10, opacity: 0 }}
                      className="p-2.5 rounded-xl bg-emerald-950/40 border border-highlight/40 font-mono text-xs text-emerald-200 shadow-sm"
                    >
                      ⚡ {task}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-[10px] font-mono text-muted text-center pt-2 border-t border-white/5">
            Promises, queueMicrotask, await
          </div>
        </div>

        {/* 4. Macrotask Queue / Callback Queue */}
        <div className={`p-4 rounded-2xl glass-panel border transition-all flex flex-col justify-between min-h-[260px] ${
          currentStep.activeComponent === 'macrotask'
            ? 'border-accent shadow-neon-accent bg-pink-950/20'
            : 'border-white/10'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-accent">
                <Clock className="w-4 h-4" />
                <span>MACROTASK QUEUE</span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase">FIFO</span>
            </div>

            <div className="space-y-1.5">
              <AnimatePresence>
                {currentStep.macrotasks.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs font-mono text-muted/60 mt-4">
                    Macrotask Queue Empty
                  </div>
                ) : (
                  currentStep.macrotasks.map((task, i) => (
                    <motion.div
                      key={task + i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 10, opacity: 0 }}
                      className="p-2.5 rounded-xl bg-pink-950/40 border border-accent/40 font-mono text-xs text-pink-200 shadow-sm"
                    >
                      🕒 {task}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-[10px] font-mono text-muted text-center pt-2 border-t border-white/5">
            setTimeout, setInterval, I/O
          </div>
        </div>

      </div>

      {/* Event Loop Arbiter Visual Wheel & Output Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Animated Orbital Loop Node */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-white/10 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Spinning orbital ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: isPlaying ? 2 : 8, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/40 shadow-neon-secondary"
            />
            {/* Inner pulse */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-neon-primary">
              <RefreshCw className={`w-8 h-8 ${isPlaying ? 'animate-spin' : ''}`} />
            </div>
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
              Event Loop Arbiter
            </span>
            <span className="text-[11px] text-muted font-mono">
              Continuous non-blocking tick coordinator
            </span>
          </div>
        </div>

        {/* Live Terminal Output Console */}
        <div className="lg:col-span-8 rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col h-[220px]">
          <div className="h-9 bg-black/60 px-4 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-mono text-secondary flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>DevTools Console Stream</span>
            </span>
            <span className="text-[10px] font-mono text-muted">STDOUT</span>
          </div>

          <div className="flex-1 bg-[#02040b] p-4 font-mono text-xs overflow-y-auto space-y-1.5 text-gray-300">
            {currentStep.consoleOutput.length === 0 ? (
              <span className="text-muted/40 italic">-- Console stream awaiting execution --</span>
            ) : (
              currentStep.consoleOutput.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-highlight font-semibold"
                >
                  <span className="text-muted/50 select-none">&gt;</span>
                  <span>{line}</span>
                  <span className="text-[9px] font-normal text-muted/60 ml-auto font-mono">
                    [T+{(idx + 1) * 2}ms]
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
