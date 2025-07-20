
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Shield, Heart, Compass } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety is our priority. We ensure all our tours meet the highest safety standards.'
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'Every journey is crafted with care to match your preferences and create lasting memories.'
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description: 'Our experienced guides share deep knowledge of local culture, history, and hidden gems.'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in tourism and customer satisfaction across Nepal.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Prabas Travels</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Established in 1995, Prabas Travels & Tours has been Nepal's premier travel company, 
            dedicated to showcasing the natural beauty and rich culture of our beautiful country.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=600&h=400&fit=crop"
              alt="Nepal Travel Experience"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Our Story</h3>
            <p className="text-lg text-muted-foreground">
              Founded with a vision to make Nepal accessible to travelers worldwide, Prabas Travels 
              has grown from a small local agency to one of Nepal's most trusted travel companies. 
              We specialize in trekking, cultural tours, adventure sports, and spiritual journeys.
            </p>
            <p className="text-lg text-muted-foreground">
              Our subsidiaries - Prabas Holidays and FlightsNepal.com - extend our services to 
              provide comprehensive travel solutions including domestic and international flight 
              bookings, hotel reservations, and customized holiday packages.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Years in Business</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Satisfied Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
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
