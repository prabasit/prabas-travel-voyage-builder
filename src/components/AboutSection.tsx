
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Award, Globe, Heart, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

const AboutSection = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .limit(1);

      if (error) {
        console.error('Error fetching about data:', error);
        setAboutData(getFallbackData());
      } else if (data && data.length > 0) {
        // Process the data to ensure values and stats are arrays
        const processedData = {
          ...data[0],
          values: data[0].values || getFallbackData().values,
          stats: data[0].stats || getFallbackData().stats
        };
        setAboutData(processedData);
      } else {
        setAboutData(getFallbackData());
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      setAboutData(getFallbackData());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackData = (): AboutData => ({
    id: '1',
    title: 'About Prabas Travels',
    description: 'We are Nepal\'s leading travel company, dedicated to providing exceptional travel experiences.',
    story: 'Founded with a passion for showcasing Nepal\'s beauty to the world, we have been serving travelers for over a decade.',
    mission: 'To make Nepal accessible to everyone while promoting sustainable tourism.',
    vision: 'To be the most trusted travel partner for exploring Nepal and beyond.',
    values: [
      { title: 'Excellence', description: 'We strive for excellence in every service we provide.' },
      { title: 'Sustainability', description: 'We promote responsible and sustainable tourism practices.' },
      { title: 'Trust', description: 'We build lasting relationships based on trust and reliability.' },
      { title: 'Innovation', description: 'We continuously innovate to enhance travel experiences.' }
    ],
    stats: [
      { number: '10K+', label: 'Happy Customers' },
      { number: '500+', label: 'Tours Completed' },
      { number: '50+', label: 'Destinations' },
      { number: '15+', label: 'Years Experience' }
    ],
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  });

  if (loading) {
    return (
      <section id="about" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  const statsArray = Array.isArray(aboutData.stats) ? aboutData.stats : [];
  const valuesArray = Array.isArray(aboutData.values) ? aboutData.values : [];

  const getValueIcon = (index: number) => {
    const icons = [Award, Globe, Heart, Users];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="h-10 w-10 md:h-12 md:w-12 mx-auto text-primary" />;
  };

  return (
    <section id="about" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">{aboutData.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {aboutData.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div className="order-2 lg:order-1">
            <img
              src={aboutData.image_url}
              alt="About Us"
              className="rounded-lg shadow-xl w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground">Our Story</h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.story}
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.mission}
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.vision}
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        {statsArray.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {statsArray.map((stat, index) => (
              <div key={index} className="text-center p-4 md:p-6 bg-muted/50 rounded-lg">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Values Section */}
        {valuesArray.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">Our Values</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {valuesArray.map((value, index) => (
                <Card key={index} className="text-center bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-4 md:mb-6">
                      {getValueIcon(index)}
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-card-foreground">{value.title}</h4>
                    <p className="text-muted-foreground text-sm md:text-base">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
