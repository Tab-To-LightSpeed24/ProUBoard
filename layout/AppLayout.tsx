
import React, { useState } from 'react';
import { AppProvider } from '../contexts/AppContext';
import Sidebar from './Sidebar';
import DashboardView from '../views/DashboardView';
import WorkloadView from '../views/WorkloadView';
import AtRiskView from '../views/AtRiskView';
import EmployeeDirectoryView from '../views/EmployeeDirectoryView';

const AppLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'workload' | 'risk' | 'employees'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppProvider>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8fafc]">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center z-30 sticky top-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-slate-500 hover:text-slate-800 transition-colors">
                <i className="fas fa-bars text-xl"></i>
              </button>
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight capitalize">{currentView === 'risk' ? 'Risk Analysis' : currentView}</h2>
                <p className="text-xs text-slate-500 hidden sm:block">Overview and management</p>
              </div>
            </div>
          </header>

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {currentView === 'dashboard' && <DashboardView />}
              {currentView === 'workload' && <WorkloadView />}
              {currentView === 'risk' && <AtRiskView />}
              {currentView === 'employees' && <EmployeeDirectoryView />}
            </div>
          </main>
        </div>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
        )}
      </div>
    </AppProvider>
  );
};

export default AppLayout;
