
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
}

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    email: '',
    phone: '',
    image_url: '',
    is_active: true,
    display_order: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('team_members')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "Success", description: "Team member updated successfully" });
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Team member added successfully" });
      }

      resetForm();
      fetchTeamMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      email: member.email || '',
      phone: member.phone || '',
      image_url: member.image_url || '',
      is_active: member.is_active,
      display_order: member.display_order
    });
    setEditingId(member.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Team member deleted successfully" });
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      bio: '',
      email: '',
      phone: '',
      image_url: '',
      is_active: true,
      display_order: 0
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage your team members</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        {isEditing && (
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Team Member' : 'Add New Team Member'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    />
                  </div>
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingId ? 'Update' : 'Create'} Team Member
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {member.image_url && (
                  <img src={member.image_url} alt={member.name} className="w-full h-32 object-cover rounded mb-3" />
                )}
                <p className="text-sm mb-2">{member.bio}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  {member.email && <p>Email: {member.email}</p>}
                  {member.phone && <p>Phone: {member.phone}</p>}
                  <p>Status: {member.is_active ? 'Active' : 'Inactive'}</p>
                  <p>Order: {member.display_order}</p>
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
