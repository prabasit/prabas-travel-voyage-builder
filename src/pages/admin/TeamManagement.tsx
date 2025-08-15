import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileUpload } from '@/components/ui/file-upload';

const TeamManagement = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    email: '',
    phone: '',
    image_url: '',
    social_links: { linkedin: '', twitter: '', facebook: '' },
    is_active: true,
    display_order: 0
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  const createMemberMutation = useMutation({
    mutationFn: async (memberData: any) => {
      const maxOrder = teamMembers ? Math.max(...teamMembers.map(m => m.display_order), 0) : 0;
      const { data, error } = await supabase
        .from('team_members')
        .insert([{ ...memberData, display_order: maxOrder + 1 }])
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member created successfully' });
      resetForm();
    },
    onError: (error: any) => {
      console.error('Create team member error:', error);
      toast({
        title: 'Error creating team member',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const updateMemberMutation = useMutation({
    mutationFn: async ({ id, ...memberData }: any) => {
      const { data, error } = await supabase
        .from('team_members')
        .update(memberData)
        .eq('id', id)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member updated successfully' });
      resetForm();
    },
    onError: (error: any) => {
      console.error('Update team member error:', error);
      toast({
        title: 'Error updating team member',
        description: error.message || 'Failed to update team member',
        variant: 'destructive'
      });
    }
  });

  const deleteMemberMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member deleted successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting team member',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (updates: Array<{ id: string; display_order: number }>) => {
      const promises = updates.map(({ id, display_order }) =>
        supabase
          .from('team_members')
          .update({ display_order })
          .eq('id', id)
      );
      
      const results = await Promise.all(promises);
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        throw new Error('Failed to update order');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating order',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      bio: '',
      email: '',
      phone: '',
      image_url: '',
      social_links: { linkedin: '', twitter: '', facebook: '' },
      is_active: true,
      display_order: 0
    });
    setSelectedMember(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      email: member.email || '',
      phone: member.phone || '',
      image_url: member.image_url,
      social_links: member.social_links || { linkedin: '', twitter: '', facebook: '' },
      is_active: member.is_active,
      display_order: member.display_order
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMember) {
      updateMemberMutation.mutate({ ...formData, id: selectedMember.id });
    } else {
      createMemberMutation.mutate(formData);
    }
  };

  const moveUp = (member: any) => {
    const currentIndex = teamMembers?.findIndex(m => m.id === member.id) || 0;
    if (currentIndex > 0 && teamMembers) {
      const prevMember = teamMembers[currentIndex - 1];
      updateOrderMutation.mutate([
        { id: member.id, display_order: prevMember.display_order },
        { id: prevMember.id, display_order: member.display_order }
      ]);
    }
  };

  const moveDown = (member: any) => {
    const currentIndex = teamMembers?.findIndex(m => m.id === member.id) || 0;
    if (teamMembers && currentIndex < teamMembers.length - 1) {
      const nextMember = teamMembers[currentIndex + 1];
      updateOrderMutation.mutate([
        { id: member.id, display_order: nextMember.display_order },
        { id: nextMember.id, display_order: member.display_order }
      ]);
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
            <h1 className="text-2xl sm:text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage team members and their profiles</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedMember ? 'Edit Team Member' : 'Add New Team Member'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <FileUpload
                    onFileUpload={(url) => setFormData({ ...formData, image_url: url })}
                    currentFile={formData.image_url}
                    acceptedTypes="image/*"
                    maxSize={10485760}
                    label="Profile Image (Max 10MB)"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.social_links.linkedin}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, linkedin: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={formData.social_links.twitter}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, twitter: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.social_links.facebook}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, facebook: e.target.value }
                      })}
                    />
                  </div>
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
                  <Button type="submit" disabled={createMemberMutation.isPending || updateMemberMutation.isPending}>
                    {selectedMember ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {teamMembers?.map((member, index) => (
            <Card key={member.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    {member.image_url && (
                      <img 
                        src={member.image_url} 
                        alt={member.name}
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <CardTitle className="truncate">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate">{member.position}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveUp(member)}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveDown(member)}
                      disabled={index === (teamMembers?.length || 0) - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMemberMutation.mutate(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      member.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.is_active ? 'Active' : 'Inactive'}
                    </span>
                    {member.email && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Email: {member.email}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Order: {member.display_order}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamManagement;
