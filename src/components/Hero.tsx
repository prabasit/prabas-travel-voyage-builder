
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: slides, isLoading } = useQuery({
    queryKey: ['banner-slides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('banner_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => {
    if (slides && slides.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides && slides.length > 1) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const currentSlideData = slides?.[currentSlide];
  
  if (isLoading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides?.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url("${slide.image_url}")`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      {slides && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {currentSlideData?.title || 'Welcome to Prabas Travels'}
          </h1>
          
          {currentSlideData?.subtitle && (
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {currentSlideData.subtitle}
            </p>
          )}

          {currentSlideData?.button_text && currentSlideData?.button_link && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to={currentSlideData.button_link}>
                <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90">
                  {currentSlideData.button_text}
                </Button>
              </Link>
              <Link to="/prabas-holidays">
                <Button
                  size="lg"
                  variant="outline" 
                  className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                >
                  Holiday Packages
                </Button>
              </Link>
            </div>
          )}

          {/* Slide Indicators */}
          {slides && slides.length > 1 && (
            <div className="flex justify-center space-x-2 mb-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-accent' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Card className="bg-white/50 backdrop-blur-sm border-white/30">
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border-white/30">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Happy Travelers</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border-white/30">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-80">Destinations</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border-white/30">
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
