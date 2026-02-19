import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, BrainCircuit, Target, Code, FileText, Github, Zap, Users, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [previewIndex, setPreviewIndex] = useState(0);
  const heroRef = useRef(null);
  const previewRef = useRef(null);
  const whatYouGetHeaderRef = useRef(null);
  const whoItsForHeaderRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  const heroHeadlineY = useTransform(heroScroll, [0, 1], [20, -20]);
  const heroParagraphY = useTransform(heroScroll, [0, 1], [30, -30]);

  const { scrollYProgress: previewScroll } = useScroll({
    target: previewRef,
    offset: ["start end", "end start"]
  });

  const previewOuterY = useTransform(previewScroll, [0, 1], [40, -40]);
  const previewInnerY = useTransform(previewScroll, [0, 1], [60, -60]);

  const { scrollYProgress: whatYouGetScroll } = useScroll({
    target: whatYouGetHeaderRef,
    offset: ["start end", "end start"]
  });
  const whatYouGetHeaderY = useTransform(whatYouGetScroll, [0, 1], [20, -20]);

  const { scrollYProgress: whoItsForScroll } = useScroll({
    target: whoItsForHeaderRef,
    offset: ["start end", "end start"]
  });
  const whoItsForHeaderY = useTransform(whoItsForScroll, [0, 1], [20, -20]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
  };
  const fadeLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
  };
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
  };
  const fadeUpItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };
  const cascadeCardVariant = {
    hidden: (i: number) => ({ 
      opacity: 0, 
      y: 30, 
      scale: 0.96,
      x: i % 2 === 0 ? -30 : 30 
    }),
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
    }
  };
  const slideUpCardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
  };
  const staggerCascade = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };
  const previews = [
    { title: 'Home', icon: FileText, desc: 'Real-time readiness status' },
    { title: 'LeetCode', icon: Code, desc: 'Deep pattern mastery mapping' },
    { title: 'ATS', icon: Target, desc: 'Keyword & impact audit' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % previews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pb-0">
      {/* Hero */}
      <motion.section
        ref={heroRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="pt-32 pb-24 px-6 text-center max-w-4xl mx-auto"
      >
        <motion.h1 style={{ y: heroHeadlineY }} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Know where you stand <br /> before you apply.
        </motion.h1>
        <motion.p style={{ y: heroParagraphY }} className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          Forge analyzes your GitHub, LeetCode, and resume to show what's holding you back from internships.
        </motion.p>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div variants={fadeUpItem}>
            <Link 
              to="/signup" 
              className="px-10 py-4 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-xl shadow-white/5"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div variants={fadeUpItem}>
            <Link 
              to="/demo/home" 
              className="px-10 py-4 rounded-md border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* App Preview */}
      <motion.section
        ref={previewRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        className="px-6 pb-24"
      >
        <div className="max-w-5xl mx-auto">
          {/* Tab bar */}
          <div className="flex items-center gap-1 mb-3 px-1">
            {previews.map((p, i) => (
              <button
                key={i}
                onClick={() => setPreviewIndex(i)}
                className={`relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  previewIndex === i
                    ? 'text-white bg-white/8'
                    : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {previewIndex === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {i === previewIndex && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />}
                  {p.title}
                </span>
              </button>
            ))}
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>

          {/* Chrome frame */}
          <motion.div
            style={{ y: previewOuterY }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Multi-layer glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/30 via-white/5 to-violet-500/20 blur-sm" />
            <div className="absolute -inset-8 bg-indigo-500/10 blur-3xl rounded-3xl pointer-events-none" />

            {/* Inner shell */}
            <div className="relative rounded-2xl bg-[#0d0d0d] border border-white/[0.07] overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.08)]">
              {/* Fake browser bar */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-[#0a0a0a]">
                <div className="flex-1 flex items-center gap-2 bg-white/[0.04] rounded-md px-3 py-1.5 max-w-xs">
                  <div className="w-3 h-3 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-indigo-400" />
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono">app.forge.dev/{previews[previewIndex].title.toLowerCase()}</span>
                </div>
                <span className="text-[10px] text-gray-700 uppercase tracking-widest font-bold ml-auto">Forge Insight Engine</span>
              </div>

              {/* Content area */}
              <div className="relative" style={{ minHeight: '440px' }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={previewIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 p-8 flex flex-col"
                  >
                    {previewIndex === 0 && (
                      <div className="flex flex-col h-full gap-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-1">Overall Score</p>
                            <h3 className="text-4xl font-bold text-white">71<span className="text-gray-600 text-2xl">%</span></h3>
                            <p className="text-xs text-gray-500 mt-1">Ready for Tier 1 internships</p>
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold">
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                              Improving
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: 'GitHub Quality', value: 92, color: 'bg-emerald-500', textColor: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
                            { label: 'LeetCode Mastery', value: 78, color: 'bg-indigo-500', textColor: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
                            { label: 'Resume Impact', value: 61, color: 'bg-violet-500', textColor: 'text-violet-400', glow: 'shadow-violet-500/20' },
                          ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{item.label}</span>
                                <span className={`text-sm font-bold ${item.textColor}`}>{item.value}%</span>
                              </div>
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.value}%` }}
                                  transition={{ duration: 1, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                                  className={`h-full rounded-full ${item.color} shadow-lg ${item.glow}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                            <Zap size={14} className="text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Top priority: Resume Impact Density</p>
                            <p className="text-xs text-gray-500 mt-0.5">Add 3 quantified metrics to push score above 80%.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {previewIndex === 1 && (
                      <div className="flex flex-col h-full gap-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-1">DSA Pattern Coverage</p>
                            <h3 className="text-4xl font-bold text-white">78<span className="text-gray-600 text-2xl">%</span></h3>
                            <p className="text-xs text-gray-500 mt-1">12 of 15 patterns covered</p>
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            Live Analysis
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-1.5">
                          {[
                            { label: 'Arrays', pct: 95, color: 'bg-emerald-500' },
                            { label: 'Linked Lists', pct: 88, color: 'bg-emerald-500' },
                            { label: 'Trees', pct: 72, color: 'bg-indigo-500' },
                            { label: 'Graphs', pct: 41, color: 'bg-yellow-500' },
                            { label: 'DP', pct: 38, color: 'bg-red-500' },
                            { label: 'Backtrack', pct: 55, color: 'bg-yellow-500' },
                            { label: 'Heap', pct: 80, color: 'bg-indigo-500' },
                            { label: 'Trie', pct: 60, color: 'bg-indigo-500' },
                            { label: 'Sliding W.', pct: 91, color: 'bg-emerald-500' },
                            { label: 'Binary S.', pct: 85, color: 'bg-emerald-500' },
                          ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-1">
                              <div className="h-20 bg-white/[0.03] rounded-lg relative overflow-hidden border border-white/5">
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${item.pct}%` }}
                                  transition={{ duration: 0.8, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
                                  className={`absolute bottom-0 w-full ${item.color} opacity-70`}
                                />
                                <div className="absolute inset-x-0 bottom-1 flex items-center justify-center">
                                  <span className="text-[8px] font-bold text-white/80">{item.pct}%</span>
                                </div>
                              </div>
                              <span className="text-[8px] text-gray-600 text-center truncate">{item.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                            <Target size={14} className="text-red-400" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Weak spot: Dynamic Programming (38%)</p>
                            <p className="text-xs text-gray-500 mt-0.5">Focus on 2D state transitions to close this gap.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {previewIndex === 2 && (
                      <div className="flex flex-col h-full gap-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-1">ATS Keyword Audit</p>
                            <h3 className="text-4xl font-bold text-white">82<span className="text-gray-600 text-2xl">%</span></h3>
                            <p className="text-xs text-gray-500 mt-1">Coverage across top 50 JD keywords</p>
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold">
                            <CheckCircle2 size={10} />
                            Strong Match
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { kw: 'Distributed Systems', status: 'found', color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' },
                            { kw: 'Go / Golang', status: 'found', color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' },
                            { kw: 'Microservices', status: 'found', color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' },
                            { kw: 'Kubernetes', status: 'found', color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' },
                            { kw: 'CI/CD Pipeline', status: 'missing', color: 'text-red-400', bg: 'bg-red-500/5 border-red-500/20' },
                            { kw: 'System Design', status: 'missing', color: 'text-red-400', bg: 'bg-red-500/5 border-red-500/20' },
                          ].map((item, i) => (
                            <div key={i} className={`px-3 py-2.5 rounded-lg border ${item.bg} flex items-center gap-2`}>
                              {item.status === 'found'
                                ? <CheckCircle2 size={11} className={item.color} />
                                : <div className="w-2.5 h-2.5 rounded-full border border-red-500/50 flex-shrink-0" />
                              }
                              <span className="text-xs text-gray-300 font-medium">{item.kw}</span>
                              <span className={`ml-auto text-[10px] font-bold ${item.color}`}>{item.status}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto p-4 rounded-xl bg-violet-500/5 border border-violet-500/20 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                            <FileText size={14} className="text-violet-400" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Add 2 missing keywords to hit 95% coverage</p>
                            <p className="text-xs text-gray-500 mt-0.5">Mention CI/CD in your most recent project bullet.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Tab description */}
          <motion.p
            key={previewIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center text-xs text-gray-600 mt-4 uppercase tracking-widest font-bold"
          >
            {previews[previewIndex].desc}
          </motion.p>
        </div>
      </motion.section>

      {/* The Problem (KEEP AS IS per instruction) */}
      <section className="py-24 border-t border-white/5 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">The Problem</span>
            <h2 className="text-3xl font-bold mb-6">Students grind blindly.</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              You solve random problems and build random projects. But recruiters don't want "random". They want specific signals of readiness. Most students only find out they aren't ready after their 100th rejection.
            </p>
          </motion.div>
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div whileHover={{ y: -4, transition: { duration: 0.25 } }} className="p-8 rounded-xl bg-[#111] border border-white/5 font-mono text-sm text-gray-400">
              <div className="mb-2 text-red-400">$ leetcode --check-readiness</div>
              <div className="mb-2">Scanning problem distribution...</div>
              <div className="mb-2 text-yellow-500">Warning: No Hard problems solved in "Graphs".</div>
              <div className="mb-2 text-yellow-500">Warning: Resume lacks impact metrics (e.g., %).</div>
              <div className="text-red-500">Conclusion: Not ready for Tier 1 internships.</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">System Philosophy</span>
            <h2 className="text-3xl font-bold mb-6">We measure signals, not vibes.</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Forge maps your work to concrete engineering signals. We focus on depth, consistency, and measurable impact to show what matters most for internships.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 gap-6">
            {[
              { icon: Github, title: 'GitHub Semantic Depth', desc: 'Architecture and system complexity signals from your repos.' },
              { icon: Code, title: 'DSA Pattern Coverage', desc: 'Pattern breadth mapped to interview expectations.' },
              { icon: FileText, title: 'Resume Impact Density', desc: 'Metrics, outcomes, and clarity of technical impact.' }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUpItem} whileHover={{ y: -4, transition: { duration: 0.25 } }} className="p-6 rounded-xl bg-[#111] border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <card.icon size={16} className="text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">{card.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <WhatYouGet whatYouGetHeaderRef={whatYouGetHeaderRef} whatYouGetHeaderY={whatYouGetHeaderY} cascadeCardVariant={cascadeCardVariant} staggerCascade={staggerCascade} fadeUp={fadeUp} />

      <div className="h-px w-full bg-white/5 my-12" />

      {/* ── Who It's For ── */}
      <WhoItsFor whoItsForHeaderRef={whoItsForHeaderRef} whoItsForHeaderY={whoItsForHeaderY} slideUpCardVariant={slideUpCardVariant} staggerCascade={staggerCascade} fadeUp={fadeUp} />

    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   GlowCard — spotlight follows cursor, activates immediately on hover
───────────────────────────────────────────────────────────────────────────── */
const GlowCard: React.FC<{
  children: React.ReactNode;
  glowColor: string;
  borderColor: string;
  className?: string;
  variants?: any;
  custom?: number;
  whileHover?: any;
}> = ({ children, glowColor, borderColor, className = '', variants, custom, whileHover }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => setHovered(false);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      custom={custom}
      whileHover={whileHover}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl bg-[#111] overflow-hidden ${className}`}
      style={{
        border: `1px solid ${hovered ? borderColor : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.25s ease',
        boxShadow: hovered ? `0 0 40px -10px ${glowColor}` : 'none',
      }}
    >
      {/* Cursor-tracked inner spotlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          background: `radial-gradient(320px circle at ${pos.x}% ${pos.y}%, ${glowColor}, transparent 65%)`,
        }}
      />
      {/* Top-right ambient bloom */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{
          opacity: hovered ? 0.6 : 0,
          transition: 'opacity 0.35s ease',
          background: glowColor,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   What You Get section
───────────────────────────────────────────────────────────────────────────── */
const WhatYouGet: React.FC<any> = ({ whatYouGetHeaderRef, whatYouGetHeaderY, cascadeCardVariant, staggerCascade, fadeUp }) => {
  const cards = [
    {
      title: 'Personalized Readiness Score',
      desc: 'A clear benchmark of where you stand today against what top companies actually look for.',
      icon: TrendingUp,
      tag: 'Live Score',
      glowColor: 'rgba(99,102,241,0.35)',
      borderColor: 'rgba(99,102,241,0.5)',
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10',
      tagBg: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/25',
      preview: [92, 78, 61],
      previewColors: ['bg-emerald-500', 'bg-indigo-500', 'bg-violet-500'],
      previewLabels: ['GitHub', 'LeetCode', 'Resume'],
    },
    {
      title: 'Weekly Optimization Log',
      desc: 'A prioritized action plan that tells you exactly what to fix next for maximum impact.',
      icon: Zap,
      tag: 'Guided Plan',
      glowColor: 'rgba(139,92,246,0.35)',
      borderColor: 'rgba(139,92,246,0.5)',
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/10',
      tagBg: 'bg-violet-500/10 text-violet-300 border border-violet-500/25',
      preview: null,
      tasks: ['Add metrics to 3 resume bullets', 'Solve 5 DP problems', 'Push GitHub project docs'],
    },
    {
      title: 'Interview Question Vault',
      desc: 'A curated library of real interview questions mapped directly to your weakest areas.',
      icon: BrainCircuit,
      tag: 'Personalized',
      glowColor: 'rgba(34,211,238,0.3)',
      borderColor: 'rgba(34,211,238,0.45)',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10',
      tagBg: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/25',
      preview: null,
      topics: ['Dynamic Programming', 'System Design', 'Behavioral'],
    },
  ];

  return (
    <section className="py-16 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="space-y-10">
          <motion.div
            ref={whatYouGetHeaderRef}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: whatYouGetHeaderY }}
          >
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">What You Get</span>
            <h2 className="text-3xl font-bold text-white mt-4">Your readiness engine.</h2>
            <p className="text-gray-400 max-w-xl mt-4">Everything Forge generates maps to measurable hiring signals.</p>
          </motion.div>

          <motion.div variants={staggerCascade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <GlowCard
                key={i}
                glowColor={card.glowColor}
                borderColor={card.borderColor}
                variants={cascadeCardVariant}
                custom={i}
                whileHover={{ y: -7, scale: 1.015, transition: { duration: 0.22 } }}
                className="p-8 flex flex-col gap-6 cursor-default min-h-[280px]"
              >
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${card.iconBg} ${card.iconColor}`}>
                    <card.icon size={18} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${card.tagBg}`}>
                    {card.tag}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>

                {/* Card-specific mini preview */}
                {card.preview && (
                  <div className="mt-auto space-y-2 pt-4 border-t border-white/5">
                    {card.preview.map((val, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600 w-14 shrink-0">{card.previewLabels![j]}</span>
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${val}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: j * 0.1 + 0.3 }}
                            className={`h-full rounded-full ${card.previewColors![j]}`}
                          />
                        </div>
                        <span className={`text-[10px] font-bold ${card.iconColor}`}>{val}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {card.tasks && (
                  <div className="mt-auto space-y-2 pt-4 border-t border-white/5">
                    {card.tasks.map((task, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-violet-500/40 bg-violet-500/10 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        </div>
                        <span className="text-[11px] text-gray-500">{task}</span>
                      </div>
                    ))}
                  </div>
                )}

                {card.topics && (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {card.topics.map((topic, j) => (
                      <span key={j} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-cyan-500/8 border border-cyan-500/20 text-cyan-400">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </GlowCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Who It's For section
───────────────────────────────────────────────────────────────────────────── */
const WhoItsFor: React.FC<any> = ({ whoItsForHeaderRef, whoItsForHeaderY, slideUpCardVariant, staggerCascade, fadeUp }) => {
  const cards = [
    {
      title: 'CS Students',
      desc: 'Break into top internships with proven, measurable readiness signals that recruiters actually care about.',
      icon: Code,
      stat: '94%', statLabel: 'placement rate',
      glowColor: 'rgba(99,102,241,0.35)',
      borderColor: 'rgba(99,102,241,0.5)',
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10',
      statColor: 'text-indigo-300',
      barColor: 'bg-indigo-500',
      bullets: ['LeetCode pattern gap analysis', 'GitHub project depth scoring', 'Resume ATS alignment'],
    },
    {
      title: 'Bootcamp Engineers',
      desc: 'Translate your projects and portfolio into the kind of recruiter-aligned evidence that gets callbacks.',
      icon: Zap,
      stat: '3.2×', statLabel: 'interview callbacks',
      glowColor: 'rgba(139,92,246,0.35)',
      borderColor: 'rgba(139,92,246,0.5)',
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/10',
      statColor: 'text-violet-300',
      barColor: 'bg-violet-500',
      bullets: ['Project impact reframing', 'Keyword gap identification', 'Portfolio signal strength'],
    },
    {
      title: 'Career Switchers',
      desc: 'Pinpoint the exact gaps between where you are and where you need to be — and close them fast.',
      icon: Users,
      stat: '6 wks', statLabel: 'avg. time to ready',
      glowColor: 'rgba(34,211,238,0.28)',
      borderColor: 'rgba(34,211,238,0.4)',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10',
      statColor: 'text-cyan-300',
      barColor: 'bg-cyan-500',
      bullets: ['Transferable skill mapping', 'Fast-track study path', 'Readiness milestone tracking'],
    },
  ];

  return (
    <section className="py-16 relative pb-24">
      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          ref={whoItsForHeaderRef}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: whoItsForHeaderY }}
        >
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Who It's For</span>
          <h2 className="text-3xl font-bold text-white mt-4">Built for people serious about breaking in.</h2>
          <p className="text-gray-400 max-w-xl mt-4">Different backgrounds. Same goal. Real readiness.</p>
        </motion.div>

        <motion.div variants={staggerCascade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-6 mt-10">
          {cards.map((card, i) => (
            <GlowCard
              key={i}
              glowColor={card.glowColor}
              borderColor={card.borderColor}
              variants={slideUpCardVariant}
              whileHover={{ y: -7, scale: 1.015, transition: { duration: 0.22 } }}
              className="p-8 flex flex-col gap-5 cursor-default min-h-[300px]"
            >
              {/* Icon */}
              <div className={`p-2.5 rounded-xl ${card.iconBg} ${card.iconColor} w-fit`}>
                <card.icon size={18} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>

              {/* Bullet features */}
              <div className="space-y-1.5">
                {card.bullets.map((b, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle2 size={12} className={card.iconColor} />
                    <span className="text-[11px] text-gray-400">{b}</span>
                  </div>
                ))}
              </div>

              {/* Stat */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-baseline gap-2">
                <span className={`text-2xl font-black ${card.statColor}`}>{card.stat}</span>
                <span className="text-xs text-gray-600 uppercase tracking-wide">{card.statLabel}</span>
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPage;