
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'judge';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'judge') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('scriptPortalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'judge'): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const mockUsers = {
      admin: { email: 'admin@honeyandhemlock.com', password: 'admin123' },
      judge: { email: 'judge@honeyandgemlock.com', password: 'judge123' }
    };

    if (mockUsers[role].email === email && mockUsers[role].password === password) {
      const userData = { id: `${role}_1`, email, role };
      setUser(userData);
      localStorage.setItem('scriptPortalUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('scriptPortalUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
