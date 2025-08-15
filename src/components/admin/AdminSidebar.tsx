
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Users, FileText, MessageSquare, Award, Mail, Settings, 
  Shield, Plane, Globe, Image, Layout, Briefcase, Star,
  ChevronRight, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: Home,
      description: 'Overview and statistics'
    },
    {
      title: 'Content Management',
      items: [
        {
          title: 'Banner Management',
          href: '/admin/banners',
          icon: Image,
          description: 'Manage homepage banners'
        },
        {
          title: 'Pages CMS',
          href: '/admin/pages',
          icon: Layout,
          description: 'Create and edit pages'
        },
        {
          title: 'Blog Posts',
          href: '/admin/blogs',
          icon: FileText,
          description: 'Manage blog content'
        }
      ]
    },
    {
      title: 'Business Management',
      items: [
        {
          title: 'Team Members',
          href: '/admin/team',
          icon: Users,
          description: 'Manage team profiles'
        },
        {
          title: 'Services',
          href: '/admin/services',
          icon: Settings,
          description: 'Manage service offerings'
        },
        {
          title: 'Testimonials',
          href: '/admin/testimonials',
          icon: MessageSquare,
          description: 'Customer testimonials'
        },
        {
          title: 'Awards',
          href: '/admin/awards',
          icon: Award,
          description: 'Company achievements'
        },
        {
          title: 'Careers',
          href: '/admin/careers',
          icon: Briefcase,
          description: 'Job postings'
        }
      ]
    },
    {
      title: 'Travel Services',
      items: [
        {
          title: 'FlightsNepal',
          href: '/admin/flights-nepal',
          icon: Plane,
          description: 'Flight booking service'
        },
        {
          title: 'Prabas Holidays',
          href: '/admin/prabas-holidays',
          icon: Globe,
          description: 'Holiday packages'
        }
      ]
    },
    {
      title: 'Communication',
      items: [
        {
          title: 'Inquiries',
          href: '/admin/inquiries',
          icon: Mail,
          description: 'Customer inquiries'
        },
        {
          title: 'Newsletter',
          href: '/admin/newsletter',
          icon: Mail,
          description: 'Newsletter management'
        }
      ]
    },
    {
      title: 'System',
      items: [
        {
          title: 'Admin Management',
          href: '/admin/admin-management',
          icon: Shield,
          description: 'Manage admin users'
        },
        {
          title: 'About Us',
          href: '/admin/about',
          icon: Star,
          description: 'Company information'
        }
      ]
    }
  ];

  const isActiveLink = (href: string) => location.pathname === href;

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col h-full",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/7711519c-8e72-4555-9eea-86af600c90c1.png" 
                alt="Logo" 
                className="h-6"
              />
              <span className="font-semibold text-sm">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-2">
          {navigationItems.map((section, index) => (
            <div key={index}>
              {section.href ? (
                // Single item
                <NavLink to={section.href}>
                  {({ isActive }) => (
                    <div className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}>
                      <section.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1">
                          <div>{section.title}</div>
                          {section.description && (
                            <div className="text-xs text-muted-foreground">{section.description}</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </NavLink>
              ) : (
                // Section with items
                <div>
                  {!isCollapsed && (
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.title}
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items?.map((item) => (
                      <NavLink key={item.href} to={item.href}>
                        {({ isActive }) => (
                          <div className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                          )}>
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && (
                              <div className="flex-1 min-w-0">
                                <div className="truncate">{item.title}</div>
                                {item.description && (
                                  <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </NavLink>
                    ))}
                  </div>
                  {index < navigationItems.length - 1 && !isCollapsed && (
                    <Separator className="my-3" />
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
