import React, { useState } from 'react';
import { 
  Palette, Sparkles, Copy, Check, Terminal, 
  Code2, Sliders, Smartphone, Monitor, Tablet,
  CheckCircle2, AlertCircle, Award, BookOpen, Layers
} from 'lucide-react';

type ComponentCategory = 'buttons' | 'badges' | 'cards' | 'inputs' | 'alerts' | 'tokens';

interface PropControl {
  variant: 'primary' | 'secondary' | 'accent' | 'glass';
  size: 'sm' | 'md' | 'lg';
  isGlowing: boolean;
  disabled: boolean;
  label: string;
}

export const StorybookExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('buttons');
  const [viewMode, setViewMode] = useState<'canvas' | 'docs'>('canvas');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  // Live Component Props Controls (Storybook Controls)
  const [controls, setControls] = useState<PropControl>({
    variant: 'primary',
    size: 'md',
    isGlowing: true,
    disabled: false,
    label: 'Interactive Action'
  });

  const categories: { id: ComponentCategory; name: string; icon: React.ComponentType<{ className?: string }>; count: number }[] = [
    { id: 'buttons', name: 'Buttons & CTA', icon: Sparkles, count: 5 },
    { id: 'badges', name: 'Badges & Tags', icon: Award, count: 4 },
    { id: 'cards', name: 'Glass Panels', icon: Layers, count: 3 },
    { id: 'inputs', name: 'Form Inputs', icon: Sliders, count: 3 },
    { id: 'alerts', name: 'Status Alerts', icon: AlertCircle, count: 2 },
    { id: 'tokens', name: 'Design Tokens & CSS Vars', icon: Palette, count: 12 },
  ];

  const cssTokens = [
    { varName: '--bg-main', value: '#050816', desc: 'Main dark cosmic background canvas' },
    { varName: '--primary', value: '#6C63FF', desc: 'Primary brand neon purple accent' },
    { varName: '--secondary', value: '#00D4FF', desc: 'Action neon cyan/teal highlight' },
    { varName: '--accent', value: '#FF4D8D', desc: 'Alert and interactive pink trigger' },
    { varName: '--highlight', value: '#00FFB3', desc: 'Success and metrics mint green' },
    { varName: '--glass-bg', value: 'rgba(255, 255, 255, 0.03)', desc: 'Backdrop frosted glass fill' },
    { varName: '--glass-border', value: 'rgba(255, 255, 255, 0.10)', desc: 'Subtle translucent card outline' },
    { varName: '--glass-blur', value: 'blur(16px)', desc: 'Hardware-accelerated depth blur' },
    { varName: '--font-sans', value: "'Inter', sans-serif", desc: 'Primary clean UI typography' },
    { varName: '--font-display', value: "'Outfit', sans-serif", desc: 'Cinematic display headers & bold titles' },
    { varName: '--font-mono', value: "'Fira Code', monospace", desc: 'Syntax highlight, code tokens & terminal' },
    { varName: '--shadow-neon-primary', value: '0 0 25px rgba(108, 99, 255, 0.35)', desc: 'Primary volumetric glow shadow' },
  ];

  const copySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getButtonClasses = () => {
    const sizeClasses = {
      sm: 'px-4 py-1.5 text-xs',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    }[controls.size];

    const variantClasses = {
      primary: 'bg-gradient-to-r from-primary to-secondary text-white',
      secondary: 'bg-secondary/20 text-secondary border border-secondary/40 hover:bg-secondary/30',
      accent: 'bg-accent/20 text-accent border border-accent/40 hover:bg-accent/30',
      glass: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
    }[controls.variant];

    const glowClass = controls.isGlowing
      ? controls.variant === 'primary' ? 'shadow-neon-primary hover:shadow-neon-secondary'
      : controls.variant === 'accent' ? 'shadow-neon-accent' : 'shadow-glass'
      : '';

    const stateClasses = controls.disabled
      ? 'opacity-40 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer hover:scale-105 active:scale-95 transition-all';

    return `rounded-full font-semibold uppercase tracking-wider ${sizeClasses} ${variantClasses} ${glowClass} ${stateClasses}`;
  };

  const generatedJsx = `<button
  className="${getButtonClasses()}"
  disabled={${controls.disabled}}
>
  ${controls.label}
</button>`;

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <BookOpen className="w-4 h-4 text-highlight" />
            <span>Storybook 8.0 & UI Design System Workspace</span>
          </div>
          <h3 className="text-2xl font-bold heading-premium text-white mt-1">
            Component Explorer & Design Tokens
          </h3>
          <p className="text-xs text-muted max-w-2xl mt-1">
            Interactive component testing sandbox for Jasir&apos;s UI system. Test live prop controls, inspect CSS custom variables, and copy production Tailwind snippets.
          </p>
        </div>

        {/* Toolbar Switchers */}
        <div className="flex items-center gap-2 bg-bgMain/60 p-1.5 rounded-xl border border-white/10 flex-shrink-0">
          <button
            onClick={() => setViewMode('canvas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === 'canvas' ? 'bg-primary text-white shadow-neon-primary' : 'text-muted hover:text-white'
            }`}
          >
            Canvas
          </button>
          <button
            onClick={() => setViewMode('docs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === 'docs' ? 'bg-primary text-white shadow-neon-primary' : 'text-muted hover:text-white'
            }`}
          >
            Docs / Tokens
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Component Navigation Sidebar (Storybook Nav) */}
        <div className="lg:col-span-3 glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
          <div className="text-[10px] font-mono text-muted uppercase tracking-widest px-3 py-1">
            Storybook Stories
          </div>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/30 to-secondary/20 text-white border border-primary/40 shadow-neon-primary'
                    : 'text-muted hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-highlight' : 'text-secondary'}`} />
                  <span className="font-semibold">{cat.name}</span>
                </div>
                <span className="text-[10px] opacity-60 bg-white/5 px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center / Right Story Canvas */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Canvas Viewport Toolbar */}
          <div className="flex items-center justify-between bg-bgMain/80 px-4 py-2.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <span className="text-secondary font-bold uppercase">{activeCategory}</span>
              <span>/</span>
              <span className="text-white">Live Story Sandbox</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop View (100%)"
                className={`p-1.5 rounded-lg transition-colors ${viewport === 'desktop' ? 'bg-white/10 text-highlight' : 'text-muted hover:text-white'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet View (768px)"
                className={`p-1.5 rounded-lg transition-colors ${viewport === 'tablet' ? 'bg-white/10 text-highlight' : 'text-muted hover:text-white'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile View (375px)"
                className={`p-1.5 rounded-lg transition-colors ${viewport === 'mobile' ? 'bg-white/10 text-highlight' : 'text-muted hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Component Stage */}
          <div className={`mx-auto transition-all duration-300 ${
            viewport === 'mobile' ? 'max-w-[380px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'w-full'
          }`}>
            <div className="relative min-h-[260px] glass-panel rounded-2xl border border-white/15 p-8 flex flex-col items-center justify-center overflow-hidden bg-bgMain/90">
              {/* Radial gradient background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
              <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

              {/* Render Selected Story Component */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6">
                
                {/* 1. BUTTONS STORY */}
                {activeCategory === 'buttons' && (
                  <div className="space-y-6 text-center">
                    <button className={getButtonClasses()}>
                      {controls.label}
                    </button>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/5">
                      <button className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold shadow-neon-primary">
                        Default Primary
                      </button>
                      <button className="px-4 py-2 rounded-full border border-secondary text-secondary text-xs font-semibold shadow-neon-secondary">
                        Neon Cyan
                      </button>
                      <button className="px-4 py-2 rounded-full border border-accent text-accent text-xs font-semibold shadow-neon-accent">
                        Neon Pink
                      </button>
                      <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10">
                        Glassmorphism
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. BADGES STORY */}
                {activeCategory === 'badges' && (
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-primary/20 border border-primary/40 text-secondary shadow-neon-primary flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-highlight" />
                      React 19 Core
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-highlight/10 border border-highlight/30 text-highlight flex items-center gap-1.5 animate-pulse">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      99% Lighthouse Perf
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-accent/15 border border-accent/30 text-accent flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      Senior Tech Lead
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/10 text-white">
                      TypeScript v5.8
                    </span>
                  </div>
                )}

                {/* 3. GLASS CARDS STORY */}
                {activeCategory === 'cards' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
                    <div className="glass-panel p-5 rounded-xl border border-white/10 shadow-glass space-y-2 hover:border-secondary/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-secondary font-bold">Metric Card</span>
                        <Sparkles className="w-4 h-4 text-highlight" />
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">0.6s FCP</div>
                      <p className="text-[11px] text-muted">Sub-second paint performance on mobile 4G.</p>
                    </div>

                    <div className="glass-panel p-5 rounded-xl border border-primary/30 shadow-neon-primary space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-primary font-bold">Neon Card</span>
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">6+ Years</div>
                      <p className="text-[11px] text-muted">Full-stack React & Next.js production systems.</p>
                    </div>
                  </div>
                )}

                {/* 4. FORM INPUTS STORY */}
                {activeCategory === 'inputs' && (
                  <div className="w-full max-w-md space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-muted uppercase">Terminal Input Field</label>
                      <input 
                        type="text" 
                        defaultValue="git commit -m 'feat: optimize react components'"
                        className="w-full px-4 py-2.5 rounded-lg bg-bgMain border border-white/10 text-white font-mono text-xs placeholder-white/20 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-muted uppercase">Select Dropdown</label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-bgMain border border-white/10 text-white font-mono text-xs outline-none focus:border-primary transition-all">
                        <option>React 19 Concurrency Model</option>
                        <option>JavaScript Microtask Queue</option>
                        <option>Three.js WebGL Galaxy Canvas</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 5. STATUS ALERTS STORY */}
                {activeCategory === 'alerts' && (
                  <div className="w-full max-w-lg space-y-3">
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-highlight/10 border border-highlight/30 text-highlight text-xs font-mono">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Optimistic UI state committed cleanly with useOptimistic().</span>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Main thread blocking task exceeded 50ms (TBT warning).</span>
                    </div>
                  </div>
                )}

                {/* 6. TOKENS & CSS VARIABLES */}
                {activeCategory === 'tokens' && (
                  <div className="w-full space-y-3 font-mono text-xs max-h-[300px] overflow-y-auto pr-2">
                    {cssTokens.map(tok => (
                      <div key={tok.varName} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-4 h-4 rounded-md border border-white/20" style={{ backgroundColor: tok.value.includes('#') ? tok.value : '#6c63ff' }} />
                          <span className="text-secondary font-bold">{tok.varName}</span>
                        </div>
                        <span className="text-highlight">{tok.value}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Interactive Storybook Controls & Code Inspector */}
          {activeCategory === 'buttons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Props Controls Table */}
              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                  <Sliders className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-mono font-bold uppercase text-white">Storybook Controls</h4>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted">label</span>
                    <input 
                      type="text" 
                      value={controls.label}
                      onChange={(e) => setControls({ ...controls, label: e.target.value })}
                      className="px-2.5 py-1 rounded bg-bgMain border border-white/10 text-white text-xs w-36 outline-none focus:border-secondary"
                    />
                  </div>

                  {/* Variant */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted">variant</span>
                    <select
                      value={controls.variant}
                      onChange={(e) => setControls({ ...controls, variant: e.target.value as any })}
                      className="px-2.5 py-1 rounded bg-bgMain border border-white/10 text-white text-xs outline-none focus:border-secondary"
                    >
                      <option value="primary">primary</option>
                      <option value="secondary">secondary</option>
                      <option value="accent">accent</option>
                      <option value="glass">glass</option>
                    </select>
                  </div>

                  {/* Size */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted">size</span>
                    <select
                      value={controls.size}
                      onChange={(e) => setControls({ ...controls, size: e.target.value as any })}
                      className="px-2.5 py-1 rounded bg-bgMain border border-white/10 text-white text-xs outline-none focus:border-secondary"
                    >
                      <option value="sm">sm</option>
                      <option value="md">md</option>
                      <option value="lg">lg</option>
                    </select>
                  </div>

                  {/* Glow toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted">isGlowing</span>
                    <button
                      onClick={() => setControls({ ...controls, isGlowing: !controls.isGlowing })}
                      className={`px-3 py-1 rounded text-[10px] font-bold ${controls.isGlowing ? 'bg-highlight text-bgMain' : 'bg-white/10 text-muted'}`}
                    >
                      {controls.isGlowing ? 'TRUE' : 'FALSE'}
                    </button>
                  </div>

                  {/* Disabled toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted">disabled</span>
                    <button
                      onClick={() => setControls({ ...controls, disabled: !controls.disabled })}
                      className={`px-3 py-1 rounded text-[10px] font-bold ${controls.disabled ? 'bg-accent text-white' : 'bg-white/10 text-muted'}`}
                    >
                      {controls.disabled ? 'TRUE' : 'FALSE'}
                    </button>
                  </div>
                </div>
              </div>

              {/* JSX / Tailwind Code Snippet Inspector */}
              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-highlight" />
                      <h4 className="text-xs font-mono font-bold uppercase text-white">Generated React JSX</h4>
                    </div>
                    <button
                      onClick={() => copySnippet(generatedJsx)}
                      className="flex items-center gap-1 text-[10px] font-mono text-secondary hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-highlight" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'COPIED!' : 'COPY'}</span>
                    </button>
                  </div>

                  <pre className="mt-3 p-3.5 rounded-xl bg-bgMain text-[11px] font-mono text-muted overflow-x-auto leading-relaxed border border-white/5">
                    <code>{generatedJsx}</code>
                  </pre>
                </div>

                <div className="text-[10px] font-mono text-muted bg-white/5 p-2.5 rounded-lg flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  <span>Classes adapt in real-time as Storybook controls toggle.</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
