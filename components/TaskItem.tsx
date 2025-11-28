
import React from 'react';
import { Task } from '../types';
import { useApp } from '../contexts/AppContext';
import { isOverdue } from '../utils';
import Button from './ui/Button';
import Badge from './ui/Badge';

const TaskItem: React.FC<{ task: Task; onEdit: () => void; onDelete: () => void }> = ({ task, onEdit, onDelete }) => {
  const { employees } = useApp();
  const assignee = employees.find(e => e.id === task.assigneeId);
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:shadow-soft transition-all duration-200">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className={`font-semibold text-sm text-slate-800 ${task.status === 'Done' ? 'line-through text-slate-400' : ''}`}>{task.title}</h4>
          <Badge color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'blue'}>
            {task.priority}
          </Badge>
          {overdue && <Badge color="red">Overdue</Badge>}
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <i className="far fa-calendar text-slate-400"></i> {task.dueDate}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="far fa-user text-slate-400"></i> {assignee ? assignee.name : 'Unassigned'}
          </span>
          <span className={`flex items-center gap-1.5 ${task.status === 'Done' ? 'text-emerald-600' : ''}`}>
             <div className={`w-1.5 h-1.5 rounded-full ${
               task.status === 'Done' ? 'bg-emerald-500' : 
               task.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-300'
             }`}></div>
             {task.status}
          </span>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" onClick={onEdit} className="!p-2 h-8 w-8"><i className="fas fa-pen text-xs"></i></Button>
        <Button variant="ghost" onClick={onDelete} className="!p-2 h-8 w-8 hover:!text-red-600 hover:!bg-red-50"><i className="fas fa-trash text-xs"></i></Button>
      </div>
    </div>
  );
};

export default TaskItem;
