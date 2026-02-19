
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, BrainCircuit, Target, Code, FileText, Github } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [previewIndex, setPreviewIndex] = useState(0);
  const heroRef = useRef(null);
  const previewRef = useRef(null);

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
  const previews = [
    { title: 'Home', icon: HomeIcon, desc: 'Real-time readiness status' },
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
          Forge analyzes your GitHub, LeetCode, and resume to show what’s holding you back from internships.
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
              to="/demo" 
              className="px-10 py-4 rounded-md border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* App Preview - Replaced previous widget with clean purposeful preview */}
      <motion.section
        ref={previewRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 pb-32"
      >
        <motion.div style={{ y: previewOuterY }} className="max-w-5xl mx-auto p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
          <motion.div
            style={{ y: previewInnerY }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-[#111] rounded-[calc(1rem-1px)] border border-white/5 overflow-hidden shadow-2xl aspect-[16/10] relative"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={previewIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 p-8 flex flex-col items-center justify-center"
              >
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">Preview: {previews[previewIndex].title}</div>
                <div className="w-full max-w-2xl bg-[#0F0F0F] border border-white/5 rounded-xl p-8 space-y-8">
                  <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                      <span className="text-xs font-bold text-gray-500">Forge Insight Engine</span>
                    </div>
                    <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Read-Only View</span>
                  </div>
                  
                  {previewIndex === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">You are 71% ready for internships.</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400"><span>GitHub Quality</span><span>92%</span></div>
                        <div className="h-1 bg-white/5 rounded-full"><div className="h-full bg-green-500 w-[92%]"></div></div>
                        <div className="flex justify-between text-xs text-gray-400"><span>LeetCode Pattern Mastery</span><span>78%</span></div>
                        <div className="h-1 bg-white/5 rounded-full"><div className="h-full bg-indigo-500 w-[78%]"></div></div>
                      </div>
                    </div>
                  )}

                  {previewIndex === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({length: 12}).map((_, i) => (
                          <div key={i} className={`h-8 rounded-sm bg-indigo-500/${i * 8 + 5} border border-white/5`}></div>
                        ))}
                      </div>
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="text-[10px] text-indigo-400 font-bold uppercase">Topic: Dynamic Programming</span>
                        <p className="text-sm text-gray-400 mt-1">Mastery: 42%. Focus on 2D state transitions.</p>
                      </div>
                    </div>
                  )}

                  {previewIndex === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-bold text-white uppercase">ATS Keyword Audit</span>
                         <span className="text-sm font-bold text-indigo-400">82% Coverage</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {['Distributed Systems', 'Go / Golang', 'Microservices', 'Kubernetes'].map((kw, i) => (
                          <div key={i} className="px-3 py-2 rounded border border-white/5 bg-white/[0.02] text-[10px] text-gray-400 flex items-center gap-2">
                            <CheckCircle2 size={10} className="text-indigo-500" /> {kw}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-8 text-sm text-gray-500">{previews[previewIndex].desc}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
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

      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Personalized Readiness Score', desc: 'A clear benchmark of where you stand today.' },
              { title: 'Weekly Optimization Log', desc: 'A guided plan to close the highest-impact gaps.' },
              { title: 'Interview Question Vault', desc: 'A curated library aligned to your weak spots.' }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUpItem} whileHover={{ y: -4, transition: { duration: 0.25 } }} className="p-6 rounded-xl bg-[#111] border border-white/5">
                <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'CS Students', desc: 'Break into internships with proven readiness signals.' },
              { title: 'Bootcamp Engineers', desc: 'Translate projects into recruiter-aligned evidence.' },
              { title: 'Career Switchers', desc: 'Pinpoint the fastest route to credibility.' }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUpItem} whileHover={{ y: -4, transition: { duration: 0.25 } }} className="p-6 rounded-xl bg-[#111] border border-white/5">
                <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Stop guessing. Start knowing.</h2>
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
                to="/demo" 
                className="px-10 py-4 rounded-md border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
              >
                View Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

const HomeIcon = ({ size }: { size: number }) => <FileText size={size} />;

export default LandingPage;
