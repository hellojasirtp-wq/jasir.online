import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface PackageRow {
  name: string;
  category: 'Data Grid' | 'State & Queries' | 'UI & Styling';
  years: string;
  project: string;
  optimization: string;
  color: string;
}

export const PackagesSkills: React.FC = () => {
  const { addAchievement } = usePortfolio();

  const allData: PackageRow[] = [
    {
      name: 'AG-Grid',
      category: 'Data Grid',
      years: '4 Years',
      project: 'csd-admin-web-app',
      optimization: 'Configured infinite scroll viewport virtualization to render 100k+ incident rows at 60 FPS.',
      color: '#6C63FF'
    },
    {
      name: 'TanStack Table',
      category: 'Data Grid',
      years: '3 Years',
      project: 'Design System SaaS',
      optimization: 'Lightweight headless engine that minimizes bundle sizes (<10KB) and isolates row rendering cycles.',
      color: '#00D4FF'
    },
    {
      name: 'Redux Toolkit',
      category: 'State & Queries',
      years: '5 Years',
      project: 'mployedin-frontend-web-user',
      optimization: 'Managed multi-role session auth slices, dark/light theme state synchronizations, and masquerade triggers under nested provider trees.',
      color: '#FF4D8D'
    },
    {
      name: 'React Query',
      category: 'State & Queries',
      years: '4 Years',
      project: 'csd-pikitup-admin-web',
      optimization: 'Configured automated stale-while-revalidate query caching strategies to eliminate duplicate API requests.',
      color: '#00FFB3'
    },
    {
      name: 'Zustand',
      category: 'State & Queries',
      years: '2 Years',
      project: 'Global Portfolio config',
      optimization: 'Highly lightweight selector hook mechanism that updates subscribers directly, avoiding parent re-renders.',
      color: '#EAB308'
    },
    {
      name: 'Ant Design',
      category: 'UI & Styling',
      years: '4 Years',
      project: 'csd-pikitup-admin-web',
      optimization: 'Utilized individual component import references to bypass loading the full 1.2MB component payload.',
      color: '#A855F7'
    },
    {
      name: 'TailwindCSS / UI',
      category: 'UI & Styling',
      years: '5 Years',
      project: 'Design System SaaS UI',
      optimization: 'Leverages CSS variables for dynamic branding, and purges unused styles to keep output css <15KB.',
      color: '#3B82F6'
    },
    {
      name: 'Chakra UI',
      category: 'UI & Styling',
      years: '3 Years',
      project: 'OLO PortalPOS Dashboard',
      optimization: 'Configured CSS tokens boundaries to enforce rigid, system-wide design alignment rules.',
      color: '#10B981'
    },
    {
      name: 'NextUI',
      category: 'UI & Styling',
      years: '2 Years',
      project: 'Internal Sandbox System',
      optimization: 'Uses Tailwind CSS under the hood to ensure utility class optimization while supporting modern visual components.',
      color: '#F97316'
    },
    {
      name: 'Material UI',
      category: 'UI & Styling',
      years: '4 Years',
      project: 'PropertyOK listings web',
      optimization: 'Optimized tree shaking compiler options in rollup configurations to prune unused icon modules.',
      color: '#14B8A6'
    },
    {
      name: 'Monaco Editor',
      category: 'UI & Styling',
      years: '2 Years',
      project: 'ttl-solver-wrapper-web-frontend',
      optimization: 'Loaded Monaco dynamically using local CDN fallbacks and shared configurations to maintain minimal main thread bloat.',
      color: '#FF4D8D'
    },
    {
      name: 'Three.js / WebGL',
      category: 'UI & Styling',
      years: '3 Years',
      project: 'ttl-solver-wrapper-web-frontend',
      optimization: 'Synchronized canvas frames using DOM MutationObservers for theme sync, avoiding rendering updates when hidden.',
      color: '#00FFB3'
    },
    {
      name: 'Recharts',
      category: 'UI & Styling',
      years: '3 Years',
      project: 'redmine-crm-portal',
      optimization: 'Created responsive container wrappers for dynamic chart components, implementing customized tooltips and legend filters.',
      color: '#EC4899'
    },
    {
      name: 'ApexCharts',
      category: 'UI & Styling',
      years: '3 Years',
      project: 'click4marry-admn-web-frontend',
      optimization: 'Implemented real-time reporting dashboards with synchronized dynamic zoom levels and optimized update intervals to handle live data streams.',
      color: '#A855F7'
    },
    {
      name: 'Firebase SDK',
      category: 'State & Queries',
      years: '4 Years',
      project: 'click4marry-userportal-web-frontend',
      optimization: 'Configured hybrid Firestore and RTDB streams for low-latency (<50ms) message relays and cloud notification hooks.',
      color: '#F5820D'
    }
  ];

  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Grid' | 'State' | 'UI'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = allData.filter((row) => {
    // Search match
    const searchMatch = row.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        row.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category match
    if (categoryFilter === 'All') return searchMatch;
    if (categoryFilter === 'Grid') return searchMatch && row.category === 'Data Grid';
    if (categoryFilter === 'State') return searchMatch && row.category === 'State & Queries';
    if (categoryFilter === 'UI') return searchMatch && row.category === 'UI & Styling';
    return searchMatch;
  });

  const handleFilterClick = (cat: 'All' | 'Grid' | 'State' | 'UI') => {
    setCategoryFilter(cat);
    addAchievement('Matrix Analyst');
  };

  return (
    <section id="packages" className="relative w-full min-h-screen py-28 px-4 md:px-12 bg-bgMain flex flex-col justify-center overflow-hidden border-b border-b-white/5">
      
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase">
            <ChevronRight className="w-4 h-4 text-highlight" />
            <span>05. TOOLS & PACKAGES</span>
          </div>
          <h2 className="text-3xl md:text-5xl heading-premium text-white font-extrabold">
            Libraries & Packages I Use
          </h2>
        </div>

        {/* Filters and Search Bar row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/2 border border-white/5 p-4 rounded-xl select-none">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            {(['All', 'Grid', 'State', 'UI'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer border flex-shrink-0 ${
                  categoryFilter === cat 
                    ? 'bg-primary border-primary text-white shadow-sm' 
                    : 'bg-white/5 border-white/5 text-muted hover:text-white hover:border-white/10'
                }`}
              >
                {cat === 'All' ? 'All Modules' : cat === 'Grid' ? 'Data Grids' : cat === 'State' ? 'State & Queries' : 'UI & Styling'}
              </button>
            ))}
          </div>

          {/* Search box input */}
          <div className="relative w-full md:w-64 flex items-center bg-bgMain border border-white/10 rounded-lg px-3 py-1.5 text-xs text-muted">
            <Search className="w-4 h-4 mr-2 text-muted" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search package or project..."
              className="w-full bg-transparent border-none outline-none text-white placeholder-white/20 font-mono"
            />
          </div>

        </div>

        {/* Glassmorphic Grid Table */}
        <div className="w-full rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl overflow-x-auto no-scrollbar select-none">
          <table className="w-full text-left font-sans text-xs md:text-sm border-collapse min-w-[700px]">
            
            {/* Table Header */}
            <thead>
              <tr className="bg-bgMain/60 border-b border-white/10 font-mono text-[10px] uppercase text-muted tracking-widest h-10 select-none">
                <th className="pl-6 py-3 font-semibold">Package / Tool</th>
                <th className="py-3 font-semibold">Category</th>
                <th className="py-3 font-semibold">Years Used</th>
                <th className="py-3 font-semibold">Primary Project</th>
                <th className="py-3 pr-6 font-semibold w-[40%]">Bundle Optimization Strategy</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/5 bg-[#090b14]/20">
              <AnimatePresence>
                {filteredData.map((row) => (
                  <motion.tr 
                    key={row.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/3 transition-colors h-14"
                  >
                    {/* Tool Name */}
                    <td className="pl-6 py-3 font-mono font-bold text-white flex items-center gap-2 h-14">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color, boxShadow: `0 0 8px ${row.color}` }} />
                      <span className="text-glow-primary">{row.name}</span>
                    </td>

                    {/* Category */}
                    <td className="py-3 font-mono text-[11px] text-muted">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-glow-secondary text-secondary">
                        {row.category}
                      </span>
                    </td>

                    {/* Years */}
                    <td className="py-3 font-mono text-white/80">{row.years}</td>

                    {/* Project */}
                    <td className="py-3 text-muted">{row.project}</td>

                    {/* Optimization */}
                    <td className="py-3 pr-6 text-xs text-muted/80 leading-relaxed font-sans font-light">
                      {row.optimization}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>

          </table>

          {/* Empty state query warning */}
          {filteredData.length === 0 && (
            <div className="py-12 text-center text-muted font-mono text-xs">
              No matching records found. Try modifying filters.
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
