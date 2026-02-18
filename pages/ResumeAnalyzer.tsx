
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, Wand2, ArrowRight } from 'lucide-react';
import { analyzeResume } from '../geminiService';
import { ResumeAnalysis } from '../types';

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      // In a real app, we'd extract text from the PDF/Word file first
      const mockText = "Experience at Google. Built scalable APIs. Improved latency by 20%. Mastered React and TypeScript.";
      const analysis = await analyzeResume(mockText);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-12">
        <h1 className="text-3xl font-bold gradient-text">Resume AI Analyzer</h1>
        <p className="text-white/50 mt-1">Upload your resume to get an ATS-score and impact-driven bullet point rewrites.</p>
      </header>

      {!result ? (
        <div className="p-12 rounded-[40px] border-2 border-dashed border-white/10 glass flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-6">
            <Upload size={32} />
          </div>
          <h2 className="text-xl font-bold mb-2">Upload your resume</h2>
          <p className="text-white/40 text-sm mb-8 max-w-xs">PDF or Word files supported. Maximum size 5MB.</p>
          <input 
            type="file" 
            id="resume-upload" 
            className="hidden" 
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
          <label 
            htmlFor="resume-upload"
            className="px-8 py-3 rounded-2xl bg-white text-black font-bold cursor-pointer hover:bg-white/90 transition-all mb-4"
          >
            {file ? file.name : 'Select File'}
          </label>
          
          {file && (
            <button 
              onClick={startAnalysis}
              disabled={analyzing}
              className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {analyzing ? 'Analyzing with AI...' : 'Analyze Now'}
              <Sparkles size={18} />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[32px] glass border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">ATS Compliance</div>
                <div className="text-6xl font-bold mb-4">{result.atsScore}%</div>
                <div className="text-sm text-white/60">Good, but could be better.</div>
            </div>
            <div className="p-8 rounded-[32px] glass border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Impact Score</div>
                <div className="text-6xl font-bold mb-4">{result.impactScore}%</div>
                <div className="text-sm text-white/60">Strong metrics detected.</div>
            </div>
          </div>

          <div className="p-8 rounded-[32px] glass border border-white/10 space-y-6">
             <h3 className="text-xl font-bold flex items-center gap-2">
                <Wand2 size={20} className="text-purple-400" /> AI Bullet Rewriter
            </h3>
            <div className="space-y-4">
              {result.bulletRewrites.map((b, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <div className="space-y-1">
                        <div className="text-[10px] font-bold text-white/40 uppercase">Original</div>
                        <div className="text-sm text-white/60 italic">{b.original}</div>
                    </div>
                    <div className="flex items-center justify-center py-2">
                        <ArrowRight size={16} className="text-blue-500" />
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] font-bold text-blue-400 uppercase">Forge Enhanced</div>
                        <div className="text-sm font-medium">{b.improved}</div>
                    </div>
                    <div className="pt-2 flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                        <CheckCircle2 size={12} /> {b.impact}
                    </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[32px] glass border border-white/10 space-y-4">
            <h3 className="text-xl font-bold">Key Recommendations</h3>
            <div className="space-y-3">
                <p className="text-sm text-white/60 leading-relaxed">{result.summary}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {result.keywordMatch.map((k, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                            {k}
                        </span>
                    ))}
                </div>
            </div>
          </div>

          <button 
            onClick={() => setResult(null)}
            className="w-full py-4 rounded-2xl glass border border-white/10 font-bold hover:bg-white/5 transition-all"
          >
            Upload New Version
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
