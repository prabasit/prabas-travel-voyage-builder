
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Globe, Heart } from 'lucide-react';
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
        .limit(1)
        .single();

      if (error) throw error;
      setAboutData(data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      // Fallback data if CMS is empty
      setAboutData({
        id: '1',
        title: 'About Flights Nepal',
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{aboutData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {aboutData.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src={aboutData.image_url}
              alt="About Us"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Story</h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.story}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.mission}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.vision}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {aboutData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {index === 0 && <Award className="h-12 w-12 mx-auto text-primary" />}
                    {index === 1 && <Globe className="h-12 w-12 mx-auto text-primary" />}
                    {index === 2 && <Heart className="h-12 w-12 mx-auto text-primary" />}
                    {index === 3 && <Users className="h-12 w-12 mx-auto text-primary" />}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
