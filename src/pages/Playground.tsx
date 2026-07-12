import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TermIcon, ChevronRight, GitCommit 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const Playground: React.FC = () => {
  const { addAchievement, matrixActive, setMatrixActive } = usePortfolio();
  
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to Jasir\'s Interactive Playground.' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...terminalLines, { type: 'input' as const, text: `> ${cmd}` }];

    if (trimmed === 'help') {
      newLines.push(
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  sysinfo      - Display portfolio technology metrics' },
        { type: 'output', text: '  npm run dev  - Simulate starting the Vite local server' },
        { type: 'output', text: '  git log      - Display recent git commits history' },
        { type: 'output', text: '  confetti     - Launch a celebratory confetti explosion' },
        { type: 'output', text: '  matrix       - Toggle the Matrix Digital Rain overlay' },
        { type: 'output', text: '  clear        - Clear the console terminal lines' }
      );
    } else if (trimmed === 'sysinfo') {
      newLines.push(
        { type: 'success', text: 'ENVIRONMENT METRICS:' },
        { type: 'output', text: '  OS: macOS (Vite Dev Server)' },
        { type: 'output', text: '  Frontend: React 19, TypeScript, TailwindCSS v3' },
        { type: 'output', text: '  Animation: Framer Motion, GSAP, Lenis, Three.js' },
        { type: 'output', text: '  Code Quality: 95+ Lighthouse Audit' }
      );
      addAchievement('Inspector Gadget');
    } else if (trimmed === 'npm run dev') {
      newLines.push(
        { type: 'output', text: 'npx vite --host' },
        { type: 'success', text: '  VITE v8.1.1  ready in 282 ms' },
        { type: 'output', text: '  ➜  Local:   http://localhost:5173/' },
        { type: 'output', text: '  ➜  Network: use --host to expose' },
        { type: 'success', text: '  ✔ client compiled successfully' }
      );
      addAchievement('Local Deployer');
    } else if (trimmed === 'git log') {
      newLines.push(
        { type: 'output', text: 'commit fe638d29c8e100fec (HEAD -> main, origin/main)' },
        { type: 'output', text: 'Author: Jasir T P <hellojasirtp@gmail.com>' },
        { type: 'output', text: 'Date:   Sun Jul 12 12:00:00 2026' },
        { type: 'success', text: '    feat: launch award-winning interactive portfolio UI' },
        { type: 'output', text: 'commit b87c2e391a2873cf1' },
        { type: 'output', text: '    style: build galaxy planetary system for skills HUD' }
      );
    } else if (trimmed === 'confetti') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      newLines.push({ type: 'success', text: 'Confetti launched! 🎉' });
      addAchievement('Party Planner');
    } else if (trimmed === 'matrix') {
      setMatrixActive(!matrixActive);
      newLines.push({ 
        type: 'success', 
        text: `Matrix digital rain overlay ${!matrixActive ? 'ENABLED' : 'DISABLED'}.` 
      });
      addAchievement('The One');
    } else if (trimmed === 'clear') {
      setTerminalLines([]);
      setInputValue('');
      return;
    } else if (trimmed === '') {
      // Do nothing
    } else {
      newLines.push({ type: 'error', text: `command not recognized: "${cmd}". Type "help" for options.` });
    }

    setTerminalLines(newLines);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  const fakeCommits = [
    { sha: 'fe638d2', msg: 'feat: launch award-winning interactive portfolio UI', date: 'Just now' },
    { sha: 'b87c2e3', msg: 'style: build galaxy planetary system for skills HUD', 'date': '2h ago' },
    { sha: '7f9c2d1', msg: 'refactor: optimize Three.js canvas WebGL context allocations', 'date': '1d ago' },
    { sha: '8c9b2a1', msg: 'docs: finalize CityOfJohannesburg case study documentation', 'date': '2d ago' },
  ];

  return (
    <section id="playground" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center">
      
      {/* Decorative Blur */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>05. DEV PLAYGROUND</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Interactive Code Sandbox
          </h2>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left panel: Terminal */}
          <div className="lg:col-span-2 flex flex-col h-[420px] rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            
            {/* Terminal Header */}
            <div className="h-9 bg-bgMain flex items-center justify-between px-4 border-b border-white/10 select-none">
              <div className="flex items-center gap-2 text-xs font-mono text-muted">
                <TermIcon className="w-4 h-4 text-highlight" />
                <span>sh - terminal</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-2 bg-[#090b14]/90">
              {terminalLines.map((line, idx) => (
                <div 
                  key={idx} 
                  className={
                    line.type === 'error' 
                      ? 'text-accent' 
                      : line.type === 'success' 
                        ? 'text-highlight text-glow-highlight' 
                        : line.type === 'input' 
                          ? 'text-secondary' 
                          : 'text-muted'
                  }
                >
                  {line.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input */}
            <div className="h-10 bg-bgMain border-t border-white/10 flex items-center px-3 font-mono text-xs md:text-sm text-secondary">
              <span className="mr-2 select-none">$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help' to start..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 font-mono"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>

          </div>

          {/* Right panel: Git Graph Logs */}
          <div className="lg:col-span-1 glass-panel rounded-xl p-6 border border-white/10 flex flex-col justify-between h-[420px] shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <GitCommit className="w-5 h-5 text-secondary" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">Repository Git Log</h3>
              </div>
              
              {/* Commit List */}
              <div className="space-y-4 font-mono text-xs select-none">
                {fakeCommits.map((commit, idx) => (
                  <div key={commit.sha} className="flex gap-3 items-start relative">
                    {/* Vertical line connector */}
                    {idx < fakeCommits.length - 1 && (
                      <div className="absolute left-[7px] top-[14px] bottom-[-22px] w-[1px] bg-white/10" />
                    )}

                    {/* Commit node indicator */}
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-bgMain mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-highlight font-semibold">
                          {commit.sha}
                        </span>
                        <span className="text-[10px] text-muted">{commit.date}</span>
                      </div>
                      <p className="text-white/80 line-clamp-1 hover:text-white transition-colors">{commit.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="space-y-2 pt-4 border-t border-white/5 select-none">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Dev Sandbox Quick Commands</span>
              <div className="flex flex-wrap gap-2">
                {['sysinfo', 'npm run dev', 'confetti', 'matrix'].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleCommand(action)}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/5 hover:border-white/15 text-[10px] font-mono text-muted hover:text-white transition-all cursor-pointer active:scale-95"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
