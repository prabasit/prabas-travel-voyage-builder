
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Award, 
  Settings, 
  Plane,
  Globe,
  Mail,
  Info,
  Briefcase,
  File,
  Wrench,
  UserCheck
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: File, label: 'Pages', path: '/admin/pages' },
    { icon: Info, label: 'About Us', path: '/admin/about' },
    { icon: Users, label: 'Team Management', path: '/admin/team' },
    { icon: Wrench, label: 'Services', path: '/admin/services' },
    { icon: Briefcase, label: 'Career Management', path: '/admin/careers' },
    { icon: UserCheck, label: 'Job Applications', path: '/admin/career-applications' },
    { icon: FileText, label: 'Blog Management', path: '/admin/blogs' },
    { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: Award, label: 'Awards', path: '/admin/awards' },
    { icon: Plane, label: 'FlightsNepal', path: '/admin/flights' },
    { icon: Globe, label: 'Prabas Holidays', path: '/admin/holidays' },
    { icon: Mail, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

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
          <p className="text-sm text-center text-primary-foreground/80 mt-1">
            Prabas Travels CMS
          </p>
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
          <a 
            href="/"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
          >
            <Settings className="h-5 w-5" />
            <span>Back to Website</span>
          </a>
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
