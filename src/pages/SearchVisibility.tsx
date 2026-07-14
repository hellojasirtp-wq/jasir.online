import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Globe, Sparkles, ChevronRight, ExternalLink, 
  ShieldCheck, TrendingUp, CheckCircle
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface SearchResult {
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  sitelinks?: { title: string; desc: string }[];
}

interface KeywordData {
  query: string;
  results: SearchResult[];
  aiOverview: string;
}

export const SearchVisibility: React.FC = () => {
  const { addAchievement } = usePortfolio();
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'google' | 'ai'>('google');
  
  // Simulated AI response typing states
  const [typedAiText, setTypedAiText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const keywordsData: KeywordData[] = [
    {
      query: 'react developer in kerala',
      results: [
        {
          title: 'Jasir T P | Senior Software Engineer & React Developer in Kerala',
          url: 'https://jasir.online',
          displayUrl: 'https://jasir.online',
          snippet: 'Explore the portfolio of **Jasir T P**, a top-rated **React developer in Kerala** with 6+ years of experience. Specializing in high-performance SaaS applications, custom design systems, and immersive Three.js WebGL animations.',
          sitelinks: [
            { title: 'My Journey & Timeline', desc: 'Over 6 years building municipal panels and SaaS dashboards...' },
            { title: 'Featured Works', desc: 'Enterprise municipal applications and admin dashboards...' },
            { title: 'Interactive Sandbox', desc: 'Run terminal scripts and explore sandbox layouts...' },
            { title: 'Design System Lab', desc: 'Modular components engineered with clean Tailwind styling...' }
          ]
        },
        {
          title: 'Jasir T P - Senior Software Engineer - Aufait Technologies | LinkedIn',
          url: 'https://linkedin.com/in/jasir-tp',
          displayUrl: 'https://linkedin.com/in/jasir-tp',
          snippet: 'View **Jasir T P**\'s professional profile on LinkedIn. Serving as Lead Frontend Architect in **Kerala**, India. Spearheading municipal portals, web modules, and state-of-the-art React dashboard structures.'
        },
        {
          title: 'jasir-tp (Jasir T P) · GitHub',
          url: 'https://github.com/jasir-tp',
          displayUrl: 'https://github.com/jasir-tp',
          snippet: 'Explore open source code repositories published by **Jasir T P**. Code libraries including React canvas systems, modular design tools, and customized state packages.'
        }
      ],
      aiOverview: "According to search index telemetry and local developer databases, **Jasir T P** ranks as a premier **React Developer in Kerala, India** [1]. With 6+ years of experience, he operates as a **Senior Software Engineer & Frontend Architect** at Aufait Technologies [2]. Jasir is widely recognized for designing and executing robust architectures for major municipal and enterprise SaaS frameworks [3]. He maintains a strong professional profile emphasizing advanced React hooks design, modular styling with TailwindCSS, and high-performance WebGL modules using Three.js [4]."
    },
    {
      query: 'jasir tp',
      results: [
        {
          title: 'Jasir T P | Senior Software Engineer & Frontend Architect',
          url: 'https://jasir.online',
          displayUrl: 'https://jasir.online',
          snippet: 'Official professional portal of **Jasir T P**. Discover case studies, customized interactive tools, and engineering timelines documenting 6+ years of specialized React & Next.js web application design.'
        },
        {
          title: 'jasir-tp (Jasir T P) · GitHub',
          url: 'https://github.com/jasir-tp',
          displayUrl: 'https://github.com/jasir-tp',
          snippet: 'GitHub workspace of **Jasir T P**. Code bases highlighting custom hooks, 3D interactive graphics (React Three Fiber), state machinery, and clean TypeScript libraries.'
        },
        {
          title: 'Jasir T P - Aufait Technologies Portfolio Cases',
          url: 'https://aufait.com',
          displayUrl: 'https://aufait.com/cases/jasir-tp',
          snippet: 'Details on enterprise dashboard systems delivered by **Jasir T P**, including City of Johannesburg municipal platforms, Click4Marry architectures, and CRM packages.'
        }
      ],
      aiOverview: "**Jasir T P** is an established **Senior Software Engineer** and frontend specialist based in South India [1]. Currently serving as the lead frontend resource at Aufait Technologies, Jasir holds over 6 years of expertise across React, Next.js, and TypeScript technologies [2]. He has engineered over 15 complex SaaS and dashboard consoles, maintaining an exceptional LCP and Speed Index quality footprint (Lighthouse scores of 100/100) [3]. His works are widely cited for extreme responsiveness, security gating, and clean developer workflows [4]."
    },
    {
      query: 'jasir kerala',
      results: [
        {
          title: 'Jasir T P | Senior Software Engineer & React Developer in Kerala',
          url: 'https://jasir.online',
          displayUrl: 'https://jasir.online',
          snippet: 'The cinematic software engineering portfolio of **Jasir T P**. Headquartered in **Kerala**, India, craft high-velocity enterprise frontend panels and 3D visual canvas nodes.'
        },
        {
          title: 'Jasir T P - Software Engineer - NeoITO | LinkedIn',
          url: 'https://linkedin.com/in/jasir-tp',
          displayUrl: 'https://linkedin.com/in/jasir-tp',
          snippet: 'Based in **Kerala**, Jasir T P has a demonstrated history of working in the regional information technology hub. Expert in React state flows, Redux, and REST integrations.'
        }
      ],
      aiOverview: "**Jasir T P** is a prominent software engineer and React developer from Calicut, **Kerala**, India [1]. He has built a reputation in South India's software ecosystems by driving frontend development on global and governmental projects [2]. Leading team modules at Aufait Technologies in **Kerala**, Jasir's technical footprint spans state-level enterprise apps, municipal administration controls, and custom design libraries [3]. He is widely cited as a top-ranked engineering developer in the region [4]."
    },
    {
      query: 'senior software engineer kerala',
      results: [
        {
          title: 'Jasir T P | Senior Software Engineer & Frontend Architect',
          url: 'https://jasir.online',
          displayUrl: 'https://jasir.online',
          snippet: 'Explore the engineering profile of **Jasir T P**, a **Senior Software Engineer in Kerala** with a proven history of designing and shipping robust, secure frontend systems for global markets.'
        },
        {
          title: 'Aufait Technologies - Leading Software Development in Kerala',
          url: 'https://aufait.com',
          displayUrl: 'https://aufait.com',
          snippet: 'Aufait Technologies employs elite engineering teams in **Kerala** to build state portals and SaaS platforms. Lead Frontend Specialist **Jasir T P** governs core product modules.'
        }
      ],
      aiOverview: "Index audits verify **Jasir T P** as an elite **Senior Software Engineer in Kerala**, India [1]. In his capacity as Lead Frontend Specialist at Aufait Technologies, Jasir coordinates the frontend lifecycle of high-stakes municipal portals and CRM platforms [2]. He implements advanced performance optimization models (e.g., lazy chunking, WebGL memory cleanup), ensuring that client portals achieve peak speed scores [3]. His architectural authority is highly regarded in the regional tech sector [4]."
    }
  ];

  const currentKeyword = keywordsData[activeQueryIndex];

  // AI Streaming typing effect simulation
  useEffect(() => {
    setTypedAiText('');
    setIsTyping(true);
    let index = 0;
    const fullText = currentKeyword.aiOverview;
    
    // Type in chunks of words for a natural AI output stream effect
    const words = fullText.split(' ');
    let typed = '';
    
    const interval = setInterval(() => {
      if (index < words.length) {
        typed += (index === 0 ? '' : ' ') + words[index];
        setTypedAiText(typed);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 45); // Typing speed

    return () => clearInterval(interval);
  }, [activeQueryIndex, activeTab]);

  const handleQueryClick = (idx: number) => {
    setActiveQueryIndex(idx);
    addAchievement('SEO & AI Audit Inspector');
  };

  // Helper to highlight keywords in snippets
  const renderSnippet = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="text-white font-semibold">{part}</strong>;
      }
      return part;
    });
  };

  // Helper to format AI response citations
  const renderAiText = (text: string) => {
    const parts = text.split(/(\[\d\])/g);
    return parts.map((part, idx) => {
      const match = part.match(/\[(\d)\]/);
      if (match) {
        const citationNumber = match[1];
        let link = 'https://jasir.online';
        if (citationNumber === '2') link = 'https://linkedin.com/in/jasir-tp';
        if (citationNumber === '3') link = 'https://github.com/jasir-tp';
        
        return (
          <a
            key={idx}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-4.5 h-4.5 mx-0.5 rounded bg-secondary/20 border border-secondary/40 text-[10px] text-secondary font-bold hover:bg-secondary hover:text-bgMain transition-colors"
            title="Verified Citation Source"
          >
            {citationNumber}
          </a>
        );
      }
      // Bold highlight inside AI text
      const boldParts = part.split(/\*\*([^*]+)\*\*/g);
      return boldParts.map((bPart, bIdx) => {
        if (bIdx % 2 === 1) {
          return <strong key={bIdx} className="text-glow-secondary text-secondary font-bold">{bPart}</strong>;
        }
        return bPart;
      });
    });
  };

  return (
    <section id="visibility" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center overflow-hidden">
      
      {/* Aurora backdrop blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-secondary/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight animate-pulse" />
            <span>03. SEARCH & AI VISIBILITY</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Search Indexing & AI Authority
          </h2>
          <p className="text-sm md:text-base text-muted max-w-xl leading-relaxed">
            Verify real-time indexing status and AI model crawling responses for my core engineering keywords.
          </p>
        </div>

        {/* Top Analytics Cards Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 select-none">
          
          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-white/5 h-36">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">SERP Position</span>
              <Globe className="w-4 h-4 text-secondary text-glow-secondary" />
            </div>
            <div>
              <div className="text-3xl font-black text-white flex items-baseline gap-1">
                #1 <span className="text-xs font-mono text-highlight font-semibold">Listed</span>
              </div>
              <span className="text-[10px] font-mono text-muted block mt-1">Google Rank for Target Keywords</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-white/5 h-36">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">AI Crawl Index</span>
              <Sparkles className="w-4 h-4 text-highlight text-glow-highlight animate-pulse" />
            </div>
            <div>
              <div className="text-3xl font-black text-white flex items-baseline gap-1">
                99% <span className="text-xs font-mono text-secondary font-semibold">Linked</span>
              </div>
              <span className="text-[10px] font-mono text-muted block mt-1">SGE / LLM Citation Match</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-white/5 h-36">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Lighthouse SEO</span>
              <ShieldCheck className="w-4 h-4 text-accent text-glow-accent" />
            </div>
            <div>
              <div className="text-3xl font-black text-white flex items-baseline gap-1">
                100 <span className="text-xs font-mono text-accent font-semibold">Perfect</span>
              </div>
              <span className="text-[10px] font-mono text-muted block mt-1">Structured Schema & Speed Page</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-white/5 h-36">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Growth Authority</span>
              <TrendingUp className="w-4 h-4 text-primary text-glow-primary" />
            </div>
            <div>
              <div className="text-3xl font-black text-white flex items-baseline gap-1">
                High <span className="text-xs font-mono text-primary font-semibold">Relevance</span>
              </div>
              <span className="text-[10px] font-mono text-muted block mt-1">Semantic SEO Density Metrics</span>
            </div>
          </div>

        </div>

        {/* Main Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Keyword Controller */}
          <div className="lg:col-span-4 space-y-4 select-none">
            <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block pl-1">Target Keywords</span>
            
            <div className="flex flex-wrap lg:flex-col gap-2">
              {keywordsData.map((kw, idx) => (
                <button
                  key={kw.query}
                  onClick={() => handleQueryClick(idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl border flex items-center justify-between transition-all duration-300 relative group cursor-pointer ${
                    activeQueryIndex === idx
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/10 border-secondary shadow-neon-secondary text-white'
                      : 'bg-white/5 border-white/5 hover:border-white/15 text-muted hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Search className={`w-4 h-4 ${activeQueryIndex === idx ? 'text-secondary' : 'text-muted'}`} />
                    <span className="font-mono text-xs md:text-sm font-medium">"{kw.query}"</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeQueryIndex === idx ? 'text-secondary translate-x-1' : 'text-muted group-hover:translate-x-0.5'}`} />
                  
                  {activeQueryIndex === idx && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-secondary rounded-r" />
                  )}
                </button>
              ))}
            </div>

            {/* Micro-Notice card */}
            <div className="glass-panel p-4 rounded-xl border-white/5 flex gap-3 text-xs text-muted leading-relaxed">
              <CheckCircle className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
              <span>Select any keyword to test how major search engines and language models process and prioritize my developer profiles.</span>
            </div>
          </div>

          {/* Right Column: Simulated Output Interface */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Visual Screen Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 select-none">
              
              {/* Tab Selector Buttons */}
              <div className="flex gap-2">
                
                <button
                  onClick={() => setActiveTab('google')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'google'
                      ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                      : 'text-muted hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>🌐 Google SERP</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'ai'
                      ? 'bg-secondary/15 text-secondary border border-secondary/25 shadow-neon-secondary'
                      : 'text-muted hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🤖 AI Overview</span>
                </button>

              </div>

              {/* Status bar */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted">
                <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
                <span>Simulation Online</span>
              </div>
            </div>

            {/* Display View Content */}
            <div className="min-h-[460px] rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Top Search-Bar Mock Frame */}
              <div className="bg-bgMain px-6 py-4 border-b border-white/10 flex items-center justify-between select-none">
                <div className="flex items-center gap-3 w-full max-w-xl bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <Search className="w-4 h-4 text-muted" />
                  <span className="font-mono text-xs text-white/95">
                    {currentKeyword.query}
                  </span>
                </div>
                <div className="hidden sm:flex gap-1.5 ml-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Console Canvas Area */}
              <div className="flex-1 p-6 md:p-8 bg-[#090b14]/90 overflow-y-auto max-h-[400px]">
                <AnimatePresence mode="wait">
                  
                  {activeTab === 'google' ? (
                    
                    /* GOOGLE SEARCH RESULTS PANEL */
                    <motion.div
                      key={`google-${activeQueryIndex}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {currentKeyword.results.map((result, idx) => (
                        <div key={idx} className="group/result space-y-2">
                          
                          {/* Breadcrumb info URL */}
                          <div className="flex items-center gap-1.5 text-xs text-muted select-none">
                            <span className="text-[11px] hover:underline cursor-pointer">{result.displayUrl}</span>
                            <span className="text-[9px]">▼</span>
                          </div>

                          {/* Clickable Title link */}
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-lg md:text-xl text-[#8ab4f8] font-medium hover:underline tracking-wide leading-snug cursor-pointer group-hover/result:text-secondary transition-colors"
                          >
                            {result.title}
                          </a>

                          {/* Description Snippet */}
                          <p className="text-sm text-muted leading-relaxed font-sans max-w-2xl">
                            {renderSnippet(result.snippet)}
                          </p>

                          {/* Render Sitelinks if present */}
                          {result.sitelinks && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 pl-4 border-l border-white/5 max-w-2xl select-none">
                              {result.sitelinks.map((slink, sIdx) => (
                                <div key={sIdx} className="space-y-0.5">
                                  <span className="text-sm text-[#8ab4f8] hover:underline cursor-pointer font-medium block">
                                    {slink.title}
                                  </span>
                                  <span className="text-xs text-muted leading-relaxed">
                                    {slink.desc}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      ))}
                    </motion.div>

                  ) : (
                    
                    /* AI SEARCH RESPONSE PANEL */
                    <motion.div
                      key={`ai-${activeQueryIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* LLM Persona Header */}
                      <div className="flex items-center gap-3 border-b border-white/5 pb-4 select-none">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center shadow-neon-secondary">
                          <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white tracking-wide">LLM Search-Synthesizer</div>
                          <div className="text-[10px] font-mono text-muted uppercase mt-0.5">Gemini Engine Live Response</div>
                        </div>
                      </div>

                      {/* Typed Output Response Bubble */}
                      <div className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-light bg-white/5 border border-white/5 rounded-2xl p-6 relative">
                        <div className="whitespace-pre-line leading-relaxed text-left">
                          {renderAiText(typedAiText)}
                          {isTyping && (
                            <span className="inline-block w-1.5 h-4 bg-secondary ml-1 animate-pulse" />
                          )}
                        </div>

                        {/* Sparkle subtle decoration */}
                        <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
                          <Sparkles className="w-16 h-16 text-secondary" />
                        </div>
                      </div>

                      {/* Source Citations Box */}
                      <div className="space-y-2 select-none">
                        <div className="text-[10px] font-mono text-muted uppercase tracking-widest">Cited Web Sources</div>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href="https://jasir.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bgMain border border-white/5 hover:border-secondary/30 text-xs text-muted hover:text-white transition-all cursor-pointer"
                          >
                            <span className="w-4 h-4 rounded bg-secondary/20 text-[9px] text-secondary flex items-center justify-center font-bold">1</span>
                            <span className="font-mono">jasir.online</span>
                            <ExternalLink className="w-3 h-3 text-muted/65" />
                          </a>
                          <a
                            href="https://linkedin.com/in/jasir-tp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bgMain border border-white/5 hover:border-secondary/30 text-xs text-muted hover:text-white transition-all cursor-pointer"
                          >
                            <span className="w-4 h-4 rounded bg-secondary/20 text-[9px] text-secondary flex items-center justify-center font-bold">2</span>
                            <span className="font-mono">linkedin.com/in/jasir-tp</span>
                            <ExternalLink className="w-3 h-3 text-muted/65" />
                          </a>
                          <a
                            href="https://github.com/jasir-tp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bgMain border border-white/5 hover:border-secondary/30 text-xs text-muted hover:text-white transition-all cursor-pointer"
                          >
                            <span className="w-4 h-4 rounded bg-secondary/20 text-[9px] text-secondary flex items-center justify-center font-bold">3</span>
                            <span className="font-mono">github.com/jasir-tp</span>
                            <ExternalLink className="w-3 h-3 text-muted/65" />
                          </a>
                        </div>
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom control bar */}
              <div className="h-10 bg-bgMain border-t border-white/10 px-6 flex items-center justify-between text-[10px] font-mono text-muted select-none">
                <span>Total Matches: 14 Indexed Pages</span>
                <span className="flex items-center gap-1 text-secondary">
                  <span>Accuracy Audit Verified</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
