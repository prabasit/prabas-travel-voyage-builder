
import React from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Shield, ArrowLeft, Home } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, adminUser, loading, logout } = useSecureAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isOnDashboard = location.pathname === '/admin/dashboard';
  const canGoBack = !isOnDashboard && location.pathname !== '/admin/login';

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/7711519c-8e72-4555-9eea-86af600c90c1.png" 
              alt="Prabas Travels Logo" 
              className="h-8"
            />
            <div className="flex items-center space-x-2">
              {canGoBack && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="flex items-center space-x-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-1"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{adminUser?.email}</span>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>{adminUser?.role}</span>
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
