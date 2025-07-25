
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Users, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Discover
          <span className="text-primary block mt-2">Nepal's Beauty</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Embark on unforgettable journeys through the majestic Himalayas, ancient temples, 
          and vibrant cultures with Nepal's most trusted travel companion.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 rounded-full"
          >
            View Our Tours
          </Button>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">10,000+</div>
            <div className="text-sm text-gray-300">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">50+</div>
            <div className="text-sm text-gray-300">Destinations</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">15+</div>
            <div className="text-sm text-gray-300">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
