
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, FileText, Shield, Camera, Star, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
}

const PrabasHolidays = () => {
  const [data, setData] = useState<PrabasHolidaysData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: holidaysData, error } = await supabase
        .from('prabas_holidays')
        .select('*')
        .eq('is_active', true)
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
      // Fallback to default data
      setData({
        id: '1',
        title: 'Prabas Holidays',
        description: 'Your gateway to extraordinary international vacation experiences. We specialize in creating unforgettable holiday packages, visa services, and travel insurance for destinations across the globe.',
        services: [
          {
            title: 'International Holiday Packages',
            description: 'Customized vacation packages to destinations worldwide including Europe, Asia, America, and Australia',
            icon: 'Globe'
          },
          {
            title: 'Visa Services',
            description: 'Complete visa assistance and documentation for all international destinations',
            icon: 'FileText'
          },
          {
            title: 'Travel Insurance',
            description: 'Comprehensive travel insurance coverage for safe and worry-free journeys',
            icon: 'Shield'
          },
          {
            title: 'Customized Tours',
            description: 'Tailored travel experiences based on your preferences and budget',
            icon: 'Camera'
          }
        ],
        hero_image_url: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return Globe;
      case 'FileText':
        return FileText;
      case 'Shield':
        return Shield;
      case 'Camera':
        return Camera;
      default:
        return Globe;
    }
  };

  const handleVisitWebsite = () => {
    window.open('https://prabasholidays.com', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 text-center py-20">
          <p className="text-muted-foreground">Prabas Holidays data not available.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">{data.title}</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {data.description}
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={handleVisitWebsite}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit PrabasHolidays.com
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {data.services.map((service, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <IconComponent className="h-12 w-12 mx-auto text-accent mb-4" />
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleVisitWebsite}
                className="bg-accent hover:bg-accent/90"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Explore Holiday Packages
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Why Choose Prabas Holidays?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Star className="h-12 w-12 mx-auto text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">25+ Years Experience</h3>
                  <p className="text-muted-foreground">Trusted by thousands of travelers worldwide</p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 mx-auto text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Complete Support</h3>
                  <p className="text-muted-foreground">From visa to insurance, we handle everything</p>
                </div>
                <div className="text-center">
                  <Globe className="h-12 w-12 mx-auto text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                  <p className="text-muted-foreground">Partnerships worldwide for best experiences</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrabasHolidays;
