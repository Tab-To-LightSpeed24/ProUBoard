
export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Todo' | 'In Progress' | 'Done';
export type EmployeeRole = 'Manager' | 'Developer' | 'Designer' | 'Product' | 'Analyst';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
}

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  email: string;
  isActive: boolean;
  avatarColor: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: string; // YYYY-MM-DD
  createdAt: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
