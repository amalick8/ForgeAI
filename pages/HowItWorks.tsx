import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { HelpCircle, CheckCircle2, Github, Code, FileText, Database } from 'lucide-react';

// Fix: Explicitly type variants and cast ease to any to resolve transition property incompatibility where cubic-bezier arrays are incorrectly inferred as general number arrays.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as any }
  }
};

const swipeLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any, staggerChildren: 0.06 }
  }
};

const swipeRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any, staggerChildren: 0.06 }
  }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

const HowItWorks: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-6 pt-24 pb-32">
      <header className="text-center mb-20">
        <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">The science of readiness.</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          We don't just count commits. We audit architectural depth, conceptual mastery, and semantic impact using proprietary benchmarks.
        </p>
      </header>

      <div className="space-y-24">
        {/* 1. Connect */}
        <motion.section 
          variants={swipeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div style={{ y: textY }} className="max-w-md">
            <motion.div variants={childVariants}>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Connect</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Securely link your professional profile. Forge integrates directly with your GitHub, LeetCode, and Resume to synthesize a unified engineering signal.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['GitHub API', 'LeetCode Auth', 'Resume Parser', 'ATS Engine'].map((s) => (
                  <div key={s} className="px-3 py-2 rounded-md border border-white/5 bg-white/[0.02] text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: cardY }}>
            <motion.div
              className="p-1 rounded-2xl bg-[#111] border border-white/5 shadow-2xl relative overflow-hidden group"
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <motion.div variants={childVariants} className="bg-[#0D0D0D] rounded-[calc(1rem-2px)] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Connections</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-500 uppercase">Live Sync</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: Github, label: 'github.com/student', status: 'Connected' },
                    { icon: Code, label: 'leetcode.com/user', status: 'Connected' },
                    { icon: FileText, label: 'resume_v4.pdf', status: 'Analyzed' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <item.icon size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-300 font-medium">{item.label}</span>
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase">{item.status}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* 2. Audit */}
        <motion.section 
          variants={swipeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div style={{ y: cardY }} className="order-2 md:order-1">
            <motion.div
              className="p-1 rounded-2xl bg-[#111] border border-white/5 shadow-2xl"
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <motion.div variants={childVariants} className="bg-[#0D0D0D] rounded-[calc(1rem-2px)] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Readiness Scan</span>
                  <span className="text-xs font-bold text-indigo-400">71%</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'GitHub Logic', val: 92, color: 'bg-green-500' },
                    { label: 'DSA Proficiency', val: 78, color: 'bg-indigo-500' },
                    { label: 'Impact Score', val: 62, color: 'bg-white/40' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full ${item.color}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: textY }} className="order-1 md:order-2 max-w-md">
            <motion.div variants={childVariants}>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Audit</h2>
              <p className="text-gray-400 leading-relaxed">
                We perform deep semantic analysis across your source code and DSA history. Forge audits for architectural patterns, technical complexity, and conceptual mastery, mapping your data against industry standards.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* 3. Improve */}
        <motion.section 
          variants={swipeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div style={{ y: textY }} className="max-w-md">
            <motion.div variants={childVariants}>
              <h2 className="text-2xl font-bold mb-4 text-white">3. Improve</h2>
              <p className="text-gray-400 leading-relaxed">
                Turn insights into execution. Forge generates a prioritized roadmap of optimizations, from specific resume impact rewrites to algorithmic pattern gaps, guiding you directly to peak readiness.
              </p>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: cardY }}>
            <motion.div
              className="p-1 rounded-2xl bg-[#111] border border-white/5 shadow-2xl"
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <motion.div variants={childVariants} className="bg-[#0D0D0D] rounded-[calc(1rem-2px)] p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-white/[0.03] pb-4">
                  <Database size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Optimization Log</span>
                </div>
                <div className="space-y-3">
                  {[
                    { text: 'Replace generic bullets with metrics', checked: true },
                    { text: 'Complete 3 Graph Hard problems', checked: false },
                    { text: 'Update micro-service README.md', checked: false },
                  ].map((t, i) => (
                    <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg border border-white/5 ${t.checked ? 'opacity-40' : 'bg-white/[0.02]'}`}>
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${t.checked ? 'border-indigo-500 bg-indigo-500' : 'border-white/10'}`}>
                        {t.checked && <CheckCircle2 size={10} className="text-black" />}
                      </div>
                      <span className={`text-xs font-medium ${t.checked ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{t.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* 4. Track */}
        <motion.section 
          variants={swipeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div style={{ y: cardY }} className="order-2 md:order-1">
            <motion.div
              className="p-1 rounded-2xl bg-[#111] border border-white/5 shadow-2xl"
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <motion.div variants={childVariants} className="bg-[#0D0D0D] rounded-[calc(1rem-2px)] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Weekly Growth</span>
                   <span className="text-[10px] font-bold text-green-500 uppercase">+12.4%</span>
                </div>
                <div className="flex items-end justify-between gap-1.5 h-20">
                  {[35, 55, 45, 65, 75, 71, 85].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className={`flex-1 rounded-t-[2px] ${i === 6 ? 'bg-indigo-500' : 'bg-white/10'}`} 
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[8px] font-bold text-gray-600 uppercase tracking-widest">
                  <span>Week 01</span>
                  <span>Week 07</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: textY }} className="order-1 md:order-2 max-w-md">
            <motion.div variants={childVariants}>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Track</h2>
              <p className="text-gray-400 leading-relaxed">
                Preparation is a high-stakes marathon. We track your trajectory with high granularity, visualizing your growth across all domains to ensure you're trending toward top-tier technical competence.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>

      {/* FAQ Section */}
      <section className="mt-40 pt-24 border-t border-white/5">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] text-center mb-16">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { q: 'Is this free?', a: 'Forge offers a free high-level overview. Student and Pro tiers provide daily synchronization, deep-dive analysis logs, and the interview vault.' },
            { q: 'What do you store?', a: 'We store your metadata and analysis scores to track trajectory. We never store your raw source code or personal account credentials.' },
            { q: 'Does demo save anything?', a: 'No. The demo environment is completely read-only, ephemeral, and resets automatically.' },
            { q: 'Can I delete my data?', a: 'Always. You can purge your entire audit history and disconnect your professional accounts at any time from your settings.' },
            { q: 'What does ATS mean?', a: 'Applicant Tracking System. It is the gatekeeping software recruiters use to filter thousands of resumes based on formatting and keyword relevance.' },
            { q: 'How accurate are scores?', a: 'Our scoring engine is calibrated against FAANG recruiter benchmarks and industry-standard competency matrices for a realistic mirror of your standing.' }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 transition-all hover:border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle size={14} className="text-indigo-500/60" /> {item.q}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
