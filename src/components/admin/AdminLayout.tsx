
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Award, 
  Settings, 
  LogOut,
  Plane,
  Globe,
  Mail,
  Info,
  Briefcase,
  File
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        navigate('/admin/login');
        return;
      }

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      setLoading(false);
    } catch (error) {
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: File, label: 'Pages', path: '/admin/pages' },
    { icon: Info, label: 'About Us', path: '/admin/about' },
    { icon: Users, label: 'Team Management', path: '/admin/team' },
    { icon: Briefcase, label: 'Career Management', path: '/admin/careers' },
    { icon: FileText, label: 'Blog Management', path: '/admin/blogs' },
    { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: Award, label: 'Awards', path: '/admin/awards' },
    { icon: Plane, label: 'FlightsNepal', path: '/admin/flights' },
    { icon: Globe, label: 'Prabas Holidays', path: '/admin/holidays' },
    { icon: Mail, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-primary-foreground flex flex-col">
        <div className="p-4 border-b border-primary-foreground/20">
          <img 
            src="/lovable-uploads/7711519c-8e72-4555-9eea-86af600c90c1.png" 
            alt="Prabas Travels Logo" 
            className="h-12 mx-auto mb-2"
          />
          <h2 className="text-lg font-semibold text-center">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-primary-foreground/20 text-white' 
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-primary-foreground/20">
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
