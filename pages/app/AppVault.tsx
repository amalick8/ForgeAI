
import React, { useState } from 'react';
import { Search, Filter, Bookmark, Briefcase, ChevronRight } from 'lucide-react';

const AppVault: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  const [activeTab, setActiveTab] = useState('all');

  const questions = [
    { title: 'Reverse Nodes in k-Group', company: 'Cloud Infrastructure', difficulty: 'Hard', topic: 'Linked List', pattern: 'Recursion' },
    { title: 'LRU Cache Design', company: 'Search Systems', difficulty: 'Medium', topic: 'Design', pattern: 'Doubly Linked List' },
    { title: 'Subarray Sum Equals K', company: 'Ads Team', difficulty: 'Medium', topic: 'Hash Table', pattern: 'Prefix Sum' },
    { title: 'Serialize Binary Tree', company: 'Data Processing', difficulty: 'Hard', topic: 'Tree', pattern: 'DFS' },
  ];

  return (
    <div className="space-y-12 pb-12">
      <header className="pb-8 border-b border-white/5">
        <h1 className="text-2xl font-semibold text-white">Interview Vault</h1>
        <p className="text-sm text-gray-500 mt-2">Historical questions categorized by difficulty and pattern.</p>
      </header>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
          <input 
            type="text" 
            placeholder="Search patterns (e.g. Slidding Window)..."
            className="w-full pl-10 pr-4 py-2 bg-[#111] border border-white/5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>
        <button className="px-4 py-2 border border-white/10 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-all text-gray-400">
          <Filter size={14} /> Filter
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {questions.map((q, i) => (
          <div key={i} className="flex flex-col justify-between p-6 border border-white/[0.03] rounded-xl bg-[#111] hover:border-white/10 transition-colors group cursor-pointer h-48">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${q.difficulty === 'Hard' ? 'border-red-500/20 text-red-400' : 'border-yellow-500/20 text-yellow-500'} uppercase tracking-widest`}>
                  {q.difficulty}
                </span>
                <Bookmark size={14} className="text-gray-700 hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-md font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{q.title}</div>
                <div className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mt-1">{q.pattern} • {q.topic}</div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.03] pt-4">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <Briefcase size={12} /> {q.company}
              </div>
              <ChevronRight size={14} className="text-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppVault;
