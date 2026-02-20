import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Home as HomeIcon,
  Github, 
  Code, 
  FileText, 
  Lock, 
  Settings,
  Search,
  ArrowRight,
  Target,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';

// Pages
import LandingPage from './pages/LandingPage';
import HowItWorks from './pages/HowItWorks';
import PricingPage from './pages/Pricing';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import AppHome from './pages/app/AppHome';
import AppGitHub from './pages/app/AppGitHub';
import AppLeetCode from './pages/app/AppLeetCode';
import AppSemanticAnalysis from './pages/app/AppSemanticAnalysis';
import AppResume from './pages/app/AppResume';
import AppATS from './pages/app/AppATS';
import AppVault from './pages/app/AppVault';
import AppSettings from './pages/app/AppSettings';

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// ── Color palettes that cycle on each strike ─────────────────────────────────
const PALETTES = [
  ['#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#c7d2fe'],
  ['#f472b6', '#ec4899', '#db2777', '#be185d', '#fbcfe8'],
  ['#34d399', '#10b981', '#059669', '#047857', '#6ee7b7'],
  ['#fb923c', '#f97316', '#ea580c', '#c2410c', '#fed7aa'],
  ['#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#bae6fd'],
  ['#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#e9d5ff'],
  ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#fde68a'],
];

// ── Forge Logo ────────────────────────────────────────────────────────────────
const ForgeLogo: React.FC = () => {
  const [hitCount, setHitCount]   = useState(0);
  const [striking, setStriking]   = useState(false);
  const [hit, setHit]             = useState(false);
  const [hovered, setHovered]     = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const palette = PALETTES[hitCount % PALETTES.length];
  const letters = ['F', 'O', 'R', 'G', 'E'];

  const triggerStrike = () => {
    if (striking) return;
    setStriking(true);
    setHit(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHit(true);
      setHitCount(c => c + 1);
      timeoutRef.current = setTimeout(() => {
        setHit(false);
        setStriking(false);
      }, 600);
    }, 160);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div
      className="flex items-center gap-2 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={triggerStrike}
      style={{ cursor: 'pointer' }}
    >
      {/* ── FORGE wordmark — LEFT ── */}
      <Link
        to="/"
        onClick={e => e.stopPropagation()}
        className="flex items-center gap-0"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-[18px] font-black tracking-[0.22em]"
            animate={
              hit
                ? {
                    y:     [0, -8, 4, -3, 0],
                    scale: [1, 1.35, 0.9, 1.08, 1],
                    color: palette[i % palette.length],
                    rotate: [0, i % 2 === 0 ? -8 : 8, 0],
                    transition: { delay: i * 0.045, duration: 0.5, ease: 'easeOut' },
                  }
                : hovered
                ? {
                    color: '#a5b4fc',
                    y: [0, -2, 0],
                    transition: { delay: i * 0.04, duration: 0.3 },
                  }
                : {
                    y: 0, scale: 1, rotate: 0, color: '#ffffff',
                    transition: { delay: i * 0.03, duration: 0.4 },
                  }
            }
          >
            {letter}
          </motion.span>
        ))}
      </Link>
    </div>
  );
};

