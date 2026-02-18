
import React, { useState } from 'react';
import { ExternalLink, Info, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AppGitHub: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  const [filterMissingReadme, setFilterMissingReadme] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<null | any>(null);

  const allRepos = [
    { name: 'distributed-crawler', readme: 'Solid', commits: 14, language: 'Golang', score: '92', stars: 12, complexity: 'High' },
    { name: 'react-ui-kit', readme: 'Missing', commits: 3, language: 'TypeScript', score: '45', stars: 2, complexity: 'Medium' },
    { name: 'fastapi-backend', readme: 'Fair', commits: 8, language: 'Python', score: '78', stars: 8, complexity: 'High' },
    { name: 'algo-visualizer', readme: 'Solid', commits: 22, language: 'TypeScript', score: '95', stars: 154, complexity: 'High' },
  ];

  const repos = filterMissingReadme ? allRepos.filter(r => r.readme === 'Missing') : allRepos;

  return (
    <div className="space-y-12 pb-12">
      <header className="pb-8 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">GitHub Quality: Good</h1>
            <p className="text-sm text-gray-500 mt-2">Analyzed 14 repositories and 420 total commits.</p>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setFilterMissingReadme(!filterMissingReadme)}
              className={`px-4 py-2 rounded-md text-xs font-bold border transition-all ${filterMissingReadme ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'border-white/10 text-gray-500 hover:text-white'}`}
             >
                {filterMissingReadme ? 'Show All' : 'Only Missing README'}
             </button>
             <button disabled={isDemo} className="px-4 py-2 rounded-md bg-white text-black text-sm font-semibold disabled:opacity-50">Rescan Account</button>
          </div>
        </div>
      </header>

      <section>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-white/5 uppercase tracking-widest text-[10px] font-bold">
                <th className="pb-4 font-bold">Repository</th>
                <th className="pb-4 font-bold text-center">Stars</th>
                <th className="pb-4 font-bold">README</th>
                <th className="pb-4 font-bold">Commits (30d)</th>
                <th className="pb-4 font-bold">Language</th>
                <th className="pb-4 font-bold">Readiness</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {repos.map((repo, i) => (
                <tr 
                  key={i} 
                  onClick={() => setSelectedRepo(repo)}
                  className="border-b border-white/[0.03] group hover:bg-white/[0.01] cursor-pointer"
                >
                  <td className="py-4 font-medium flex items-center gap-2">
                    {repo.name} <ExternalLink size={12} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="py-4 text-center text-gray-600 font-mono text-xs">{repo.stars}</td>
                  <td className="py-4">
                    <span className={repo.readme === 'Missing' ? 'text-red-400' : repo.readme === 'Fair' ? 'text-yellow-500' : 'text-green-500'}>
                      {repo.readme}
                    </span>
                  </td>
                  <td className="py-4">{repo.commits}</td>
                  <td className="py-4 text-gray-500">{repo.language}</td>
                  <td className="py-4 font-mono font-bold">{repo.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Simulation */}
      <AnimatePresence>
        {selectedRepo && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedRepo(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-[#111] border border-white/5 p-10 z-[60] shadow-2xl rounded-2xl space-y-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white tracking-tight">{selectedRepo.name}</h3>
                <button onClick={() => setSelectedRepo(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Architecture Complexity</div>
                   <div className="text-sm font-bold text-white">{selectedRepo.complexity}</div>
                </div>
                <div>
                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Impact Score</div>
                   <div className="text-sm font-bold text-indigo-400">{selectedRepo.score}%</div>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/[0.03]">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Analysis Insights</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Repository demonstrates solid use of design patterns. README documentation is {selectedRepo.readme.toLowerCase()}. {selectedRepo.readme === 'Missing' ? 'Adding a project overview will significantly boost your score.' : 'Architecture is industry-ready.'}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={() => setSelectedRepo(null)} className="px-6 py-2 bg-white text-black text-xs font-bold rounded-md">Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppGitHub;
