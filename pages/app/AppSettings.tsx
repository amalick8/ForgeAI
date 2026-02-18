
import React from 'react';
import { Github, Code, CreditCard, Lock } from 'lucide-react';

const AppSettings: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  return (
    <div className="space-y-12 pb-12">
      <header className="pb-8 border-b border-white/5">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
      </header>

      <section className="space-y-12 max-w-2xl">
        <div>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Linked Accounts</h2>
          <div className="space-y-4">
            {[
              { label: 'GitHub', user: '@student_dev', icon: Github, color: 'text-white' },
              { label: 'LeetCode', user: '@leet_grinder', icon: Code, color: 'text-orange-500' },
            ].map((acc) => (
              <div key={acc.label} className="flex items-center justify-between p-4 bg-[#111] border border-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <acc.icon size={20} className={acc.color} />
                  <div>
                    <div className="text-sm font-medium">{acc.label}</div>
                    <div className="text-xs text-gray-500">Connected as {acc.user}</div>
                  </div>
                </div>
                <button disabled={isDemo} className="text-xs text-gray-600 font-medium hover:text-red-400 transition-colors disabled:opacity-50">Disconnect</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Plan & Billing</h2>
          <div className="p-6 rounded-lg bg-[#111] border border-white/5 space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <CreditCard size={18} className="text-indigo-500" />
                   <div>
                      <div className="text-sm font-bold">Student Plan</div>
                      <div className="text-xs text-gray-500">$7 / Month • Next billing Mar 1, 2025</div>
                   </div>
                </div>
                <button disabled={isDemo} className="px-4 py-2 rounded border border-white/10 text-xs font-bold hover:bg-white/5 disabled:opacity-50 transition-all">Manage</button>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-widest">Full Name</label>
              <input readOnly={isDemo} type="text" className="w-full bg-[#161616] border border-white/5 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" defaultValue="Dev Student" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-widest">University Email</label>
              <input readOnly={isDemo} type="email" className="w-full bg-[#161616] border border-white/5 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" defaultValue="dev@example.edu" />
            </div>
            <button disabled={isDemo} className="px-6 py-2 bg-white text-black text-sm font-bold rounded-md disabled:opacity-50">Save Changes</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppSettings;
