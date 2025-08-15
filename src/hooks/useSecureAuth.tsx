
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminSession {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  expires_at: number;
  last_activity: number;
}

const SESSION_TIMEOUT = 20 * 60 * 1000; // 20 minutes in milliseconds

export const useSecureAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
    
    // Check for inactivity every minute
    const activityInterval = setInterval(() => {
      checkForInactivity();
    }, 60000);

    // Track user activity
    const trackActivity = () => {
      if (adminUser) {
        const updatedSession = {
          ...adminUser,
          last_activity: Date.now()
        };
        localStorage.setItem('admin_session', JSON.stringify(updatedSession));
        setAdminUser(updatedSession);
      }
    };

    // Add activity listeners
    document.addEventListener('mousedown', trackActivity);
    document.addEventListener('keydown', trackActivity);
    document.addEventListener('scroll', trackActivity);
    document.addEventListener('touchstart', trackActivity);

    return () => {
      clearInterval(activityInterval);
      document.removeEventListener('mousedown', trackActivity);
      document.removeEventListener('keydown', trackActivity);
      document.removeEventListener('scroll', trackActivity);
      document.removeEventListener('touchstart', trackActivity);
    };
  }, [adminUser]);

  const checkForInactivity = () => {
    const sessionData = localStorage.getItem('admin_session');
    if (sessionData) {
      try {
        const session: AdminSession = JSON.parse(sessionData);
        const timeSinceLastActivity = Date.now() - session.last_activity;
        
        if (timeSinceLastActivity > SESSION_TIMEOUT) {
          logout();
          toast({
            title: "Session Expired",
            description: "Your session has expired due to inactivity. Please log in again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking inactivity:', error);
        logout();
      }
    }
  };

  const checkAuthStatus = () => {
    try {
      const sessionData = localStorage.getItem('admin_session');
      if (sessionData) {
        const session: AdminSession = JSON.parse(sessionData);
        
        const isExpired = Date.now() > session.expires_at;
        const timeSinceLastActivity = Date.now() - (session.last_activity || session.expires_at - (24 * 60 * 60 * 1000));
        const isInactive = timeSinceLastActivity > SESSION_TIMEOUT;
        
        if (isExpired || isInactive) {
          localStorage.removeItem('admin_session');
          setIsAuthenticated(false);
          setAdminUser(null);
        } else {
          const updatedSession = {
            ...session,
            last_activity: Date.now()
          };
          localStorage.setItem('admin_session', JSON.stringify(updatedSession));
          setAdminUser(updatedSession);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('admin_session');
      setIsAuthenticated(false);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        toast({
          title: "Validation Error",
          description: "Email and password are required",
          variant: "destructive",
        });
        return false;
      }

      // Direct query to admin_users table with fixed RLS
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('password_hash', password)
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        console.error('Login error:', error);
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }

      const now = Date.now();
      const session: AdminSession = {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        is_active: adminUser.is_active,
        expires_at: now + (24 * 60 * 60 * 1000), // 24 hours
        last_activity: now
      };

      localStorage.setItem('admin_session', JSON.stringify(session));
      setAdminUser(session);
      setIsAuthenticated(true);
      
      toast({
        title: "Login Successful",
        description: "Welcome to Admin Dashboard",
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
    setAdminUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const hasRole = (role: string): boolean => {
    return adminUser?.role === role || adminUser?.role === 'super_admin';
  };

  return {
    isAuthenticated,
    adminUser,
    loading,
    login,
    logout,
    hasRole,
    checkAuthStatus
  };
};
