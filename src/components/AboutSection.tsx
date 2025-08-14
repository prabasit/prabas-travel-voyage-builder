
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Globe, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AboutData {
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
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching about data:', error);
        return;
      }

      if (data) {
        setAboutData(data);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="h-6 w-6" />;
      case 'award':
        return <Award className="h-6 w-6" />;
      case 'globe':
        return <Globe className="h-6 w-6" />;
      case 'heart':
        return <Heart className="h-6 w-6" />;
      default:
        return <Heart className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Prabas Travels</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your trusted partner for unforgettable travel experiences across Nepal and beyond.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{aboutData.title}</h2>
          {aboutData.description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {aboutData.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            {aboutData.story && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.story}
                </p>
              </div>
            )}

            {aboutData.mission && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.mission}
                </p>
              </div>
            )}

            {aboutData.vision && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.vision}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            {aboutData.image_url ? (
              <img
                src={aboutData.image_url}
                alt="About Prabas Travels"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            ) : (
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Image not available</p>
              </div>
            )}
          </div>
        </div>

        {/* Values Section */}
        {aboutData.values && aboutData.values.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData.values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4 text-primary">
                      {getIconComponent(value.icon)}
                    </div>
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        {aboutData.stats && aboutData.stats.length > 0 && (
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-center mb-8">Our Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    {getIconComponent(stat.icon)}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
