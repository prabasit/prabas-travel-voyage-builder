
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Mountain, Camera, MapPin, Clock, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
  display_order: number;
  is_active: boolean;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setServices(data);
      } else {
        // Fallback services if CMS is empty
        setServices([
          {
            id: '1',
            title: 'Flight Booking',
            description: 'Book domestic and international flights with the best deals and customer service.',
            image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
            features: ['Domestic Flights', 'International Flights', '24/7 Support', 'Best Prices'],
            display_order: 1,
            is_active: true
          },
          {
            id: '2',
            title: 'Trekking & Hiking',
            description: 'Explore Nepal\'s majestic mountains with our guided trekking packages.',
            image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            features: ['Everest Base Camp', 'Annapurna Circuit', 'Langtang Valley', 'Professional Guides'],
            display_order: 2,
            is_active: true
          },
          {
            id: '3',
            title: 'Cultural Tours',
            description: 'Discover Nepal\'s rich culture and heritage with our customized tour packages.',
            image_url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop',
            features: ['Heritage Sites', 'Local Experiences', 'Cultural Immersion', 'Expert Guides'],
            display_order: 3,
            is_active: true
          },
          {
            id: '4',
            title: 'Adventure Sports',
            description: 'Experience thrilling adventure activities in Nepal\'s stunning landscapes.',
            image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
            features: ['Paragliding', 'White Water Rafting', 'Bungee Jumping', 'Rock Climbing'],
            display_order: 4,
            is_active: true
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (index: number) => {
    const icons = [Plane, Mountain, Camera, MapPin];
    const Icon = icons[index % icons.length];
    return <Icon className="h-12 w-12 text-primary" />;
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive travel solutions for all your needs
            </p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive travel solutions tailored to make your journey unforgettable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  {getServiceIcon(index)}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button className="w-full" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
