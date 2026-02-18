
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo credentials check
    if (email === 'demo@forge.com' && password === 'demo1234') {
      onLogin();
      navigate('/app/home');
    } else {
      setError('Invalid email or password. Try demo@forge.com / demo1234');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome back</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-[#111] border border-white/5 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="demo@forge.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#111] border border-white/5 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="demo1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}
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
