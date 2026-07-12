import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ChevronRight, Code, Calendar, CheckSquare, Zap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface Skill {
  name: string;
  years: string;
  projects: string[];
  snippet: string;
  bestPractice: string;
  performanceNote: string;
  orbitRadius: number; // For visualization spacing
  angle: number; // For visual positioning
  color: string;
}

export const Skills: React.FC = () => {
  const { addAchievement } = usePortfolio();
  
  const skills: Record<string, Skill> = {
    React: {
      name: 'React',
      years: '6+ Years',
      projects: ['csd-admin-web-app', 'Pikitup Admin Panel', 'Click4Marry Admin', 'Click4Marry User', 'TTL Solver Wrapper', 'EmployedIn Portal', 'TaskFlow CRM', 'OLO Portal', 'Design System SaaS', 'Triveni Turbine'],
      bestPractice: 'Always pass a function callback to useState if initializing state from expensive calculations to run it lazily.',
      performanceNote: 'Leverage useMemo and useCallback strategically on component boundaries to prevent excessive child re-renders.',
      snippet: `// Optimized State Initialization
const [data, setData] = useState(() => {
  const localVal = localStorage.getItem('data_key');
  return localVal ? JSON.parse(localVal) : heavyComputation();
});`,
      orbitRadius: 110,
      angle: 0,
      color: '#6C63FF'
    },
    'Next.js': {
      name: 'Next.js',
      years: '4+ Years',
      projects: ['Design System SaaS', 'Triveni Turbine'],
      bestPractice: 'Utilize Server Components (RSC) to keep data fetching on the server and minimize the javascript bundle sent to clients.',
      performanceNote: 'Pre-render static paths using incremental static regeneration (ISR) to cache public data routes.',
      snippet: `// Next.js Server Component
export async function DynamicPage() {
  const data = await fetchTelemetryData();
  return <Dashboard data={data} />;
}`,
      orbitRadius: 170,
      angle: 55,
      color: '#00D4FF'
    },
    TypeScript: {
      name: 'TypeScript',
      years: '5+ Years',
      projects: ['csd-admin-web-app', 'Pikitup Admin Panel', 'Click4Marry Admin', 'Click4Marry User', 'TTL Solver Wrapper', 'EmployedIn Portal', 'TaskFlow CRM', 'Triveni Turbine', 'PropertyOK', 'HappileLogistics'],
      bestPractice: 'Avoid "any". Leverage Generics and utility type helpers like Record, Pick, and Partial to maintain strict type safety.',
      performanceNote: 'Use type boundaries at API response limits to ensure compiler validation of server payloads.',
      snippet: `// Type Safe API Response Helper
interface ApiResponse<T> {
  status: 'success' | 'failed';
  payload: T;
  timestamp: number;
}`,
      orbitRadius: 130,
      angle: 120,
      color: '#FF4D8D'
    },
    'Three.js': {
      name: 'Three.js / R3F',
      years: '2+ Years',
      projects: ['TTL Solver Wrapper', 'Jasir Portfolio', 'Industrial Simulators'],
      bestPractice: 'Dispose of custom geometries and textures manually when unmounting Three.js objects to prevent GPU memory leaks.',
      performanceNote: 'Keep calculations out of useFrame callbacks. Preallocate temporary Vectors to avoid creating garbage collection sweeps.',
      snippet: `// Math allocation outside useFrame loop
const tempVec = new THREE.Vector3();
useFrame((state, delta) => {
  meshRef.current.position.lerp(tempVec.set(0, Math.sin(state.clock.elapsedTime), 0), 0.1);
});`,
      orbitRadius: 210,
      angle: 190,
      color: '#00FFB3'
    },
    'Framer Motion': {
      name: 'Framer Motion',
      years: '4+ Years',
      projects: ['Design System SaaS', 'OLO Portal'],
      bestPractice: 'Wrap conditional rendering panels inside AnimatePresence to orchestrate exit transition lifecycles.',
      performanceNote: 'Use CSS transform attributes (x, y, scale) instead of physical sizes (width, height) to trigger GPU compositor acceleration.',
      snippet: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
/>`,
      orbitRadius: 190,
      angle: 260,
      color: '#A855F7'
    },
    TailwindCSS: {
      name: 'TailwindCSS',
      years: '5+ Years',
      projects: ['Pikitup Admin Panel', 'EmployedIn Portal', 'OLO Portal', 'Design System SaaS'],
      bestPractice: 'Configure style parameters using CSS variables in tailwind.config.js to allow easy dynamic branding changes.',
      performanceNote: 'Purge unused classes in Vite bundles to keep final CSS sizes minimal (<15KB).',
      snippet: `// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: 'var(--brand-color)',
    }
  }
}`,
      orbitRadius: 150,
      angle: 310,
      color: '#EAB308'
    }
  };

  const [activeSkillName, setActiveSkillName] = useState<string>('React');
  const activeSkill = skills[activeSkillName];

  const handlePlanetClick = (name: string) => {
    setActiveSkillName(name);
    addAchievement('Galaxy Explorer');
  };

  return (
    <section id="skills" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center overflow-hidden">
      
      {/* Decorative Radial Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full filter blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>03. MY SKILLS</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            My Skills at a Glance
          </h2>
        </div>

        {/* Orbit Graph & HUD Overlay Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          {/* Orbital System Container */}
          <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center border border-white/5 rounded-full bg-bgMain/20 backdrop-blur-sm select-none">
            
            {/* Concentric Orbit Paths */}
            <div className="absolute w-[160px] h-[160px] md:w-[220px] md:h-[220px] rounded-full border border-white/10 opacity-30" />
            <div className="absolute w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full border border-white/10 opacity-20" />
            <div className="absolute w-[360px] h-[360px] md:w-[420px] md:h-[420px] rounded-full border border-white/10 opacity-10" />

            {/* Central Star Core */}
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
              <Cpu className="w-8 h-8 text-highlight animate-pulse" />
            </motion.div>

            {/* Planet Nodes Orbiting */}
            {Object.values(skills).map((skill) => {
              // Convert polar to cartesian coordinates
              const radian = (skill.angle * Math.PI) / 180;
              
              // Scale radius down slightly on smaller mobile viewports
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const radius = isMobile ? skill.orbitRadius * 0.7 : skill.orbitRadius;
              
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              const isSelected = activeSkillName === skill.name;

              return (
                <motion.button
                  key={skill.name}
                  onClick={() => handlePlanetClick(skill.name)}
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
                  className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-mono text-[9px] md:text-[10px] font-bold text-white cursor-pointer select-none transition-all duration-300 border ${
                    isSelected 
                      ? 'border-white bg-bgMain z-20' 
                      : 'border-white/10 bg-bgMain/80 hover:border-white/30 z-10'
                  }`}
                  style={{ borderColor: skill.color }}
                >
                  <span style={{ color: skill.color }}>{skill.name.slice(0, 2).toUpperCase()}</span>
                </motion.button>
              );
            })}
          </div>

          {/* HUD Details Side Panel */}
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
                {/* Glowing light badge for active item */}
                <div 
                  className="absolute top-4 right-4 w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: activeSkill.color, boxShadow: `0 0 10px ${activeSkill.color}` }}
                />

                {/* Skill Title & Info Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-2xl heading-premium text-white font-extrabold">{activeSkill.name}</h3>
                    <p className="text-xs font-mono text-muted uppercase mt-0.5">Core Technology Stack</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-glow-secondary">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>{activeSkill.years}</span>
                  </div>
                </div>

                {/* Main Details */}
                <div className="space-y-4 text-sm font-sans">
                  
                  {/* Used in projects */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest flex items-center gap-1">
                      <Zap className="w-3 h-3 text-highlight" />
                      <span>Production Deployments</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSkill.projects.map((proj) => (
                        <span key={proj} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/80 font-medium">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="space-y-1 bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="text-[10px] font-mono text-highlight uppercase tracking-widest flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Engineering Patterns</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{activeSkill.bestPractice}</p>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      <span>Implementation Snippet</span>
                    </div>
                    <div className="rounded-xl overflow-hidden bg-bgMain border border-white/10 p-4 font-mono text-xs text-glow-primary text-primary-300 max-w-full overflow-x-auto whitespace-pre">
                      {activeSkill.snippet}
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
