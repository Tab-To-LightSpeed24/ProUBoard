
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'dashboard' | 'workload' | 'risk' | 'employees') => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItemClass = (view: string) => 
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${currentView === view ? 'bg-slate-800 text-white shadow-lg shadow-slate-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`;

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0f172a] text-white transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col`}>
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <i className="fas fa-layer-group text-white text-xs"></i>
          </div>
          ProUBoard
        </h1>
        <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide">ENTERPRISE EDITION</p>
      </div>
      
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        <div className="px-4 pb-2 pt-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Main Menu</p>
        </div>
        <div onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }} className={navItemClass('dashboard')}>
          <i className="fas fa-chart-pie w-5 text-center"></i> Dashboard
        </div>
        <div onClick={() => { setCurrentView('workload'); setMobileMenuOpen(false); }} className={navItemClass('workload')}>
          <i className="fas fa-users w-5 text-center"></i> Workload
        </div>
        <div onClick={() => { setCurrentView('risk'); setMobileMenuOpen(false); }} className={navItemClass('risk')}>
          <i className="fas fa-exclamation-triangle w-5 text-center"></i> Risk Analysis
        </div>
        
         <div className="px-4 pb-2 pt-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Administration</p>
        </div>
        <div onClick={() => { setCurrentView('employees'); setMobileMenuOpen(false); }} className={navItemClass('employees')}>
          <i className="fas fa-address-book w-5 text-center"></i> Directory
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 relative">
        <div 
          className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-800/50 rounded-lg transition-colors"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
           <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ backgroundColor: user?.avatarColor }}>
              {user?.name.charAt(0)}
           </div>
           <div className="flex-1">
             <p className="text-sm font-medium text-white">{user?.name}</p>
             <p className="text-xs text-slate-500 truncate max-w-[120px]">{user?.email}</p>
           </div>
           <i className="fas fa-chevron-up text-xs text-slate-500"></i>
        </div>
        
        {/* User Dropdown */}
        {showUserMenu && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden animate-fade-in">
            <button onClick={logout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors flex items-center gap-2">
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
