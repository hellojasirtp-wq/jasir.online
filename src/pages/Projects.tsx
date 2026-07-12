import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit, ChevronRight, Zap, HelpCircle, 
  Settings, Award, Layers 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  color: string;
  glowColor: string;
  stats: { label: string; value: string }[];
  techStack: string[];
  challenge: string;
  solution: string;
  contributions: string;
  architecture: string[];
  results: string;
}

export const Projects: React.FC = () => {
  const { addAchievement } = usePortfolio();
  
  const projects: ProjectData[] = [
    {
      id: 'city-of-joburg',
      title: 'City of Johannesburg',
      tagline: 'Municipal Safety & Citizen Incident SaaS Platform',
      color: '#6C63FF',
      glowColor: 'rgba(108, 99, 255, 0.4)',
      stats: [
        { label: 'Citizen Base', value: '1M+' },
        { label: 'Incident Resolve Rate', value: '+45%' },
        { label: 'Server Latency', value: '<80ms' }
      ],
      techStack: ['React', 'TypeScript', 'React Query', 'TailwindCSS', 'Google Maps API'],
      challenge: 'Handling real-time incident report coordinate markers for a massive metropolitan area without lag or UI blocking.',
      solution: 'Used web workers for coordinate mapping/clustering and canvas grids instead of standard heavy DOM markers.',
      contributions: 'Engineered the mapping interface, offline data queue sync, and citizen reporting dashboard.',
      architecture: ['Citizen App (Mobile)', 'Admin Controller (React)', 'Geo-Worker Thread', 'DB Logger'],
      results: 'Secured critical platform stability and drastically reduced incident response times from hours to minutes.'
    },
    {
      id: 'pikitup',
      title: 'Pikitup Incident Management',
      tagline: 'Solid Waste & Operational Logistics Tracking Console',
      color: '#EAB308',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      stats: [
        { label: 'Truck Fleet', value: '300+' },
        { label: 'Daily Reports', value: '5k+' },
        { label: 'Reporting Lag', value: '0s' }
      ],
      techStack: ['React', 'Redux', 'Bootstrap', 'REST API Integration'],
      challenge: 'Live dispatch coordination and route changes synchronization across unstable cellular network coverage.',
      solution: 'Developed an optimistic state updating UI coupled with an IndexedDB storage sync adapter.',
      contributions: 'Spearheaded the fleet tracking board and supervisor assignment dispatch modules.',
      architecture: ['Driver Terminal API', 'Route Engine', 'Dispatcher Admin UI', 'IndexedDB Queue'],
      results: 'Increased route compliance by 28% and reduced double-handling logistics discrepancies.'
    },
    {
      id: 'design-system',
      title: 'Design System SaaS',
      tagline: 'Enterprise UI Component Library & Package System',
      color: '#00D4FF',
      glowColor: 'rgba(0, 212, 255, 0.4)',
      stats: [
        { label: 'Teams Using It', value: '8' },
        { label: 'Components', value: '40+' },
        { label: 'Bundle Size', value: '18KB' }
      ],
      techStack: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Storybook', 'Rollup'],
      challenge: 'Creating bulletproof components that compile clean packages and fit multi-tenant SaaS layouts effortlessly.',
      solution: 'Structured atomic component layers (atoms, molecules, organisms) exported as highly configurable ESModules.',
      contributions: 'Authored core components (DataTables, Modals, Forms, Navigation), bundled configurations, and compiled user docs.',
      architecture: ['Core UI Package', 'Storybook SandBox', 'Tailwind Engine', 'Rollup Bundler'],
      results: 'Reduced client feature building cycles by 35% and unified brand UI layouts across all projects.'
    },
    {
      id: 'triveni',
      title: 'Triveni Turbine',
      tagline: 'Industrial Steam Turbine Telemetry & Live Monitor',
      color: '#FF4D8D',
      glowColor: 'rgba(255, 77, 141, 0.4)',
      stats: [
        { label: 'Turbines Connected', value: '50+' },
        { label: 'Sensors / Turbine', value: '60+' },
        { label: 'Update Speed', value: '50ms' }
      ],
      techStack: ['Next.js', 'Redux Toolkit', 'Ant Design', 'Chart.js', 'WebSockets'],
      challenge: 'Streaming real-time vibration analytics without page locks or browser frame rate degradation.',
      solution: 'Configured a websocket broker and set up rendering throttle cycles using requestAnimationFrame hooks.',
      contributions: 'Built telemetry charts, gauge grids, threshold alert systems, and general layouts.',
      architecture: ['Turbine ModBus Sensor', 'Websocket Broker', 'Chart Render Canvas', 'Redux State'],
      results: 'Delivered flawless 60 FPS live graphing dashboards monitoring industrial steam equipment.'
    },
    {
      id: 'olo',
      title: 'OLO Restaurant Portal',
      tagline: 'SaaS Multi-Restaurant POS & Customer Ordering Platform',
      color: '#00FFB3',
      glowColor: 'rgba(0, 255, 179, 0.4)',
      stats: [
        { label: 'Vendors Hosted', value: '250+' },
        { label: 'Orders Processed', value: '500k+' },
        { label: 'Checkout Success', value: '99.9%' }
      ],
      techStack: ['React', 'TypeScript', 'Chakra UI', 'Stripe API', 'WhatsApp Business API'],
      challenge: 'Synchronizing kitchen print triggers and checkout payment gateways seamlessly without double charging.',
      solution: 'Implemented strict idempotency token parameters on transaction payloads and state locking UI.',
      contributions: 'Engineered Stripe checkout flow, dynamic cart modifiers, and order tracking timeline.',
      architecture: ['Vendor Dashboard', 'Client Checkout Web', 'Stripe Hook Handler', 'WhatsApp Gateway'],
      results: 'Created a highly reliable food checkout experience and automated restaurant notifications.'
    },
    {
      id: 'click4marry',
      title: 'Click4Marry Portal',
      tagline: 'High-Scale Matrimonial Platform & Search Engine',
      color: '#A855F7',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      stats: [
        { label: 'Registrations', value: '200k+' },
        { label: 'Concurrent Users', value: '5k+' },
        { label: 'Search Results', value: '<120ms' }
      ],
      techStack: ['React', 'Redux', 'Bootstrap', 'ElasticSearch Integration'],
      challenge: 'Compiling search outputs across thousands of complex criteria options (age, location, preferences).',
      solution: 'Designed and bound an asynchronous query generator mapping filter states directly to optimized API calls.',
      contributions: 'Developed the profile finder grids, chat windows, and matchmaking dashboard pages.',
      architecture: ['Client App', 'Search Query Resolver', 'Chat WebSockets', 'Cache Store'],
      results: 'Achieved blistering fast search speeds and increased platform user engagement by 40%.'
    },
    {
      id: 'property-ok',
      title: 'PropertyOK Portal',
      tagline: 'Real Estate Listing Finder & Broker Control Center',
      color: '#3B82F6',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      stats: [
        { label: 'Properties Listed', value: '40k+' },
        { label: 'Brokers Registered', value: '8k+' },
        { label: 'Match Rate', value: '88%' }
      ],
      techStack: ['React', 'Redux', 'Material UI', 'Google Maps API'],
      challenge: 'Rendering map listings and sorting listings on dragging maps without heavy lag.',
      solution: 'Debounced boundary drag events and handled property updates inside virtual lists.',
      contributions: 'Architected boundary search layout panel and broker client CRM widgets.',
      architecture: ['Broker Panel', 'Client Listing Portal', 'Map Engine API', 'Listing DB'],
      results: 'Improved broker leads generation efficiency and stabilized list navigations.'
    },
    {
      id: 'happile',
      title: 'Happile Logistics',
      tagline: 'Fleet Scheduling & Dispatch Routing Dashboard',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      stats: [
        { label: 'Loads Logged', value: '100k+' },
        { label: 'Active Drivers', value: '1.2k' },
        { label: 'Routing Savings', value: '15%' }
      ],
      techStack: ['React', 'TypeScript', 'Context API', 'Google Routes API'],
      challenge: 'Displaying optimized routes and handling fleet scheduling adjustments dynamically.',
      solution: 'Engineered drag-and-drop calendar planner grids synchronized to maps data matrices.',
      contributions: 'Developed scheduling calendar, load logger layouts, and fleet location tracker.',
      architecture: ['Fleet Dispatch UI', 'Router Solver Engine', 'Driver Hub', 'Data Cache'],
      results: 'Reduced operational dispatcher scheduling times and minimized empty return journeys.'
    },
    {
      id: 'nextport',
      title: 'NextPort Platform',
      tagline: 'Supply Chain Port Dispatch & Container Scheduler',
      color: '#F97316',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      stats: [
        { label: 'Containers Handled', value: '20k+' },
        { label: 'Bill Computations', value: '100%' },
        { label: 'Errors Handled', value: '0' }
      ],
      techStack: ['React', 'Redux', 'Bootstrap', 'REST APIs'],
      challenge: 'Organizing shipping dock containers scheduling and calculating dynamic billing metrics.',
      solution: 'Mapped state trees with Redux, binding grid controls for drag containers assignments.',
      contributions: 'Configured container layout grids, scheduler widgets, and billing calculator.',
      architecture: ['Dock Supervisor Board', 'Billing Engine', 'Scheduling Calendar', 'Container Database'],
      results: 'Delivered initial automated logistics product laying foundations for team scale-up.'
    }
  ];

  const [activeProjIndex, setActiveProjIndex] = useState(0);
  const activeProj = projects[activeProjIndex];

  const selectProject = (idx: number) => {
    setActiveProjIndex(idx);
    addAchievement('Project Evaluator');
  };

  return (
    <section id="projects" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center">
      
      {/* Aurora glow light */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>04. FEATURED WORKS</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Cinematic Projects Showcase
          </h2>
        </div>

        {/* Project Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Side Tabs Selector */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 no-scrollbar select-none">
            {projects.map((proj, idx) => {
              const isSelected = activeProjIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(idx)}
                  className={`w-44 lg:w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium text-xs md:text-sm flex items-center gap-2 border flex-shrink-0 cursor-pointer ${
                    isSelected 
                      ? 'bg-white/5 border-white text-white shadow-md' 
                      : 'bg-white/2 border-white/5 text-muted hover:text-white hover:border-white/10'
                  }`}
                  style={{ borderLeftColor: isSelected ? proj.color : undefined, borderLeftWidth: isSelected ? '4px' : undefined }}
                >
                  <FolderGit className="w-4 h-4 flex-shrink-0" style={{ color: proj.color }} />
                  <span className="truncate">{proj.title}</span>
                </button>
              );
            })}
          </div>

          {/* Cinematic Panel Details */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProj.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-6 md:p-8 rounded-2xl space-y-8 shadow-glass relative border border-white/10 overflow-hidden"
              >
                {/* Background project highlight gradient */}
                <div 
                  className="absolute -top-32 -right-32 w-80 h-80 rounded-full filter blur-[80px] pointer-events-none opacity-20 transition-all duration-500"
                  style={{ backgroundColor: activeProj.color }}
                />

                {/* Hero Header */}
                <div className="space-y-2 pb-4 border-b border-white/5">
                  <span 
                    className="text-xs font-mono font-bold uppercase tracking-widest text-glow-primary"
                    style={{ color: activeProj.color }}
                  >
                    Enterprise Case Study
                  </span>
                  <h3 className="text-2xl md:text-4xl heading-premium text-white font-extrabold">{activeProj.title}</h3>
                  <p className="text-sm text-muted">{activeProj.tagline}</p>
                </div>

                {/* Statistics dashboard row */}
                <div className="grid grid-cols-3 gap-4 bg-white/3 border border-white/5 p-4 rounded-xl">
                  {activeProj.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xs font-mono text-muted uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className="text-lg md:text-2xl heading-premium text-white font-black">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Core content grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                  
                  {/* Challenge & Solution */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-accent" />
                        <span>The Challenge</span>
                      </h4>
                      <p className="text-muted font-sans">{activeProj.challenge}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-mono text-xs font-bold text-highlight uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-highlight" />
                        <span>The Solution</span>
                      </h4>
                      <p className="text-muted font-sans">{activeProj.solution}</p>
                    </div>
                  </div>

                  {/* Contributions & Tech */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-secondary" />
                        <span>Key Contributions</span>
                      </h4>
                      <p className="text-muted font-sans">{activeProj.contributions}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-mono text-xs font-bold text-primary-300 uppercase tracking-wider flex items-center gap-1.5" style={{ color: activeProj.color }}>
                        <Settings className="w-4 h-4" style={{ color: activeProj.color }} />
                        <span>Technology Stack</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProj.techStack.map((tech) => (
                          <span key={tech} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/80 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Architecture Visualizer Block */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-primary" />
                    <span>System Architecture Mapping</span>
                  </h4>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-bgMain border border-white/5 rounded-xl text-center select-none font-mono text-xs text-muted">
                    {activeProj.architecture.map((layer, index) => (
                      <React.Fragment key={layer}>
                        {index > 0 && <span className="text-white/20 hidden md:inline">→</span>}
                        <div className="w-full md:w-auto px-4 py-2 bg-white/2 border border-white/5 rounded-lg text-white font-medium hover:border-white/10 transition-colors">
                          {layer}
                        </div>
                      </React.Fragment>
                    ))}
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
