import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, FileText, Shield, MapPin, Star, Camera } from 'lucide-react';

const PrabasHolidays = () => {
  const services = [
    {
      icon: Globe,
      title: 'International Holiday Packages',
      description: 'Customized vacation packages to destinations worldwide including Europe, Asia, America, and Australia'
    },
    {
      icon: FileText,
      title: 'Visa Services',
      description: 'Complete visa assistance and documentation for all international destinations'
    },
    {
      icon: Shield,
      title: 'Travel Insurance',
      description: 'Comprehensive travel insurance coverage for safe and worry-free journeys'
    },
    {
      icon: Camera,
      title: 'Customized Tours',
      description: 'Tailored travel experiences based on your preferences and budget'
    }
  ];

  const destinations = [
    { name: 'Thailand', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&h=300&fit=crop', price: 'From $599' },
    { name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop', price: 'From $799' },
    { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', price: 'From $899' },
    { name: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', price: 'From $549' },
    { name: 'India', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop', price: 'From $399' },
    { name: 'Europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop', price: 'From $1299' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Prabas Holidays</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Your gateway to extraordinary international vacation experiences. We specialize in 
              creating unforgettable holiday packages, visa services, and travel insurance for 
              destinations across the globe.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Holiday Packages
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {services.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <service.icon className="h-12 w-12 mx-auto text-accent mb-4" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Popular International Destinations</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${destination.image})` }}></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                    <p className="text-accent font-bold text-lg mb-4">{destination.price}</p>
                    <Button className="w-full">View Packages</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
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
