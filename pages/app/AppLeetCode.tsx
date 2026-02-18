
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, BrainCircuit, ChevronRight, Target, Award, X, Info, Layout } from 'lucide-react';

// Added isDemo prop to the component signature to match expected usage in App.tsx
const LeetCodeAnalyzer: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  const [selectedTopic, setSelectedTopic] = useState<null | string>(null);

  const topics = [
    { name: 'Arrays', level: 95, strengths: ['Two Pointers', 'Sliding Window'], weaknesses: ['Sparse Arrays'], next: ['Reverse Pairs (Hard)'] },
    { name: 'DP', level: 42, strengths: ['1D Knapsack'], weaknesses: ['2D State', 'Edit Distance'], next: ['Unique Paths II'] },
    { name: 'Graphs', level: 78, strengths: ['BFS', 'Union Find'], weaknesses: ['Bridges/Articulations'], next: ['Critical Connections'] },
    { name: 'Trees', level: 65, strengths: ['Traversal'], weaknesses: ['Lowest Common Ancestor'], next: ['Binary Tree Paths'] },
  ];

  return (
    <div className="space-y-12 pb-12 relative">
      <header className="pb-8 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">LeetCode Audit</h1>
            <p className="text-sm text-gray-500 mt-2">Proficiency: <span className="text-white">Intermediate</span></p>
          </div>
          <Link 
            to={isDemo ? "/demo/leetcode/semantic-analysis" : "/app/leetcode/semantic-analysis"}
            className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <BrainCircuit size={16} /> Semantic Audit
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {[
          { label: 'Total Solved', value: '450' },
          { label: 'Hard/Medium', value: '182' },
          { label: 'Weekly Delta', value: '+12' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-lg bg-[#111] border border-white/5">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="text-3xl font-semibold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Topic Mastery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((item) => (
            <button 
              key={item.name} 
              onClick={() => setSelectedTopic(item.name)}
              className="p-5 rounded-lg border border-white/5 bg-[#111] hover:border-indigo-500/30 transition-all text-left group"
            >
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 group-hover:text-white transition-colors">{item.name}</div>
              <div className="text-2xl font-bold text-white mb-2">{item.level}%</div>
              <div className="h-1 bg-white/5 rounded-full"><div className="h-full bg-indigo-500" style={{ width: `${item.level}%` }}></div></div>
            </button>
          ))}
        </div>
      </section>

      {/* Detail Drawer Simulation */}
      <AnimatePresence>
        {selectedTopic && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 w-96 h-full bg-[#111] border-l border-white/5 p-8 z-[60] shadow-2xl space-y-12"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">{selectedTopic} Deep Dive</h3>
                <button onClick={() => setSelectedTopic(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {topics.find(t => t.name === selectedTopic)?.strengths.map(s => (
                      <span key={s} className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Patterns to review</h4>
                  <div className="flex flex-wrap gap-2">
                    {topics.find(t => t.name === selectedTopic)?.weaknesses.map(w => (
                      <span key={w} className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold">{w}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                  <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4">Recommended Next</h4>
                  <ul className="space-y-2">
                    {topics.find(t => t.name === selectedTopic)?.next.map(n => (
                      <li key={n} className="text-sm text-gray-300 flex items-center gap-2"><Target size={12} /> {n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeetCodeAnalyzer;
