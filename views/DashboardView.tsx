
import React, { useState, useMemo } from 'react';
import { Task } from '../types';
import { useApp } from '../contexts/AppContext';
import { getTodayString, isOverdue } from '../utils';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/forms/TaskForm';
import TaskItem from '../components/TaskItem';

const DashboardView: React.FC = () => {
  const { tasks, deleteTask } = useApp();
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const todayStr = getTodayString();
  
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    const overdue = tasks.filter(t => isOverdue(t.dueDate, t.status)).length;
    return { total, completed, overdue };
  }, [tasks]);

  const urgentTasks = tasks.filter(t => 
    t.status !== 'Done' && (isOverdue(t.dueDate, t.status) || t.dueDate === todayStr)
  ).sort((a,b) => a.dueDate.localeCompare(b.dueDate));

  const upcomingTasks = tasks.filter(t => 
    t.status !== 'Done' && t.dueDate > todayStr && !isOverdue(t.dueDate, t.status)
  ).sort((a,b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 5);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 flex flex-col justify-between h-32 hover:border-slate-300 transition-colors group">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tasks</p>
            <i className="fas fa-layer-group text-slate-300 group-hover:text-slate-400 transition-colors"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800 tracking-tight">{stats.total}</p>
        </Card>
        
        <Card className="p-6 flex flex-col justify-between h-32 hover:border-emerald-200 transition-colors group">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Completed</p>
             <i className="fas fa-check-circle text-emerald-100 group-hover:text-emerald-200 transition-colors"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800 tracking-tight">{stats.completed}</p>
        </Card>
        
        <Card className="p-6 flex flex-col justify-between h-32 hover:border-red-200 transition-colors group">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Overdue</p>
             <i className="fas fa-clock text-red-100 group-hover:text-red-200 transition-colors"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800 tracking-tight">{stats.overdue}</p>
        </Card>

        <button 
          onClick={() => { setEditingTask(undefined); setTaskModalOpen(true); }}
          className="h-32 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mb-2 transition-colors">
            <i className="fas fa-plus text-sm"></i>
          </div>
          <span className="text-sm font-medium">Create Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgent Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Priority Focus
            </h3>
            <span className="text-xs font-medium text-slate-400">{urgentTasks.length} tasks</span>
          </div>
          <div className="space-y-3">
            {urgentTasks.length === 0 ? (
              <div className="py-12 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <i className="fas fa-mug-hot text-slate-300 text-2xl mb-2"></i>
                <p className="text-sm text-slate-500">All caught up on urgent matters.</p>
              </div>
            ) : (
              urgentTasks.map(task => (
                <TaskItem key={task.id} task={task} onEdit={() => handleEdit(task)} onDelete={() => deleteTask(task.id)} />
              ))
            )}
          </div>
        </div>

        {/* Upcoming Column */}
        <div className="space-y-4">
           <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Upcoming
            </h3>
             <span className="text-xs font-medium text-slate-400">{upcomingTasks.length} tasks</span>
          </div>
          <div className="space-y-3">
             {upcomingTasks.length === 0 ? (
              <div className="py-12 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm text-slate-500">No upcoming tasks scheduled.</p>
              </div>
            ) : (
              upcomingTasks.map(task => (
                <TaskItem key={task.id} task={task} onEdit={() => handleEdit(task)} onDelete={() => deleteTask(task.id)} />
              ))
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} title={editingTask ? "Edit Task" : "New Task"}>
        <TaskForm onClose={() => setTaskModalOpen(false)} initialData={editingTask} />
      </Modal>
    </div>
  );
};

export default DashboardView;
