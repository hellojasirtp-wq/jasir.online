import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TermIcon, ChevronRight
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
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
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

  return (
    <section id="playground" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center">
      
      {/* Decorative Blur */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>05. LIVE PLAYGROUND</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Try It Yourself
          </h2>
        </div>

        {/* Full Width Terminal Simulator */}
        <div className="space-y-6">
          
          {/* Terminal */}
          <div className="w-full flex flex-col h-[420px] rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            
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
            <div 
              ref={terminalContainerRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-2 bg-[#090b14]/90"
            >
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

          {/* Quick Actions Panel - Placed Neatly Below the Terminal */}
          <div className="glass-panel rounded-xl p-4 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl select-none">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-secondary uppercase tracking-wider block">Dev Sandbox Quick Commands</span>
              <p className="text-[11px] text-muted">Click any command to execute it instantly in the terminal simulator.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['sysinfo', 'npm run dev', 'confetti', 'matrix'].map((action) => (
                <button
                  key={action}
                  onClick={() => handleCommand(action)}
                  className="px-3 py-1.5 rounded bg-white/5 border border-white/5 hover:border-white/15 text-[10px] font-mono text-muted hover:text-white transition-all cursor-pointer active:scale-95"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
