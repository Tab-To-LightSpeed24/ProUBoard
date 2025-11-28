
import React from 'react';

const Badge: React.FC<{ children: React.ReactNode; color?: 'red' | 'yellow' | 'green' | 'blue' | 'gray' }> = ({ children, color = 'gray' }) => {
  const colors = {
    red: 'bg-red-50 text-red-700 border-red-100',
    yellow: 'bg-amber-50 text-amber-700 border-amber-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    gray: 'bg-slate-50 text-slate-600 border-slate-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${colors[color]}`}>
      {children}
    </span>
  );
};

export default Badge;
