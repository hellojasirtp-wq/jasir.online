import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TermIcon, ChevronRight, Mail, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

type ContactState = 'welcome' | 'details' | 'askName' | 'askEmail' | 'askMessage' | 'sending' | 'completed';

interface TermLine {
  type: 'input' | 'output' | 'success' | 'error';
  text: string;
}

export const Contact: React.FC = () => {
  const { addAchievement } = usePortfolio();
  
  const [terminalState, setTerminalState] = useState<ContactState>('welcome');
  const [lines, setLines] = useState<TermLine[]>([
    { type: 'output', text: 'Initializing secure connection to hellojasirtp@gmail.com...' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-typing sequence on load
  useEffect(() => {
    let timer1 = setTimeout(() => {
      setLines(prev => [...prev, { type: 'output', text: 'To retrieve contact networks and initiate direct messaging pipelines:' }]);
    }, 800);

    let timer2 = setTimeout(() => {
      // Simulate auto-typing "contact jasir"
      let text = 'contact jasir';
      let current = '';
      let index = 0;
      
      const interval = setInterval(() => {
        if (index < text.length) {
          current += text[index];
          setInputVal(current);
          index++;
        } else {
          clearInterval(interval);
          // Auto submit the typed command
          setTimeout(() => {
            handleCommand(text);
          }, 400);
        }
      }, 70);

      return () => clearInterval(interval);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    // Add command echo line
    const echoedLines = [...lines, { type: 'input' as const, text: `> ${cmd}` }];
    setLines(echoedLines);
    setInputVal('');

    const isInsideInputFlow = ['askName', 'askEmail', 'askMessage'].includes(terminalState);
    if (!isInsideInputFlow) {
      if (trimmed === '1' || trimmed === 'email') {
        setLines([
          ...echoedLines,
          { type: 'success', text: 'Launching default email client to hellojasirtp@gmail.com...' }
        ]);
        window.location.href = 'mailto:hellojasirtp@gmail.com';
        return;
      }
      if (trimmed === '2' || trimmed === 'linkedin') {
        setLines([
          ...echoedLines,
          { type: 'success', text: 'Opening LinkedIn connect profile in a new tab...' }
        ]);
        window.open('https://linkedin.com', '_blank');
        return;
      }
      if (trimmed === '3' || trimmed === 'github') {
        setLines([
          ...echoedLines,
          { type: 'success', text: 'Opening GitHub profile in a new tab...' }
        ]);
        window.open('https://github.com', '_blank');
        return;
      }
    }

    if (terminalState === 'welcome') {
      if (trimmed === 'contact jasir') {
        setTerminalState('details');
        setLines([
          ...echoedLines,
          { type: 'success', text: 'Connecting... Details fetched successfully!' },
          { type: 'output', text: 'NAME: Jasir T P' },
          { type: 'output', text: 'ROLE: Senior Software Engineer' },
          { type: 'output', text: 'EMAIL: hellojasirtp@gmail.com' },
          { type: 'output', text: 'LOCATION: Calicut, Kerala, India' },
          { type: 'output', text: ' ' },
          { type: 'output', text: 'DIRECT LINKS:' },
          { type: 'success', text: '  [1] Email    - mailto:hellojasirtp@gmail.com' },
          { type: 'success', text: '  [2] LinkedIn - linkedin.com/in/jasirtp (placeholder)' },
          { type: 'success', text: '  [3] GitHub   - github.com/jasirtp (placeholder)' },
          { type: 'output', text: ' ' },
          { type: 'output', text: 'Type "message" to compile and send a direct email/message,' },
          { type: 'output', text: 'or enter "1", "2", or "3" directly in this console.' }
        ]);
        addAchievement('Networking Expert');
      } else {
        setLines([
          ...echoedLines,
          { type: 'error', text: `Command unrecognized: "${cmd}". Type "contact jasir" to fetch information.` }
        ]);
      }
    } else if (terminalState === 'details') {
      if (trimmed === 'message') {
        setTerminalState('askName');
        setLines([
          ...echoedLines,
          { type: 'output', text: 'Enter your name:' }
        ]);
      } else if (trimmed === 'help') {
        setLines([
          ...echoedLines,
          { type: 'output', text: 'Type "message" to start direct form workflow, or enter "1", "2", "3" to trigger shortcuts.' }
        ]);
      } else {
        setLines([
          ...echoedLines,
          { type: 'error', text: `Unrecognized command. Type "message" to write a comment, or "1", "2", "3" for shortcuts.` }
        ]);
      }
    } else if (terminalState === 'askName') {
      if (cmd.trim() === '') {
        setLines([...echoedLines, { type: 'error', text: 'Name cannot be empty. Please enter your name:' }]);
      } else {
        setName(cmd);
        setTerminalState('askEmail');
        setLines([
          ...echoedLines,
          { type: 'output', text: `Hi ${cmd}. Please enter your email address:` }
        ]);
      }
    } else if (terminalState === 'askEmail') {
      if (!cmd.includes('@') || !cmd.includes('.')) {
        setLines([...echoedLines, { type: 'error', text: 'Please enter a valid email address:' }]);
      } else {
        setEmail(cmd);
        setTerminalState('askMessage');
        setLines([
          ...echoedLines,
          { type: 'output', text: 'Write your message details below:' }
        ]);
      }
    } else if (terminalState === 'askMessage') {
      if (cmd.trim() === '') {
        setLines([...echoedLines, { type: 'error', text: 'Message cannot be empty. What would you like to say?' }]);
      } else {
        setMsg(cmd);
        setTerminalState('sending');
        setLines([
          ...echoedLines,
          { type: 'output', text: 'Packaging message payload...' },
          { type: 'output', text: 'Sending data packets directly to Jasir\'s terminal inbox...' }
        ]);

        // Simulate network delivery
        setTimeout(() => {
          setTerminalState('completed');
          setLines(prev => [
            ...prev,
            { type: 'success', text: '✔ MESSAGE SHIPPED SUCCESSFULLY!' },
            { type: 'output', text: `Payload Summary: From=${name}, Email=${email}, Size=${msg.length}B` },
            { type: 'output', text: 'Thank you for reaching out. Jasir will follow up shortly.' },
            { type: 'output', text: 'Type "reset" to start over.' }
          ]);
          confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.6 }
          });
          addAchievement('Message Dispatched');
        }, 1500);
      }
    } else if (terminalState === 'completed') {
      if (trimmed === 'reset') {
        setName('');
        setEmail('');
        setMsg('');
        setTerminalState('welcome');
        setLines([
          { type: 'output', text: 'Initializing secure connection to hellojasirtp@gmail.com...' },
          { type: 'output', text: 'To retrieve contact networks and initiate direct messaging pipelines:' }
        ]);
      } else {
        setLines([...echoedLines, { type: 'output', text: 'Type "reset" to send another message.' }]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center">
      
      {/* Aurora glow light */}
      <div className="absolute bottom-20 left-1/3 w-[350px] h-[350px] bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>07. GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Let's Talk
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Terminal Console */}
          <div className="lg:col-span-2 flex flex-col h-[400px] rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            
            {/* Header */}
            <div className="h-9 bg-bgMain flex items-center justify-between px-4 border-b border-white/10 select-none">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
                <TermIcon className="w-3.5 h-3.5 text-secondary" />
                <span>jasir@terminal: ~contact</span>
              </span>
              <div className="w-3.5 h-3.5 rounded-full bg-accent/20 border border-accent/40" />
            </div>

            {/* Logger list */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-2 bg-[#05060b]/90">
              {lines.map((line, idx) => (
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

            {/* Input field */}
            <div 
              onClick={() => inputRef.current?.focus()}
              className="h-10 bg-bgMain border-t border-white/10 flex items-center px-3 font-mono text-xs md:text-sm text-secondary cursor-text"
            >
              <span className="mr-2 select-none">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  terminalState === 'askName' 
                    ? 'Enter name...' 
                    : terminalState === 'askEmail' 
                      ? 'Enter email...' 
                      : terminalState === 'askMessage' 
                        ? 'Enter message details...' 
                        : 'Type command...'
                }
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 font-mono"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>

          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1 space-y-4 select-none">
            
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Network Hub Shortcuts</span>

            {/* Email link */}
            <a 
              href="mailto:hellojasirtp@gmail.com"
              className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/5 hover:border-white/15 text-white/80 hover:text-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                <div className="font-mono text-xs">
                  <div className="font-semibold text-white">Email Address</div>
                  <div>hellojasirtp@gmail.com</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
            </a>             {/* LinkedIn link */}
            <a 
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/5 hover:border-white/15 text-white/80 hover:text-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <LinkedInIcon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <div className="font-mono text-xs">
                  <div className="font-semibold text-white">LinkedIn Connect</div>
                  <div>linkedin/in/jasirtp</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
            </a>

            {/* GitHub link */}
            <a 
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/5 hover:border-white/15 text-white/80 hover:text-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <GitHubIcon className="w-5 h-5 text-highlight group-hover:scale-110 transition-transform" />
                <div className="font-mono text-xs">
                  <div className="font-semibold text-white">Github Profile</div>
                  <div>github.com/jasirtp</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Resume download */}
            <div 
              onClick={() => {
                alert('Resume download triggered (Mock)');
                addAchievement('Resume Downloaded');
              }}
              className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/5 hover:border-white/15 text-white/80 hover:text-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <div className="font-mono text-xs">
                  <div className="font-semibold text-white">Curriculum Vitae</div>
                  <div>Download Resume PDF</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
