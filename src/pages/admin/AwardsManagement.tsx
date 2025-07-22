
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Edit, Trash2, Plus, Save, Award } from 'lucide-react';

interface AwardType {
  id: string;
  title: string;
  organization: string;
  year: number;
  description: string;
  image_url: string;
  category: string;
  is_active: boolean;
}

const AwardsManagement = () => {
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [editingAward, setEditingAward] = useState<AwardType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    year: new Date().getFullYear(),
    description: '',
    image_url: '',
    category: '',
    is_active: true
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setAwards(data || []);
    } catch (error) {
      console.error('Error fetching awards:', error);
      toast({
        title: "Error",
        description: "Failed to fetch awards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAward = async () => {
    try {
      if (editingAward) {
        const { error } = await supabase
          .from('awards')
          .update(formData)
          .eq('id', editingAward.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Award updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('awards')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Award created successfully",
        });
      }

      fetchAwards();
      resetForm();
    } catch (error) {
      console.error('Error saving award:', error);
      toast({
        title: "Error",
        description: "Failed to save award",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAward = async (id: string) => {
    if (!confirm('Are you sure you want to delete this award?')) return;

    try {
      const { error } = await supabase
        .from('awards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Award deleted successfully",
      });
      fetchAwards();
    } catch (error) {
      console.error('Error deleting award:', error);
      toast({
        title: "Error",
        description: "Failed to delete award",
        variant: "destructive",
      });
    }
  };

  const startEditing = (award: AwardType) => {
    setEditingAward(award);
    setFormData({
      title: award.title,
      organization: award.organization,
      year: award.year,
      description: award.description || '',
      image_url: award.image_url || '',
      category: award.category || '',
      is_active: award.is_active
    });
    setIsCreating(false);
  };

  const resetForm = () => {
    setEditingAward(null);
    setIsCreating(false);
    setFormData({
      title: '',
      organization: '',
      year: new Date().getFullYear(),
      description: '',
      image_url: '',
      category: '',
      is_active: true
    });
  };

  if (loading) {
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Awards Management</h1>
            <p className="text-muted-foreground">Manage company awards and recognitions</p>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Award
          </Button>
        </div>

        {(isCreating || editingAward) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingAward ? 'Edit Award' : 'Create New Award'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Award Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Award title"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    placeholder="Awarding organization"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                    placeholder="Award year"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Award category"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Award Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/award-image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Award description"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveAward}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Award
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {awards.map((award) => (
            <Card key={award.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <Award className="h-6 w-6 text-yellow-600" />
                      <h3 className="text-xl font-semibold">{award.title}</h3>
                      <span className="text-muted-foreground">({award.year})</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        award.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {award.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      <strong>Organization:</strong> {award.organization}
                    </p>
                    {award.description && (
                      <p className="text-muted-foreground mb-2">{award.description}</p>
                    )}
                    {award.category && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {award.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(award)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAward(award.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {awards.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No awards found. Create your first award to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AwardsManagement;
