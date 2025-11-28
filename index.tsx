
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './layout/AppLayout';
import LoginView from './views/LoginView';

const Root: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">Initializing ProUBoard...</p>
      </div>
    );
  }

  return user ? <AppLayout /> : <LoginView />;
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </ToastProvider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
