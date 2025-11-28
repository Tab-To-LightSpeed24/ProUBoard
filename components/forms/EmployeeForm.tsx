
import React, { useState } from 'react';
import { EmployeeRole } from '../../types';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';

const EmployeeForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addEmployee } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer' as EmployeeRole,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({
      ...formData,
      isActive: true,
      avatarColor: '#' + Math.floor(Math.random()*16777215).toString(16)
    });
    onClose();
  };

  const inputClass = "w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Full Name</label>
        <input 
          type="text" required
          placeholder="Jane Doe"
          className={inputClass}
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div>
        <label className={labelClass}>Email Address</label>
        <input 
          type="email" required
          placeholder="jane@company.com"
          className={inputClass}
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div>
        <label className={labelClass}>Role</label>
        <div className="relative">
          <select 
            className={`${inputClass} appearance-none`}
            value={formData.role}
            onChange={e => setFormData({...formData, role: e.target.value as EmployeeRole})}
          >
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Product">Product</option>
            <option value="Analyst">Analyst</option>
          </select>
          <i className="fas fa-chevron-down absolute right-3 top-3 text-slate-400 text-xs pointer-events-none"></i>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Profile</Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
