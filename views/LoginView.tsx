
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginView: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await login(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 pb-6">
          <div className="flex justify-center mb-6">
             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <i className="fas fa-layer-group text-white text-lg"></i>
              </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 tracking-tight">Welcome back</h2>
          <p className="text-center text-slate-500 text-sm mt-2">Sign in to access your workspace</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i> Signing In...
                </>
              ) : 'Sign In'}
            </button>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-4">
            Protected by ProUBoard Enterprise Security
          </p>
        </form>
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account? <a href="https://github.com/Tab-To-LightSpeed24/track3-fullstack#allowed-mock-authentication-credentials" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold cursor-pointer hover:underline">Contact Admin</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
