
import React, { createContext, useState, useCallback, useContext } from 'react';
import { Toast } from '../types';
import { generateId } from '../utils';

interface ToastContextType {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = generateId();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slide-up bg-white ${
            toast.type === 'success' ? 'border-l-4 border-l-emerald-500' : 
            toast.type === 'error' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500'
          }`}>
            <i className={`fas ${
              toast.type === 'success' ? 'fa-check-circle text-emerald-500' : 
              toast.type === 'error' ? 'fa-exclamation-circle text-red-500' : 'fa-info-circle text-blue-500'
            }`}></i>
            <span className="text-sm font-medium text-slate-800">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
