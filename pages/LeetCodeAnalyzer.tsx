
import React, { useState } from 'react';
// Added missing 'Layout' icon to imports from lucide-react
import { Code, Trophy, Target, Award, BrainCircuit, BarChart3, ChevronRight, Layout } from 'lucide-react';
import { LeetCodeAnalysis } from '../types';

const LeetCodeAnalyzer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<LeetCodeAnalysis | null>(null);

  const handleAnalyze = () => {
    if (!username) return;
    setLoading(true);
    // Simulation
    setTimeout(() => {
        setStats({
            masteryScore: 84,
            problemsSolved: 450,
            difficultyDistribution: { easy: 150, medium: 250, hard: 50 },
            readinessPercentage: 92
        });
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12">
        <h1 className="text-3xl font-bold gradient-text">LeetCode IQ</h1>
        <p className="text-white/50 mt-1">Measure your problem-solving proficiency and company-readiness.</p>
      </header>

      <div className="p-8 rounded-[32px] glass border border-white/10 mb-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
            <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input 
                type="text" 
                placeholder="LeetCode Username"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="px-10 py-4 rounded-2xl bg-orange-600 text-white font-bold hover:bg-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
            {loading ? 'Analyzing...' : 'Fetch IQ'}
            <Trophy size={20} />
        </button>
      </div>

      {stats && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-[32px] glass border border-white/10 flex flex-col items-center justify-center text-center">
                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Interview Readiness</div>
                    <div className="text-7xl font-bold mb-2 tracking-tighter text-orange-400">{stats.readinessPercentage}%</div>
                    <div className="text-xs text-white/40">Ready for Google/Meta rounds</div>
                </div>

                <div className="md:col-span-2 p-8 rounded-[32px] glass border border-white/10">
                    <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                        <BarChart3 size={20} className="text-blue-400" /> Problem Distribution
                    </h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Easy', count: stats.difficultyDistribution.easy, color: 'bg-green-500', total: 600 },
                            { label: 'Medium', count: stats.difficultyDistribution.medium, color: 'bg-yellow-500', total: 1200 },
                            { label: 'Hard', count: stats.difficultyDistribution.hard, color: 'bg-red-500', total: 500 },
                        ].map((d, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                                    <span>{d.label} ({d.count})</span>
                                    <span>{Math.round((d.count / d.total) * 100)}% of catalog</span>
                                </div>
                                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${d.color} rounded-full transition-all duration-1000`}
                                        style={{ width: `${(d.count / (stats.problemsSolved || 1)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-[32px] glass border border-white/10">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <BrainCircuit size={20} className="text-purple-400" /> Topic Mastery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { topic: 'Data Structures', mastery: 95, icon: Target },
                        { topic: 'Algorithms', mastery: 82, icon: Award },
                        { topic: 'System Design', mastery: 45, icon: Layout },
                        { topic: 'Concurrency', mastery: 30, icon: Code },
                    ].map((m, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <m.icon size={20} className="text-blue-400" />
                                <span className="text-xl font-bold">{m.mastery}%</span>
                            </div>
                            <div className="text-sm font-medium text-white/60">{m.topic}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default LeetCodeAnalyzer;
