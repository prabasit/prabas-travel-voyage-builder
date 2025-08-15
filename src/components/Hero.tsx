
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BannerButton {
  text: string;
  link: string;
  style: 'primary' | 'secondary' | 'outline';
  color?: string;
}

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  buttons: BannerButton[];
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
        const processedSlides = data.map(slide => ({
          ...slide,
          buttons: Array.isArray(slide.buttons) ? slide.buttons : []
        }));
        setSlides(processedSlides);
      } else {
        // Fallback slide with multiple buttons
        setSlides([{
          id: 'fallback',
          title: 'Welcome to Flights Nepal',
          subtitle: 'Your Gateway to Nepal\'s Wonders - Discover breathtaking adventures with our comprehensive travel services',
          image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
          buttons: [
            {
              text: 'Explore Services',
              link: '/services',
              style: 'primary'
            },
            {
              text: 'Plan Your Trip',
              link: '/contact',
              style: 'secondary'
            }
          ],
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
        buttons: [
          {
            text: 'Explore Services',
            link: '/services',
            style: 'primary'
          }
        ],
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

  const getButtonClasses = (button: BannerButton) => {
    const baseClasses = "px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg";
    
    switch (button.style) {
      case 'primary':
        return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0`;
      case 'secondary':
        return `${baseClasses} bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0`;
      case 'outline':
        return `${baseClasses} border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent`;
      default:
        return `${baseClasses} bg-primary hover:bg-primary/90 text-primary-foreground`;
    }
  };

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${currentSlideData.image_url})` 
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-blue-900/80" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Title with Enhanced Animation */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-gradient">
              {currentSlideData.title}
            </span>
          </h1>
          
          {/* Subtitle */}
          {currentSlideData.subtitle && (
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
              {currentSlideData.subtitle}
            </p>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            {currentSlideData.buttons.map((button, index) => (
              <Button 
                key={index}
                size="lg" 
                className={getButtonClasses(button)}
                onClick={() => window.location.href = button.link}
              >
                {button.style === 'primary' && <Play className="mr-2 h-5 w-5" />}
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Only show if multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Slide Indicators - Only show if multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
