
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthUser extends User {
  role?: 'admin' | 'judge';
  isAdmin?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          const authUser: AuthUser = {
            ...session.user,
            role: session.user.user_metadata?.role || 
                  (session.user.email === 'admin@honeyandhemlock.productions' ? 'admin' : undefined)
          };
          setUser(authUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const authUser: AuthUser = {
          ...session.user,
          role: session.user.user_metadata?.role || 
                (session.user.email === 'admin@honeyandhemlock.productions' ? 'admin' : undefined)
        };
        setUser(authUser);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if this is the admin user trying to log in
      if (email === 'admin@honeyandhemlock.productions') {
        // Use our custom admin authentication function
        const { data, error } = await supabase.rpc('authenticate_admin', {
          admin_email: email,
          admin_password: password
        });

        if (error || !data || data.length === 0) {
          return { success: false, error: 'Invalid admin credentials' };
        }

        // Create a mock session for the admin user
        const adminUser: AuthUser = {
          id: data[0].id,
          email: data[0].email,
          user_metadata: { role: 'admin' },
          role: 'admin',
          isAdmin: true,
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          app_metadata: {},
          confirmed_at: new Date().toISOString(),
        };

        setUser(adminUser);
        // Store admin session in localStorage for persistence
        localStorage.setItem('admin_session', JSON.stringify(adminUser));
        return { success: true };
      }

      // Regular Supabase auth for other users
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    // Clear admin session if it exists
    localStorage.removeItem('admin_session');
    await supabase.auth.signOut();
  };

  // Check for stored admin session on app start
  useEffect(() => {
    const storedAdminSession = localStorage.getItem('admin_session');
    if (storedAdminSession && !user) {
      try {
        const adminUser = JSON.parse(storedAdminSession);
        setUser(adminUser);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem('admin_session');
        setLoading(false);
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      login,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
