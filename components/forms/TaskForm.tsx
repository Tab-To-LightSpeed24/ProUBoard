
import React, { useState } from 'react';
import { Task, Priority, TaskStatus } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { getTodayString } from '../../utils';
import Button from '../ui/Button';

const TaskForm: React.FC<{ onClose: () => void; initialData?: Task }> = ({ onClose, initialData }) => {
  const { employees, addTask, updateTask } = useApp();
  const [formData, setFormData] = useState<Partial<Task>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    assigneeId: initialData?.assigneeId || '',
    priority: initialData?.priority || 'Medium',
    status: initialData?.status || 'Todo',
    dueDate: initialData?.dueDate || getTodayString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    
    if (initialData) {
      updateTask(initialData.id, formData);
    } else {
      addTask(formData as any);
    }
    onClose();
  };

  const inputClass = "w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Task Title</label>
        <input 
          type="text" 
          required
          placeholder="e.g. Q4 Marketing Strategy"
          className={inputClass}
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea 
          className={inputClass}
          rows={3}
          placeholder="Brief details about the task..."
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Assignee</label>
          <div className="relative">
            <select 
              className={`${inputClass} appearance-none`}
              value={formData.assigneeId || ''}
              onChange={e => setFormData({...formData, assigneeId: e.target.value || null})}
            >
              <option value="">Unassigned</option>
              {employees.filter(e => e.isActive).map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-3 text-slate-400 text-xs pointer-events-none"></i>
          </div>
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input 
            type="date" 
            className={inputClass}
            value={formData.dueDate}
            onChange={e => setFormData({...formData, dueDate: e.target.value})}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Priority</label>
          <div className="relative">
            <select 
              className={`${inputClass} appearance-none`}
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-3 text-slate-400 text-xs pointer-events-none"></i>
          </div>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <div className="relative">
            <select 
              className={`${inputClass} appearance-none`}
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value as TaskStatus})}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
             <i className="fas fa-chevron-down absolute right-3 top-3 text-slate-400 text-xs pointer-events-none"></i>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Task</Button>
      </div>
    </form>
  );
};

export default TaskForm;
