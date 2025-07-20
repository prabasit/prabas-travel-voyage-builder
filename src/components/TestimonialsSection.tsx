
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'United States',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Prabas Travels made our Everest Base Camp trek absolutely incredible. The guides were knowledgeable, safety was paramount, and every detail was perfectly organized. Highly recommended!',
      trip: 'Everest Base Camp Trek'
    },
    {
      name: 'David Chen',
      location: 'Singapore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'FlightsNepal.com helped us find the best deals for our family vacation. The booking process was smooth and customer service was excellent throughout our journey.',
      trip: 'Family Holiday Package'
    },
    {
      name: 'Emma Wilson',
      location: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'The cultural tour organized by Prabas Travels opened our eyes to the rich heritage of Nepal. Our guide was passionate and shared amazing stories about local traditions.',
      trip: 'Cultural Heritage Tour'
    },
    {
      name: 'Michael Schmidt',
      location: 'Germany',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Professional service from start to finish. The Annapurna Circuit trek was well-planned, and the team ensured we had an amazing experience while staying safe.',
      trip: 'Annapurna Circuit Trek'
    },
    {
      name: 'Yuki Tanaka',
      location: 'Japan',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Prabas Holidays created the perfect romantic getaway for our honeymoon. The luxury accommodations and personalized service exceeded our expectations.',
      trip: 'Honeymoon Package'
    },
    {
      name: 'Robert Anderson',
      location: 'Australia',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'The photography tour was beyond amazing! Our guide knew all the best spots for capturing Nepal\'s beauty. The memories and photos will last a lifetime.',
      trip: 'Photography Expedition'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Travelers Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experiences with Prabas Travels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/20 mb-2" />
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary">{testimonial.trip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-16">
          <Card className="max-w-md mx-auto p-8 bg-primary/5">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-4xl font-bold text-primary">4.9/5</div>
              <p className="text-muted-foreground">Based on 500+ reviews</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
