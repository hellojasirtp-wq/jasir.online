import React, { createContext, useContext, useState, useEffect } from 'react';

export type SectionType = 
  | 'landing'
  | 'about'
  | 'experience'
  | 'visibility'
  | 'frontend'
  | 'backend'
  | 'packages'
  | 'projects'
  | 'playground'
  | 'curriculum'
  | 'design-system';

interface TerminalLog {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface PortfolioContextType {
  journeyStarted: boolean;
  setJourneyStarted: (started: boolean) => void;
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  devMode: boolean;
  setDevMode: (active: boolean) => void;
  matrixActive: boolean;
  setMatrixActive: (active: boolean) => void;
  achievements: string[];
  addAchievement: (name: string) => void;
  terminalLogs: TerminalLog[];
  addTerminalLog: (log: TerminalLog) => void;
  clearTerminalLogs: () => void;
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>('landing');
  const [devMode, setDevMode] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    { type: 'output', text: 'System initialized. Enter commands or type "help".' }
  ]);

  const addAchievement = (name: string) => {
    if (!achievements.includes(name)) {
      setAchievements((prev) => [...prev, name]);
      // Push an notification log
      addTerminalLog({ 
        type: 'success', 
        text: `Achievement Unlocked: 🏆 ${name}! Check developer logs.` 
      });
    }
  };

  const addTerminalLog = (log: TerminalLog) => {
    setTerminalLogs((prev) => [...prev, log]);
  };

  const clearTerminalLogs = () => {
    setTerminalLogs([{ type: 'output', text: 'Logs cleared.' }]);
  };

  // Keyboard Easter Eggs
  useEffect(() => {
    let keysPressed: string[] = [];
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.push(e.key);
      if (keysPressed.length > konamiCode.length) {
        keysPressed.shift();
      }

      if (JSON.stringify(keysPressed) === JSON.stringify(konamiCode)) {
        setDevMode(true);
        setMatrixActive(true);
        addAchievement('Konami Code Master');
        keysPressed = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [achievements]);

  return (
    <PortfolioContext.Provider value={{
      journeyStarted,
      setJourneyStarted,
      activeSection,
      setActiveSection,
      devMode,
      setDevMode,
      matrixActive,
      setMatrixActive,
      achievements,
      addAchievement,
      terminalLogs,
      addTerminalLog,
      clearTerminalLogs,
      showHelp,
      setShowHelp
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
