import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, FolderOpen, FileCode, FileText, ChevronRight, 
  Code2, Sparkles, Copy, Check, Play, Pause,
  Boxes, Shield, Search
} from 'lucide-react';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  badge: string;
  category: 'core' | 'state' | 'network' | 'ui' | 'config';
  description: string;
  keyResponsibilities: string[];
  sampleFiles: string[];
  codeSnippet: string;
  iconBg: string;
}

const FOLDER_DATA: FolderItem[] = [
  {
    id: 'api',
    name: 'api',
    type: 'folder',
    badge: 'API',
    category: 'network',
    description: 'Contains all API calls, Axios instances, interceptors, and network configuration.',
    keyResponsibilities: [
      'Axios/Fetch client configuration with base URLs',
      'Request & response interceptors (JWT tokens, refresh tokens)',
      'Type-safe endpoint definitions & request handlers'
    ],
    sampleFiles: ['client.ts', 'auth.api.ts', 'users.api.ts', 'endpoints.ts'],
    codeSnippet: `// src/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});`,
    iconBg: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'assets',
    name: 'assets',
    type: 'folder',
    badge: 'Assets',
    category: 'ui',
    description: 'Contains static assets like SVGs, logos, images, custom fonts, and global media files.',
    keyResponsibilities: [
      'SVG vector icons & illustrations',
      'Static brand imagery (PNG, WebP, AVIF)',
      'Custom typography and font files (@font-face)'
    ],
    sampleFiles: ['logo.svg', 'hero-bg.webp', 'fonts/Inter.woff2'],
    codeSnippet: `// src/assets/icons.tsx
export const Logo = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-primary">
    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
  </svg>
);`,
    iconBg: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'components',
    name: 'components',
    type: 'folder',
    badge: 'Components',
    category: 'ui',
    description: 'Reusable UI components used across the entire application (Atomic design / UI + Layout).',
    keyResponsibilities: [
      'UI primitives: Button, Modal, Tooltip, Input, Card',
      'Layout wrappers: Header, Sidebar, Footer, PageWrapper',
      'Feature-independent and highly composable elements'
    ],
    sampleFiles: ['ui/Button.tsx', 'ui/Modal.tsx', 'layout/Header.tsx', 'layout/Sidebar.tsx'],
    codeSnippet: `// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', isLoading, ...props 
}) => {
  return (
    <button className={\`btn btn-\${variant} \${isLoading ? 'opacity-70' : ''}\`} {...props}>
      {isLoading ? <span className="animate-spin mr-2">⚡</span> : null}
      {children}
    </button>
  );
};`,
    iconBg: 'from-violet-500/20 to-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'context',
    name: 'context',
    type: 'folder',
    badge: 'Context',
    category: 'state',
    description: 'Manages global or sectional state using React Context API and Custom Providers.',
    keyResponsibilities: [
      'Theme management (Dark/Light mode)',
      'Authentication session and user profiles',
      'Localization / Internationalization (i18n)'
    ],
    sampleFiles: ['AuthContext.tsx', 'ThemeContext.tsx', 'NotificationContext.tsx'],
    codeSnippet: `// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { id: string; name: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  return (
    <AuthContext.Provider value={{ user, login: () => {}, logout: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
};`,
    iconBg: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30'
  },
  {
    id: 'data',
    name: 'data',
    type: 'folder',
    badge: 'Data',
    category: 'core',
    description: 'Contains static or mock data, initial mock fixtures, navigation links, and constant lookup tables.',
    keyResponsibilities: [
      'Navigation menus & route metadata',
      'Mock fixtures for testing & Storybook',
      'Enum mappings and constant dictionaries'
    ],
    sampleFiles: ['navigation.ts', 'mockUsers.json', 'constants.ts'],
    codeSnippet: `// src/data/navigation.ts
export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
  { label: 'Settings', path: '/settings', icon: 'Settings' },
] as const;`,
    iconBg: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'hooks',
    name: 'hooks',
    type: 'folder',
    badge: 'Hooks',
    category: 'core',
    description: 'Custom React hooks for reusable stateful logic and browser APIs.',
    keyResponsibilities: [
      'Window resize / media query watchers',
      'Debouncing and throttling input values',
      'LocalStorage & SessionStorage synchronization'
    ],
    sampleFiles: ['useDebounce.ts', 'useLocalStorage.ts', 'useMediaQuery.ts', 'useClickOutside.ts'],
    codeSnippet: `// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    iconBg: 'from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30'
  },
  {
    id: 'pages',
    name: 'pages',
    type: 'folder',
    badge: 'Pages',
    category: 'ui',
    description: 'Top-level route components mapped directly to application URLs.',
    keyResponsibilities: [
      'Page-level data fetching & layout composition',
      'SEO meta tags & page title headers',
      'Route protection and sub-route rendering'
    ],
    sampleFiles: ['Home.tsx', 'Dashboard.tsx', 'Profile.tsx', 'NotFound.tsx'],
    codeSnippet: `// src/pages/Dashboard.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Guest'}</h1>
      <Button variant="primary" className="mt-4">Create Project</Button>
    </div>
  );
};`,
    iconBg: 'from-teal-500/20 to-cyan-500/20 text-teal-300 border-teal-500/30'
  },
  {
    id: 'redux',
    name: 'redux',
    type: 'folder',
    badge: 'Redux',
    category: 'state',
    description: 'Manages scalable complex state with Redux Toolkit slices, stores, and RTK Query.',
    keyResponsibilities: [
      'Central Redux Store configuration',
      'Feature Slices (reducers & action creators)',
      'RTK Query caching & background refetching'
    ],
    sampleFiles: ['store.ts', 'slices/cartSlice.ts', 'slices/userSlice.ts', 'services/apiSlice.ts'],
    codeSnippet: `// src/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: { id: string; quantity: number }[];
}

