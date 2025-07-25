
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
import { Globe, Save, Plus, Trash2 } from 'lucide-react';

interface HolidayService {
  title: string;
  description: string;
  icon: string;
}

interface PrabasHolidaysData {
  id: string;
  title: string;
  description: string;
  services: HolidayService[];
  hero_image_url: string;
  is_active: boolean;
}

const PrabasHolidaysManagement = () => {
  const [data, setData] = useState<PrabasHolidaysData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: holidaysData, error } = await supabase
        .from('prabas_holidays')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      
      if (holidaysData) {
        setData({
          ...holidaysData,
          services: Array.isArray(holidaysData.services) ? holidaysData.services : []
        });
      }
    } catch (error) {
      console.error('Error fetching holidays data:', error);
      toast({
        title: "Error",
        description: "Failed to load Prabas Holidays data.",
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
        .from('prabas_holidays')
        .update({
          title: data.title,
          description: data.description,
          services: data.services,
          hero_image_url: data.hero_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prabas Holidays data updated successfully.",
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Error",
        description: "Failed to save Prabas Holidays data.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleServiceChange = (index: number, field: keyof HolidayService, value: string) => {
    if (!data) return;

    const updatedServices = [...data.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setData({ ...data, services: updatedServices });
  };

  const addService = () => {
    if (!data) return;

    const newService: HolidayService = {
      title: '',
      description: '',
      icon: 'Globe'
    };
    setData({ ...data, services: [...data.services, newService] });
  };

  const removeService = (index: number) => {
    if (!data) return;

    const updatedServices = data.services.filter((_, i) => i !== index);
    setData({ ...data, services: updatedServices });
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
          <p className="text-muted-foreground">No Prabas Holidays data found.</p>
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
              <Globe className="h-8 w-8 mr-2" />
              Prabas Holidays Management
            </h1>
            <p className="text-muted-foreground">Manage Prabas Holidays content and services</p>
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

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Services
                <Button onClick={addService} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.services.map((service, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Service {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeService(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                        placeholder="e.g., Globe, FileText, Shield"
                      />
                    </div>
                  </div>
                ))}
                {data.services.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No services added yet. Click "Add Service" to get started.
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

export default PrabasHolidaysManagement;
