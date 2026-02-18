
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    transition={{ 
      duration: 0.26, 
      ease: [0.4, 0, 0.2, 1] 
    }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        {/* Public Marketing Routes */}
        <Route path="/" element={<PublicLayout><PageWrapper><LandingPage /></PageWrapper></PublicLayout>} />
        <Route path="/how-it-works" element={<PublicLayout><PageWrapper><HowItWorks /></PageWrapper></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><PageWrapper><PricingPage /></PageWrapper></PublicLayout>} />
        <Route path="/login" element={<PublicLayout hideFooter><PageWrapper><LoginPage onLogin={login} /></PageWrapper></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout hideFooter><PageWrapper><SignupPage onLogin={login} /></PageWrapper></PublicLayout>} />

        {/* Demo Routes - Navigable but Read-Only */}
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

        {/* Protected App Routes */}
        <Route path="/app/*" element={
          isAuthenticated ? <AppLayout onLogout={logout} /> : <Navigate to="/login" />
        }>
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

// --- Layouts ---

const PublicLayout: React.FC<{ children: React.ReactNode; hideFooter?: boolean }> = ({ children, hideFooter }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED] selection:bg-indigo-500/30">
      <nav className="border-b border-white/5 bg-[#0F0F0F]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">FORGE</Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white">Log in</Link>
            <Link to="/signup" className="px-4 py-1.5 rounded-md bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all btn-premium">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        <main key={location.pathname}>{children}</main>
      </AnimatePresence>
      {!hideFooter && (
        <footer className="border-t border-white/5 py-16 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
            <div className="md:col-span-1 space-y-4">
              <div className="text-lg font-bold tracking-tight text-white">FORGE</div>
              <p className="text-gray-500 leading-relaxed max-w-[200px]">
                Career audits for future software engineers.
              </p>
              <div className="text-[10px] text-gray-700 uppercase tracking-widest pt-4">
                © 2025 Forge
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link to="/demo" className="footer-link hover:text-white">Demo</Link></li>
                <li><Link to="/pricing" className="footer-link hover:text-white">Pricing</Link></li>
                <li><Link to="/how-it-works" className="footer-link hover:text-white">How it works</Link></li>
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
                <li><a href="mailto:hello@forge.engineering" className="footer-link hover:text-white">Contact Us</a></li>
                <li><a href="https://linkedin.com" className="footer-link hover:text-white">LinkedIn</a></li>
                <li><Link to="/" className="footer-link hover:text-white">Privacy</Link></li>
                <li><Link to="/" className="footer-link hover:text-white">Terms</Link></li>
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
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${isActive ? 'bg-white/5 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'}
                `}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          {isDemo ? (
            <Link 
              to="/signup" 
              className="w-full flex items-center justify-center px-3 py-2 text-sm bg-white text-black rounded-md font-bold hover:bg-gray-200 transition-colors btn-premium"
            >
              Sign up
            </Link>
          ) : (
            <button 
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-red-400 transition-colors"
            >
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
            <Routes location={location} key={location.pathname}>
              <Route path="home" element={<PageWrapper><AppHome isDemo={isDemo} /></PageWrapper>} />
              <Route path="github" element={<PageWrapper><AppGitHub isDemo={isDemo} /></PageWrapper>} />
              <Route path="leetcode" element={<PageWrapper><AppLeetCode isDemo={isDemo} /></PageWrapper>} />
              <Route path="leetcode/semantic-analysis" element={<PageWrapper><AppSemanticAnalysis isDemo={isDemo} /></PageWrapper>} />
              <Route path="resume" element={<PageWrapper><AppResume isDemo={isDemo} /></PageWrapper>} />
              <Route path="ats" element={<PageWrapper><AppATS isDemo={isDemo} /></PageWrapper>} />
              <Route path="interview-vault" element={<PageWrapper><AppVault isDemo={isDemo} /></PageWrapper>} />
              <Route path="settings" element={<PageWrapper><AppSettings isDemo={isDemo} /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
