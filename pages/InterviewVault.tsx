
import React, { useState } from 'react';
import { Lock, Search, Filter, Bookmark, ExternalLink, ChevronRight, Briefcase } from 'lucide-react';

const InterviewVault: React.FC = () => {
  const questions = [
    { id: 1, title: 'Reverse Nodes in k-Group', company: 'Google', difficulty: 'Hard', topic: 'Linked List' },
    { id: 2, title: 'Serialize and Deserialize Binary Tree', company: 'Amazon', difficulty: 'Hard', topic: 'Tree' },
    { id: 3, title: 'Valid Parentheses', company: 'Meta', difficulty: 'Easy', topic: 'Stack' },
    { id: 4, title: 'Two Sum', company: 'Apple', difficulty: 'Easy', topic: 'Array' },
    { id: 5, title: 'LRU Cache', company: 'Netflix', difficulty: 'Medium', topic: 'Design' },
    { id: 6, title: 'Subarray Sum Equals K', company: 'Google', difficulty: 'Medium', topic: 'Hash Table' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Lock size={14} /> Premium Access
        </div>
        <h1 className="text-3xl font-bold gradient-text">FAANG Interview Vault</h1>
        <p className="text-white/50 mt-1">Direct access to the most frequent questions asked at top-tier tech companies.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input 
                type="text" 
                placeholder="Search by company or keyword..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
            />
        </div>
        <button className="px-6 py-4 rounded-2xl glass border border-white/10 font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
            <Filter size={20} /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((q) => (
            <div key={q.id} className="p-6 rounded-[32px] glass border border-white/10 hover:border-white/20 transition-all group flex flex-col justify-between h-56">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider
                            ${q.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400' : 
                              q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 
                              'bg-green-500/10 text-green-400'}
                        `}>
                            {q.difficulty}
                        </div>
                        <button className="text-white/20 hover:text-white transition-colors">
                            <Bookmark size={18} />
                        </button>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-2">{q.title}</h3>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                            <Briefcase size={14} />
                        </div>
                        <div className="text-xs font-bold text-white/60">{q.company}</div>
                    </div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{q.topic}</div>
                </div>
            </div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-[40px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
            <h3 className="text-2xl font-bold mb-2">Want the full 500+ list?</h3>
            <p className="text-white/60">Unlock company-specific interview frequency lists and solution guides.</p>
        </div>
        <button className="px-10 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform shrink-0">
            Unlock Pro Vault
        </button>
      </div>
    </div>
  );
};

export default InterviewVault;
