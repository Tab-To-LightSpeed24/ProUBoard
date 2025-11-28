
import React from 'react';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';

const WorkloadView: React.FC = () => {
  const { employees, tasks } = useApp();

  const getWorkload = (empId: string) => {
    const empTasks = tasks.filter(t => t.assigneeId === empId && t.status !== 'Done');
    const todo = empTasks.filter(t => t.status === 'Todo').length;
    const inProgress = empTasks.filter(t => t.status === 'In Progress').length;
    const total = todo + inProgress;
    
    let status = 'Light';
    let color = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (total >= 3) { status = 'Medium'; color = 'bg-amber-100 text-amber-800 border-amber-200'; }
    if (total > 5) { status = 'Heavy'; color = 'bg-red-100 text-red-800 border-red-200'; }
    
    return { todo, inProgress, total, status, color };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {employees.filter(e => e.isActive).map(emp => {
        const load = getWorkload(emp.id);
        return (
          <Card key={emp.id} className="p-6 relative overflow-hidden group hover:border-indigo-200 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm" style={{backgroundColor: emp.avatarColor}}>
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{emp.name}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{emp.role}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${load.color}`}>
                {load.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end text-sm">
                 <span className="text-slate-500 font-medium">Active Load</span>
                 <span className="text-2xl font-bold text-slate-800 leading-none">{load.total}</span>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                <div className="bg-indigo-600 h-2" style={{ width: `${load.total > 0 ? (load.inProgress / load.total) * 100 : 0}%` }}></div>
                <div className="bg-slate-300 h-2" style={{ width: `${load.total > 0 ? (load.todo / load.total) * 100 : 0}%` }}></div>
              </div>
              
              <div className="flex gap-6 text-xs font-medium pt-2 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span> In Progress <span className="text-slate-900 font-bold ml-1">{load.inProgress}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span> Todo <span className="text-slate-900 font-bold ml-1">{load.todo}</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default WorkloadView;
