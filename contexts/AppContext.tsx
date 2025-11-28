
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Employee, Task } from '../types';
import { SEED_EMPLOYEES, SEED_TASKS, generateId, getTodayString } from '../utils';
import { useToast } from './ToastContext';

interface AppContextType {
  employees: Employee[];
  tasks: Task[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleEmployeeStatus: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  
  // Load from local storage or seeds
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('prouboard_employees');
    return saved ? JSON.parse(saved) : SEED_EMPLOYEES;
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('prouboard_tasks');
    return saved ? JSON.parse(saved) : SEED_TASKS;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('prouboard_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('prouboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    setEmployees(prev => [...prev, { ...emp, id: generateId() }]);
    addToast('Employee profile created successfully');
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    addToast('Employee details updated');
  };

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(prev => prev.map(e => {
      if (e.id === id) {
        const newStatus = !e.isActive;
        addToast(`Employee ${newStatus ? 'activated' : 'deactivated'}`, 'info');
        return { ...e, isActive: newStatus };
      }
      return e;
    }));
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks(prev => [...prev, { ...task, id: generateId(), createdAt: getTodayString() }]);
    addToast('New task created');
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    addToast('Task updated');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    addToast('Task deleted', 'info');
  };

  return (
    <AppContext.Provider value={{ employees, tasks, addEmployee, updateEmployee, toggleEmployeeStatus, addTask, updateTask, deleteTask }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
