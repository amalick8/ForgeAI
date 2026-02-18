
import React, { useState } from 'react';
import { Target, Search, CheckCircle2, XCircle, AlertCircle, FileText, ChevronRight } from 'lucide-react';

const AppATS: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  const [activeTab, setActiveTab] = useState('audit');

  const keywords = [
    { name: 'Distributed Systems', found: true, freq: 3, suggestion: 'Strong coverage.' },
    { name: 'Microservices', found: true, freq: 1, suggestion: 'Mention twice more.' },
    { name: 'Kubernetes', found: false, freq: 0, suggestion: 'Essential for Cloud roles.' },
    { name: 'Unit Testing', found: false, freq: 0, suggestion: 'Add to Skills section.' },
    { name: 'Go / Golang', found: true, freq: 5, suggestion: 'Primary skill match.' },
  ];

  return (
    <div className="space-y-12 pb-12">
      <header className="pb-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">ATS Audit</h1>
          <p className="text-sm text-gray-500 mt-2">Resume Score for "Senior Software Engineer" JD: <span className="text-indigo-400 font-bold">68/100</span></p>
        </div>
        <button 
          disabled={isDemo}
          className="px-4 py-2 rounded-md bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          {isDemo ? 'Audit Demo' : 'Run New Audit'}
        </button>
      </header>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-8">
          <div className="p-8 rounded-xl bg-[#111] border border-white/5">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Keyword Coverage</div>
             <div className="space-y-2">
                {keywords.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                    <div className="flex items-center gap-4">
                      {kw.found ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500/50" />}
                      <span className={`text-sm font-medium ${kw.found ? 'text-white' : 'text-gray-500'}`}>{kw.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-gray-600 font-mono">{kw.freq}x</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{kw.suggestion}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Missing Key Competencies</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Kubernetes', 'Redis', 'Unit Testing', 'CI/CD Pipelines'].map((item) => (
                <div key={item} className="p-3 rounded-md bg-red-500/[0.05] border border-red-500/10 text-xs text-red-400 font-medium">
                   {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="p-6 rounded-xl bg-[#111] border border-white/5 space-y-6">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Matched Job Description</h3>
              <div className="p-4 rounded bg-[#0A0A0A] border border-white/5 text-[11px] text-gray-500 leading-relaxed font-mono h-48 overflow-y-auto">
                "... We are looking for an engineer proficient in <span className="text-white">Go</span> and <span className="text-white">Microservices</span> architecture. Knowledge of <span className="text-indigo-400">Kubernetes</span> is highly preferred. Must have experience with <span className="text-white">Distributed Systems</span> and high-availability design..."
              </div>
              <div className="text-[10px] text-gray-600 italic">Demo view. Paste your target JD in the app to run real matches.</div>
           </div>

           <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fix Suggestions</h3>
              <div className="space-y-3">
                {[
                  'Mention "Kubernetes" in the Skills section.',
                  'Add a project using CI/CD tools.',
                  'Increase "Microservices" frequency.',
                ].map((fix, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer">
                    <AlertCircle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{fix}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AppATS;
