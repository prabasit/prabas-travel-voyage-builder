
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const About = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    story: '',
    mission: '',
    vision: '',
    values: '',
    stats: '',
    image_url: ''
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['about-us'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          story: data.story || '',
          mission: data.mission || '',
          vision: data.vision || '',
          values: Array.isArray(data.values) ? data.values.join(', ') : '',
          stats: data.stats ? JSON.stringify(data.stats, null, 2) : '',
          image_url: data.image_url || ''
        });
      }
    }
  });

  const updateAboutMutation = useMutation({
    mutationFn: async (data: any) => {
      const processedData = {
        ...data,
        values: data.values ? data.values.split(',').map((v: string) => v.trim()) : [],
        stats: data.stats ? JSON.parse(data.stats) : {}
      };

      const { data: result, error } = await supabase
        .from('about_us')
        .upsert(processedData)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-us'] });
      toast({ title: 'About Us updated successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating About Us',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutMutation.mutate(formData);
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
        <div>
          <h1 className="text-3xl font-bold">About Us Management</h1>
          <p className="text-muted-foreground">Manage your company's about page content</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About Us Content</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="story">Our Story</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  rows={5}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mission">Mission</Label>
                  <Textarea
                    id="mission"
                    value={formData.mission}
                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="vision">Vision</Label>
                  <Textarea
                    id="vision"
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="values">Values (comma-separated)</Label>
                <Input
                  id="values"
                  value={formData.values}
                  onChange={(e) => setFormData({ ...formData, values: e.target.value })}
                  placeholder="Trust & Safety, Personalized Service, Expert Guidance"
                />
              </div>
              
              <div>
                <Label htmlFor="stats">Statistics (JSON format)</Label>
                <Textarea
                  id="stats"
                  value={formData.stats}
                  onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                  rows={5}
                  placeholder='{"years": 25, "customers": 10000, "team": 50, "rating": 4.9}'
                />
              </div>
              
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <Button type="submit" disabled={updateAboutMutation.isPending}>
                {updateAboutMutation.isPending ? 'Updating...' : 'Update About Us'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default About;
