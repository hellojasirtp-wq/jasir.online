import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Zap, Check, Copy, 
  RefreshCw, Send, Heart, CheckCircle2
} from 'lucide-react';

interface FeatureCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  tagline: string;
  summary: string;
  keyBenefits: string[];
  beforeCode: string;
  afterCode: string;
  interactiveType: 'useHook' | 'actionState' | 'optimistic' | 'compiler' | 'refProp' | 'metadata';
}

const REACT_19_FEATURES: FeatureCard[] = [
  {
    id: 'use-hook',
    badge: 'Core Primitive',
    title: 'The `use()` Hook',
    subtitle: 'Conditional Reading of Promises & Context',
    tagline: 'Read Promises & Context inside conditionals and loops without breaking Rules of Hooks.',
    summary: 'The new use() API allows components to read a Promise or Context in render. If called with a Promise, it suspends until the Promise resolves. Unlike traditional hooks, use() can be called inside conditional statements and loops!',
    keyBenefits: [
      'Unwraps promises directly in render with Suspense integration',
      'Callable inside if-conditions and loops (breaks traditional hook restrictions)',
      'Eliminates boilerplate useEffect() + useState() data fetching patterns'
    ],
    beforeCode: `// React 18: Boilerplate useEffect & state
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}`,
    afterCode: `// React 19: Clean use() with Suspense
import { use, Suspense } from 'react';

function UserProfile({ userPromise }) {
  // Directly unwraps promise! Suspends automatically
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

// ALSO: Conditional context reading!
function Nav({ isSpecial }) {
  if (isSpecial) {
    const theme = use(SpecialThemeContext);
    return <div style={{ color: theme.color }}>Special</div>;
  }
  return <div>Default</div>;
}`,
    interactiveType: 'useHook'
  },
  {
    id: 'action-state',
    badge: 'Server & Client Actions',
    title: '`useActionState()`',
    subtitle: 'Simplified Action Handling with Pending State',
    tagline: 'Native state management for async form actions with built-in isPending and error handling.',
    summary: 'useActionState accepts an action function and initial state, returning [state, formAction, isPending]. It replaces complex manual event handlers, try/catch blocks, and loading state declarations.',
    keyBenefits: [
      'Automatic isPending boolean transition handling',
      'Native integration with HTML <form action={formAction}>',
      'Progressive enhancement support for JavaScript-disabled clients'
    ],
    beforeCode: `// React 18: Manual isLoading and try/catch
function UpdateName() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateNameAction(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return <button disabled={isPending}>Submit</button>;
}`,
    afterCode: `// React 19: Built-in useActionState
import { useActionState } from 'react';

function UpdateName() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const error = await updateNameAction(formData.get('name'));
      if (error) return { error };
      return { success: true };
    },
    null
  );

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>
        {isPending ? 'Updating...' : 'Save Name'}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}`,
    interactiveType: 'actionState'
  },
  {
    id: 'optimistic',
    badge: 'Instant UI',
    title: '`useOptimistic()`',
    subtitle: 'Zero-Latency Optimistic State Mutations',
    tagline: 'Show UI updates immediately before server confirmation with automatic error rollback.',
    summary: 'useOptimistic lets you optimistically update the UI during an async action. If the server action fails or finishes, the state automatically syncs back with the true server response.',
    keyBenefits: [
      'Snappy, zero-latency user experience for likes, comments, and cart updates',
      'Automatic state synchronization and rollback upon action failure',
      'Integrates seamlessly with React Actions and Transitions'
    ],
    beforeCode: `// React 18: Manual optimistic state + complex rollback
const [likes, setLikes] = useState(10);

const handleLike = async () => {
  const prev = likes;
  setLikes(l => l + 1); // Optimistic
  try {
    await api.postLike();
  } catch {
    setLikes(prev); // Manual Rollback
  }
};`,
    afterCode: `// React 19: Native useOptimistic Hook
import { useOptimistic } from 'react';

function LikeButton({ currentLikes, sendLikeAction }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    currentLikes,
    (state, delta) => state + delta
  );

  const handleAction = async () => {
    setOptimisticLikes(1); // Instant optimistic bump
    await sendLikeAction(); // Background server sync
  };

  return <button onClick={handleAction}>❤️ {optimisticLikes}</button>;
}`,
    interactiveType: 'optimistic'
  },
  {
    id: 'compiler',
    badge: 'React Compiler',
    title: 'Auto-Memoization Compiler',
    subtitle: 'No More useMemo, useCallback, or React.memo',
    tagline: 'The React Compiler understands JavaScript semantics and automatically memoizes values.',
    summary: 'The new React Compiler automatically manages fine-grained memoization across components and hooks at build time. Developers no longer need to sprinkle useMemo() or useCallback() across their codebases to avoid re-renders.',
    keyBenefits: [
      'Eliminates runtime overhead and mental burden of dependency arrays',
      'Automatically memoizes JSX sub-trees and expensive calculations',
      'Cleaner, more idiomatic JavaScript code without memory optimization clutter'
    ],
    beforeCode: `// React 18: Manual useCallback & useMemo everywhere
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(items);
}, [items]);

return React.memo(MyComponent);`,
    afterCode: `// React 19 with React Compiler: Pure Clean JS!
// The compiler automatically analyzes and applies memoization!

const handleClick = () => {
  doSomething(a, b);
};

const expensiveValue = computeExpensiveValue(items);

return <MyComponent onClick={handleClick} data={expensiveValue} />;`,
    interactiveType: 'compiler'
  },
  {
    id: 'ref-prop',
    badge: 'Developer Experience',
    title: 'Ref as a Standard Prop',
    subtitle: 'Farewell to forwardRef Boilerplate',
    tagline: 'Function components can now directly accept "ref" as a standard prop.',
    summary: 'In React 19, you no longer need React.forwardRef() to pass refs to custom components. ref is passed directly in the component props, making TypeScript typing and component definitions straightforward.',
    keyBenefits: [
      'Removes nested forwardRef() wrapper clutter',
      'Direct TypeScript typing on props interface',
      'Unified component mental model'
    ],
    beforeCode: `// React 18: Required forwardRef wrapper
const CustomInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} className="input" {...props} />;
});`,
    afterCode: `// React 19: ref is just a regular prop!
function CustomInput({ ref, placeholder, ...props }) {
  return <input ref={ref} placeholder={placeholder} {...props} />;
}`,
    interactiveType: 'refProp'
  }
];

