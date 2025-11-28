
import { Employee, Task, TaskStatus } from './types';

// --- Mock Data Seeds & Credentials ---

export const SEED_EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Alice Johnson', role: 'Developer', email: 'alice@prouboard.com', isActive: true, avatarColor: '#3B82F6' },
  { id: 'e2', name: 'Bob Smith', role: 'Designer', email: 'bob@prouboard.com', isActive: true, avatarColor: '#10B981' },
  { id: 'e3', name: 'Charlie Davis', role: 'Manager', email: 'charlie@prouboard.com', isActive: true, avatarColor: '#F59E0B' },
  { id: 'e4', name: 'Diana Prince', role: 'Product', email: 'diana@prouboard.com', isActive: true, avatarColor: '#8B5CF6' },
  { id: 'e5', name: 'Evan Wright', role: 'Developer', email: 'evan@prouboard.com', isActive: false, avatarColor: '#64748B' },
];

export const MOCK_CREDENTIALS: Record<string, string> = {
  'alice@prouboard.com': 'dev123',
  'bob@prouboard.com': 'design123',
  'charlie@prouboard.com': 'manager123',
  'diana@prouboard.com': 'product123',
  'evan@prouboard.com': 'dev123',
  'admin@prouboard.com': 'admin123' 
};

export const SEED_TASKS: Task[] = [
  { id: 't1', title: 'Q3 Financial Report', description: 'Compile all Q3 data.', assigneeId: 'e3', status: 'In Progress', priority: 'High', dueDate: new Date().toISOString().split('T')[0], createdAt: '2023-10-01' },
  { id: 't2', title: 'Homepage Redesign', description: 'New hero section.', assigneeId: 'e2', status: 'Todo', priority: 'Medium', dueDate: '2023-12-01', createdAt: '2023-10-05' },
  { id: 't3', title: 'API Optimization', description: 'Reduce latency by 20%.', assigneeId: 'e1', status: 'In Progress', priority: 'High', dueDate: '2023-10-20', createdAt: '2023-10-10' },
  { id: 't4', title: 'User Interview Analysis', description: 'Analyze batch 2.', assigneeId: 'e4', status: 'Done', priority: 'Medium', dueDate: '2023-10-15', createdAt: '2023-10-01' },
  { id: 't5', title: 'Fix Login Bug', description: 'Critical auth failure.', assigneeId: null, status: 'Todo', priority: 'High', dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], createdAt: '2023-10-18' }, // Overdue
  { id: 't6', title: 'Team Sync', description: 'Weekly sync.', assigneeId: 'e3', status: 'Todo', priority: 'Low', dueDate: new Date().toISOString().split('T')[0], createdAt: '2023-10-20' },
];

// --- Utilities ---

export const generateId = () => Math.random().toString(36).substr(2, 9);
export const getTodayString = () => new Date().toISOString().split('T')[0];

export const isOverdue = (dateStr: string, status: TaskStatus) => {
  if (status === 'Done') return false;
  return dateStr < getTodayString();
};

export const isDueSoon = (dateStr: string) => {
  const today = new Date();
  const due = new Date(dateStr);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays >= 0 && diffDays <= 3;
};
