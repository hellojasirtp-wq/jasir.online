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
    'CityOfJohannesburg.ts': {
      name: 'CityOfJohannesburg.ts',
      path: 'JASIR_DEV/aufait-technologies/CityOfJohannesburg.ts',
      language: 'typescript',
      content: `import { Project } from 'core/journey';

export const CityOfJohannesburg: Project = {
  client: "City of Johannesburg Municipality",
  role: "Lead Frontend Engineer / Architect",
  impact: "SaaS platform governing municipal safety and logistics reporting.",
  metrics: {
    incidentTrackingSpeed: "+45% Efficiency",
    activeUsersCount: "100k+ Citizen complaints handled daily",
    uptimeGoal: "99.9%"
  },
  techStack: [
    "React", "TypeScript", "TailwindCSS", 
    "React Query", "Google Maps API", "Context API"
  ],
  architecture: "Monorepo workspace with modular geo-tracking and lazy dashboard panels.",
  challenges: "Handling real-time citizen-submitted incident coordinates without UI lag.",
  solutions: [
    "Implemented virtualized grid maps for heavy geospatial marker points.",
    "Integrated web-worker clusters to handle marker clustering logic in background threads.",
    "Engineered robust offline logging queue that syncs when network is restored."
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
        .replace(/(string|number|boolean|Project|IndustrialSaaS|Ecommerce|UIPlatform|ListingPortal|LogisticsApp|PortLogistics)\b/g, '<span class="text-secondary">$1</span>') // Types
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
            <span>02. THE IDE EXPERIENCE</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Interactive Journey Explorer
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
                            {['CityOfJohannesburg.ts', 'TriveniTurbine.ts', 'OLOPortal.ts', 'DesignSystemSaaS.ts'].map((fileName) => (
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
