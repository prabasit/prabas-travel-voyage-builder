
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24">
      {/* Background Image - Using Nepal mountain image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover the World with 
            <span className="text-accent block">Prabas Travels</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your trusted travel partner for international flights, holiday packages, and visa services. 
            Experience seamless travel with FlightsNepal.com and Prabas Holidays.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/flights-nepal">
              <Button size="lg" className="text-lg px-8 py-4 bg-accent hover:bg-accent/90">
                Book Flights
              </Button>
            </Link>
            <Link to="/prabas-holidays">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-orange hover:bg-white hover:text-black">
                Holiday Packages
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Happy Travelers</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-80">Destinations</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm opacity-80">Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
