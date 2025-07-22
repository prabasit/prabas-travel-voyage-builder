
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
import { Edit, Trash2, Plus, Save, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_location: string;
  client_image_url: string;
  testimonial_text: string;
  trip_type: string;
  rating: number;
  is_featured: boolean;
  is_active: boolean;
}

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    client_name: '',
    client_location: '',
    client_image_url: '',
    testimonial_text: '',
    trip_type: '',
    rating: 5,
    is_featured: false,
    is_active: true
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTestimonial = async () => {
    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
      }

      fetchTestimonials();
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const startEditing = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_location: testimonial.client_location || '',
      client_image_url: testimonial.client_image_url || '',
      testimonial_text: testimonial.testimonial_text,
      trip_type: testimonial.trip_type || '',
      rating: testimonial.rating,
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active
    });
    setIsCreating(false);
  };

  const resetForm = () => {
    setEditingTestimonial(null);
    setIsCreating(false);
    setFormData({
      client_name: '',
      client_location: '',
      client_image_url: '',
      testimonial_text: '',
      trip_type: '',
      rating: 5,
      is_featured: false,
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
            <h1 className="text-3xl font-bold">Testimonials Management</h1>
            <p className="text-muted-foreground">Manage customer testimonials</p>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        {(isCreating || editingTestimonial) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    placeholder="Client's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="client_location">Location</Label>
                  <Input
                    id="client_location"
                    value={formData.client_location}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_location: e.target.value }))}
                    placeholder="Client's location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trip_type">Trip Type</Label>
                  <Input
                    id="trip_type"
                    value={formData.trip_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, trip_type: e.target.value }))}
                    placeholder="e.g., Everest Base Camp Trek"
                  />
                </div>
                <div>
                  <Label htmlFor="client_image_url">Client Image URL</Label>
                  <Input
                    id="client_image_url"
                    value={formData.client_image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="testimonial_text">Testimonial</Label>
                <Textarea
                  id="testimonial_text"
                  value={formData.testimonial_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, testimonial_text: e.target.value }))}
                  placeholder="Client's testimonial text"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) || 5 }))}
                    />
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveTestimonial}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Testimonial
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold">{testimonial.client_name}</h3>
                      <span className="text-muted-foreground">from {testimonial.client_location}</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2 italic">"{testimonial.testimonial_text}"</p>
                    {testimonial.trip_type && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {testimonial.trip_type}
                      </span>
                    )}
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        testimonial.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testimonial.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {testimonial.is_featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No testimonials found. Create your first testimonial to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default TestimonialsManagement;
