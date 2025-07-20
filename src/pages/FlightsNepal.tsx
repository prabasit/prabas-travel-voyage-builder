
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Clock, Shield, MapPin, ExternalLink } from 'lucide-react';

const FlightsNepal = () => {
  const features = [
    {
      icon: Plane,
      title: 'Domestic & International Flights',
      description: 'Complete flight booking services for all destinations across Nepal and worldwide'
    },
    {
      icon: Clock,
      title: 'Real-time Booking System',
      description: 'Advanced ticketing system with instant confirmation and e-tickets'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Safe and secure payment gateway with multiple payment options'
    },
    {
      icon: MapPin,
      title: 'All Airlines',
      description: 'Partner with all major domestic and international airlines'
    }
  ];

  const handleVisitWebsite = () => {
    window.open('https://flightsnepal.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="/lovable-uploads/a3ba01b3-295e-4a69-9e00-85ffbc90571c.png" 
              alt="FlightsNepal Logo" 
              className="h-20 mx-auto mb-6"
            />
            <h1 className="text-5xl font-bold mb-6">FlightsNepal.com</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Nepal's Leading Flight Booking Platform - Your gateway to domestic and international destinations 
              with the most advanced ticketing system and competitive prices.
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={handleVisitWebsite}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit FlightsNepal.com
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Flight Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleVisitWebsite}
                className="bg-primary hover:bg-primary/90"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Book Your Flight Now
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default FlightsNepal;
