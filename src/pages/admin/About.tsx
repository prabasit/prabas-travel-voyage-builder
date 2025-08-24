import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AboutData {
  id?: string;
  title: string;
  description: string;
  story: string;
  mission: string;
  vision: string;
  image_url: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    title: '',
    description: '',
    story: '',
    mission: '',
    vision: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching about data:', error);
        return;
      }

      if (data) {
        setAboutData({
          id: data.id,
          title: data.title || '',
          description: data.description || '',
          story: data.story || '',
          mission: data.mission || '',
          vision: data.vision || '',
          image_url: data.image_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof AboutData, value: string) => {
    setAboutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSave = {
        title: aboutData.title || 'About Prabas Travels',
        description: aboutData.description,
        story: aboutData.story,
        mission: aboutData.mission,
        vision: aboutData.vision,
        image_url: aboutData.image_url,
        updated_at: new Date().toISOString()
      };

      let result;
      if (aboutData.id) {
        result = await supabase
          .from('about_us')
          .update(dataToSave)
          .eq('id', aboutData.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('about_us')
          .insert([dataToSave])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      if (result.data) {
        setAboutData(prev => ({ ...prev, id: result.data.id }));
      }

      toast({
        title: "Success",
        description: "About Us information saved successfully!",
      });
      
    } catch (error) {
      console.error('Error saving about data:', error);
      toast({
        title: "Error",
        description: "Failed to save about information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">About Us Management</h1>
          <p className="text-muted-foreground">Manage your about us page content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={aboutData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="About Prabas Travels"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={aboutData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description about your company"
                  rows={3}
                />
              </div>

              <FileUpload
                onFileUpload={(url) => handleInputChange('image_url', url)}
                currentFile={aboutData.image_url}
                label="About Us Image"
                acceptedTypes="image/*"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="story">Our Story</Label>
                <Textarea
                  id="story"
                  value={aboutData.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  placeholder="Tell your company's story"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="mission">Our Mission</Label>
                <Textarea
                  id="mission"
                  value={aboutData.mission}
                  onChange={(e) => handleInputChange('mission', e.target.value)}
                  placeholder="Your company's mission statement"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="vision">Our Vision</Label>
                <Textarea
                  id="vision"
                  value={aboutData.vision}
                  onChange={(e) => handleInputChange('vision', e.target.value)}
                  placeholder="Your company's vision statement"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default About;