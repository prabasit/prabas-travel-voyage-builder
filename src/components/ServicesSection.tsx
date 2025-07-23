
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
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
            title: 'Flight Bookings',
            description: 'Domestic and international flight reservations with best prices and 24/7 support.',
            image_url: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400&h=300&fit=crop',
            features: ['Best Prices', '24/7 Support', 'Easy Booking', 'Flight Insurance'],
            is_active: true
          },
          {
            id: '2',
            title: 'Hotel & Accommodation',
            description: 'Comfortable stays from luxury resorts to authentic homestays across Nepal.',
            image_url: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop',
            features: ['Verified Hotels', 'Best Rates', 'Instant Confirmation', 'Quality Assurance'],
            is_active: true
          },
          {
            id: '3',
            title: 'Holiday Packages',
            description: 'Special packages for groups, families, and corporate travelers.',
            image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            features: ['Custom Itinerary', 'Group Discounts', 'Team Building', 'Flexible Dates'],
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

  if (loading) {
    return (
      <section id="services" className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">Our Services</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive travel solutions for your Nepal adventure
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
    <section id="services" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">Our Services</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive travel solutions designed to make your Nepal adventure seamless and unforgettable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-48 md:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl md:text-2xl text-card-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features && service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          >
            Get Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