const initialState: CartState = { items: [] };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: string }>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity++;
      else state.items.push({ id: action.payload.id, quantity: 1 });
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;`,
    iconBg: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
  },
  {
    id: 'services',
    name: 'services',
    type: 'folder',
    badge: 'Services',
    category: 'network',
    description: 'Houses business logic, analytics tracking, external SDK integrations, and domain helpers.',
    keyResponsibilities: [
      'Analytics & telemetry tracking (Google Analytics, Mixpanel)',
      'Payment gateways (Stripe, Razorpay, PayPal wrappers)',
      'WebSocket & Pusher real-time communication bridges'
    ],
    sampleFiles: ['analytics.service.ts', 'auth.service.ts', 'payment.service.ts', 'socket.service.ts'],
    codeSnippet: `// src/services/analytics.service.ts
export class AnalyticsService {
  static trackEvent(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
    console.log(\`[Analytics] \${event}\`, properties);
  }
}`,
    iconBg: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'utils',
    name: 'utils',
    type: 'folder',
    badge: 'Utils',
    category: 'core',
    description: 'Pure utility functions, formatters, validators, and generic helper methods.',
    keyResponsibilities: [
      'Date & currency formatting (Intl.NumberFormat, date-fns)',
      'String manipulation and slugification',
      'Validation helpers (email regex, password strength)'
    ],
    sampleFiles: ['formatters.ts', 'validators.ts', 'cn.ts', 'math.ts'],
    codeSnippet: `// src/utils/formatters.ts
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};`,
    iconBg: 'from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/30'
  },
  {
    id: 'app_jsx',
    name: 'App.jsx',
    type: 'file',
    badge: 'App Root',
    category: 'core',
    description: 'The root application component that mounts providers, routes, and global layout wrappers.',
    keyResponsibilities: [
      'Root Router configuration',
      'Global Providers hierarchy (Theme, Auth, QueryClient)',
      'Top-level error boundaries & suspense fallbacks'
    ],
    sampleFiles: ['App.tsx', 'main.tsx', 'routes.tsx'],
    codeSnippet: `// src/App.tsx
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}`,
    iconBg: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'eslint_config',
    name: 'eslint.config.js',
    type: 'file',
    badge: 'Config',
    category: 'config',
    description: 'ESLint flat config defining linting rules, code style guidelines, and React best practices.',
    keyResponsibilities: [
      'Enforcing React Hooks rules and React Refresh guidelines',
      'TypeScript strict type linting rules',
      'Preventing common memory leaks and syntax anti-patterns'
    ],
    sampleFiles: ['eslint.config.js', '.prettierrc'],
    codeSnippet: `// eslint.config.js
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  {
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];`,
    iconBg: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'index_html',
    name: 'index.html',
    type: 'file',
    badge: 'HTML Entry',
    category: 'config',
    description: 'Single Page Application (SPA) entrypoint where the React DOM tree is mounted (#root).',
    keyResponsibilities: [
      'HTML shell & viewport metadata',
      'Root mount DOM node: <div id="root"></div>',
      'Main JavaScript script tag: <script type="module" src="/src/main.tsx">'
    ],
    sampleFiles: ['index.html'],
    codeSnippet: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise Frontend Application</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    iconBg: 'from-red-500/20 to-rose-500/20 text-rose-400 border-rose-500/30'
  },
  {
    id: 'package_lock',
    name: 'package-lock.json',
    type: 'file',
    badge: 'Lockfile',
    category: 'config',
    description: 'Deterministic lockfile guaranteeing identical dependency resolution across all team members and CI/CD.',
    keyResponsibilities: [
      'Locks exact versions and integrity hashes of all packages',
      'Prevents breaking transitive dependency updates',
      'Guarantees reproducible production builds'
    ],
    sampleFiles: ['package-lock.json', 'package.json', 'pnpm-lock.yaml'],
    codeSnippet: `{
  "name": "frontend-app",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "packages": {
    "node_modules/react": {
      "version": "19.0.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.0.0.tgz"
    }
  }
}`,
    iconBg: 'from-gray-500/20 to-slate-500/20 text-slate-300 border-slate-500/30'
  },
  {
    id: 'gitignore',
    name: '.gitignore',
    type: 'file',
    badge: 'Git Rules',
    category: 'config',
    description: 'Specifies intentionally untracked files that Git should ignore (e.g. node_modules, build outputs, .env secrets).',
    keyResponsibilities: [
      'Prevents leaking secret environment files (.env.local)',
      'Ignores bulky node_modules and compilation cache (/dist, .turbo)',
      'Excludes OS-specific files (.DS_Store, Thumbs.db)'
    ],
    sampleFiles: ['.gitignore'],
    codeSnippet: `# Dependencies
node_modules/
.pnp
.pnp.js

# Production build artifacts
dist/
build/

# Environment and Secret files
.env
.env.local
.env.*.local

# Editor files
.vscode/*
!.vscode/extensions.json
.DS_Store`,
    iconBg: 'from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30'
  }
];

export const FolderStructureExplainer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('components');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Auto-tour player
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSelectedId((curr) => {
        const idx = FOLDER_DATA.findIndex((f) => f.id === curr);
        const nextIdx = (idx + 1) % FOLDER_DATA.length;
        return FOLDER_DATA[nextIdx].id;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const selectedItem = FOLDER_DATA.find((f) => f.id === selectedId) || FOLDER_DATA[0];

  const handleCopyCode = () => {
    if (selectedItem) {
      navigator.clipboard.writeText(selectedItem.codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const filteredItems = FOLDER_DATA.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.badge.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full space-y-8 select-none">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              Frontend Architecture Matrix
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                Interactive Circuit Map
              </span>
            </h3>
            <p className="text-xs text-muted">
              Explore industry-standard React & Vite frontend structures with animated circuit buses
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search folder..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-muted/60 focus:outline-none focus:border-primary/50 w-36 md:w-44 transition-all"
            />
          </div>

          {/* Auto tour button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isAutoPlaying 
                ? 'bg-secondary/20 border-secondary text-secondary shadow-neon-secondary' 
                : 'bg-white/5 border-white/10 text-muted hover:text-white hover:border-white/20'
            }`}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-muted mr-1">Filter:</span>
        {[
          { id: 'all', label: 'All Files (15)' },
          { id: 'ui', label: 'UI & Layout (3)' },
          { id: 'state', label: 'State & Context (2)' },
          { id: 'network', label: 'API & Services (2)' },
          { id: 'core', label: 'Core & Hooks (4)' },
          { id: 'config', label: 'Build & Config (4)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              filterCategory === tab.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/5 text-muted hover:text-white border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Interactive Diagram Layout (Left: Tree, Right: Explanation Cards & Live Code) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Tree View */}
        <div className="lg:col-span-5 rounded-2xl glass-panel border border-white/10 p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>frontend /</span>
            </div>
            <span className="text-[11px] font-mono text-muted">Click node to inspect</span>
          </div>

          <div className="space-y-1 font-mono text-xs max-h-[640px] overflow-y-auto pr-1">
            {/* Top Root node_modules */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted/60 opacity-70">
              <ChevronRight className="w-3.5 h-3.5" />
              <Folder className="w-4 h-4 text-slate-500" />
              <span>node_modules</span>
            </div>

            {/* Public folder */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted/60 opacity-70">
              <ChevronRight className="w-3.5 h-3.5" />
              <Folder className="w-4 h-4 text-cyan-500/70" />
              <span>public</span>
            </div>

            {/* src folder */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-2 px-3 py-1 text-emerald-400 font-bold">
                <FolderOpen className="w-4 h-4 text-emerald-400" />
                <span>src</span>
              </div>

              {/* Sub items */}
              <div className="pl-4 space-y-1 border-l-2 border-emerald-500/20 ml-4">
                {filteredItems.map((item) => {
                  const isSelected = selectedId === item.id;
                  const isFolder = item.type === 'folder';

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsAutoPlaying(false);
                      }}
                      whileHover={{ x: 4 }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer group relative ${
                        isSelected
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-neon-highlight'
                          : 'hover:bg-white/5 text-muted hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isFolder ? (
                          isSelected ? (
                            <FolderOpen className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Folder className="w-4 h-4 text-emerald-400/70 group-hover:text-emerald-400" />
                          )
                        ) : (
                          <FileCode className={`w-4 h-4 ${isSelected ? 'text-secondary' : 'text-muted'}`} />
                        )}
                        <span className={`text-xs font-mono font-medium ${isSelected ? 'font-bold text-white' : ''}`}>
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                          isSelected 
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold' 
                            : 'bg-white/5 text-muted/80'
                        }`}>
                          {item.badge}
                        </span>
                        {isSelected && (
                          <motion.span
                            layoutId="activePointer"
                            className="w-2 h-2 rounded-full bg-emerald-400 shadow-neon-highlight"
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Explainer Card & Live Code Snippet (Circuit Connected!) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl glass-panel border border-emerald-500/30 p-6 space-y-6 relative overflow-hidden"
            >
              {/* Glowing gradient background header */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-[80px] pointer-events-none" />

              {/* Title Header matching the reference card styling */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${selectedItem.iconBg} border flex items-center justify-center`}>
                    <Boxes className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">{selectedItem.badge}</span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        /{selectedItem.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted font-mono uppercase tracking-wider">
                      Category: {selectedItem.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Production Ready
                  </span>
                </div>
              </div>

              {/* Description box */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-2">
                <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold">
                  Purpose & Summary
                </h4>
                <p className="text-sm text-gray-200 leading-relaxed font-sans">
                  {selectedItem.description}
                </p>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-muted tracking-wider font-semibold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-secondary" />
                  Key Architectural Responsibilities
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {selectedItem.keyResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <ChevronRight className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Files Pill List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-muted tracking-wider font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-secondary" />
                  Typical File Conventions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.sampleFiles.map((file, idx) => (
                    <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      📄 {file}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Code Template Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase text-muted tracking-wider font-semibold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-highlight" />
                    Implementation Boilerplate
                  </h4>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-[11px] font-mono text-secondary hover:text-white px-2.5 py-1 rounded bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 transition-all cursor-pointer"
                  >
                    {copiedSnippet ? <Check className="w-3 h-3 text-highlight" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippet ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-[#030611] border border-white/10 p-4 font-mono text-xs text-gray-200 overflow-x-auto shadow-inner">
                  <pre className="text-xs leading-relaxed text-emerald-300 font-mono">
                    <code>{selectedItem.codeSnippet}</code>
                  </pre>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
