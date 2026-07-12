import React, { useState } from 'react';
import { 
  Folder, FolderOpen, FileCode, ChevronDown, ChevronRight,
  GitBranch, ShieldAlert, Check, RefreshCw, X
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectFile {
  name: string;
  path: string;
  language: string;
  content: string;
}

export const Experience: React.FC = () => {
  const { addAchievement } = usePortfolio();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    root: true,
    aufait: true,
    neoito: false,
    talrop: false,
  });

  const files: Record<string, ProjectFile> = {
    'README.md': {
      name: 'README.md',
      path: 'JASIR_DEV/README.md',
      language: 'markdown',
      content: `# JASIR T P - Senior Software Engineer

Explore my career trajectory by clicking on files in the sidebar explorer.
Each file represents a significant project I engineered and delivered.

## Summary of Expertise:
* Frameworks: React, Next.js, React Native, Vue
* Logic: TypeScript, Redux Toolkit, React Query, Zustand
* Styling & Motion: TailwindCSS, Framer Motion, GSAP, Three.js
* Focus Areas: SaaS platforms, admin consoles, incident systems, UI systems, dashboard design.

Select a project file in the tree to examine core metrics, architectures, and challenges.`
    },
    'csdAdminWebApp.ts': {
      name: 'csdAdminWebApp.ts',
      path: 'JASIR_DEV/aufait-technologies/csdAdminWebApp.ts',
      language: 'typescript',
      content: `import { AdminPortal } from 'core/municipal';

export const csdAdminWebApp: AdminPortal = {
  client: "City of Johannesburg Municipality",
  role: "Lead Frontend Engineer / Architect",
  impact: "Enterprise administrative portal for municipal wards, news, notifications, and incident reporting.",
  metrics: {
    modulesCovered: "8 Major Modules",
    loginAccess: "Dual-Channel (Standard / Azure AD SSO)",
    securityLevel: "AES-Encrypted LocalStorage RBAC"
  },
  techStack: [
    "React 18", "Vite 5", "Ant Design v5", "Redux Toolkit",
    "Sass", "Axios", "Azure MSAL", "CryptoJS", "date-fns"
  ],
  architecture: "Redux-driven dashboard governed by Microsoft MSAL authorization and activity listeners.",
  challenges: "Ensuring continuous session integrity and preventing client-side permission tampering in local storage.",
  solutions: [
    "Integrated MSAL Browser SSO and credentials auth, configured with inactivity-debounced JWT auto-refreshers inside AuthWrapper.",
    "Engineered AES encryption utilities using CryptoJS to encode localStorage RBAC permission profiles.",
    "Created role-based module matrices covering roles, news, notification destinations, councillors, and incidents.",
    "Configured automated non-prod and prod AWS Cape Town region deployment pipelines via Terragrunt."
  ]
};`
    },
    'csdPikitupAdminWeb.ts': {
      name: 'csdPikitupAdminWeb.ts',
      path: 'JASIR_DEV/aufait-technologies/csdPikitupAdminWeb.ts',
      language: 'typescript',
      content: `import { AdminConsole } from 'core/onboarding';

export const csdPikitupAdminWeb: AdminConsole = {
  client: "Pikitup Johannesburg",
  role: "Senior Frontend Engineer",
  impact: "Operational administration panel for solid waste & fleet incident management.",
  metrics: {
    fleetTracked: "300+ Active Trucks",
    ticketResolution: "5k+ Daily Incident Reports",
    authSecurity: "Two-step Client/User Sign-In"
  },
  techStack: [
    "React 18", "TypeScript", "Vite 7", "Ant Design v5",
    "TailwindCSS v4", "React Query v5", "Sass", "Axios", "GSAP"
  ],
  architecture: "Role-based access gated dashboard with dynamic cookie-stored JWT sessions.",
  challenges: "Managing granular permission checks and automatic non-blocking access token refreshing.",
  solutions: [
    "Engineered ProtectedRoute guards synchronized with permission levels (view, edit, assign, merge) and integer module mappings.",
    "Configured custom auto-session refresh hook scheduling silent token retrieval 5 minutes prior to JWT expiration.",
    "Built modular components (drawers, modals, search dropdowns, charts) in Vite, optimized for light/dark display and GSAP transitions.",
    "Established automated AWS Cape Town regional deployments using Terragrunt and encrypted S3 state backends."
  ]
};`
    },
    'TriveniTurbine.ts': {
      name: 'TriveniTurbine.ts',
      path: 'JASIR_DEV/aufait-technologies/TriveniTurbine.ts',
      language: 'typescript',
      content: `import { IndustrialSaaS } from 'core/heavy-engineering';

export const TriveniTurbine: IndustrialSaaS = {
  impact: "IoT dashboard displaying industrial steam turbine telemetry.",
  role: "Senior React Developer",
  techStack: ["Next.js", "Redux Toolkit", "Ant Design", "Chart.js", "WebSockets"],
  metrics: {
    telemetryRefreshRate: "Real-time, <100ms lag",
    dataPointsTracked: "50+ physical sensors per turbine"
  },
  challenges: "Rendering canvas-based high-frequency vibration graphs without stuttering.",
  solutions: [
    "Utilized requestAnimationFrame pipelines for canvas grid graphing.",
    "Debounced socket inputs and mapped state inside local non-re-rendering refs."
  ]
};`
    },
    'OLOPortal.ts': {
      name: 'OLOPortal.ts',
      path: 'JASIR_DEV/aufait-technologies/OLOPortal.ts',
      language: 'typescript',
      content: `import { Ecommerce } from 'core/retail';

export const OLOPortal: Ecommerce = {
  impact: "Enterprise SaaS restaurant management & ordering platform.",
  role: "Senior Frontend Engineer",
  techStack: ["React", "Redux", "Chakra UI", "Stripe API", "WhatsApp API"],
  contributions: [
    "Designed and engineered POS checkout logic.",
    "Created real-time SMS/WhatsApp customer notification triggers."
  ]
};`
    },
    'DesignSystemSaaS.ts': {
      name: 'DesignSystemSaaS.ts',
      path: 'JASIR_DEV/aufait-technologies/DesignSystemSaaS.ts',
      language: 'typescript',
      content: `import { UIPlatform } from 'core/design';

export const DesignSystemSaaS: UIPlatform = {
  impact: "Centralized atomic UI design framework utilized by multiple teams.",
  role: "Lead UI System Creator",
  techStack: ["React", "TypeScript", "TailwindCSS", "Vite", "Rollup", "Storybook"],
  componentsAuthored: ["Modals", "Data Tables", "Tilt Containers", "Forms"],
  results: [
    "Reduced new feature dev cycle by 35% across the organization.",
    "Standardized color contrast & screen-reader tags for WCAG AA compliance."
  ]
};`
    },
    'ttlSolverWrapper.ts': {
      name: 'ttlSolverWrapper.ts',
      path: 'JASIR_DEV/aufait-technologies/ttlSolverWrapper.ts',
      language: 'typescript',
      content: `import { NestingSolvers } from 'core/geometry-engines';

export const ttlSolverWrapper: NestingSolvers = {
  client: "Aufait Internal Solver Console",
  role: "Lead Frontend Developer",
  impact: "Management interface to configure, execute, monitor, and compare CAD sheet nesting and geometry cutting solvers.",
  metrics: {
    userAccessControl: "RBAC (Engineer/Admin roles)",
    editorDesign: "Split Monaco Editor Tabs",
    visualizerPerformance: "WebGL CAD rendering via three.js"
  },
  techStack: [
    "React 18", "TypeScript", "Vite 7", "Ant Design v5",
    "React Query v5", "Sass", "Monaco Editor", "three.js", "JSZip"
  ],
  architecture: "Multi-tab config editor with custom encoding detection and WebGL rendering overlays.",
  challenges: "Displaying 2D/3D CAD drawing files directly in-browser and decoding legacy binary/text formats safely.",
  solutions: [
    "Integrated dxf-viewer + three.js vector engine to parse dynamic DXF layers with zoom/pan and light/dark theme matching.",
    "Engineered robust buffer decoder utilizing smart encoding hooks for ISO-8859-1, UTF-8, and UTF-16 arrays.",
    "Designed a split-screen side-by-side Monaco diff-editor layout for configuration and log files run comparison.",
    "Authored centralized Axios instance with error interceptors handling immediate user token expiries."
  ]
};`
    },
    'mployedinFrontendWebUser.ts': {
      name: 'mployedinFrontendWebUser.ts',
      path: 'JASIR_DEV/aufait-technologies/mployedinFrontendWebUser.ts',
      language: 'typescript',
      content: `import { RecruitmentSaaS } from 'core/recruitment';

export const mployedinFrontendWebUser: RecruitmentSaaS = {
  client: "EmployedIn Global",
  role: "Senior Frontend Engineer / Architect",
  impact: "Multi-role recruitment platform connecting Job Seekers, Employers, Agents, and Super Agents.",
  metrics: {
    userActors: "5 Roles (GST, JS, EMP, AGT, SA)",
    uiLibrary: "Ant Design v6 & Lucide",
    performance: "Vite 8 + React 19 bundle compilation"
  },
  techStack: [
    "React 19", "TypeScript 6", "Vite 8", "Ant Design v6",
    "TailwindCSS v4", "Redux Toolkit", "React Query v5", "Axios", "oxlint"
  ],
  architecture: "Decoupled frontend layout mapping custom role-based redirects and masquerading permissions.",
  challenges: "Orchestrating authentication state syncing, post-login redirect interception, and dynamic dark mode algorithms.",
  solutions: [
    "Built a React Router 7 protected layout guard utilizing user profile permission matrices.",
    "Integrated Redux Toolkit theme slice with Ant Design token algorithms for system-wide light/dark synchronizations.",
    "Configured custom Axios instances with request authorization injects and response auto-logout interceptors.",
    "Designed a sandboxed mock profile login interface to test workflows (CV-parsing, auto-applying, interview preps) locally."
  ]
};`
    },
    'redmineCrmPortal.ts': {
      name: 'redmineCrmPortal.ts',
      path: 'JASIR_DEV/aufait-technologies/redmineCrmPortal.ts',
      language: 'typescript',
      content: `import { CrmProxy } from 'core/crm-integration';

export const redmineCrmPortal: CrmProxy = {
  client: "Aufait Support CRM",
  role: "Senior React Developer",
  impact: "Modernized Enterprise CRM interface proxying legacy Redmine ticket trackers.",
  metrics: {
    stateQuirk: "Double-space localStorage key ('  ')",
    visualizer: "Recharts active analytics charts",
    compilation: "Vite 6 + React 19 compilation"
  },
  techStack: [
    "React 19", "TypeScript 5", "Vite 6", "Redux Toolkit v2",
    "React Query v5", "TailwindCSS v3", "Axios v1", "Recharts"
  ],
  architecture: "URL parameter-synced search boards and Axios interceptor token refresh queue networks.",
  challenges: "Managing legacy Redmine path trailing slashes, 403 request pauses during refresh cycles, and file download byte streams.",
  solutions: [
    "Configured custom apiClient request/response interceptors to catch 403 Forbidden, pause calls, refresh tokens, and replay queues.",
    "Engineered RedmineService path sanitizers to dynamically strip '.json' structures and enforce endpoint trailing slashes.",
    "Mapped selected workspace session state under Redux using literal double-space string ('  ') localStorage keys.",
    "Synced TicketList filters (status, trackers, priorities) with useSearchParams hooks to support shareable URLs."
  ]
};`
    },
    'click4MarryAdmin.ts': {
      name: 'click4MarryAdmin.ts',
      path: 'JASIR_DEV/aufait-technologies/click4MarryAdmin.ts',
      language: 'typescript',
      content: `import { VerificationCRM } from 'core/crm-verification';

export const click4MarryAdmin: VerificationCRM = {
  client: "Click4Marry Matrimonial Group",
  role: "Senior React Developer",
  impact: "Enterprise administrative portal and RBAC controller for a 200k+ user matrimonial service.",
  metrics: {
    modulesProtected: "20 Module IDs",
    verificationPipelines: "Photo, ID, coordinates validation",
    routingEngine: "React Router v7 Route Authorization Engine"
  },
  techStack: [
    "React 18", "TypeScript", "Vite 6", "React Router v7",
    "React Query v5", "Ant Design v5", "TailwindCSS v4", "CryptoJS", "ApexCharts"
  ],
  architecture: "AES-encrypted localStorage storage permission structures linked to dynamic route interceptors.",
  challenges: "Preventing manual storage manipulation of user privileges while handling multi-step physical and photo verifications.",
  solutions: [
    "Integrated CryptoJS AES-encryption utilizing VITE_ENCRYPTION_KEY to secure permission payloads locally.",
    "Engineered a route permission interceptor (permissionCheck.ts) validation check covering 20 module IDs and telecaller route overrides.",
    "Authored customized Axios timezone headers and success/error filters mapping payload state directly to React Query pipelines.",
    "Built modular dashboard summaries utilizing interactive ApexCharts layouts and FullCalendar schedule trackers."
  ]
};`
    },
    'click4MarryUser.ts': {
      name: 'click4MarryUser.ts',
      path: 'JASIR_DEV/aufait-technologies/click4MarryUser.ts',
      language: 'typescript',
      content: `import { UserPortal } from 'core/crm-userportal';

export const click4MarryUser: UserPortal = {
  client: "Click4Marry Matrimonial Group",
  role: "Senior React Developer",
  impact: "Consumer-facing web portal for Life Partners search, real-time chats, and premium plans purchasing.",
  metrics: {
    chatLatency: "Real-time RTDB relays (<50ms)",
    seoOptimization: "100% crawl-ready with private feeds blocked",
    photoSecurity: "Global contextmenu lock on image theft"
  },
  techStack: [
    "React 18", "Vite 6.2", "React Router DOM v7", "React Query v5",
    "Redux Toolkit", "Ant Design", "Firebase v12", "Sass", "React Helmet Async"
  ],
  architecture: "Hybrid Firebase layout (Firestore configuration and RTDB messages relaying) with dynamic SEO head injections.",
  challenges: "Managing user active token renewals on page interactions, preventing photos download theft, and building dynamic SEO heads.",
  solutions: [
    "Configured custom PrivateRoute listeners detecting user interactions (clicks, keyboard) to trigger useRefreshToken mutations on remaining time <= 10m.",
    "Integrated dynamic Helmet headers querying seo-data routing matrices, automatically appending noindex/nofollow tags on private dashboards.",
    "Established a global contextmenu block on all HTML img elements to protect customer matrimonial profile photos from download theft.",
    "Developed a sitemap generation pre-build script compiling sitemap.xml endpoints directly to the public build directory."
  ]
};`
    },
    'PropertyOK.ts': {
      name: 'PropertyOK.ts',
      path: 'JASIR_DEV/neoito-technologies/PropertyOK.ts',
      language: 'typescript',
      content: `import { ListingPortal } from 'core/real-estate';

export const PropertyOK: ListingPortal = {
  impact: "Fast real-estate listing search engine and builder panel.",
  role: "Software Engineer",
  techStack: ["React", "Redux", "Material UI", "Google Maps API"],
  contributions: "Engineered multi-layer filter query builders for high-speed estate matching."
};`
    },
    'HappileLogistics.ts': {
      name: 'HappileLogistics.ts',
      path: 'JASIR_DEV/neoito-technologies/HappileLogistics.ts',
      language: 'typescript',
      content: `import { LogisticsApp } from 'core/delivery';

export const HappileLogistics: LogisticsApp = {
  impact: "Enterprise delivery tracker and route optimization panel.",
  role: "Frontend Engineer",
  techStack: ["React", "TypeScript", "Context API", "Restful API Integration"],
  results: "Designed interactive timeline track status from depot load to door delivery."
};`
    },
    'NextPortSaaS.ts': {
      name: 'NextPortSaaS.ts',
      path: 'JASIR_DEV/talrop/NextPortSaaS.ts',
      language: 'typescript',
      content: `import { PortLogistics } from 'core/supply-chain';

export const NextPortSaaS: PortLogistics = {
  impact: "Container shipment scheduler and dock billing control panel.",
  role: "Junior Web Developer",
  techStack: ["React", "Redux", "Bootstrap"],
  learnings: "Gained core fundamentals in asynchronous state handling and API paging controls."
};`
    }
  };

  const [activeFile, setActiveFile] = useState<string>('README.md');
  const [openTabs, setOpenTabs] = useState<string[]>(['README.md']);

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const selectFile = (fileName: string) => {
    setActiveFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName]);
    }
    // Secret achievement when clicking all files
    if (openTabs.length >= Object.keys(files).length - 1) {
      addAchievement('Source Code Reader');
    }
  };

  const closeTab = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(nextTabs);
    if (activeFile === fileName && nextTabs.length > 0) {
      setActiveFile(nextTabs[nextTabs.length - 1]);
    } else if (nextTabs.length === 0) {
      setActiveFile('README.md');
      setOpenTabs(['README.md']);
    }
  };

  // Basic syntax highlighter helper
  const renderCode = (code: string) => {
    return code.split('\n').map((line, index) => {
      // Very simple parsing for keywords, types, strings, comments
      const parsedLine = line
        .replace(/(\/\/.+)/g, '<span class="text-muted italic">$1</span>') // Comments
        .replace(/(import|export|const|from|return|interface|type)\b/g, '<span class="text-accent font-semibold">$1</span>') // Keywords
        .replace(/(string|number|boolean|Project|IndustrialSaaS|Ecommerce|UIPlatform|ListingPortal|LogisticsApp|PortLogistics|AdminConsole|NestingSolvers|RecruitmentSaaS|AdminPortal|CrmProxy|VerificationCRM|UserPortal)\b/g, '<span class="text-secondary">$1</span>') // Types
        .replace(/(".*?"|'.*?')/g, '<span class="text-highlight font-medium">$1</span>') // Strings
        .replace(/(\w+)(?=\s*:|\s*\?\s*:)/g, '<span class="text-primary font-medium">$1</span>') // Object keys
        .replace(/(\b\w+\b)(?=\s*\()/g, '<span class="text-indigo-300">$1</span>'); // Method calls

      return (
        <div key={index} className="flex hover:bg-white/5 px-4 font-mono text-xs md:text-sm leading-relaxed">
          <span className="w-10 text-right pr-4 text-white/20 select-none border-r border-white/5 mr-4">{index + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: parsedLine || '&nbsp;' }} />
        </div>
      );
    });
  };

  return (
    <section id="experience" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>02. WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Where I've Worked
          </h2>
        </div>

        {/* Mock VS Code Frame */}
        <div className="w-full rounded-xl overflow-hidden glass-panel flex flex-col h-[600px] shadow-2xl border border-white/10">
          
          {/* Header Row */}
          <div className="h-9 bg-bgMain flex items-center justify-between px-4 border-b border-white/10 select-none">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent/80" />
              <div className="w-3 h-3 rounded-full bg-secondary/80" />
              <div className="w-3 h-3 rounded-full bg-highlight/80" />
            </div>
            <div className="text-[11px] font-mono text-muted tracking-wider">
              jasir-tp - Visual Studio Code
            </div>
            <div className="w-8" />
          </div>

          {/* Editor Workspace Container */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar Explorer */}
            {sidebarVisible && (
              <div className="w-56 md:w-64 bg-bgMain/40 border-r border-white/10 flex flex-col select-none overflow-y-auto no-scrollbar">
              <div className="px-4 py-2 text-[10px] font-mono text-muted uppercase font-bold tracking-widest flex items-center justify-between border-b border-white/5">
                <span>Explorer</span>
                <ChevronDown className="w-3 h-3" />
              </div>

              {/* Folders Tree */}
              <div className="p-2 space-y-1 font-mono text-xs text-muted">
                
                {/* Root Workspace */}
                <div>
                  <button 
                    onClick={() => toggleFolder('root')}
                    className="w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 text-white/80"
                  >
                    {openFolders.root ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    {openFolders.root ? <FolderOpen className="w-4 h-4 text-primary" /> : <Folder className="w-4 h-4 text-primary" />}
                    <span>JASIR_DEV</span>
                  </button>

                  {openFolders.root && (
                    <div className="pl-4 border-l border-white/5 ml-3 mt-1 space-y-1">
                      
                      {/* README file */}
                      <button 
                        onClick={() => selectFile('README.md')}
                        className={`w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 ${activeFile === 'README.md' ? 'bg-white/5 text-highlight font-semibold' : 'text-muted'}`}
                      >
                        <FileCode className="w-3.5 h-3.5 text-accent" />
                        <span>README.md</span>
                      </button>

                      {/* Aufait Folder */}
                      <div>
                        <button 
                          onClick={() => toggleFolder('aufait')}
                          className="w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 text-white/80"
                        >
                          {openFolders.aufait ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          {openFolders.aufait ? <FolderOpen className="w-4 h-4 text-secondary" /> : <Folder className="w-4 h-4 text-secondary" />}
                          <span>aufait-technologies</span>
                        </button>

                        {openFolders.aufait && (
                          <div className="pl-4 border-l border-white/5 ml-3 mt-1 space-y-1">
                             {['csdAdminWebApp.ts', 'csdPikitupAdminWeb.ts', 'click4MarryAdmin.ts', 'click4MarryUser.ts', 'ttlSolverWrapper.ts', 'mployedinFrontendWebUser.ts', 'redmineCrmPortal.ts', 'TriveniTurbine.ts', 'OLOPortal.ts', 'DesignSystemSaaS.ts'].map((fileName) => (
                              <button 
                                key={fileName}
                                onClick={() => selectFile(fileName)}
                                className={`w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 ${activeFile === fileName ? 'bg-white/5 text-highlight font-semibold' : 'text-muted'}`}
                              >
                                <FileCode className="w-3.5 h-3.5 text-secondary" />
                                <span>{fileName}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* NeoITO Folder */}
                      <div>
                        <button 
                          onClick={() => toggleFolder('neoito')}
                          className="w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 text-white/80"
                        >
                          {openFolders.neoito ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          {openFolders.neoito ? <FolderOpen className="w-4 h-4 text-accent" /> : <Folder className="w-4 h-4 text-accent" />}
                          <span>neoito</span>
                        </button>

                        {openFolders.neoito && (
                          <div className="pl-4 border-l border-white/5 ml-3 mt-1 space-y-1">
                            {['PropertyOK.ts', 'HappileLogistics.ts'].map((fileName) => (
                              <button 
                                key={fileName}
                                onClick={() => selectFile(fileName)}
                                className={`w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 ${activeFile === fileName ? 'bg-white/5 text-highlight font-semibold' : 'text-muted'}`}
                              >
                                <FileCode className="w-3.5 h-3.5 text-accent" />
                                <span>{fileName}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Talrop Folder */}
                      <div>
                        <button 
                          onClick={() => toggleFolder('talrop')}
                          className="w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 text-white/80"
                        >
                          {openFolders.talrop ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          {openFolders.talrop ? <FolderOpen className="w-4 h-4 text-highlight" /> : <Folder className="w-4 h-4 text-highlight" />}
                          <span>talrop</span>
                        </button>

                        {openFolders.talrop && (
                          <div className="pl-4 border-l border-white/5 ml-3 mt-1 space-y-1">
                            {['NextPortSaaS.ts'].map((fileName) => (
                              <button 
                                key={fileName}
                                onClick={() => selectFile(fileName)}
                                className={`w-full flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-white/5 ${activeFile === fileName ? 'bg-white/5 text-highlight font-semibold' : 'text-muted'}`}
                              >
                                <FileCode className="w-3.5 h-3.5 text-highlight" />
                                <span>{fileName}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>
            )}

            {/* Main Code Editor Panel */}
            <div className="flex-1 flex flex-col bg-bgMain/10 overflow-hidden">
              
              {/* Tab Bar */}
              <div className="h-9 bg-bgMain/60 border-b border-white/10 flex items-center px-2 select-none overflow-x-auto no-scrollbar">
                
                {/* Explorer Toggle Button */}
                <button
                  onClick={() => setSidebarVisible(!sidebarVisible)}
                  className="p-1.5 mr-2 rounded hover:bg-white/5 text-muted hover:text-white transition-colors flex-shrink-0 flex items-center justify-center cursor-pointer"
                  title={sidebarVisible ? "Collapse Explorer" : "Expand Explorer"}
                >
                  {sidebarVisible ? <Folder className="w-3.5 h-3.5" /> : <FolderOpen className="w-3.5 h-3.5 text-secondary text-glow-secondary" />}
                </button>
                {openTabs.map((tabName) => (
                  <div
                    key={tabName}
                    onClick={() => setActiveFile(tabName)}
                    className={`flex items-center gap-1.5 px-3 h-full border-r border-white/10 text-xs font-mono cursor-pointer transition-colors duration-200 ${
                      activeFile === tabName 
                        ? 'bg-bgMain/20 text-white border-t-2 border-t-primary' 
                        : 'text-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-secondary" />
                    <span>{tabName}</span>
                    <button 
                      onClick={(e) => closeTab(tabName, e)}
                      className="p-0.5 rounded hover:bg-white/10 transition-colors"
                    >
                      <X className="w-3 h-3 text-muted hover:text-white" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Code viewer workspace */}
              <div className="flex-1 overflow-y-auto py-4 bg-[#0a0f1e]/40">
                <div className="whitespace-pre">
                  {renderCode(files[activeFile]?.content || '')}
                </div>
              </div>

            </div>

          </div>

          {/* VS Code Bottom Bar */}
          <div className="h-6 bg-primary flex items-center justify-between px-4 text-[10px] font-mono text-bgMain font-semibold select-none z-10 shadow-inner">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 px-1 py-0.5 bg-white/10 rounded cursor-pointer hover:bg-white/20 transition-colors">
                <GitBranch className="w-3.5 h-3.5" />
                <span>main</span>
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Synchronized</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>0 errors</span>
              </span>
              <span>UTF-8</span>
              <span>TypeScript React</span>
              <span className="flex items-center gap-1 text-glow-primary">
                <Check className="w-3.5 h-3.5" />
                <span>Prettier Active</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
