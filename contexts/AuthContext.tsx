
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types';
import { MOCK_CREDENTIALS, SEED_EMPLOYEES } from '../utils';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    // Simulate checking session
    const storedUser = localStorage.getItem('prouboard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Strict credential validation
    if (MOCK_CREDENTIALS[email] === password) {
      // Find matching employee details if available, otherwise fallback to Admin
      const matchingEmp = SEED_EMPLOYEES.find(e => e.email === email);
      
      const mockUser: User = {
        id: matchingEmp ? matchingEmp.id : 'u_admin',
        name: matchingEmp ? matchingEmp.name : 'System Administrator',
        email: email,
        avatarColor: matchingEmp ? matchingEmp.avatarColor : '#4F46E5'
      };
      
      setUser(mockUser);
      localStorage.setItem('prouboard_user', JSON.stringify(mockUser));
      setIsLoading(false);
      addToast(`Welcome back, ${mockUser.name}`);
      return true;
    } else {
      setIsLoading(false);
      addToast('Invalid credentials. Access denied.', 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prouboard_user');
    addToast('Signed out successfully', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
