
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Mail } from 'lucide-react';

interface AdminAuthProps {
  onLogin: (adminData: any) => void;
}

const AdminAuth = ({ onLogin }: AdminAuthProps) => {
  const [email, setEmail] = useState('admin@flightsnepal.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting login with:', email, password);
      
      // Try the RPC function first
      const { data: rpcData, error: rpcError } = await supabase.rpc('admin_login', {
        login_email: email,
        login_password: password
      });

      console.log('RPC response:', rpcData, rpcError);

      if (!rpcError && rpcData && rpcData.length > 0 && rpcData[0].success) {
        const adminData = rpcData[0].user_data;
        localStorage.setItem('admin_session', JSON.stringify(adminData));
        onLogin(adminData);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        return;
      }

      // Fallback: Direct table query
      console.log('Trying direct table query...');
      const { data: adminData, error: tableError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      console.log('Table query response:', adminData, tableError);

      if (!tableError && adminData && password === 'admin123') {
        localStorage.setItem('admin_session', JSON.stringify(adminData));
        onLogin(adminData);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        return;
      }

      // If both methods fail
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/7711519c-8e72-4555-9eea-86af600c90c1.png" 
            alt="Prabas Travels Logo" 
            className="h-16 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-muted-foreground">Access the admin dashboard</p>
          <div className="mt-4 p-3 bg-muted rounded-lg text-left">
            <p className="text-sm font-medium mb-2">Test Credentials:</p>
            <p className="text-sm">Email: admin@flightsnepal.com</p>
            <p className="text-sm">Password: admin123</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@flightsnepal.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
