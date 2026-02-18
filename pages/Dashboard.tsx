
import React from 'react';
import { User, DashboardStats } from '../types';
import { TrendingUp, FileText, Github, Code, ChevronRight, Award, Zap } from 'lucide-react';

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const stats: DashboardStats = {
    overallScore: 78,
    resumeScore: 82,
    githubScore: 65,
    leetcodeScore: 88,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-white/50 mt-1">Here's your career progress overview.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl glass border border-white/5 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                API Connected
            </div>
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-600/20">
                Run Full Scan
            </button>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 flex flex-col items-center justify-center text-center">
            <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Forge Score</div>
            <div className="text-7xl font-bold mb-4 tracking-tighter">{stats.overallScore}</div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full text-white">
                <TrendingUp size={12} /> +12% this month
            </div>
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
                { label: 'Resume Score', val: stats.resumeScore, icon: FileText, color: 'text-blue-400' },
                { label: 'GitHub Score', val: stats.githubScore, icon: Github, color: 'text-purple-400' },
                { label: 'LeetCode IQ', val: stats.leetcodeScore, icon: Code, color: 'text-orange-400' },
            ].map((s, i) => (
                <div key={i} className="p-6 rounded-3xl glass border border-white/5 flex flex-col justify-between hover:bg-white/[0.05] transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-8">
                        <div className={`p-3 rounded-2xl bg-white/5 ${s.color}`}>
                            <s.icon size={24} />
                        </div>
                        <div className="text-2xl font-bold">{s.val}%</div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white/80 mb-2">{s.label}</div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000`} 
                                style={{ width: `${s.val}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" /> Critical Improvements
            </h2>
            <div className="space-y-4">
                {[
                    { type: 'RESUME', task: 'Add impact metrics to Google Internship bullet points', priority: 'High' },
                    { type: 'GITHUB', task: 'Fix 3 repos without README.md files', priority: 'Medium' },
                    { type: 'LEETCODE', task: 'Review "Dynamic Programming" topic (Mastery: 42%)', priority: 'High' },
                ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl glass border border-white/5 flex items-center justify-between hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="text-[10px] font-bold px-2 py-1 rounded bg-white/10 text-white/60">{item.type}</div>
                            <div className="text-sm font-medium">{item.task}</div>
                        </div>
                        <div className={`text-[10px] font-bold px-3 py-1 rounded-full ${item.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {item.priority}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-6">
             <h2 className="text-xl font-bold flex items-center gap-2">
                <Award size={20} className="text-blue-400" /> Weekly Goals
            </h2>
            <div className="p-6 rounded-3xl glass border border-white/5 space-y-6">
                {[
                    { label: '5 LeetCode Mediums', current: 3, total: 5 },
                    { label: 'GitHub Commits', current: 12, total: 20 },
                    { label: 'Resume Scans', current: 1, total: 1 },
                ].map((goal, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-white/60">{goal.label}</span>
                            <span>{goal.current}/{goal.total}</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full">
                            <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${(goal.current / goal.total) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
