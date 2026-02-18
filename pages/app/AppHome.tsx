
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, TrendingUp, ArrowRight, Target, Code, Github, FileText as FileTextIcon } from 'lucide-react';

// Added explicit prop type and moved FileText component definition to resolve potential type inference issues.
const FileText = ({ size, className }: { size: number, className?: string }) => <FileTextIcon size={size} className={className} />;

interface AppHomeProps {
  isDemo?: boolean;
}

const AppHome = ({ isDemo }: AppHomeProps) => {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-12 pb-12">
      <motion.header variants={item} className="pb-8 border-b border-white/5">
        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Readiness Status</div>
        <h1 className="text-4xl font-semibold text-white tracking-tight">You are 71% ready for internships.</h1>
        <p className="mt-4 text-gray-400">
          Primary bottlenecks: <span className="text-white font-medium">LeetCode Patterns</span> & <span className="text-white font-medium">Resume Impact Metrics</span>.
        </p>
      </motion.header>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Readiness Breakdown */}
          <motion.section variants={item}>
             <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Readiness Breakdown</h2>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'GitHub', score: 92, status: 'Good', icon: Github },
                  { label: 'LeetCode', score: 78, status: 'Stable', icon: Code },
                  { label: 'Resume', score: 62, status: 'Needs work', icon: FileText },
                  { label: 'ATS Audit', score: 68, status: 'Improve keywords', icon: Target },
                ].map((s) => (
                  <div key={s.label} className="p-5 rounded-lg border border-white/5 bg-[#111] space-y-4 card-premium cursor-pointer">
                    <div className="flex items-center justify-between">
                      <s.icon size={16} className="text-gray-500" />
                      <span className="text-2xl font-bold text-white tracking-tighter">{s.score}</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-300 mb-1">{s.label}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">{s.status}</div>
                    </div>
                  </div>
                ))}
             </div>
          </motion.section>

          {/* This Week Section */}
          <motion.section variants={item} className="p-8 rounded-xl bg-[#111] border border-white/5 space-y-8 card-premium">
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-6">
              <div className="flex items-center gap-3">
                <Terminal size={18} className="text-gray-500" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">This Week</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Strategic Bottlenecks</h3>
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  "Candidate lacks consistent commit history in the last 14 days. Recruiters may flag this as a lapse in technical engagement."
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Sidebar: Action Items & History */}
        <div className="space-y-12">
          <motion.section variants={item}>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Action Items</h2>
            <div className="space-y-4">
              {[
                'Solve 2 Medium Graph problems',
                'Add README to backend-service',
                'Replace 2 resume bullets with metrics',
                'Add 6 target keywords (ATS)',
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-3 group cursor-pointer">
                  <div className="w-5 h-5 rounded border border-white/10 mt-0.5 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all flex items-center justify-center">
                    {i === 2 && <CheckCircle2 size={10} className="text-indigo-500" />}
                  </div>
                  <span className={`text-sm ${i === 2 ? 'text-gray-500 line-through' : 'text-gray-300 group-hover:text-white group-hover:translate-x-0.5'} transition-all duration-200`}>{task}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={item}>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Change History</h2>
            <div className="space-y-6 relative ml-2">
               <div className="absolute left-[-8px] top-1 bottom-1 w-[1px] bg-white/5"></div>
               {[
                 { date: 'Today', delta: '+2%', target: 'LeetCode' },
                 { date: 'Oct 21', delta: '+5%', target: 'Resume' },
                 { date: 'Oct 15', delta: '-1%', target: 'GitHub' },
               ].map((scan, i) => (
                 <div key={i} className="relative pl-6 space-y-1">
                    <div className="absolute left-[-11px] top-1 w-1.5 h-1.5 rounded-full bg-white/10 border border-white/5"></div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/80 font-medium">{scan.target} Scan</span>
                      <span className={scan.delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{scan.delta}</span>
                    </div>
                    <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">{scan.date}</div>
                 </div>
               ))}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default AppHome;
