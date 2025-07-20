
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, FileText, Shield, Camera, Star, ExternalLink } from 'lucide-react';

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

  const handleVisitWebsite = () => {
    window.open('https://prabasholidays.com', '_blank');
  };

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
                  <h3 className="text-xl font-semibual mb-2">Global Network</h3>
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
