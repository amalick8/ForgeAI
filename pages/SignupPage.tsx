
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Chrome } from 'lucide-react';

const SignupPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-8 text-center tracking-tight">Create your account</h1>
        
        <div className="space-y-3 mb-8">
          <button 
            onClick={onLogin}
            className="w-full bg-[#111] border border-white/5 text-white py-2.5 rounded-md text-sm font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-3"
          >
            <Github size={18} /> Continue with GitHub
          </button>
          <button 
            onClick={onLogin}
            className="w-full bg-[#111] border border-white/5 text-white py-2.5 rounded-md text-sm font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-3"
          >
            <Chrome size={18} /> Continue with Google
          </button>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-[#0F0F0F] px-3 text-gray-500">Or use email</span></div>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">University Email</label>
            <input 
              type="email" 
              className="w-full bg-[#111] border border-white/5 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="name@university.edu"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#111] border border-white/5 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-white text-black py-3 rounded-md font-bold hover:bg-gray-200 transition-all mt-4 text-sm"
          >
            Create Account
          </button>
        </form>
        <div className="mt-8 text-center text-sm">
          <Link to="/login" className="text-gray-500 hover:text-white transition-colors">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
