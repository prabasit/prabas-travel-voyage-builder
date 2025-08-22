
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
  id?: string;
  title: string;
  description: string;
  story: string;
  mission: string;
  vision: string;
  values: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  image_url: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    title: 'About Prabas Travels',
    description: 'Your trusted partner for unforgettable travel experiences across Nepal and beyond.',
    story: 'Established in 2014, Prabas Travels & Tours has been Nepal\'s premier travel company, dedicated to showcasing the natural beauty and rich cultural heritage of Nepal to travelers from around the world.',
    mission: 'To provide exceptional travel experiences that connect our clients with the breathtaking landscapes, vibrant cultures, and warm hospitality that Nepal has to offer.',
    vision: 'To become the leading travel company in Nepal, recognized for our commitment to sustainable tourism, exceptional service, and creating lifelong memories for our clients.',
    values: [
      {
        title: 'Excellence',
        description: 'We strive for excellence in every service we provide.',
        icon: 'award'
      },
      {
        title: 'Trust',
        description: 'Building lasting relationships through trust and reliability.',
        icon: 'heart'
      },
      {
        title: 'Adventure',
        description: 'Creating unforgettable adventures for our travelers.',
        icon: 'globe'
      }
    ],
    stats: [
      {
        label: 'Happy Customers',
        value: '10K+',
        icon: 'users'
      },
      {
        label: 'Years Experience',
        value: '10+',
        icon: 'award'
      },
      {
        label: 'Destinations',
        value: '50+',
        icon: 'globe'
      },
      {
        label: 'Success Rate',
        value: '99%',
        icon: 'heart'
      }
    ],
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    console.log('Fetching about data for admin...');
    try {
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .limit(1)
        .maybeSingle();

      console.log('Admin about data response:', { data, error });

      if (error) {
        console.error('Error fetching about data:', error);
      } else if (data) {
        console.log('About data found for admin:', data);
        setAboutData({
          id: data.id,
          title: data.title || 'About Prabas Travels',
          description: data.description || '',
          story: data.story || '',
          mission: data.mission || '',
          vision: data.vision || '',
          values: Array.isArray(data.values) ? data.values : [],
          stats: Array.isArray(data.stats) ? data.stats : [],
          image_url: data.image_url || ''
        });
      } else {
        console.log('No about data found, using defaults');
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
      values: [...prev.values, { title: '', description: '', icon: 'heart' }]
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
      stats: [...prev.stats, { label: '', value: '', icon: 'users' }]
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

    console.log('Saving about data:', aboutData);

    try {
      const dataToSave = {
        title: aboutData.title,
        description: aboutData.description,
        story: aboutData.story,
        mission: aboutData.mission,
        vision: aboutData.vision,
        values: aboutData.values,
        stats: aboutData.stats,
        image_url: aboutData.image_url,
        updated_at: new Date().toISOString()
      };

      let result;
      if (aboutData.id) {
        console.log('Updating existing about data with ID:', aboutData.id);
        result = await supabase
          .from('about_us')
          .update(dataToSave)
          .eq('id', aboutData.id)
          .select()
          .single();
      } else {
        console.log('Inserting new about data');
        result = await supabase
          .from('about_us')
          .insert([dataToSave])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      console.log('About data saved successfully:', result.data);
      
      // Update the local state with the saved data
      if (result.data) {
        setAboutData(prev => ({ ...prev, id: result.data.id }));
      }

      toast({
        title: "Success",
        description: "About Us information saved successfully!",
      });
      
      // Force a small delay to ensure the real-time update propagates
      setTimeout(() => {
        console.log('About data should now be updated on frontend');
      }, 1000);
      
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
                      className="mb-2 bg-background text-foreground"
                    />
                    <select
                      value={value.icon || 'heart'}
                      onChange={(e) => updateValue(index, 'icon', e.target.value)}
                      className="w-full p-2 bg-background border border-input rounded-md text-foreground"
                    >
                      <option value="heart">Heart</option>
                      <option value="users">Users</option>
                      <option value="award">Award</option>
                      <option value="globe">Globe</option>
                    </select>
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
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="10K+"
                    className="flex-1 bg-background text-foreground"
                  />
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Happy Customers"
                    className="flex-1 bg-background text-foreground"
                  />
                  <select
                    value={stat.icon || 'users'}
                    onChange={(e) => updateStat(index, 'icon', e.target.value)}
                    className="p-2 bg-background border border-input rounded-md text-foreground"
                  >
                    <option value="users">Users</option>
                    <option value="award">Award</option>
                    <option value="globe">Globe</option>
                    <option value="heart">Heart</option>
                  </select>
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
