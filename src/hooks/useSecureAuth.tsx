
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

  const setUserContext = async (email: string, role: string) => {
    try {
      await supabase.rpc('set_user_context', {
        user_email: email,
        user_role: role
      });
    } catch (error) {
      console.error('Error setting user context:', error);
    }
  };

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

  const checkAuthStatus = async () => {
    try {
      const sessionData = localStorage.getItem('admin_session');
      if (sessionData) {
        const session: AdminSession = JSON.parse(sessionData);
        
        // Check if session is expired (24 hours) or inactive (20 minutes)
        const isExpired = Date.now() > session.expires_at;
        const timeSinceLastActivity = Date.now() - (session.last_activity || session.expires_at - (24 * 60 * 60 * 1000));
        const isInactive = timeSinceLastActivity > SESSION_TIMEOUT;
        
        if (isExpired || isInactive) {
          localStorage.removeItem('admin_session');
          setIsAuthenticated(false);
          setAdminUser(null);
        } else {
          // Set user context for RLS
          await setUserContext(session.email, session.role);
          
          // Update last activity time
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

      // Direct query to admin_users table
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }

      // Simple password check (in production, use proper hashing)
      if (password === adminUser.password_hash) {
        const now = Date.now();
        const session: AdminSession = {
          id: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
          is_active: adminUser.is_active,
          expires_at: now + (24 * 60 * 60 * 1000), // 24 hours
          last_activity: now
        };

        // Set user context for RLS
        await setUserContext(adminUser.email, adminUser.role);

        localStorage.setItem('admin_session', JSON.stringify(session));
        setAdminUser(session);
        setIsAuthenticated(true);
        
        toast({
          title: "Login Successful",
          description: "Welcome to Admin Dashboard",
        });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
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
