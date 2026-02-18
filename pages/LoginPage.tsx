
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome back</h1>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-[#111] border border-white/5 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="name@university.edu"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#111] border border-white/5 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition-all mt-4"
          >
            Log in
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link to="/signup" className="text-gray-500 hover:text-white transition-colors">Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
