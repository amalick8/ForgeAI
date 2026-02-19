
import React, { useState } from 'react';
import { Github, Search, Star, GitCommit, Layout, ExternalLink, Zap } from 'lucide-react';
import { analyzeGitHub } from '../geminiService';
import { GitHubAnalysis } from '../types';

const GithubAnalyzer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GitHubAnalysis | null>(null);

  const handleSearch = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const data = await analyzeGitHub(username);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12">
        <h1 className="text-3xl font-bold gradient-text">GitHub Pro Analyzer</h1>
        <p className="text-white/50 mt-1">Analyze your open source contributions and repository quality.</p>
      </header>

      <div className="p-8 rounded-[32px] glass border border-white/10 mb-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input 
                type="text" 
                placeholder="Enter GitHub Username (e.g. torvalds)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <button 
            onClick={handleSearch}
            disabled={loading}
            className="px-10 py-4 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
            {loading ? 'Fetching...' : 'Analyze Profile'}
            <Github size={20} />
        </button>
      </div>
      
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="lg:col-span-1 space-y-6">
                <div className="p-8 rounded-[32px] glass border border-white/10 text-center">
                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Quality Score</div>
                    <div className="text-7xl font-bold mb-2 tracking-tighter text-purple-400">{result.qualityScore}%</div>
                    <p className="text-sm text-white/40">Top 5% of student devs</p>
                </div>
                <div className="p-8 rounded-[32px] glass border border-white/10 text-center">
                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Consistency</div>
                    <div className="text-7xl font-bold mb-2 tracking-tighter text-blue-400">{result.consistencyScore}%</div>
                    <p className="text-sm text-white/40">Based on commit activity</p>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-[32px] glass border border-white/10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-400" /> Professional Strengths
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {result.strengths.map((s, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <Star size={18} className="text-yellow-500 shrink-0" />
                                <span className="text-sm font-medium">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-[32px] glass border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Insights</h3>
                        <div className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase">Public Repos</div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400"><Layout size={24} /></div>
                            <div>
                                <div className="font-bold mb-1">Top Repo Complexity: {result.topRepoComplexity}</div>
                                <div className="text-xs text-white/50 leading-relaxed">High algorithmic complexity detected in your main project. This is highly favorable for Backend roles.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-2xl bg-green-500/10 text-green-400"><Star size={24} /></div>
                            <div>
                                <div className="font-bold mb-1">README Score: {result.readmeRating}/10</div>
                                <div className="text-xs text-white/50 leading-relaxed">Your project documentation is excellent. Recruiters often look for clear setup instructions.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GithubAnalyzer;