export const React19Explainer: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('use-hook');
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive Demo States
  // Demo 1: use() hook demo
  const [promiseStatus, setPromiseStatus] = useState<'pending' | 'resolved'>('resolved');
  const [useConditional, setUseConditional] = useState(true);

  // Demo 2: Action State demo
  const [actionCount, setActionCount] = useState(42);
  const [isPendingAction, startActionTransition] = useTransition();

  // Demo 3: Optimistic Demo
  const [realLikes, setRealLikes] = useState(128);
  const [optimisticLikes, setOptimisticLikes] = useState(128);
  const [isOptimisticActive, setIsOptimisticActive] = useState(false);
  const [simulateFail, setSimulateFail] = useState(false);

  const selectedFeature = REACT_19_FEATURES.find((f) => f.id === selectedFeatureId) || REACT_19_FEATURES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFeature.afterCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const triggerOptimisticLike = () => {
    setIsOptimisticActive(true);
    setOptimisticLikes((prev) => prev + 1);

    setTimeout(() => {
      if (simulateFail) {
        // Rollback
        setOptimisticLikes(realLikes);
        alert('Server Action failed! useOptimistic rolled back state.');
      } else {
        // Success
        setRealLikes((prev) => prev + 1);
      }
      setIsOptimisticActive(false);
    }, 1200);
  };

  return (
    <div className="w-full space-y-8 select-none">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-primary/30 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-neon-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                React 19 Deep Dive & Innovations
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-secondary font-mono">
                  v19.0.0
                </span>
              </h3>
              <p className="text-xs text-muted">
                Explore the latest primitives, hooks, compiler enhancements, and architecture paradigms
              </p>
            </div>
          </div>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          {REACT_19_FEATURES.map((feat) => {
            const isSelected = selectedFeatureId === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setSelectedFeatureId(feat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-neon-primary border border-primary/50'
                    : 'bg-white/5 text-muted hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-highlight' : 'text-muted'}`} />
                <span>{feat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Feature Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFeature.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Feature Overview Card */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-secondary uppercase tracking-widest block font-bold">
                  {selectedFeature.badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  {selectedFeature.title}: <span className="text-gray-300">{selectedFeature.subtitle}</span>
                </h2>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-highlight/10 text-highlight border border-highlight/30">
                Official Standard
              </span>
            </div>

            <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans">
              {selectedFeature.summary}
            </p>

            {/* Key benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {selectedFeature.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Playground Sandbox for Selected Feature */}
          <div className="p-6 rounded-2xl glass-panel border border-secondary/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold">
                <Sparkles className="w-4 h-4 text-highlight" />
                <span>INTERACTIVE LIVE SANDBOX & BEHAVIOR DEMO</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Test in real-time</span>
            </div>

            {/* Sub-Sandbox by type */}
            {selectedFeature.interactiveType === 'useHook' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-muted font-bold">Control Promise Resolution & Condition</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setPromiseStatus('resolved')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                        promiseStatus === 'resolved' ? 'bg-highlight/20 border-highlight text-highlight' : 'bg-white/5 border-white/10 text-muted'
                      }`}
                    >
                      Resolve Promise (Data Ready)
                    </button>
                    <button
                      onClick={() => setPromiseStatus('pending')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                        promiseStatus === 'pending' ? 'bg-secondary/20 border-secondary text-secondary animate-pulse' : 'bg-white/5 border-white/10 text-muted'
                      }`}
                    >
                      Simulate Suspend State
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="cond" 
                      checked={useConditional} 
                      onChange={(e) => setUseConditional(e.target.checked)}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                    />
                    <label htmlFor="cond" className="text-xs text-gray-300 font-mono cursor-pointer">
                      Call use(ThemeContext) conditionally inside if()
                    </label>
                  </div>
                </div>

                {/* Simulated Component Output */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 min-h-[120px] flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-muted uppercase">Rendered Output:</span>
                  {promiseStatus === 'pending' ? (
                    <div className="flex items-center gap-2 text-secondary text-xs font-mono animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>&lt;Suspense fallback=&quot;Loading user records...&quot;&gt;</span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 space-y-1">
                      <div>✔ Promise Resolved: User: Jasir T P (Senior Engineer)</div>
                      {useConditional && (
                        <div className="text-secondary font-bold">🎨 Conditional Theme: Cyberpunk Dark Mode Loaded</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedFeature.interactiveType === 'optimistic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-muted font-bold">Optimistic Mutation Simulation</h4>
                  <p className="text-xs text-gray-300">
                    Click the like button below. The count increments immediately without waiting for server network response!
                  </p>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="failSim" 
                      checked={simulateFail} 
                      onChange={(e) => setSimulateFail(e.target.checked)}
                      className="accent-accent w-4 h-4 rounded cursor-pointer"
                    />
                    <label htmlFor="failSim" className="text-xs text-accent font-mono cursor-pointer">
                      Simulate Network Failure (Trigger Rollback)
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center space-y-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={triggerOptimisticLike}
                      disabled={isOptimisticActive}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-purple-600 text-white font-bold text-sm flex items-center gap-2 shadow-neon-accent hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isOptimisticActive ? 'animate-ping' : ''}`} fill="currentColor" />
                      <span>{optimisticLikes} Likes</span>
                    </button>
                  </div>

                  <div className="text-[11px] font-mono text-muted">
                    {isOptimisticActive ? (
                      <span className="text-secondary animate-pulse">⚡ Optimistic State Active: Syncing with server...</span>
                    ) : (
                      <span className="text-highlight">✔ Server State Synced ({realLikes} confirmed)</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedFeature.interactiveType === 'actionState' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-muted font-bold">useActionState Form Dispatch</h4>
                  <p className="text-xs text-gray-300">
                    Submitting automatically toggles isPending state without declaring manual state hooks.
                  </p>
                  <button
                    onClick={() => {
                      startActionTransition(async () => {
                        await new Promise((r) => setTimeout(r, 1000));
                        setActionCount((c) => c + 1);
                      });
                    }}
                    disabled={isPendingAction}
                    className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs flex items-center gap-2 shadow-neon-primary hover:scale-105 transition-all cursor-pointer"
                  >
                    {isPendingAction ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>isPending: true (Executing Action...)</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Action (Increment Count)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2 text-gray-300">
                  <div>Action Executions: <strong className="text-highlight">{actionCount}</strong></div>
                  <div>Form Status: <strong className={isPendingAction ? 'text-secondary' : 'text-emerald-400'}>{isPendingAction ? 'PENDING' : 'IDLE'}</strong></div>
                </div>
              </div>
            )}

            {(selectedFeature.interactiveType === 'compiler' || selectedFeature.interactiveType === 'refProp') && (
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 font-mono text-xs text-gray-300">
                <div className="text-highlight font-bold">⚡ Zero Boilerplate Compiler Mode Active</div>
                <p className="text-gray-400 font-sans">
                  Notice how clean and readable React 19 code is without repetitive forwardRef wrappers or memoization dependency arrays!
                </p>
              </div>
            )}
          </div>

          {/* Before vs After Code Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* React 18 Before */}
            <div className="rounded-2xl glass-panel border border-red-500/20 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
                <span className="text-xs font-mono text-red-400 font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  React 18 (Legacy Boilerplate)
                </span>
                <span className="text-[10px] font-mono text-muted">Verbose</span>
              </div>
              <pre className="text-xs text-gray-300 bg-[#05060f] p-3.5 rounded-xl border border-white/5 overflow-x-auto leading-relaxed font-mono">
                <code>{selectedFeature.beforeCode}</code>
              </pre>
            </div>

            {/* React 19 After */}
            <div className="rounded-2xl glass-panel border border-highlight/40 p-5 space-y-3 relative">
              <div className="flex items-center justify-between pb-2 border-b border-highlight/20">
                <span className="text-xs font-mono text-highlight font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
                  React 19 (Idiomatic Modern Standard)
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-mono text-secondary hover:text-white px-2 py-0.5 rounded bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 transition-all cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-highlight" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs text-emerald-300 bg-[#02050f] p-3.5 rounded-xl border border-highlight/20 overflow-x-auto leading-relaxed font-mono shadow-inner">
                <code>{selectedFeature.afterCode}</code>
              </pre>
            </div>

          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
};
