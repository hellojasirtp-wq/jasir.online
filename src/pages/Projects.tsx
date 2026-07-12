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
      title: 'City of Johannesburg Admin',
      tagline: 'Municipal Management, News, Notifications & Incident Portal',
      color: '#6C63FF',
      glowColor: 'rgba(108, 99, 255, 0.4)',
      stats: [
        { label: 'Modules Managed', value: '8 Modules' },
        { label: 'Auth Channels', value: 'Dual (Standard/SSO)' },
        { label: 'Permissions', value: 'AES Encrypted' }
      ],
      techStack: ['React 18', 'TypeScript', 'Vite 5', 'Ant Design v5', 'Redux Toolkit', 'Sass', 'Azure MSAL', 'CryptoJS'],
      challenge: 'Securing administrative workflows with dual SSO/Azure credentials, and enforcing a strictly encrypted local storage gate for 8 distinct module permission levels.',
      solution: 'Integrated Microsoft MSAL Browser authentication alongside standard login, built an inactivity debounced token auto-refresher, and encrypted localStorage RBAC matrices using AES.',
      contributions: 'Spearheaded MSAL Azure AD configuration, AuthWrapper session refreshing, AES storage permission encryption, and role-based module matrices.',
      architecture: ['React (Vite)', 'Redux RTK Store', 'AuthWrapper guard', 'Terragrunt (AWS)'],
      results: 'Achieved bulletproof session integrity, secure permission governance across news, ward maps, and incident reports with zero auth leakage.'
    },
    {
      id: 'pikitup',
      title: 'Pikitup Admin Panel',
      tagline: 'Solid Waste & Fleet Incident Management Console',
      color: '#EAB308',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      stats: [
        { label: 'Truck Fleet', value: '300+' },
        { label: 'Modules Gated', value: '5 Modules' },
        { label: 'Session Refresh', value: '-5 min' }
      ],
      techStack: ['React 18', 'TypeScript', 'Ant Design v5', 'React Query v5', 'TailwindCSS v4', 'SCSS', 'Axios', 'GSAP'],
      challenge: 'Managing dynamic role-based access control, modular permission levels (view, edit, assign, merge), and automatic non-blocking JWT refresh cycles.',
      solution: 'Developed custom route protection guards with permission-based module redirection and integrated scheduled auto-refresh cookie-tokens.',
      contributions: 'Spearheaded ProtectedRoute implementation with module matrix configurations, ticket detail panels, and Terragrunt AWS Cape Town deployments.',
      architecture: ['React Client (Vite)', 'React Query Cache', 'ProtectedRoute Guard', 'Terragrunt (AWS)'],
      results: 'Ensured highly secure permission-gated access with zero auth regressions and automated regional cloud environment setup.'
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
      title: 'OLO Admin Panel',
      tagline: 'Multi-Domain On-Demand Service & Fleet Operations Platform',
      color: '#00FFB3',
      glowColor: 'rgba(0, 255, 179, 0.4)',
      stats: [
        { label: 'Modules Managed', value: '26+' },
        { label: 'Routes Covered', value: '40+' },
        { label: 'Permission Levels', value: 'RBAC' }
      ],
      techStack: ['React 18', 'TypeScript', 'Vite', 'Ant Design v5', 'Redux Toolkit', 'TailwindCSS', 'SCSS', 'Axios', 'ApexCharts', 'dayjs'],
      challenge: 'Managing a complex multi-domain admin platform — orders, SOS services, wallet payouts, coupons, analytics, and role-based access — with a single consistent and maintainable frontend architecture.',
      solution: 'Structured the app into feature-isolated page modules with a shared API layer, AES-encrypted RBAC permissions, automatic JWT refresh interceptors, and a section-based coupon form builder pattern.',
      contributions: 'Led frontend development of the Coupons module (create/edit/disable with merchant zone auto-computation), Wallet Management, SOS Provider workflows, and the RBAC permission gate system across all navigation items.',
      architecture: ['React SPA (Vite)', 'Ant Design + SCSS', 'Redux Toolkit (userSlice)', 'Axios + JWT Auto-Refresh', 'AES-RBAC (crypto-js)', 'REST API Backend'],
      results: 'Delivered a scalable, permission-gated admin platform covering orders, SOS, wallets, coupons and analytics — with zero auth regressions and clean module separation for team onboarding.'
    },
    {
      id: 'ttl-solver',
      title: 'TTL Solver Wrapper',
      tagline: 'Industrial CAD Nesting & Geometry Solver Configuration Dashboard',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      stats: [
        { label: 'User Roles', value: 'RBAC (2)' },
        { label: 'DXF Visualizer', value: 'three.js' },
        { label: 'Editor Layout', value: 'Split Monaco' }
      ],
      techStack: ['React 18', 'TypeScript', 'Vite 7', 'Ant Design v5', 'React Query v5', 'Sass', 'Monaco Editor', 'three.js'],
      challenge: 'Rendering 2D/3D CAD DXF sheet layouts dynamically in-browser and handling legacy solver configuration file encodings safely.',
      solution: 'Built a three.js WebGL CAD renderer integrated with theme synchronization observers, split-screen Monaco tabbed views, and buffer array encoding decoders.',
      contributions: 'Engineered split Monaco tabbed configurations editor, WebGL DXF theme-observer sync viewer overlay, and central Axios 401 automatic logout interceptors.',
      architecture: ['React Client', 'three.js Canvas', 'Monaco Diff Editor', 'Axios Gateway'],
      results: 'Streamlined nesting engine launching, config tweaking, DXF previews, and case comparative side-by-side run evaluations.'
    },
    {
      id: 'employedin',
      title: 'EmployedIn Portal',
      tagline: 'AI-Powered International Recruitment SaaS Platform',
      color: '#1D4ED8',
      glowColor: 'rgba(29, 78, 216, 0.4)',
      stats: [
        { label: 'User Roles', value: '5 distinct roles' },
        { label: 'Ant Design', value: 'v6 Componentry' },
        { label: 'Build Tool', value: 'Vite v8 + React 19' }
      ],
      techStack: ['React 19', 'TypeScript', 'Vite 8', 'Ant Design v6', 'Redux Toolkit', 'React Query v5', 'TailwindCSS v4', 'SCSS'],
      challenge: 'Unifying multi-tenant workflows for job seekers, corporate employers, regional agents, and super-agents with dynamic role-based routes and cookie-based JWT masquerading.',
      solution: 'Structured a Redux Toolkit session store, custom Route Guards checking role permissions, dynamic Ant Design v6 theme algorithms, and Tailwind v4 utility styles.',
      contributions: 'Engineered post-auth redirect handshakes, custom ProtectedRoute components, Redux session switcher, global Axios 401 token eject interceptors, and mock profile sandboxes.',
      architecture: ['React SPA (Vite 8)', 'Redux RTK Store', 'React Query cache', 'Ant Design v6 Config'],
      results: 'Delivered an interactive, lightning-fast multi-actor recruitment dashboard with unified light/dark state syncing and seamless login switching.'
    },
    {
      id: 'taskflow-crm',
      title: 'TaskFlow CRM',
      tagline: 'Enterprise CRM Interface & Redmine Client Proxy Portal',
      color: '#FF4D8D',
      glowColor: 'rgba(255, 77, 141, 0.4)',
      stats: [
        { label: 'State Sync Key', value: '"  " (2 Spaces)' },
        { label: 'Build Tool', value: 'Vite v6 + React 19' },
        { label: 'Recharts', value: 'Interactive' }
      ],
      techStack: ['React 19', 'TypeScript', 'Vite 6', 'Redux Toolkit v2', 'React Query v5', 'TailwindCSS v3', 'Axios v1', 'Recharts'],
      challenge: 'Transforming legacy Redmine issue trackers into a high-performance CRM interface with custom proxy APIs, path cleaners, automatic 403 token refreshment queues, and strict URL filter synchronizations.',
      solution: 'Developed a trailing-slash URL sanitizer, integrated TanStack Query caches, configured an Axios response interceptor queuing failed 403 requests during refresh cycles, and synced search filters directly to address bar parameters.',
      contributions: 'Engineered Redux store layers with the double-space localStorage session key quirk, Axios token-refresh queues, file upload multi-part boundaries, and Recharts analytics dashboards.',
      architecture: ['React (Vite 6)', 'Redux Store', 'React Query hook', 'Redmine API Proxy'],
      results: 'Delivered a modern, fluid Redmine overlay client featuring instant filtering, seamless attachment downloading, and robust background authentication integrity.'
    },

    {
      id: 'click4marry',
      title: 'Click4Marry Admin',
      tagline: 'Enterprise Matrimonial CRM, Verifications & Staff Controller',
      color: '#A855F7',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      stats: [
        { label: 'Matrimony Users', value: '200k+' },
        { label: 'Module IDs', value: '20 Modules' },
        { label: 'Staff Roles', value: '4 Dynamic Roles' }
      ],
      techStack: ['React 18', 'TypeScript', 'Vite 6', 'React Router v7', 'React Query v5', 'Ant Design v5', 'TailwindCSS v4', 'CryptoJS', 'ApexCharts', 'FullCalendar'],
      challenge: 'Enforcing a strict client-side role-based routing engine and local storage permissions security layout while managing multi-step photo, identity, and coordinate coordinate verifications for thousands of users.',
      solution: 'Configured CryptoJS AES-encryption on login configurations, established dynamic route authentication middleware verifying module-level permits (VIEW, CREATE, etc.), and built transactional verification interfaces.',
      contributions: 'Spearheaded the secure route authorization engine, custom timezone Axios headers, telecaller performance logs, and FullCalendar scheduler boards.',
      architecture: ['React (Vite 6)', 'React Router v7 Layout', 'AES cryptoStorage', 'ApexCharts panel'],
      results: 'Secured administrative actions across 20 modules with zero privilege escalations and enabled smooth, visual analytics tracking for business metrics.'
    },
    {
      id: 'click4marry-user',
      title: 'Click4Marry User Portal',
      tagline: 'Consumer Matrimonial App, Real-Time Messaging & SEO Engine',
      color: '#EC4899',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      stats: [
        { label: 'Latency Msg', value: 'Real-Time RTDB' },
        { label: 'SEO Controls', value: 'Dynamic Helmet' },
        { label: 'Security', value: 'Right-Click Lock' }
      ],
      techStack: ['React 18', 'TypeScript', 'Vite 6', 'React Router v7', 'React Query v5', 'Redux Toolkit', 'Ant Design', 'Firebase v12', 'Sass', 'React Helmet Async', 'React Easy Crop'],
      challenge: 'Maintaining real-time low-latency direct chat relays and synchronizing user inactivity token renewals while securing profile images from download theft.',
      solution: 'Structured a hybrid Firebase setup (RTDB for chats, Firestore for threads), created an active window listener renewing expiring tokens on debounced mouse/keyboard events, and blocked contextual right-clicks on image tags.',
      contributions: 'Developed the hybrid Firebase chat module, sitemap build generator scripts, dynamic SEO parameter route mappings, and crop-assisted onboarding stages.',
      architecture: ['React (Vite 6)', 'Firebase RTDB/Firestore', 'SEO helmet controls', 'Custom Onboarding wizard'],
      results: 'Boosted user retention via instantaneous chat deliveries, eliminated auth expirations during active runs, and protected user photos from theft.'
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
            Things I've Built
          </h2>
        </div>

        {/* Project Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Side Tabs Selector */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 no-scrollbar select-none lg:sticky lg:top-8 self-start">
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
