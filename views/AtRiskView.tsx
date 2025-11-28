
import React, { useState } from 'react';
import { Task } from '../types';
import { useApp } from '../contexts/AppContext';
import { isOverdue, isDueSoon } from '../utils';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/forms/TaskForm';
import TaskItem from '../components/TaskItem';

const AtRiskView: React.FC = () => {
  const { tasks, deleteTask } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task>();

  const riskTasks = tasks.filter(t => {
    if (t.status === 'Done') return false;
    const overdue = isOverdue(t.dueDate, t.status);
    const unassigned = !t.assigneeId;
    const highPriSoon = t.priority === 'High' && isDueSoon(t.dueDate);
    return overdue || unassigned || highPriSoon;
  });

  const handleEdit = (t: Task) => {
    setEditTask(t);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-red-50/50 border border-red-100 p-6 rounded-xl flex items-start gap-4">
        <div className="p-2 bg-red-100 rounded-lg text-red-600">
          <i className="fas fa-shield-alt text-xl"></i>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Risk Assessment</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            The following tasks require immediate attention. They are either overdue, unassigned, or high-priority items due within 72 hours.
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        {riskTasks.length === 0 ? (
           <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <i className="fas fa-check text-2xl"></i>
             </div>
             <h3 className="text-slate-900 font-bold">All Clear</h3>
             <p className="text-slate-500 text-sm mt-1">No at-risk items detected.</p>
           </div>
        ) : (
          riskTasks.map(t => (
            <TaskItem key={t.id} task={t} onEdit={() => handleEdit(t)} onDelete={() => deleteTask(t.id)} />
          ))
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Resolve Risk">
        <TaskForm onClose={() => setModalOpen(false)} initialData={editTask} />
      </Modal>
    </div>
  );
};

export default AtRiskView;
