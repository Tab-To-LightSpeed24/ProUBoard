
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmployeeForm from '../components/forms/EmployeeForm';

const EmployeeDirectoryView: React.FC = () => {
  const { employees, toggleEmployeeStatus } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Team Directory</h2>
          <p className="text-sm text-slate-500 mt-1">Manage employee access and roles.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}><i className="fas fa-plus"></i> Add Member</Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm" style={{backgroundColor: emp.avatarColor}}>
                      {emp.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">{emp.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{emp.role}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{emp.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${emp.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${emp.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    {emp.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => toggleEmployeeStatus(emp.id)} className="text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors">
                    {emp.isActive ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Team Member">
        <EmployeeForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default EmployeeDirectoryView;
