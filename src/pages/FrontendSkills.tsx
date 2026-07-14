import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ChevronRight, Code, Calendar, CheckSquare, Zap, X, Folder, Lock, Palette, Settings, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface Skill {
  name: string;
  years: string;
  projects: string[];
  snippet?: string;
  techniques?: string[];
  bestPractice: string;
  performanceNote: string;
  optimizationMethod?: string;
  securityMethod?: string;
  performanceMethod?: string;
  orbitRadius: number;
  angle: number;
  color: string;
}

export const FrontendSkills: React.FC = () => {
  const { addAchievement } = usePortfolio();
  const [showReactDeepDive, setShowReactDeepDive] = useState(false);
  const [activeTab, setActiveTab] = useState<'nextjs' | 'fiber' | 'state' | 'auth' | 'context' | 'perf'>('nextjs');

  const skills: Record<string, Skill> = {
    React: {
      name: 'React 19 & Core',
      years: '6+ Years',
      projects: ['csd-admin-web-app', 'Pikitup Admin Panel', 'Click4Marry Admin', 'Click4Marry User', 'TTL Solver Wrapper', 'EmployedIn Portal', 'TaskFlow CRM', 'OLO Portal', 'Design System SaaS', 'Triveni Turbine'],
      bestPractice: 'Declare state dynamically using initialization callbacks const [val, setVal] = useState(() => fetchLocalVal()) to prevent execution on re-renders.',
      performanceNote: 'Utilize custom hooks combined with useMemo to enforce rigid component boundaries and minimize paint cycles.',
      optimizationMethod: 'Implement dynamic code-splitting via React.lazy() to load non-critical path bundle chunks asynchronously.',
      securityMethod: 'Apply strict HTML sanitization processes (using DOMPurify) on dynamic template renders to prevent XSS exploits.',
      performanceMethod: 'Leverage component memoization (React.memo) and state selector stores to prevent global parent redraw cycles.',
      snippet: `// React 19 State Hook Pattern
export const useLocalState = <T,>(key: string, fallback: T) => {
  const [state, setState] = useState<T>(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  });
  return [state, setState] as const;
};`,
      orbitRadius: 110,
      angle: 0,
      color: '#6C63FF'
    },
    'Next.js': {
      name: 'Next.js (App Router)',
      years: '4+ Years',
      projects: ['Design System SaaS', 'Triveni Turbine'],
      bestPractice: 'Leverage Server Components (RSC) to handle database queries directly on the server, shipping 0KB of bundle JS for static tags.',
      performanceNote: 'Use dynamic(() => import(...)) to code-split heavier client-rendered components like maps or charts.',
      optimizationMethod: 'Deploy dynamic revalidation caches (ISR / revalidateTag) to refresh page layouts dynamically on the Edge.',
      securityMethod: 'Configure edge middleware authentication checks and server action schema guards (Yup/Zod) to prevent database injections.',
      performanceMethod: 'Lazy load heavy client interactivity components using dynamic dynamic() imports with Suspense placeholders.',
      techniques: [
        'App Router filesystem layout mapping and nested layouts routing.',
        'Server Actions for secure direct-from-client database operations.',
        'Dynamic component code-splitting via dynamic imports and Suspense.',
        'Granular caching using Incremental Static Regeneration (ISR).'
      ],
      orbitRadius: 160,
      angle: 60,
      color: '#00D4FF'
    },
    TypeScript: {
      name: 'TypeScript',
      years: '5+ Years',
      projects: ['csd-admin-web-app', 'Pikitup Admin Panel', 'Click4Marry Admin', 'Click4Marry User', 'TTL Solver Wrapper', 'EmployedIn Portal', 'TaskFlow CRM', 'Triveni Turbine', 'PropertyOK', 'HappileLogistics'],
      bestPractice: 'Avoid utilizing the "any" type. Leverage strict generics, index signatures, and mapped type utilities to enforce type-safety.',
      performanceNote: 'Declare strict interface contracts at API boundaries to catch shape mismatches at build-time rather than runtime.',
      optimizationMethod: 'Isolate compiler type checking using fork-ts-checker plugins to accelerate development hot reload loops.',
      securityMethod: 'Enable strict compilation flags (strictNullChecks: true) to prevent uncaught runtime type coercion errors.',
      performanceMethod: 'Avoid dynamic type coercions (any) to allow modern JS engines to build optimized JIT compilation paths.',
      techniques: [
        'Granular generics and type utilities (Omit, Pick, Record).',
        'Mapped types and conditional interface mappings.',
        'Type narrowing parameters and guard assertions.',
        'Strict compile-time validations for HTTP request envelopes.'
      ],
      orbitRadius: 135,
      angle: 130,
      color: '#FF4D8D'
    },
    Vue: {
      name: 'Vue.js',
      years: '2 Years',
      projects: ['Matrimonial Modules', 'Admin Dashboards'],
      bestPractice: 'Utilize Vue 3 Composition API structure with script setup blocks to keep state declarations cohesive and cleanly structured.',
      performanceNote: 'Explicitly mark large static configurations with shallowRef to prevent Vue from tracking recursive reactive setters.',
      techniques: [
        'Vue 3 Composition script setups and reactive ref properties.',
        'ShallowRef constraints for massive read-only charts configs.',
        'Custom directives for specific DOM event path bindings.',
        'Pinia modular enterprise stores state mapping configurations.'
      ],
      orbitRadius: 195,
      angle: 210,
      color: '#00FFB3',
      optimizationMethod: 'Utilize Webpack/Vite vendor splitting configuration to separate Vue runtime dependencies from route chunks.',
      securityMethod: 'Avoid using v-html directly on user-generated inputs to block runtime script injection paths.',
      performanceMethod: 'Declare shallowRef properties on static chart configurations to skip Vue reactivity tracking overhead.',
    },
    'React Native': {
      name: 'React Native / Expo',
      years: '3 Years',
      projects: ['Logistics Tracking Mobile', 'Citizen Coordinate Reporter'],
      bestPractice: 'Wrap heavy mobile views in React.memo and leverage useAnimatedStyle inside reanimated threads to keep touch paths at 60 FPS.',
      performanceNote: 'Configure image sizes explicitly and run task threading inside native modules to bypass bridge limitations.',
      optimizationMethod: 'Deploy Hermes JS engine compilation inside native bundles to reduce app startup latency.',
      securityMethod: 'Store API tokens inside iOS Keychain and Android Keystore secure spaces (using expo-secure-store).',
      performanceMethod: 'Run animations via the UI thread wrapper (useAnimatedStyle) to prevent bridge execution stutter.',
      techniques: [
        'Reanimated 3 style hooks for main UI thread spring paths.',
        'Dynamic device safe-area notch layout adapters.',
        'Local SQLite tables caching database setups.',
        'Custom native configurations plugins inside Expo templates.'
      ],
      orbitRadius: 215,
      angle: 280,
      color: '#A855F7'
    }
  };

  const [activeSkillName, setActiveSkillName] = useState<string>('React');
  const activeSkill = skills[activeSkillName];

  const handlePlanetClick = (key: string) => {
    setActiveSkillName(key);
    addAchievement('Frontend Specialist');
  };

  return (
    <section id="frontend" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center overflow-hidden border-b border-white/5">

      {/* Dynamic Background Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">

        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>04. FRONTEND SKILLS</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Frontend Skills & Tools
          </h2>
        </div>

        {/* Orbit Graph & HUD Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">

          {/* Orbital nodes system */}
          <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center border border-white/5 rounded-full bg-bgMain/20 backdrop-blur-sm select-none">

            {/* Orbits */}
            <div className="absolute w-[160px] h-[160px] md:w-[220px] md:h-[220px] rounded-full border border-white/10 opacity-30" />
            <div className="absolute w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full border border-white/10 opacity-20" />
            <div className="absolute w-[360px] h-[360px] md:w-[420px] md:h-[420px] rounded-full border border-white/10 opacity-10" />

            {/* Core Sun processor */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(108, 99, 255, 0.4)',
                  '0 0 35px rgba(108, 99, 255, 0.8)',
                  '0 0 20px rgba(108, 99, 255, 0.4)'
                ]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white z-10"
            >
              <Cpu className="w-8 h-8 text-highlight" />
            </motion.div>

            {/* Orbiting skill planets */}
            {Object.entries(skills).map(([key, skill]) => {
              const radian = (skill.angle * Math.PI) / 180;
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const radius = isMobile ? skill.orbitRadius * 0.7 : skill.orbitRadius;

              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              const isSelected = activeSkillName === key;

              return (
                <motion.button
                  key={skill.name}
                  onClick={() => handlePlanetClick(key)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x,
                    y,
                    boxShadow: isSelected ? `0 0 20px ${skill.color}` : 'none'
                  }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-mono text-[9px] md:text-[10px] font-bold text-white cursor-pointer select-none transition-all duration-300 border ${isSelected
                      ? 'border-white bg-bgMain z-20'
                      : 'border-white/10 bg-bgMain/80 hover:border-white/30 z-10'
                    }`}
                  style={{ borderColor: skill.color }}
                >
                  <span style={{ color: skill.color }}>{key.slice(0, 2).toUpperCase()}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Details HUD overlay card */}
          <div className="flex-1 w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillName}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 rounded-2xl space-y-6 shadow-glass relative border border-white/10"
              >
                <div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: activeSkill.color }}
                />

                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-2xl heading-premium text-white font-extrabold">{activeSkill.name}</h3>
                    <p className="text-xs font-mono text-muted uppercase mt-0.5">Frontend Skill Node</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-secondary">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeSkill.years}</span>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-sans">

                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest flex items-center gap-1">
                      <Zap className="w-3 h-3 text-highlight" />
                      <span>Production Implementations</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSkill.projects.map((proj) => (
                        <span key={proj} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/80 font-medium">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="text-[10px] font-mono text-highlight uppercase tracking-widest flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Best Practice Pattern</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{activeSkill.bestPractice}</p>
                  </div>

                  {/* Top Methods: Optimization, Security, Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {activeSkill.optimizationMethod && (
                      <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 space-y-1">
                        <div className="text-[10px] font-mono text-glow-primary text-primary-200 uppercase tracking-widest flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-secondary animate-pulse" />
                          <span>Optimization</span>
                        </div>
                        <p className="text-[11px] text-muted leading-normal">{activeSkill.optimizationMethod}</p>
                      </div>
                    )}

                    {activeSkill.securityMethod && (
                      <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 space-y-1">
                        <div className="text-[10px] font-mono text-glow-primary text-primary-200 uppercase tracking-widest flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-highlight" />
                          <span>Security Guard</span>
                        </div>
                        <p className="text-[11px] text-muted leading-normal">{activeSkill.securityMethod}</p>
                      </div>
                    )}

                    {activeSkill.performanceMethod && (
                      <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 space-y-1">
                        <div className="text-[10px] font-mono text-glow-primary text-primary-200 uppercase tracking-widest flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5 text-primary" />
                          <span>Performance</span>
                        </div>
                        <p className="text-[11px] text-muted leading-normal">{activeSkill.performanceMethod}</p>
                      </div>
                    )}
                  </div>

                  {/* Render Code Snippet if present */}
                  {/* {activeSkill.snippet && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" />
                        <span>Implementation Snippet</span>
                      </div>
                      <div className="rounded-xl overflow-hidden bg-bgMain border border-white/10 p-4 font-mono text-xs text-primary-300 max-w-full overflow-x-auto whitespace-pre">
                        {activeSkill.snippet}
                      </div>
                    </div>
                  )} */}

                  {/* Render Techniques list if present */}
                  {activeSkill.techniques && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" />
                        <span>Core Techniques Mastered</span>
                      </div>
                      <div className="bg-bgMain border border-white/10 rounded-xl p-4 space-y-2 text-xs font-mono text-muted select-none">
                        {activeSkill.techniques.map((tech) => (
                          <div key={tech} className="flex items-start gap-2">
                            <span className="text-highlight font-bold select-none">›</span>
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* React Architecture deep dive trigger CTA */}
                  {activeSkillName === 'React' && (
                    <button
                      onClick={() => {
                        setShowReactDeepDive(true);
                        addAchievement('React Deep Diver');
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-neon-primary"
                    >
                      <Layers className="w-4 h-4 text-glow-primary" />
                      <span>Explore React Architecture</span>
                    </button>
                  )}

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* REACT ARCHITECTURE DEEP DIVE OVERLAY MODAL */}
      <AnimatePresence>
        {showReactDeepDive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReactDeepDive(false)}
              className="absolute inset-0 bg-bgMain/95 backdrop-blur-md"
            />

            {/* Modal panel body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-4xl glass-panel p-6 md:p-8 rounded-2xl border border-white/15 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col gap-6"
            >

              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-highlight" />
                  <div>
                    <h3 className="text-xl md:text-2xl heading-premium text-white font-extrabold">React Architecture Dashboard</h3>
                    <p className="text-[10px] font-mono text-muted uppercase mt-0.5">Enterprise Frontend Structuring Strategy</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReactDeepDive(false)}
                  className="p-1 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              {/* Sub-tab Selectors */}
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 select-none overflow-x-auto no-scrollbar">
                {[
                  { id: 'nextjs', name: 'Next.js App Router', icon: Folder },
                  { id: 'fiber', name: 'React Fiber & Reconciliation', icon: Layers },
                  { id: 'state', name: 'State & Forms (Zustand/Formik)', icon: Code },
                  { id: 'auth', name: 'Axios vs Fetch & Auth', icon: Lock },
                  { id: 'context', name: 'Context & Error Boundaries', icon: Palette },
                  { id: 'perf', name: 'Code-Splitting & Polyfills', icon: Settings }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer border flex items-center gap-1.5 flex-shrink-0 ${isSelected
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white/5 border-white/5 text-muted hover:text-white hover:border-white/10'
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Inner Tab Contents */}
              <div className="text-xs leading-relaxed overflow-y-auto pr-1 no-scrollbar min-h-[350px]">

                {/* 1. Next.js App Router */}
                {activeTab === 'nextjs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
                    <div className="bg-bgMain/60 border border-white/10 p-5 rounded-xl max-h-[350px] overflow-y-auto no-scrollbar">
                      <div className="text-highlight font-bold select-none mb-3">Enterprise Next.js Structure</div>
                      <div className="text-primary-300">
                        {`src/
├── app/                  # App Router (File Router)
│    ├── layout.tsx       # Root layout (RSC)
│    ├── page.tsx         # Homepage (Server Component)
│    ├── middleware.ts    # Edge routing & Auth guards
│    ├── api/             # Route Handlers (Serverless API)
│    │    └── auth/route.ts
│    ├── dashboard/       # Nested route dashboard
│    │    ├── page.tsx    # Dashboard core view
│    │    └── loading.tsx # Suspense loader fallback
│    └── actions/         # Server Actions (Type-safe RPC)
│         └── user.ts
├── components/           # Server (RSC) & Client Components
├── lib/                  # Shared helper logic (Prisma clients)
├── hooks/                # Custom hooks (Client actions)
└── types/                # Strict TypeScript declaration files`}
                      </div>
                    </div>

                    <div className="space-y-4 font-sans text-muted">
                      <div>
                        <div className="font-bold text-white text-sm mb-1">📁 app/ Layout & Routing</div>
                        <p className="text-xs">File-based routing using App Router structure. Root files (\`layout.tsx\`, \`page.tsx\`) are Server Components (RSC) by default for zero client-bundle load.</p>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm mb-1">⚙️ Edge Middleware</div>
                        <p className="text-xs">Performs routing checks, token validation, and redirect loops directly at the Edge network layer before page render passes.</p>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm mb-1">🚀 Server Actions & ISR</div>
                        <p className="text-xs">Type-safe Server Actions (\`actions/\`) perform database queries directly, paired with dynamic revalidation (\`revalidateTag\`) for caching.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. React Fiber & Reconciliation */}
                {activeTab === 'fiber' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-muted">
                    <div className="space-y-4">
                      <div>
                        <div className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-highlight" />
                          <span>Reconciliation & Virtual DOM</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          React builds a lightweight in-memory tree representation of the DOM. When state updates occur, React generates a new Virtual DOM tree and compares it to the previous tree (Reconciliation). It uses a fast $O(n)$ heuristic diffing algorithm based on node types and component <span className="text-highlight font-mono">key</span> attributes to compute minimal DOM mutations.
                        </p>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-secondary" />
                          <span>The React Fiber Engine</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          Fiber is the core rewrite of React's reconciliation engine. The legacy Stack Reconciler executed rendering recursively, blocking the main thread. Fiber breaks rendering work into micro-units (Fiber nodes) and introduces cooperative scheduling.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-bgMain/60 border border-white/10 p-5 rounded-xl font-mono text-[10px] text-primary-300 max-h-[300px] overflow-y-auto no-scrollbar space-y-3">
                        <div className="text-highlight font-bold">Fiber Rendering Phases</div>
                        <div>
                          <span className="text-white font-bold">Phase 1: Render (Asynchronous / Interruptible)</span>
                          <p className="text-muted mt-1">React traverses the Fiber tree, schedules rendering work, and detects updates. It ranks tasks using priority <span className="text-secondary">Lanes</span> (e.g. User input runs instantly; fetch pre-fetching is deferred). This phase can pause and yield to main thread events.</p>
                        </div>
                        <div>
                          <span className="text-white font-bold">Phase 2: Commit (Synchronous / Blocked)</span>
                          <p className="text-muted mt-1">Once reconciliation is completed, React commits all computed mutations directly to the host DOM in a single, blocking write pass to prevent visual layout flashes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. State & Forms (Redux/Zustand/Formik) */}
                {activeTab === 'state' && (
                  <div className="space-y-6">
                    <p className="text-muted font-sans text-xs">
                      Enterprise global state utilizes Redux Toolkit for complex slices, Zustand for lightweight atomic stores, and Formik with Yup validation for secure client forms handling.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="bg-bgMain border border-white/10 p-4 rounded-xl space-y-2">
                        <div className="font-mono text-white text-xs font-bold">1. Redux Toolkit Slice</div>
                        <div className="rounded-lg overflow-hidden bg-white/2 p-2 font-mono text-[10px] text-primary-300 max-h-[180px] overflow-y-auto whitespace-pre">
                          {`import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
    }
  }
});

export const store = configureStore({
  reducer: { auth: authSlice.reducer }
});`}
                        </div>
                      </div>

                      <div className="bg-bgMain border border-white/10 p-4 rounded-xl space-y-2">
                        <div className="font-mono text-white text-xs font-bold">2. Zustand Custom Store</div>
                        <div className="rounded-lg overflow-hidden bg-white/2 p-2 font-mono text-[10px] text-primary-300 max-h-[180px] overflow-y-auto whitespace-pre">
                          {`import { create } from 'zustand';

interface UserState {
  user: any | null;
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (data) => set({ user: data, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));`}
                        </div>
                      </div>

                      <div className="bg-bgMain border border-white/10 p-4 rounded-xl space-y-2">
                        <div className="font-mono text-white text-xs font-bold">3. Formik + Yup Form</div>
                        <div className="rounded-lg overflow-hidden bg-white/2 p-2 font-mono text-[10px] text-primary-300 max-h-[180px] overflow-y-auto whitespace-pre">
                          {`import { useFormik } from 'formik';
import * as Yup from 'yup';

const formik = useFormik({
  initialValues: { email: '', password: '' },
  validationSchema: Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too short').required('Required')
  }),
  onSubmit: async (values) => {
    await loginUser(values.email, values.password);
  }
});`}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Token & Auth Strategy */}
                {activeTab === 'auth' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-muted">
                    <div className="space-y-4">
                      <div>
                        <div className="font-bold text-white text-sm mb-1">Axios vs Native Fetch in React JS</div>
                        <p className="text-xs leading-relaxed">
                          Axios is used instead of native Fetch in this project because:
                          <br />• <b>Auto-serialization:</b> Automatically transforms data into JSON payload arrays (native Fetch requires double processing: <span className="text-highlight font-mono">.then(r =&gt; r.json())</span>).
                          <br />• <b>Request/Response Interceptors:</b> Essential for cleanly attaching JWT access headers and injecting refresh tokens transparently.
                          <br />• <b>Request Abort:</b> Clean, built-in bindings for cancelling pending API requests via <span className="text-secondary font-mono">AbortController</span> to prevent state updates on unmounted widgets.
                          <br />• <b>Error Handling:</b> Rejects promises automatically for status codes outside 2xx (native Fetch resolves successfully on 404/500).
                        </p>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm mb-1">Cookie Size Limit (4KB) & Token Strategy</div>
                        <p className="text-xs leading-relaxed">
                          Browsers enforce a strict <b>4KB size limit per cookie</b>. Large encrypted JWTs (especially those containing extensive roles or permission claims) easily exceed this limit, leading to storage failures.
                          <br /><b>Mitigation:</b> Store access tokens in memory/Zustand, and write only a lightweight JTI/Session ID into the <span className="text-highlight">httpOnly Secure cookie</span>. For large client JWTs, split payload strings across two cookies (e.g. <span className="text-secondary font-mono">Token_P1</span> and <span className="text-secondary font-mono">Token_P2</span>).
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono font-bold text-white">Interceptor Renewal Implementation:</div>
                      <div className="rounded-xl overflow-hidden bg-bgMain border border-white/10 p-4 font-mono text-[10px] text-glow-primary text-primary-300 max-h-[280px] overflow-y-auto whitespace-pre">
                        {`import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.jasir.dev/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Pass httpOnly auth cookies
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Lock retry loops
      try {
        const refreshResponse = await axios.post('/auth/refresh', {}, { withCredentials: true });
        const { accessToken } = refreshResponse.data;
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = \`Bearer \${accessToken}\`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);`}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Context & Error Boundaries */}
                {activeTab === 'context' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
                    <div className="bg-bgMain border border-white/10 p-4 rounded-xl space-y-2">
                      <div className="text-highlight font-bold select-none">1. CSS Variable Theme Context</div>
                      <div className="rounded-lg overflow-hidden bg-white/2 p-3 font-mono text-[10px] text-primary-300 max-h-[250px] overflow-y-auto whitespace-pre">
                        {`import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'neon' | 'light';
const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void } | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
};`}
                      </div>
                    </div>

                    <div className="bg-bgMain border border-white/10 p-4 rounded-xl space-y-2">
                      <div className="text-secondary font-bold select-none">2. React Error Boundary</div>
                      <div className="rounded-lg overflow-hidden bg-white/2 p-3 font-mono text-[10px] text-primary-300 max-h-[250px] overflow-y-auto whitespace-pre">
                        {`import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; fallback: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught exception caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.fallback;
    }
    return this.children;
  }
}`}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Performance Tuning */}
                {activeTab === 'perf' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-muted">
                    <div className="space-y-4">
                      <div>
                        <div className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                          <Settings className="w-4 h-4 text-highlight" />
                          <span>Code-Splitting & Dynamic Imports</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          Splits Javascript bundle outputs into modular, dynamic async chunks. Critical path pages are eagerly fetched while heavy downstream panels (like telemetry charts, achievement dialogs, or smooth scrolling dependencies) are code-split using <span className="text-highlight font-mono">React.lazy()</span> or dynamic <span className="text-highlight font-mono">import()</span>, ensuring rapid initial loads.
                        </p>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-secondary" />
                          <span>Minimization & Polyfills</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          <b>Minimization:</b> Uses Rollup/Esbuild bundlers in production to strip dead code, compress syntax trees (Uglification), and perform aggressive tree-shaking.
                          <br /><b>Polyfills:</b> Core features use dynamic user-agent polyfill checks (such as <span className="text-highlight font-mono">core-js</span> bundles) to avoid serving heavy legacy fallback scripts to modern browsers.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/3 border border-white/5 p-5 rounded-xl space-y-2">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <CheckSquare className="w-4 h-4 text-highlight" />
                          <span>DOM Virtualization</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          Only renders DOM nodes visible inside the active scroll viewport, replacing dynamic elements with cached placeholders in tables/lists containing 10,000+ entries.
                        </p>
                      </div>

                      <div className="bg-white/3 border border-white/5 p-5 rounded-xl space-y-2">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-secondary" />
                          <span>Component Isolations</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          Used custom selector hooks in stores. Components only re-subscribe to context fields they explicitly read, cutting down parent layout paint redraw cycles.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
