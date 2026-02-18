
import React from 'react';
import { Upload, ArrowRight, Zap, Download, Info } from 'lucide-react';

const AppResume: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  return (
    <div className="space-y-12 pb-12">
      <header className="pb-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Resume Audit</h1>
          <p className="text-sm text-gray-500 mt-2">Last uploaded: 2 days ago.</p>
        </div>
        <div className="flex gap-4">
           <button 
            disabled={isDemo}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 text-xs font-bold text-gray-400 hover:text-white transition-all group relative disabled:opacity-50"
           >
              <Download size={14} /> Export PDF
              {isDemo && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity">Demo mode</div>}
           </button>
           <button disabled={isDemo} className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-bold disabled:opacity-50">
            <Upload size={14} /> Update File
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Preview (Visual mock) */}
        <div className="space-y-6">
           <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Resume Preview</h2>
           <div className="aspect-[1/1.4] bg-white text-black p-10 shadow-2xl rounded-sm overflow-hidden text-[8px] font-sans pointer-events-none opacity-90">
              <div className="text-center mb-6">
                <div className="text-lg font-bold">Dev Student</div>
                <div className="text-gray-600">San Francisco, CA • student@example.edu</div>
              </div>
              <div className="space-y-4">
                <div className="border-b border-black font-bold uppercase text-[10px]">Education</div>
                <div className="flex justify-between font-bold"><span>University of Technology</span><span>Expected 2026</span></div>
                <div className="border-b border-black font-bold uppercase text-[10px]">Experience</div>
                <div className="space-y-2">
                  <div className="flex justify-between font-bold"><span>Software Engineer Intern @ TechCorp</span><span>2024</span></div>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Developed backend services using Golang and Microservices.</li>
                    <li>Reduced latency of crawler service by 20% using better algorithms.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 text-[6px] text-gray-300 italic text-center">... read more in full audit</div>
           </div>
        </div>

        {/* Right: Scores & Suggestions */}
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-[#111] border border-white/5">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Impact Score</div>
              <div className="text-4xl font-semibold text-white tracking-tight">68%</div>
            </div>
            <div className="p-6 rounded-lg bg-[#111] border border-white/5">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Keyword Coverage</div>
              <div className="text-4xl font-semibold text-white tracking-tight">82%</div>
            </div>
          </div>

          <section className="space-y-6">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Impact Rewrites</h2>
            <div className="space-y-4">
              {[
                { 
                  original: 'Built a web application for university students.', 
                  improved: 'Developed a high-concurrency event portal using React, reducing load times by 40% for 2,000+ users.' 
                },
                { 
                  original: 'Fixed bugs in the backend system.', 
                  improved: 'Architected an automated testing pipeline in Python that reduced regression errors by 15% across 4 microservices.' 
                }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-lg border border-white/5 space-y-3 bg-[#0D0D0D]">
                  <div className="text-[10px] text-gray-600 uppercase font-bold">Before</div>
                  <div className="text-xs text-gray-400 italic">"{item.original}"</div>
                  <div className="flex justify-center"><ArrowRight size={12} className="text-white/10" /></div>
                  <div className="text-[10px] text-indigo-400 uppercase font-bold flex items-center gap-1">
                    <Zap size={10} /> After
                  </div>
                  <div className="text-sm text-white font-medium leading-relaxed">"{item.improved}"</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppResume;