// ── Magnetic Nav Link ────────────────────────────────────────────────────────
const NavLink: React.FC<{ to: string; children: React.ReactNode; active?: boolean }> = ({ to, children, active }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref as any}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <Link
        to={to}
        className={`relative text-[15px] font-semibold tracking-wide transition-colors duration-200 px-1 py-0.5 ${
          active ? 'text-white' : 'text-gray-300 hover:text-white'
        }`}
      >
        {children}
        {/* Underline */}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full"
          initial={{ width: active ? '100%' : '0%' }}
          whileHover={{ width: '100%' }}
          animate={{ width: active ? '100%' : '0%' }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        />
        {active && (
          <motion.span
            layoutId="navDot"
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </Link>
    </motion.div>
  );
};

// ── Public Navbar ────────────────────────────────────────────────────────────
const PublicNav: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.06 } }
  };
  const itemVariant = {
    hidden: { y: -8, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.4)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Shimmer line at very top */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent origin-left"
      />

      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={itemVariant}>
          <ForgeLogo />
        </motion.div>

        {/* Center nav links */}
        <motion.div variants={itemVariant} className="hidden md:flex items-center gap-8">
          <NavLink to="/how-it-works" active={location.pathname === '/how-it-works'}>
            How it works
          </NavLink>
          <NavLink to="/pricing" active={location.pathname === '/pricing'}>
            Pricing
          </NavLink>
        </motion.div>

        {/* Right side actions */}
        <motion.div variants={itemVariant} className="flex items-center gap-3">
          {/* Login */}
          <Link
            to="/login"
            className="text-[15px] font-semibold text-gray-300 hover:text-white transition-colors duration-200 px-2 py-1"
          >
            Log in
          </Link>

          {/* Sign up — animated border + shimmer */}
          <Link to="/signup" className="relative group overflow-hidden">
            {/* Animated border gradient */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[1px] rounded-[7px] bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#06b6d4,#6366f1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-white text-black text-[15px] font-bold hover:bg-white transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Sign up
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={13} />
              </motion.span>
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

// ── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout><PageWrapper><LandingPage /></PageWrapper></PublicLayout>} />
        <Route path="/how-it-works" element={<PublicLayout><PageWrapper><HowItWorks /></PageWrapper></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><PageWrapper><PricingPage /></PageWrapper></PublicLayout>} />
        <Route path="/login" element={<PublicLayout hideFooter><PageWrapper><LoginPage onLogin={login} /></PageWrapper></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout hideFooter><PageWrapper><SignupPage onLogin={login} /></PageWrapper></PublicLayout>} />

        <Route path="/demo/*" element={<AppLayout isDemo onLogout={() => {}} />}>
          <Route path="home" element={<PageWrapper><AppHome isDemo /></PageWrapper>} />
          <Route path="github" element={<PageWrapper><AppGitHub isDemo /></PageWrapper>} />
          <Route path="leetcode" element={<PageWrapper><AppLeetCode isDemo /></PageWrapper>} />
          <Route path="leetcode/semantic-analysis" element={<PageWrapper><AppSemanticAnalysis isDemo /></PageWrapper>} />
          <Route path="resume" element={<PageWrapper><AppResume isDemo /></PageWrapper>} />
          <Route path="ats" element={<PageWrapper><AppATS isDemo /></PageWrapper>} />
          <Route path="interview-vault" element={<PageWrapper><AppVault isDemo /></PageWrapper>} />
          <Route path="settings" element={<PageWrapper><AppSettings isDemo /></PageWrapper>} />
          <Route index element={<Navigate to="home" replace />} />
        </Route>

        <Route path="/app/*" element={isAuthenticated ? <AppLayout onLogout={logout} /> : <Navigate to="/login" />}>
          <Route path="home" element={<PageWrapper><AppHome /></PageWrapper>} />
          <Route path="github" element={<PageWrapper><AppGitHub /></PageWrapper>} />
          <Route path="leetcode" element={<PageWrapper><AppLeetCode /></PageWrapper>} />
          <Route path="leetcode/semantic-analysis" element={<PageWrapper><AppSemanticAnalysis /></PageWrapper>} />
          <Route path="resume" element={<PageWrapper><AppResume /></PageWrapper>} />
          <Route path="ats" element={<PageWrapper><AppATS /></PageWrapper>} />
          <Route path="interview-vault" element={<PageWrapper><AppVault /></PageWrapper>} />
          <Route path="settings" element={<PageWrapper><AppSettings /></PageWrapper>} />
          <Route index element={<Navigate to="home" replace />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/app/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

// ── Layouts ──────────────────────────────────────────────────────────────────
const PublicLayout: React.FC<{ children: React.ReactNode; hideFooter?: boolean }> = ({ children, hideFooter }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED] selection:bg-indigo-500/30">
      <PublicNav />
      <AnimatePresence mode="wait">
        <main key={location.pathname}>{children}</main>
      </AnimatePresence>
      {!hideFooter && (
        <footer className="border-t border-white/5 py-16 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
            <div className="md:col-span-1 space-y-4">
              <ForgeLogo />
              <p className="text-gray-500 leading-relaxed max-w-[200px] text-xs mt-3">
                Career audits for future software engineers.
              </p>
              <div className="text-[10px] text-gray-700 uppercase tracking-widest pt-4">
                © 2025 Forge
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2 text-gray-500">
                <li><span className="cursor-not-allowed opacity-50">Blog</span></li>
                <li><span className="cursor-not-allowed opacity-50">Changelog</span></li>
                <li><span className="cursor-not-allowed opacity-50">Help Center</span></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="mailto:hello@forge.engineering" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><Link to="/" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

interface AppLayoutProps {
  onLogout: () => void;
  isDemo?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ onLogout, isDemo }) => {
  const location = useLocation();
  const base = isDemo ? '/demo' : '/app';

  const navItems = [
    { name: 'Home', path: `${base}/home`, icon: HomeIcon },
    { name: 'GitHub', path: `${base}/github`, icon: Github },
    { name: 'LeetCode', path: `${base}/leetcode`, icon: Code },
    { name: 'Resume', path: `${base}/resume`, icon: FileText },
    { name: 'ATS', path: `${base}/ats`, icon: Target },
    { name: 'Interview Vault', path: `${base}/interview-vault`, icon: Lock },
    { name: 'Settings', path: `${base}/settings`, icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#0F0F0F] text-[#EDEDED] overflow-hidden">
      <aside className="w-60 border-r border-white/5 flex flex-col bg-[#111111] shrink-0">
        <div className="p-6">
          <Link to="/" className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase hover:text-white transition-colors">
            {isDemo ? 'Forge Demo' : 'Forge App'}
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-white/5 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          {isDemo ? (
            <Link to="/signup" className="w-full flex items-center justify-center px-3 py-2 text-sm bg-white text-black rounded-md font-bold hover:bg-gray-200 transition-colors">
              Sign up
            </Link>
          ) : (
            <button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-red-400 transition-colors">
              Sign out
            </button>
          )}
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {isDemo && (
          <div className="flex justify-center pt-6 px-8 z-50 pointer-events-none">
            <div className="max-w-5xl w-full flex justify-center">
              <div className="bg-white text-black px-6 py-2 rounded-full flex items-center justify-between gap-6 text-sm font-medium shadow-xl pointer-events-auto border border-black/5">
                <span className="text-black/70">Demo mode: read-only. Create an account to run your own audit.</span>
                <Link to="/signup" className="bg-black text-white px-4 py-1.5 rounded-full flex items-center gap-1 font-bold hover:bg-black/90 transition-colors">
                  Create account <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <div key={location.pathname}>
              <Routes location={location}>
                <Route path="home" element={<PageWrapper><AppHome isDemo={isDemo} /></PageWrapper>} />
                <Route path="github" element={<PageWrapper><AppGitHub isDemo={isDemo} /></PageWrapper>} />
                <Route path="leetcode" element={<PageWrapper><AppLeetCode isDemo={isDemo} /></PageWrapper>} />
                <Route path="leetcode/semantic-analysis" element={<PageWrapper><AppSemanticAnalysis isDemo={isDemo} /></PageWrapper>} />
                <Route path="resume" element={<PageWrapper><AppResume isDemo={isDemo} /></PageWrapper>} />
                <Route path="ats" element={<PageWrapper><AppATS isDemo={isDemo} /></PageWrapper>} />
                <Route path="interview-vault" element={<PageWrapper><AppVault isDemo={isDemo} /></PageWrapper>} />
                <Route path="settings" element={<PageWrapper><AppSettings isDemo={isDemo} /></PageWrapper>} />
              </Routes>
            </div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;