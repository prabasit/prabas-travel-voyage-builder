
import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Award, 
  Settings, 
  BarChart3,
  Mail,
  Shield,
  Plane,
  Globe,
  Briefcase,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminAuth from '@/components/AdminAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const adminSession = localStorage.getItem('admin_session');
      console.log('Checking admin session:', adminSession);
      
      if (adminSession) {
        const parsedData = JSON.parse(adminSession);
        console.log('Parsed admin data:', parsedData);
        setAdminData(parsedData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('admin_session');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (adminData: any) => {
    console.log('Login successful, admin data:', adminData);
    setAdminData(adminData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
    setAdminData(null);
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Team', href: '/admin/team' },
    { icon: FileText, label: 'Blog', href: '/admin/blogs' },
    { icon: MessageSquare, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: Award, label: 'Awards', href: '/admin/awards' },
    { icon: Briefcase, label: 'Careers', href: '/admin/careers' },
    { icon: Settings, label: 'Services', href: '/admin/services' },
    { icon: Mail, label: 'Inquiries', href: '/admin/inquiries' },
    { icon: Settings, label: 'About Us', href: '/admin/about' },
    { icon: Settings, label: 'Pages', href: '/admin/pages' },
    { icon: Shield, label: 'Admin Management', href: '/admin/admin-management' },
    { icon: Plane, label: 'FlightsNepal', href: '/admin/flights-nepal' },
    { icon: Globe, label: 'Prabas Holidays', href: '/admin/prabas-holidays' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="w-64 bg-card border-r">
          <SidebarContent>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">
                Welcome, {adminData?.email || 'Admin'}
              </p>
            </div>
            <SidebarGroup>
              <nav className="flex flex-col space-y-1 p-4">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </SidebarGroup>
            <div className="mt-auto p-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
