
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_link: string;
  is_active: boolean;
  display_order: number;
}

const Hero = () => {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBannerSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const fetchBannerSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('banner_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setSlides(data);
      } else {
        // Fallback slide if no banners are configured
        setSlides([{
          id: 'fallback',
          title: 'Welcome to Flights Nepal',
          subtitle: 'Your Gateway to Nepal\'s Wonders - Discover breathtaking adventures with our comprehensive travel services',
          image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
          button_text: 'Explore Services',
          button_link: '/services',
          is_active: true,
          display_order: 1
        }]);
      }
    } catch (error) {
      console.error('Error fetching banner slides:', error);
      // Fallback slide on error
      setSlides([{
        id: 'fallback',
        title: 'Welcome to Flights Nepal',
        subtitle: 'Your Gateway to Nepal\'s Wonders',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        button_text: 'Explore Services',
        button_link: '/services',
        is_active: true,
        display_order: 1
      }]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentSlideData.image_url})` 
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-primary-foreground bg-clip-text text-transparent">
              {currentSlideData.title}
            </span>
          </h1>
          
          {currentSlideData.subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {currentSlideData.subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentSlideData.button_text && currentSlideData.button_link && (
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                onClick={() => window.location.href = currentSlideData.button_link}
              >
                {currentSlideData.button_text}
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Only show if multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Slide Indicators - Only show if multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
