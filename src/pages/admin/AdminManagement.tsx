
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { validatePasswordStrength, sanitizeInput } from '@/utils/security';

const AdminManagement = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin',
    is_active: true
  });
  const [passwordError, setPasswordError] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: admins, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const createAdminMutation = useMutation({
    mutationFn: async (adminData: any) => {
      // Validate password strength for new users
      const passwordValidation = validatePasswordStrength(adminData.password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      const { data, error } = await supabase
        .from('admin_users')
        .insert([{
          email: sanitizeInput(adminData.email.toLowerCase().trim()),
          password_hash: adminData.password, // This will be hashed by the database trigger
          role: adminData.role,
          is_active: adminData.is_active
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'Admin user created successfully' });
      resetForm();
    },
    onError: (error: any) => {
      console.error('Create admin error:', error);
      toast({
        title: 'Error creating admin user',
        description: error.message || 'Failed to create admin user',
        variant: 'destructive'
      });
    }
  });

  const updateAdminMutation = useMutation({
    mutationFn: async ({ id, ...adminData }: any) => {
      const updateData: any = {
        email: sanitizeInput(adminData.email.toLowerCase().trim()),
        role: adminData.role,
        is_active: adminData.is_active
      };
      
      // Only validate and update password if provided
      if (adminData.password && adminData.password.trim() !== '') {
        const passwordValidation = validatePasswordStrength(adminData.password);
        if (!passwordValidation.isValid) {
          throw new Error(passwordValidation.message);
        }
        updateData.password_hash = adminData.password; // This will be hashed by the database
      }

      const { data, error } = await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'Admin user updated successfully' });
      resetForm();
    },
    onError: (error: any) => {
      console.error('Update admin error:', error);
      toast({
        title: 'Error updating admin user',
        description: error.message || 'Failed to update admin user',
        variant: 'destructive'
      });
    }
  });

  const deleteAdminMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'Admin user deleted successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting admin user',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      role: 'admin',
      is_active: true
    });
    setSelectedAdmin(null);
    setIsDialogOpen(false);
    setPasswordError('');
  };

  const handleEdit = (admin: any) => {
    setSelectedAdmin(admin);
    setFormData({
      email: admin.email,
      password: '',
      role: admin.role,
      is_active: admin.is_active
    });
    setIsDialogOpen(true);
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    
    if (password && (!selectedAdmin || password.trim() !== '')) {
      const validation = validatePasswordStrength(password);
      setPasswordError(validation.isValid ? '' : validation.message);
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = sanitizeInput(formData.email);
    if (!sanitizedEmail.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Email is required',
        variant: 'destructive'
      });
      return;
    }

    if (!selectedAdmin && !formData.password.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Password is required for new admin users',
        variant: 'destructive'
      });
      return;
    }

    if (passwordError) {
      toast({
        title: 'Password Error',
        description: passwordError,
        variant: 'destructive'
      });
      return;
    }
    
    if (selectedAdmin) {
      updateAdminMutation.mutate({ ...formData, id: selectedAdmin.id });
    } else {
      createAdminMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Management</h1>
            <p className="text-muted-foreground">Manage admin users and permissions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Admin User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {selectedAdmin ? 'Edit Admin User' : 'Create New Admin User'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    {selectedAdmin ? 'New Password (leave blank to keep current)' : 'Password'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required={!selectedAdmin}
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive mt-1">{passwordError}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 8 characters with uppercase, lowercase, number, and special character
                  </p>
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createAdminMutation.isPending || updateAdminMutation.isPending || !!passwordError}
                  >
                    {selectedAdmin ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {admins?.map((admin) => (
            <Card key={admin.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{admin.email}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          admin.role === 'super_admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          admin.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(admin)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteAdminMutation.mutate(admin.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(admin.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminManagement;
