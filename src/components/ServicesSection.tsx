
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mountain, Plane, Hotel, Camera, Compass, Users } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Mountain,
      title: 'Trekking & Hiking',
      description: 'Experience the majestic Himalayas with our expert-guided trekking expeditions.',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
      features: ['Expert Guides', 'Safety Equipment', 'Permit Arrangements', 'Emergency Support']
    },
    {
      icon: Plane,
      title: 'Flight Bookings',
      description: 'Domestic and international flight reservations through FlightsNepal.com.',
      image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400&h=300&fit=crop',
      features: ['Best Prices', '24/7 Support', 'Easy Booking', 'Flight Insurance']
    },
    {
      icon: Hotel,
      title: 'Hotel & Accommodation',
      description: 'Comfortable stays from luxury resorts to authentic homestays.',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop',
      features: ['Verified Hotels', 'Best Rates', 'Instant Confirmation', 'Quality Assurance']
    },
    {
      icon: Camera,
      title: 'Photography Tours',
      description: 'Capture Nepal\'s beauty with our specialized photography expeditions.',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
      features: ['Pro Guidance', 'Best Locations', 'Equipment Support', 'Post-Processing Tips']
    },
    {
      icon: Compass,
      title: 'Cultural Tours',
      description: 'Immerse yourself in Nepal\'s rich heritage and vibrant traditions.',
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop',
      features: ['Local Guides', 'Heritage Sites', 'Cultural Activities', 'Authentic Experiences']
    },
    {
      icon: Users,
      title: 'Group Tours',
      description: 'Special packages for groups, families, and corporate travelers.',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop',
      features: ['Custom Itinerary', 'Group Discounts', 'Team Building', 'Flexible Dates']
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From adventure trekking to luxury travel, we offer comprehensive travel services 
            to make your Nepal experience unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              
              <CardHeader>
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full mt-4">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subsidiary Companies */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">Our Companies</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Hotel className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-bold">Prabas Holidays</h4>
                <p className="text-muted-foreground">
                  Specialized holiday packages and luxury travel experiences across Nepal and international destinations.
                </p>
                <Button variant="outline">Visit Prabas Holidays</Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-bold">FlightsNepal.com</h4>
                <p className="text-muted-foreground">
                  Your one-stop solution for domestic and international flight bookings with competitive prices.
                </p>
                <Button variant="outline">Visit FlightsNepal</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
