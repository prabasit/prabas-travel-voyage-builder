
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
import { Plane, Save, Plus, Trash2 } from 'lucide-react';

interface FlightFeature {
  title: string;
  description: string;
  icon: string;
}

interface FlightsNepalData {
  id: string;
  title: string;
  description: string;
  features: FlightFeature[];
  hero_image_url: string;
  is_active: boolean;
}

const FlightsNepalManagement = () => {
  const [data, setData] = useState<FlightsNepalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: flightsData, error } = await supabase
        .from('flights_nepal')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      
      if (flightsData) {
        setData({
          ...flightsData,
          features: Array.isArray(flightsData.features) ? flightsData.features : []
        });
      }
    } catch (error) {
      console.error('Error fetching flights data:', error);
      toast({
        title: "Error",
        description: "Failed to load FlightsNepal data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('flights_nepal')
        .update({
          title: data.title,
          description: data.description,
          features: data.features,
          hero_image_url: data.hero_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "FlightsNepal data updated successfully.",
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Error",
        description: "Failed to save FlightsNepal data.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFeatureChange = (index: number, field: keyof FlightFeature, value: string) => {
    if (!data) return;

    const updatedFeatures = [...data.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setData({ ...data, features: updatedFeatures });
  };

  const addFeature = () => {
    if (!data) return;

    const newFeature: FlightFeature = {
      title: '',
      description: '',
      icon: 'Plane'
    };
    setData({ ...data, features: [...data.features, newFeature] });
  };

  const removeFeature = (index: number) => {
    if (!data) return;

    const updatedFeatures = data.features.filter((_, i) => i !== index);
    setData({ ...data, features: updatedFeatures });
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

  if (!data) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No FlightsNepal data found.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Plane className="h-8 w-8 mr-2" />
              FlightsNepal Management
            </h1>
            <p className="text-muted-foreground">Manage FlightsNepal content and features</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label>Hero Image</Label>
                <FileUpload
                  onFileUpload={(url) => setData({ ...data, hero_image_url: url })}
                  currentFile={data.hero_image_url}
                  acceptedTypes="image/*"
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Features
                <Button onClick={addFeature} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.features.map((feature, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Feature {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                        placeholder="e.g., Plane, Clock, Shield"
                      />
                    </div>
                  </div>
                ))}
                {data.features.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No features added yet. Click "Add Feature" to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FlightsNepalManagement;
