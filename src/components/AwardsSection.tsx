
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Trophy, Star, Medal } from 'lucide-react';

const AwardsSection = () => {
  const awards = [
    {
      icon: Trophy,
      title: 'Best Travel Agency Nepal 2023',
      organization: 'Nepal Tourism Board',
      year: '2023',
      description: 'Recognized for outstanding contribution to Nepal tourism industry'
    },
    {
      icon: Award,
      title: 'Excellence in Customer Service',
      organization: 'Travel Industry Association',
      year: '2022',
      description: 'Awarded for maintaining highest standards of customer satisfaction'
    },
    {
      icon: Star,
      title: 'TripAdvisor Travelers Choice',
      organization: 'TripAdvisor',
      year: '2023',
      description: 'Top 10% of travel companies worldwide based on traveler reviews'
    },
    {
      icon: Medal,
      title: 'Sustainable Tourism Award',
      organization: 'Eco Tourism Society',
      year: '2022',
      description: 'For promoting responsible and sustainable tourism practices'
    },
    {
      icon: Trophy,
      title: 'Best Trekking Company',
      organization: 'Himalayan Times',
      year: '2021',
      description: 'Leading trekking and mountaineering services in Nepal'
    },
    {
      icon: Award,
      title: 'Innovation in Tourism',
      organization: 'Ministry of Culture, Tourism & Civil Aviation',
      year: '2021',
      description: 'For introducing innovative travel solutions and services'
    }
  ];

  const certifications = [
    'Nepal Tourism Board Licensed',
    'TAAN (Trekking Agencies Association of Nepal) Member',
    'NMA (Nepal Mountaineering Association) Affiliate',
    'IATA Certified Travel Agent',
    'ISO 9001:2015 Quality Management',
    'Sustainable Tourism Certified'
  ];

  return (
    <section id="awards" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Awards & Recognition</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by industry leaders and satisfied customers worldwide.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {awards.map((award, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <award.icon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold">{award.title}</h3>
                <p className="text-primary font-semibold">{award.organization}</p>
                <p className="text-2xl font-bold text-yellow-600">{award.year}</p>
                <p className="text-sm text-muted-foreground">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-muted/30 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-center mb-8">Certifications & Memberships</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-8">Our Achievement Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Team Members</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
