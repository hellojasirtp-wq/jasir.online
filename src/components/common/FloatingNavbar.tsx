import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SectionType } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';
import { 
  User, Briefcase, Cpu, FolderGit, 
  Code2, Palette, Award, Server, Package, Search, GraduationCap
} from 'lucide-react';

interface NavItem {
  id: SectionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FloatingNavbar: React.FC = () => {
  const { journeyStarted, activeSection, setActiveSection, achievements } = usePortfolio();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const items: NavItem[] = [
    { id: 'about', label: 'Story', icon: User },
    { id: 'experience', label: 'Journey', icon: Briefcase },
    { id: 'visibility', label: 'AI Search', icon: Search },
    { id: 'frontend', label: 'Frontend', icon: Cpu },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'projects', label: 'Works', icon: FolderGit },
    { id: 'playground', label: 'Playground', icon: Code2 },
    { id: 'curriculum', label: 'Curriculum', icon: GraduationCap },
    { id: 'design-system', label: 'UI System', icon: Palette },
  ];

  const handleNavClick = (id: SectionType) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!journeyStarted) return null;

  return (
    <motion.div 
      initial={{ x: "-50%", y: -100, opacity: 0 }}
      animate={{ x: "-50%", y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 z-50 px-2.5 py-1.5 rounded-full glass-nav flex flex-nowrap items-center gap-1 max-w-[95vw] md:max-w-max shadow-glass overflow-x-auto no-scrollbar whitespace-nowrap select-none"
    >
      {/* Mini Logo */}
      <a 
        href="#landing"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('landing');
        }}
        className="cursor-pointer px-3 py-1 flex items-center justify-center text-primary font-bold tracking-widest text-sm font-sans mr-2 hover:scale-105 transition-transform flex-shrink-0"
      >
        <span className="text-glow-primary">JASIR</span>
      </a>

      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <a
            key={item.id}
            aria-label={item.label}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
            onMouseEnter={() => setHoveredTab(item.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={`relative px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 flex-shrink-0 select-none whitespace-nowrap ${
              isActive ? 'text-highlight' : 'text-muted hover:text-textMain'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{item.label}</span>

            {/* Hover Background */}
            {hoveredTab === item.id && (
              <motion.span
                layoutId="hoverBackground"
                className="absolute inset-0 bg-white/5 rounded-full z-[-1]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}

            {/* Active Indicator Underline */}
            {isActive && (
              <motion.span
                layoutId="activeUnderline"
                className="absolute bottom-0.5 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </a>
        );
      })}

      {/* Achievement Indicator Badge */}
      {achievements.length > 0 && (
        <div className="flex items-center gap-1 bg-accent/20 border border-accent/40 rounded-full px-2.5 py-1 text-[10px] text-accent font-semibold ml-2 select-none flex-shrink-0 animate-pulse">
          <Award className="w-3.5 h-3.5" />
          <span>{achievements.length}</span>
        </div>
      )}
    </motion.div>
  );
};
