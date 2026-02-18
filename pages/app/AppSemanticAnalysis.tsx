
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Info, Target, AlertTriangle, TrendingUp } from 'lucide-react';

// Added isDemo prop to the component signature to match expected usage in App.tsx
const AppSemanticAnalysis: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  const masteryData = [
    { name: 'Arrays', level: 95 },
    { name: 'Strings', level: 82 },
    { name: 'Hash Maps', level: 90 },
    { name: 'Two Pointers', level: 65 },
    { name: 'Stacks / Queues', level: 72 },
    { name: 'Linked List', level: 48 },
    { name: 'Trees', level: 54 },
    { name: 'Graphs', level: 32 },
    { name: 'Dynamic Programming', level: 24 },
    { name: 'Greedy', level: 45 },
    { name: 'Binary Search', level: 68 },
    { name: 'Backtracking', level: 12 },
  ];

  return (
    <div className="space-y-12">
      <header className="pb-8 border-b border-white/5">
        <h1 className="text-2xl font-semibold text-white">Semantic Understanding</h1>
        <p className="text-sm text-gray-500 mt-2">Measures conceptual mastery across standard data structures and algorithms.</p>
      </header>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left: Mastery Map */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-3 gap-3">
            {masteryData.map((item, i) => (
              <div 
                key={i} 
                className="group relative aspect-square p-4 rounded-lg bg-[#111] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div 
                  className="absolute inset-0 rounded-lg bg-indigo-500/10 transition-opacity opacity-0 group-hover:opacity-100"
                  style={{ opacity: item.level / 100 * 0.4 }}
                ></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.name}</div>
                  <div className="text-xl font-bold text-white">{item.level}%</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-3 text-sm text-gray-500">
            <Info size={16} />
            <span>Intensity correlates with problem accuracy and solution optimality.</span>
          </div>
        </div>

        {/* Right: Weakness Panel */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">Concept Weakness Panel</h2>
          
          <div className="p-6 rounded-xl bg-red-500/[0.03] border border-red-500/10 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-white">Dynamic Programming</span>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Mastery: 24%</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Observations</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex gap-2"><span>-</span> Struggles with 2D array state representation.</li>
                    <li className="flex gap-2"><span>-</span> Low success on memoization problems.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recommended Focus</h4>
                  <ul className="text-sm text-gray-300 space-y-1 font-medium">
                    <li className="flex items-center gap-2"><Target size={12} className="text-indigo-500" /> Solve 5 Medium DP problems</li>
                    <li className="flex items-center gap-2"><Target size={12} className="text-indigo-500" /> Review bottom-up patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/5 space-y-6">
             <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-white">Backtracking</span>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Mastery: 12%</span>
              </div>
              <p className="text-sm text-gray-500">Insufficient data for a deep audit. Solve more permutation/subset problems to generate a heatmap.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSemanticAnalysis;
