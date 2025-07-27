
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminSession {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  expires_at: number;
}

export const useSecureAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const sessionData = localStorage.getItem('admin_session');
      if (sessionData) {
        const session: AdminSession = JSON.parse(sessionData);
        
        // Check if session is expired (24 hours)
        if (Date.now() < session.expires_at) {
          setAdminUser(session);
          setIsAuthenticated(true);
        } else {
          // Session expired, clear it
          localStorage.removeItem('admin_session');
          setIsAuthenticated(false);
          setAdminUser(null);
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
      // Input validation
      if (!email || !password) {
        toast({
          title: "Validation Error",
          description: "Email and password are required",
          variant: "destructive",
        });
        return false;
      }

      if (!email.includes('@')) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return false;
      }

      // Use the secure database function
      const { data, error } = await supabase.rpc('admin_login', {
        login_email: email,
        login_password: password
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login Error",
          description: "An error occurred during login",
          variant: "destructive",
        });
        return false;
      }

      if (data && data.length > 0 && data[0].success) {
        const userData = data[0].user_data;
        const session: AdminSession = {
          ...userData,
          expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };

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
