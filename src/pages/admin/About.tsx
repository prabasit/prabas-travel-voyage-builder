
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
import { Plus, X } from 'lucide-react';

interface AboutData {
  id: string;
  title: string;
  description: string;
  story: string;
  mission: string;
  vision: string;
  values: any[];
  stats: any[];
  image_url: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    id: '',
    title: '',
    description: '',
    story: '',
    mission: '',
    vision: '',
    values: [],
    stats: [],
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
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setAboutData({
          ...data,
          values: Array.isArray(data.values) ? data.values : [],
          stats: Array.isArray(data.stats) ? data.stats : []
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setAboutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addValue = () => {
    setAboutData(prev => ({
      ...prev,
      values: [...prev.values, { title: '', description: '' }]
    }));
  };

  const updateValue = (index: number, field: string, value: string) => {
    setAboutData(prev => ({
      ...prev,
      values: prev.values.map((val, i) => 
        i === index ? { ...val, [field]: value } : val
      )
    }));
  };

  const removeValue = (index: number) => {
    setAboutData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const addStat = () => {
    setAboutData(prev => ({
      ...prev,
      stats: [...prev.stats, { number: '', label: '' }]
    }));
  };

  const updateStat = (index: number, field: string, value: string) => {
    setAboutData(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeStat = (index: number) => {
    setAboutData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSave = {
        ...aboutData,
        updated_at: new Date().toISOString()
      };

      if (aboutData.id) {
        const { error } = await supabase
          .from('about_us')
          .update(dataToSave)
          .eq('id', aboutData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_us')
          .insert([dataToSave]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "About Us information saved successfully!",
      });
      
      fetchAboutData();
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
          <h1 className="text-3xl font-bold text-foreground">About Us Management</h1>
          <p className="text-muted-foreground">Manage your about us page content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-foreground">Title</Label>
                <Input
                  id="title"
                  value={aboutData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="About Prabas Travels"
                  className="bg-background text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Textarea
                  id="description"
                  value={aboutData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description about your company"
                  rows={3}
                  className="bg-background text-foreground"
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

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Story, Mission & Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="story" className="text-foreground">Our Story</Label>
                <Textarea
                  id="story"
                  value={aboutData.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  placeholder="Tell your company's story"
                  rows={4}
                  className="bg-background text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="mission" className="text-foreground">Our Mission</Label>
                <Textarea
                  id="mission"
                  value={aboutData.mission}
                  onChange={(e) => handleInputChange('mission', e.target.value)}
                  placeholder="Your company's mission statement"
                  rows={3}
                  className="bg-background text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="vision" className="text-foreground">Our Vision</Label>
                <Textarea
                  id="vision"
                  value={aboutData.vision}
                  onChange={(e) => handleInputChange('vision', e.target.value)}
                  placeholder="Your company's vision statement"
                  rows={3}
                  className="bg-background text-foreground"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-card-foreground">
                Company Values
                <Button type="button" onClick={addValue} size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Value
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aboutData.values.map((value, index) => (
                <div key={index} className="flex gap-4 items-start p-4 bg-muted rounded-lg">
                  <div className="flex-1">
                    <Input
                      value={value.title}
                      onChange={(e) => updateValue(index, 'title', e.target.value)}
                      placeholder="Value title"
                      className="mb-2 bg-background text-foreground"
                    />
                    <Textarea
                      value={value.description}
                      onChange={(e) => updateValue(index, 'description', e.target.value)}
                      placeholder="Value description"
                      rows={2}
                      className="bg-background text-foreground"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeValue(index)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-card-foreground">
                Company Statistics
                <Button type="button" onClick={addStat} size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Statistic
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="flex gap-4 items-center p-4 bg-muted rounded-lg">
                  <Input
                    value={stat.number}
                    onChange={(e) => updateStat(index, 'number', e.target.value)}
                    placeholder="10K+"
                    className="flex-1 bg-background text-foreground"
                  />
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Happy Customers"
                    className="flex-1 bg-background text-foreground"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeStat(index)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default About;
