import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ChevronRight, Code, CheckSquare, Zap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface BackendItem {
  name: string;
  years: string;
  projects: string[];
  bestPractice: string;
  performanceNote: string;
  optimizationMethod?: string;
  securityMethod?: string;
  performanceMethod?: string;
  snippet?: string;
  techniques?: string[];
  color: string;
}

export const BackendSkills: React.FC = () => {
  const { addAchievement } = usePortfolio();

  const backendData: Record<string, BackendItem> = {
    'REST APIs': {
      name: 'REST APIs & Node.js',
      years: '6+ Years',
      projects: ['City of Johannesburg Incident API', 'Triveni Telemetry Broker'],
      bestPractice: 'Enforce rate-limiting, request body validation schemas, and global error handling middlewares for secure API entry.',
      performanceNote: 'Implement Redis caching layers on read-heavy database routes to reduce server query loads from seconds to milliseconds.',
      optimizationMethod: 'Utilize gzip body compression middleware and HTTP connection keep-alive headers on node handlers.',
      securityMethod: 'Validate request bodies using strict schema parsers (Joi/Yup) and enforce rate-limiting bounds.',
      performanceMethod: 'Integrate memory cache (Redis) on active read pathways and scale execution nodes using PM2 clustering.',
      snippet: `// Express Controller with Joi Validation
app.post('/api/incidents', validateBody(incidentSchema), async (req, res, next) => {
  try {
    const report = await db.incidents.create(req.body);
    return res.status(201).json({ success: true, data: report });
  } catch (err) {
    next(err); // Trigger Global Error Handler
  }
});`,
      color: '#6C63FF'
    },
    'JWT Authentication': {
      name: 'JWT Auth & Security',
      years: '5 Years',
      projects: ['OLO Restaurant POS Portal', 'NextPort Supply Dashboard'],
      bestPractice: 'Store Access Tokens in short-lived local memory, and Refresh Tokens inside secure, httpOnly cookies to prevent XSS/CSRF exploits.',
      performanceNote: 'Verify token signatures locally in server middleware without query roundtrips to database nodes.',
      optimizationMethod: 'Deploy lightweight JWT signature checks in memory without database queries by caching encryption keys.',
      securityMethod: 'Enforce httpOnly, secure, and SameSite=Strict cookie configuration flags to protect refresh tokens.',
      performanceMethod: 'Pre-check client scopes locally inside middleware to offload processing queues from service engines.',
      techniques: [
        'Decoupled signature verification inside middleware without DB queries.',
        'Access tokens storage inside short-lived client local memory.',
        'Refresh token rotation mechanics using secure HTTPOnly cookies.',
        'Gatekeeper authorization validations protecting custom payload routes.'
      ],
      color: '#00D4FF'
    },
    'Amazon Cognito': {
      name: 'Amazon Cognito / AWS IAM',
      years: '3 Years',
      projects: ['City of Johannesburg Admin portal', 'Triveni Industrial telemetry'],
      bestPractice: 'Utilize User Pool groups to govern Role-Based Access Control (RBAC) and decouple resource access logic from backend engines.',
      performanceNote: 'Cache ID Token verifications inside request contexts to prevent API signature processing overhead on subsequent routes.',
      optimizationMethod: 'Verify JWT tokens locally using AWS verification libraries instead of calling remote Cognito keys endpoints.',
      securityMethod: 'Define strict IAM role permissions maps matching user pool custom attributes (RBAC).',
      performanceMethod: 'Deconstruct verified authentication claims into lambda context states to skip redundant decode cycles.',
      techniques: [
        'AWS Cognito User Pool group mappings for granular RBAC controls.',
        'Client-side token signature validations using aws-jwt-verify.',
        'Custom pre-token generation triggers to map database profiles.',
        'Cognito Identity Pool federations providing locked AWS IAM permissions.'
      ],
      color: '#FF4D8D'
    },
    Firebase: {
      name: 'Firebase Suite',
      years: '4 Years',
      projects: ['Happile Delivery Logistics tracker', 'PropertyOK listing system'],
      bestPractice: 'Establish granular Firestore Security Rules restricting read/write capabilities directly based on request auth profiles.',
      performanceNote: 'Use client-side local cache configurations to allow seamless offline queries and instantaneous interface loads.',
      optimizationMethod: 'Perform database bulk mutation queues using Firestore batched writes to save request latency.',
      securityMethod: 'Enforce item-level read/write permissions maps inside firestore.rules using request.auth.uid values.',
      performanceMethod: 'Activate Firestore client-side offline cache persistence libraries for instant render loops.',
      techniques: [
        'Firestore Security Rules maps restricting document access rights.',
        'Optimized client offline caching configurations for maps datasets.',
        'Real-time document synchronization brokers mapping updates.',
        'Cloud Functions event triggers on database node mutations.'
      ],
      color: '#00FFB3'
    }
  };

  const [activeItemName, setActiveItemName] = useState<string>('REST APIs');
  const activeItem = backendData[activeItemName];

  const handleSelect = (key: string) => {
    setActiveItemName(key);
    addAchievement('Backend Architect');
  };

  return (
    <section id="backend" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center overflow-hidden border-b border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-secondary/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>04. BACKEND SKILLS</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Backend Skills & Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left panel: Selector list */}
          <div className="lg:col-span-1 flex flex-col gap-3 select-none">
            {Object.entries(backendData).map(([key, item]) => {
              const isSelected = activeItemName === key;
              return (
                <button
                  key={item.name}
                  onClick={() => handleSelect(key)}
                  className={`w-full text-left px-5 py-4 rounded-2xl glass-panel glass-panel-hover flex items-center justify-between transition-all duration-300 border cursor-pointer ${
                    isSelected 
                      ? 'border-white text-white shadow-lg' 
                      : 'border-white/5 text-muted hover:text-white'
                  }`}
                  style={{ borderLeftColor: isSelected ? item.color : undefined, borderLeftWidth: isSelected ? '4px' : undefined }}
                >
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5" style={{ color: item.color }} />
                    <span className="font-sans font-bold text-sm">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{item.years}</span>
                </button>
              );
            })}
          </div>

          {/* Right panel: Details HUD card */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItemName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 rounded-2xl space-y-6 shadow-glass relative border border-white/10"
              >
                {/* Visual glow indicator */}
                <div 
                  className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: activeItem.color, boxShadow: `0 0 12px ${activeItem.color}` }}
                />

                {/* Header */}
                <div className="space-y-1 pb-4 border-b border-white/5">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest block">Backend Security Schema</span>
                  <h3 className="text-2xl md:text-3xl heading-premium text-white font-extrabold">{activeItem.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                  
                  {/* Patterns & Deployments */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Production Deployments</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.projects.map((proj) => (
                          <span key={proj} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/80 font-medium">
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 bg-white/3 border border-white/5 p-4 rounded-xl">
                      <span className="text-[10px] font-mono text-highlight uppercase tracking-wider flex items-center gap-1"><CheckSquare className="w-3.5 h-3.5" /> Best Practice</span>
                      <p className="text-xs text-muted font-sans leading-normal">{activeItem.bestPractice}</p>
                    </div>

                    <div className="space-y-1.5 bg-white/3 border border-white/5 p-4 rounded-xl">
                      <span className="text-[10px] font-mono text-secondary uppercase tracking-wider flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Performance Strategy</span>
                      <p className="text-xs text-muted font-sans leading-normal">{activeItem.performanceNote}</p>
                    </div>
                  </div>

                  {/* Code Snippet if present */}
                  {activeItem.snippet && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" />
                        <span>Schema controller</span>
                      </span>
                      <div className="rounded-xl overflow-hidden bg-bgMain border border-white/10 p-4 font-mono text-xs text-glow-primary text-primary-300 max-h-[220px] overflow-y-auto whitespace-pre">
                        {activeItem.snippet}
                      </div>
                    </div>
                  )}

                  {/* Core Techniques if present */}
                  {activeItem.techniques && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" />
                        <span>Core Techniques Mastered</span>
                      </span>
                      <div className="bg-bgMain border border-white/10 rounded-xl p-4 space-y-2 text-xs font-mono text-muted select-none">
                        {activeItem.techniques.map((tech) => (
                          <div key={tech} className="flex items-start gap-2">
                            <span className="text-highlight font-bold select-none">›</span>
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Top Methods Spanning Panel Width */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  {activeItem.optimizationMethod && (
                    <div className="bg-white/3 border border-white/5 rounded-xl p-4 space-y-1">
                      <div className="text-[10px] font-mono text-glow-primary text-primary-200 uppercase tracking-widest flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-secondary animate-pulse" />
                        <span>Optimization</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{activeItem.optimizationMethod}</p>
                    </div>
                  )}

                  {activeItem.securityMethod && (
                    <div className="bg-white/3 border border-white/5 rounded-xl p-4 space-y-1">
                      <div className="text-[10px] font-mono text-glow-primary text-primary-200 uppercase tracking-widest flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-highlight" />
                        <span>Security Guard</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{activeItem.securityMethod}</p>
                    </div>
                  )}

                  {activeItem.performanceMethod && (
                    <div className="bg-white/3 border border-white/5 rounded-xl p-4 space-y-1">
                      <div className="text-[10px] font-mono text-glow-primary text-primary-200 uppercase tracking-widest flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-primary" />
                        <span>Performance</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{activeItem.performanceMethod}</p>
                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
